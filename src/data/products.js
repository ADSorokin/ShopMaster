// src/data/products.js
export const products = [
  {
    id: 1,
    name: { ru: 'Смартфон Galaxy S23', en: 'Galaxy S23 Smartphone' },
    price: 79990,
    category: 'electronics',
    images: [
      'https://placehold.co/300x300/3b82f6/ffffff?text=Galaxy+S23+Front',
      'https://placehold.co/300x300/1f2937/ffffff?text=Galaxy+S23+Back',
      'https://placehold.co/300x300/ef4444/ffffff?text=Galaxy+S23+Camera'
    ],
    rating: 4.8,
    reviews: [
      { id: 1, user: 'Алексей', rating: 5, comment: 'Отличный телефон, камера супер!', date: '2024-01-15' },
      { id: 2, user: 'Марина', rating: 4, comment: 'Хороший аппарат, но батарея могла бы быть лучше', date: '2024-01-10' }
    ],
    description: { 
      ru: 'Последняя модель смартфона с мощным процессором и отличной камерой. Поддержка 5G, 120Hz дисплей, 5000mAh батарея.',
      en: 'Latest smartphone model with powerful processor and excellent camera. 5G support, 120Hz display, 5000mAh battery.'
    },
    specifications: {
      ru: {
        processor: 'Snapdragon 8 Gen 2',
        memory: '8GB RAM',
        storage: '256GB',
        display: '6.1" Dynamic AMOLED',
        camera: '200MP main, 12MP ultra-wide, 10MP telephoto',
        battery: '3900mAh',
        partNumber: 'SM-S911B/DS',
        manufacturer: 'Samsung Electronics Co., Ltd.',
        warrantyPeriod: '1 год',
        color: 'черный, белый, зеленый',
        size: '6.1"',
        material: 'стекло, металл',
        weight: '168 г',
        dimensions: '146.3 x 70.9 x 7.6 мм'
      },
      en: {
        processor: 'Snapdragon 8 Gen 2',
        memory: '8GB RAM',
        storage: '256GB',
        display: '6.1" Dynamic AMOLED',
        camera: '200MP main, 12MP ultra-wide, 10MP telephoto',
        battery: '3900mAh',
        partNumber: 'SM-S911B/DS',
        manufacturer: 'Samsung Electronics Co., Ltd.',
        warrantyPeriod: '1 year',
        color: 'black, white, green',
        size: '6.1"',
        material: 'glass, metal',
        weight: '168 g',
        dimensions: '146.3 x 70.9 x 7.6 mm'
      }
    },
    colors: ['черный', 'white', 'зеленый'],
    sizes: ['6.1"', '6.7"'],
    stock: 15,
    brand: 'Samsung',
    discount: 5,
    arModel: 'https://example.com/galaxy-s23.glb',
    metaTitle: 'Смартфон Galaxy S23 - купить по выгодной цене',
    metaDescription: 'Купить смартфон Galaxy S23 по цене 79990 ₽ с доставкой по всей России. Характеристики, отзывы и гарантия качества.'
  },
  {
    id: 2,
    name: { ru: 'Ноутбук MacBook Pro', en: 'MacBook Pro Laptop' },
    price: 159990,
    category: 'electronics',
    images: [
      'https://placehold.co/300x300/1f2937/ffffff?text=MacBook+Pro+Silver',
      'https://placehold.co/300x300/374151/ffffff?text=MacBook+Pro+Keyboard',
      'https://placehold.co/300x300/6b7280/ffffff?text=MacBook+Pro+Side'
    ],
    rating: 4.9,
    reviews: [
      { id: 3, user: 'Иван', rating: 5, comment: 'Лучший ноутбук для работы!', date: '2024-01-12' }
    ],
    description: { 
      ru: 'Профессиональный ноутбук для работы и творчества. M2 чип, Retina дисплей, до 20 часов автономной работы.',
      en: 'Professional laptop for work and creativity. M2 chip, Retina display, up to 20 hours of battery life.'
    },
    specifications: {
      ru: {
        processor: 'Apple M2',
        memory: '16GB RAM',
        storage: '512GB SSD',
        display: '14" Liquid Retina XDR',
        battery: 'до 20 часов',
        weight: '1.5 kg',
        partNumber: 'Z15G000CQ',
        manufacturer: 'Apple Inc.',
        warrantyPeriod: '1 год',
        color: 'серебристый, серый космос',
        size: ['14"', '16"'],
        material: 'алюминий',
        dimensions: '31.26 x 22.12 x 1.56 см'
      },
      en: {
        processor: 'Apple M2',
        memory: '16GB RAM',
        storage: '512GB SSD',
        display: '14" Liquid Retina XDR',
        battery: 'up to 20 hours',
        weight: '1.5 kg',
        partNumber: 'Z15G000CQ',
        manufacturer: 'Apple Inc.',
        warrantyPeriod: '1 year',
        color: 'silver, space gray',
        size: ['14"', '16"'],
        material: 'aluminum',
        dimensions: '31.26 x 22.12 x 1.56 cm'
      }
    },
    colors: ['серебристый', 'серый космос'],
    sizes: ['14"', '16"'],
    stock: 8,
    brand: 'Apple',
    discount: 0,
    arModel: 'https://example.com/macbook-pro.glb',
    metaTitle: 'Ноутбук MacBook Pro - купить с гарантией',
    metaDescription: 'Купить ноутбук MacBook Pro по цене 159990 ₽ с доставкой по всей России. Профессиональный ноутбук для работы и творчества.'
  },
  {
    id: 3,
    name: { ru: 'Наушники Sony WH-1000XM5', en: 'Sony WH-1000XM5 Headphones' },
    price: 24990,
    category: 'electronics',
    images: [
      'https://placehold.co/300x300/ef4444/ffffff?text=Sony+WH-1000XM5+Black',
      'https://placehold.co/300x300/f59e0b/ffffff?text=Sony+WH-1000XM5+Folded',
      'https://placehold.co/300x300/8b5cf6/ffffff?text=Sony+WH-1000XM5+Case'
    ],
    rating: 4.7,
    reviews: [
      { id: 4, user: 'Елена', rating: 5, comment: 'Шумоподавление просто волшебное!', date: '2024-01-08' },
      { id: 5, user: 'Дмитрий', rating: 4, comment: 'Комфортные, звук отличный', date: '2024-01-05' }
    ],
    description: { 
      ru: 'Шумоподавление высшего класса и превосходное качество звука. 30 часов автономной работы, быстрая зарядка.',
      en: 'Top-class noise cancellation and excellent sound quality. 30 hours of battery life, fast charging.'
    },
    specifications: {
      ru: {
        battery: 'до 30 часов',
        charging: '3 мин = 3 часа',
        connectivity: 'Bluetooth 5.2, NFC',
        weight: '250g',
        features: 'ANC, LDAC, DSEE Extreme',
        partNumber: 'WH-1000XM5/B',
        manufacturer: 'Sony Corporation',
        warrantyPeriod: '2 года',
        color: 'черный, белый',
        size: 'универсальный',
        material: 'пластик, кожа',
        dimensions: '18.6 x 17.4 x 8.9 см'
      },
      en: {
        battery: 'up to 30 hours',
        charging: '3 min = 3 hours',
        connectivity: 'Bluetooth 5.2, NFC',
        weight: '250g',
        features: 'ANC, LDAC, DSEE Extreme',
        partNumber: 'WH-1000XM5/B',
        manufacturer: 'Sony Corporation',
        warrantyPeriod: '2 years',
        color: 'black, white',
        size: 'universal',
        material: 'plastic, leather',
        dimensions: '18.6 x 17.4 x 8.9 cm'
      }
    },
    colors: ['черный', 'белый'],
    sizes: ['универсальный'],
    stock: 20,
    brand: 'Sony',
    discount: 15,
    arModel: 'https://example.com/sony-wh-1000xm5.glb',
    metaTitle: 'Наушники Sony WH-1000XM5 - лучшее шумоподавление',
    metaDescription: 'Купить наушники Sony WH-1000XM5 по цене 24990 ₽ с доставкой по всей России. Шумоподавление высшего класса и превосходное качество звука.'
  },
  {
    id: 4,
    name: { ru: 'Кроссовки Nike Air Max', en: 'Nike Air Max Sneakers' },
    price: 12990,
    category: 'clothing',
    images: [
      'https://placehold.co/300x300/f59e0b/ffffff?text=Nike+Air+Max+Black',
      'https://placehold.co/300x300/10b981/ffffff?text=Nike+Air+Max+Side',
      'https://placehold.co/300x300/8b5cf6/ffffff?text=Nike+Air+Max+Sole'
    ],
    rating: 4.6,
    reviews: [
      { id: 6, user: 'Ольга', rating: 5, comment: 'Супер удобные, но размер немного маловат', date: '2024-01-14' }
    ],
    description: { 
      ru: 'Удобные кроссовки для повседневной носки. Амортизация Air, дышащая сетка, прочная подошва.',
      en: 'Comfortable sneakers for everyday wear. Air cushioning, breathable mesh, durable sole.'
    },
    specifications: {
      ru: {
        material: 'сетка, синтетика',
        sole: 'резина с воздушной подушкой',
        closure: 'шнуровка',
        features: 'дышащие, амортизация, прочные',
        partNumber: 'DA1399-100',
        manufacturer: 'Nike, Inc.',
        warrantyPeriod: '6 месяцев',
        color: 'черный, белый, синий, красный',
        size: '36-45',
        weight: '350 г',
        dimensions: '30 x 12 x 10 см'
      },
      en: {
        material: 'mesh, synthetic',
        sole: 'rubber with air cushion',
        closure: 'lace-up',
        features: 'breathable, cushioned, durable',
        partNumber: 'DA1399-100',
        manufacturer: 'Nike, Inc.',
        warrantyPeriod: '6 months',
        color: 'black, white, blue, red',
        size: '36-45',
        weight: '350 g',
        dimensions: '30 x 12 x 10 cm'
      }
    },
    colors: ['черный', 'белый', 'синий', 'красный'],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    stock: 35,
    brand: 'Nike',
    discount: 0,
    arModel: 'https://example.com/nike-air-max.glb',
    metaTitle: 'Кроссовки Nike Air Max - купить с доставкой',
    metaDescription: 'Купить кроссовки Nike Air Max по цене 12990 ₽ с доставкой по всей России. Удобные кроссовки для повседневной носки.'
  }
];