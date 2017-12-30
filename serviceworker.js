'use strict'

const version = 'v20170630';
const __DEVELOPMENT__ = false;
const __DEBUG__ = false;
const offlineResources = [
  '/',
  '/index.html',
  '/about.me.html',
  '/archive.html',
  '/blogroll.html',
  '/page2.html',
  '/tag.html',
  '/bundle/index.css',
  '/bundle/index.js',
  '/post/2016/07/08/hexo-localsearch.html',
  '/post/2016/07/09/hexo-ssh-key.html',
  '/post/2016/10/01/t-debugger-html.html',
  '/post/2016/10/06/rsa.html',
  '/post/2016/10/08/github-api.html',
  '/post/2016/10/09/progressive-encoding-jpeg.html',
  '/post/2016/10/10/compile-linux-kernal.html',
  '/post/2016/10/17/gitlab-ci.html',
  '/post/2016/10/28/refind.html',
  '/post/2016/11/01/rime.html',
  '/post/2016/11/05/linux-shared-object.html',
  '/post/2016/11/13/caddy-server.html',
  '/post/2016/12/04/wireshark-npcap.html',
  '/post/2016/12/24/t-top-inspiration-websites-for-designers.html',
  '/post/2016/12/30/2016-summary.html',
  '/post/2017/02/27/add-night-mode-and-service-worker-for-your-blog.html',
  '/post/2017/03/20/geohash.html',
  '/post/2017/04/28/phantomjs.html',
  '/post/2017/06/20/my-linux-mint-configuration.html',
  '/post/2017/10/06/regain-disqus.html',
  '/post/2017/12/26/rclone-and-notes.html',

];

const ignoreFetch = [
  /https?:\/\/cdn.bootcss.com\//,
  /https?:\/\/www.google-analytics.com\//,
  /https?:\/\/zetao.disqus.com\//,
  /https?:\/\/cdn.rawgit.com\//,
];


//////////
// Install
//////////
function onInstall(event) {
  log('install event in progress.');

  event.waitUntil(updateStaticCache());
}

function updateStaticCache() {
  return caches
    .open(cacheKey('offline'))
    .then((cache) => {
      return cache.addAll(offlineResources);
    })
    .then(() => {
      log('installation complete!');
    });
}

////////
// Fetch
////////
function onFetch(event) {
  const request = event.request;

  if (shouldAlwaysFetch(request)) {
    event.respondWith(networkedOrOffline(request));
    return;
  }

  if (shouldFetchAndCache(request)) {
    event.respondWith(networkedOrCached(request));
    return;
  }

  event.respondWith(cachedOrNetworked(request));
}

function networkedOrCached(request) {
  return networkedAndCache(request)
    .catch(() => { return cachedOrOffline(request) });
}

// Stash response in cache as side-effect of network request
function networkedAndCache(request) {
  return fetch(request)
    .then((response) => {
      var copy = response.clone();
      caches.open(cacheKey('resources'))
        .then((cache) => {
          cache.put(request, copy);
        });

      log("(network: cache write)", request.method, request.url);
      return response;
    });
}

function cachedOrNetworked(request) {
  return caches.match(request)
    .then((response) => {
      log(response ? '(cached)' : '(network: cache miss)', request.method, request.url);
      return response ||
        networkedAndCache(request)
          .catch(() => { return offlineResponse(request) });
    });
}

function networkedOrOffline(request) {
  return fetch(request)
    .then((response) => {
      log('(network)', request.method, request.url);
      return response;
    })
    .catch(() => {
      return offlineResponse(request);
    });
}

function cachedOrOffline(request) {
  return caches
    .match(request)
    .then((response) => {
      return response || offlineResponse(request);
    });
}

function offlineResponse(request) {
  log('(offline)', request.method, request.url);
  if (request.url.match(/\.(jpg|png|gif|svg|jpeg)(\?.*)?$/)) {
    return caches.match('/offline.svg');
  } else {
    return caches.match('/offline.html');
  }
}

///////////
// Activate
///////////
function onActivate(event) {
  log('activate event in progress.');
  event.waitUntil(removeOldCache());
}

function removeOldCache() {
  return caches
    .keys()
    .then((keys) => {
      return Promise.all( // We return a promise that settles when all outdated caches are deleted.
        keys
         .filter((key) => {
           return !key.startsWith(version); // Filter by keys that don't start with the latest version prefix.
         })
         .map((key) => {
           return caches.delete(key); // Return a promise that's fulfilled when each outdated cache is deleted.
         })
      );
    })
    .then(() => {
      log('removeOldCache completed.');
    });
}

function cacheKey() {
  return [version, ...arguments].join(':');
}

function log() {
  if (developmentMode()) {
    console.log("SW:", ...arguments);
  }
}

function shouldAlwaysFetch(request) {
  return __DEVELOPMENT__ ||
    request.method !== 'GET' ||
      ignoreFetch.some(regex => request.url.match(regex));
}

function shouldFetchAndCache(request) {
  return ~request.headers.get('Accept').indexOf('text/html');
}

function developmentMode() {
  return __DEVELOPMENT__ || __DEBUG__;
}

log("Hello from ServiceWorker land!", version);

self.addEventListener('install', onInstall);

self.addEventListener('fetch', onFetch);

self.addEventListener("activate", onActivate);
