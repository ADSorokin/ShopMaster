// src/pages/HomePage.jsx
import ProductCard from '../components/ProductCard';

const HomePage = ({ 
  products, 
  categories, 
  selectedCategory, 
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  addToCart,
  toggleFavorite,
  toggleCompare,
  favorites,
  compareList,
  setCurrentPage,
  setCurrentProduct,
  language,
  currency,
  formatPrice
}) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4" itemProp="headline">
            {language === 'ru' ? 'Современные технологии для вашего дома' : 'Modern technology for your home'}
          </h1>
          <p className="text-xl mb-6 opacity-90" itemProp="description">
            {language === 'ru' ? 'Найдите лучшие товары по специальным ценам' : 'Find the best products at special prices'}
          </p>
          <button
            onClick={() => setCurrentPage('electronics')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {language === 'ru' ? 'Перейти к покупкам' : 'Go shopping'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(category.id === 'all' ? 'home' : category.id);
              }}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={getTranslation('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filters.brand}
            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">{language === 'ru' ? 'Все бренды' : 'All brands'}</option>
            {Array.from(new Set(products.map(p => p.brand))).map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            value={filters.rating}
            onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value={0}>{language === 'ru' ? 'Все оценки' : 'All ratings'}</option>
            <option value={4}>4+ ⭐</option>
            <option value={4.5}>4.5+ ⭐</option>
            <option value={4.8}>4.8+ ⭐</option>
          </select>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {getTranslation('price')}: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [parseInt(e.target.value), prev.priceRange[1]] }))}
            className="flex-1"
          />
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
            className="flex-1"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            toggleCompare={toggleCompare}
            favorites={favorites}
            compareList={compareList}
            language={language}
            currency={currency}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      {products.length === 0 && (
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {language === 'ru' ? 'Товары не найдены' : 'Products not found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {language === 'ru' ? 'Попробуйте изменить параметры поиска или выбрать другую категорию.' : 
             'Try changing search parameters or selecting another category.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;