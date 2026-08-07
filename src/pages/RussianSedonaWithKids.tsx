import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  Car,
  CloudRain,
  Compass,
  Droplets,
  ExternalLink,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/sedona-with-kids';
const englishUrl = 'https://sage.healthandtravels.com/arizona/sedona';
const spanishUrl = 'https://sage.healthandtravels.com/es/arizona/sedona-con-ninos';

const russianFaqs = [
  {
    question: 'Подходит ли Седона для поездки с детьми?',
    answer:
      'Да. В Седоне есть красные скалы, маршруты разной сложности, парки и живописные дороги. Для семьи лучше всего выбрать одну главную прогулку, простую остановку на еду и оставить время на отдых.',
  },
  {
    question: 'Какие маршруты в Седоне подходят детям?',
    answer:
      'Всё зависит от возраста, опыта и погоды. Bell Rock Pathway позволяет легко менять дистанцию, Little Horse даёт красивые виды без обязательного подъёма на вершину, а по Soldier Pass можно пройти только часть пути. Cathedral Rock и Devil’s Bridge требуют больше опыта и осторожности рядом с открытыми краями.',
  },
  {
    question: 'Как работает Sedona Shuttle?',
    answer:
      'Трансфер к популярным тропам бесплатный, бронирование не требуется. Обычно он работает круглый год с четверга по воскресенье, а в некоторые праздники и сезоны — чаще. Он обслуживает Cathedral Rock, Little Horse, Soldier Pass, Dry Creek Vista и Mescal. Перед поездкой обязательно проверьте официальный календарь.',
  },
  {
    question: 'Нужен ли Red Rock Pass в Седоне?',
    answer:
      'На некоторых рекреационных участках и парковках Coconino National Forest нужен пропуск, но у других мест могут быть отдельные сборы или правила. Проверяйте конкретную точку заранее и не рассчитывайте, что один пропуск действует везде.',
  },
  {
    question: 'Когда лучше гулять по Седоне с детьми?',
    answer:
      'Обычно лучше выходить утром. В жаркие месяцы начинайте очень рано и избегайте открытых скал в середине дня. В сезон муссонов следите за прогнозом, грозами, молниями и риском внезапных паводков.',
  },
];

function setAlternateLink(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${hreflang}"]`
  );

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

const quickStats = [
  { icon: Car, label: 'Из Финикса', value: 'Около 2 часов без сильного трафика' },
  { icon: Users, label: 'Для кого', value: 'Семьи, гости и небольшие группы' },
  { icon: Bus, label: 'Shuttle', value: 'Бесплатно; проверьте дни и маршруты' },
  { icon: CloudRain, label: 'Важно', value: 'Жара, муссоны, толпы и обрывы' },
];

const familyPlans = [
  {
    title: 'Первая поездка без перегруза',
    bestFor: 'Маленькие дети, старшие родственники, мало опыта',
    plan:
      'Начните утром с Bell Rock Pathway или смотровой остановки. Пообедайте до сильной жары, а после оставьте Tlaquepaque, парк, живописную дорогу или отдых.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=ru',
  },
  {
    title: 'Красные скалы на shuttle',
    bestFor: 'Дети постарше, которые уверенно ходят',
    plan:
      'Оставьте машину на правильной Park & Ride, затем выберите Little Horse, Soldier Pass или другой подходящий маршрут. До выхода узнайте время последнего обратного автобуса.',
    to: 'https://sedonashuttle.com/trailhead-shuttles/',
    external: true,
  },
  {
    title: 'Семейные выходные',
    bestFor: 'Меньше спешки и запас на погоду',
    plan:
      'День первый: короткая прогулка и еда. День второй: живописная дорога, город, парк или ещё одна ранняя прогулка. Не пытайтесь заполнить каждую минуту.',
    to: '/ru/arizona/first-trip-with-kids',
  },
];

const outingIdeas = [
  {
    title: 'Bell Rock Pathway',
    icon: Mountain,
    level: 'Гибкая дистанция',
    text:
      'Можно пройти ровно столько, сколько подходит вашей семье. Чтобы увидеть красивые виды, не обязательно карабкаться по крутым скалам.',
  },
  {
    title: 'Little Horse',
    icon: MapPin,
    level: 'Активные семьи',
    text:
      'В дни работы сюда идёт shuttle. Виды появляются быстро, но разворачивайтесь до того, как жара или усталость начнут управлять днём.',
  },
  {
    title: 'Часть Soldier Pass',
    icon: Compass,
    level: 'Дети постарше',
    text:
      'Можно увидеть Devil’s Kitchen и Seven Sacred Pools, не проходя весь маршрут. В дни работы shuttle используйте его вместо поиска парковки.',
  },
  {
    title: 'Oak Creek и тень',
    icon: Droplets,
    level: 'Спокойный вариант',
    text:
      'Пикник или остановка у воды помогают снизить темп. Заранее проверьте сборы, парковку, течение, качество воды и риск внезапного паводка.',
  },
];

const safetyChecks = [
  'Перед выездом проверьте официальный прогноз, закрытия маршрутов и дым.',
  'Начинайте рано: открытые скалы быстро нагреваются и почти не дают тени.',
  'У каждого должна быть вода; добавьте солёные перекусы и защиту от солнца.',
  'Не позволяйте детям бегать рядом с обрывами, slickrock и местами возможного падения.',
  'Во время муссона уходите от русел и поднимайтесь выше, если вода начинает прибывать.',
  'Сохраните карту офлайн и заранее узнайте время последнего shuttle обратно.',
];

const quickPlanText = [
  'Простой семейный план для Седоны:',
  '',
  '1. Проверить прогноз, shuttle и парковку',
  '2. Выйти рано на одну главную прогулку',
  '3. Взять воду, перекусы и защиту от солнца',
  '4. Поесть и отдохнуть до общей усталости',
  '5. Оставить вариант Б: парк, город, живописная дорога или ранний отъезд',
  '',
  'Правило Sage: одна прогулка, одна еда и запасной план.',
  `Гид: ${russianUrl}`,
].join('\n');

const voteText = [
  'Что делаем в Седоне?',
  '',
  '1. Bell Rock в своём темпе',
  '2. Little Horse на shuttle',
  '3. Часть Soldier Pass с детьми постарше',
  '4. Виды, еда и спокойный день',
  '',
  'Ответьте номером, и мы соберём план.',
  `Гид: ${russianUrl}`,
].join('\n');

export default function RussianSedonaWithKids() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;

    document.documentElement.lang = 'ru';
    setAlternateLink('ru', russianUrl);
    setAlternateLink('es', spanishUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('x-default', englishUrl);

    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Седона с детьми | Семейные маршруты и shuttle | Sage"
        description="Русскоязычный гид по Седоне с детьми: семейные маршруты, бесплатный shuttle, парковка, жара, муссоны, пропуска, безопасность и простой план поездки."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'Седона с детьми', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-55">
          <img
            src="/images/sedona-family.avif"
            alt="Семья смотрит на красные скалы Седоны в Аризоне"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/25" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link to="/arizona/sedona" className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950">English</Link>
            <Link to="/es/arizona/sedona-con-ninos" className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-slate-950">Español</Link>
            <span className="rounded-full bg-teal-100 px-4 py-2 text-teal-950">Русский</span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-teal-200">Семейный гид по красным скалам</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Седона с детьми</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
            Маршруты, shuttle, парковка и безопасность — чтобы семья увидела красные
            скалы без гонки, перегрева и логистического хаоса.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=ru" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-blue-800">
              <Compass className="h-4 w-4" aria-hidden="true" /> Составить план
            </Link>
            <a href="https://sedonashuttle.com/trailhead-shuttles/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10">
              <Bus className="h-4 w-4" aria-hidden="true" /> Проверить shuttle
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-teal-100 bg-teal-50/60 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-xl border border-teal-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-teal-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Выберите темп</p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Три способа увидеть Седону</h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">Лучший план зависит не от количества остановок, а от возраста, опыта и энергии вашей группы.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {familyPlans.map((mode) => {
              const content = (
                <>
                  <h3 className="text-xl font-black tracking-tight text-zinc-950">{mode.title}</h3>
                  <p className="mt-3 rounded-lg bg-teal-50 p-3 text-xs font-black uppercase tracking-wide text-teal-800">{mode.bestFor}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">{mode.plan}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700">Открыть {mode.external && <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}</span>
                </>
              );

              return mode.external ? (
                <a key={mode.title} href={mode.to} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">{content}</a>
              ) : (
                <Link key={mode.title} to={mode.to} className="flex h-full flex-col rounded-xl border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">{content}</Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-teal-100 bg-teal-50/60 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-4xl">Выберите одну главную прогулку</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {outingIdeas.map((outing) => {
              const Icon = outing.icon;
              return (
                <article key={outing.title} className="rounded-xl border border-teal-100 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-teal-700" aria-hidden="true" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-black tracking-tight">{outing.title}</h3>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-teal-800">{outing.level}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{outing.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-teal-700">Местная безопасность</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">До выхода из машины</h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">Город рядом, но местность остаётся пустынной: открытые скалы, жара и быстро меняющаяся погода.</p>
          </div>
          <div className="grid gap-3">
            {safetyChecks.map((check) => (
              <div key={check} className="flex gap-3 rounded-xl border border-zinc-100 bg-white p-4">
                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-teal-700" aria-hidden="true" />
                <p className="text-sm leading-7 text-zinc-700">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Shuttle, парковка и пропуска</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">В дни работы shuttle парковка у некоторых trailheads ограничена. Не стройте план на надежде найти свободное место.</p>
          </div>
          <div className="space-y-4 text-sm leading-7 text-zinc-200">
            <p>Shuttle бесплатный и не требует бронирования. Проверьте Park &amp; Ride, маршрут, календарь и последний обратный рейс.</p>
            <p>Среди остановок: Cathedral Rock, Little Horse, Soldier Pass, Dry Creek Vista и Mescal.</p>
            <p>Правила сборов и пропусков зависят от места. Проверяйте каждую точку напрямую.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://sedonashuttle.com/how-to-ride/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-700 px-5 py-2.5 font-black text-white transition hover:bg-blue-800">Как пользоваться shuttle</a>
              <a href="https://www.fs.usda.gov/r03/coconino/recreation/trails" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-5 py-2.5 font-black text-white transition hover:bg-white/10">Coconino National Forest</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <SharePlanPanel title="Поделиться планом Седоны" description="Отправьте короткую версию группе и выберите темп заранее." quickPlanText={quickPlanText} voteText={voteText} eventContext="russian_sedona_with_kids" locale="ru" />
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black uppercase tracking-tight">Следующие полезные гиды</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ['Аризона на русском', '/ru'],
              ['Поездки по ситуации', '/ru/arizona/plan-by-situation'],
              ['Маршруты с детьми', '/ru/arizona/hikes-with-kids'],
              ['Поездки из Финикса', '/ru/arizona/day-trips-from-phoenix'],
              ['Седона на испанском', '/es/arizona/sedona-con-ninos'],
              ['Создать план в Sage', '/trip-builder?language=ru&location=sedona'],
            ].map(([label, to]) => (
              <Link key={to} to={to} className="rounded-xl border border-zinc-100 bg-white p-4 text-sm font-black text-zinc-800 transition hover:border-teal-200 hover:text-teal-700">{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
