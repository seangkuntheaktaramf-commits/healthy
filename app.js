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
  POSTS: 'mak_rachana_posts_v7',
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
    title: 'ម្ជូរគ្រឿងសាច់គោពិសេស រស់ជាតិដើម',
    category: 'soup',
    categories: ['soup', 'healthy'],
    priceUsd: 1.50,
    priceKhr: 6000,
    calories: 310,
    desc: 'ម្ជូរគ្រឿងសាច់គោពិសេស រស់ជាតិដើម ឈ្ងុយឆ្ងាញ់ពិសេសប្រចាំ «ផ្ទះម៉ាក់រចនា» ចម្អិនតាមរូបមន្តខ្មែរបុរាណពិតៗ ជាមួយគ្រឿងផ្សំធម្មជាតិស្រស់ៗ និងអនាម័យខ្ពស់។',
    features: [
      '*សាច់គោស្រស់គុណភាពខ្ពស់៖ ជ្រើសរើសសាច់គោជាប់ខ្លាញ់ផុយទន់ល្មម រម្ងាស់ចូលជាតិយ៉ាងល្អ គ្មានក្លិនឆ្អាប ផ្តល់ជាតិប្រូតេអ៊ីន និងថាមពលពេញលេញ។',
      '*គ្រឿងបុកស្រស់ៗពីធម្មជាតិ៖ ផ្សំពីស្លឹកគ្រៃ រមៀត រំដេង ខ្ទឹមស និងស្លឹកក្រូចសើច ដែលសម្បូរដោយសារធាតុប្រឆាំងអុកស៊ីតកម្ម ជួយសម្រួលការរំលាយអាហារ និងបង្កើនប្រព័ន្ធការពាររាងកាយ។',
      '*រសជាតិឆ្ងាញ់ អនាម័យខ្ពស់៖ ជូរអែមមុតស្រាលស្រទន់ ក្រអូបឈ្ងុយគ្រឿងបុកខ្មែរ ចម្អិនថ្មីៗក្តៅៗតាមស្តង់ដារអនាម័យត្រឹមត្រូវ គ្មានបារម្ភរឿងសុខភាព។'
    ],
    image: '1.jpg',
    likes: 388,
    isLiked: false,
    shares: 85,
    timeStr: 'ទើបតែបង្ហោះ (ម្ហូបពិសេសប្រចាំថ្ងៃ 🔥)',
    comments: [
      { author: 'ចិន្តា សុខ', text: 'ម្ជូរគ្រឿងសាច់គោនេះឆ្ងាញ់ខ្លាំងណាស់ សាច់ផុយទន់ចូលជាតិល្អ គ្រឿងបុកឈ្ងុយសាយភាយ!' },
      { author: 'វីរៈ បុត្រ', text: 'រសជាតិជូរអែមមុតស្រាលស្រទន់ អនាម័យខ្ពស់ ញ៉ាំជាមួយបាយក្តៅៗត្រូវគ្នាខ្លាំង!' }
    ]
  },
  {
    id: 'food_ginger_chicken',
    type: 'food',
    title: 'ឆាខ្ញីសាច់មាន់ពិសេស — រសជាតិដើមដ៏ឈ្ងុយឆ្ងាញ់ ចម្អិនថ្មីៗក្តៅៗផ្ដល់ទាំងផាសុខភាព និងទំនុកចិត្តខ្ពស់',
    category: 'fried',
    categories: ['fried', 'healthy'],
    priceUsd: 1.50,
    priceKhr: 6000,
    calories: 295,
    desc: 'ឆាខ្ញីសាច់មាន់ពិសេស រសជាតិដើមដ៏ឈ្ងុយឆ្ងាញ់ ចម្អិនថ្មីៗក្តៅៗផ្ដល់ទាំងផាសុខភាព និងទំនុកចិត្តខ្ពស់ប្រចាំ «ផ្ទះម៉ាក់រចនា»។',
    features: [
      '*សាច់មាន់ស្រស់គ្មានក្លិនឆ្អាប៖ ជ្រើសរើសសាច់មាន់ស្រស់ស្អាត គ្មានជាតិខ្លាញ់កក ផ្ដល់ប្រូតេអ៊ីនខ្ពស់ និងថាមពលល្អដល់រាងកាយ។',
      '*ខ្ញីស្រស់ជំនួយសុខភាព៖ ខ្ញីខ្ចីហាន់ជាសរសៃស្រស់ៗ មានគុណប្រយោជន៍ជួយកម្តៅរាងកាយ សម្រួលការរំលាយអាហារ បញ្ចុះជាតិហ្គាស និងជំរុញចរន្តឈាមរត់បានល្អ។',
      '*ចម្អិនអនាម័យ រសជាតិមុតល្មម៖ ឆាក្តៅៗជាមួយនិងគ្រឿងផ្សំធម្មជាតិ កាត់បន្ថយជាតិខ្លាញ់ រសជាតិផ្អែមប្រៃល្មម ញ៉ាំហើយស្រួលខ្លួន គ្មានការព្រួយបារម្ភ។'
    ],
    image: '2.jpg',
    likes: 412,
    isLiked: false,
    shares: 92,
    timeStr: 'ទើបតែបង្ហោះ (ម្ហូបពិសេសប្រចាំថ្ងៃ 🔥)',
    comments: [
      { author: 'សុជាតា រ័ត្ន', text: 'ឆាខ្ញីសាច់មាន់ឈ្ងុយខ្ញីខ្ចីខ្លាំងណាស់ ញ៉ាំហើយស្រួលខ្លួន គ្មានខ្លាញ់កកទេ!' },
      { author: 'ម៉ៅ វុទ្ធី', text: 'សាច់មាន់ស្រស់ទន់ល្អ រសជាតិល្មមឆ្ងាញ់ពិតៗ!' }
    ]
  },
  {
    id: 'food_pork_egg_stew',
    type: 'food',
    title: 'ខសាច់ជ្រូកពងទាពិសេស — រសជាតិដើមឈ្ងុយឆ្ងាញ ចម្អិនរម្ងាស់យ៉ាងយកចិត្តទុកដាក់ ផ្តល់ទាំងឱជារស និងទំនុកចិត្តខ្ពស់',
    category: 'soup',
    categories: ['soup', 'healthy'],
    priceUsd: 1.50,
    priceKhr: 6000,
    calories: 340,
    desc: 'ខសាច់ជ្រូកពងទាពិសេស រសជាតិដើមឈ្ងុយឆ្ងាញ ចម្អិនរម្ងាស់យ៉ាងយកចិត្តទុកដាក់ ផ្តល់ទាំងឱជារស និងទំនុកចិត្តខ្ពស់ប្រចាំ «ផ្ទះម៉ាក់រចនា»។',
    features: [
      '*សាច់ជ្រូកស្រស់គុណភាពល្អ៖ ជ្រើសរើសសាច់ជ្រូកស្រស់ៗ សម្អាតយ៉ាងផ្ចិតផ្ចង់ រម្ងាស់រហូតផុយទន់ល្មម ចូលជាតិសព្វសាច់ គ្មានក្លិនឆ្អាប។',
      '*ពងទាពោរពេញដោយជីវជាតិ៖ ពងទាស្ងោរ ដាក់ក្នុងទឹកខប្រែផ្អែមពណ៌ត្នោតក្រមៅធម្មជាតិ ផ្តល់ប្រូតេអ៊ីនពេញលេញ និងជួយទ្រទ្រង់កម្លាំងបានយ៉ាងល្អ។',
      '*រសជាតិដិតដល់ អនាម័យខ្ពស់៖ ទឹកខមានរសជាតិប្រៃផ្អែមស្រទន់ ក្រអូបឈ្ងុយស្ករត្នោត និងគ្រឿងទេសធម្មជាតិ ចម្អិនថ្មីៗក្តៅៗតាមស្តង់ដារអនាម័យ ញ៉ាំដោយក្តីកក់ក្តៅ និងមានសុវត្ថិភាព។'
    ],
    image: '3.jpg',
    likes: 365,
    isLiked: false,
    shares: 74,
    timeStr: 'ទើបតែបង្ហោះ (ម្ហូបពិសេសប្រចាំថ្ងៃ 🔥)',
    comments: [
      { author: 'លីលី ហេង', text: 'ខសាច់ជ្រូកពងទាចូលជាតិល្អខ្លាំងណាស់ ទឹកខផ្អែមប្រៃស្រទន់ស្ករត្នោតឆ្ងាញ់ដូចស្នាដៃម៉ាក់ធ្វើ!' },
      { author: 'គឹម សាន', text: 'ពងទាជ្រាបចូលជាតិសព្វ សាច់ជ្រូកផុយទន់ឆ្ងាញ់ណាស់!' }
    ]
  },
  {
    id: 'food_korko_special',
    type: 'food',
    title: 'សម្លកកូរខ្មែរពិសេស — កំពូលសម្លបុរាណប្រចាំជាតិ ប្រមូលផ្តុំដោយបន្លែធម្មជាតិ និងជីវជាតិយ៉ាងបរិបូរណ៍',
    category: 'healthy',
    categories: ['healthy', 'soup'],
    priceUsd: 1.50,
    priceKhr: 6000,
    calories: 280,
    desc: 'សម្លកកូរខ្មែរពិសេស កំពូលសម្លបុរាណប្រចាំជាតិ ប្រមូលផ្តុំដោយបន្លែធម្មជាតិ និងជីវជាតិយ៉ាងបរិបូរណ៍ប្រចាំ «ផ្ទះម៉ាក់រចនា»។',
    features: [
      '*បន្លែចម្រុះស្រស់ៗពីធម្មជាតិ៖ ផ្សំពីបន្លែធម្មជាតិសម្បូរបែប ផ្តល់ជាតិសរសៃខ្ពស់ ជួយសម្រួលការបន្ទោរបង់ និងលាងសម្អាតជាតិពុលក្នុងពោះវៀន។',
      '*គ្រឿងបុក និងអង្ករលីងឈ្ងុយពិសេស៖ ឈ្ងុយឈ្ងប់ដោយសារធាតុគ្រឿងបុកខ្មែរ រួមជាមួយអង្ករលីងក្រអូប និងប្រហុកសាច់យ៉ាងស្អាត គ្មានក្លិនឆ្អាប ជួយជំរុញចំណង់អាហារ និងកម្តៅសរីរាង្គ។',
      '*សាច់ស្រស់ចម្អិនតាមស្តង់ដារអនាម័យ៖ ប្រើប្រាស់សាច់ស្រស់ៗស្អាតល្អ រម្ងាស់ជាមួយទឹកស៊ុបខាប់ល្មម រសជាតិមុតជាប់មាត់ ធានាទាំងអនាម័យ ទំនុកចិត្ត និងសុខភាពរឹងមាំ។'
    ],
    image: '4.jpg',
    likes: 450,
    isLiked: false,
    shares: 110,
    timeStr: 'ទើបតែបង្ហោះ (ម្ហូបពិសេសប្រចាំថ្ងៃ 🔥)',
    comments: [
      { author: 'សុខា ស្រីពៅ', text: 'សម្លកកូរនេះបន្លែស្រស់ៗច្រើនមុខណាស់ គ្រឿងបុកនិងអង្ករលីងឈ្ងុយសាយភាយ ញ៉ាំហើយសុខភាពល្អ!' },
      { author: 'ចាន់ ណារ៉ា', text: 'រសជាតិដើមពិតៗ ទឹកស៊ុបខាប់ឈ្ងុយឆ្ងាញ់ជាប់មាត់!' }
    ]
  },
  {
    id: 'food_1',
    type: 'food',
    title: 'អាម៉ុកត្រីអន្លក់ខ្ចី (Fish Amok Khmer)',
    category: 'soup',
    priceUsd: 1.50,
    priceKhr: 6000,
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
    priceUsd: 1.50,
    priceKhr: 6000,
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
    priceUsd: 1.50,
    priceKhr: 6000,
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
    priceUsd: 1.50,
    priceKhr: 6000,
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
    priceUsd: 1.50,
    priceKhr: 6000,
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
    priceUsd: 1.50,
    priceKhr: 6000,
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
    id: 'shampoo_haicneal',
    type: 'beauty',
    title: 'Haicneal (ឡេ/សាប៊ូកក់សក់ព្យាបាលអង្គែ និងរមាស់ស្បែកក្បាល)',
    category: 'shampoo',
    categories: ['shampoo', 'treatment'],
    priceUsd: 5.00,
    priceKhr: 20400,
    calories: 0,
    desc: 'រូបមន្តវេជ្ជសាស្ត្រជំនាញព្យាបាលស្បែកក្បាលដោយផ្ទាល់ ជាមួយនឹងសមាសធាតុផ្សំ Compound Ketoconazole ដែលជាសារធាតុសម្លាប់មេរោគផ្សិតយ៉ាងមានប្រសិទ្ធភាពខ្ពស់ ជួយបំបាត់បញ្ហាស្បែកក្បាលរ៉ាំរ៉ៃឱ្យស្អាតមានទំនុកចិត្តឡើងវិញ។',
    features: [
      '*សមាសធាតុផ្សំ Compound Ketoconazole៖ កម្ចាត់មេរោគផ្សិត Pityrosporum ovale ដែលជាដើមហេតុចម្បងនៃអង្គែ និងរមាស់ស្បែកក្បាល។',
      '*ព្យាបាលរមាស់ និងរលាកស្បែកក្បាល៖ ជួយសម្រាលការរលាក កាត់បន្ថយការរបកស្បែកក្បាល និងទប់ស្កាត់ការកើតអង្គែឡើងវិញយ៉ាងមានប្រសិទ្ធភាព។',
      '*សុវត្ថិភាព និងទំនុកចិត្តខ្ពស់៖ រូបមន្តឱសថសាស្រ្តស្តង់ដារ ប្រើប្រាស់បានទាំងបុរស និងស្ត្រី ធ្វើឱ្យស្បែកក្បាលស្អាត ត្រជាក់ស្រួល និងមានទំនុកចិត្ត។'
    ],
    image: 'h3.png',
    likes: 528,
    isLiked: false,
    shares: 145,
    timeStr: 'ទើបតែបង្ហោះ (ផលិតផលព្យាបាលអង្គែជំនាញ 🔥)',
    comments: [
      { author: 'ចាន់ សុភាព', text: 'សាប៊ូ Haicneal នេះពូកែខ្លាំងណាស់ កក់តែ ២-៣ ដងបាត់រមាស់ និងបាត់អង្គែតែម្តង!' },
      { author: 'ហេង វិសាល', text: 'ផលិតផលគុណភាពល្អពិតៗ ស្បែកក្បាលស្អាតត្រជាក់ស្រួល គ្មានអង្គែទៀតទេ!' }
    ]
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
  },
  {
    id: 'post_news_1',
    type: 'news',
    title: 'ការលើកកម្ពស់សន្តិសុខស្បៀង និងការនាំចេញមុខម្ហូបប្រពៃណីខ្មែរទៅកាន់ទីផ្សារអន្តរជាតិ',
    source: 'RFI ខេមរភាសា',
    category: 'rfi',
    desc: 'រាជរដ្ឋាភិបាលកម្ពុជា និងក្រសួងពាណិជ្ជកម្ម បានដាក់ចេញយុទ្ធសាស្ត្រថ្មី ដើម្បីជំរុញការចុះបញ្ជីម៉ាកសម្គាល់ភូមិសាស្ត្រទំនិញម្ហូបខ្មែរ និងគាំទ្រដល់អាជីវកម្មម្ហូបអាហារក្នុងស្រុក។',
    image: 'earth_globe.jpg',
    timeStr: '១ ម៉ោងមុន',
    likes: 156,
    isLiked: false,
    shares: 34,
    comments: []
  },
  {
    id: 'post_health_1',
    type: 'health',
    title: 'គន្លឹះកាត់បន្ថយជាតិប្រៃ (អំបិល) និងជាតិស្ករក្នុងរបបអាហារប្រចាំថ្ងៃ',
    source: 'ក្រសួងសុខាភិបាល (MoH)',
    desc: 'ការកាត់បន្ថយការញ៉ាំប្រៃ និងផ្អែម ជួយកាត់បន្ថយហានិភ័យនៃជំងឺលើសសម្ពាធឈាម និងជំងឺទឹកនោមផ្អែមរហូតដល់ទៅ ៥០%។ ណែនាំឱ្យប្រើប្រាស់គ្រឿងទេសធម្មជាតិជំនួសវិញ។',
    image: 'food_korko.jpg',
    timeStr: '៣ ម៉ោងមុន',
    likes: 210,
    isLiked: false,
    shares: 48,
    comments: []
  },
  {
    id: 'post_sports_1',
    type: 'sports',
    title: 'លំហាត់ប្រាណកម្តៅសាច់ដុំតាមផ្ទះ ១៥ នាទីរាល់ព្រឹកដើម្បីសុខភាពមាំមួន',
    source: 'កីឡាដើម្បីសុខភាព',
    desc: 'លំហាត់ប្រាណសាមញ្ញៗដែលមិនត្រូវការឧបករណ៍ ជួយដាស់រាងកាយឱ្យស្វាហាប់ និងបង្កើនល្បឿននៃការដុតបំផ្លាញថាមពលកាឡូរីប្រចាំថ្ងៃ។',
    image: 'food_amok.jpg',
    timeStr: '៥ ម៉ោងមុន',
    likes: 180,
    isLiked: false,
    shares: 29,
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
  isAdmin: true, // Page Owner / Administrator privilege
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
      // Ensure all signature and food dishes are updated to 6,000 Riels ($1.50)
      const signatureIds = ['food_korko_special', 'food_pork_egg_stew', 'food_ginger_chicken', 'food_beef_sour_soup'];
      for (const sigId of signatureIds) {
        const dish = INITIAL_POSTS.find(p => p.id === sigId);
        if (dish) {
          const idx = AppState.posts.findIndex(p => p.id === sigId || p.image === dish.image);
          if (idx !== -1) {
            AppState.posts.splice(idx, 1);
          }
          AppState.posts.unshift(dish);
        }
      }
      // Update any food posts with the new 6,000 Riels price
      AppState.posts.forEach(p => {
        if (p.type === 'food') {
          p.priceKhr = 6000;
          p.priceUsd = 1.50;
        }
      });
      // Ensure Haicneal anti-dandruff shampoo is present and updated
      const haicneal = INITIAL_POSTS.find(p => p.id === 'shampoo_haicneal');
      if (haicneal) {
        const hIdx = AppState.posts.findIndex(p => p.id === 'shampoo_haicneal' || p.image === 'h3.png');
        if (hIdx !== -1) {
          AppState.posts.splice(hIdx, 1);
        }
        const firstBeautyIdx = AppState.posts.findIndex(p => p.type === 'beauty');
        if (firstBeautyIdx !== -1) {
          AppState.posts.splice(firstBeautyIdx, 0, haicneal);
        } else {
          AppState.posts.unshift(haicneal);
        }
      }
      savePosts();
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
  setupAdminPostControls();

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

  // Delegated Page Jump Buttons
  document.addEventListener('click', (e) => {
    const jumpBtn = e.target.closest('[data-page-jump]');
    if (jumpBtn) {
      const page = jumpBtn.getAttribute('data-page-jump');
      if (page) switchPage(page);
    }
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

// 8. Render Post Card Template (ដូច Facebook: ឆ្វេង ចូលចិត្ត/មតិ/ចែករំលែក | ស្តាំ Telegram & Messenger ឬ ប៊ូតុងតំណភ្ជាប់)
function buildPostCardHtml(post) {
  const isFood = post.type === 'food';
  const isBeauty = post.type === 'beauty';
  const isNews = post.type === 'news';
  const isHealth = post.type === 'health';
  const isSports = post.type === 'sports';

  // Category Pill Label and Class
  let catPillClass = 'food';
  let catPillText = '🍲 មុខម្ហូប';
  let targetPage = 'pageFood';

  if (isBeauty) {
    catPillClass = 'beauty';
    catPillText = '🧴 សាប៊ូកម្ចាត់អង្គែ';
    targetPage = 'pageBeauty';
  } else if (isNews) {
    catPillClass = 'news';
    catPillText = '🌐 ព័ត៌មាន';
    targetPage = 'pageNews';
  } else if (isHealth) {
    catPillClass = 'health';
    catPillText = '🩺 សុខភាព';
    targetPage = 'pageHealth';
  } else if (isSports) {
    catPillClass = 'sports';
    catPillText = '🏃‍♂️ កីឡា';
    targetPage = 'pageSports';
  }

  // Price & Calorie / Source Badge
  let badgesHtml = '';
  let rightActionHtml = '';

  if (post.priceUsd && post.priceUsd > 0) {
    const priceDisplay = `${toKhmerNumber(post.priceKhr ? post.priceKhr.toLocaleString() : Math.round(post.priceUsd * AppState.khrRate).toLocaleString())} ៛ ($${post.priceUsd.toFixed(2)})`;
    const calorieBadge = post.calories > 0
      ? `<span class="post-calorie-badge">🔥 ${toKhmerNumber(post.calories)} kcal</span>`
      : '';
    badgesHtml = `
      <div class="post-badges-row">
        <span class="post-price-badge">💵 ${priceDisplay}</span>
        ${calorieBadge}
      </div>
    `;

    // Order Links for Food & Beauty
    const orderMsg = encodeURIComponent(
      `សួស្តី «ផ្ទះម៉ាក់រចនា»! ខ្ញុំចង់កុម្ម៉ង់៖
- មុខទំនិញ៖ ${post.title}
- តម្លៃ៖ $${post.priceUsd.toFixed(2)} (${(post.priceKhr || Math.round(post.priceUsd * AppState.khrRate)).toLocaleString()} ៛)
សូមជួយទាក់ទងមកខ្ញុំបាទ/នាងខ្ញុំផង។ អរគុណ!`
    );
    const telegramUrl = `https://t.me/MakRachanaKitchen?text=${orderMsg}`;
    const messengerUrl = `https://m.me/MakRachanaKitchen?text=${orderMsg}`;

    rightActionHtml = `
      <div class="post-right-order-group">
        <a href="${telegramUrl}" target="_blank" rel="noopener" class="btn-order-direct telegram" title="Order ផ្ទាល់តាម Telegram">
          <span>✈️</span> Telegram
        </a>
        <a href="${messengerUrl}" target="_blank" rel="noopener" class="btn-order-direct messenger" title="Order ផ្ទាល់តាម Messenger">
          <span>💬</span> Messenger
        </a>
      </div>
    `;
  } else {
    // Non-commerce (News, Health, Sports)
    const sourceLabel = post.source || catPillText;
    badgesHtml = `
      <div class="post-badges-row">
        <span class="post-source-badge">📌 ប្រភព៖ ${sourceLabel}</span>
      </div>
    `;
    rightActionHtml = `
      <div class="post-right-order-group">
        <button type="button" class="btn-order-direct primary-link" data-page-jump="${targetPage}" title="ចូលមើលទំព័រ ${catPillText}">
          <span>🔍</span> មើលក្នុងទំព័រ ${catPillText}
        </button>
      </div>
    `;
  }

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

  // Image wrap
  const imageHtml = post.image ? `
    <div class="post-photo-wrap">
      <img src="${post.image}" alt="${post.title}" class="post-photo-img" loading="lazy">
    </div>
  ` : '';

  return `
    <article class="post-card" id="post-${post.id}">
      
      <!-- Top-Left: Avatar, Page Name, Meta -->
      <div class="post-header-row">
        <div class="post-author-group">
          <div class="post-author-avatar-img">
            <img src="LGR1.jpg" alt="ផ្ទះម៉ាក់រចនា">
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
          <span class="post-category-pill ${catPillClass}">
            ${catPillText}
          </span>
          <div class="post-dots-dropdown-wrap">
            <button type="button" class="btn-post-more" data-post-dots="${post.id}" title="ជម្រើសគ្រប់គ្រង (Admin តែប៉ុណ្ណោះ)">
              <span>•••</span>
            </button>
            <div class="post-dropdown-menu" id="dropdown-${post.id}">
              <button type="button" class="post-dropdown-item edit-price" data-admin-edit-price="${post.id}">
                <span>✏️</span> កែតម្លៃ
              </button>
              <button type="button" class="post-dropdown-item delete-post" data-admin-delete-post="${post.id}">
                <span>🗑️</span> លុប Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Post Body -->
      <h3 class="post-title-text">${post.title}</h3>
      <p class="post-desc-text">${post.desc}</p>
      ${featuresHtml}

      ${badgesHtml}
      ${imageHtml}

      <!-- Reaction Stats -->
      <div class="post-reactions-row">
        <span>👍 <strong id="likeCount-${post.id}">${toKhmerNumber(post.likes || 0)}</strong> នាក់បានចូលចិត្ត</span>
        <span>${toKhmerNumber(post.comments ? post.comments.length : 0)} មតិ • ${toKhmerNumber(post.shares || 0)} ចែករំលែក</span>
      </div>

      <!-- Action Bar Split (Left: 3 Action Buttons គ្មានអក្សរ | Right: Direct Order or Link) -->
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

        <!-- Right: Direct Order via Telegram & Messenger OR Page Link -->
        ${rightActionHtml}

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

  const dynamicNews = AppState.posts.filter((p) => p.type === 'news').map((p) => ({
    source: p.source || 'Admin ផ្ទះម៉ាក់រចនា',
    icon: '📢',
    title: p.title,
    summary: p.desc,
    time: p.timeStr || 'ថ្មីៗ',
    category: 'all',
  }));

  const allNews = [...dynamicNews, ...NEWS_ARTICLES];
  const articles = allNews.filter((a) => {
    if (cat === 'all') return true;
    return a.category === cat || a.category === 'all';
  });

  container.innerHTML = articles.map((art) => `
    <div class="news-article-card">
      <div class="news-source-tag">
        <span>${art.icon || '🌐'}</span> ${art.source}
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

  const dynamicHealth = AppState.posts.filter((p) => p.type === 'health').map((p) => ({
    badge: 'ព័ត៌មានសុខភាពថ្មី',
    title: p.title,
    desc: p.desc,
    points: ['អត្ថប្រយោជន៍ល្អចំពោះសុខភាពទូទៅ', 'អនាម័យខ្ពស់ និងសុវត្ថិភាពចំណីអាហារ']
  }));

  const allHealth = [...dynamicHealth, ...HEALTH_ARTICLES];
  container.innerHTML = allHealth.map((item) => `
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

  const dynamicSports = AppState.posts.filter((p) => p.type === 'sports').map((p) => ({
    tag: 'កីឡាដើម្បីសុខភាព',
    title: p.title,
    desc: p.desc,
    steps: p.desc
  }));

  const allSports = [...dynamicSports, ...SPORTS_CARDS];
  container.innerHTML = allSports.map((item) => `
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
  const btnOpenCard = document.getElementById('btnOpenAdminPostCard');
  const btnClose = document.getElementById('btnCloseAdminPostModal');
  const btnCancel = document.getElementById('btnCancelAdminPost');
  const form = document.getElementById('formAdminPost');
  const inputFile = document.getElementById('adminPostImageFile');
  const previewWrap = document.getElementById('adminPreviewWrap');
  const previewImg = document.getElementById('adminPostPreviewImg');
  const selectType = document.getElementById('adminPostType');

  let currentImageBase64 = null;

  const openModal = (defaultType = null) => {
    if (modal) {
      if (defaultType && selectType) {
        selectType.value = defaultType;
      }
      modal.classList.add('active');
    }
  };

  if (btnOpen) {
    btnOpen.addEventListener('click', () => openModal());
  }

  if (btnOpenCard) {
    btnOpenCard.addEventListener('click', (e) => {
      const quickBtn = e.target.closest('[data-quick-type]');
      const type = quickBtn ? quickBtn.getAttribute('data-quick-type') : 'food';
      openModal(type);
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
      const type = selectType?.value || 'food';
      const title = document.getElementById('adminPostTitle')?.value.trim() || '';
      const priceUsd = parseFloat(document.getElementById('adminPostPriceUsd')?.value) || 0;
      const calories = parseInt(document.getElementById('adminPostCalorie')?.value, 10) || 0;
      const desc = document.getElementById('adminPostDesc')?.value.trim() || '';

      if (!title || !desc) {
        showToast('សូមបញ្ចូលចំណងជើង និងខ្លឹមសារឱ្យបានត្រឹមត្រូវ', 'warn');
        return;
      }

      const defaultImages = {
        food: '1.jpg',
        beauty: 'h3.png',
        news: 'earth_globe.jpg',
        health: 'food_korko.jpg',
        sports: 'food_amok.jpg'
      };

      const newPost = {
        id: 'post_admin_' + Date.now(),
        type: type,
        title: title,
        category: type === 'food' ? 'soup' : 'all',
        priceUsd: priceUsd,
        priceKhr: Math.round(priceUsd * AppState.khrRate),
        calories: calories,
        desc: desc,
        image: currentImageBase64 || defaultImages[type] || '1.jpg',
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
      renderNewsGrid();
      renderHealthGrid();
      renderSportsGrid();

      const pageNames = {
        food: '«សូមជ្រើសរើសម្ហូបសម្រាប់ថ្ងៃនេះ»',
        beauty: '«សាប៊ូកម្ចាត់អង្គែ»',
        news: '«ព័ត៌មាន»',
        health: '«សុខភាព និង អនាម័យ»',
        sports: '«កីឡាដើម្បីសុខភាព»'
      };

      showToast(`🎉 បានបង្ហោះទៅកាន់ទំព័រ ${pageNames[type] || type} និងទំព័រដើមដោយជោគជ័យ!`, 'success');
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


// 12. Admin Post Controls (3-dots Dropdown, Edit Price, Delete Post - Admin Only)
function setupAdminPostControls() {
  // Delegate click for 3-dots toggle
  document.addEventListener('click', (e) => {
    // 1. Toggle 3-dots dropdown
    const dotsBtn = e.target.closest('[data-post-dots]');
    if (dotsBtn) {
      e.stopPropagation();
      if (!AppState.isAdmin) {
        showToast('🔒 សញ្ញា ៣ ចុច និងមុខងារនេះគឺសម្រាប់តែ Admin (ម្ចាស់ហាង) តែប៉ុណ្ណោះ!', 'warn');
        return;
      }
      const postId = dotsBtn.getAttribute('data-post-dots');
      const menu = document.getElementById(`dropdown-${postId}`);
      // Close other open menus
      document.querySelectorAll('.post-dropdown-menu.active').forEach((m) => {
        if (m !== menu) m.classList.remove('active');
      });
      if (menu) menu.classList.toggle('active');
      return;
    }

    // Close any open dropdowns if clicking outside
    if (!e.target.closest('.post-dots-dropdown-wrap')) {
      document.querySelectorAll('.post-dropdown-menu.active').forEach((m) => m.classList.remove('active'));
    }

    // 2. Click Edit Price (កែតម្លៃ)
    const editBtn = e.target.closest('[data-admin-edit-price]');
    if (editBtn) {
      e.stopPropagation();
      document.querySelectorAll('.post-dropdown-menu.active').forEach((m) => m.classList.remove('active'));
      
      if (!AppState.isAdmin) {
        showToast('🔒 មុខងារកែតម្លៃគឺសម្រាប់តែ Admin (ម្ចាស់ហាង) តែប៉ុណ្ណោះ!', 'warn');
        return;
      }

      const postId = editBtn.getAttribute('data-admin-edit-price');
      openAdminEditPriceModal(postId);
      return;
    }

    // 3. Click Delete Post (លុប Post)
    const delBtn = e.target.closest('[data-admin-delete-post]');
    if (delBtn) {
      e.stopPropagation();
      document.querySelectorAll('.post-dropdown-menu.active').forEach((m) => m.classList.remove('active'));

      if (!AppState.isAdmin) {
        showToast('🔒 មុខងារលុប Post គឺសម្រាប់តែ Admin (ម្ចាស់ហាង) តែប៉ុណ្ណោះ!', 'warn');
        return;
      }

      const postId = delBtn.getAttribute('data-admin-delete-post');
      const post = AppState.posts.find((p) => p.id === postId);
      if (!post) return;

      const confirmMsg = `តើលោកអ្នក (Admin) ពិតជាចង់លុបការបង្ហោះ៖\n\n«${post.title}»\n\nនេះចេញពីប្រព័ន្ធមែនទេ?`;
      if (window.confirm(confirmMsg)) {
        AppState.posts = AppState.posts.filter((p) => p.id !== postId);
        savePosts();
        renderHomeFeed();
        renderFoodGrid();
        renderBeautyGrid();
        showToast(`🗑️ បានលុបការបង្ហោះ «${post.title}» ដោយជោគជ័យ!`, 'info');
      }
      return;
    }
  });

  // Modal Edit Price Setup
  const modalEditPrice = document.getElementById('modalAdminEditPrice');
  const btnCloseEditModal = document.getElementById('btnCloseEditPriceModal');
  const btnCancelEdit = document.getElementById('btnCancelEditPrice');
  const formEditPrice = document.getElementById('formAdminEditPrice');
  const inputKhr = document.getElementById('inputEditPriceKhr');
  const inputUsd = document.getElementById('inputEditPriceUsd');
  const dishNameEl = document.getElementById('editPriceDishName');
  const hiddenIdEl = document.getElementById('editPricePostId');

  const closeEditModal = () => {
    if (modalEditPrice) modalEditPrice.classList.remove('active');
  };

  if (btnCloseEditModal) btnCloseEditModal.addEventListener('click', closeEditModal);
  if (btnCancelEdit) btnCancelEdit.addEventListener('click', closeEditModal);
  if (modalEditPrice) {
    modalEditPrice.addEventListener('click', (e) => {
      if (e.target === modalEditPrice) closeEditModal();
    });
  }

  // Real-time conversion between Riels and USD in modal
  if (inputKhr && inputUsd) {
    inputKhr.addEventListener('input', () => {
      const khrVal = parseFloat(inputKhr.value);
      if (!isNaN(khrVal) && khrVal > 0) {
        inputUsd.value = (khrVal / AppState.khrRate).toFixed(2);
      }
    });

    inputUsd.addEventListener('input', () => {
      const usdVal = parseFloat(inputUsd.value);
      if (!isNaN(usdVal) && usdVal > 0) {
        inputKhr.value = Math.round(usdVal * AppState.khrRate);
      }
    });
  }

  if (formEditPrice) {
    formEditPrice.addEventListener('submit', (e) => {
      e.preventDefault();
      const postId = hiddenIdEl ? hiddenIdEl.value : null;
      const newKhr = parseInt(inputKhr.value, 10);
      const newUsd = parseFloat(inputUsd.value);

      if (!postId || isNaN(newKhr) || isNaN(newUsd) || newKhr <= 0) {
        showToast('⚠️ សូមបញ្ចូលតម្លៃឱ្យបានត្រឹមត្រូវ!', 'warn');
        return;
      }

      const post = AppState.posts.find((p) => p.id === postId);
      if (post) {
        post.priceKhr = newKhr;
        post.priceUsd = newUsd;
        savePosts();
        renderHomeFeed();
        renderFoodGrid();
        renderBeautyGrid();
        closeEditModal();
        showToast(`✅ បានកែប្រែតម្លៃមុខម្ហូប «${post.title}» ទៅជា ${toKhmerNumber(newKhr.toLocaleString())} ៛ ($${newUsd.toFixed(2)}) ដោយជោគជ័យ!`, 'success');
      }
    });
  }
}

function openAdminEditPriceModal(postId) {
  const post = AppState.posts.find((p) => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('modalAdminEditPrice');
  const dishNameEl = document.getElementById('editPriceDishName');
  const hiddenIdEl = document.getElementById('editPricePostId');
  const inputKhr = document.getElementById('inputEditPriceKhr');
  const inputUsd = document.getElementById('inputEditPriceUsd');

  if (hiddenIdEl) hiddenIdEl.value = post.id;
  if (dishNameEl) dishNameEl.textContent = post.title;
  if (inputKhr) inputKhr.value = post.priceKhr || 6000;
  if (inputUsd) inputUsd.value = post.priceUsd ? post.priceUsd.toFixed(2) : (post.priceKhr ? (post.priceKhr / AppState.khrRate).toFixed(2) : '1.50');

  if (modal) modal.classList.add('active');
}
