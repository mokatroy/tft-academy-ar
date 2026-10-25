# أكاديمية TFT — نسخة عربية

موقع عربي كامل (RTL) على نمط TFT Academy: قائمة مستويات للكومبوهات، صفحات تفصيلية لكل كومبو مع لوح اللعب والعناصر والتعزيزات وخطة الترقيم، بالإضافة إلى صفحات الأبطال والعناصر والخواص.

## المزايا

- **قائمة مستويات** S/A/B/C مع تصفية فورية و11 كومبوًا لكل مجموعة 18.
- **تفاصيل الكومب:** لوح 7×4، نجوم الوحدات، العناصر حسب الوحدة، الخواص المفعّلة وعتباتها، التعزيزات المفضلة، خطة اللعب، نصائح وبدائل.
- **الأبطال:** بحث وتصفية حسب التكلفة والخاصية، ونافذة تفاصيل بالقدرة والإحصاءات والعناصر المقترحة.
- **العناصر:** 44 مكوّنًا وعنصرًا مكتملًا مع وصف عربي ومكونات التركيب.
- **الخواص:** 36 خاصية مع عتبات التفعيل والأبطال.
- **معلومات الباتش:** نوتز البوت الرسمية لكل باتشات المجموعة 18 (18.1–18.4) — مين اتعمله باف ومين نيرف، مع فلترة حسب النوع وحسابات البوتشات السابقة وروابط للمصدر الرسمي، بالعربية والإنجليزية والاليابانية.
- **بحث شامل** (`⌘K` أو `/`) في الكومبوهات والأبطال والعناصر والخواص.
- تصميم داكن، خط Tajawal، دعم RTL كامل وشاشات صغيرة.

## التشغيل

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # فحص الأنواع + بناء الإنتاج
npm run smoke      # اختبار عرض الصفحات (SSR smoke test)
```

## البيانات

الأسماء والصور والقدرات العربية تُستخرج من CommunityDragon:

```
https://raw.communitydragon.org/latest/cdragon/tft/ar_ae.json
```

لتحديث البيانات والصور من جديد:

```bash
npm run fetch-data
```

يقوم السكربت بـ:

1. تنزيل بيانات المجموعة 18 بالعربية.
2. تصدير الأبطال والخواص والعناصر والتعزيزات إلى `src/data/*.json`.
3. تنزيل أيقونات الأبطال والعناصر والتعزيزات إلى `public/` وتحويلها إلى WebP خفيفة.

الكومبوهات نفسها تحريرية ومكتوبة في `src/data/comps.ts`، وليست إحصاءات رسمية.

### نوتز البوت

نوتز البوت تُجلب من مقالات Riot الرسمية (بثلاث لغات: `ar-ae` / `en-us` / `ja-jp`):

```bash
npm run fetch-patch-notes
```

يصدّر السكربت `src/data/patchnotes.json`: كل باتش من المجموعة الجارية مع أقسامه، وسميات «باف / نيرف / تعديل» محسوبة من مقارنة الأرقام قبل وبعد، ويربط كل تغيير بأيقونة البطل أو الخاصية أو العنصر أو التعزيز من بيانات الموقع. حدّثه بعد نزول باتش جديد.

## تطبيق الاوفرلاي (كمبيوتر)

نفس بيانات الموقع في تطبيق سطح مكتب شفاف بيقعد فوق اللعبة (Electron): اللوح والعناصر والخواص والتعزيزات وخطة اللعب، مع اقتراح أفضل كومبو حسب الوحدات اللي معاك واختصارات عامة شغالة جوه اللعبة.

```bash
cd overlay
npm install
npm start          # يبني الواجهة ويفتح الاوفرلاي
npm run dist:win   # ملف تثبيت NSIS + نسخة Portable
```

التفاصيل والاختصارات والمحدوديات في [`overlay/README.md`](overlay/README.md).

## النشر (GitHub + Cloudflare)

### 1) ارفع السورس على GitHub

```bash
git init
git add .
git commit -m "أكاديمية TFT — نسخة عربية"
git branch -M main
git remote add origin https://github.com/YOUR_USER/tft-academy-ar.git
git push -u origin main
```

أو ارفع الملفات من واجهة GitHub (Add file → Upload files) — عدا `node_modules/` و`dist/` (موجودين في `.gitignore`).

الملفات والمجلدات المطلوبة:

```
.github/workflows/deploy-cloudflare.yml
public/            (أيقونات + _redirects + خطوط + favicon)
scripts/           (fetch_data.py, fetch_patch_notes.py, smoke.tsx)
src/               (كل الكود والبيانات)
.gitignore
README.md
index.html
package.json
package-lock.json
tsconfig.json
vite.config.ts
```

### 2) اربط Cloudflare بالريبو

من Cloudflare Dashboard → **Workers & Pages** → انشاء مشروع → **Pages** → **Connect to Git** واختار الريو:

- Build command: `npm run build`
- Build output directory: `dist`

وكل push على `main` هينشور الموقع تلقائيًا.

**بديل بالأكشن:** لو عايز تفضل تنشر من GitHub Actions (الملف موجود: `.github/workflows/deploy-cloudflare.yml`) ضيف السررين في إعدادات الريبو (Settings → Secrets and variables → Actions):

| Secret | إزاي تحصل عليه |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | من صفحة الرئيسية في الداشبورد (العمود اليمين) |
| `CLOUDFLARE_API_TOKEN` | My Profile → API Tokens → Create Token → قالب "Cloudflare Pages: Edit" |

وفي Cloudflare اعمل مشروع Pages باسم `tft-academy-ar` الأول (أو غيّر `--project-name` في ملف الأكشن).

ملاحظة: مسار `_redirects` داخل `public/` بيخلي روابط زي `/tierlist/comps` تتحمّل صح عند الرفرش أو الدخول المباشر (SPA fallback) على Cloudflare Pages.

### 3) الدومين (بعدين)

بعد ما تتأكد إن كل حاجة شغالة: Cloudflare → الصفحة → **Custom domains** → أضف دومينك، ووجّه سجلات DNS للـ Pages.

## البنية

```
src/
  components/   الهيدر، الكارد، اللوح، البحث، الصور
  data/         بيانات JSON المولّدة + ملف الكومبوهات
  lib/          الأنواع، تحميل البيانات، تنسيق نصوص اللعبة، ألوان الخواص، توجّه تغييرات البوت
  pages/        الرئيسية، تفاصيل الكومب، الأبطال، العناصر، الخواص، المنشئ، معلومات الباتش
overlay/
  electron/     عملية Electron: نافذة شفافة فوق اللعبة، اختصارات عامة، Tray
  src/          واجهة الاوفرلاي (نفس بيانات الموقع من src/data)
  tests/        اختبارات حساب التوافق وهندسة النافذة
scripts/
  fetch_data.py          سكربت تحديث البيانات والصور
  fetch_patch_notes.py   سكربت تحديث نوتز البوت من موقع Riot
  smoke.tsx              اختبار عرض كل المسارات
```

## ملاحظات

- الموقع غير رسمي وغير تابع لـ Riot Games. Teamfight Tactics علامة مسجلة لـ Riot Games, Inc.
- لوحة اللعب تعتمد على مواضع تحريرية مبسطة وليست محاكاة دقيقة لتصادم الوحدات.
- البيانات المستخدمة للمجموعة 18 والباتش 18.4b.
