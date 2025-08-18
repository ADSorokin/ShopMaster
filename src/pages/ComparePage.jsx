// src/pages/ComparePage.jsx
import ProductCard from '../components/ProductCard';

const ComparePage = ({ compareList, setCompareList, setCurrentPage, products, language, currency, formatPrice, toggleCompare }) => {
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
      compare: 'Сравнение',
      partNumber: 'Артикул',
      manufacturer: 'Производитель',
      warrantyPeriod: 'Гарантийный срок',
      color: 'Цвет',
      size: 'Размер',
      material: 'Материал',
      weight: 'Вес',
      dimensions: 'Габариты',
      noFavorites: 'У вас пока нет избранных товаров',
      noCompare: 'Добавьте товары для сравнения',
      remove: 'Удалить',
      clearAll: 'Очистить все',
      specification: 'Характеристика',
      value: 'Значение',
      clearFavorites: 'Очистить избранное',
      clearCompare: 'Очистить сравнение'
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
      compare: 'Comparison',
      partNumber: 'Part Number',
      manufacturer: 'Manufacturer',
      warrantyPeriod: 'Warranty Period',
      color: 'Color',
      size: 'Size',
      material: 'Material',
      weight: 'Weight',
      dimensions: 'Dimensions',
      noFavorites: 'You don\'t have any favorite products yet',
      noCompare: 'Add products to compare',
      remove: 'Remove',
      clearAll: 'Clear all',
      specification: 'Specification',
      value: 'Value',
      clearFavorites: 'Clear favorites',
      clearCompare: 'Clear comparison'
    }
  };

  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  const compareProducts = products.filter(p => compareList.includes(p.id));

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{getTranslation('compare')}</h1>
        <div className="flex space-x-4">
          <button
            onClick={clearCompare}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {getTranslation('clearAll')}
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {getTranslation('continueShopping')}
          </button>
        </div>
      </div>

      {compareProducts.length === 0 ? (
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="mt-2 text-gray-500">{getTranslation('noCompare')}</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {getTranslation('continueShopping')}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {getTranslation('specification')}
                </th>
                {compareProducts.map(product => (
                  <th key={product.id} className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={product.images[0]}
                        alt={typeof product.name === 'object' ? product.name[language] : product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {typeof product.name === 'object' ? product.name[language] : product.name}
                        </div>
                        <div className="text-sm text-indigo-600 font-bold">
                          {formatPrice(product.discount ? product.price * (1 - product.discount / 100) : product.price)}
                        </div>
                        <button
                          onClick={() => toggleCompare(product)}
                          className="mt-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          {getTranslation('remove')}
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(compareProducts[0].specifications[language]).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {key}
                  </td>
                  {compareProducts.map(product => (
                    <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {product.specifications[language][key] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparePage;