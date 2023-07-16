export const sanitizeBigIntString = (value) => {
  return value.replace(/\D/g, '');
};

// export const sanitizeFloat = (value) => {
//   return String(value).match(/^(\d+(?:\.\d+)?)$/)? value: '';
//   // return value.replace(/(?!\d+(?:\.\d+)?)/, '');
// }

export function sanitizeNumberString(n) {
  return Number(n) > 0 ? n : '';
  // return n;
}

export const formatNumberWithCommas = (value) => {
  return Number(value.replace(/,/g, '')).toLocaleString();
};

export const commaSeparatedStringToNumber = (str) => {
  return parseFloat(str.replace(/,/g, ''));
};

export function isNumeric(num){
  return !isNaN(num);
}