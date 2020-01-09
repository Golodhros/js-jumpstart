// https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4
Promise
  .all(
    $$('a')
      .map(link => link.href)
      .map(href => fetch(href))
  )
  .then(() => console.log('All links working'))
.catch(() => console.error('Some links are broken'));