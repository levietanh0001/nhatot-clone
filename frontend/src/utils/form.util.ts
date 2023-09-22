export function logFormData(formData) {
  for (let [key, value] of formData.entries()) { 
    console.log(key, value);
  }
}

export function buildFormData(formData, data) {
  

}

// export function buildFormData(formData, data, parentKey) {
//   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
//     Object.keys(data).forEach(key => {
//       buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
//     });
//   } else {
//     const value = data == null ? '' : data;

//     formData.append(parentKey, value);
//   }

// }