export const removeProps = (obj, prop, value) => {
  obj[prop] = obj[prop].split(',').filter(o => o !== value).join(',')
  if(!obj[prop].length) delete obj[prop];
  return obj
}

export const appendWithSemiColon = (string, newValue) => !!string
  ? string.split(',').concat(newValue).join(',')
  : newValue

export const isHaveValue = (target, value) => !!target
  ? target.split(',').includes(value)
  : false

export const priceFormatter = (price, currency='INR') => price
  .toLocaleString('en-US', { style: 'currency', currency });

export const sanitizeHTML = (str) => str.replace(/[^\w. ]/gi, (c) => '&#' + c.charCodeAt(0) + ';')