const filesToCache = [
  '/',
  'index.html',
  'style.css',
  'images/googleplex.jpg',
  'images/yasir-icon.png',
  'images/yasir.jpg',
  'images/yasir.png',
  'images/ysr.png',
  'images/ysr2.png',
  'project1/',
  'project1/add2numbers.js',
  'project1/index.html',
  'project2/',
  'project2/index.html',
  'project2/mapbox.js',
  'project2/css/style.css',
  'project3/index.html',
  'project3/css/style.css',
  'project3/data/map.json',
  'project3/images/1.jpg',
  'project3/images/2.jpg',
  'project3/images/3.jpg',
  'project3/js/map.js'
];

const staticCacheName = 'pages-cache-v2';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  // console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        // console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      // console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });

    })
    .catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});
