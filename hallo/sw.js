const CACHE_NAME = 'festa-junina-v1';
// Lista de arquivos estáticos ("a casca") que serão salvos no celular do operador
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// 1. Instalação: Salva os arquivos no cache local do aparelho
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Força o SW a se tornar ativo imediatamente
  );
});

// 2. Ativação: Limpa caches antigos se você atualizar a versão do sistema no futuro
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Assume o controle da página imediatamente
  );
});

// 3. Interceptação: Se o operador recarregar a página, o SW entrega o cache instantaneamente
self.addEventListener('fetch', (e) => {
  // Ignora requisições de POST (como carregar estoque e enviar venda) para que passem direto pela internet
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Se estiver no cache, entrega o cache (0ms). Se não, busca na internet.
      return cachedResponse || fetch(e.request);
    })
  );
});
