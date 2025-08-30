/**
 * Главный компонент приложения "ShopMaster" — управляет состоянием, навигацией и рендерингом страниц.
 *
 * @component
 * @example
 * return <App />;
 *
 * @description
 * Этот компонент:
 * - Управляет глобальным состоянием (корзина, пользователь, заказы, фильтры и т.д.)
 * - Реализует навигацию между страницами
 * - Обрабатывает взаимодействия (добавление в корзину, вход, заказ и др.)
 * - Рендерит основные UI-элементы: хедер, футер, виджет чата, модальные окна
 *
 * Особое внимание уделено:
 * - Корректному отображению итогов в `OrderModal`
 * - Сохранению данных заказа до очистки корзины
 * - Поддержке мультиязычности (ru/en) и мультивалютности (RUB/USD/EUR)
 */
import { useState } from 'react';

// Компоненты
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import ChatWidget from './components/ChatWidget';
import OrderModal from './components/OrderModal';
import AddToCartAnimation from './components/AddToCartAnimation';

// Данные
import { products } from './data/products';
import { categories } from './data/categories';
import { pickupPoints } from './data/pickupPoints';
import { currencies } from './data/currencies';

// Утилиты
import { formatPrice, getCartTotals } from './utils/helpers';

const App = () => {
    // === Состояние приложения ===

    const [currentPage, setCurrentPage] = useState('home');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState({
        priceRange: [0, 200000],
        brand: '',
        rating: 0
    });
    const [viewedProducts, setViewedProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'sale', message: 'Скидка 20% на электронику!', time: '10 мин назад', read: false },
        { id: 2, type: 'order', message: 'Ваш заказ №12345 отправлен!', time: '1 час назад', read: false }
    ]);
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'bot', text: 'Здравствуйте! Чем могу помочь?', time: '10:30' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [showAddAnimation, setShowAddAnimation] = useState(false);
    const [showVoiceSearch, setShowVoiceSearch] = useState(false);
    const [orderForm, setOrderForm] = useState({
        step: 1,
        delivery: { type: 'courier', address: '', city: '', phone: '' },
        payment: { method: 'card', cardNumber: '', expiry: '', cvv: '' }
    });
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [coupons] = useState([
        { code: 'WELCOME10', discount: 10, valid: true },
        { code: 'SUMMER20', discount: 20, valid: true },
        { code: 'FREESHIP', discount: 0, valid: true, freeShipping: true }
    ]);
    const [language, setLanguage] = useState('ru');
    const [currency, setCurrency] = useState('RUB');

    // ✅ Новое состояние: данные для модалки (чтобы не зависеть от пустой корзины)
    const [orderModalData, setOrderModalData] = useState({
        cart: [],
        totals: { subtotal: 0, discount: 0, shipping: 500, total: 0 },
        orderNumber: null
    });

    // === Фильтрация товаров ===
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        const currentName = typeof product.name === 'object' ? product.name[language] : product.name;
        const currentDescription = typeof product.description === 'object' ? product.description[language] : product.description;

        const matchesSearch = currentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesBrand = !filters.brand || product.brand.toLowerCase().includes(filters.brand.toLowerCase());
        const matchesRating = product.rating >= filters.rating;

        return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesRating;
    });

    // === Функции ===

    const addToCart = (product, selectedOptions = {}) => {
        setCart(prev => {
            const existing = prev.find(item =>
                item.id === product.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );

            if (existing) {
                return prev.map(item =>
                    item.id === product.id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                    selectedOptions,
                    finalPrice: product.discount ? product.price * (1 - product.discount / 100) : product.price
                }
            ];
        });

        if (!viewedProducts.some(p => p.id === product.id)) {
            setViewedProducts(prev => [product, ...prev].slice(0, 5));
        }

        setShowAddAnimation(true);
        setTimeout(() => setShowAddAnimation(false), 1500);
    };

    const toggleFavorite = (product) => {
        setFavorites(prev =>
            prev.includes(product.id)
                ? prev.filter(id => id !== product.id)
                : [...prev, product.id]
        );
    };

    const toggleCompare = (product) => {
        setCompareList(prev =>
            prev.includes(product.id)
                ? prev.filter(id => id !== product.id)
                : [...prev, product.id]
        );
    };

    const applyCouponCode = (code) => {
        const coupon = coupons.find(c => c.code === code && c.valid);
        if (coupon) {
            setAppliedCoupon(coupon);
            addNotification('coupon', `Промокод ${code} применен!`, 'success');
            return true;
        }
        addNotification('error', 'Неверный промокод', 'error');
        return false;
    };

    const addNotification = (type, message, severity = 'info') => {
        const newNotification = {
            id: Date.now(),
            type,
            message,
            time: 'только что',
            read: false,
            severity
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const sendChatMessage = () => {
        if (chatInput.trim()) {
            setChatMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    sender: 'user',
                    text: chatInput,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            setChatInput('');

            setTimeout(() => {
                setChatMessages(prev => [
                    ...prev,
                    {
                        id: Date.now(),
                        sender: 'bot',
                        text: language === 'ru'
                            ? 'Спасибо за ваше сообщение! Наш менеджер свяжется с вами в ближайшее время.'
                            : 'Thank you for your message! Our manager will contact you shortly.',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                ]);
            }, 1000);
        }
    };

    const startVoiceSearch = () => {
        setShowVoiceSearch(true);
        setTimeout(() => {
            setSearchTerm(language === 'ru' ? 'смартфон' : 'smartphone');
            setShowVoiceSearch(false);
        }, 2000);
    };

    /**
     * Оформляет заказ.
     * ВАЖНО: сохраняет данные заказа ДО очистки корзины.
     */
    const completeOrder = () => {
        // ✅ Сохраняем корзину и итоги ДО очистки
        const cartAtOrderTime = [...cart];
        const totals = getCartTotals(cartAtOrderTime, appliedCoupon);
        const orderId = Date.now();

        const newOrder = {
            id: orderId,
            items: cartAtOrderTime,
            totals,
            delivery: orderForm.delivery,
            payment: orderForm.payment,
            status: 'processing',
            date: new Date().toISOString().split('T')[0]
        };

        setOrders(prev => [newOrder, ...prev]);

        // ✅ Очищаем корзину ПОСЛЕ сохранения
        setCart([]);
        setAppliedCoupon(null);
        setOrderForm({
            step: 1,
            delivery: { type: 'courier', address: '', city: '', phone: '' },
            payment: { method: 'card', cardNumber: '', expiry: '', cvv: '' }
        });

        // ✅ Передаём данные в модалку
        setOrderModalData({
            cart: cartAtOrderTime,
            totals,
            orderNumber: orderId
        });

        setShowOrderModal(true);

        addNotification('order',
            language === 'ru'
                ? `Заказ №${orderId.toString().slice(-6)} оформлен!`
                : `Order №${orderId.toString().slice(-6)} confirmed!`,
            'success'
        );
    };

    const login = (email, password) => {
        setUser({
            name: language === 'ru' ? 'Иван Петров' : 'Ivan Petrov',
            email,
            orders: 12,
            points: 1500,
            level: 'silver'
        });
        setCurrentPage('home');
    };

    const logout = () => {
        setUser(null);
        setCurrentPage('home');
    };

    // === Рендеринг страницы ===
    const renderPage = () => {
        switch (currentPage) {
            case 'product':
                return (
                    <ProductPage
                        currentProduct={currentProduct}
                        setCurrentPage={setCurrentPage}
                        addToCart={addToCart}
                        toggleFavorite={toggleFavorite}
                        toggleCompare={toggleCompare}
                        favorites={favorites}
                        compareList={compareList}
                        products={products}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                    />
                );
            case 'cart':
                return (
                    <CartPage
                        cart={cart}
                        setCart={setCart}
                        appliedCoupon={appliedCoupon}
                        applyCouponCode={applyCouponCode}
                        setCurrentPage={setCurrentPage}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                        getCartTotals={getCartTotals}
                    />
                );
            case 'checkout':
                return (
                    <CheckoutPage
                        cart={cart}
                        orderForm={orderForm}
                        setOrderForm={setOrderForm}
                        appliedCoupon={appliedCoupon}
                        completeOrder={completeOrder}
                        setCurrentPage={setCurrentPage}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                        getCartTotals={getCartTotals}
                    />
                );
            case 'orders':
                return (
                    <OrdersPage
                        user={user}
                        orders={orders}
                        setCurrentPage={setCurrentPage}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                    />
                );
            case 'login':
                return (
                    <LoginPage
                        login={login}
                        setCurrentPage={setCurrentPage}
                        language={language}
                    />
                );
            case 'favorites':
                return (
                    <FavoritesPage
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setCurrentPage={setCurrentPage}
                        products={products}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                        toggleFavorite={toggleFavorite}
                    />
                );
            case 'compare':
                return (
                    <ComparePage
                        compareList={compareList}
                        setCompareList={setCompareList}
                        setCurrentPage={setCurrentPage}
                        products={products}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                        toggleCompare={toggleCompare}
                    />
                );
            default:
                return (
                    <HomePage
                        products={filteredProducts}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filters={filters}
                        setFilters={setFilters}
                        addToCart={addToCart}
                        toggleFavorite={toggleFavorite}
                        toggleCompare={toggleCompare}
                        favorites={favorites}
                        compareList={compareList}
                        setCurrentPage={setCurrentPage}
                        setCurrentProduct={setCurrentProduct}
                        language={language}
                        currency={currency}
                        formatPrice={formatPrice}
                    />
                );
        }
    };

    // === Рендер UI ===
    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                cart={cart}
                notifications={notifications}
                user={user}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setShowChat={setShowChat}
                language={language}
                setLanguage={setLanguage}
                currency={currency}
                setCurrency={setCurrency}
                login={login}
                logout={logout}
                formatPrice={formatPrice}
            />

            <Breadcrumb
                currentPage={currentPage}
                currentProduct={currentProduct}
                setCurrentPage={setCurrentPage}
                language={language}
            />

            {renderPage()}

            <ChatWidget
                showChat={showChat}
                setShowChat={setShowChat}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                sendChatMessage={sendChatMessage}
                language={language}
            />

            <AddToCartAnimation showAddAnimation={showAddAnimation} language={language} />

            {/* ✅ Передаём сохранённые данные заказа */}
            <OrderModal
                showOrderModal={showOrderModal}
                setShowOrderModal={setShowOrderModal}
                setCurrentPage={setCurrentPage}
                language={language}
                cart={orderModalData.cart}
                totals={orderModalData.totals}
                orderNumber={orderModalData.orderNumber}
                formatPrice={formatPrice}
            />

            <Footer language={language} />
        </div>
    );
};

export default App;