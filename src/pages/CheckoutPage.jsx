import {pickupPoints} from "../data/pickupPoints";

/**
 * Страница оформления заказа — пошаговая форма с доставкой, оплатой и подтверждением.
 *
 * @component
 * @param {Object} props - Входные параметры компонента
 * @param {Array<Object>} props.cart - Текущая корзина с товарами
 * @param {Object} props.orderForm - Состояние формы заказа (шаг, доставка, оплата)
 * @param {Function} props.setOrderForm - Функция обновления формы заказа
 * @param {Object|null} props.appliedCoupon - Применённый промокод
 * @param {Function} props.completeOrder - Функция завершения заказа
 * @param {Function} props.setCurrentPage - Функция навигации (например, переход к "orders")
 * @param {string} props.language - Язык интерфейса ('ru', 'en')
 * @param {string} props.currency - Код валюты ('RUB', 'USD')
 * @param {Function} props.formatPrice - Функция форматирования цен
 * @param {Function} props.getCartTotals - Утилита подсчёта итогов (сумма, скидка, доставка)
 *
 * @example
 * <CheckoutPage
 *   cart={cart}
 *   orderForm={orderForm}
 *   setOrderForm={setOrderForm}
 *   appliedCoupon={appliedCoupon}
 *   completeOrder={completeOrder}
 *   setCurrentPage={setCurrentPage}
 *   language="ru"
 *   currency="RUB"
 *   formatPrice={formatPrice}
 *   getCartTotals={getCartTotals}
 * />
 *
 * @description
 * Особенности:
 * - Пошаговая форма: доставка → оплата → подтверждение
 * - Прогресс-бар с индикатором шагов
 * - Поддержка двух способов доставки: курьер и самовывоз
 * - Два способа оплаты: карта и наличные
 * - Отображение итогов и применённого промокода
 * - Мультиязычный интерфейс
 * - Адаптивная сетка: форма слева, сводка справа
 *
 * Использует данные из `pickupPoints.js` для пунктов самовывоза.
 */
const CheckoutPage = ({
                          cart,
                          orderForm,
                          setOrderForm,
                          appliedCoupon,
                          completeOrder,
                          setCurrentPage,
                          language,
                          currency,
                          formatPrice,
                          getCartTotals
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
            satSun: 'Сб-Вс: 10:00 - 18:00',
            free: 'Бесплатно'
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
            free: 'Free'
        }
    };

    /**
     * Возвращает перевод строки по ключу.
     * Если перевод отсутствует — возвращает ключ.
     *
     * @param {string} key - Ключ локализации (например, 'delivery', 'payment')
     * @returns {string} Переведённая строка
     */
    const getTranslation = (key) => {
        return translations[language]?.[key] || key;
    };

    // === Подсчёт итогов ===

    /**
     * Итоговые суммы корзины: с учётом промокода, скидки и доставки.
     * @type {Object}
     */
    const totals = getCartTotals(cart, appliedCoupon);

    // === Управление шагами ===

    /**
     * Переходит к следующему шагу или завершает заказ.
     */
    const handleNextStep = () => {
        if (orderForm.step < 3) {
            setOrderForm(prev => ({ ...prev, step: prev.step + 1 }));
        } else {
            completeOrder();
        }
    };

    /**
     * Возвращается к предыдущему шагу.
     */
    const handlePrevStep = () => {
        if (orderForm.step > 1) {
            setOrderForm(prev => ({ ...prev, step: prev.step - 1 }));
        }
    };

    // === Рендер ===

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Заголовок */}
            <h1 className="text-3xl font-bold mb-8">
                {language === 'ru' ? 'Оформление заказа' : 'Checkout'}
            </h1>

            {/* Прогресс-бар шагов */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        {/* Круг с номером шага */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            orderForm.step >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                            {step}
                        </div>
                        {/* Название шага */}
                        <span className={`ml-2 font-medium ${
                            orderForm.step >= step ? 'text-indigo-600' : 'text-gray-500'
                        }`}>
              {step === 1
                  ? getTranslation('delivery')
                  : step === 2
                      ? getTranslation('payment')
                      : getTranslation('confirm')}
            </span>
                        {/* Линия между шагами */}
                        {step < 3 && (
                            <div className={`w-16 h-1 mx-4 ${
                                orderForm.step > step ? 'bg-indigo-600' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Основной контент: форма + сводка */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Основная форма (3 шага) */}
                <div className="lg:col-span-2">
                    {/* Шаг 1: Доставка */}
                    {orderForm.step === 1 && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-6">{getTranslation('delivery')}</h2>

                            <div className="space-y-4">
                                {/* Курьерская доставка */}
                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="courier"
                                        checked={orderForm.delivery.type === 'courier'}
                                        onChange={(e) => setOrderForm(prev => ({
                                            ...prev,
                                            delivery: { ...prev.delivery, type: e.target.value }
                                        }))}
                                        className="text-indigo-600"
                                        aria-label={language === 'ru' ? 'Курьерская доставка' : 'Courier delivery'}
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {language === 'ru' ? 'Курьерская доставка' : 'Courier delivery'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {language === 'ru' ? '1-3 дня, 500 ₽' : '1-3 days, 500 ₽'}
                                        </div>
                                    </div>
                                </label>

                                {/* Самовывоз */}
                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="pickup"
                                        checked={orderForm.delivery.type === 'pickup'}
                                        onChange={(e) => setOrderForm(prev => ({
                                            ...prev,
                                            delivery: { ...prev.delivery, type: e.target.value }
                                        }))}
                                        className="text-indigo-600"
                                        aria-label={language === 'ru' ? 'Самовывоз' : 'Pickup'}
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {language === 'ru' ? 'Самовывоз' : 'Pickup'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {language === 'ru' ? 'Бесплатно, сегодня' : 'Free, today'}
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Поля для курьерской доставки */}
                            {orderForm.delivery.type === 'courier' && (
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'ru' ? 'Город' : 'City'}
                                        </label>
                                        <input
                                            type="text"
                                            value={orderForm.delivery.city}
                                            onChange={(e) => setOrderForm(prev => ({
                                                ...prev,
                                                delivery: { ...prev.delivery, city: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder={language === 'ru' ? 'Москва' : 'Moscow'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'ru' ? 'Адрес' : 'Address'}
                                        </label>
                                        <input
                                            type="text"
                                            value={orderForm.delivery.address}
                                            onChange={(e) => setOrderForm(prev => ({
                                                ...prev,
                                                delivery: { ...prev.delivery, address: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder={language === 'ru' ? 'Улица, дом, квартира' : 'Street, building, apartment'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'ru' ? 'Телефон' : 'Phone'}
                                        </label>
                                        <input
                                            type="tel"
                                            value={orderForm.delivery.phone}
                                            onChange={(e) => setOrderForm(prev => ({
                                                ...prev,
                                                delivery: { ...prev.delivery, phone: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="+7 (999) 999-99-99"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Выбор пункта самовывоза */}
                            {orderForm.delivery.type === 'pickup' && (
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-4">
                                        {language === 'ru' ? 'Выберите пункт самовывоза' : 'Select pickup point'}
                                    </h3>
                                    <div className="space-y-4">
                                        {pickupPoints.map(point => (
                                            <div key={point.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <div className="font-medium">{point.name[language]}</div>
                                                    <div className="text-sm text-gray-600">{point.address}</div>
                                                    <div className="text-sm text-green-600">
                                                        {language === 'ru' ? 'Открыто до' : 'Open until'} {point.closingTime}
                                                    </div>
                                                </div>
                                                <button className="text-indigo-600 text-sm">
                                                    {language === 'ru' ? 'Выбрать' : 'Select'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Шаг 2: Оплата */}
                    {orderForm.step === 2 && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-6">{getTranslation('payment')}</h2>

                            <div className="space-y-4">
                                {/* Оплата картой */}
                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={orderForm.payment.method === 'card'}
                                        onChange={(e) => setOrderForm(prev => ({
                                            ...prev,
                                            payment: { ...prev.payment, method: e.target.value }
                                        }))}
                                        className="text-indigo-600"
                                        aria-label={language === 'ru' ? 'Оплата картой' : 'Pay by card'}
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {language === 'ru' ? 'Банковской картой' : 'By card'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {language === 'ru' ? 'Безопасная оплата' : 'Secure payment'}
                                        </div>
                                    </div>
                                </label>

                                {/* Оплата наличными */}
                                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cash"
                                        checked={orderForm.payment.method === 'cash'}
                                        onChange={(e) => setOrderForm(prev => ({
                                            ...prev,
                                            payment: { ...prev.payment, method: e.target.value }
                                        }))}
                                        className="text-indigo-600"
                                        aria-label={language === 'ru' ? 'Оплата наличными' : 'Cash on delivery'}
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {language === 'ru' ? 'Наличными' : 'Cash'}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {language === 'ru' ? 'При получении' : 'Upon delivery'}
                                        </div>
                                    </div>
                                </label>
                            </div>

                            {/* Поля для оплаты картой */}
                            {orderForm.payment.method === 'card' && (
                                <div className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'ru' ? 'Номер карты' : 'Card number'}
                                        </label>
                                        <input
                                            type="text"
                                            value={orderForm.payment.cardNumber}
                                            onChange={(e) => setOrderForm(prev => ({
                                                ...prev,
                                                payment: { ...prev.payment, cardNumber: e.target.value }
                                            }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {language === 'ru' ? 'Срок действия' : 'Expiry date'}
                                            </label>
                                            <input
                                                type="text"
                                                value={orderForm.payment.expiry}
                                                onChange={(e) => setOrderForm(prev => ({
                                                    ...prev,
                                                    payment: { ...prev.payment, expiry: e.target.value }
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                placeholder="MM/YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                value={orderForm.payment.cvv}
                                                onChange={(e) => setOrderForm(prev => ({
                                                    ...prev,
                                                    payment: { ...prev.payment, cvv: e.target.value }
                                                }))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Шаг 3: Подтверждение */}
                    {orderForm.step === 3 && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-6">{getTranslation('confirm')}</h2>

                            <div className="space-y-4">
                                {/* Доставка */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-2">{getTranslation('delivery')}</h3>
                                    <p>
                                        {orderForm.delivery.type === 'courier'
                                            ? (language === 'ru' ? 'Курьерская доставка' : 'Courier delivery')
                                            : (language === 'ru' ? 'Самовывоз' : 'Pickup')}
                                    </p>
                                    {orderForm.delivery.type === 'courier' && (
                                        <>
                                            <p>{orderForm.delivery.city}</p>
                                            <p>{orderForm.delivery.address}</p>
                                            <p>{orderForm.delivery.phone}</p>
                                        </>
                                    )}
                                </div>

                                {/* Оплата */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-2">{getTranslation('payment')}</h3>
                                    <p>
                                        {orderForm.payment.method === 'card'
                                            ? (language === 'ru' ? 'Банковской картой' : 'By card')
                                            : (language === 'ru' ? 'Наличными' : 'Cash')}
                                    </p>
                                    {orderForm.payment.method === 'card' && (
                                        <p>
                                            {language === 'ru' ? 'Карта:' : 'Card:'} **** **** **** {orderForm.payment.cardNumber.slice(-4)}
                                        </p>
                                    )}
                                </div>

                                {/* Товары */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-2">
                                        {language === 'ru' ? 'Товары' : 'Products'}
                                    </h3>
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {typeof item.name === 'object' ? item.name[language] : item.name} x{item.quantity}
                      </span>
                                            <span>{formatPrice(item.finalPrice * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Итоги */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-2">{getTranslation('total')}</h3>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span>{getTranslation('subtotal')}</span>
                                            <span>{formatPrice(totals.subtotal)}</span>
                                        </div>
                                        {appliedCoupon && (
                                            <div className="flex justify-between text-green-600">
                                                <span>{getTranslation('discount')}</span>
                                                <span>-{formatPrice(totals.discount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>{getTranslation('shipping')}</span>
                                            <span>
                        {totals.shipping === 0
                            ? getTranslation('free')
                            : formatPrice(totals.shipping)}
                      </span>
                                        </div>
                                        <div className="border-t pt-2 font-bold">
                                            <div className="flex justify-between">
                                                <span>{language === 'ru' ? 'Итого к оплате' : 'Total to pay'}</span>
                                                <span>{formatPrice(totals.total)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Сводка заказа (справа) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4">
                        {language === 'ru' ? 'Ваш заказ' : 'Your order'}
                    </h3>

                    <div className="space-y-4 mb-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                                <img
                                    src={item.images?.[0] || 'https://placehold.co/40x40/ddd/333?text=No+Image'}
                                    alt={typeof item.name === 'object' ? item.name[language] : item.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium">
                                        {typeof item.name === 'object' ? item.name[language] : item.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">{item.quantity} шт.</p>
                                </div>
                                <p className="text-sm font-semibold">
                                    {formatPrice(item.finalPrice * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Итоги */}
                    <div className="border-t pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>{getTranslation('subtotal')}</span>
                                <span>{formatPrice(totals.subtotal)}</span>
                            </div>
                            {appliedCoupon && (
                                <div className="flex justify-between text-green-600">
                                    <span>{getTranslation('discount')}</span>
                                    <span>-{formatPrice(totals.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>{getTranslation('shipping')}</span>
                                <span>
                  {totals.shipping === 0
                      ? getTranslation('free')
                      : formatPrice(totals.shipping)}
                </span>
                            </div>
                            <div className="border-t pt-2 font-bold">
                                <div className="flex justify-between">
                                    <span>{getTranslation('total')}</span>
                                    <span>{formatPrice(totals.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Кнопки навигации */}
                    <div className="flex space-x-4 mt-6">
                        {/* Назад */}
                        {orderForm.step > 1 && (
                            <button
                                onClick={handlePrevStep}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                {getTranslation('back')}
                            </button>
                        )}
                        {/* Далее / Оформить */}
                        <button
                            onClick={handleNextStep}
                            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            {orderForm.step < 3
                                ? getTranslation('next')
                                : getTranslation('completeOrder')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;