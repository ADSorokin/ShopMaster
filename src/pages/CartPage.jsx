// src/pages/CartPage.jsx
import ProductCard from '../components/ProductCard';

const CartPage = ({ cart, setCart, appliedCoupon, applyCouponCode, setCurrentPage, language, currency, formatPrice, getCartTotals }) => {
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
      addToCart: 'В корзину',
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
      satSun: 'Сб-Вс: 10:00 - 18:00'
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
      satSun: 'Sat-Sun: 10:00 - 18:00'
    }
  };

  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  const totals = getCartTotals(cart, appliedCoupon);

  const removeFromCart = (productId, selectedOptions = null) => {
    setCart(prev => {
      if (selectedOptions === null) {
        return prev.filter(item => item.id !== productId);
      }
      return prev.filter(item => 
        !(item.id === productId && 
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      );
    });
  };

  const updateQuantity = (productId, quantity, selectedOptions = null) => {
    if (quantity === 0) {
      removeFromCart(productId, selectedOptions);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === productId && 
        (selectedOptions === null || JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">{getTranslation('cart')}</h1>
      
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
          <p className="mt-2 text-gray-500">{language === 'ru' ? 'Корзина пуста' : 'Cart is empty'}</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {language === 'ru' ? 'Перейти к покупкам' : 'Go shopping'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <img
                  src={item.images?.[0] || 'https://placehold.co/80x80/ddd/333?text=No+Image'}
                  alt={typeof item.name === 'object' ? item.name[language] : item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{typeof item.name === 'object' ? item.name[language] : item.name}</h3>
                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                    <div className="text-sm text-gray-600">
                      {Object.entries(item.selectedOptions).map(([key, value]) => (
                        <span key={key}>{key}: {value} </span>
                      ))}
                    </div>
                  )}
                  <p className="text-indigo-600 font-semibold">
                    {formatPrice(item.finalPrice * item.quantity)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedOptions)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedOptions)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.selectedOptions)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">{getTranslation('total')}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{getTranslation('subtotal')} ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>{getTranslation('discount')} ({appliedCoupon.code})</span>
                  <span>-{formatPrice(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{getTranslation('shipping')}</span>
                <span>{totals.shipping === 0 ? (language === 'ru' ? 'Бесплатно' : 'Free') : formatPrice(totals.shipping)}</span>
              </div>
              <div className="border-t pt-2 font-bold">
                <div className="flex justify-between">
                  <span>{getTranslation('total')}</span>
                  <span>{formatPrice(totals.total)}</span>
                </div>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation('coupon')}
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={language === 'ru' ? 'Введите промокод' : 'Enter coupon code'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      applyCouponCode(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Введите промокод"]');
                    if (input?.value) {
                      applyCouponCode(input.value);
                      input.value = '';
                    }
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {getTranslation('apply')}
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-green-600 text-sm mt-2">
                  {language === 'ru' ? `Промокод ${appliedCoupon.code} применен!` : 
                   `Coupon ${appliedCoupon.code} applied!`}
                </p>
              )}
            </div>

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              {getTranslation('completeOrder')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;