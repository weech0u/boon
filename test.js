// async function func1(params) {
//   try {
//     // await throw 了reject返回的值
//     await func2()
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function func2(params) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('error')
//     }, 1000);
//   })
// }

// func1()