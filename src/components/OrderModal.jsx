/**
 * Модальное окно подтверждения заказа — отображает детали оформленного заказа.
 *
 * @component
 * @param {Object} props - Входные параметры
 * @param {boolean} props.showOrderModal - Управляет видимостью модального окна
 * @param {Function} props.setShowOrderModal - Функция закрытия модального окна
 * @param {Function} props.setCurrentPage - Функция навигации (например, переход к "orders")
 * @param {string} props.language - Язык интерфейса ('ru', 'en')
 * @param {Array<Object>} props.cart - Товары, включённые в заказ (сохранённая копия)
 * @param {Object} props.totals - Предварительно посчитанные итоги: subtotal, discount, shipping, total
 * @param {number} props.orderNumber - ID заказа (используется для отображения номера)
 * @param {Function} props.formatPrice - Функция форматирования цен (например, "1 999 ₽")
 *
 * @example
 * <OrderModal
 *   showOrderModal={true}
 *   setShowOrderModal={setShowOrderModal}
 *   setCurrentPage={setCurrentPage}
 *   language="ru"
 *   cart={orderCart}
 *   totals={orderTotals}
 *   orderNumber={123456}
 *   formatPrice={formatPrice}
 * />
 *
 * @description
 * Особенности:
 * - Отображает итоговую сумму и количество товаров из сохранённых данных
 * - Не зависит от текущего состояния корзины (которая уже может быть пустой)
 * - Показывает номер заказа (последние 6 цифр)
 * - Поддерживает мультиязычный интерфейс
 * - Закрывается по клику на фон или кнопку
 */
const OrderModal = ({
                        showOrderModal,
                        setShowOrderModal,
                        setCurrentPage,
                        language,
                        cart,
                        totals,
                        orderNumber,
                        formatPrice
                    }) => {
    // === Локализация ===

    /**
     * Объект с переводами для интерфейса.
     * @type {Object}
     */
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

    /**
     * Возвращает перевод строки по ключу.
     * @param {string} key - Ключ локализации
     * @returns {string} Переведённая строка
     */
    const getTranslation = (key) => {
        return translations[language]?.[key] || key;
    };

    // === Условный рендер: не показывать, если скрыто ===
    if (!showOrderModal) return null;

    // === Вычисление количества товаров ===
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // === Рендер ===
    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            aria-labelledby="order-modal-title"
        >
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Подложка */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={() => setShowOrderModal(false)}
                    aria-hidden="true"
                />

                {/* Модальное окно */}
                <div className="relative bg-white rounded-lg max-w-lg w-full p-6">
                    <div className="text-center">
                        {/* Иконка успеха */}
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Заголовок */}
                        <h3 id="order-modal-title" className="text-2xl font-bold mb-2">
                            {getTranslation('orderConfirmed')}
                        </h3>

                        {/* Номер заказа */}
                        <p className="text-gray-600 mb-6">
                            {getTranslation('thankYou')}{' '}
                            {language === 'ru' ? 'Номер вашего заказа:' : 'Your order number:'}{' '}
                            <strong>#{orderNumber?.toString().slice(-6) || '—'}</strong>
                        </p>

                        {/* Блок с итогами */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between mb-2">
                                <span>{language === 'ru' ? 'Сумма заказа:' : 'Order amount:'}</span>
                                <span className="font-semibold">{formatPrice(totals?.total || 0)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{language === 'ru' ? 'Товаров:' : 'Products:'}</span>
                                <span>{totalItems} шт.</span>
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setShowOrderModal(false);
                                    setCurrentPage('orders');
                                }}
                                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                {getTranslation('myOrders')}
                            </button>
                            <button
                                onClick={() => {
                                    setShowOrderModal(false);
                                    setCurrentPage('home');
                                }}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                {getTranslation('continueShopping')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;