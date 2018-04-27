console.log(1)

setTimeout(function () {
  console.log(2)
  process.nextTick(function () {
    console.log('9');
  })
  setTimeout(function () {
    console.log(10)
  })
}, 0)

setImmediate(function () {
  console.log(3)
})

new Promise(function (resolve) {
  console.log('4');
  resolve();
}).then(function () {
  console.log('5')
  setTimeout(function () {
    console.log(7)
  })
  process.nextTick(function () {
    console.log('8');
  })
})
console.log(6)

