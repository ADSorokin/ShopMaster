// src/components/CartSidebar.jsx
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const CartSidebar = ({ 
  cart, 
  removeFromCart, 
  updateQuantity, 
  setShowCart, 
  setCurrentPage, 
  setCurrentProduct,
  products,
  language,
  currency,
  formatPrice,
  appliedCoupon,
  couponCode,
  setCouponCode,
  applyCoupon,
  getCartTotals
}) => {
  const [activeTab, setActiveTab] = useState('items');

  const translations = {
    ru: {
      home: 'Главная',
      products: 'Товары',
      cart: 'Корзина',
      orders: 'Заказы',
      login: 'Войти',
      logout: 'Выйти',
      search: 'Поиск товаров...',
      currency: 'Валюта',
      language: 'Язык',
      addToCart: 'В корзина',
      buyNow: 'Купить сейчас',
      description: 'Описание',
      specifications: 'Характеристики',
      reviews: 'Отзывы',
      relatedProducts: 'С этим товаром покупают',
      dontForget: 'Не забудьте приобрести',
      youViewed: 'Вы недавно смотрели',
      recommended: 'Рекомендуем',
      price: 'Цена',
      stock: 'В наличии',
      rating: 'Оценка',
      addToFavorites: 'В избранное',
      removeFromFavorites: 'Удалить из избранного',
      addToCompare: 'Сравнить',
      removeFromCompare: 'Убрать из сравнения',
      share: 'Поделиться',
      delivery: 'Доставка',
      payment: 'Оплата',
      confirm: 'Подтвердить',
      subtotal: 'Сумма товаров',
      discount: 'Скидка',
      shipping: 'Доставка',
      total: 'Итого',
      coupon: 'Промокод',
      apply: 'Применить',
      completeOrder: 'Оформить заказ',
      back: 'Назад',
      next: 'Далее',
      orderConfirmed: 'Заказ оформлен!',
      thankYou: 'Спасибо за покупку!',
      continueShopping: 'Продолжить покупки',
      myOrders: 'Мои заказы',
      loyaltyProgram: 'Программа лояльности',
      points: 'баллов',
      level: 'Уровень',
      tryAR: 'Попробовать в AR',
      voiceSearch: 'Говорите...',
      contactUs: 'Свяжитесь с нами',
      about: 'О нас',
      support: 'Поддержка',
      privacy: 'Конфиденциальность',
      terms: 'Условия использования',
      newsletter: 'Подписка на новости',
      subscribe: 'Подписаться',
      footerText: '© 2024 ShopMaster. Все права защищены.',
      paymentMethods: 'Способы оплаты',
      deliveryInfo: 'Информация о доставке',
      returns: 'Возврат и обмен',
      warranty: 'Гарантия',
      contact: 'Контакты',
      address: 'Адрес',
      phone: 'Телефон',
      email: 'Электронная почта',
      social: 'Мы в социальных сетях',
      hours: 'Часы работы',
      monFri: 'Пн-Пт: 9:00 - 21:00',
      satSun: 'Сб-Вс: 10:00 - 18:00',
      close: 'Закрыть',
      cartEmpty: 'Ваша корзина пуста',
      viewCart: 'Просмотр корзины',
      checkout: 'Оформить заказ',
      quantity: 'Количество',
      remove: 'Удалить',
      couponApplied: 'Промокод применен',
      invalidCoupon: 'Недействительный промокод'
    },
    en: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      orders: 'Orders',
      login: 'Login',
      logout: 'Logout',
      search: 'Search products...',
      currency: 'Currency',
      language: 'Language',
      addToCart: 'Add to cart',
      buyNow: 'Buy now',
      description: 'Description',
      specifications: 'Specifications',
      reviews: 'Reviews',
      relatedProducts: 'Frequently bought together',
      dontForget: 'Don\'t forget to buy',
      youViewed: 'You recently viewed',
      recommended: 'Recommended',
      price: 'Price',
      stock: 'In stock',
      rating: 'Rating',
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      addToCompare: 'Compare',
      removeFromCompare: 'Remove from comparison',
      share: 'Share',
      delivery: 'Delivery',
      payment: 'Payment',
      confirm: 'Confirm',
      subtotal: 'Subtotal',
      discount: 'Discount',
      shipping: 'Shipping',
      total: 'Total',
      coupon: 'Coupon code',
      apply: 'Apply',
      completeOrder: 'Complete order',
      back: 'Back',
      next: 'Next',
      orderConfirmed: 'Order confirmed!',
      thankYou: 'Thank you for your purchase!',
      continueShopping: 'Continue shopping',
      myOrders: 'My orders',
      loyaltyProgram: 'Loyalty program',
      points: 'points',
      level: 'Level',
      tryAR: 'Try in AR',
      voiceSearch: 'Speak...',
      contactUs: 'Contact us',
      about: 'About',
      support: 'Support',
      privacy: 'Privacy',
      terms: 'Terms of use',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe',
      footerText: '© 2024 ShopMaster. All rights reserved.',
      paymentMethods: 'Payment methods',
      deliveryInfo: 'Delivery information',
      returns: 'Returns and exchanges',
      warranty: 'Warranty',
      contact: 'Contact',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      social: 'Follow us',
      hours: 'Working hours',
      monFri: 'Mon-Fri: 9:00 - 21:00',
      satSun: 'Sat-Sun: 10:00 - 18:00',
      close: 'Close',
      cartEmpty: 'Your cart is empty',
      viewCart: 'View cart',
      checkout: 'Checkout',
      quantity: 'Quantity',
      remove: 'Remove',
      couponApplied: 'Coupon applied',
      invalidCoupon: 'Invalid coupon'
    }
  };

  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  const totals = getCartTotals(cart, appliedCoupon);

  const handleApplyCoupon = () => {
    if (applyCoupon) {
      applyCoupon(couponCode);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCart(false)}></div>
      
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">{getTranslation('cart')}</h2>
                    <button
                      onClick={() => setShowCart(false)}
                      className="ml-3 flex h-7 items-center justify-center rounded-md text-gray-400 hover:text-gray-500"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                            />
                          </svg>
                          <p className="mt-2 text-gray-500">{getTranslation('cartEmpty')}</p>
                          <button
                            onClick={() => setShowCart(false)}
                            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            {getTranslation('continueShopping')}
                          </button>
                        </div>
                      ) : (
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => {
                            const product = products.find(p => p.id === item.id);
                            if (!product) return null;
                            
                            const currentName = typeof product.name === 'object' ? product.name[language] : product.name;
                            
                            return (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.images?.[0] || 'https://placehold.co/100x100/ddd/333?text=No+Image'}
                                    alt={currentName}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{currentName}</h3>
                                      <p className="ml-4">{formatPrice ? formatPrice(item.finalPrice * item.quantity) : `${item.finalPrice * item.quantity} ${currency}`}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{getTranslation('quantity')}: {item.quantity}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="text-gray-500 hover:text-gray-600"
                                      >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                      </button>
                                      <span className="font-medium">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="text-gray-500 hover:text-gray-600"
                                      >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      {getTranslation('remove')}
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>{getTranslation('subtotal')}</p>
                      <p>{formatPrice ? formatPrice(totals.subtotal) : `${totals.subtotal} ${currency}`}</p>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-base font-medium text-green-600 mt-2">
                        <p>{getTranslation('discount')}</p>
                        <p>-{formatPrice ? formatPrice(totals.discount) : `${totals.discount} ${currency}`}</p>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                      <p>{getTranslation('shipping')}</p>
                      <p>{totals.shipping === 0 ? getTranslation('free') : formatPrice ? formatPrice(totals.shipping) : `${totals.shipping} ${currency}`}</p>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900 mt-2">
                      <p>{getTranslation('total')}</p>
                      <p>{formatPrice ? formatPrice(totals.total) : `${totals.total} ${currency}`}</p>
                    </div>

                    {/* Coupon Code */}
                    <div className="mt-6">
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full rounded-l-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder={getTranslation('coupon')}
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="rounded-r-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {getTranslation('apply')}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setShowCart(false);
                          setCurrentPage('checkout');
                        }}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        {getTranslation('completeOrder')}
                      </button>
                    </div>

                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        {getTranslation('continueShopping')}{' '}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => setShowCart(false)}
                        >
                          {getTranslation('continueShopping')}
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;