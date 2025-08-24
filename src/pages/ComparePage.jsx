// src/pages/ComparePage.jsx
import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const ComparePage = ({ 
  compareList, 
  products, 
  toggleCompare, 
  addToCart, 
  toggleFavorite, 
  favorites, 
  setCurrentPage, 
  setCurrentProduct, 
  language, 
  currency, 
  formatPrice 
}) => {
  const [activeTab, setActiveTab] = useState('specifications');

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
      clearCompare: 'Очистить сравнение',
      compare: 'Сравнение',
      clearComparison: 'Очистить сравнение',
      product: 'Товар'

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
      clearCompare: 'Clear comparison',
      compare: 'Comparison',
      clearComparison: 'Clear comparison',
      product: 'Product'
    }
  };

  const getTranslation = (key) => {
    return translations[language][key] || key;
  };

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  const clearComparison = () => {
    comparedProducts.forEach(product => {
      if (toggleCompare) {
        toggleCompare(product);
      }
    });
  };

  const getSpecifications = (product) => {
    return product.specifications?.[language] || {};
  };

  const getAllSpecifications = () => {
    const allSpecs = new Set();
    comparedProducts.forEach(product => {
      const specs = getSpecifications(product);
      Object.keys(specs).forEach(key => {
        allSpecs.add(key);
      });
    });
    return Array.from(allSpecs).filter(key => 
      !['partNumber', 'manufacturer', 'warrantyPeriod', 'color'].includes(key)
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{getTranslation('compare')}</h1>
        <div className="flex space-x-4">
          <button
            onClick={clearComparison}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            {getTranslation('clearComparison')}
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {getTranslation('continueShopping')}
          </button>
        </div>
      </div>

      {comparedProducts.length === 0 ? (
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
        <div>
          {/* Product Cards */}
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparedProducts.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard 
                    product={product} 
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    toggleCompare={toggleCompare}
                    favorites={favorites}
                    compareList={compareList}
                    language={language}
                    currency={currency}
                    formatPrice={formatPrice}
                    setCurrentPage={setCurrentPage}
                    setCurrentProduct={setCurrentProduct}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (toggleCompare) {
                        toggleCompare(product);
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 shadow-md"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'specifications'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {getTranslation('specifications')}
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {getTranslation('description')}
                </button>
              </nav>
            </div>

            {activeTab === 'specifications' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {getTranslation('specification')}
                      </th>
                      {comparedProducts.map(product => (
                        <th key={product.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {typeof product.name === 'object' ? product.name[language] : product.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getAllSpecifications().map(specKey => (
                      <tr key={specKey}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {specKey}
                        </td>
                        {comparedProducts.map(product => {
                          const specs = getSpecifications(product);
                          return (
                            <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {specs[specKey] || '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'description' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {comparedProducts.map(product => {
                    const currentDescription = typeof product.description === 'object' ? product.description[language] : product.description;
                    return (
                      <div key={product.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">
                          {typeof product.name === 'object' ? product.name[language] : product.name}
                        </h3>
                        <p className="text-gray-700">{currentDescription}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;