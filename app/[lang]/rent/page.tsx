import { Metadata } from 'next';
import { Language, languages } from '@/lib/translations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface PageProps {
  params: { lang: string };
}

export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';
  
  const titles: Record<Language, string> = {
    ru: 'Аренда помещений — Ustores',
    en: 'Property Rental — Ustores',
    zh: '物业租赁 — Ustores',
    uz: 'Ijara — Ustores',
  };

  const descriptions: Record<Language, string> = {
    ru: 'Сдайте помещение в аренду для открытия ПВЗ. Процесс аренды, условия и документы.',
    en: 'Rent your property for a pickup point. Rental process, terms and documents.',
    zh: '出租您的物业用于自提点。租赁流程、条款和文件。',
    uz: "Buyurtma olish punkti uchun joylashuvingizni ijaraga bering. Ijara jarayoni, shartlar va hujjatlar.",
  };

  return {
    title: titles[validLang],
    description: descriptions[validLang],
  };
}

export default function RentPage({ params }: PageProps) {
  const validLang = languages.some((l) => l.code === params.lang) ? (params.lang as Language) : 'ru';

  const content = {
    ru: {
      hero: {
        badge: 'Для арендодателей',
        title: 'Надёжный арендатор для вашего помещения',
        description: 'Ustores арендует помещения на 3 года под ПВЗ/почтовые отделения. Чёткие условия, ежемесячные платежи без задержек и аккуратное использование помещения.',
        cta: 'Обсудить условия',
        benefits: ['Договор на 3 года', 'Оплата в срок', 'Бережное использование'],
      },
      section1: {
        title: 'Что мы делаем в помещении',
        description: 'Ustores арендует помещения в Ташкенте для открытия пунктов выдачи заказов (ПВЗ) и/или почтовых отделений. Мы работаем с 7 крупными международными брендами и запускаем точки по их стандартам — поэтому используем понятный пошаговый процесс, типовые документы и заранее согласованные требования.',
        format: {
          title: 'Коротко о формате работы:',
          items: [
            { label: 'Формат помещения', value: 'ПВЗ / почтовое отделение (офисный формат)' },
            { label: 'Назначение', value: 'сервисное помещение для обслуживания клиентов' },
            { label: 'Процесс запуска', value: 'по этапам, с понятными сроками и документами' },
            { label: 'Документы', value: 'депозит → замеры → Эджара → договор → оплата → запуск' },
          ],
        },
      },
      section2: {
        title: 'Процесс аренды: 5 шагов',
        steps: [
          {
            number: '01',
            title: 'Депозит и передача ключей',
            description: 'После того как мы согласовали условия аренды, Ustores вносит депозит 1 200 000 сум — это подтверждение серьёзных намерений и фиксация договорённостей на период подготовки.',
            details: [
              'После подписания договора аренды и оплаты аренды — депозит возвращается арендатору',
              'Если сделка не состоялась по нашей причине — депозит остаётся арендодателю',
            ],
            note: 'После получения депозита арендодатель передаёт ключи для проведения замеров и подготовки согласований.',
          },
          {
            number: '02',
            title: 'Замеры помещения',
            description: 'Наш сотрудник приезжает и делает замеры помещения. Далее мы запускаем внутренний процесс согласования с брендами.',
            details: [
              'Участие арендодателя: не требуется',
              'Чтобы ускорить этап: ключи желательно передать на Шаге 1',
            ],
          },
          {
            number: '03',
            title: 'Оформление E-IJARA',
            description: 'Арендодатель оформляет Эджару, в которой фиксируются корректные условия аренды.',
            checklist: [
              'Дата начала Эджары: через 2 недели от текущей даты',
              'Срок аренды: 3 года',
              'Субаренда: обязательно поставить галочку «разрешена субаренда»',
              'Коммунальные платежи: не отмечать пункты, где указано, что коммунальные оплачивает арендатор',
              'Тип помещения: выбрать «Офис»',
            ],
            note: 'Зачем нужна субаренда: При запуске точки партнёрские бренды могут устанавливать кассовое оборудование и размещать своё оборудование/материалы. Для этого в документах должна быть предусмотрена возможность передачи площади в субаренду через Ustores.',
          },
          {
            number: '04',
            title: 'Подписание договора аренды',
            description: 'Ustores предоставляет типовой договор аренды, заранее согласованный с брендами и соответствующий их требованиям. Мы лояльны к требованиям арендодателя, а условия договора — это отражение стандартов брендов, необходимых для запуска. Использование типового договора снижает количество правок и ускоряет открытие точки.',
            conditions: [
              'Срок аренды — 3 года',
              'Коммунальные расходы компенсирует арендатор',
              'Арендная ставка включает НДФЛ (12%)',
              'Инспекция помещения — 1 раз в месяц',
              'Индексация арендной платы — не более 7% в год после 12 месяцев',
              'Срок оплаты аренды — до 10 числа каждого месяца',
              'Льготный период — 1 неделя',
            ],
            downloadLink: {
              text: 'Скачать типовой договор аренды',
              url: 'https://docs.google.com/document/d/1gOjHdrw75s_K-AUj859Fb2tkxobtbQfKKgdLH8IQT3o/edit?tab=t.0',
            },
          },
          {
            number: '05',
            title: 'Оплата аренды',
            description: 'В течение 3 рабочих дней после подписания договора аренды арендатор вносит предоплату за оставшуюся часть текущего месяца.',
            details: [
              'До подписания договора аренды предоплата не производится',
              'Далее оплата происходит до 10 числа каждого месяца',
            ],
          },
        ],
      },
      section3: {
        title: 'Типовой таймлайн запуска',
        subtitle: 'Сроки могут меняться в зависимости от оформления документов и согласований',
        timeline: [
          { day: 'День 0', text: 'Депозит и передача ключей' },
          { day: '1–3 дня', text: 'Замеры помещения + оформление Эджары' },
          { day: '1 неделя', text: 'Согласование и подписание договора аренды' },
          { day: '2 недели', text: 'Ремонтные / подготовительные работы' },
          { day: 'Запуск', text: 'Открытие ПВЗ / почтового отделения' },
        ],
      },
      section4: {
        title: 'Документы',
        subtitle: 'На старте работы используются следующие документы:',
        docs: [
          'Типовой договор аренды Ustores',
          'Чек-лист заполнения Эджары',
          'Памятка процесса / пример заполнения Эджары',
        ],
      },
      faq: {
        title: 'Частые вопросы',
        items: [
          {
            q: 'Зачем нужен депозит 1 200 000 сум?',
            a: 'Это подтверждение серьёзных намерений и фиксация договорённостей на период подготовки документов и согласований.',
          },
          {
            q: 'Когда передаются ключи?',
            a: 'Ключи передаются после получения депозита, чтобы мы могли оперативно провести замеры и начать подготовку.',
          },
          {
            q: 'Кто делает замеры и сколько это занимает?',
            a: 'Замеры делает сотрудник Ustores. Обычно это занимает один визит, далее начинается согласование.',
          },
          {
            q: 'Зачем нужен договор аренды, если уже есть Эджара?',
            a: 'Эджара — это регистрация аренды в государственной системе. При этом в Эджаре не фиксируются многие важные условия: порядок и сроки оплаты, обязанности арендатора, ответственность сторон. Поэтому договор аренды является обязательным документом.',
          },
          {
            q: 'Почему в Эджаре нужно выбрать тип помещения «Офис»?',
            a: 'Чтобы подтянулась корректная категория/ставка при оформлении Эджары.',
          },
          {
            q: 'Почему дата начала Эджары ставится через 2 недели?',
            a: 'Это стандартный буфер для подготовки документов и согласований до фактического старта аренды.',
          },
          {
            q: 'Кто оплачивает коммунальные расходы?',
            a: 'Формально коммунальные остаются на стороне собственника, но компенсация расходов по воде и электроэнергии возлагается на арендатора и фиксируется в договоре.',
          },
          {
            q: 'Как работает индексация арендной платы?',
            a: 'Индексация возможна по истечении 12 месяцев, не чаще одного раза в год и не более 7%, в связи с инфляцией и ростом налогов.',
          },
        ],
      },
      contacts: {
        title: 'Контакты ответственных менеджеров',
        subtitle: 'Если у вас есть вопросы по этапам, документам или заполнению Эджары — свяжитесь с нами:',
        managers: [
          { name: 'Александр Радостин', telegram: '@UstoresUzb', photo: '/testimonials/Alexander.png' },
          { name: 'Джавохир Акбарходжаев', telegram: '@javoxrmsg', photo: '/testimonials/Javohir.png' },
        ],
        telegramBtn: 'Написать в Telegram',
      },
    },
    en: {
      hero: {
        badge: 'For Landlords',
        title: 'A Reliable Tenant for Your Property',
        description: 'Ustores rents properties for 3 years for pickup points/post offices. Clear terms, monthly payments without delays and careful use of premises.',
        cta: 'Discuss Terms',
        benefits: ['3-year contract', 'Payment by the 10th', 'Careful property use'],
      },
      section1: {
        title: 'What We Do in the Premises',
        description: 'Ustores rents premises in Tashkent for opening pickup points (PVZ) and/or post offices. We work with 7 major international brands and launch points according to their standards — that\'s why we use a clear step-by-step process, standard documents and pre-agreed requirements.',
        format: {
          title: 'Brief overview of the work format:',
          items: [
            { label: 'Premises format', value: 'Pickup point / post office (office format)' },
            { label: 'Purpose', value: 'service premises for customer service' },
            { label: 'Launch process', value: 'in stages, with clear deadlines and documents' },
            { label: 'Documents', value: 'deposit → measurements → E-Ijara → contract → payment → launch' },
          ],
        },
      },
      section2: {
        title: 'Rental Process: 5 Steps',
        steps: [
          {
            number: '01',
            title: 'Deposit and Key Handover',
            description: 'After we agree on the rental terms, Ustores pays a deposit of 1,200,000 UZS — this confirms serious intentions and locks in the agreements for the preparation period.',
            details: [
              'After signing the lease and paying rent — the deposit is returned to the tenant',
              'If the deal falls through due to our fault — the deposit stays with the landlord',
            ],
            note: 'After receiving the deposit, the landlord hands over the keys for measurements and preparation of approvals.',
          },
          {
            number: '02',
            title: 'Premises Measurements',
            description: 'Our employee comes and takes measurements of the premises. Then we start the internal approval process with brands.',
            details: [
              'Landlord participation: not required',
              'To speed up the stage: keys should be handed over at Step 1',
            ],
          },
          {
            number: '03',
            title: 'E-IJARA Registration',
            description: 'The landlord registers E-Ijara, which records the correct rental terms.',
            checklist: [
              'E-Ijara start date: 2 weeks from current date',
              'Lease term: 3 years',
              'Sublease: must check "sublease allowed"',
              'Utilities: do not check items where tenant pays utilities',
              'Property type: select "Office"',
            ],
            note: 'Why sublease is needed: When launching a point, partner brands may install cash register equipment and place their equipment/materials. For this, the documents must provide for the possibility of subletting the area through Ustores.',
          },
          {
            number: '04',
            title: 'Signing the Lease Agreement',
            description: 'Ustores provides a standard lease agreement, pre-approved by brands and meeting their requirements. We are flexible to landlord requirements, and the contract terms reflect brand standards necessary for launch. Using a standard agreement reduces revisions and speeds up the opening.',
            conditions: [
              'Lease term — 3 years',
              'Utilities compensated by tenant',
              'Rental rate includes income tax (12%)',
              'Property inspection — once a month',
              'Rent indexation — no more than 7% per year after 12 months',
              'Payment deadline — by the 10th of each month',
              'Grace period — 1 week',
            ],
            downloadLink: {
              text: 'Download standard lease agreement',
              url: 'https://docs.google.com/document/d/1gOjHdrw75s_K-AUj859Fb2tkxobtbQfKKgdLH8IQT3o/edit?tab=t.0',
            },
          },
          {
            number: '05',
            title: 'Rent Payment',
            description: 'Within 3 business days after signing the lease, the tenant pays advance payment for the remaining part of the current month.',
            details: [
              'No advance payment before signing the lease',
              'Further payments by the 10th of each month',
            ],
          },
        ],
      },
      section3: {
        title: 'Typical Launch Timeline',
        subtitle: 'Timelines may vary depending on document processing and approvals',
        timeline: [
          { day: 'Day 0', text: 'Deposit and key handover' },
          { day: '1–3 days', text: 'Premises measurements + E-Ijara registration' },
          { day: '1 week', text: 'Approval and signing of lease agreement' },
          { day: '2 weeks', text: 'Renovation / preparation work' },
          { day: 'Launch', text: 'Opening of pickup point / post office' },
        ],
      },
      section4: {
        title: 'Documents',
        subtitle: 'The following documents are used at the start:',
        docs: [
          'Standard Ustores lease agreement',
          'E-Ijara completion checklist',
          'Process memo / E-Ijara completion example',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Why is a 1,200,000 UZS deposit needed?',
            a: 'This confirms serious intentions and locks in the agreements for the document preparation and approval period.',
          },
          {
            q: 'When are the keys handed over?',
            a: 'Keys are handed over after receiving the deposit so we can promptly conduct measurements and start preparation.',
          },
          {
            q: 'Who does the measurements and how long does it take?',
            a: 'Measurements are done by a Ustores employee. Usually it takes one visit, then approval begins.',
          },
          {
            q: 'Why is a lease agreement needed if E-Ijara exists?',
            a: 'E-Ijara is rental registration in the government system. However, E-Ijara doesn\'t record many important terms: payment procedure and deadlines, tenant obligations, party liability. Therefore, a lease agreement is a required document.',
          },
          {
            q: 'Why should "Office" be selected as property type in E-Ijara?',
            a: 'To pull up the correct category/rate when registering E-Ijara.',
          },
          {
            q: 'Why is the E-Ijara start date set 2 weeks ahead?',
            a: 'This is a standard buffer for document preparation and approvals before the actual start of the lease.',
          },
          {
            q: 'Who pays utility costs?',
            a: 'Formally, utilities remain with the owner, but compensation for water and electricity costs is borne by the tenant and recorded in the contract.',
          },
          {
            q: 'How does rent indexation work?',
            a: 'Indexation is possible after 12 months, no more than once a year and no more than 7%, due to inflation and tax increases.',
          },
        ],
      },
      contacts: {
        title: 'Contact Responsible Managers',
        subtitle: 'If you have questions about stages, documents or E-Ijara completion — contact us:',
        managers: [
          { name: 'Alexander Radostin', telegram: '@UstoresUzb', photo: '/testimonials/Alexander.png' },
          { name: 'Javokhir Akbarkhodjaev', telegram: '@javoxrmsg', photo: '/testimonials/Javohir.png' },
        ],
        telegramBtn: 'Message on Telegram',
      },
    },
    zh: {
      hero: {
        badge: '面向房东',
        title: '您物业的可靠租户',
        description: 'Ustores租赁物业3年用于自提点/邮政点。明确条款、按月付款无延迟、谨慎使用房屋。',
        cta: '讨论条款',
        benefits: ['3年合同', '10日前付款', '谨慎使用物业'],
      },
      section1: {
        title: '我们在房屋中做什么',
        description: 'Ustores在塔什干租赁场地用于开设自提点(PVZ)和/或邮政点。我们与7个主要国际品牌合作，按照他们的标准启动网点——因此我们使用清晰的分步流程、标准文件和预先商定的要求。',
        format: {
          title: '工作格式简述：',
          items: [
            { label: '场地格式', value: '自提点/邮政点（办公格式）' },
            { label: '用途', value: '客户服务场所' },
            { label: '启动流程', value: '分阶段进行，有明确的时间表和文件' },
            { label: '文件', value: '押金 → 测量 → E-Ijara → 合同 → 付款 → 启动' },
          ],
        },
      },
      section2: {
        title: '租赁流程：5个步骤',
        steps: [
          {
            number: '01',
            title: '押金和钥匙交接',
            description: '在我们商定租赁条款后，Ustores支付1,200,000苏姆的押金——这确认了认真的意向并锁定了准备期的协议。',
            details: [
              '签署租约并支付租金后——押金退还给租户',
              '如果交易因我们的原因失败——押金留给房东',
            ],
            note: '收到押金后，房东交出钥匙以进行测量和准备审批。',
          },
          {
            number: '02',
            title: '场地测量',
            description: '我们的员工来测量场地。然后我们开始与品牌的内部审批流程。',
            details: [
              '房东参与：不需要',
              '为加快阶段：钥匙应在步骤1交接',
            ],
          },
          {
            number: '03',
            title: 'E-IJARA注册',
            description: '房东注册E-Ijara，记录正确的租赁条款。',
            checklist: [
              'E-Ijara开始日期：从当前日期起2周',
              '租期：3年',
              '转租：必须勾选"允许转租"',
              '公用事业：不要勾选租户支付公用事业的项目',
              '物业类型：选择"办公室"',
            ],
            note: '为什么需要转租：在启动网点时，合作品牌可能会安装收银设备并放置其设备/材料。为此，文件必须规定通过Ustores转租场地的可能性。',
          },
          {
            number: '04',
            title: '签署租赁协议',
            description: 'Ustores提供标准租赁协议，已获品牌预先批准并符合其要求。我们对房东的要求持开放态度，合同条款反映了启动所需的品牌标准。使用标准协议可减少修改并加快开业速度。',
            conditions: [
              '租期——3年',
              '公用事业由租户补偿',
              '租金率包含所得税（12%）',
              '物业检查——每月一次',
              '租金指数化——12个月后每年不超过7%',
              '付款截止日期——每月10日前',
              '宽限期——1周',
            ],
            downloadLink: {
              text: '下载标准租赁协议',
              url: 'https://docs.google.com/document/d/1gOjHdrw75s_K-AUj859Fb2tkxobtbQfKKgdLH8IQT3o/edit?tab=t.0',
            },
          },
          {
            number: '05',
            title: '租金支付',
            description: '签署租约后3个工作日内，租户支付当月剩余部分的预付款。',
            details: [
              '签署租约前不预付款',
              '此后每月10日前付款',
            ],
          },
        ],
      },
      section3: {
        title: '典型启动时间表',
        subtitle: '时间表可能因文件处理和审批而异',
        timeline: [
          { day: '第0天', text: '押金和钥匙交接' },
          { day: '1-3天', text: '场地测量 + E-Ijara注册' },
          { day: '1周', text: '审批和签署租赁协议' },
          { day: '2周', text: '装修/准备工作' },
          { day: '启动', text: '开设自提点/邮政点' },
        ],
      },
      section4: {
        title: '文件',
        subtitle: '开始时使用以下文件：',
        docs: [
          'Ustores标准租赁协议',
          'E-Ijara完成清单',
          '流程备忘录/E-Ijara完成示例',
        ],
      },
      faq: {
        title: '常见问题',
        items: [
          {
            q: '为什么需要1,200,000苏姆的押金？',
            a: '这确认了认真的意向并锁定了文件准备和审批期的协议。',
          },
          {
            q: '钥匙什么时候交接？',
            a: '收到押金后交接钥匙，以便我们能够及时进行测量并开始准备。',
          },
          {
            q: '谁进行测量，需要多长时间？',
            a: '测量由Ustores员工完成。通常需要一次访问，然后开始审批。',
          },
          {
            q: '如果存在E-Ijara，为什么还需要租赁协议？',
            a: 'E-Ijara是政府系统中的租赁注册。但是，E-Ijara不记录许多重要条款：付款程序和截止日期、租户义务、当事方责任。因此，租赁协议是必需的文件。',
          },
          {
            q: '为什么在E-Ijara中应选择"办公室"作为物业类型？',
            a: '以便在注册E-Ijara时获取正确的类别/费率。',
          },
          {
            q: '为什么E-Ijara开始日期设置为2周后？',
            a: '这是文件准备和审批的标准缓冲期，在实际租赁开始之前。',
          },
          {
            q: '谁支付公用事业费用？',
            a: '正式来说，公用事业由业主承担，但水电费用的补偿由租户承担并记录在合同中。',
          },
          {
            q: '租金指数化如何运作？',
            a: '指数化在12个月后可行，每年不超过一次，不超过7%，因通货膨胀和税收增加。',
          },
        ],
      },
      contacts: {
        title: '联系负责经理',
        subtitle: '如果您对阶段、文件或E-Ijara完成有疑问——请联系我们：',
        managers: [
          { name: 'Alexander Radostin', telegram: '@UstoresUzb', photo: '/testimonials/Alexander.png' },
          { name: 'Javokhir Akbarkhodjaev', telegram: '@javoxrmsg', photo: '/testimonials/Javohir.png' },
        ],
        telegramBtn: '发送Telegram消息',
      },
    },
    uz: {
      hero: {
        badge: 'Ijaraga beruvchilar uchun',
        title: 'Joylashuvingiz uchun ishonchli ijarachi',
        description: "Ustores 3 yil muddatga ПВЗ/pochta bo'limlari uchun joylashuvlarni ijaraga oladi. Aniq shartlar, kechikishsiz oylik to'lovlar va binoning ehtiyotkorlik bilan ishlatilishi.",
        cta: 'Shartlarni muhokama qilish',
        benefits: ['3 yillik shartnoma', "O'z vaqtida to'lov", "Ehtiyotkorlik bilan foydalanish"],
      },
      section1: {
        title: "Biz xonada nima qilamiz",
        description: "Ustores Toshkentda buyurtma olish punktlari (ПВЗ) va/yoki pochta bo'limlarini ochish uchun joylashuvlarni ijaraga oladi. Biz 7 ta yirik xalqaro brend bilan ishlaymiz va ularning standartlariga muvofiq nuqtalarni ishga tushiramiz — shuning uchun biz aniq bosqichma-bosqich jarayondan, standart hujjatlardan va oldindan kelishilgan talablardan foydalanamiz.",
        format: {
          title: "Ish formati haqida qisqacha:",
          items: [
            { label: 'Joylashuv formati', value: "ПВЗ / pochta bo'limi (ofis formati)" },
            { label: 'Maqsad', value: "mijozlarga xizmat ko'rsatish uchun xizmat xonasi" },
            { label: 'Ishga tushirish jarayoni', value: "bosqichma-bosqich, aniq muddatlar va hujjatlar bilan" },
            { label: 'Hujjatlar', value: "depozit → o'lchov → E-ijara → shartnoma → to'lov → ishga tushirish" },
          ],
        },
      },
      section2: {
        title: 'Ijara jarayoni: 5 qadam',
        steps: [
          {
            number: '01',
            title: "Depozit va kalitlarni topshirish",
            description: "Ijara shartlarini kelishganimizdan so'ng, Ustores 1 200 000 so'm depozit to'laydi — bu jiddiy niyatni tasdiqlaydi va tayyorgarlik davri uchun kelishuvlarni mustahkamlaydi.",
            details: [
              "Ijara shartnomasini imzolash va ijara haqini to'lashdan so'ng — depozit ijarachiga qaytariladi",
              "Agar bitim bizning sababimiz tufayli amalga oshmasa — depozit ijaraga beruvchida qoladi",
            ],
            note: "Depozitni olgandan so'ng, ijaraga beruvchi o'lchov va tasdiqlashlarni tayyorlash uchun kalitlarni topshiradi.",
          },
          {
            number: '02',
            title: "Xona o'lchovlari",
            description: "Bizning xodimimiz kelib, xonaning o'lchovlarini oladi. Keyin brendlar bilan ichki tasdiqlash jarayonini boshlaymiz.",
            details: [
              "Ijaraga beruvchi ishtiroki: talab qilinmaydi",
              "Bosqichni tezlashtirish uchun: kalitlar 1-qadamda topshirilishi kerak",
            ],
          },
          {
            number: '03',
            title: 'E-IJARA rasmiylashtirish',
            description: "Ijaraga beruvchi E-ijarani rasmiylashtirib, unda to'g'ri ijara shartlari qayd etiladi.",
            checklist: [
              "E-ijara boshlanish sanasi: joriy sanadan 2 hafta keyin",
              'Ijara muddati: 3 yil',
              "Subijara: «subijaraga ruxsat berilgan» degan katakchani belgilash shart",
              "Kommunal to'lovlar: ijarachi kommunal to'lovlarni to'laydi degan bandlarni belgilamang",
              "Xona turi: «Ofis»ni tanlang",
            ],
            note: "Subijara nima uchun kerak: Nuqtani ishga tushirishda hamkor brendlar kassa uskunalarini o'rnatishi va o'z jihozlari/materiallarini joylashtirishi mumkin. Buning uchun hujjatlarda maydoni Ustores orqali subijaraga berish imkoniyati ko'zda tutilgan bo'lishi kerak.",
          },
          {
            number: '04',
            title: 'Ijara shartnomasini imzolash',
            description: "Ustores brendlar tomonidan oldindan tasdiqlangan va ularning talablariga javob beradigan standart ijara shartnomasini taqdim etadi. Biz ijaraga beruvchining talablariga moslashuvchanmiz, shartnoma shartlari esa ishga tushirish uchun zarur bo'lgan brend standartlarini aks ettiradi. Standart shartnomadan foydalanish tuzatishlar sonini kamaytiradi va ochilishni tezlashtiradi.",
            conditions: [
              'Ijara muddati — 3 yil',
              "Kommunal xarajatlar ijarachi tomonidan qoplanadi",
              "Ijara stavkasi daromad solig'ini o'z ichiga oladi (12%)",
              "Xonani tekshirish — oyda 1 marta",
              "Ijara haqini indeksatsiyalash — 12 oydan keyin yiliga 7% dan ko'p emas",
              "Ijara haqini to'lash muddati — har oyning 10-kunigacha",
              'Imtiyozli muddat — 1 hafta',
            ],
            downloadLink: {
              text: 'Standart ijara shartnomasini yuklab olish',
              url: 'https://docs.google.com/document/d/1gOjHdrw75s_K-AUj859Fb2tkxobtbQfKKgdLH8IQT3o/edit?tab=t.0',
            },
          },
          {
            number: '05',
            title: "Ijara haqini to'lash",
            description: "Ijara shartnomasini imzolagandan so'ng 3 ish kuni ichida ijarachi joriy oyning qolgan qismi uchun oldindan to'lovni amalga oshiradi.",
            details: [
              "Ijara shartnomasini imzolashdan oldin oldindan to'lov qilinmaydi",
              "Keyingi to'lovlar har oyning 10-kunigacha amalga oshiriladi",
            ],
          },
        ],
      },
      section3: {
        title: "Odatiy ishga tushirish jadvali",
        subtitle: "Muddatlar hujjatlarni rasmiylashtirish va tasdiqlashlarga qarab o'zgarishi mumkin",
        timeline: [
          { day: '0-kun', text: "Depozit va kalitlarni topshirish" },
          { day: '1–3 kun', text: "Xona o'lchovlari + E-ijara rasmiylashtirish" },
          { day: '1 hafta', text: "Ijara shartnomasini tasdiqlash va imzolash" },
          { day: '2 hafta', text: "Ta'mirlash / tayyorgarlik ishlari" },
          { day: 'Ishga tushirish', text: "ПВЗ / pochta bo'limini ochish" },
        ],
      },
      section4: {
        title: 'Hujjatlar',
        subtitle: "Ishni boshlashda quyidagi hujjatlardan foydalaniladi:",
        docs: [
          'Ustores standart ijara shartnomasi',
          "E-ijara to'ldirish ro'yxati",
          "Jarayon eslatmasi / E-ijara to'ldirish namunasi",
        ],
      },
      faq: {
        title: "Ko'p beriladigan savollar",
        items: [
          {
            q: "1 200 000 so'mlik depozit nima uchun kerak?",
            a: "Bu jiddiy niyatni tasdiqlaydi va hujjatlar tayyorlash va tasdiqlash davri uchun kelishuvlarni mustahkamlaydi.",
          },
          {
            q: "Kalitlar qachon topshiriladi?",
            a: "Kalitlar depozitni olgandan so'ng topshiriladi, shunda biz tezda o'lchovlarni o'tkazib, tayyorgarlikni boshlashimiz mumkin.",
          },
          {
            q: "O'lchovlarni kim qiladi va bu qancha vaqt oladi?",
            a: "O'lchovlarni Ustores xodimi amalga oshiradi. Odatda bu bir tashrif talab qiladi, keyin tasdiqlash boshlanadi.",
          },
          {
            q: "E-ijara mavjud bo'lsa, ijara shartnomasi nima uchun kerak?",
            a: "E-ijara — bu davlat tizimida ijara ro'yxatdan o'tishi. Biroq, E-ijarada ko'plab muhim shartlar qayd etilmaydi: to'lov tartibi va muddatlari, ijarachining majburiyatlari, tomonlarning javobgarligi. Shuning uchun ijara shartnomasi majburiy hujjat hisoblanadi.",
          },
          {
            q: "E-ijarada xona turi sifatida nima uchun «Ofis»ni tanlash kerak?",
            a: "E-ijarani rasmiylashtirish vaqtida to'g'ri toifa/stavka olinishi uchun.",
          },
          {
            q: "E-ijara boshlanish sanasi nima uchun 2 hafta oldinga qo'yiladi?",
            a: "Bu hujjatlarni tayyorlash va ijaraning haqiqiy boshlanishidan oldin tasdiqlash uchun standart bufer davridir.",
          },
          {
            q: "Kommunal xarajatlarni kim to'laydi?",
            a: "Rasman kommunal xizmatlar mulk egasida qoladi, lekin suv va elektr energiyasi xarajatlarini qoplash ijarachiga yuklanadi va shartnomada qayd etiladi.",
          },
          {
            q: "Ijara haqini indeksatsiyalash qanday ishlaydi?",
            a: "Indeksatsiyalash 12 oydan keyin mumkin, yiliga bir martadan ko'p emas va inflyatsiya va soliq oshishi tufayli 7% dan ko'p emas.",
          },
        ],
      },
      contacts: {
        title: "Mas'ul menejerlar kontaktlari",
        subtitle: "Bosqichlar, hujjatlar yoki E-ijarani to'ldirish bo'yicha savollaringiz bo'lsa — biz bilan bog'laning:",
        managers: [
          { name: 'Aleksandr Radostin', telegram: '@UstoresUzb', photo: '/testimonials/Alexander.png' },
          { name: 'Javohir Akbarxo\'jayev', telegram: '@javoxrmsg', photo: '/testimonials/Javohir.png' },
        ],
        telegramBtn: 'Telegramda yozish',
      },
    },
  };

  const t = content[validLang];

  return (
    <main className="min-h-screen bg-slate-950">
      <Header lang={validLang} />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-amber-400 text-sm font-medium">{t.hero.badge}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {t.hero.title}
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                {t.hero.description}
              </p>

              {/* Benefits list */}
              <div className="flex flex-wrap gap-3">
                {t.hero.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="https://t.me/Ivan_Korotaev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
                >
                  {t.hero.cta}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Photo Gallery */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm lg:max-w-md justify-self-end">
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src="/Jana post.png" 
                  alt="Jana Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">Jana Post</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src="/yandex.png" 
                  alt="Яндекс Маркет" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium border border-yellow-500/30">Яндекс Маркет</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src="/озон.png" 
                  alt="Ozon" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">Ozon</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
                <img 
                  src="/Узум.png" 
                  alt="Usum" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium border border-purple-500/30">Usum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section with Brand Marquee */}
      <section className="relative pt-5 pb-10 sm:pt-7 sm:pb-14 overflow-hidden border-y border-white/5 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-4">
          <p className="text-lg sm:text-xl text-slate-300">
            {validLang === 'ru' ? (
              <>
                <span className="text-amber-400 font-semibold">Более 5 лет</span> на рынке — нам доверяют{' '}
                <span className="text-amber-400 font-semibold">50+ арендодателей</span> и{' '}
                <span className="text-amber-400 font-semibold">7 крупнейших брендов</span>
              </>
            ) : validLang === 'en' ? (
              <>
                <span className="text-amber-400 font-semibold">Over 5 years</span> on the market — trusted by{' '}
                <span className="text-amber-400 font-semibold">50+ landlords</span> and{' '}
                <span className="text-amber-400 font-semibold">7 major brands</span>
              </>
            ) : validLang === 'uz' ? (
              <>
                <span className="text-amber-400 font-semibold">5 yildan ortiq</span> bozorda — bizga{' '}
                <span className="text-amber-400 font-semibold">50+ ijaraga beruvchi</span> va{' '}
                <span className="text-amber-400 font-semibold">7 ta yirik brend</span> ishonadi
              </>
            ) : (
              <>
                <span className="text-amber-400 font-semibold">5年以上</span>市场经验 —{' '}
                <span className="text-amber-400 font-semibold">50+房东</span>和{' '}
                <span className="text-amber-400 font-semibold">7大品牌</span>信赖我们
              </>
            )}
          </p>
        </div>
        
        {/* Brand Marquee */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10" />
          
          {/* Scrolling container */}
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-8 px-6">
                {/* Яндекс Маркет */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/yandex logo.png" alt="Яндекс Маркет" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Яндекс Маркет</span>
                </div>
                
                {/* Ozon */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/ozon-logo.png" alt="Ozon" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Ozon</span>
                </div>
                
                {/* Usum */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/uzum logo.png" alt="Usum" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Usum</span>
                </div>
                
                {/* Jana Post */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/jana post logo.png" alt="Jana Post" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Jana Post</span>
                </div>
                
                {/* Wildberries */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/Wildberries - logo.png" alt="Wildberries" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Wildberries</span>
                </div>
                
                {/* Emu */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/EMU logo.png" alt="Emu" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">Emu</span>
                </div>
                
                {/* BTS */}
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 min-w-max">
                  <img src="/BTS logo.png" alt="BTS" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-white font-medium text-sm">BTS</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Section 2: 5 Steps */}
      <section className="relative py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{t.section2.title}</h2>
          
          <div className="space-y-6">
            {t.section2.steps.map((step, index) => (
              <div key={index} className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/10 p-6 sm:p-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-slate-950 font-bold text-lg sm:text-xl">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 mb-4">{step.description}</p>
                    
                    {step.details && (
                      <ul className="space-y-2 mb-4">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-slate-300 text-sm sm:text-base">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.checklist && (
                      <ul className="space-y-2 mb-4">
                        {step.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-slate-300 text-sm sm:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.conditions && (
                      <ul className="space-y-2 mb-4">
                        {step.conditions.map((condition, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-slate-300 text-sm sm:text-base">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.note && (
                      <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <p className="text-amber-200 text-sm sm:text-base">
                          <strong>Важно:</strong> {step.note}
                        </p>
                      </div>
                    )}
                    
                    {step.downloadLink && (
                      <a 
                        href={step.downloadLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-700/50 hover:border-amber-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                          <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-amber-400 font-medium group-hover:text-amber-300 transition-colors">{step.downloadLink.text}</span>
                        <svg className="w-4 h-4 text-slate-500 group-hover:text-amber-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Timeline - Gantt Chart */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t.section3.title}</h2>
          <p className="text-slate-400 text-center mb-8">{t.section3.subtitle}</p>
          
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/10 p-4 sm:p-6 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              {/* Header row with days */}
              <thead>
                <tr>
                  <th className="text-left pb-4 pr-4 w-52">
                    <span className="text-slate-400 text-sm font-medium">{validLang === 'ru' ? 'Этап' : validLang === 'en' ? 'Stage' : validLang === 'uz' ? 'Bosqich' : '阶段'}</span>
                  </th>
                  <th className="pb-4 text-right pr-2" colSpan={22}>
                    <span className="text-slate-400 text-sm font-medium">{validLang === 'ru' ? 'Дни' : validLang === 'en' ? 'Days' : validLang === 'uz' ? 'Kunlar' : '天数'}</span>
                  </th>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="pb-3"></th>
                  {[...Array(22)].map((_, i) => (
                    <th key={i} className="pb-3 px-0.5 w-6">
                      <span className="text-slate-500 text-xs font-medium">{i}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Deposit */}
                <tr className="border-b border-white/5">
                  <td className="py-4 pr-4">
                    <span className="text-slate-300 text-sm">{t.section3.timeline[0].text}</span>
                  </td>
                  {[...Array(22)].map((_, i) => (
                    <td key={i} className="py-4 px-0.5 text-center">
                      {i === 0 && <span className="inline-block w-5 h-5 rounded bg-amber-500 text-slate-950 text-xs font-bold leading-5">✓</span>}
                    </td>
                  ))}
                </tr>
                
                {/* Row 2: Measurements */}
                <tr className="border-b border-white/5">
                  <td className="py-4 pr-4">
                    <span className="text-slate-300 text-sm">{t.section3.timeline[1].text}</span>
                  </td>
                  {[...Array(22)].map((_, i) => (
                    <td key={i} className="py-4 px-0.5 text-center">
                      {i >= 1 && i <= 3 && <span className="inline-block w-5 h-5 rounded bg-orange-500 text-slate-950 text-xs font-bold leading-5">✓</span>}
                    </td>
                  ))}
                </tr>
                
                {/* Row 3: Contract */}
                <tr className="border-b border-white/5">
                  <td className="py-4 pr-4">
                    <span className="text-slate-300 text-sm">{t.section3.timeline[2].text}</span>
                  </td>
                  {[...Array(22)].map((_, i) => (
                    <td key={i} className="py-4 px-0.5 text-center">
                      {i >= 4 && i <= 7 && <span className="inline-block w-5 h-5 rounded bg-yellow-500 text-slate-950 text-xs font-bold leading-5">✓</span>}
                    </td>
                  ))}
                </tr>
                
                {/* Row 4: Renovation */}
                <tr className="border-b border-white/5">
                  <td className="py-4 pr-4">
                    <span className="text-slate-300 text-sm">{t.section3.timeline[3].text}</span>
                  </td>
                  {[...Array(22)].map((_, i) => (
                    <td key={i} className="py-4 px-0.5 text-center">
                      {i >= 8 && i <= 20 && <span className="inline-block w-5 h-5 rounded bg-emerald-500 text-slate-950 text-xs font-bold leading-5">✓</span>}
                    </td>
                  ))}
                </tr>
                
                {/* Row 5: Launch */}
                <tr>
                  <td className="py-4 pr-4">
                    <span className="text-slate-300 text-sm flex items-center gap-2">🚀 {t.section3.timeline[4].text}</span>
                  </td>
                  {[...Array(22)].map((_, i) => (
                    <td key={i} className="py-4 px-0.5 text-center">
                      {i === 21 && <span className="inline-block w-5 h-5 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold leading-5">✓</span>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            
            {/* Total time indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-amber-400 font-semibold">{validLang === 'ru' ? 'Итого: ~3 недели (21 день)' : validLang === 'en' ? 'Total: ~3 weeks (21 days)' : validLang === 'uz' ? 'Jami: ~3 hafta (21 kun)' : '总计：约3周（21天）'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Locations Map */}
      <section className="relative py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
            {validLang === 'ru' ? 'Наши локации' : validLang === 'en' ? 'Our Locations' : validLang === 'uz' ? 'Bizning joylashuvlarimiz' : '我们的位置'}
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            {validLang === 'ru' 
              ? 'Сеть Ustores — это уже более 30 локаций, и каждый месяц мы добавляем ещё 10 новых точек.' 
              : validLang === 'en' 
              ? 'Ustores network already has over 30 locations, and we add 10 more new points every month.'
              : validLang === 'uz'
              ? "Ustores tarmog'i — bu allaqachon 30 dan ortiq joylashuv, va har oy biz yana 10 ta yangi nuqta qo'shamiz."
              : 'Ustores网络已拥有30多个地点，每月我们还会增加10个新网点。'}
          </p>
          
          <div className="rounded-2xl overflow-hidden border border-white/10 relative">
            <iframe 
              src="https://yandex.com/map-widget/v1/?ll=69.266320%2C41.298951&mode=usermaps&source=constructorLink&um=constructor%3A7fa9f23f629ecba01049995161ff013c36ff705d79a13dc237ab8407ed000f69&z=11"
              width="100%" 
              height="450" 
              frameBorder="0"
              allowFullScreen
              className="w-full"
            />
          </div>
          
          {/* Manager Contacts - Right below the map */}
          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">{t.contacts.title}</h3>
            <p className="text-slate-400 text-center mb-8">{t.contacts.subtitle}</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {t.contacts.managers.map((manager, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={manager.photo} 
                      alt={manager.name}
                      className="w-32 h-32 rounded-full object-cover border-2 border-amber-500/30"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-lg">{manager.name}</h4>
                      <p className="text-amber-400 text-sm">{manager.telegram}</p>
                    </div>
                  </div>
                  <a
                    href={`https://t.me/${manager.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-semibold hover:shadow-xl hover:shadow-amber-500/25 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                    {t.contacts.telegramBtn}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 sm:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">{t.faq.title}</h2>
          
          <div className="space-y-4">
            {t.faq.items.map((item, index) => (
              <details key={index} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{item.q}</span>
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <p className="text-slate-400 text-sm sm:text-base">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={validLang} />
    </main>
  );
}
