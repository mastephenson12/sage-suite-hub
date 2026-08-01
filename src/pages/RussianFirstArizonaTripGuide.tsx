import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Car,
  Clock,
  CloudSun,
  Compass,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/first-trip-with-kids';
const englishUrl = 'https://sage.healthandtravels.com/arizona/first-trip';
const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/primer-viaje-a-arizona-con-ninos';

const russianFaqs = [
  {
    question: 'Куда поехать в Аризоне в первый раз с детьми?',
    answer:
      'Для первой поездки лучше выбрать один понятный маршрут: Phoenix и Sedona, Phoenix и Payson, Flagstaff и Grand Canyon или Tucson с короткими прогулками. Главные фильтры: сезон, жара, время в дороге, туалеты, еда, вода и запасной план.',
  },
  {
    question: 'Сколько дней нужно для первой поездки по Аризоне?',
    answer:
      'На выходные лучше выбрать одну базу. На четыре или пять дней обычно удобно взять две базы. Если хочется Phoenix, Sedona, Flagstaff и Grand Canyon, лучше закладывать почти неделю, особенно с детьми.',
  },
  {
    question: 'Куда ехать летом, когда в Phoenix очень жарко?',
    answer:
      'Летом чаще всего комфортнее Flagstaff, Payson, Prescott, Show Low, Pinetop-Lakeside и Rim Country. В Phoenix и Sedona прогулки лучше делать очень рано утром, а середину дня отдавать тени, воде, еде или местам внутри.',
  },
  {
    question: 'Как сделать поездку проще для всей группы?',
    answer:
      'Планируйте день под самого уставшего или самого чувствительного к жаре человека в группе. Если маршрут подходит маленьким детям, гостям, бабушкам и дедушкам или людям, которые не хотят много идти пешком, он обычно лучше работает для всех.',
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

const tripTypes = [
  {
    icon: Baby,
    title: 'Семья с маленькими детьми',
    base: 'Phoenix, Prescott, Payson или Flagstaff',
    text:
      'Нужны короткие переезды, туалеты, простая еда, тень и возможность быстро закончить прогулку без драмы.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=toddlers&shade=true&bathrooms=true&food=nearby&drive=60&language=ru',
  },
  {
    icon: Users,
    title: 'Дети постарше',
    base: 'Sedona, Flagstaff, Payson или Grand Canyon',
    text:
      'Можно добавить больше видов и прогулок, но день все равно должен быть реалистичным: вода, перекусы, паузы и один главный план.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=hike&length=full-day&season=spring&ages=kids&shade=true&bathrooms=true&food=nearby&drive=180&language=ru',
  },
  {
    icon: Sparkles,
    title: 'Группа друзей',
    base: 'Sedona, Tucson, Prescott, Cottonwood или Jerome',
    text:
      'Лучше всего работает смесь красивых мест, еды, фотографий и гибкости, а не список из десяти остановок.',
    to: '/trip-builder?plan=ready&location=sedona&kids=no&group=friends&activity=explore&length=weekend&season=spring&shade=true&bathrooms=true&food=nearby&drive=180&language=ru',
  },
  {
    icon: ShieldCheck,
    title: 'Побег от жары',
    base: 'Flagstaff, Payson, Prescott, Show Low или Pinetop',
    text:
      'В жаркие месяцы выбирайте высоту, сосны, воду, тень и ранний старт, особенно если в группе есть дети.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=water&length=full-day&season=summer&shade=true&bathrooms=true&food=flexible&drive=120&language=ru',
  },
];

const starterRoutes = [
  {
    title: 'Классический первый маршрут',
    icon: Mountain,
    route: 'Phoenix + Sedona + Grand Canyon',
    bestFor: 'Первая поездка, знаковые виды, семейные фотографии',
    days: '4-6 дней',
    plan:
      'Используйте Phoenix как удобную точку прилета, Sedona для красных скал, а Grand Canyon для главного впечатления. С детьми оставьте между длинными переездами более спокойный день.',
    links: [
      ['Sedona', '/arizona/sedona'],
      ['Grand Canyon', '/archive/grand-canyon-family-adventure'],
      ['Из Phoenix на день', '/ru/arizona/day-trips-from-phoenix'],
    ],
  },
  {
    title: 'Легкий семейный уикенд',
    icon: Car,
    route: 'Phoenix + Prescott или Payson',
    bestFor: 'Маленькие дети, гости, первый выезд без перегруза',
    days: '2-3 дня',
    plan:
      'Выберите короткий переезд, одну главную активность, простую еду и место, где день все равно получится хорошим, даже если группа захочет идти меньше.',
    links: [
      ['Payson', '/arizona/payson-rim-country-with-kids'],
      ['Prescott', '/arizona/prescott'],
      ['План по ситуации', '/ru/arizona/plan-by-situation'],
    ],
  },
  {
    title: 'Прохладный летний маршрут',
    icon: Trees,
    route: 'Flagstaff + Payson + Rim Country',
    bestFor: 'Лето, сосны, озера, тень и отдых от жары',
    days: '2-5 дней',
    plan:
      'Ищите высоту, лес, озера, смотровые точки и тенистые прогулки. Не превращайте прохладную поездку в длинный день под открытым солнцем.',
    links: [
      ['Летние поездки', '/ru/arizona/cool-summer-trips-with-kids'],
      ['Flagstaff', '/archive/flagstaff-family-escape'],
      ['Payson', '/archive/payson-with-kids-woods-canyon-lake-mogollon-rim'],
    ],
  },
  {
    title: 'Еда, история и спокойные прогулки',
    icon: MapPin,
    route: 'Tucson + Cottonwood + Jerome или Bisbee',
    bestFor: 'Друзья, взрослые гости и смешанные группы',
    days: '3-5 дней',
    plan:
      'Выбирайте места, где можно гулять без спешки, легко поесть, сделать красивые остановки и оставить группе свободу по энергии.',
    links: [
      ['Tucson', '/arizona/tucson'],
      ['Cottonwood', '/arizona/cottonwood'],
      ['Bisbee', '/arizona/bisbee'],
    ],
  },
];

const seasonCards = [
  {
    season: 'Весна',
    icon: CloudSun,
    best: 'Sedona, Phoenix, Tucson, Prescott и Grand Canyon',
    watch: 'Весенние каникулы, полные парковки и слишком плотные планы.',
  },
  {
    season: 'Лето',
    icon: Sun,
    best: 'Flagstaff, Payson, Prescott, Show Low и Pinetop-Lakeside',
    watch: 'Опасная жара в пустыне, муссонные грозы и необходимость брать больше воды.',
  },
  {
    season: 'Осень',
    icon: Trees,
    best: 'Sedona, Flagstaff, Grand Canyon, Prescott и Tucson',
    watch: 'Короткие дни, прохладные вечера на севере и популярные выходные.',
  },
  {
    season: 'Зима',
    icon: CalendarDays,
    best: 'Phoenix, Tucson, Yuma, низкие тропы и Sedona со слоями одежды',
    watch: 'Снег, лед или закрытия дорог вокруг Flagstaff, Williams и Grand Canyon.',
  },
];

const mistakes = [
  {
    title: 'Планировать только по известным местам',
    fix: 'Сначала проверьте сезон, жару, дорогу, туалеты, еду, тень и энергию группы.',
  },
  {
    title: 'Пытаться увидеть все сразу',
    fix: 'На выходные лучше одна база. На четыре или пять дней обычно хватает двух баз.',
  },
  {
    title: 'Думать, что в Аризоне один климат',
    fix: 'Phoenix, Sedona, Payson, Flagstaff, Tucson и Grand Canyon могут ощущаться как разные поездки.',
  },
  {
    title: 'Идти по открытой тропе слишком поздно',
    fix: 'В теплые месяцы прогулки идут утром, а середина дня должна быть про тень, воду, еду или помещения.',
  },
  {
    title: 'Забыть про самого уставшего человека',
    fix: 'Если план подходит детям, гостям и людям, чувствительным к жаре, он обычно лучше для всех.',
  },
];

const quickPlanText = [
  'Идея для первой поездки по Аризоне:',
  '',
  'Выбираем маршрут по сезону и группе:',
  '- Классика: Phoenix + Sedona + Grand Canyon',
  '- Легко с детьми: Phoenix + Prescott или Payson',
  '- Летом прохладнее: Flagstaff, Payson или Rim Country',
  '- Друзья, еда и история: Tucson, Cottonwood, Jerome или Bisbee',
  '',
  'Правило Sage: одна главная активность, простая еда и запасной план.',
  '',
  'Гид: https://sage.healthandtravels.com/ru/arizona/first-trip-with-kids',
].join('\n');

const voteText = [
  'Какой первый маршрут по Аризоне выбираем?',
  '',
  '1. Классика: Phoenix + Sedona + Grand Canyon',
  '2. Легко с детьми: Prescott или Payson',
  '3. Прохладнее летом: Flagstaff или Rim Country',
  '4. Друзья, еда и история: Tucson, Cottonwood, Jerome или Bisbee',
  '',
  'Ответьте 1, 2, 3 или 4, и соберем план.',
  '',
  'https://sage.healthandtravels.com/ru/arizona/first-trip-with-kids',
].join('\n');

export default function RussianFirstArizonaTripGuide() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;

    document.documentElement.lang = 'ru';
    setAlternateLink('ru', russianUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('es', spanishUrl);
    setAlternateLink('x-default', englishUrl);

    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Первая поездка в Аризону с детьми | Семейный гид | Sage"
        description="Русскоязычный гид Sage для первой поездки по Аризоне с детьми, семьей или друзьями: Phoenix, Sedona, Flagstaff, Grand Canyon, Payson, Prescott, Tucson, жара, еда, туалеты и простой план."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'Первая поездка в Аризону', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/sedona-family.avif"
            alt="Семья изучает красные скалы в Sedona, Arizona"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/first-trip"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <Link
              to="/es/arizona/primer-viaje-a-arizona-con-ninos"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              Español
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Русский
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Гид для первого маршрута
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Первая поездка в Аризону с детьми
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            В первый раз не нужно пытаться увидеть всю Аризону. Лучше выбрать
            одну базу, одну главную активность в день, простую еду и запасной
            план на случай жары, усталости или перемены погоды.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=explore&length=weekend&season=spring&ages=mixed&shade=true&bathrooms=true&food=nearby&drive=180&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Создать первый план
            </Link>
            <Link
              to="/ru/arizona/plan-by-situation"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Планировать по ситуации
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Clock, label: 'Правило', value: 'Сначала одна база' },
            { icon: Users, label: 'Для кого', value: 'Семья и друзья' },
            { icon: Sun, label: 'Фильтр', value: 'Сезон и жара' },
            { icon: ShieldCheck, label: 'План', value: 'Еда, вода и вариант Б' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-emerald-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Начните с вашей группы
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Лучший первый маршрут зависит от того, кто едет
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {tripTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.title}
                to={type.to}
                className="group flex h-full flex-col rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black tracking-tight">{type.title}</h3>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                  {type.base}
                </p>
                <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600">{type.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-emerald-800">
                  Создать такой план
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
              Готовые направления
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Четыре простых варианта для первой поездки
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {starterRoutes.map((route) => {
              const Icon = route.icon;
              return (
                <article key={route.title} className="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                        {route.title}
                      </p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight">{route.route}</h3>
                    </div>
                  </div>

                  <div className="mb-5 grid gap-3 rounded-lg bg-zinc-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Кому подходит
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {route.bestFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                        Время
                      </p>
                      <p className="mt-1 text-sm font-bold leading-6 text-zinc-700">
                        {route.days}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-zinc-600">{route.plan}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {route.links.map(([label, to]) => (
                      <Link
                        key={to}
                        to={to}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-emerald-800 transition hover:bg-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Сезон решает многое
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            В Аризоне важно планировать по погоде
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {seasonCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.season} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="text-xl font-black tracking-tight">{card.season}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-zinc-800">{card.best}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{card.watch}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Частые ошибки
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Маленькие решения, которые спасают поездку
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
            {mistakes.map((row) => (
              <article
                key={row.title}
                className="grid gap-3 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[0.8fr_1.2fr]"
              >
                <h3 className="text-base font-black tracking-tight text-white">
                  {row.title}
                </h3>
                <p className="text-sm leading-7 text-emerald-50">{row.fix}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Отправьте этот гид семье или друзьям"
        description="Скопируйте короткий план или быстрый опрос, чтобы группа выбрала маршрут до того, как все начнут присылать разные идеи."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="russian_first_arizona_trip"
        locale="ru"
      />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
          Вопросы
        </p>
        <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
          Что важно знать перед первой поездкой
        </h2>
        <div className="mt-6 divide-y divide-zinc-100 rounded-lg border border-zinc-100">
          {russianFaqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="cursor-pointer text-base font-black text-zinc-950">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
