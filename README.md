# MokaTroy — نسخة عربية

موقع عربي كامل (RTL) مبني بأسلوب أدلة الميتا الحديثة: قائمة مستويات للكومبوهات، صفحات تفصيلية لكل كومبو مع لوح اللعب والعناصر والتعزيزات وخطة الترقيم، بالإضافة إلى صفحات الأبطال والعناصر والخواص.

## المزايا

- **قائمة مستويات** S/A/B/C مع تصفية فورية و11 كومبوًا لكل مجموعة 18.
- **تفاصيل الكومب:** لوح 7×4، نجوم الوحدات، العناصر حسب الوحدة، الخواص المفعّلة وعتباتها، التعزيزات المفضلة، خطة اللعب، نصائح وبدائل.
- **الأبطال:** بحث وتصفية حسب التكلفة والخاصية، ونافذة تفاصيل بالقدرة والإحصاءات والعناصر المقترحة.
- **العناصر:** 44 مكوّنًا وعنصرًا مكتملًا مع وصف عربي ومكونات التركيب.
- **الخواص:** 36 خاصية مع عتبات التفعيل والأبطال.
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

## النشر (GitHub + Cloudflare)

### 1) ارفع السورس على GitHub

```bash
git init
git add .
git commit -m "MokaTroy — نسخة عربية"
git branch -M main
git remote add origin https://github.com/YOUR_USER/mokatroytft.git
git push -u origin main
```

أو ارفع الملفات من واجهة GitHub (Add file → Upload files) — عدا `node_modules/` و`dist/` (موجودين في `.gitignore`).

الملفات والمجلدات المطلوبة:

```
.github/workflows/deploy-cloudflare.yml
public/            (أيقونات + _redirects + خطوط + favicon)
scripts/           (fetch_data.py, smoke.tsx)
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

وفي Cloudflare اعمل مشروع Pages باسم `mokatroytft` الأول (أو غيّر `--project-name` في ملف الأكشن).

ملاحظة: مسار `_redirects` داخل `public/` بيخلي روابط زي `/tierlist/comps` تتحمّل صح عند الرفرش أو الدخول المباشر (SPA fallback) على Cloudflare Pages.

### 3) الدومين (بعدين)

بعد ما تتأكد إن كل حاجة شغالة: Cloudflare → الصفحة → **Custom domains** → أضف دومينك، ووجّه سجلات DNS للـ Pages.

## البنية

```
src/
  components/   الهيدر، الكارد، اللوح، البحث، الصور
  data/         بيانات JSON المولّدة + ملف الكومبوهات
  lib/          الأنواع، تحميل البيانات، تنسيق نصوص اللعبة، ألوان الخواص
  pages/        الرئيسية، تفاصيل الكومب، الأبطال، العناصر، الخواص
scripts/
  fetch_data.py سكربت تحديث البيانات والصور
  smoke.tsx     اختبار عرض كل المسارات
```

## ملاحظات

- الموقع غير رسمي وغير تابع لـ Riot Games. Teamfight Tactics علامة مسجلة لـ Riot Games, Inc.
- لوحة اللعب تعتمد على مواضع تحريرية مبسطة وليست محاكاة دقيقة لتصادم الوحدات.
- البيانات المستخدمة للمجموعة 18 والباتش 18.4b.
