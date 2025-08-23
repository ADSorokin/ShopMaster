// src/components/Header.jsx
import { useState } from 'react';

/**
 * Компонент шапки приложения
 * 
 * @param {Object} props - Свойства компонента
 * @param {Array} props.cart - Массив товаров в корзине
 * @param {Array} props.notifications - Массив уведомлений
 * @param {Array} props.favorites - Массив ID избранных товаров
 * @param {Array} [props.compareList] - Массив ID товаров для сравнения (опционально)
 * @param {Object|null} props.user - Данные пользователя или null если не авторизован
 * @param {string} props.currentPage - Текущая страница приложения
 * @param {Function} props.setCurrentPage - Функция для изменения текущей страницы
 * @param {Function} props.setShowCart - Функция для отображения/скрытия корзины
 * @param {Function} props.setShowChat - Функция для отображения/скрытия чата
 * @param {Function} [props.setShowCompare] - Функция для отображения/скрытия окна сравнения (опционально)
 * @param {string} props.language - Текущий язык интерфейса ('ru' или 'en')
 * @param {Function} props.setLanguage - Функция для изменения языка
 * @param {string} props.currency - Текущая валюта ('RUB', 'USD', 'EUR')
 * @param {Function} props.setCurrency - Функция для изменения валюты
 * @param {Function} props.login - Функция входа в систему
 * @param {Function} props.logout - Функция выхода из системы
 * @param {Function} props.formatPrice - Функция форматирования цен
 * 
 * @returns {JSX.Element} Отрендеренный компонент шапки
 */
const Header = ({ 
  cart, 
  notifications, 
  favorites,
  compareList = [],
  user, 
  currentPage,
  setCurrentPage,
  setShowCart,
  setShowChat,
  setShowCompare,
  language,
  setLanguage,
  currency,
  setCurrency,
  login,
  logout,
  formatPrice
}) => {
  // Локальное состояние для голосового поиска
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  // Локальное состояние для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Функция запуска голосового поиска
   * Имитирует распознавание речи и устанавливает результат поиска
   */
  const startVoiceSearch = () => {
    setShowVoiceSearch(true);
    // Имитация распознавания речи
    setTimeout(() => {
      // Устанавливаем пример поискового запроса в зависимости от языка
      setSearchTerm(language === 'ru' ? 'смартфон' : 'smartphone');
      setShowVoiceSearch(false);
    }, 2000);
  };

  // Объект с переводами для интернационализации
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

  /**
   * Функция получения перевода для заданного ключа
   * @param {string} key - Ключ перевода
   * @returns {string} Переведенный текст или исходный ключ, если перевод не найден
   */
  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  // Безопасное вычисление количества товаров в корзине
  const cartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  
  // Безопасное вычисление количества избранных товаров
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;
  
  // Безопасное вычисление количества товаров для сравнения
  const compareCount = Array.isArray(compareList) ? compareList.length : 0;

  // Подсчет непрочитанных уведомлений
  const unreadNotifications = Array.isArray(notifications) 
    ? notifications.filter(n => !n.read).length 
    : 0;

  /**
   * Обработчик клика по иконке корзины
   */
  const handleCartClick = (e) => {
    console.log('=== CART CLICK DEBUG ===');
    console.log('Event:', e);
    console.log('setShowCart:', setShowCart);
    console.log('Current cart:', cart);
    console.log('Cart count:', cartCount);
    
    // Попробуем вызвать функцию напрямую
    try {
      if (typeof setShowCart === 'function') {
        console.log('Calling setShowCart(true)');
        setShowCart(true);
        console.log('setShowCart called successfully');
        
        // Добавим небольшую задержку для проверки
        setTimeout(() => {
          console.log('State should be updated by now');
        }, 100);
      } else {
        console.log('setShowCart is not a function, navigating to cart page');
        setCurrentPage('cart');
      }
    } catch (error) {
      console.error('Error in handleCartClick:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип и навигация */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ShopMaster
            </button>
          </div>
          
          {/* Поисковая строка */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={getTranslation('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button 
                onClick={startVoiceSearch}
                className="absolute right-10 top-2.5 text-gray-400 hover:text-indigo-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
            {/* Индикатор голосового поиска */}
            {showVoiceSearch && (
              <div className="absolute top-full left-0 w-full mt-1 bg-indigo-600 text-white p-2 rounded-lg text-center animate-pulse">
                {getTranslation('voiceSearch')}
              </div>
            )}
          </div>

          {/* Правая часть шапки с иконками */}
          <div className="flex items-center space-x-4">
            {/* Выбор языка и валюты */}
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="ru">🇷🇺 RU</option>
                <option value="en">🇺🇸 EN</option>
              </select>
              
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="RUB">₽ RUB</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
            
            {/* Иконка уведомлений */}
            <button
              onClick={() => setCurrentPage('orders')}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-4l-4 4z" />
              </svg>
              {/* Индикатор новых уведомлений */}
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {/* Иконка избранного */}
            <button
              onClick={() => setCurrentPage('favorites')}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {/* Индикатор количества избранных товаров */}
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            
            {/* Иконка сравнения */}
            <button
              onClick={() => {
                if (typeof setShowCompare === 'function') {
                  setShowCompare(true);
                } else {
                  setCurrentPage('compare');
                }
              }}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {/* Индикатор количества товаров в сравнении */}
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>
            
            {/* Иконка корзины */}
            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              aria-label={`${getTranslation('cart')} (${cartCount} items)`}
            >
              <svg
                className="h-6 w-6"
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
              {/* Индикатор количества товаров в корзине */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Блок пользователя (авторизован/не авторизован) */}
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage('orders')}
                  className="text-sm text-gray-600 hover:text-indigo-600"
                >
                  {user.name}
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-red-600"
                >
                  {getTranslation('logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {getTranslation('login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;