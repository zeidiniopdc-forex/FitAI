import { FoodItem } from '../types';

export const foodCategories = [
  'برنج و غلات', 'نان', 'گوشت قرمز', 'مرغ و طیور', 'ماهی و غذاهای دریایی',
  'تخم‌مرغ', 'لبنیات', 'حبوبات', 'سبزیجات', 'میوه‌ها',
  'آجیل و مغزها', 'غذاهای ایرانی', 'نوشیدنی‌ها', 'روغن‌ها و چربی‌ها', 'سایر'
];

export const foodDatabase: FoodItem[] = [
  // برنج و غلات
  { id: 'f1', name: 'برنج سفید پخته', category: 'برنج و غلات', unit: 'پیمانه', standardWeight: 150, calories: 195, protein: 4, carbs: 43, fat: 0.4, fiber: 0.6, vitamins: { B1: 0.1, B3: 1.5 }, minerals: { آهن: 0.8, منیزیم: 15 } },
  { id: 'f2', name: 'برنج قهوه‌ای پخته', category: 'برنج و غلات', unit: 'پیمانه', standardWeight: 150, calories: 215, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, vitamins: { B1: 0.3, B6: 0.3 }, minerals: { آهن: 1, منیزیم: 84 } },
  { id: 'f3', name: 'نان سنگک', category: 'نان', unit: 'کف دست', standardWeight: 75, calories: 200, protein: 7, carbs: 40, fat: 1, fiber: 3, vitamins: { B1: 0.2 }, minerals: { آهن: 2.5, روی: 1 } },
  { id: 'f4', name: 'نان بربری', category: 'نان', unit: 'کف دست', standardWeight: 75, calories: 195, protein: 6, carbs: 38, fat: 1.2, fiber: 2, vitamins: { B1: 0.15 }, minerals: { آهن: 2, روی: 0.8 } },
  { id: 'f5', name: 'نان لواش', category: 'نان', unit: 'کف دست', standardWeight: 30, calories: 80, protein: 2.5, carbs: 16, fat: 0.3, fiber: 0.8, vitamins: {}, minerals: { آهن: 0.8 } },
  { id: 'f6', name: 'نان جو', category: 'نان', unit: 'کف دست', standardWeight: 75, calories: 175, protein: 6, carbs: 33, fat: 1.5, fiber: 5, vitamins: { B1: 0.2, B2: 0.1 }, minerals: { آهن: 2.5, منیزیم: 40 } },
  { id: 'f7', name: 'ماکارونی پخته', category: 'برنج و غلات', unit: 'پیمانه', standardWeight: 140, calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5, vitamins: { B1: 0.2, B3: 2 }, minerals: { آهن: 1.5, روی: 0.8 } },
  { id: 'f8', name: 'جو دوسر', category: 'برنج و غلات', unit: 'قاشق غذاخوری', standardWeight: 10, calories: 38, protein: 1.3, carbs: 6.5, fat: 0.7, fiber: 1, vitamins: { B1: 0.1 }, minerals: { آهن: 0.5, منیزیم: 5 } },
  
  // گوشت
  { id: 'f9', name: 'سینه مرغ پخته', category: 'مرغ و طیور', unit: 'گرم', standardWeight: 100, calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, vitamins: { B3: 13.7, B6: 0.6 }, minerals: { آهن: 1, روی: 1, فسفر: 200 } },
  { id: 'f10', name: 'ران مرغ پخته', category: 'مرغ و طیور', unit: 'گرم', standardWeight: 100, calories: 209, protein: 26, carbs: 0, fat: 10.9, fiber: 0, vitamins: { B3: 8, B6: 0.3 }, minerals: { آهن: 1.3, روی: 2 } },
  { id: 'f11', name: 'گوشت گوساله پخته', category: 'گوشت قرمز', unit: 'گرم', standardWeight: 100, calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, vitamins: { B12: 2.5, B3: 5 }, minerals: { آهن: 2.6, روی: 4.5, فسفر: 190 } },
  { id: 'f12', name: 'گوشت گوسفند پخته', category: 'گوشت قرمز', unit: 'گرم', standardWeight: 100, calories: 294, protein: 25, carbs: 0, fat: 21, fiber: 0, vitamins: { B12: 2, B3: 4 }, minerals: { آهن: 2, روی: 4 } },
  { id: 'f13', name: 'جگر گوسفند', category: 'گوشت قرمز', unit: 'گرم', standardWeight: 100, calories: 175, protein: 26, carbs: 4, fat: 5, fiber: 0, vitamins: { A: 18000, B12: 60, B2: 3 }, minerals: { آهن: 10, روی: 5, مس: 0.5 } },
  { id: 'f14', name: 'ماهی قزل‌آلا پخته', category: 'ماهی و غذاهای دریایی', unit: 'گرم', standardWeight: 100, calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, vitamins: { D: 570, B12: 3.2, B3: 8 }, minerals: { فسفر: 240, سلنیوم: 30 } },
  { id: 'f15', name: 'میگو پخته', category: 'ماهی و غذاهای دریایی', unit: 'گرم', standardWeight: 100, calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, vitamins: { B12: 1.1 }, minerals: { سلنیوم: 35, روی: 1.5, ید: 35 } },
  { id: 'f16', name: 'تن ماهی (کنسرو)', category: 'ماهی و غذاهای دریایی', unit: 'گرم', standardWeight: 100, calories: 130, protein: 29, carbs: 0, fat: 1, fiber: 0, vitamins: { D: 170, B12: 3 }, minerals: { سلنیوم: 40 } },
  
  // تخم‌مرغ
  { id: 'f17', name: 'تخم‌مرغ کامل پخته', category: 'تخم‌مرغ', unit: 'عدد', standardWeight: 50, calories: 78, protein: 6, carbs: 0.6, fat: 5, fiber: 0, vitamins: { A: 80, D: 1, B12: 0.6, B2: 0.3 }, minerals: { آهن: 1, روی: 0.6, فسفر: 90 } },
  { id: 'f18', name: 'سفیده تخم‌مرغ', category: 'تخم‌مرغ', unit: 'عدد', standardWeight: 33, calories: 17, protein: 3.6, carbs: 0.2, fat: 0.1, fiber: 0, vitamins: {}, minerals: {} },
  
  // لبنیات
  { id: 'f19', name: 'شیر کم‌چرب', category: 'لبنیات', unit: 'لیوان', standardWeight: 240, calories: 100, protein: 8, carbs: 12, fat: 2.5, fiber: 0, vitamins: { D: 3, B12: 1.2, A: 50 }, minerals: { کلسیم: 300, فسفر: 230 } },
  { id: 'f20', name: 'ماست کم‌چرب', category: 'لبنیات', unit: 'پیمانه', standardWeight: 245, calories: 130, protein: 12, carbs: 15, fat: 2, fiber: 0, vitamins: { B12: 1.4, B2: 0.5 }, minerals: { کلسیم: 400, فسفر: 300 } },
  { id: 'f21', name: 'ماست یونانی', category: 'لبنیات', unit: 'پیمانه', standardWeight: 170, calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, vitamins: { B12: 0.8 }, minerals: { کلسیم: 180 } },
  { id: 'f22', name: 'پنیر سفید ایرانی', category: 'لبنیات', unit: 'گرم', standardWeight: 30, calories: 78, protein: 5, carbs: 1, fat: 6, fiber: 0, vitamins: { A: 50 }, minerals: { کلسیم: 150, فسفر: 100 } },
  { id: 'f23', name: 'کشک', category: 'لبنیات', unit: 'قاشق غذاخوری', standardWeight: 15, calories: 25, protein: 2.5, carbs: 2, fat: 0.5, fiber: 0, vitamins: {}, minerals: { کلسیم: 80 } },
  
  // حبوبات
  { id: 'f24', name: 'عدس پخته', category: 'حبوبات', unit: 'پیمانه', standardWeight: 200, calories: 230, protein: 18, carbs: 40, fat: 0.8, fiber: 15.6, vitamins: { B1: 0.3, B6: 0.2, فولیت: 358 }, minerals: { آهن: 6.6, منیزیم: 71, روی: 2.5 } },
  { id: 'f25', name: 'نخود پخته', category: 'حبوبات', unit: 'پیمانه', standardWeight: 164, calories: 269, protein: 14.5, carbs: 45, fat: 4.2, fiber: 12.5, vitamins: { B6: 0.2, فولیت: 282 }, minerals: { آهن: 4.7, منیزیم: 78, روی: 2.5 } },
  { id: 'f26', name: 'لوبیا قرمز پخته', category: 'حبوبات', unit: 'پیمانه', standardWeight: 172, calories: 225, protein: 15, carbs: 40, fat: 0.9, fiber: 11, vitamins: { B1: 0.2, فولیت: 230 }, minerals: { آهن: 5.2, منیزیم: 70 } },
  { id: 'f27', name: 'لوبیا چیتی پخته', category: 'حبوبات', unit: 'پیمانه', standardWeight: 172, calories: 240, protein: 14, carbs: 42, fat: 1, fiber: 10, vitamins: { B1: 0.3, فولیت: 210 }, minerals: { آهن: 4.5, منیزیم: 65 } },
  
  // سبزیجات
  { id: 'f28', name: 'خیار', category: 'سبزیجات', unit: 'عدد متوسط', standardWeight: 200, calories: 30, protein: 1.3, carbs: 6, fat: 0.2, fiber: 1, vitamins: { K: 17, C: 6 }, minerals: { پتاسیم: 290 } },
  { id: 'f29', name: 'گوجه‌فرنگی', category: 'سبزیجات', unit: 'عدد متوسط', standardWeight: 120, calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, fiber: 1.4, vitamins: { C: 17, K: 8, A: 500 }, minerals: { پتاسیم: 284 } },
  { id: 'f30', name: 'کاهو', category: 'سبزیجات', unit: 'پیمانه', standardWeight: 55, calories: 5, protein: 0.5, carbs: 1, fat: 0.1, fiber: 0.5, vitamins: { A: 200, K: 25 }, minerals: {} },
  { id: 'f31', name: 'اسفناج پخته', category: 'سبزیجات', unit: 'پیمانه', standardWeight: 180, calories: 41, protein: 5.3, carbs: 6.8, fat: 0.5, fiber: 4.3, vitamins: { A: 940, K: 888, C: 17, فولیت: 263 }, minerals: { آهن: 6.4, منیزیم: 157, کلسیم: 245 } },
  { id: 'f32', name: 'هویج', category: 'سبزیجات', unit: 'عدد متوسط', standardWeight: 60, calories: 25, protein: 0.6, carbs: 6, fat: 0.1, fiber: 1.7, vitamins: { A: 10000 }, minerals: { پتاسیم: 190 } },
  { id: 'f33', name: 'سیب‌زمینی پخته', category: 'سبزیجات', unit: 'عدد متوسط', standardWeight: 150, calories: 130, protein: 3, carbs: 30, fat: 0.2, fiber: 3, vitamins: { C: 10, B6: 0.4 }, minerals: { پتاسیم: 620 } },
  { id: 'f34', name: 'پیاز', category: 'سبزیجات', unit: 'عدد متوسط', standardWeight: 110, calories: 44, protein: 1.2, carbs: 10, fat: 0.1, fiber: 1.9, vitamins: { C: 8 }, minerals: { پتاسیم: 160 } },
  { id: 'f35', name: 'سیر', category: 'سبزیجات', unit: 'حبه', standardWeight: 3, calories: 4, protein: 0.2, carbs: 1, fat: 0, fiber: 0.1, vitamins: {}, minerals: {} },
  
  // میوه‌ها
  { id: 'f36', name: 'سیب', category: 'میوه‌ها', unit: 'عدد متوسط', standardWeight: 180, calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, vitamins: { C: 8 }, minerals: { پتاسیم: 195 } },
  { id: 'f37', name: 'موز', category: 'میوه‌ها', unit: 'عدد متوسط', standardWeight: 120, calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, vitamins: { B6: 0.4, C: 10 }, minerals: { پتاسیم: 422, منیزیم: 32 } },
  { id: 'f38', name: 'پرتقال', category: 'میوه‌ها', unit: 'عدد متوسط', standardWeight: 130, calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3.1, vitamins: { C: 70 }, minerals: { پتاسیم: 237 } },
  { id: 'f39', name: 'خرما', category: 'میوه‌ها', unit: 'عدد', standardWeight: 8, calories: 23, protein: 0.2, carbs: 6, fat: 0, fiber: 0.7, vitamins: {}, minerals: { پتاسیم: 55, آهن: 0.1 } },
  { id: 'f40', name: 'انگور', category: 'میوه‌ها', unit: 'پیمانه', standardWeight: 150, calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, vitamins: { C: 7, K: 22 }, minerals: { پتاسیم: 288 } },
  { id: 'f41', name: 'هندوانه', category: 'میوه‌ها', unit: 'برش', standardWeight: 280, calories: 86, protein: 1.7, carbs: 22, fat: 0.4, fiber: 0.8, vitamins: { C: 23, A: 340 }, minerals: { پتاسیم: 320 } },
  
  // آجیل و مغزها
  { id: 'f42', name: 'بادام درختی', category: 'آجیل و مغزها', unit: 'گرم', standardWeight: 28, calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, vitamins: { E: 7.3 }, minerals: { منیزیم: 76, کلسیم: 76, آهن: 1 } },
  { id: 'f43', name: 'گردو', category: 'آجیل و مغزها', unit: 'گرم', standardWeight: 28, calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, fiber: 1.9, vitamins: {}, minerals: { منیزیم: 44, فسفر: 98 } },
  { id: 'f44', name: 'پسته', category: 'آجیل و مغزها', unit: 'گرم', standardWeight: 28, calories: 159, protein: 5.7, carbs: 7.7, fat: 12.8, fiber: 2.9, vitamins: { B6: 0.5 }, minerals: { پتاسیم: 289, آهن: 1 } },
  { id: 'f45', name: 'بادام‌زمینی', category: 'آجیل و مغزها', unit: 'گرم', standardWeight: 28, calories: 161, protein: 7.3, carbs: 4.6, fat: 14, fiber: 2.4, vitamins: { E: 2.3, B3: 3.5 }, minerals: { منیزیم: 48 } },
  
  // غذاهای ایرانی
  { id: 'f46', name: 'چلوکباب کوبیده', category: 'غذاهای ایرانی', unit: 'پرس', standardWeight: 350, calories: 650, protein: 35, carbs: 70, fat: 25, fiber: 2, vitamins: {}, minerals: { آهن: 5 } },
  { id: 'f47', name: 'قرمه‌سبزی با برنج', category: 'غذاهای ایرانی', unit: 'پرس', standardWeight: 400, calories: 550, protein: 25, carbs: 65, fat: 20, fiber: 6, vitamins: { A: 500, K: 100 }, minerals: { آهن: 6 } },
  { id: 'f48', name: 'زرشک‌پلو با مرغ', category: 'غذاهای ایرانی', unit: 'پرس', standardWeight: 400, calories: 600, protein: 30, carbs: 75, fat: 18, fiber: 3, vitamins: {}, minerals: {} },
  { id: 'f49', name: 'قیمه با برنج', category: 'غذاهای ایرانی', unit: 'پرس', standardWeight: 400, calories: 580, protein: 28, carbs: 70, fat: 20, fiber: 8, vitamins: {}, minerals: { آهن: 7 } },
  { id: 'f50', name: 'آش رشته', category: 'غذاهای ایرانی', unit: 'کاسه', standardWeight: 350, calories: 280, protein: 12, carbs: 40, fat: 8, fiber: 8, vitamins: {}, minerals: { آهن: 4 } },
  { id: 'f51', name: 'عدس‌پلو', category: 'غذاهای ایرانی', unit: 'پرس', standardWeight: 350, calories: 420, protein: 15, carbs: 70, fat: 10, fiber: 10, vitamins: {}, minerals: { آهن: 5 } },
  { id: 'f52', name: 'کوکو سبزی', category: 'غذاهای ایرانی', unit: 'عدد', standardWeight: 100, calories: 180, protein: 10, carbs: 8, fat: 12, fiber: 3, vitamins: { A: 3000 }, minerals: { آهن: 3 } },
  
  // نوشیدنی‌ها
  { id: 'f53', name: 'چای سیاه', category: 'نوشیدنی‌ها', unit: 'فنجان', standardWeight: 240, calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, vitamins: {}, minerals: {} },
  { id: 'f54', name: 'قهوه تلخ', category: 'نوشیدنی‌ها', unit: 'فنجان', standardWeight: 240, calories: 5, protein: 0.3, carbs: 0, fat: 0, fiber: 0, vitamins: {}, minerals: { پتاسیم: 116 } },
  { id: 'f55', name: 'آب پرتقال طبیعی', category: 'نوشیدنی‌ها', unit: 'لیوان', standardWeight: 240, calories: 110, protein: 2, carbs: 26, fat: 0.5, fiber: 0.5, vitamins: { C: 124 }, minerals: { پتاسیم: 496 } },
  
  // روغن‌ها
  { id: 'f56', name: 'روغن زیتون', category: 'روغن‌ها و چربی‌ها', unit: 'قاشق غذاخوری', standardWeight: 14, calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, vitamins: { E: 1.9 }, minerals: {} },
  { id: 'f57', name: 'کره', category: 'روغن‌ها و چربی‌ها', unit: 'قاشق غذاخوری', standardWeight: 14, calories: 102, protein: 0.1, carbs: 0, fat: 11.5, fiber: 0, vitamins: { A: 100 }, minerals: {} },
  
  // سایر
  { id: 'f58', name: 'عسل', category: 'سایر', unit: 'قاشق غذاخوری', standardWeight: 21, calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0, vitamins: {}, minerals: {} },
  { id: 'f59', name: 'شکر', category: 'سایر', unit: 'قاشق غذاخوری', standardWeight: 12, calories: 46, protein: 0, carbs: 12, fat: 0, fiber: 0, vitamins: {}, minerals: {} },
  { id: 'f60', name: 'پودر پروتئین وی', category: 'سایر', unit: 'پیمانه (30g)', standardWeight: 30, calories: 120, protein: 24, carbs: 3, fat: 1.5, fiber: 0, vitamins: {}, minerals: { کلسیم: 100 } },
];
