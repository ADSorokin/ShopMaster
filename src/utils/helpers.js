// src/utils/helpers.js
import { currencies } from '../data/currencies';

export const formatPrice = (price, currency = 'RUB') => {
  const currencyInfo = currencies.find(c => c.code === currency);
  const convertedPrice = price * currencyInfo.rate;
  
  if (currency === 'RUB') {
    return Math.round(convertedPrice).toLocaleString() + ' ₽';
  } else if (currency === 'USD') {
    return '$' + convertedPrice.toFixed(2);
  } else if (currency === 'EUR') {
    return '€' + convertedPrice.toFixed(2);
  }
  return price.toLocaleString() + ' ₽';
};

export const getCartTotals = (cart, appliedCoupon) => {
  const subtotal = cart.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
  const discount = appliedCoupon ? 
    (appliedCoupon.discount ? subtotal * (appliedCoupon.discount / 100) : 0) : 0;
  const shipping = appliedCoupon?.freeShipping ? 0 : 500;
  const total = subtotal - discount + shipping;
  
  return { subtotal, discount, shipping, total };
};