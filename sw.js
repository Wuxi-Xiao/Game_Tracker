// 定义缓存名称为 "temperature-converter-v1" 
// Define cache name as "temperature-converter-v1"
const CACHE_NAME = `temperature-converter-v1`; 

// 使用 install 事件预缓存所有初始资源
// Use the install event to pre-cache all initial resources
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME); // 打开缓存 // Open the cache
    cache.addAll([ // 将以下资源添加到缓存 // Add the following resources to the cache
      '/',
      '/converter.js',
      '/converter.css'
    ]);
  })());
});

// 当有网络请求时触发
// Triggered when there is a network request
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME); // 打开缓存 // Open the cache

    // 从缓存中获取资源
    // Get the resource from the cache
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse; // 如果缓存中有响应，返回缓存响应 // If there is a response in the cache, return the cached response
    } else {
      try {
        // 如果缓存中没有资源，尝试从网络获取
        // If the resource was not in the cache, try the network
        const fetchResponse = await fetch(event.request);

        // 将资源保存到缓存并返回
        // Save the resource in the cache and return it
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // 网络请求失败
        // The network failed
      }
    }
  })());
});
