import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock3, Compass, Droplets, MapPin, ShieldCheck, Sun, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/papago-park-with-kids';
const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/papago-park-con-ninos';
const englishUrl = 'https://sage.healthandtravels.com/trail-guides/papago-park';

const faqs = [
  { question: 'Подходит ли Папаго-парк для прогулки с детьми?', answer: 'Да, если считать его короткой открытой прогулкой по пустыне. Hole-in-the-Rock быстро даёт красивый вид, но неровная скала, открытые участки и отсутствие тени требуют постоянного контроля взрослых.' },
  { question: 'Когда лучше приезжать?', answer: 'Раннее утро обычно прохладнее и спокойнее. Перед выездом проверьте почасовой прогноз и актуальные сообщения парка.' },
  { question: 'Есть ли парковка и туалеты?', answer: 'В районе Папаго-парка есть парковки и сервисы, но не стоит обещать детям туалет прямо у начала прогулки. Найдите подходящий туалет сразу после прибытия.' },
  { question: 'Можно ли в тот же день посетить Phoenix Zoo?', answer: 'Да, но лучше выбрать главным занятием Hole-in-the-Rock или Phoenix Zoo. Вторую остановку оставьте необязательной и решайте после отдыха, воды и оценки семейных сил.' },
];

function setAlternateLink(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

const versions = [
  { icon: Users, title: 'Очень короткий визит', best: 'Маленькие дети или первая прогулка', text: 'Фотографии, небольшой участок тропы и разворот до того, как жара или неровная скала испортят впечатление.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=ru' },
  { icon: Compass, title: 'Hole-in-the-Rock', best: 'Семьи, уверенные на неровной поверхности', text: 'Идите вместе к отверстию только если погода, опора и контроль детей подходят всей группе.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=hike&length=half-day&shade=false&bathrooms=true&language=ru' },
  { icon: MapPin, title: 'Папаго + ещё одна остановка', best: 'Прохладное утро и достаточно сил', text: 'Сначала отдохните в машине, а потом выберите Phoenix Zoo, еду, сад или занятие в помещении.', to: '/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=full-day&shade=false&bathrooms=true&language=ru' },
];

const checks = [
  'Проверить почасовой прогноз и сообщения парка.',
  'Приехать рано и сохранить место машины.',
  'Взять воду, защиту от солнца и знакомый перекус.',
  'Найти туалет до начала прогулки.',
  'На скале взрослый остаётся рядом с каждым ребёнком.',
  'Заранее назначить время или сигнал для разворота.',
];

const quickPlanText = [
  'Папаго-парк с детьми — простой план:',
  '1. Проверить почасовую погоду и приехать рано',
  '2. Найти туалет, взять воду и защиту от солнца',
  '3. Hole-in-the-Rock — единственная обязательная цель',
  '4. Вернуться к машине до общей усталости',
  '5. После отдыха решить: Phoenix Zoo, еда или домой',
  '',
  'Правило: одна прогулка, один перерыв, один запасной вариант.',
  russianUrl,
].join('\n');

const voteText = [
  'Какой вариант Папаго-парка выбираем?',
  '',
  '1. Только фотографии и короткая прогулка',
  '2. Hole-in-the-Rock и ранний отъезд',
  '3. Hole-in-the-Rock + Phoenix Zoo, если хватит сил',
  '4. Перенести прогулку и выбрать место в помещении',
  '',
  'Ответьте номером — соберём день без перегруза.',
  russianUrl,
].join('\n');

export default function RussianPapagoParkWithKids() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = 'ru';
    setAlternateLink('ru', russianUrl);
    setAlternateLink('es', spanishUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('x-default', englishUrl);
    return () => { document.documentElement.lang = previousLang || 'en'; };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd title="Папаго-парк с детьми | Семейный план в Финиксе | Sage" description="Русский план Папаго-парка с детьми: Hole-in-the-Rock, жара, парковка, туалеты, Phoenix Zoo, контроль детей и простой семейный маршрут." url={russianUrl} faqs={faqs} breadcrumbs={[{ name: 'Sage', url: 'https://sage.healthandtravels.com/' }, { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' }, { name: 'Папаго-парк с детьми', url: russianUrl }]} />

      <section className="relative overflow-hidden bg-orange-950 px-6 py-16 text-white md:py-24">
        <img src="/images/papago-hole-in-the-rock-family-trail.avif" alt="Семьи у Hole-in-the-Rock в Папаго-парке" className="absolute inset-0 h-full w-full object-cover opacity-45" width="1800" height="1350" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950 via-orange-950/90 to-orange-950/35" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]"><Link to="/trail-guides/papago-park" className="rounded-full border border-white/30 px-4 py-2 text-white/80 hover:bg-white hover:text-orange-950">English</Link><Link to="/es/arizona/papago-park-con-ninos" className="rounded-full border border-white/30 px-4 py-2 text-white/80 hover:bg-white hover:text-orange-950">Español</Link><span className="rounded-full bg-amber-200 px-4 py-2 text-orange-950">Русский</span></div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-amber-200">Семейный план в Финиксе</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Папаго-парк с детьми</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-orange-50 md:text-xl">Выберите короткий визит, Hole-in-the-Rock или утро с необязательной второй остановкой. Sage учитывает возраст, жару, туалеты и реальные силы семьи.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=ru" className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-orange-950 hover:bg-amber-100"><Compass className="h-4 w-4" /> Составить план</Link><a href="https://healthandtravels.com/ru/papago-park-s-detmi?utm_source=sage&utm_medium=cta&utm_campaign=papago_ru" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white hover:bg-white/10"><MapPin className="h-4 w-4" /> Читать полный гид</a></div>
        </div>
      </section>

      <section className="border-b border-amber-100 bg-amber-50 px-6 py-10"><div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">{[
        [Clock3, 'Продолжительность', '60–90 минут для простого визита'],
        [Sun, 'Тень', 'На тропе и скале почти отсутствует'],
        [Car, 'Прибытие', 'Рано: меньше жары и парковочного стресса'],
        [Droplets, 'Вода', 'Берите с собой из машины'],
      ].map(([Icon, label, value]) => { const StatIcon = Icon as typeof Clock3; return <article key={label as string} className="rounded-xl border border-amber-100 bg-white p-4"><StatIcon className="mb-3 h-5 w-5 text-orange-700" /><p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{label as string}</p><p className="mt-2 text-sm font-black leading-6">{value as string}</p></article>; })}</div></section>

      <section className="px-6 py-14"><div className="mx-auto max-w-6xl"><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">Выберите свой вариант</p><h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Прогулка для вашей реальной семьи</h2><div className="mt-8 grid gap-4 lg:grid-cols-3">{versions.map((version) => { const Icon = version.icon; return <Link key={version.title} to={version.to} className="flex h-full flex-col rounded-xl border border-zinc-100 p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"><Icon className="mb-4 h-6 w-6 text-orange-700" /><h3 className="text-xl font-black">{version.title}</h3><p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs font-black uppercase tracking-wide text-orange-800">{version.best}</p><p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{version.text}</p></Link>; })}</div></div></section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-700">До прогулки</p><h2 className="text-3xl font-black uppercase tracking-tight">Семейная проверка</h2><ul className="mt-6 space-y-3">{checks.map((item) => <li key={item} className="flex gap-3 rounded-lg border border-zinc-100 bg-white p-4 text-sm leading-6 text-zinc-700"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />{item}</li>)}</ul></div><div className="rounded-xl bg-orange-950 p-7 text-white"><Sun className="h-8 w-8 text-amber-200" /><h2 className="mt-5 text-2xl font-black">Жара решает</h2><p className="mt-4 leading-7 text-orange-50">Короткое расстояние не отменяет риск. Скала и парковка отражают тепло, тени мало, и даже короткий визит быстро становится неподходящим.</p><p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-orange-50"><strong>Правило Sage:</strong> при головокружении, тошноте, головной боли, необычной слабости, спутанности сознания или нарушении координации завершите прогулку и обратитесь за подходящей помощью.</p></div></div></section>

      <SharePlanPanel title="Отправить план семье" description="Скопируйте короткий план или настоящее голосование, чтобы группа заранее выбрала подходящий вариант." quickPlanText={quickPlanText} voteText={voteText} eventContext="russian_papago_park_with_kids" locale="ru" />

      <section className="px-6 py-14"><div className="mx-auto max-w-4xl"><h2 className="text-3xl font-black uppercase tracking-tight">Частые вопросы</h2><div className="mt-7 space-y-4">{faqs.map((faq) => <article key={faq.question} className="rounded-xl border border-zinc-100 p-5"><h3 className="font-black">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p></article>)}</div></div></section>

      <section className="bg-orange-950 px-6 py-14 text-white"><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-black uppercase tracking-tight">Превратите идею в план</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-orange-50">Начните с Папаго-парка и настройте длительность, возраст, туалеты, жару и семейный темп в Trip Builder.</p><Link to="/trip-builder?plan=ready&location=papago-park&kids=yes&group=family&activity=explore&length=half-day&shade=false&bathrooms=true&language=ru" className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-200 px-7 py-3 text-sm font-black uppercase tracking-wide text-orange-950"><Compass className="h-4 w-4" /> Открыть Trip Builder</Link></div></section>
    </main>
  );
}
