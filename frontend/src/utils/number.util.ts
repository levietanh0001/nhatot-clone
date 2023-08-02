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
  return parseInt(str.replace(/,/g, ''));
  // return parseFloat(str.replace(/,/g, ''));
};

export function isNumeric(num){
  return !isNaN(num);
}

export function convertToInternationalCurrencySystem(labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " tỷ"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " triệu"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " nghìn"

  : Math.abs(Number(labelValue));

}