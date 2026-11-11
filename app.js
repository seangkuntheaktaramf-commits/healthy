/**
 * ផ្ទះម៉ាក់រចនា (Pteah Mak Rachana) - Application Logic
 * E-Commerce Khmer Kitchen & Multi-Frame Web Portal
 * Features:
 * - Two-Frame Architecture (Frame 1 Sticky Header + Frame 2 Dynamic Page Switcher)
 * - Facebook-style Post Cards (Left: Like, Comment, Share | Right: Telegram & Messenger Order)
 * - Light / Dark Mode Toggle with persistence
 * - News Feed (RFI Khmer & Hot News)
 * - Complete Food Menu & Beauty Store
 * - Health Guidelines from Ministry of Health (MoH)
 * - Sports Routines for all ages
 * - Live Gold Rates & Real-time KHR/USD Converter
 * - Khmer numbers & 100% Chuon Nath Khmer orthography
 */

// 1. Storage Keys
const STORAGE_KEYS = {
  THEME: 'mak_rachana_theme',
  POSTS: 'mak_rachana_posts_v2',
  COMMENTS: 'mak_rachana_comments_v1',
};

// 2. Khmer Number Conversion
function toKhmerNumber(num) {
  if (num === null || num === undefined) return '';
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return String(num).replace(/\d/g, (d) => khmerDigits[parseInt(d, 10)]);
}

// 3. Pre-seeded Data (Dishes, Beauty, News, Health, Sports)
const INITIAL_POSTS = [
  {
    id: 'food_beef_sour_soup',
    type: 'food',
    title: 'ម្ជូរគ្រឿងសាច់ រសជាតិដើម',
    category: 'soup',
    categories: ['soup', 'healthy'],
    priceUsd: 5.50,
    priceKhr: 22440,
    calories: 310,
    desc: 'ម្ជូរគ្រឿងសាច់ រស់ជាតិដើម ឈ្ងុយឆ្ងាញ់ពិសេសប្រចាំ «ផ្ទះម៉ាក់រចនា» ចម្អិនតាមរូបមន្តខ្មែរបុរាណពិតៗ ជាមួយគ្រឿងផ្សំធម្មជាតិស្រស់ៗ និងអនាម័យខ្ពស់។',
    features: [
      'សាច់គោស្រស់គុណភាពខ្ពស់៖ ជ្រើសរើសសាច់គោជាប់ខ្លាញ់ផុយទន់ល្មម រម្ងាស់ចូលជាតិយ៉ាងល្អ គ្មានក្លិនឆ្អាប ផ្តល់ជាតិប្រូតេអ៊ីន និងថាមពលពេញលេញ។',
      'គ្រឿងបុកស្រស់ៗពីធម្មជាតិ៖ ផ្សំពីស្លឹកគ្រៃ រមៀត រំដេង ខ្ទឹមស និងស្លឹកក្រូចសើច ដែលសម្បូរដោយសារធាតុប្រឆាំងអុកស៊ីតកម្ម ជួយសម្រួលការរំលាយអាហារ និងបង្កើនប្រព័ន្ធការពាររាងកាយ។',
      'រសជាតិឆ្ងាញ់ អនាម័យខ្ពស់៖ ជូរអែមមុតស្រាលស្រទន់ ក្រអូបឈ្ងុយគ្រឿងបុកខ្មែរ ចម្អិនថ្មីៗក្តៅៗតាមស្តង់ដារអនាម័យត្រឹមត្រូវ គ្មានបារម្ភរឿងសុខភាព។'
    ],
    image: '1.jpg',
    likes: 388,
    isLiked: false,
    shares: 85,
    timeStr: 'ទើបតែបង្ហោះ (មុខម្ហូបពិសេសប្រចាំថ្ងៃ 🔥)',
    comments: [
      { author: 'ចិន្តា សុខ', text: 'ម្ជូរគ្រឿងសាច់គោនេះឆ្ងាញ់ខ្លាំងណាស់ សាច់ផុយទន់ចូលជាតិល្អ គ្រឿងបុកឈ្ងុយសាយភាយ!' },
      { author: 'វីរៈ បុត្រ', text: 'រសជាតិជូរអែមមុតស្រាលស្រទន់ អនាម័យខ្ពស់ ញ៉ាំជាមួយបាយក្តៅៗត្រូវគ្នាខ្លាំង!' }
    ]
  },
  {
    id: 'food_1',
    type: 'food',
    title: 'អាម៉ុកត្រីអន្លក់ខ្ចី (Fish Amok Khmer)',
    category: 'soup',
    priceUsd: 5.50,
    priceKhr: 22440,
    calories: 320,
    desc: 'អាម៉ុកត្រីប្រពៃណីខ្មែរ ចម្អិនពីត្រីផ្ទក់ស្រស់ៗ គ្រឿងបុកស្លឹកក្រូចសើច រមៀត ខ្ទិះដូងឈ្ងុយឆ្ងាញ់ និងស្លឹកញរខ្ចី។ ផ្តល់សារធាតុប្រូតេអ៊ីនខ្ពស់ និងល្អចំពោះសុខភាពបេះដូង។',
    image: 'food_amok.jpg',
    likes: 248,
    isLiked: false,
    shares: 42,
    timeStr: '១ ម៉ោងមុន',
    comments: [
      { author: 'ចិន្តា សុខ', text: 'អាម៉ុកផ្ទះម៉ាក់រចនាឈ្ងុយឆ្ងាញ់ណាស់ កុម្ម៉ង់ ២ ដងហើយ!' },
      { author: 'វីរៈ បុត្រ', text: 'រសជាតិដើមពិតៗ គ្រឿងផ្សំស្រស់ល្អណាស់បង។' }
    ]
  },
  {
    id: 'food_2',
    type: 'food',
    title: 'សម្លកកូរខ្មែររសជាតិដើម (Samlor Korko)',
    category: 'healthy',
    priceUsd: 4.50,
    priceKhr: 18360,
    calories: 260,
    desc: 'សម្លកកូរខ្មែរពោរពេញដោយបន្លែធម្មជាតិជាង ១០ មុខ រួមមានល្ហុង ចេកខ្ចី ស្លឹកបាស អង្គាដី និងសាច់ត្រីអាំង។ ជួយសម្រួលការរំលាយអាហារ និងសម្បូរជីវជាតិល្អសម្រាប់មនុស្សគ្រប់វ័យ។',
    image: 'food_korko.jpg',
    likes: 315,
    isLiked: false,
    shares: 68,
    timeStr: '២ ម៉ោងមុន',
    comments: [
      { author: 'ម៉ារី ណា', text: 'សម្លកកូរនេះល្អណាស់សម្រាប់អ្នកតមខ្លាញ់ និងមនុស្សចាស់!' }
    ]
  },
  {
    id: 'food_3',
    type: 'food',
    title: 'សម្លម្ជូរគ្រឿងសាច់គោត្រកួន (Sour Beef Soup)',
    category: 'soup',
    priceUsd: 5.00,
    priceKhr: 20400,
    calories: 290,
    desc: 'សម្លម្ជូរគ្រឿងសាច់គោផុយស្រួយ បង់ត្រកួនស្រស់ ម្ជូរសណ្តាន់ និងគ្រឿងបុកក្រអូបឈ្ងុយ។ ជួយឱ្យឃ្លានបាយ បង្កើនថាមពល និងផ្តល់ជាតិដែកខ្ពស់។',
    image: 'food_sour_soup.jpg',
    likes: 182,
    isLiked: false,
    shares: 25,
    timeStr: '៤ ម៉ោងមុន',
    comments: []
  },
  {
    id: 'food_4',
    type: 'food',
    title: 'ត្រីដំរីចៀនជូរអែម (Crispy Fried Fish Sweet & Sour)',
    category: 'fried',
    priceUsd: 6.00,
    priceKhr: 24480,
    calories: 380,
    desc: 'ត្រីចៀនស្រួយក្តៅៗ ស្រោចទឹកត្រីជូរអែមអំពិលទុំ បន្ថែមខ្ញីខ្ចី និងម្ទេសប្លោក។ រសជាតិប្លែកមាត់ គ្មានក្លិនឆ្អាប និងមានអនាម័យខ្ពស់។',
    image: 'food_fried_fish.jpg',
    likes: 195,
    isLiked: false,
    shares: 31,
    timeStr: '៥ ម៉ោងមុន',
    comments: []
  },
  {
    id: 'food_5',
    type: 'food',
    title: 'បាយឆាក្តាមគ្រឿងសមុទ្រ (Seafood Fried Rice)',
    category: 'stir',
    priceUsd: 4.00,
    priceKhr: 16320,
    calories: 450,
    desc: 'បាយឆាក្តាម និងមឹកស្រស់ ចម្អិនជាមួយម្រេចកំពតក្រអូប គ្រាប់បាយទន់មិនជ្រាយ ឆ្ងាញ់ជាប់ចិត្ត។',
    image: 'food_bai_chhar.jpg',
    likes: 140,
    isLiked: false,
    shares: 18,
    timeStr: '៦ ម៉ោងមុន',
    comments: []
  },
  {
    id: 'food_6',
    type: 'food',
    title: 'ប្រហុកខ្ទិះអន្លក់បន្លែស្រស់ (Prahok Ktiss Dip)',
    category: 'healthy',
    priceUsd: 4.50,
    priceKhr: 18360,
    calories: 310,
    desc: 'ប្រហុកខ្ទិះសាច់ជ្រូកចិញ្ច្រាំឈ្ងុយខ្ទិះដូង ញ៉ាំផ្ទាប់ជាមួយបន្លែស្រស់ៗដូចជាត្រសក់ ត្រប់ ពេជ្រ និងផ្កាស្នោ។ ម្ហូបប្រចាំគ្រួសារខ្មែរ!',
    image: 'food_prahok_ktis.jpg',
    likes: 275,
    isLiked: false,
    shares: 55,
    timeStr: '៧ ម៉ោងមុន',
    comments: []
  },
  {
    id: 'beauty_1',
    type: 'beauty',
    title: 'សាប៊ូធម្មជាតិប្រទាលកន្ទុយក្រពើ (Aloe Vera Natural Soap)',
    category: 'beauty',
    priceUsd: 3.50,
    priceKhr: 14280,
    calories: 0,
    desc: 'ផលិតផលសាប៊ូដុសខ្លួន និងមុខធម្មជាតិ ១០០% ចម្រាញ់ពីជែលប្រទាលកន្ទុយក្រពើស្រស់ ជួយផ្តល់សំណើម កាត់បន្ថយមុន និងធ្វើឱ្យស្បែកភ្លឺថ្លាម៉ដ្ឋរលោង។',
    image: 'beauty_natural_soap.jpg',
    likes: 165,
    isLiked: false,
    shares: 34,
    timeStr: '៣ ម៉ោងមុន',
    comments: [
      { author: 'សុភី', text: 'សាប៊ូនេះប្រើល្អណាស់ ស្បែកទន់មិនស្ងួតទេ!' }
    ]
  },
  {
    id: 'beauty_2',
    type: 'beauty',
    title: 'ក្រែមរមៀតទឹកឃ្មុំបំប៉នស្បែកមុខ (Turmeric Honey Facial Cream)',
    category: 'beauty',
    priceUsd: 8.00,
    priceKhr: 32640,
    calories: 0,
    desc: 'រូបមន្តបុរាណផ្សំពីមើមរមៀតខ្មែរ និងទឹកឃ្មុំព្រៃធម្មជាតិ ជួយបំបាត់ស្នាមជាំ ស្នាមអុចខ្មៅ និងការពារស្បែកពីកម្ដៅថ្ងៃ។ សុវត្ថិភាពខ្ពស់គ្មានជាតិបារត។',
    image: 'beauty_herbal_cream.jpg',
    likes: 210,
    isLiked: false,
    shares: 48,
    timeStr: '៥ ម៉ោងមុន',
    comments: []
  },
  {
    id: 'beauty_3',
    type: 'beauty',
    title: 'តែរុក្ខជាតិខូឡាជេនសម្រស់ (Herbal Collagen Tea)',
    category: 'beauty',
    priceUsd: 6.50,
    priceKhr: 26520,
    calories: 15,
    desc: 'តែផ្កាកុលាប យិនស៊ិន និងរុក្ខជាតិខូឡាជេនធម្មជាតិ ជួយបណ្តុះកោសិកាស្បែកក្មេងជាងវ័យ សម្រួលចរន្តឈាម និងជួយឱ្យគេងលក់ស្រួល។',
    image: 'beauty_collagen_tea.jpg',
    likes: 198,
    isLiked: false,
    shares: 39,
    timeStr: '៨ ម៉ោងមុន',
    comments: []
  }
];

// Pre-seeded News from RFI & Hot News
const NEWS_ARTICLES = [
  {
    source: 'RFI ខេមរភាសា',
    icon: '📻',
    title: 'ការលើកកម្ពស់សន្តិសុខស្បៀង និងការនាំចេញមុខម្ហូបប្រពៃណីខ្មែរទៅកាន់ទីផ្សារអន្តរជាតិ',
    summary: 'រាជរដ្ឋាភិបាលកម្ពុជា និងក្រសួងពាណិជ្ជកម្ម បានដាក់ចេញយុទ្ធសាស្ត្រថ្មី ដើម្បីជំរុញការចុះបញ្ជីម៉ាកសម្គាល់ភូមិសាស្ត្រទំនិញម្ហូបខ្មែរ និងគាំទ្រដល់អាជីវកម្មម្ហូបអាហារក្នុងស្រុក។',
    time: 'ថ្ងៃនេះ ម៉ោង ០៩:៣០ ព្រឹក',
    category: 'rfi'
  },
  {
    source: 'Hot News កម្ពុជា',
    icon: '🔥',
    title: 'ពិធីបុណ្យវប្បធម៌ម្ហូបអាហារខ្មែរប្រចាំឆ្នាំ ទាក់ទាញភ្ញៀវទេសចរជាតិ និងអន្តរជាតិរាប់ម៉ឺននាក់',
    summary: 'ការតាំងពិព័រណ៍ម្ហូបខ្មែររសជាតិដើមនៅរាជធានីភ្នំពេញ បានបង្ហាញពីភាពសម្បូរបែបនៃមុខម្ហូបខ្មែរ និងការច្នៃប្រឌិតម្ហូបសុខភាពដែលមិនប៉ះពាល់ដល់រាងកាយ។',
    time: 'ថ្ងៃនេះ ម៉ោង ០៨:១៥ ព្រឹក',
    category: 'hot'
  },
  {
    source: 'RFI ខេមរភាសា',
    icon: '📻',
    title: 'ទីផ្សារបន្លែ និងកសិផលសរីរាង្គកម្ពុជា មានកំណើនខ្ពស់ដោយសារប្រជាពលរដ្ឋយកចិត្តទុកដាក់លើសុខភាព',
    summary: 'ការសិក្សាបង្ហាញថា ពលរដ្ឋកម្ពុជាគ្រប់វ័យកាន់តែងាកមកបរិភោគបន្លែធម្មជាតិ និងកាត់បន្ថយសារធាតុគីមី ដើម្បីការពារជំងឺមិនឆ្លងដូចជាទឹកនោមផ្អែម និងលើសឈាម។',
    time: 'ម្សិលមិញ ម៉ោង ០៤:០០ រសៀល',
    category: 'rfi'
  },
  {
    source: 'Hot News សេដ្ឋកិច្ច',
    icon: '📈',
    title: 'ស្ថិរភាពអត្រាប្តូរប្រាក់រៀលខ្មែរ និងការកើនឡើងនៃតម្រូវការទិញមាសសម្រាប់សន្សំ',
    summary: 'ធនាគារជាតិនៃកម្ពុជារក្សាស្ថិរភាពអត្រាប្តូរប្រាក់រៀលបានយ៉ាងល្អ ខណៈដែលទីផ្សារមាសនៅតែជាជម្រើសដ៏ពេញនិយមសម្រាប់ប្រជាពលរដ្ឋក្នុងការរក្សាតម្លៃទ្រព្យសម្បត្តិ។',
    time: 'ម្សិលមិញ ម៉ោង ០២:៣០ រសៀល',
    category: 'economy'
  }
];

// Pre-seeded Health Guidelines (MoH Cambodia)
const HEALTH_ARTICLES = [
  {
    badge: 'ក្រសួងសុខាភិបាល (MoH)',
    title: 'វិធានការបង្ការជំងឺផ្លូវដង្ហើម និងជំងឺផ្តាសាយតាមរដូវកាល',
    desc: 'ក្រសួងសុខាភិបាលសូមណែនាំដល់សាធារណជនទាំងអស់ ឱ្យប្រកាន់ខ្ជាប់នូវអនាម័យ លាងសម្អាតដៃឱ្យបានញឹកញាប់ និងបរិភោគអាហារដែលចម្អិនឆ្អិនល្អ។',
    points: [
      'ពិសាទឹកក្តៅឧណ្ហៗ និងទឹកស្អាតយ៉ាងតិច ២ លីត្រក្នុងមួយថ្ងៃ',
      'បរិភោគអាហារមានជីវជាតិគ្រប់គ្រាន់ និងបន្លែផ្លែឈើសម្បូរវីតាមីន C',
      'ពាក់ម៉ាស់នៅទីប្រជុំជនបើមានអាការៈក្អក ឬផ្តាសាយ'
    ]
  },
  {
    badge: 'អាហារូបត្ថម្ភគ្រប់វ័យ',
    title: 'គន្លឹះកាត់បន្ថយជាតិប្រៃ (អំបិល) និងជាតិស្ករក្នុងរបបអាហារប្រចាំថ្ងៃ',
    desc: 'ការកាត់បន្ថយការញ៉ាំប្រៃ និងផ្អែម ជួយកាត់បន្ថយហានិភ័យនៃជំងឺលើសសម្ពាធឈាម ជំងឺបេះដូង និងជំងឺទឹកនោមផ្អែមរហូតដល់ទៅ ៥០%។',
    points: [
      'កាត់បន្ថយការប្រើប៊ីចេង និងទឹកត្រីលើសកម្រិត',
      'ជំនួសដោយគ្រឿងទេសធម្មជាតិខ្មែរដូចជា ស្លឹកក្រូច រមៀត ខ្ទឹម និងខ្ញី',
      'ជៀសវាងភេសជ្ជៈផ្អែម និងអាហារកែច្នៃដែលមានសារធាតុរក្សាទុក'
    ]
  },
  {
    badge: 'សុខភាពវ័យ ៤០+',
    title: 'ការថែទាំសុខភាពឆ្អឹង និងសន្លាក់សម្រាប់មនុស្សវ័យកណ្តាល និងមនុស្សចាស់',
    desc: 'នៅពេលឈានចូលវ័យ ៤០ ឆ្នាំឡើង រាងកាយត្រូវការជាតិកាល់ស្យូម និងប្រូតេអ៊ីនគ្រប់គ្រាន់ដើម្បីទប់ស្កាត់ការសឹករិចរិលនៃសន្លាក់ឆ្អឹង។',
    points: [
      'បរិភោគត្រីតូចៗ សម្លកកូរ និងបន្លែបៃតងចាស់សម្បូរកាល់ស្យូម',
      'ហាត់ប្រាណស្រាលៗដូចជាការដើរ យ៉ាងហោចណាស់ ៣០ នាទីជារៀងរាល់ថ្ងៃ',
      'ទទួលពន្លឺព្រះអាទិត្យពេលព្រឹកព្រលឹមដើម្បីស្រូបយកវីតាមីន D'
    ]
  }
];

// Pre-seeded Sports & Workout Tips
const SPORTS_CARDS = [
  {
    tag: 'កាយសម្បទាប្រចាំថ្ងៃ',
    title: 'លំហាត់ប្រាណកម្តៅសាច់ដុំតាមផ្ទះ ១៥ នាទីរាល់ព្រឹក',
    desc: 'លំហាត់ប្រាណសាមញ្ញៗដែលមិនត្រូវការឧបករណ៍ ជួយដាស់រាងកាយឱ្យស្វាហាប់ និងបង្កើនល្បឿននៃការដុតបំផ្លាញថាមពលកាឡូរី។',
    steps: '១. បង្វិលក និងស្មា ២ នាទី ➔ ២. ពត់ពែនចង្កេះ ៣ នាទី ➔ ៣. ឈានជើងចុះឡើង (Squats) ១៥ ដង ➔ ៤. ដកដង្ហើមវែងៗ ៣ នាទី'
  },
  {
    tag: 'សុខភាពបេះដូង (Cardio)',
    title: 'ក្បួនដើរលឿន ឬរត់ត្រឹកៗ ៣០ នាទីដើម្បីបេះដូងរឹងមាំ',
    desc: 'ការដើរលឿនជាវិធីដ៏ល្អបំផុតសម្រាប់មនុស្សគ្រប់វ័យ ជួយពង្រឹងសាច់ដុំបេះដូង បញ្ចុះកូឡេស្តេរ៉ុល និងជួយឱ្យអារម្មណ៍ស្រស់ថ្លា។',
    steps: 'ដើរកម្តៅសាច់ដុំ ៥ នាទី ➔ បង្កើនល្បឿនដើរលឿន ២០ នាទី ➔ ដើរបន្ថយល្បឿន ៥ នាទីមុននឹងសម្រាក។'
  },
  {
    tag: 'សម្រាលការឈឺចង្កេះ',
    title: 'ក្បួនពត់ខ្លួនយូហ្គា (Yoga) សម្រាប់អ្នកអង្គុយធ្វើការយូរ',
    desc: 'ជួយសម្រួលសរសៃពួរឆ្អឹងខ្នង បំបាត់ការតានតឹងសាច់ដុំកញ្ចឹងក និងកាត់បន្ថយការឈឺសន្លាក់ដៃជើងយ៉ាងមានប្រសិទ្ធភាព។',
    steps: "អនុវត្តក្បួន Cat-Cow Pose ៥ នាទី និង Child's Pose ៥ នាទី រៀងរាល់ល្ងាចមុនពេលចូលគេង។"
  }
];

// 4. App State
const AppState = {
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  currentPage: 'pageHome',
  posts: [],
  khrRate: 4080,
  activeCommentPostId: null,
};

// 5. Initialize Application
function initApp() {
  // Load Theme
  applyTheme(AppState.theme);

  // Load Posts from LocalStorage or seed
  const savedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (savedPosts) {
    try {
      AppState.posts = JSON.parse(savedPosts);
      // Ensure the newly requested dish 'food_beef_sour_soup' (1.jpg) is present at the beginning
      const beefDish = INITIAL_POSTS.find(p => p.id === 'food_beef_sour_soup');
      const existingIdx = AppState.posts.findIndex(p => p.id === 'food_beef_sour_soup' || p.image === '1.jpg');
      if (existingIdx === -1 && beefDish) {
        AppState.posts.unshift(beefDish);
        savePosts();
      } else if (existingIdx !== -1 && beefDish) {
        AppState.posts[existingIdx] = { ...AppState.posts[existingIdx], ...beefDish };
        savePosts();
      }
    } catch (e) {
      AppState.posts = INITIAL_POSTS;
      savePosts();
    }
  } else {
    AppState.posts = INITIAL_POSTS;
    savePosts();
  }

  // Setup Event Listeners
  setupNavigation();
  setupThemeToggle();
  setupCurrencyConverter();
  setupPostInteractions();
  setupAdminPostFlow();

  // Initial Renderings
  renderHomeFeed();
  renderFoodGrid();
  renderBeautyGrid();
  renderNewsGrid();
  renderHealthGrid();
  renderSportsGrid();
}

// 6. Theme Switching (Light / Dark Mode)
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  AppState.theme = theme;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);

  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  if (theme === 'dark') {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = 'បិទពន្លឺ';
  } else {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = 'បើកពន្លឺ';
  }
}

function setupThemeToggle() {
  const btn = document.getElementById('btnThemeToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const nextTheme = AppState.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      showToast(`បានប្តូរទៅកាន់៖ ទម្រង់${nextTheme === 'dark' ? 'បិទពន្លឺ (Dark Mode)' : 'បើកពន្លឺ (Light Mode)'}`, 'info');
    });
  }
}

// 7. Two-Frame Navigation Engine
function switchPage(pageId) {
  // Update Buttons in Frame 1
  document.querySelectorAll('.nav-menu-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
  });

  // Switch View in Frame 2
  document.querySelectorAll('.page-view').forEach((page) => {
    page.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    AppState.currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setupNavigation() {
  // Menu Buttons in Frame 1
  document.querySelectorAll('.nav-menu-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-page');
      switchPage(target);
    });
  });

  // Home Brand click
  const btnBrand = document.getElementById('btnGoHomeBrand');
  if (btnBrand) {
    btnBrand.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage('pageHome');
    });
  }

  // Menu Rates Ticker Box click -> switch to detailed rates page
  const menuRatesTickerBox = document.getElementById('menuRatesTickerBox');
  if (menuRatesTickerBox) {
    menuRatesTickerBox.addEventListener('click', () => {
      switchPage('pageRates');
    });
  }

  // Quick Ticker Shortcut click (backward compatibility)
  const tickerShortcut = document.getElementById('btnQuickRatesShortcut');
  if (tickerShortcut) {
    tickerShortcut.addEventListener('click', () => {
      switchPage('pageRates');
    });
  }

  // Hero Jump Buttons
  document.querySelectorAll('[data-page-jump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const page = btn.getAttribute('data-page-jump');
      switchPage(page);
    });
  });

  // Feed Filter Tags
  document.querySelectorAll('[data-feed-filter]').forEach((tag) => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('[data-feed-filter]').forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');
      const filter = tag.getAttribute('data-feed-filter');
      renderHomeFeed(filter);
    });
  });

  // Food Category Pills
  document.querySelectorAll('[data-food-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-food-cat]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-food-cat');
      renderFoodGrid(cat);
    });
  });

  // News Category Pills
  document.querySelectorAll('[data-news-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-news-cat]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-news-cat');
      renderNewsGrid(cat);
    });
  });

  // News Refresh Button
  const btnRefreshNews = document.getElementById('btnRefreshNews');
  if (btnRefreshNews) {
    btnRefreshNews.addEventListener('click', () => {
      showToast('🔄 បានធ្វើបច្ចុប្បន្នភាពព័ត៌មានថ្មីៗចុងក្រោយបង្អស់!', 'success');
      renderNewsGrid();
    });
  }
}

// 8. Render Post Card Template (ដូច Facebook: ឆ្វេង ចូលចិត្ត/មតិ/ចែករំលែក | ស្តាំ Telegram & Messenger)
function buildPostCardHtml(post) {
  const isFood = post.type === 'food';
  const priceDisplay = `$${post.priceUsd.toFixed(2)} (${toKhmerNumber(post.priceKhr.toLocaleString())} ៛)`;
  const calorieBadge = post.calories > 0
    ? `<span class="post-calorie-badge">🔥 ${toKhmerNumber(post.calories)} kcal</span>`
    : '';

  // Pre-fill Telegram and Messenger order links
  const orderMsg = encodeURIComponent(
    `សួស្តី «ផ្ទះម៉ាក់រចនា»! ខ្ញុំចង់កុម្ម៉ង់៖
- មុខទំនិញ៖ ${post.title}
- តម្លៃ៖ $${post.priceUsd.toFixed(2)} (${post.priceKhr.toLocaleString()} ៛)
សូមជួយទាក់ទងមកខ្ញុំបាទ/នាងខ្ញុំផង។ អរគុណ!`
  );
  const telegramUrl = `https://t.me/MakRachanaKitchen?text=${orderMsg}`;
  const messengerUrl = `https://m.me/MakRachanaKitchen?text=${orderMsg}`;

  // Bullet points / Features Highlights
  let featuresHtml = '';
  if (Array.isArray(post.features) && post.features.length > 0) {
    const featureItems = post.features.map((item) => {
      let content = item.replace(/^\s*\*\s*/, '');
      if (content.includes('៖')) {
        const idxColon = content.indexOf('៖');
        const header = content.substring(0, idxColon).trim();
        const body = content.substring(idxColon + 1).trim();
        content = `<strong class="feature-lead-text">${header}៖</strong> ${body}`;
      }
      return `
        <li class="post-feature-bullet-item">
          <span class="feature-star-icon">⭐</span>
          <div class="feature-content-text">${content}</div>
        </li>
      `;
    }).join('');

    featuresHtml = `
      <div class="post-features-box">
        <div class="post-features-title">✨ លក្ខណៈពិសេស និងគុណសម្បត្តិ៖</div>
        <ul class="post-features-bullets-list">
          ${featureItems}
        </ul>
      </div>
    `;
  }

  return `
    <article class="post-card" id="post-${post.id}">
      
      <!-- Top-Left: Avatar, Page Name, Meta -->
      <div class="post-header-row">
        <div class="post-author-group">
          <div class="post-author-avatar-img">
            <img src="mak_rachana_logo.jpg" alt="ផ្ទះម៉ាក់រចនា">
          </div>
          <div class="post-author-meta">
            <div class="post-author-name-row">
              <span class="post-author-name">ផ្ទះម៉ាក់រចនា</span>
              <span class="post-verified-badge" title="គណនីផ្លូវការ">✓</span>
            </div>
            <span class="post-time-meta">⏱️ ${post.timeStr || 'ថ្មីៗ'} • 🌐 សាធារណៈ</span>
          </div>
        </div>

        <div class="post-header-right">
          <span class="post-category-pill ${isFood ? 'food' : 'beauty'}">
            ${isFood ? '🍲 មុខម្ហូបខ្មែរ' : '✨ ផលិតផលសម្រស់'}
          </span>
          <button type="button" class="btn-post-more" data-post-more="${post.id}" title="ជម្រើសបន្ថែម">
            <span>•••</span>
          </button>
        </div>
      </div>

      <!-- Post Body -->
      <h3 class="post-title-text">${post.title}</h3>
      <p class="post-desc-text">${post.desc}</p>
      ${featuresHtml}

      <div class="post-badges-row">
        <span class="post-price-badge">💵 ${priceDisplay}</span>
        ${calorieBadge}
      </div>

      <!-- Post Image (ស៊ុម មានគែម ព័ទ្ធជុំវិញ ស្អាតបាត) -->
      <div class="post-photo-wrap">
        <img src="${post.image}" alt="${post.title}" class="post-photo-img" loading="lazy">
      </div>

      <!-- Reaction Stats -->
      <div class="post-reactions-row">
        <span>👍 <strong id="likeCount-${post.id}">${toKhmerNumber(post.likes)}</strong> នាក់បានចូលចិត្ត</span>
        <span>${toKhmerNumber(post.comments.length)} មតិ • ${toKhmerNumber(post.shares)} ចែករំលែក</span>
      </div>

      <!-- Action Bar Split (Left: 3 Action Buttons គ្មានអក្សរ | Right: Direct Order) -->
      <div class="post-action-bar-split">
        
        <!-- Left: Like, Comment, Share (គ្មានអក្សរបញ្ជាក់ Button ទាំង៣ទេ តាមសំណើ) -->
        <div class="post-left-actions-group">
          <button type="button" class="btn-post-action ${post.isLiked ? 'liked' : ''}" data-act-like="${post.id}" title="ចូលចិត្ត (Like)">
            <span class="btn-action-icon">${post.isLiked ? '❤️' : '👍'}</span>
          </button>
          <button type="button" class="btn-post-action" data-act-comment="${post.id}" title="បញ្ចេញមតិ (Comment)">
            <span class="btn-action-icon">💬</span>
          </button>
          <button type="button" class="btn-post-action" data-act-share="${post.id}" title="ចែករំលែក (Share)">
            <span class="btn-action-icon">↗️</span>
          </button>
        </div>

        <!-- Right: Direct Order via Telegram & Messenger -->
        <div class="post-right-order-group">
          <a href="${telegramUrl}" target="_blank" rel="noopener" class="btn-order-direct telegram" title="Order ផ្ទាល់តាម Telegram">
            <span>✈️</span> Telegram
          </a>
          <a href="${messengerUrl}" target="_blank" rel="noopener" class="btn-order-direct messenger" title="Order ផ្ទាល់តាម Messenger">
            <span>💬</span> Messenger
          </a>
        </div>

      </div>

    </article>
  `;
}

        <!-- Right: Direct Order via Telegram & Messenger -->
        <div class="post-right-order-group">
          <a href="${telegramUrl}" target="_blank" rel="noopener" class="btn-order-direct telegram" title="Order ផ្ទាល់តាម Telegram">
            <span>✈️</span> Telegram
          </a>
          <a href="${messengerUrl}" target="_blank" rel="noopener" class="btn-order-direct messenger" title="Order ផ្ទាល់តាម Messenger">
            <span>💬</span> Messenger
          </a>
        </div>

      </div>

    </article>
  `;
}

// 9. Render Posts across Sections
function renderHomeFeed(filter = 'all') {
  const container = document.getElementById('homeFeedPostsList');
  if (!container) return;

  const filtered = AppState.posts.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;">មិនទាន់មានការបង្ហោះនៅឡើយទេ</div>';
    return;
  }

  container.innerHTML = filtered.map(buildPostCardHtml).join('');
}

function renderFoodGrid(catFilter = 'all') {
  const container = document.getElementById('foodPostsContainer');
  if (!container) return;

  const foodPosts = AppState.posts.filter((p) => {
    if (p.type !== 'food') return false;
    if (catFilter === 'all') return true;
    if (p.category === catFilter) return true;
    if (Array.isArray(p.categories) && p.categories.includes(catFilter)) return true;
    return false;
  });

  container.innerHTML = foodPosts.map(buildPostCardHtml).join('');
}

function renderBeautyGrid() {
  const container = document.getElementById('beautyPostsContainer');
  if (!container) return;

  const beautyPosts = AppState.posts.filter((p) => p.type === 'beauty');
  container.innerHTML = beautyPosts.map(buildPostCardHtml).join('');
}

function renderNewsGrid(cat = 'all') {
  const container = document.getElementById('newsArticlesContainer');
  if (!container) return;

  const articles = NEWS_ARTICLES.filter((a) => {
    if (cat === 'all') return true;
    return a.category === cat;
  });

  container.innerHTML = articles.map((art) => `
    <div class="news-article-card">
      <div class="news-source-tag">
        <span>${art.icon}</span> ${art.source}
      </div>
      <h3 class="news-title">${art.title}</h3>
      <p class="news-summary">${art.summary}</p>
      <div class="news-footer-row">
        <span>⏱️ ${art.time}</span>
        <span style="color:var(--primary);font-weight:700;">អានបន្ត ➔</span>
      </div>
    </div>
  `).join('');
}

function renderHealthGrid() {
  const container = document.getElementById('healthArticlesContainer');
  if (!container) return;

  container.innerHTML = HEALTH_ARTICLES.map((item) => `
    <div class="health-card">
      <span class="health-badge-moh">${item.badge}</span>
      <h3 class="health-card-title">${item.title}</h3>
      <p class="health-card-desc">${item.desc}</p>
      <ul class="health-key-points">
        ${item.points.map((pt) => `<li>${pt}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderSportsGrid() {
  const container = document.getElementById('sportsCardsContainer');
  if (!container) return;

  container.innerHTML = SPORTS_CARDS.map((item) => `
    <div class="sports-card">
      <span class="sports-tag">${item.tag}</span>
      <h3 class="sports-title">${item.title}</h3>
      <p class="sports-desc">${item.desc}</p>
      <div class="sports-steps-box">
        <strong>លំដាប់លំហាត់ប្រាណ៖</strong><br>
        ${item.steps}
      </div>
    </div>
  `).join('');
}

// 10. Post Interactions (Like, Comment, Share)
function setupPostInteractions() {
  // Delegate click for dynamically rendered post actions
  document.addEventListener('click', (e) => {
    // 1. Like Button
    const likeBtn = e.target.closest('[data-act-like]');
    if (likeBtn) {
      const postId = likeBtn.getAttribute('data-act-like');
      const post = AppState.posts.find((p) => p.id === postId);
      if (post) {
        if (post.isLiked) {
          post.likes = Math.max(0, post.likes - 1);
          post.isLiked = false;
        } else {
          post.likes += 1;
          post.isLiked = true;
          showToast('បានចូលចិត្តមុខម្ហូបនេះ! ❤️', 'info');
        }
        savePosts();
        updatePostDomLikes(post);
      }
      return;
    }

    // 2. Comment Button
    const commentBtn = e.target.closest('[data-act-comment]');
    if (commentBtn) {
      const postId = commentBtn.getAttribute('data-act-comment');
      openCommentsDrawer(postId);
      return;
    }

    // 3. Share Button
    const shareBtn = e.target.closest('[data-act-share]');
    if (shareBtn) {
      const postId = shareBtn.getAttribute('data-act-share');
      const post = AppState.posts.find((p) => p.id === postId);
      if (post) {
        post.shares += 1;
        savePosts();

        if (navigator.share) {
          navigator.share({
            title: `«ផ្ទះម៉ាក់រចនា» - ${post.title}`,
            text: `${post.desc} - តម្លៃ $${post.priceUsd.toFixed(2)} (${post.priceKhr.toLocaleString()} ៛)`,
            url: window.location.href,
          }).catch(() => {});
        } else {
          navigator.clipboard.writeText(window.location.href);
          showToast('📋 បានចម្លងតំណភ្ជាប់ (Link) ដើម្បីចែករំលែករួចរាល់!', 'success');
        }
      }
      return;
    }
  });

  // Comments Drawer Close Buttons
  const drawer = document.getElementById('modalCommentsDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseCommentsDrawer');
  if (btnCloseDrawer && drawer) {
    btnCloseDrawer.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.remove('active');
    });
  }

  // Form Add Comment
  const formComment = document.getElementById('formAddCommentModal');
  const inputComment = document.getElementById('inputCommentText');
  if (formComment) {
    formComment.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputComment ? inputComment.value.trim() : '';
      if (!text || !AppState.activeCommentPostId) return;

      const post = AppState.posts.find((p) => p.id === AppState.activeCommentPostId);
      if (post) {
        post.comments.push({
          author: 'អតិថិជន (Customer)',
          text: text,
        });
        savePosts();
        if (inputComment) inputComment.value = '';
        renderCommentsDrawerList(post);
        showToast('🎉 បានបញ្ចេញមតិយោបល់ដោយជោគជ័យ!', 'success');
      }
    });
  }
}

function updatePostDomLikes(post) {
  document.querySelectorAll(`[data-act-like="${post.id}"]`).forEach((btn) => {
    btn.classList.toggle('liked', post.isLiked);
    const iconSpan = btn.querySelector('.btn-action-icon') || btn.querySelector('span');
    if (iconSpan) iconSpan.textContent = post.isLiked ? '❤️' : '👍';
  });

  const countEl = document.getElementById(`likeCount-${post.id}`);
  if (countEl) countEl.textContent = toKhmerNumber(post.likes);
}

function openCommentsDrawer(postId) {
  const post = AppState.posts.find((p) => p.id === postId);
  if (!post) return;

  AppState.activeCommentPostId = postId;
  const drawer = document.getElementById('modalCommentsDrawer');
  const title = document.getElementById('commentsModalTitle');
  if (title) title.textContent = `មតិយោបល់៖ ${post.title}`;

  renderCommentsDrawerList(post);
  if (drawer) drawer.classList.add('active');
}

function renderCommentsDrawerList(post) {
  const list = document.getElementById('commentsStreamList');
  if (!list) return;

  if (post.comments.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);">មិនទាន់មានមតិយោបល់នៅឡើយទេ។ សូមក្លាយជាអ្នកបញ្ចេញមតិដំបូងគេ!</div>';
    return;
  }

  list.innerHTML = post.comments.map((c) => `
    <div class="comment-bubble-item">
      <span class="comment-author-title">👤 ${c.author}</span>
      <span class="comment-body-text">${c.text}</span>
    </div>
  `).join('');
}

// 11. Admin Post Flow (Page Owner Only)
function setupAdminPostFlow() {
  const modal = document.getElementById('modalAdminPost');
  const btnOpen = document.getElementById('btnOpenAdminPostModal');
  const btnClose = document.getElementById('btnCloseAdminPostModal');
  const btnCancel = document.getElementById('btnCancelAdminPost');
  const form = document.getElementById('formAdminPost');
  const inputFile = document.getElementById('adminPostImageFile');
  const previewWrap = document.getElementById('adminPreviewWrap');
  const previewImg = document.getElementById('adminPostPreviewImg');

  let currentImageBase64 = null;

  if (btnOpen && modal) {
    btnOpen.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  const closeModal = () => {
    if (modal) modal.classList.remove('active');
    if (form) form.reset();
    currentImageBase64 = null;
    if (previewWrap) previewWrap.style.display = 'none';
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (inputFile) {
    inputFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        currentImageBase64 = event.target.result;
        if (previewImg) previewImg.src = currentImageBase64;
        if (previewWrap) previewWrap.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('adminPostType')?.value || 'food';
      const title = document.getElementById('adminPostTitle')?.value.trim() || '';
      const priceUsd = parseFloat(document.getElementById('adminPostPriceUsd')?.value) || 0;
      const calories = parseInt(document.getElementById('adminPostCalorie')?.value, 10) || 0;
      const desc = document.getElementById('adminPostDesc')?.value.trim() || '';

      if (!title || priceUsd <= 0) {
        showToast('សូមបញ្ចូលឈ្មោះមុខម្ហូប និងតម្លៃឱ្យបានត្រឹមត្រូវ', 'warn');
        return;
      }

      const newPost = {
        id: 'post_admin_' + Date.now(),
        type: type,
        title: title,
        category: 'soup',
        priceUsd: priceUsd,
        priceKhr: Math.round(priceUsd * AppState.khrRate),
        calories: calories,
        desc: desc,
        image: currentImageBase64 || (type === 'food' ? 'food_amok.jpg' : 'beauty_natural_soap.jpg'),
        likes: 1,
        isLiked: false,
        shares: 0,
        timeStr: 'ទើបតែបង្ហោះ',
        comments: [],
      };

      AppState.posts.unshift(newPost);
      savePosts();
      closeModal();

      renderHomeFeed();
      renderFoodGrid();
      renderBeautyGrid();
      showToast('🎉 បានបង្ហោះលក់មុខទំនិញថ្មីដោយជោគជ័យ!', 'success');
    });
  }
}

// 12. Currency Converter (KHR to USD Real-time)
function setupCurrencyConverter() {
  const inputKhr = document.getElementById('inputKhrAmount');
  const inputUsd = document.getElementById('inputUsdAmount');
  const resultBox = document.getElementById('converterResultBox');

  const updateFromKhr = () => {
    const khrVal = parseFloat(inputKhr.value) || 0;
    const usdVal = khrVal / AppState.khrRate;
    if (inputUsd) inputUsd.value = usdVal.toFixed(2);
    if (resultBox) {
      resultBox.innerHTML = `<span>${toKhmerNumber(khrVal.toLocaleString())} រៀល = <strong>$${toKhmerNumber(usdVal.toFixed(2))} ដុល្លារ</strong></span>`;
    }
  };

  const updateFromUsd = () => {
    const usdVal = parseFloat(inputUsd.value) || 0;
    const khrVal = Math.round(usdVal * AppState.khrRate);
    if (inputKhr) inputKhr.value = khrVal;
    if (resultBox) {
      resultBox.innerHTML = `<span>$${toKhmerNumber(usdVal.toFixed(2))} ដុល្លារ = <strong>${toKhmerNumber(khrVal.toLocaleString())} រៀល</strong></span>`;
    }
  };

  if (inputKhr) inputKhr.addEventListener('input', updateFromKhr);
  if (inputUsd) inputUsd.addEventListener('input', updateFromUsd);
}

// 13. Toast Notification Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 14. Save Posts to LocalStorage
function savePosts() {
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(AppState.posts));
}

// 15. DOM Ready Bootstrap
document.addEventListener('DOMContentLoaded', initApp);
