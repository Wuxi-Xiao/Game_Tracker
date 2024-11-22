const CACHE_NAME = 'web-app-cache-v1';

// 定义预缓存资源列表
// Define the list of resources to be pre-cached
const urlsToCache = [
  '/',
  '/test_home.html',
  '/test_games.css'
];

// 当Service Worker被安装时触发
// Triggered when a Service Worker is installed
self.addEventListener('install', event => {
  // 等待所有资源被缓存
  // Wait until all resources are cached
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // 将资源添加到缓存
        // Add resources to the cache
        return cache.addAll(urlsToCache);
      })
  );
});

// 当有网络请求时触发
// Triggered when there is a network request
self.addEventListener('fetch', event => {
  // 响应请求
  // Respond to the request
  event.respondWith(
    caches.open(CACHE_NAME) // 打开缓存
      .then(cache => cache.match(event.request)) // 尝试从缓存中匹配请求
      .then(cachedResponse => {
        // 如果缓存中有响应，返回缓存响应
        // If there is a response in the cache, return the cached response
        if (cachedResponse) {
          return cachedResponse;
        }
        // 如果缓存中没有响应，从网络获取
        // If there is no response in the cache, fetch from the network
        return fetch(event.request)
          .then(fetchResponse => {
            // 将网络响应的副本保存到缓存
            // Save a copy of the network response to the cache
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse; // 返回网络响应
          });
      })
      .catch(() => {
        // 如果网络请求失败，可以返回默认的离线页面
        // If the network request fails, you can return a default offline page
        // return caches.match('/offline.html');
      })
  );
});
