// export const wait = (milliseconds, isReject) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if(isReject) {
//         return reject('failed');
//       }
//       resolve('success');
//     }, milliseconds);
//   });
// }

export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, milliseconds);
  });
}

export const waitAsync = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, milliseconds);
  });
}

export const promiseWrapper = (promise) => {
  return new Promise((resolve, reject) => {
    resolve(promise);
  })
}