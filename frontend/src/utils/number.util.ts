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
  return Number(String(value).replace(/,/g, '')).toLocaleString();
};

export const commaSeparatedStringToNumber = (str) => {
  return parseInt(str.replace(/,/g, ''));
  // return parseFloat(str.replace(/,/g, ''));
};

export function isNumeric(num){
  return !isNaN(num);
}

function removeTrailingZeroes(n) {
  return parseFloat(String(n));
}

export function convertToInternationalCurrencySystem(labelValue) {

  // Nine Zeroes for Billions

  const strippedNumber = (Math.abs(Number(labelValue)));
  const formatted = strippedNumber >= 1.0e+9
  ? removeTrailingZeroes((strippedNumber / 1.0e+9).toFixed(2)) + " tỷ"
  : strippedNumber >= 1.0e+6
  ? removeTrailingZeroes((strippedNumber / 1.0e+6).toFixed(2)) + " triệu"
  : strippedNumber >= 1.0e+3
  ? removeTrailingZeroes((strippedNumber / 1.0e+3).toFixed(2)) + " nghìn"
  : removeTrailingZeroes(strippedNumber);

  return String(formatted).replace('.', ',').replace(',00', '');

}