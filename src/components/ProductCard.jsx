// src/components/ProductCard.jsx
import { useState } from 'react';

/**
 * Компонент карточки товара
 * 
 * Отображает карточку с информацией о товаре, включая изображение, название,
 * описание, рейтинг, цену и кнопки действий (добавить в корзину, избранное, сравнение).
 * 
 * При клике на карточку (не на кнопки) происходит переход к странице товара.
 * 
 * @param {Object} props - Свойства компонента
 * @param {Object} props.product - Объект товара с информацией
 * @param {Function} props.addToCart - Функция для добавления товара в корзину
 * @param {Function} props.toggleFavorite - Функция для добавления/удаления из избранного
 * @param {Function} props.toggleCompare - Функция для добавления/удаления из сравнения
 * @param {Array} props.favorites - Массив ID избранных товаров
 * @param {Array} props.compareList - Массив ID товаров для сравнения
 * @param {string} props.language - Текущий язык интерфейса ('ru' или 'en')
 * @param {string} props.currency - Текущая валюта ('RUB', 'USD', 'EUR')
 * @param {Function} props.formatPrice - Функция форматирования цен
 * @param {Function} props.setCurrentPage - Функция для изменения текущей страницы
 * @param {Function} props.setCurrentProduct - Функция для установки текущего товара
 * 
 * @returns {JSX.Element} Отрендеренный компонент карточки товара
 */
const ProductCard = ({ 
  product, 
  addToCart, 
  toggleFavorite, 
  toggleCompare, 
  favorites, 
  compareList, 
  language,
  currency,
  formatPrice,
  setCurrentPage,
  setCurrentProduct
}) => {
  // Локальное состояние для анимации при наведении
  const [isHovered, setIsHovered] = useState(false);

  // Получаем название товара в зависимости от языка
  const currentName = typeof product.name === 'object' ? product.name[language] : product.name;
  // Получаем описание товара в зависимости от языка
  const currentDescription = typeof product.description === 'object' ? product.description[language] : product.description;

  /**
   * Обработчик клика по карточке товара
   * Проверяет, был ли клик по кнопке или иконке, и если нет - переходит к странице товара
   * 
   * @param {Object} e - Объект события клика
   */
  const handleCardClick = (e) => {
    console.log('=== PRODUCT CARD CLICK DEBUG ===');
    console.log('Click event:', e);
    console.log('Event target:', e.target);
    console.log('Closest button:', e.target.closest('button'));
    console.log('Closest svg:', e.target.closest('svg'));
    console.log('Closest path:', e.target.closest('path'));
    console.log('Product data:', product);
    console.log('Available functions:', { setCurrentProduct, setCurrentPage });
    
    // Проверяем, был ли клик по кнопке, иконке или другому интерактивному элементу
    if (e.target.closest('button') || 
        e.target.closest('svg') || 
        e.target.closest('path') || 
        e.target.closest('.no-navigate')) {
      console.log('Click was on interactive element, navigation prevented');
      return;
    }
    
    // Проверяем наличие необходимых функций
    if (setCurrentProduct && setCurrentPage) {
      console.log('Navigating to product page:', product);
      try {
        setCurrentProduct(product);
        console.log('Current product set successfully');
        
        setCurrentPage('product');
        console.log('Page changed to product');
      } catch (error) {
        console.error('Error during navigation:', error);
      }
    } else {
      console.warn('Navigation functions are not available');
      console.warn('setCurrentProduct:', setCurrentProduct);
      console.warn('setCurrentPage:', setCurrentPage);
      
      // Дополнительная диагностика - проверяем все пропсы
      console.log('All props received:', { 
        product, 
        addToCart, 
        toggleFavorite, 
        toggleCompare, 
        favorites, 
        compareList, 
        language,
        currency,
        formatPrice,
        setCurrentPage,
        setCurrentProduct
      });
    }
  };

  /**
   * Обработчик добавления товара в корзину
   * Останавливает всплытие события, чтобы не сработал переход к странице товара
   * 
   * @param {Object} e - Объект события клика
   */
  const handleAddToCart = (e) => {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('Adding to cart:', product);
    console.log('Event:', e);
    
    // Останавливаем всплытие события
    e.stopPropagation();
    
    if (addToCart) {
      try {
        addToCart(product);
        console.log('Product added to cart successfully');
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      console.warn('addToCart function is not available');
    }
  };

  /**
   * Обработчик добавления/удаления товара из избранного
   * Останавливает всплытие события
   * 
   * @param {Object} e - Объект события клика
   */
  const handleToggleFavorite = (e) => {
    console.log('=== TOGGLE FAVORITE DEBUG ===');
    console.log('Toggling favorite for:', product);
    console.log('Current favorites:', favorites);
    console.log('Event:', e);
    
    // Останавливаем всплытие события
    e.stopPropagation();
    
    if (toggleFavorite) {
      try {
        toggleFavorite(product);
        console.log('Favorite toggle successful');
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    } else {
      console.warn('toggleFavorite function is not available');
    }
  };

  /**
   * Обработчик добавления/удаления товара из сравнения
   * Останавливает всплытие события
   * 
   * @param {Object} e - Объект события клика
   */
  const handleToggleCompare = (e) => {
    console.log('=== TOGGLE COMPARE DEBUG ===');
    console.log('Toggling compare for:', product);
    console.log('Current compare list:', compareList);
    console.log('Event:', e);
    
    // Останавливаем всплытие события
    e.stopPropagation();
    
    if (toggleCompare) {
      try {
        toggleCompare(product);
        console.log('Compare toggle successful');
      } catch (error) {
        console.error('Error toggling compare:', error);
      }
    } else {
      console.warn('toggleCompare function is not available');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.images?.[0] || 'https://placehold.co/400x300/ddd/333?text=No+Image'}
          alt={currentName}
          className="w-full h-48 object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              favorites?.includes(product.id)
                ? 'bg-red-100 text-red-600'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={favorites?.includes(product.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-full transition-colors ${
              compareList?.includes(product.id)
                ? 'bg-indigo-100 text-indigo-600'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={compareList?.includes(product.id) ? 'Remove from compare' : 'Add to compare'}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{currentName}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{currentDescription}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600">({product.reviews?.length || 0})</span>
          </div>
          <span className="text-sm text-gray-600">{product.stock} {language === 'ru' ? 'в наличии' : 'in stock'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-indigo-600">
              {formatPrice ? formatPrice(product.discount ? product.price * (1 - product.discount / 100) : product.price) : `${product.price} ${currency}`}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice ? formatPrice(product.price) : `${product.price} ${currency}`}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          {language === 'ru' ? 'В корзину' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;