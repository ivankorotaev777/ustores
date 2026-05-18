import type { Language } from '@/lib/translations';

/** Единая CTA: чат с менеджером (как в основном header сайта). */
export const POISK_PERSONALA_TELEGRAM = 'https://t.me/Ivan_Korotaev';

export type PoiskPersonalaContent = {
  cta: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    h1: string;
    subtitle: string;
    lead: string[];
    ctaHint: string;
  };
  risk: {
    title: string;
    intro: string;
    penaltiesTitle: string;
    penalties: { label: string; amount: string }[];
    body: string[];
    sourceLabel: string;
    sourceUrl: string;
  };
  why: {
    title: string;
    body: string[];
    stats: { value: string; label: string }[];
  };
  advantages: { title: string; text: string }[];
  role: {
    title: string;
    intro: string;
    dutiesTitle: string;
    duties: string[];
    requirementsTitle: string;
    requirements: string[];
    conditionsTitle: string;
    conditions: string[];
  };
  service: {
    title: string;
    intro: string;
    items: { title: string; text: string }[];
  };
  timeline: {
    title: string;
    steps: { title: string; text: string }[];
  };
  pricing: {
    title: string;
    tariffName: string;
    price: string;
    paymentTitle: string;
    paymentLines: string[];
    includesTitle: string;
    includes: string[];
    note: string;
  };
  audience: {
    title: string;
    cards: { title: string; text: string }[];
  };
  clientNeeds: {
    title: string;
    intro: string;
    items: string[];
  };
  finalCta: {
    title: string;
    body: string;
    checklistTitle: string;
    checklist: string[];
    footnote: string;
  };
  faq: { q: string; a: string }[];
};

const ru: PoiskPersonalaContent = {
  cta: 'Написать в Telegram',
  metaTitle: 'Поиск оператора ПВЗ за 14 дней — Ustores',
  metaDescription:
    'Ustores подбирает операторов для ПВЗ Uzum под ключ: размещение вакансии, локальный поиск, первичный отбор, сопровождение обучения и стажировки. Стоимость — 3 000 000 сум + НДС.',
  hero: {
    h1: 'Найдём оператора для вашего ПВЗ за 14 дней под ключ',
    subtitle: 'Ustores помогает владельцам ПВЗ быстро закрывать вакансии операторов.',
    lead: [
      'Мы размещаем вакансию в HH.uz, telegram группах, запускаем локальный поиск вокруг вашей точки, проводим первичный отбор, направляем кандидата на обучение, сопровождаем его на этапе стажировки и оформляем в UZUM.',
    ],
    ctaHint:
      'Напишите нам в Telegram — уточним адрес вашего ПВЗ, условия вакансии и запустим подбор оператора.',
  },
  risk: {
    title: 'Один день простоя ПВЗ может стоить 2 500 000 сум',
    intro:
      'Если оператор не вышел на смену, ПВЗ может остановиться. А простой точки — это не просто неудобство для клиентов, а прямой финансовый риск для владельца.',
    penaltiesTitle: 'Штрафы Uzum за простой ПВЗ:',
    penalties: [
      { label: 'до 2 часов простоя', amount: '400 000 сум' },
      { label: 'от 2 до 5 часов простоя', amount: '1 200 000 сум' },
      { label: 'полный день простоя', amount: '2 500 000 сум' },
    ],
    body: [
      'Поэтому поиск оператора нельзя откладывать «на потом». Если сотрудник уходит или не выходит на смену, владельцу приходится срочно искать замену, самому закрывать точку или платить больше за временный персонал.',
      'Ustores помогает снизить этот риск: мы берём поиск оператора на себя и запускаем подбор сразу после обращения.',
    ],
    sourceLabel: 'Источник: публичная оферта Uzum Franchise',
    sourceUrl: 'https://franchise.uzum.uz/legal/ru/oferta.html',
  },
  why: {
    title: 'Мы сами управляем ПВЗ и знаем подбор изнутри',
    body: [
      'Ustores более 3 лет работает на рынке пунктов выдачи заказов. У нас собственный портфель из 40+ ПВЗ разных брендов, поэтому мы каждый день сталкиваемся с теми же задачами, что и другие владельцы точек: поиск операторов, обучение, выход на смену, замены, дисциплина и качество работы.',
      'За годы работы мы наняли и провели через отбор более 500 операторов. Поэтому мы хорошо понимаем, какие кандидаты действительно подходят для работы в ПВЗ, а какие не доходят до обучения или быстро уходят.',
    ],
    stats: [
      { value: '3+ года', label: 'на рынке ПВЗ' },
      { value: '40+ ПВЗ', label: 'в управлении Ustores' },
      { value: '500+ операторов', label: 'прошли через наш найм' },
      { value: '14 дней', label: 'до передачи кандидата, готового к работе' },
    ],
  },
  advantages: [
    {
      title: 'Знаем специфику работы ПВЗ',
      text: 'Мы понимаем, каким должен быть оператор пункта выдачи: ответственным, пунктуальным, физически выносливым, вежливым с клиентами и готовым работать с большим потоком заказов, возвратов и операционных задач.',
    },
    {
      title: 'Ищем рядом с вашей локацией',
      text: 'Для ПВЗ важно, чтобы сотруднику было удобно добираться до работы. Поэтому мы запускаем поиск не просто «по городу», а вокруг конкретной точки: используем локальную рекламу, Facebook, Instagram, HeadHunter и расклейку рядом с вашим ПВЗ.',
    },
    {
      title: 'Первичный отбор и доводим до обучения',
      text: 'Мы не просто передаём вам контакты людей из откликов. Мы проводим первичный отбор, проверяем кандидата по базовым требованиям, объясняем условия работы, согласовываем его с вами и отправляем на обучение. На выходе вы получаете человека, который уже прошёл первичный фильтр и готов двигаться к выходу на смену.',
    },
    {
      title: 'Хорошо знаем требования Uzum',
      text: 'Мы понимаем, как проходит процесс обучения и допуска кандидатов к работе в ПВЗ Uzum. Сопровождаем кандидата на всех этапах: обучение, тесты, стажировка и подготовка к работе по стандартам маркетплейса.',
    },
  ],
  role: {
    title: 'Мы подбираем оператора ПВЗ под ваши условия',
    intro:
      'Типовой профиль кандидата — оператор пункта выдачи заказов, который готов работать с клиентами, товарами, возвратами и внутренними операционными задачами ПВЗ.',
    dutiesTitle: 'Обязанности кандидата',
    duties: [
      'Приём и распределение товаров на пункте выдачи.',
      'Выдача заказов клиентам.',
      'Оформление возвратов.',
      'Связь с клиентами при необходимости.',
      'Участие в инвентаризациях.',
      'Поддержание порядка и чистоты.',
      'Выполнение распоряжений руководителя.',
      'Сбор данных и оформление карточек товаров.',
      'Работа с физической нагрузкой и перемещением грузов.',
    ],
    requirementsTitle: 'Требования к кандидату',
    requirements: [
      'Владение ПК.',
      'Вежливость и умение общаться с людьми.',
      'Физическая выносливость.',
      'Ответственность.',
      'Пунктуальность.',
      'Коммуникабельность.',
      'Умение работать в команде.',
      'Стрессоустойчивость.',
      'Опрятность.',
      'Обучаемость.',
    ],
    conditionsTitle: 'Условия вакансии',
    conditions: [
      'График: 6/1 или 2/2.',
      'Время работы: с 09:00 до 21:00.',
      'Оплата: 150 000 сум за смену на руки.',
      'Работа в стабильной сфере e-commerce и пунктах выдачи заказов.',
    ],
  },
  service: {
    title: 'Берём поиск сотрудника на себя',
    intro:
      'Вам не нужно самостоятельно писать объявления, размещать вакансии, обзванивать кандидатов, договариваться о собеседованиях и сопровождать кандидата до выхода на работу. Мы делаем это за вас.',
    items: [
      { title: 'Подготовка вакансии', text: 'Адаптируем описание под вашу локацию, график, оплату и требования.' },
      { title: 'Размещение на HeadHunter', text: 'Публикуем вакансию и собираем отклики кандидатов.' },
      { title: 'Размещение в Facebook', text: 'Используем локальные группы и каналы рядом с вашей точкой.' },
      { title: 'Таргетинг в Instagram и Facebook', text: 'Запускаем рекламу вакансии на аудиторию вокруг нужной локации.' },
      { title: 'Расклейка вокруг ПВЗ', text: 'Организуем локальную расклейку объявления рядом с вашим пунктом.' },
      { title: 'Первичный отбор кандидатов', text: 'Проверяем график, опыт, готовность к нагрузке, коммуникабельность, ожидания по оплате.' },
      { title: 'Собеседование и выбор кандидата', text: 'Отбираем наиболее подходящего кандидата и согласовываем его с вами.' },
      { title: 'Направление на обучение Uzum', text: 'Передаём кандидата на обучение для допуска к работе по стандартам маркетплейса.' },
      { title: 'Сопровождение на стажировке', text: 'Помогаем пройти стажировку: контролируем процесс и поддерживаем связь.' },
      { title: 'Передача одобренного кандидата', text: 'Передаём кандидата, прошедшего этапы и одобренного Uzum для начала работы на ПВЗ.' },
    ],
  },
  timeline: {
    title: 'Как мы закрываем вакансию за 14 дней',
    steps: [
      {
        title: 'Вы пишете нам в Telegram',
        text: 'Указываете адрес ПВЗ, график, оплату за смену, количество сотрудников и дату выхода на работу.',
      },
      {
        title: 'Вносите стартовый платёж',
        text: 'Предоплата — 500 000 сум. После этого мы запускаем подбор.',
      },
      {
        title: 'Мы запускаем каналы поиска',
        text: 'HeadHunter, Facebook, Instagram, локальная расклейка и наш опыт найма операторов ПВЗ.',
      },
      {
        title: 'Проводим первичный отбор',
        text: 'Проверяем кандидатов по требованиям, графику, нагрузке, коммуникабельности и оплате.',
      },
      {
        title: 'Обучение и стажировка',
        text: 'Согласованного кандидата направляем на обучение Uzum и сопровождаем на этапе обучения и стажировки.',
      },
      {
        title: 'Передаём кандидата, готового к работе',
        text: 'Через 14 дней вы получаете кандидата, прошедшего обучение и стажировку и согласованного Uzum.',
      },
      {
        title: 'Оплата оставшейся части',
        text: 'После того как кандидат отработал первый месяц, вы оплачиваете оставшуюся часть — 2 500 000 сум + НДС.',
      },
    ],
  },
  pricing: {
    title: 'Стоимость услуги — 3 000 000 сум + НДС',
    tariffName: 'Подбор оператора ПВЗ под ключ',
    price: '3 000 000 сум + НДС',
    paymentTitle: 'Оплата',
    paymentLines: [
      '500 000 сум — предоплата для запуска поиска',
      '2 500 000 сум — после того, как кандидат отработал 1 месяц',
    ],
    includesTitle: 'Что входит',
    includes: [
      'Подготовка вакансии.',
      'Размещение на HeadHunter.',
      'Размещение в Facebook.',
      'Таргетинг в Instagram и Facebook.',
      'Локальная расклейка вокруг ПВЗ.',
      'Обработка откликов.',
      'Первичный отбор кандидатов.',
      'Согласование кандидата.',
      'Направление кандидата на обучение Uzum.',
      'Сопровождение на этапе обучения и стажировки.',
      'Передача кандидата, согласованного Uzum для начала работы.',
    ],
    note: 'Условия действуют для подбора одного оператора ПВЗ. Если необходимо закрыть несколько вакансий одновременно, условия согласуются индивидуально.',
  },
  audience: {
    title: 'Когда стоит заказать подбор',
    cards: [
      {
        title: 'Вы открываете новый ПВЗ',
        text: 'Нужно заранее найти оператора, чтобы точка могла стартовать без задержек и риска простоя.',
      },
      {
        title: 'Сотрудник внезапно ушёл',
        text: 'Нужно быстро найти замену, чтобы не закрывать смены самостоятельно и не рисковать штрафами.',
      },
      {
        title: 'У вас несколько ПВЗ',
        text: 'Нужен стабильный поток кандидатов и меньше ручной операционной нагрузки.',
      },
      {
        title: 'Кандидаты не доходят до работы',
        text: 'Мы помогаем не только собрать отклики, но и довести кандидата до обучения, стажировки и согласования Uzum.',
      },
    ],
  },
  clientNeeds: {
    title: 'Что нужно от вас для запуска подбора',
    intro: 'Чтобы мы быстро запустили поиск оператора, нам нужны базовые данные по вакансии и локации.',
    items: [
      'Адрес ПВЗ.',
      'Сколько операторов нужно.',
      'График работы: 6/1, 2/2 или другой.',
      'Оплата за смену.',
      'Когда сотрудник должен выйти.',
      'Контакт ответственного лица.',
      'Есть ли срочность или риск простоя.',
      'Особые требования, если они есть.',
    ],
  },
  finalCta: {
    title: 'Нужен оператор для вашего ПВЗ?',
    body: 'Напишите нам в Telegram. Мы уточним адрес вашей точки, график, условия оплаты, сроки выхода сотрудника и сразу скажем, как запустить подбор.',
    checklistTitle: 'Что мы уточним в Telegram',
    checklist: [
      'Адрес ПВЗ.',
      'Сколько операторов нужно.',
      'График работы: 6/1, 2/2 или другой.',
      'Оплату за смену.',
      'Когда сотрудник должен выйти.',
      'Есть ли срочность или риск простоя.',
    ],
    footnote: 'Обычно для запуска подбора достаточно 5–7 минут переписки.',
  },
  faq: [
    {
      q: 'Сколько времени занимает подбор?',
      a: 'Полный цикл подбора занимает до 14 дней. Срок может зависеть от локации, условий оплаты, графика и скорости прохождения обучения кандидатом.',
    },
    {
      q: 'Вы просто даёте контакты кандидатов?',
      a: 'Нет. Мы размещаем вакансию, собираем отклики, проводим первичный отбор, выбираем кандидата, передаём на обучение Uzum, сопровождаем обучение и стажировку и передаём вам согласованного Uzum кандидата, готового к смене.',
    },
    {
      q: 'Что входит в стоимость?',
      a: 'Подготовка вакансии, размещение на HeadHunter, Facebook, Instagram, локальная расклейка, обработка откликов, первичный отбор, направление на обучение, сопровождение стажировки и передача кандидата, согласованного Uzum.',
    },
    {
      q: 'Когда нужно платить?',
      a: '500 000 сум оплачиваются в начале работы. Оставшиеся 2 500 000 сум оплачиваются после того, как кандидат отработал 1 месяц.',
    },
    {
      q: 'Для каких ПВЗ подходит услуга?',
      a: 'В первую очередь для владельцев и франчайзи ПВЗ Uzum, которым нужен оператор на точку.',
    },
    {
      q: 'Можно ли заказать подбор сразу для нескольких точек?',
      a: 'Да. Если нужно закрыть несколько вакансий, условия и сроки согласуются индивидуально.',
    },
    {
      q: 'Что если кандидат не подойдёт?',
      a: 'Условия замены кандидата нужно согласовать отдельно до запуска подбора. Базовая услуга включает подбор одного кандидата, прохождение обучения, стажировки и передачу кандидата, согласованного Uzum для начала работы.',
    },
  ],
};

const en: PoiskPersonalaContent = {
  cta: 'Message on Telegram',
  metaTitle: 'Hire a pickup point operator in 14 days — Ustores',
  metaDescription:
    'Ustores recruits operators for Uzum pickup points end-to-end: job posting, local sourcing, screening, and support through training and internship. Price — 3,000,000 UZS + VAT.',
  hero: {
    h1: 'We will find an operator for your pickup point in 14 days, turnkey',
    subtitle: 'Ustores helps pickup point owners fill operator vacancies quickly.',
    lead: [
      'We post the vacancy on HH.uz and in Telegram groups, run local sourcing around your location, screen candidates, send them to training, support them during internship, and complete onboarding with Uzum.',
    ],
    ctaHint:
      'Message us on Telegram — we will confirm your pickup address, vacancy terms, and start the search.',
  },
  risk: {
    title: 'One day of pickup point downtime can cost 2,500,000 UZS',
    intro:
      'If an operator does not show up, the point may stop. Downtime is not just customer inconvenience — it is direct financial risk for the owner.',
    penaltiesTitle: 'Uzum penalties for pickup point downtime:',
    penalties: [
      { label: 'up to 2 hours downtime', amount: '400,000 UZS' },
      { label: '2 to 5 hours downtime', amount: '1,200,000 UZS' },
      { label: 'full day downtime', amount: '2,500,000 UZS' },
    ],
    body: [
      'Hiring cannot be postponed. When someone leaves or misses a shift, you must find a replacement urgently, cover shifts yourself, or pay more for temporary staff.',
      'Ustores reduces this risk: we take recruitment off your plate and start as soon as you reach out.',
    ],
    sourceLabel: 'Source: Uzum Franchise public offer',
    sourceUrl: 'https://franchise.uzum.uz/legal/ru/oferta.html',
  },
  why: {
    title: 'We run pickup points ourselves — we know hiring inside out',
    body: [
      'Ustores has been in the pickup point market for over 3 years. We operate 40+ pickup points across brands, facing the same challenges as other owners: hiring, training, shift coverage, replacements, discipline, and quality.',
      'We have hired and screened 500+ operators. We know who fits pickup work and who drops out before training or leaves quickly.',
    ],
    stats: [
      { value: '3+ years', label: 'in the pickup market' },
      { value: '40+ points', label: 'operated by Ustores' },
      { value: '500+ operators', label: 'hired through us' },
      { value: '14 days', label: 'to hand over a work-ready candidate' },
    ],
  },
  advantages: [
    {
      title: 'We know pickup work',
      text: 'We know what a pickup operator should be: responsible, punctual, physically resilient, polite with customers, and able to handle order flow, returns, and daily operations.',
    },
    {
      title: 'We search near your location',
      text: 'Commute matters. We do not only post “city-wide” — we target around your point: local ads, Facebook, Instagram, HeadHunter, and flyers near your pickup point.',
    },
    {
      title: 'Screening through to training',
      text: 'We do not just forward contacts. We screen, check basic fit, explain terms, align with you, and send the person to training. You get someone who passed the first filter and is ready for the next steps.',
    },
    {
      title: 'We know Uzum requirements',
      text: 'We understand Uzum training and clearance for pickup work and guide the candidate through training, tests, internship, and marketplace standards.',
    },
  ],
  role: {
    title: 'We recruit a pickup operator to your terms',
    intro:
      'Typical profile: a pickup point operator handling customers, goods, returns, and day-to-day operational tasks.',
    dutiesTitle: 'Responsibilities',
    duties: [
      'Receiving and sorting goods at the point.',
      'Issuing orders to customers.',
      'Processing returns.',
      'Customer communication when needed.',
      'Taking part in stock counts.',
      'Keeping order and cleanliness.',
      'Following supervisor instructions.',
      'Data collection and product card work.',
      'Physical work and moving goods.',
    ],
    requirementsTitle: 'Requirements',
    requirements: [
      'PC skills.',
      'Politeness and communication skills.',
      'Physical stamina.',
      'Responsibility.',
      'Punctuality.',
      'Teamwork.',
      'Stress tolerance.',
      'Neat appearance.',
      'Willingness to learn.',
    ],
    conditionsTitle: 'Vacancy terms',
    conditions: [
      'Schedule: 6/1 or 2/2.',
      'Hours: 09:00–21:00.',
      'Pay: 150,000 UZS net per shift.',
      'Stable e-commerce and pickup sector.',
    ],
  },
  service: {
    title: 'We take hiring off your hands',
    intro:
      'You do not need to write ads, post jobs, call applicants, schedule interviews, or shepherd people until start date. We do it for you.',
    items: [
      { title: 'Vacancy preparation', text: 'We tailor the description to your location, schedule, pay, and requirements.' },
      { title: 'HeadHunter posting', text: 'We publish and collect responses.' },
      { title: 'Facebook posting', text: 'Local groups and channels near your point.' },
      { title: 'Instagram & Facebook ads', text: 'Vacancy ads targeted around your location.' },
      { title: 'Flyers near the point', text: 'Local posting to reach people who can commute easily.' },
      { title: 'Initial screening', text: 'Schedule, experience, physical readiness, communication, pay expectations.' },
      { title: 'Interview & selection', text: 'We pick the best fit and confirm with you.' },
      { title: 'Uzum training intake', text: 'We send the candidate to training for marketplace clearance.' },
      { title: 'Internship support', text: 'We help them complete internship steps and stay on track.' },
      { title: 'Handover of cleared candidate', text: 'You receive someone cleared by Uzum to start at your point.' },
    ],
  },
  timeline: {
    title: 'How we close the role in 14 days',
    steps: [
      {
        title: 'You message us on Telegram',
        text: 'Share pickup address, schedule, pay per shift, headcount, and target start date.',
      },
      {
        title: 'You pay the start fee',
        text: '500,000 UZS advance — then we launch the search.',
      },
      {
        title: 'We open sourcing channels',
        text: 'HeadHunter, Facebook, Instagram, local flyers, and our pickup hiring experience.',
      },
      {
        title: 'We screen candidates',
        text: 'Fit vs requirements, schedule, physical load, communication, and pay alignment.',
      },
      {
        title: 'Training & internship',
        text: 'We send the agreed candidate to Uzum training and support training and internship.',
      },
      {
        title: 'We hand over a work-ready candidate',
        text: 'In 14 days you get someone trained, interned, and cleared by Uzum.',
      },
      {
        title: 'You pay the balance',
        text: 'After the first full month on the job, you pay the remainder — 2,500,000 UZS + VAT.',
      },
    ],
  },
  pricing: {
    title: 'Service fee — 3,000,000 UZS + VAT',
    tariffName: 'Turnkey pickup operator recruitment',
    price: '3,000,000 UZS + VAT',
    paymentTitle: 'Payment',
    paymentLines: [
      '500,000 UZS — advance to start the search',
      '2,500,000 UZS — after the candidate completes 1 month on the job',
    ],
    includesTitle: 'Included',
    includes: [
      'Vacancy preparation.',
      'HeadHunter posting.',
      'Facebook posting.',
      'Instagram & Facebook ads.',
      'Local flyers around the pickup point.',
      'Response handling.',
      'Initial screening.',
      'Candidate alignment with you.',
      'Uzum training intake.',
      'Support during training and internship.',
      'Handover of a candidate cleared by Uzum to start work.',
    ],
    note: 'Terms apply to recruiting one pickup operator. Multiple simultaneous vacancies are agreed individually.',
  },
  audience: {
    title: 'When this service helps most',
    cards: [
      {
        title: 'Opening a new pickup point',
        text: 'Secure an operator early so launch is not delayed and downtime risk is lower.',
      },
      {
        title: 'Sudden resignation',
        text: 'Find a replacement quickly so you are not covering every shift or risking penalties.',
      },
      {
        title: 'Multiple points',
        text: 'Steady candidate flow and less manual hiring workload.',
      },
      {
        title: 'Candidates never make it to the job',
        text: 'We help not only collect leads but move people through training, internship, and Uzum clearance.',
      },
    ],
  },
  clientNeeds: {
    title: 'What we need from you to start',
    intro: 'Basic vacancy and location details to launch quickly.',
    items: [
      'Pickup point address.',
      'How many operators you need.',
      'Schedule: 6/1, 2/2, or other.',
      'Pay per shift.',
      'Required start date.',
      'Contact person.',
      'Urgency or downtime risk.',
      'Any special requirements.',
    ],
  },
  finalCta: {
    title: 'Need an operator for your pickup point?',
    body: 'Message us on Telegram. We will confirm address, schedule, pay, start timeline, and how to launch recruitment.',
    checklistTitle: 'What we clarify in Telegram',
    checklist: [
      'Pickup address.',
      'Headcount needed.',
      'Schedule: 6/1, 2/2, or other.',
      'Pay per shift.',
      'Required start date.',
      'Urgency or downtime risk.',
    ],
    footnote: 'Usually 5–7 minutes of chat is enough to start.',
  },
  faq: [
    {
      q: 'How long does recruitment take?',
      a: 'End-to-end up to 14 days, depending on location, pay, schedule, and how fast the candidate completes training.',
    },
    {
      q: 'Do you only share phone numbers?',
      a: 'No. We post the job, collect responses, screen, select, send to Uzum training, support training and internship, and hand over a Uzum-cleared candidate ready for shifts.',
    },
    {
      q: 'What is included in the price?',
      a: 'Vacancy prep, HeadHunter, Facebook, Instagram, local flyers, response handling, screening, training intake, internship support, and handover of a Uzum-cleared candidate.',
    },
    {
      q: 'When do I pay?',
      a: '500,000 UZS at the start. The remaining 2,500,000 UZS after the candidate completes one month on the job.',
    },
    {
      q: 'Which pickup points is this for?',
      a: 'Primarily owners and franchisees of Uzum pickup points who need an operator.',
    },
    {
      q: 'Can we hire for several locations at once?',
      a: 'Yes. Multiple vacancies are scoped individually.',
    },
    {
      q: 'What if the candidate does not work out?',
      a: 'Replacement terms should be agreed before kickoff. The base service covers one candidate through training, internship, and Uzum clearance to start work.',
    },
  ],
};

const zhMeta = {
  metaTitle: '14天内为自提点招聘操作员 — Ustores',
  metaDescription:
    'Ustores 为 Uzum 自提点提供全流程招聘：发布职位、本地寻访、初筛、培训与实习陪同。费用 — 3 000 000 苏姆 + 增值税。',
};

const uzMeta = {
  metaTitle: '14 kun ichida PPVZ operatori — Ustores',
  metaDescription:
    "Ustores Uzum PPVZ uchun operatorlarni 'kalit topshirish' asosida tanlaydi: vakansiya, mahalliy qidiruv, dastlabki saralash, o'qitish va amaliyot. Narx — 3 000 000 so'm + QQS.",
};

export function getPoiskPersonalaContent(lang: Language): PoiskPersonalaContent {
  if (lang === 'ru') return ru;
  if (lang === 'en') return en;
  if (lang === 'zh') return { ...en, ...zhMeta };
  return { ...en, ...uzMeta };
}
