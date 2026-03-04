export type Language = 'ru' | 'en' | 'zh' | 'uz';

export const translations = {
  ru: {
    meta: {
      title: 'Ustores — сеть ПВЗ в Узбекистане | Последняя миля',
      description: 'Действующая сеть пунктов выдачи заказов в Ташкенте. Подключитесь к готовой инфраструктуре и платите только за реальные выдачи.',
    },
    nav: {
      benefits: 'Преимущества',
      howItWorks: 'Как это работает',
      pricing: 'Цены',
      contact: 'Связаться',
      forLandlords: 'Для арендодателей',
    },
    hero: {
      badge: 'Сеть ПВЗ в Узбекистане',
      title: 'Ваш надёжный партнёр по последней миле',
      subtitle: 'Выходите на рынок Узбекистана и хотите быстро организовать выдачу заказов без строительства собственной инфраструктуры?',
      description: 'Ustores — действующая сеть ПВЗ и операционная команда, которая берёт на себя выдачу и приём возвратов через нашу сеть.',
      highlight: 'Предсказуемые затраты: абонплата + оплата за реальные выдачи',
      cta1: 'Подключиться к сети',
      cta2: 'Запросить условия',
      cta3: 'Назначить звонок',
      stats: {
        points: 'Точек в Ташкенте',
        orders: 'Заказов в месяц',
        sla: 'SLA выдачи',
      },
    },
    problem: {
      badge: 'Проблема',
      title: 'Почему last-mile ломает запуск в Узбекистане',
      subtitle: 'Для бренда или маркетплейса last-mile в новой стране почти всегда становится самым дорогим и рискованным участком',
      problems: [
        {
          title: 'Долго стартовать с нуля',
          description: 'Локации, ремонты, вывески, согласования, найм и обучение — это месяцы, а рынок ждать не будет.',
          icon: 'clock',
        },
        {
          title: 'Сервис бьёт по репутации',
          description: 'Очереди, ошибки на выдаче/приёмке, "человеческий фактор", жалобы — всё это влияет на повторные покупки.',
          icon: 'warning',
        },
        {
          title: 'Операционка съедает команду',
          description: 'Графики, контроль дисциплины, стандарты, инциденты, отчётность — без опытного оператора это постоянный "пожар".',
          icon: 'fire',
        },
        {
          title: 'Сложно держать качество при росте',
          description: 'Одна точка может работать хорошо, но сеть из 10–30–50 локаций требует системного управления.',
          icon: 'chart',
        },
      ],
      conclusion: 'Если ваша задача — быстро выйти на рынок и масштабироваться, строить last-mile внутри компании — это отвлечение, риск и лишние расходы.',
    },
    benefits: {
      badge: 'Преимущества',
      title: '3 результата, которые вы получаете',
      subtitle: 'Подключаясь к сети Ustores, вы получаете готовую инфраструктуру и экспертизу',
      items: [
        {
          title: 'Быстрый запуск в Ташкенте',
          description: 'Не нужно открывать свои пункты выдачи — вы подключаетесь к уже работающей инфраструктуре и начинаете выдачу быстрее.',
          highlight: 'Через действующую сеть',
        },
        {
          title: 'Предсказуемая экономика',
          description: 'Процентная модель снижает барьер входа: меньше фиксированных затрат, больше контроля над юнит-экономикой.',
          highlight: 'Гибкая модель оплаты',
        },
        {
          title: 'Стабильное качество',
          description: 'Единые правила работы в точках, обученный персонал и регулярная отчётность помогают удерживать сервис на уровне.',
          highlight: 'Стандарты и KPI',
        },
      ],
    },
    testimonials: {
      badge: 'Отзывы',
      title: 'Что говорят наши партнёры',
      subtitle: 'Реальные истории успешного выхода на рынок Узбекистана',
      items: [
        {
          quote: 'Нам нужно было протестировать Узбекистан быстро и без инвестиций в точки. Подключились к Ustores — стартовали без затяжки, а оплата от объёма идеально подошла для аккуратного разгона.',
          author: 'Минджун Ким',
          company: 'Руководитель развития, D2C бренд',
          tag: 'Пилот → рост',
        },
        {
          quote: 'Мы упёрлись в last-mile как в бутылочное горлышко. С Ustores стало проще: понятные стандарты и управляемая сеть. Мы сфокусировались на ассортименте и маркетинге, а выдача не тормозила рост.',
          author: 'Илья Суслов',
          company: 'Директор по логистике, Маркетплейс',
          tag: 'Масштабирование',
        },
        {
          quote: 'Самое важное — стабильность: одинаковый сервис в разных локациях. У Ustores системный подход: процессы, дисциплина, отчётность. Это сильно снизило количество инцидентов.',
          author: 'Лиза Рейнольдс',
          company: 'Операционный директор, Ритейл-сеть',
          tag: 'Качество сервиса',
        },
      ],
    },
    whatIsIt: {
      badge: 'Что это такое',
      title: 'Сервис Ustores Last-Mile Pickup Network',
      subtitle: 'Подключение вашего потока заказов к нашей действующей сети ПВЗ в Узбекистане с управлением операционкой "под ключ"',
      whatWeDo: {
        title: 'Что мы делаем',
        items: [
          'Выдача заказов клиентам в ПВЗ',
          'Приём возвратов и обратная логистика (опционально)',
          'Управление точками: персонал, дисциплина, обучение',
          'Контроль инцидентов и качества',
          'Отчётность и KPI по согласованным метрикам',
        ],
      },
      howToConnect: {
        title: 'Как вы подключаетесь',
        items: [
          'Согласовываем модель обслуживания и стандарты',
          'Определяем пилот/масштаб и целевые KPI',
          'Настраиваем обмен данными и процессы',
          'Запускаем выдачу и показываем результаты',
        ],
      },
    },
    pricing: {
      badge: 'Тарифы',
      title: 'Модели сотрудничества',
      subtitle: 'Выберите модель, которая подходит под ваш бизнес',
      paymentNote: 'Абонплата + оплата за выдачу — без инвестиций в свою сеть',
      minOrder: 'Минимальный заказ услуги — 3 месяца',
      plans: [
        {
          name: 'Базовый',
          tag: 'Старт',
          description: 'Абонплата $1000/мес + оплата за выдачу',
          features: [
            '5 локаций по городу',
            '$0.5 за кг/единицу',
            'Базовая отчётность',
            'Стандартные SLA',
          ],
          cta: 'Запросить условия',
          highlighted: false,
        },
        {
          name: 'Процентная + SLA',
          tag: 'Повышенный сервис',
          description: 'Абонплата $3000/мес + оплата за выдачу',
          features: [
            '20 локаций по городу',
            'Расширенная отчётность',
            'Усиленный контроль качества',
            'Приоритетные процессы',
            'Выделенный менеджер',
          ],
          cta: 'Обсудить SLA',
          highlighted: true,
        },
        {
          name: 'Индивидуальная',
          tag: 'Для крупных объёмов',
          description: 'Кастомная экономика и процессы под ваш формат',
          features: [
            'Индивидуальные условия',
            'Кастомные интеграции',
            'Гибкие процессы',
            'Персональная команда',
          ],
          cta: 'Назначить звонок',
          highlighted: false,
        },
      ],
    },
    cta: {
      title: 'Хотите запустить выдачу в Узбекистане через готовую сеть ПВЗ?',
      subtitle: 'Предсказуемые затраты с первого месяца — начните работу уже сегодня',
      buttons: {
        connect: 'Подключиться к сети',
        conditions: 'Запросить условия',
        presentation: 'Получить презентацию',
      },
    },
    footer: {
      description: 'Сеть пунктов выдачи заказов в Узбекистане. Быстрый запуск, предсказуемая экономика, стабильное качество.',
      links: {
        company: 'Компания',
        about: 'О нас',
        careers: 'Карьера',
        contact: 'Контакты',
        legal: 'Документы',
        privacy: 'Конфиденциальность',
        terms: 'Условия',
      },
      copyright: '© 2026 Ustores. Все права защищены.',
    },
  },
  en: {
    meta: {
      title: 'Ustores — Pickup Point Network in Uzbekistan | Last Mile',
      description: 'Operating pickup point network in Tashkent. Connect to ready infrastructure and pay only for actual deliveries.',
    },
    nav: {
      benefits: 'Benefits',
      howItWorks: 'How it works',
      pricing: 'Pricing',
      contact: 'Contact',
      forLandlords: 'For Landlords',
    },
    hero: {
      badge: 'Pickup Point Network in Uzbekistan',
      title: 'Your Reliable Last-Mile Partner',
      subtitle: 'Entering the Uzbekistan market and want to quickly set up order delivery without building your own infrastructure?',
      description: 'Ustores is an operating pickup point network and operational team that handles delivery and returns through our network.',
      highlight: 'Predictable costs: subscription + pay per delivery',
      cta1: 'Join the Network',
      cta2: 'Request Terms',
      cta3: 'Schedule a Call',
      stats: {
        points: 'Points in Tashkent',
        orders: 'Orders per month',
        sla: 'Delivery SLA',
      },
    },
    problem: {
      badge: 'The Problem',
      title: 'Why Last-Mile Breaks Market Entry in Uzbekistan',
      subtitle: 'For brands and marketplaces, last-mile in a new country almost always becomes the most expensive and risky segment',
      problems: [
        {
          title: 'Long time to start from scratch',
          description: 'Locations, renovations, signage, approvals, hiring and training — that\'s months, and the market won\'t wait.',
          icon: 'clock',
        },
        {
          title: 'Service hits reputation',
          description: 'Queues, delivery/pickup errors, "human factor", complaints — all of this affects repeat purchases.',
          icon: 'warning',
        },
        {
          title: 'Operations consume the team',
          description: 'Schedules, discipline control, standards, incidents, reporting — without an experienced operator, it\'s a constant firefighting.',
          icon: 'fire',
        },
        {
          title: 'Hard to maintain quality while scaling',
          description: 'One point can work well, but a network of 10–30–50 locations requires systematic management.',
          icon: 'chart',
        },
      ],
      conclusion: 'If your goal is to quickly enter the market and scale, building last-mile in-house is a distraction, risk, and unnecessary expense.',
    },
    benefits: {
      badge: 'Benefits',
      title: '3 Results You Get',
      subtitle: 'By connecting to the Ustores network, you get ready infrastructure and expertise',
      items: [
        {
          title: 'Fast Launch in Tashkent',
          description: 'No need to open your own pickup points — connect to already operating infrastructure and start deliveries faster.',
          highlight: 'Through operating network',
        },
        {
          title: 'Predictable Economics',
          description: 'Percentage model lowers entry barriers: fewer fixed costs, more control over unit economics.',
          highlight: 'Flexible payment model',
        },
        {
          title: 'Stable Quality',
          description: 'Unified rules at all points, trained staff and regular reporting help maintain brand-worthy service.',
          highlight: 'Standards and KPIs',
        },
      ],
    },
    testimonials: {
      badge: 'Testimonials',
      title: 'What Our Partners Say',
      subtitle: 'Real stories of successful market entry in Uzbekistan',
      items: [
        {
          quote: 'We needed to test Uzbekistan quickly without investing in locations. Connected to Ustores — started without delay, and volume-based payment was perfect for careful acceleration.',
          author: 'Minjun Kim',
          company: 'Head of Development, D2C Brand',
          tag: 'Pilot → Growth',
        },
        {
          quote: 'We hit last-mile as a bottleneck. With Ustores, it became easier: clear standards and manageable network. We focused on assortment and marketing while delivery didn\'t slow growth.',
          author: 'Ilya Suslov',
          company: 'Logistics Director, Marketplace',
          tag: 'Scaling',
        },
        {
          quote: 'Most important — consistency: same service across locations. Ustores has a systematic approach: processes, discipline, reporting. This significantly reduced incidents.',
          author: 'Lisa Reynolds',
          company: 'Operations Director, Retail Chain',
          tag: 'Service Quality',
        },
      ],
    },
    whatIsIt: {
      badge: 'What Is It',
      title: 'Ustores Last-Mile Pickup Network Service',
      subtitle: 'Connecting your order flow to our operating pickup network in Uzbekistan with turnkey operations management',
      whatWeDo: {
        title: 'What We Do',
        items: [
          'Customer order delivery at pickup points',
          'Returns acceptance and reverse logistics (optional)',
          'Point management: staff, discipline, training',
          'Incident and quality control',
          'Reporting and KPIs on agreed metrics',
        ],
      },
      howToConnect: {
        title: 'How You Connect',
        items: [
          'Agree on service model and standards',
          'Define pilot/scale and target KPIs',
          'Set up data exchange and processes',
          'Launch delivery and show results',
        ],
      },
    },
    pricing: {
      badge: 'Pricing',
      title: 'Partnership Models',
      subtitle: 'Choose the model that fits your business',
      paymentNote: 'Subscription + delivery fee — no investment in your own network',
      minOrder: 'Minimum service order — 3 months',
      plans: [
        {
          name: 'Basic',
          tag: 'Start',
          description: '$1000/month subscription + delivery fee',
          features: [
            '5 locations in the city',
            '$0.5 per kg/unit',
            'Basic reporting',
            'Standard SLAs',
          ],
          cta: 'Request Terms',
          highlighted: false,
        },
        {
          name: 'Percentage + SLA',
          tag: 'Enhanced Service',
          description: '$3000/month subscription + delivery fee',
          features: [
            '20 locations in the city',
            'Extended reporting',
            'Enhanced quality control',
            'Priority processes',
            'Dedicated manager',
          ],
          cta: 'Discuss SLA',
          highlighted: true,
        },
        {
          name: 'Custom',
          tag: 'For Large Volumes',
          description: 'Custom economics and processes for your format',
          features: [
            'Individual terms',
            'Custom integrations',
            'Flexible processes',
            'Personal team',
          ],
          cta: 'Schedule a Call',
          highlighted: false,
        },
      ],
    },
    cta: {
      title: 'Want to launch delivery in Uzbekistan through a ready pickup network?',
      subtitle: 'Predictable costs from day one — start working today',
      buttons: {
        connect: 'Join the Network',
        conditions: 'Request Terms',
        presentation: 'Get Presentation',
      },
    },
    footer: {
      description: 'Pickup point network in Uzbekistan. Fast launch, predictable economics, stable quality.',
      links: {
        company: 'Company',
        about: 'About Us',
        careers: 'Careers',
        contact: 'Contact',
        legal: 'Legal',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      copyright: '© 2026 Ustores. All rights reserved.',
    },
  },
  zh: {
    meta: {
      title: 'Ustores — 乌兹别克斯坦自提点网络 | 最后一公里配送',
      description: '塔什干现有自提点网络。连接现成的基础设施，只需为实际配送付费。',
    },
    nav: {
      benefits: '优势',
      howItWorks: '运作方式',
      pricing: '价格',
      contact: '联系我们',
      forLandlords: '房东专区',
    },
    hero: {
      badge: '乌兹别克斯坦自提点网络',
      title: '您可靠的最后一公里合作伙伴',
      subtitle: '进入乌兹别克斯坦市场，希望在不建设自有基础设施的情况下快速组织订单配送？',
      description: 'Ustores是一个运营中的自提点网络和运营团队，通过我们的网络负责配送和退货处理。',
      highlight: '可预测的成本：订阅费 + 按配送付费',
      cta1: '加入网络',
      cta2: '获取条款',
      cta3: '预约通话',
      stats: {
        points: '塔什干网点数',
        orders: '月订单量',
        sla: '配送SLA',
      },
    },
    problem: {
      badge: '痛点分析',
      title: '为什么最后一公里会阻碍乌兹别克斯坦市场开拓',
      subtitle: '对于品牌和电商平台来说，新国家的最后一公里几乎总是最昂贵和风险最高的环节',
      problems: [
        {
          title: '从零开始耗时太长',
          description: '选址、装修、招牌、审批、招聘和培训——这需要数月时间，而市场不会等待。',
          icon: 'clock',
        },
        {
          title: '服务影响品牌声誉',
          description: '排队、配送/取货错误、"人为因素"、投诉——这些都会影响复购率。',
          icon: 'warning',
        },
        {
          title: '运营消耗团队精力',
          description: '排班、纪律管理、标准、事故处理、报告——没有经验丰富的运营商，这将是持续的"救火"。',
          icon: 'fire',
        },
        {
          title: '扩张时难以保持质量',
          description: '一个网点可能运作良好，但10-30-50个网点的网络需要系统化管理。',
          icon: 'chart',
        },
      ],
      conclusion: '如果您的目标是快速进入市场并扩展规模，内部建设最后一公里是分散精力、增加风险和不必要的支出。',
    },
    benefits: {
      badge: '核心优势',
      title: '您将获得的3个成果',
      subtitle: '连接Ustores网络，您将获得现成的基础设施和专业经验',
      items: [
        {
          title: '在塔什干快速启动',
          description: '无需开设自己的自提点——连接已运营的基础设施，更快开始配送。',
          highlight: '通过现有网络',
        },
        {
          title: '可预测的经济模式',
          description: '百分比模式降低准入门槛：更少的固定成本，更多的单位经济控制。',
          highlight: '灵活的付款模式',
        },
        {
          title: '稳定的服务质量',
          description: '所有网点统一规则、训练有素的员工和定期报告，帮助维持品牌级服务水准。',
          highlight: '标准与KPI',
        },
      ],
    },
    testimonials: {
      badge: '客户评价',
      title: '我们的合作伙伴怎么说',
      subtitle: '成功进入乌兹别克斯坦市场的真实故事',
      items: [
        {
          quote: '我们需要在不投资网点的情况下快速测试乌兹别克斯坦市场。连接Ustores后，我们迅速启动，按量付费模式非常适合谨慎扩张。',
          author: '金民俊',
          company: '发展负责人，D2C品牌',
          tag: '试点→增长',
        },
        {
          quote: '我们在最后一公里遇到了瓶颈。有了Ustores，一切变得更简单：清晰的标准和可管理的网络。我们专注于品类和营销，配送不再拖慢增长。',
          author: '伊利亚·苏斯洛夫',
          company: '物流总监，电商平台',
          tag: '规模化',
        },
        {
          quote: '最重要的是一致性：不同网点提供相同的服务。Ustores有系统化的方法：流程、纪律、报告。这大大减少了事故。',
          author: '丽莎·雷诺兹',
          company: '运营总监，零售连锁',
          tag: '服务质量',
        },
      ],
    },
    whatIsIt: {
      badge: '服务介绍',
      title: 'Ustores最后一公里自提网络服务',
      subtitle: '将您的订单流连接到我们在乌兹别克斯坦的运营自提网络，提供交钥匙式运营管理',
      whatWeDo: {
        title: '我们的服务',
        items: [
          '自提点客户订单配送',
          '退货接收和逆向物流（可选）',
          '网点管理：员工、纪律、培训',
          '事故和质量控制',
          '按约定指标进行报告和KPI追踪',
        ],
      },
      howToConnect: {
        title: '如何接入',
        items: [
          '商定服务模式和标准',
          '确定试点/规模和目标KPI',
          '设置数据交换和流程',
          '启动配送并展示结果',
        ],
      },
    },
    pricing: {
      badge: '定价',
      title: '合作模式',
      subtitle: '选择适合您业务的模式',
      paymentNote: '订阅费 + 配送费——无需投资自建网络',
      minOrder: '最低服务订购期——3个月',
      plans: [
        {
          name: '基础版',
          tag: '起步',
          description: '月费$1000 + 配送费',
          features: [
            '城市5个网点',
            '$0.5/公斤/件',
            '基础报告',
            '标准SLA',
          ],
          cta: '获取条款',
          highlighted: false,
        },
        {
          name: '百分比+SLA',
          tag: '增强服务',
          description: '月费$3000 + 配送费',
          features: [
            '城市20个网点',
            '扩展报告',
            '加强质量控制',
            '优先处理流程',
            '专属客户经理',
          ],
          cta: '讨论SLA',
          highlighted: true,
        },
        {
          name: '定制方案',
          tag: '大客户专享',
          description: '根据您的业务形态定制经济模式和流程',
          features: [
            '个性化条款',
            '定制集成',
            '灵活流程',
            '专属团队',
          ],
          cta: '预约通话',
          highlighted: false,
        },
      ],
    },
    cta: {
      title: '想通过现成的自提网络在乌兹别克斯坦启动配送？',
      subtitle: '从第一个月起成本可预测——今天就开始合作',
      buttons: {
        connect: '加入网络',
        conditions: '获取条款',
        presentation: '获取介绍资料',
      },
    },
    footer: {
      description: '乌兹别克斯坦自提点网络。快速启动、可预测的经济模式、稳定的质量。',
      links: {
        company: '公司',
        about: '关于我们',
        careers: '招聘',
        contact: '联系方式',
        legal: '法律文件',
        privacy: '隐私政策',
        terms: '服务条款',
      },
      copyright: '© 2026 Ustores. 版权所有。',
    },
  },
  uz: {
    meta: {
      title: "Ustores — O'zbekistondagi buyurtma olish punktlari tarmog'i | Oxirgi mil",
      description: "Toshkentdagi mavjud buyurtma olish punktlari tarmog'i. Tayyor infratuzilmaga ulaning va faqat haqiqiy topshirishlar uchun to'lang.",
    },
    nav: {
      benefits: 'Afzalliklar',
      howItWorks: 'Qanday ishlaydi',
      pricing: 'Narxlar',
      contact: "Bog'lanish",
      forLandlords: 'Ijaraga beruvchilar uchun',
    },
    hero: {
      badge: "O'zbekistondagi buyurtma olish punktlari",
      title: "Oxirgi mil bo'yicha ishonchli hamkoringiz",
      subtitle: "O'zbekiston bozoriga chiqmoqchimisiz va o'z infratuzilmangizni qurmay buyurtmalarni tez yetkazib berishni xohlaysizmi?",
      description: "Ustores — bu buyurtma olish punktlari tarmog'i va operatsion jamoa bo'lib, bizning tarmog'imiz orqali topshirish va qaytarishlarni qabul qiladi.",
      highlight: "Bashorat qilinadigan xarajatlar: obuna to'lovi + haqiqiy topshirishlar uchun to'lov",
      cta1: "Tarmoqqa ulaning",
      cta2: "Shartlarni so'rang",
      cta3: "Qo'ng'iroqni belgilang",
      stats: {
        points: 'Toshkentdagi punktlar',
        orders: 'Oylik buyurtmalar',
        sla: 'Topshirish SLA',
      },
    },
    problem: {
      badge: 'Muammo',
      title: "Nima uchun oxirgi mil O'zbekistonda ishga tushirishni qiyinlashtiradi",
      subtitle: "Brend yoki marketplace uchun yangi mamlakatda oxirgi mil deyarli doimo eng qimmat va xavfli qism bo'ladi",
      problems: [
        {
          title: 'Noldan boshlash uzoq davom etadi',
          description: "Joylashuvlar, ta'mirlar, belgilar, kelishuvlar, yollash va o'qitish — bu oylar, bozor esa kutmaydi.",
          icon: 'clock',
        },
        {
          title: "Xizmat obro'ga ta'sir qiladi",
          description: "Navbatlar, topshirish/qabul qilishdagi xatolar, 'inson omili', shikoyatlar — bularning barchasi takroriy xaridlarga ta'sir qiladi.",
          icon: 'warning',
        },
        {
          title: "Operatsion ishlar jamoani yeydi",
          description: "Jadvallar, intizom nazorati, standartlar, hodisalar, hisobotlar — tajribali operatorsiz bu doimiy 'yong'in'.",
          icon: 'fire',
        },
        {
          title: "O'sish bilan sifatni saqlash qiyin",
          description: "Bitta punkt yaxshi ishlashi mumkin, lekin 10-30-50 joylashuvli tarmoq tizimli boshqaruvni talab qiladi.",
          icon: 'chart',
        },
      ],
      conclusion: "Agar vazifangiz bozorga tez chiqish va kengayish bo'lsa, kompaniya ichida oxirgi milni qurish — bu chalg'itish, xavf va qo'shimcha xarajatlar.",
    },
    benefits: {
      badge: 'Afzalliklar',
      title: "Siz oladigan 3 ta natija",
      subtitle: "Ustores tarmog'iga ulanib, siz tayyor infratuzilma va tajribaga ega bo'lasiz",
      items: [
        {
          title: 'Toshkentda tez ishga tushirish',
          description: "O'z buyurtma olish punktlaringizni ochishingiz shart emas — allaqachon ishlayotgan infratuzilmaga ulanasiz va tezroq topshirishni boshlaysiz.",
          highlight: "Mavjud tarmoq orqali",
        },
        {
          title: "Bashorat qilinadigan iqtisodiyot",
          description: "Foizli model kirish to'sig'ini kamaytiradi: kamroq doimiy xarajatlar, unit-iqtisodiyot ustidan ko'proq nazorat.",
          highlight: "Moslashuvchan to'lov modeli",
        },
        {
          title: 'Barqaror sifat',
          description: "Punktlarda yagona ish qoidalari, o'qitilgan xodimlar va muntazam hisobotlar xizmatni darajada ushlab turishga yordam beradi.",
          highlight: "Standartlar va KPI",
        },
      ],
    },
    testimonials: {
      badge: 'Sharhlar',
      title: 'Hamkorlarimiz nima deydi',
      subtitle: "O'zbekiston bozoriga muvaffaqiyatli chiqish haqida haqiqiy hikoyalar",
      items: [
        {
          quote: "Bizga O'zbekistonni tez va punktlarga investitsiyasiz sinab ko'rish kerak edi. Ustoresga ulandik — kechikmasdan ishga tushdik, hajmdan to'lov esa ehtiyotkor tezlashish uchun ideal mos keldi.",
          author: 'Minjun Kim',
          company: "Rivojlanish rahbari, D2C brend",
          tag: "Pilot → o'sish",
        },
        {
          quote: "Oxirgi mil to'siq bo'lib qoldi. Ustores bilan osonlashdi: aniq standartlar va boshqariladigan tarmoq. Biz assortiment va marketingga e'tibor qaratdik, topshirish esa o'sishni sekinlashtirmadi.",
          author: 'Ilya Suslov',
          company: 'Logistika direktori, Marketplace',
          tag: 'Masshtablash',
        },
        {
          quote: "Eng muhimi — barqarorlik: turli joylashurlarda bir xil xizmat. Ustoresda tizimli yondashuv: jarayonlar, intizom, hisobotlar. Bu hodisalar sonini sezilarli kamaytirdi.",
          author: 'Lisa Reynolds',
          company: "Operatsiyalar menejeri, Xalqaro brend",
          tag: 'Sifat nazorati',
        },
      ],
    },
    whatIsIt: {
      badge: "Bu nima",
      title: 'Ustores nima qiladi',
      subtitle: "Biz tayyor infratuzilma va operatsion jamoani taqdim etamiz, siz esa o'z biznesingizga e'tibor qaratasiz",
      whatWeDo: {
        title: 'Biz nima qilamiz',
        items: [
          "Tayyor buyurtma olish punktlarida topshirish va qaytarishlarni qabul qilish",
          "Xodimlarni yollash, o'qitish va boshqarish",
          "Kunlik hisobotlar: topshirishlar, qaytarishlar, SLA",
          "Inventarizatsiya, qabul qilish va saqlash",
          "Xizmat sifatini nazorat qilish",
        ],
      },
      howToConnect: {
        title: "Qanday ulash mumkin",
        items: [
          "Shartlarni muhokama qilish uchun so'rov qoldiring",
          "Qamrov va boshlash sanasini kelishib olamiz",
          "Shartnoma imzolaymiz va integratsiyani boshlaymiz",
          "Siz buyurtmalarni yo'naltirasiz, biz topshirishlarni ta'minlaymiz",
        ],
      },
    },
    pricing: {
      badge: 'Narxlar',
      title: "O'zingizga mos tarifni tanlang",
      subtitle: "Moslashuvchan modellar: hajmdan to'lovdan to to'liq SLA bilan abonent to'lovigacha",
      paymentNote: "Abonent to'lovi + topshirish uchun to'lov — o'z tarmog'ingizga investitsiyasiz",
      plans: [
        {
          name: 'Asosiy',
          tag: 'Boshlash uchun',
          description: "Hajmdan foiz — kichik hajmlar uchun ideal",
          features: [
            "Topshirishlar sonidan to'lov",
            'Kg/birlik uchun $0.5',
            "Minimal oylik to'lovsiz",
            "Standart hisobotlar",
          ],
          cta: "Batafsil ma'lumot",
          highlighted: false,
        },
        {
          name: 'Foiz + SLA',
          tag: "Kengaytirilgan xizmat",
          description: "Abonent to'lovi $3000/oy + foiz — 20 joylashuv",
          features: [
            "Kafolatlangan SLA 99%",
            "Ustuvor qo'llab-quvvatlash",
            "Kengaytirilgan hisobotlar",
            "Integratsiya uchun API",
          ],
          cta: "Ulaning",
          highlighted: true,
        },
        {
          name: "Yechim",
          tag: 'Katta hajmlar uchun',
          description: "Yirik hamkorlar uchun individual shartlar",
          features: [
            "Maxsus tarif modeli",
            "Brendlangan xizmat",
            "Tizimlaringiz bilan integratsiya",
            "Shaxsiy menejer",
          ],
          cta: "Shartlarni muhokama qilish",
          highlighted: false,
        },
      ],
      minOrder: "Minimal xizmat buyurtmasi — 3 oy",
    },
    cta: {
      title: "Bozorga o'z tarmog'ingizsiz chiqing",
      subtitle: "Birinchi oydan bashorat qilinadigan xarajatlar — bugun ishlashni boshlang",
      buttons: {
        connect: "Tarmoqqa ulaning",
        conditions: "Shartlarni so'rang",
        presentation: "Taqdimotni oling",
      },
    },
    footer: {
      description: "Ustores — O'zbekistondagi buyurtma olish punktlari tarmog'i. Biz brendlar va marketplacelar uchun oxirgi mil masalasini hal qilamiz.",
      links: {
        company: 'Kompaniya',
        privacy: 'Maxfiylik siyosati',
        terms: "Foydalanish shartlari",
      },
      copyright: "© 2026 Ustores. Barcha huquqlar himoyalangan.",
    },
  },
};

export function getTranslation(lang: Language) {
  return translations[lang] || translations.ru;
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
];
