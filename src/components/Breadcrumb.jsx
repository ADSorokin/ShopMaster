// src/components/Breadcrumb.jsx
const Breadcrumb = ({ currentPage, currentProduct, setCurrentPage, language }) => {
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
      satSun: 'Сб-Вс: 10:00 - 18:00',
      favorites: 'Избранное',
      compare: 'Сравнение'
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
      favorites: 'Favorites',
      compare: 'Comparison'
    }
  };

  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ label: getTranslation('home'), path: 'home' }];
    
    if (currentPage === 'product' && currentProduct) {
      breadcrumbs.push({ 
        label: currentProduct.category === 'electronics' ? getTranslation('electronics') :
                currentProduct.category === 'clothing' ? getTranslation('clothing') :
                currentProduct.category === 'accessories' ? getTranslation('accessories') :
                getTranslation('home'),
        path: currentProduct.category 
      });
      breadcrumbs.push({ 
        label: typeof currentProduct.name === 'object' ? currentProduct.name[language] : currentProduct.name, 
        path: 'product' 
      });
    } else if (['electronics', 'clothing', 'accessories', 'home'].includes(currentPage)) {
      breadcrumbs.push({ 
        label: currentPage === 'electronics' ? getTranslation('electronics') :
                currentPage === 'clothing' ? getTranslation('clothing') :
                currentPage === 'accessories' ? getTranslation('accessories') :
                getTranslation('home'),
        path: currentPage 
      });
    } else if (currentPage === 'cart') {
      breadcrumbs.push({ label: getTranslation('cart'), path: 'cart' });
    } else if (currentPage === 'checkout') {
      breadcrumbs.push({ label: getTranslation('cart'), path: 'cart' });
      breadcrumbs.push({ label: getTranslation('confirm'), path: 'checkout' });
    } else if (currentPage === 'orders') {
      breadcrumbs.push({ label: getTranslation('orders'), path: 'orders' });
    } else if (currentPage === 'login') {
      breadcrumbs.push({ label: getTranslation('login'), path: 'login' });
    } else if (currentPage === 'favorites') {
      breadcrumbs.push({ label: getTranslation('favorites'), path: 'favorites' });
    } else if (currentPage === 'compare') {
      breadcrumbs.push({ label: getTranslation('compare'), path: 'compare' });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            <button
              onClick={() => {
                if (crumb.path === 'home') setCurrentPage('home');
                else if (['electronics', 'clothing', 'accessories', 'home'].includes(crumb.path)) {
                  setCurrentPage(crumb.path);
                }
                else setCurrentPage(crumb.path);
              }}
              className={`hover:text-indigo-600 transition-colors ${
                index === breadcrumbs.length - 1 ? 'text-indigo-600 font-medium' : ''
              }`}
            >
              {crumb.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;