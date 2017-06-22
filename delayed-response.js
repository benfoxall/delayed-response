console.log("sw", self)

self.addEventListener('fetch', (e) => {
  console.log('sw fetch', e.request.url)
})
