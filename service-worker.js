// Cache version et nom
const CACHE_NAME = 'my-cache';
const FILES_TO_CACHE = [
    '/', // Page d'accueil
    '/index.html',
    '/style.css',
    '/script.js',
    '/index2.html',
    '/style2.css',
    '/script2.js',
    '/index3.html',
    '/style3.css',
    '/script3.js',
    '/index4.html',
    '/style4.css',
    '/script4.js',
    '/VPNserveur.html',
    '/VPNserveur.css',
    '/VPNserveur.js',
    // Ajouter d'autres ressources si nécessaire
];

// Ouvrir IndexedDB
function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('vpnFilesDB', 1);
        
        request.onerror = function (event) {
            reject('Erreur d\'ouverture d\'IndexedDB');
        };
        
        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
        
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('files')) {
                db.createObjectStore('files', { keyPath: 'url' });
            }
        };
    });
}

// Installer le Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker installé');
    // On installe le Service Worker et on met en cache les ressources nécessaires
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache ouvert');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activer le Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker activé');
    // On supprime les anciens caches qui ne sont plus nécessaires
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Cache obsolète supprimé:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercepter les requêtes et servir les fichiers à partir du cache
self.addEventListener('fetch', (event) => {
    // Chercher le fichier dans le cache
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Si le fichier est dans le cache, on le retourne directement
                return cachedResponse;
            }

            // Si le fichier n'est pas dans le cache, on va le récupérer depuis le réseau
            return fetch(event.request).then((response) => {
                // Vérifier si c'est un fichier de téléchargement
                if (event.request.url.includes('download')) {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone()); // Mettre en cache la réponse
                        console.log('Fichier mis en cache:', event.request.url);
                    }).catch((error) => {
                        console.error('Erreur lors de l\'ouverture du cache:', error);
                    });

                    // Enregistrer le fichier dans IndexedDB
                    openIndexedDB().then((db) => {
                        const transaction = db.transaction('files', 'readwrite');
                        const store = transaction.objectStore('files');
                        const fileRecord = {
                            url: event.request.url,
                            response: response.clone(),
                        };
                        store.put(fileRecord); // Mettre le fichier dans IndexedDB
                        transaction.oncomplete = () => {
                            console.log('Fichier ajouté à IndexedDB:', event.request.url);
                        };
                        transaction.onerror = (event) => {
                            console.error('Erreur lors de l\'ajout à IndexedDB:', event.target.error);
                        };
                    }).catch((error) => {
                        console.error('Erreur d\'IndexedDB:', error);
                    });
                }
                return response; // Retourner la réponse réseau
            });
        })
    );
});

// Écoute des messages du frontend pour gérer les téléchargements
self.addEventListener('message', (event) => {
    if (event.data.type === 'DOWNLOAD') {
        const fileUrl = event.data.url;
        // Récupérer le fichier via fetch et le mettre dans le cache
        fetch(fileUrl).then(response => {
            if (response.ok) {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(fileUrl, response.clone()); // Mettre en cache le fichier téléchargé
                    console.log('Fichier téléchargé et mis en cache:', fileUrl);
                });

                // Enregistrer le fichier dans IndexedDB
                openIndexedDB().then((db) => {
                    const transaction = db.transaction('files', 'readwrite');
                    const store = transaction.objectStore('files');
                    const fileRecord = {
                        url: fileUrl,
                        response: response.clone(),
                    };
                    store.put(fileRecord); // Mettre le fichier dans IndexedDB
                    transaction.oncomplete = () => {
                        console.log('Fichier ajouté à IndexedDB:', fileUrl);
                    };
                    transaction.onerror = (event) => {
                        console.error('Erreur lors de l\'ajout à IndexedDB:', event.target.error);
                    };
                }).catch((error) => {
                    console.error('Erreur d\'IndexedDB:', error);
                });
            } else {
                console.error('Erreur lors du téléchargement:', response.statusText);
            }
        });
    }
});
