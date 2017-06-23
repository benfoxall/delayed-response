importScripts('deps/localforage.min.js')

localforage.config({
  name        : 'delayed-response',
  // storeName   : 'scope-' + self.registration.scope
})

console.log("sw", self)

self.addEventListener('fetch', (e) => {

  localforage.setItem('request:' + e.request.url, true)

  const original = fetch(e.request)

  e.respondWith(
    localforage.getItem('delay:' + e.request.url)
      .then(r => {
        if(!r) return original
        else return (new Promise(resolve => {
          const delay = parseFloat(r) || 0
          console.log("delaying by ", delay)
          setTimeout(resolve, delay)
        })).then(() => {
          return original
        })
      })
      .catch(e => {
        console.error(e)
        return original
      })
  )
})
