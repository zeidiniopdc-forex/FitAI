import { Exercise } from '../types';

export const muscleGroups = [
  'سینه', 'پشت', 'شانه', 'بازو (جلو)', 'بازو (پشت)', 'جلوپا', 'همسترینگ',
  'باسن', 'ساق پا', 'شکم', 'فیله کمر', 'کل بدن'
];

export const equipmentList = [
  'دمبل', 'هالتر', 'دستگاه سیم‌کش', 'دستگاه اسمیت', 'نیمکت',
  'کابل کراس', 'وزن بدن', 'کش ورزشی', 'بارفیکس', 'کتل‌بل',
  'دستگاه پرس پا', 'دستگاه لگ پرس', 'TRX', 'مدیسن بال'
];

export const exerciseDatabase: Exercise[] = [
  // سینه
  { id: 'e1', name: 'پرس سینه هالتر', muscleGroup: 'سینه', equipment: 'هالتر', instructions: 'روی نیمکت بخوابید، هالتر را با دست‌های بازتر از عرض شانه بگیرید. به آرامی پایین بیاورید تا به سینه نزدیک شود و سپس بالا ببرید.', difficulty: 'intermediate', sets: 4, reps: '8-12', rest: 90 },
  { id: 'e2', name: 'پرس سینه دمبل', muscleGroup: 'سینه', equipment: 'دمبل', instructions: 'روی نیمکت بخوابید، دمبل‌ها را در دست بگیرید. به آرامی پایین بیاورید و سپس بالا فشار دهید.', difficulty: 'intermediate', sets: 4, reps: '10-12', rest: 75 },
  { id: 'e3', name: 'پرس بالا سینه دمبل', muscleGroup: 'سینه', equipment: 'دمبل', instructions: 'نیمکت را با زاویه 30-45 درجه تنظیم کنید. دمبل‌ها را بالا فشار دهید.', difficulty: 'intermediate', sets: 3, reps: '10-12', rest: 75 },
  { id: 'e4', name: 'قفسه سینه دمبل', muscleGroup: 'سینه', equipment: 'دمبل', instructions: 'روی نیمکت بخوابید، دمبل‌ها را بالای سینه نگه دارید. دست‌ها را باز کنید و سپس جمع کنید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e5', name: 'شنا سوئدی', muscleGroup: 'سینه', equipment: 'وزن بدن', instructions: 'در حالت شنا قرار بگیرید. بدن را صاف نگه دارید و به سمت زمین پایین بروید.', difficulty: 'beginner', sets: 3, reps: '15-25', rest: 60 },
  { id: 'e6', name: 'کراس‌اور سیم‌کش', muscleGroup: 'سینه', equipment: 'دستگاه سیم‌کش', instructions: 'بین دو سیم‌کش بایستید، دسته‌ها را بگیرید و به سمت جلو و پایین بیاورید.', difficulty: 'intermediate', sets: 3, reps: '12-15', rest: 60 },
  
  // پشت
  { id: 'e7', name: 'زیربغل سیم‌کش از بالا', muscleGroup: 'پشت', equipment: 'دستگاه سیم‌کش', instructions: 'روی دستگاه بنشینید، میله را بگیرید و به سمت سینه پایین بکشید.', difficulty: 'beginner', sets: 4, reps: '10-12', rest: 75 },
  { id: 'e8', name: 'زیربغل خم هالتر', muscleGroup: 'پشت', equipment: 'هالتر', instructions: 'کمی خم شوید، هالتر را بگیرید و به سمت شکم بالا بکشید.', difficulty: 'intermediate', sets: 4, reps: '8-12', rest: 90 },
  { id: 'e9', name: 'زیربغل دمبل تک‌دست', muscleGroup: 'پشت', equipment: 'دمبل', instructions: 'یک دست و زانو را روی نیمکت بگذارید. دمبل را به سمت لگن بالا بکشید.', difficulty: 'beginner', sets: 3, reps: '10-12', rest: 60 },
  { id: 'e10', name: 'ددلیفت', muscleGroup: 'پشت', equipment: 'هالتر', instructions: 'هالتر را از زمین بلند کنید. کمر صاف، زانو کمی خم. با فشار پا و باسن بلند شوید.', difficulty: 'advanced', sets: 4, reps: '5-8', rest: 120 },
  { id: 'e11', name: 'بارفیکس', muscleGroup: 'پشت', equipment: 'بارفیکس', instructions: 'از میله آویزان شوید و خود را بالا بکشید تا چانه بالای میله بیاید.', difficulty: 'intermediate', sets: 3, reps: '6-12', rest: 90 },
  { id: 'e12', name: 'قایقی سیم‌کش', muscleGroup: 'پشت', equipment: 'دستگاه سیم‌کش', instructions: 'روی دستگاه بنشینید، دسته را بگیرید و به سمت شکم بکشید.', difficulty: 'beginner', sets: 3, reps: '10-12', rest: 60 },
  
  // شانه
  { id: 'e13', name: 'پرس شانه هالتر', muscleGroup: 'شانه', equipment: 'هالتر', instructions: 'هالتر را بالای سر نگه دارید و به سمت بالا فشار دهید.', difficulty: 'intermediate', sets: 4, reps: '8-12', rest: 90 },
  { id: 'e14', name: 'نشر جانب دمبل', muscleGroup: 'شانه', equipment: 'دمبل', instructions: 'دمبل‌ها را کنار بدن نگه دارید و به طرفین بالا ببرید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e15', name: 'نشر خم دمبل', muscleGroup: 'شانه', equipment: 'دمبل', instructions: 'کمی خم شوید و دمبل‌ها را به طرفین بالا ببرید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e16', name: 'نشر جلو دمبل', muscleGroup: 'شانه', equipment: 'دمبل', instructions: 'دمبل‌ها را جلو بدن بالا ببرید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e17', name: 'شراگ دمبل', muscleGroup: 'شانه', equipment: 'دمبل', instructions: 'دمبل‌ها را کنار بدن نگه دارید و شانه‌ها را بالا ببرید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  
  // بازو جلو
  { id: 'e18', name: 'جلوبازو هالتر ایستاده', muscleGroup: 'بازو (جلو)', equipment: 'هالتر', instructions: 'ایستاده، هالتر را با حرکت آرنج بالا بیاورید.', difficulty: 'beginner', sets: 3, reps: '10-12', rest: 60 },
  { id: 'e19', name: 'جلوبازو دمبل چکشی', muscleGroup: 'بازو (جلو)', equipment: 'دمبل', instructions: 'دمبل‌ها را به صورت چکشی بالا بیاورید.', difficulty: 'beginner', sets: 3, reps: '10-12', rest: 60 },
  { id: 'e20', name: 'جلوبازو تمرکزی', muscleGroup: 'بازو (جلو)', equipment: 'دمبل', instructions: 'روی نیمکت بنشینید، آرنج را به ران تکیه دهید و دمبل را بالا بیاورید.', difficulty: 'beginner', sets: 3, reps: '10-12', rest: 60 },
  
  // بازو پشت
  { id: 'e21', name: 'پشت‌بازو سیم‌کش', muscleGroup: 'بازو (پشت)', equipment: 'دستگاه سیم‌کش', instructions: 'دسته سیم‌کش را بگیرید و آرنج را صاف کنید.', difficulty: 'beginner', sets: 3, reps: '10-15', rest: 60 },
  { id: 'e22', name: 'پشت‌بازو دمبل پشت سر', muscleGroup: 'بازو (پشت)', equipment: 'دمبل', instructions: 'دمبل را بالای سر ببرید و با خم کردن آرنج پشت سر ببرید.', difficulty: 'intermediate', sets: 3, reps: '10-12', rest: 60 },
  { id: 'e23', name: 'دیپ (پارالل)', muscleGroup: 'بازو (پشت)', equipment: 'وزن بدن', instructions: 'بین دو میله قرار بگیرید و بدن را پایین و بالا ببرید.', difficulty: 'intermediate', sets: 3, reps: '8-15', rest: 75 },
  
  // جلوبا
  { id: 'e24', name: 'اسکوات هالتر', muscleGroup: 'جلوپا', equipment: 'هالتر', instructions: 'هالتر را روی شانه بگذارید. بنشینید تا ران موازی زمین شود.', difficulty: 'intermediate', sets: 4, reps: '8-12', rest: 120 },
  { id: 'e25', name: 'پرس پا دستگاه', muscleGroup: 'جلوپا', equipment: 'دستگاه پرس پا', instructions: 'روی دستگاه بنشینید و صفحه را با پا فشار دهید.', difficulty: 'beginner', sets: 4, reps: '10-15', rest: 90 },
  { id: 'e26', name: 'لانگز', muscleGroup: 'جلوپا', equipment: 'وزن بدن', instructions: 'یک پا جلو، یک پا عقب. زانوها را خم کنید.', difficulty: 'beginner', sets: 3, reps: '12 (هر پا)', rest: 75 },
  { id: 'e27', name: 'جلوپا دستگاه', muscleGroup: 'جلوپا', equipment: 'دستگاه سیم‌کش', instructions: 'روی دستگاه بنشینید و پا را صاف کنید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e28', name: 'هاک اسکوات', muscleGroup: 'جلوپا', equipment: 'دستگاه سیم‌کش', instructions: 'در دستگاه قرار بگیرید و بنشینید.', difficulty: 'intermediate', sets: 3, reps: '10-12', rest: 90 },
  
  // همسترینگ و باسن
  { id: 'e29', name: 'پشت‌پا دستگاه خوابیده', muscleGroup: 'همسترینگ', equipment: 'دستگاه سیم‌کش', instructions: 'روی دستگاه بخوابید و پا را به سمت باسن جمع کنید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e30', name: 'هیپ تراست', muscleGroup: 'باسن', equipment: 'هالتر', instructions: 'پشت به نیمکت، هالتر روی لگن. باسن را بالا ببرید.', difficulty: 'intermediate', sets: 4, reps: '10-15', rest: 90 },
  { id: 'e31', name: 'رومانی ددلیفت', muscleGroup: 'همسترینگ', equipment: 'هالتر', instructions: 'هالتر را با پاهای تقریباً صاف پایین ببرید.', difficulty: 'intermediate', sets: 3, reps: '10-12', rest: 90 },
  { id: 'e32', name: 'کیک‌بک سیم‌کش', muscleGroup: 'باسن', equipment: 'دستگاه سیم‌کش', instructions: 'پا را به عقب ببرید تا باسن منقبض شود.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  
  // ساق پا
  { id: 'e33', name: 'ساق پا ایستاده', muscleGroup: 'ساق پا', equipment: 'دستگاه سیم‌کش', instructions: 'روی نوک پا بلند شوید و پایین بیایید.', difficulty: 'beginner', sets: 4, reps: '15-20', rest: 45 },
  
  // شکم
  { id: 'e34', name: 'کرانچ', muscleGroup: 'شکم', equipment: 'وزن بدن', instructions: 'به پشت بخوابید، زانوها خم. بالاتنه را بلند کنید.', difficulty: 'beginner', sets: 3, reps: '15-25', rest: 45 },
  { id: 'e35', name: 'پلانک', muscleGroup: 'شکم', equipment: 'وزن بدن', instructions: 'روی آرنج و نوک پا قرار بگیرید. بدن صاف.', difficulty: 'beginner', sets: 3, reps: '30-60 ثانیه', rest: 45 },
  { id: 'e36', name: 'زیرشکم خلبانی', muscleGroup: 'شکم', equipment: 'بارفیکس', instructions: 'از میله آویزان شوید و پاها را بالا بیاورید.', difficulty: 'intermediate', sets: 3, reps: '10-15', rest: 60 },
  { id: 'e37', name: 'روسی تویست', muscleGroup: 'شکم', equipment: 'وزن بدن', instructions: 'بنشینید، بالاتنه را کمی عقب ببرید و به طرفین بچرخید.', difficulty: 'beginner', sets: 3, reps: '20 (هر طرف)', rest: 45 },
  
  // فیله کمر
  { id: 'e38', name: 'فیله کمر دستگاه', muscleGroup: 'فیله کمر', equipment: 'دستگاه سیم‌کش', instructions: 'روی دستگاه قرار بگیرید و بالاتنه را بالا بیاورید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 60 },
  { id: 'e39', name: 'سوپرمن', muscleGroup: 'فیله کمر', equipment: 'وزن بدن', instructions: 'به شکم بخوابید و دست و پا را همزمان بالا ببرید.', difficulty: 'beginner', sets: 3, reps: '12-15', rest: 45 },
];

export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return exerciseDatabase.filter(e => e.muscleGroup === muscleGroup);
}

export function getExercisesByEquipment(equipment: string): Exercise[] {
  return exerciseDatabase.filter(e => e.equipment === equipment);
}

export function getExercisesByDifficulty(difficulty: string): Exercise[] {
  return exerciseDatabase.filter(e => e.difficulty === difficulty);
}
