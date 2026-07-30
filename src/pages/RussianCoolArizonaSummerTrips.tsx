import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Car,
  CloudSun,
  Compass,
  Droplets,
  Mountain,
  ShieldCheck,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl =
  'https://sage.healthandtravels.com/ru/arizona/cool-summer-trips-with-kids';
const englishUrl =
  'https://sage.healthandtravels.com/arizona/cool-summer-trips-with-kids';
const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/viajes-frescos-verano-con-ninos';

const russianFaqs = [
  {
    question: 'Куда поехать в Аризоне летом с детьми, чтобы было прохладнее?',
    answer:
      'Хорошие варианты из Финикса: Пейсон и Моголлон-Рим, Флагстафф, Прескотт, Шоу-Лоу, Пайнтоп-Лейксайд, а также планы с озером, лесом, тенью или крытыми остановками.',
  },
  {
    question: 'Какие прохладные летние поездки подходят семьям из Финикса?',
    answer:
      'Пейсон, Прескотт и Флагстафф часто работают лучше всего. Хороший план включает одну главную активность утром, простую еду, тень или воду и запасной вариант на случай погоды.',
  },
  {
    question: 'Подходит ли Седона летом для поездки с детьми?',
    answer:
      'Седона может подойти, если выезжать очень рано, выбирать короткие маршруты, избегать открытых красных скал в середине дня и заранее планировать воду, еду и тень.',
  },
  {
    question: 'Как безопасно планировать летнюю поездку по Аризоне?',
    answer:
      'Планируйте активности на улице рано утром, избегайте открытых мест в середине дня, берите больше воды, проверяйте муссоны и дым, заранее ищите туалеты, тень и план Б.',
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
    title: 'Выходные в горах',
    icon: Mountain,
    text:
      'Лучший вариант, когда семье нужен действительно более прохладный воздух. Смотрите Флагстафф, Пейсон, Шоу-Лоу, Пайнтоп или Прескотт.',
    links: [
      ['Флагстафф', '/arizona/flagstaff'],
      ['Пейсон и Rim Country', '/arizona/payson-rim-country-with-kids'],
      ['Идеи на выходные', '/arizona/weekend-trips'],
    ],
  },
  {
    title: 'Озеро, сосны и вода',
    icon: Droplets,
    text:
      'Хорошо для детей, которым нужно двигаться, но не обязательно идти длинный маршрут. Сделайте воду, тень и перекусы центром плана.',
    links: [
      ['Pinetop-Lakeside', '/arizona/pinetop-lakeside'],
      ['Show Low', '/arizona/show-low'],
      ['Payson', '/arizona/payson'],
    ],
  },
  {
    title: 'Ранний старт, потом прохлада',
    icon: CloudSun,
    text:
      'Подходит для Финикса или Седоны, когда хочется приключения без борьбы с жарой. Улица утром, музей, еда или отдых днём.',
    links: [
      ['Phoenix с детьми в жару', '/archive/phoenix-things-to-do-with-kids-when-hot'],
      ['Безопасность в пустыне', '/arizona/desert-hiking-safety'],
      ['Маршруты с детьми', '/arizona/hikes-with-kids'],
    ],
  },
  {
    title: 'Поездка семьёй или с друзьями',
    icon: Users,
    text:
      'Работает, когда в группе разные возрасты и уровни энергии. Один красивый вид, простая еда, гибкая активность и меньше давления.',
    links: [
      ['Prescott', '/arizona/prescott'],
      ['Trip Builder', '/trip-builder'],
      ['Аризона по сезонам', '/arizona/family-adventures-by-season'],
    ],
  },
];

const destinationRows = [
  {
    place: 'Пейсон / Моголлон-Рим',
    bestFor: 'Сосны, озёра, виды с Rim и разумная дорога из Финикса',
    caution: 'Проверяйте муссоны, лесные дороги и толпы по выходным',
    to: '/arizona/payson-rim-country-with-kids',
  },
  {
    place: 'Флагстафф',
    bestFor: 'Более прохладный воздух, прогулочный центр, Lowell Observatory и лес',
    caution: 'Дальше для однодневной поездки; учитывайте высоту и грозы',
    to: '/arizona/flagstaff',
  },
  {
    place: 'Прескотт',
    bestFor: 'Озёра, площадь, простая еда и спокойный темп',
    caution: 'Днём всё ещё может быть жарко; ищите тень',
    to: '/arizona/prescott',
  },
  {
    place: 'Show Low / Pinetop-Lakeside',
    bestFor: 'Выходные в лесу, озёра и ощущение поездки в домик',
    caution: 'Лучше с ночёвкой, чем быстрый туда-обратно день',
    to: '/arizona/show-low',
  },
  {
    place: 'Седона',
    bestFor: 'Красные скалы, живописная дорога и короткие ранние остановки',
    caution: 'Красные камни сильно нагреваются; избегайте открытых маршрутов днём',
    to: '/arizona/sedona',
  },
  {
    place: 'Финикс: крытые места + вода',
    bestFor: 'Когда нельзя уехать из города, но нужен семейный план',
    caution: 'Любая активность на улице должна быть очень ранней, с тенью или водой',
    to: '/archive/phoenix-things-to-do-with-kids-when-hot',
  },
];

const safetyRules = [
  'Ставьте главную активность на улице до 10 утра, если день жаркий.',
  'Выбирайте одну главную остановку вместо дня из пяти маршрутов.',
  'Ищите еду с кондиционером, простые туалеты или настоящую тень.',
  'Проверяйте муссоны перед озёрами, смотровыми площадками, лесными дорогами и открытыми маршрутами.',
  'Берите воду даже туда, где прохладнее, чем в Финиксе.',
  'Назовите план Б до выезда, чтобы всем было проще спокойно перестроиться.',
];

const quickPlanText = [
  'Идея для прохладной летней поездки по Аризоне:',
  'Выбираем место с меньшей жарой, одну главную активность, простую еду и план Б.',
  '',
  'Варианты:',
  '- Пейсон / Моголлон-Рим: сосны, озёра и виды',
  '- Флагстафф: самый прохладный воздух и городская прогулка',
  '- Прескотт: озеро, площадь и спокойный темп',
  '- Show Low / Pinetop: выходные в лесу',
  '- Финикс: крытые места + вода, если нельзя уехать',
  '',
  'Правило: утром улица, днём кондиционер или тень, вечер гибкий.',
  'Гайд: https://sage.healthandtravels.com/ru/arizona/cool-summer-trips-with-kids',
].join('\n');

const voteText = [
  'Какую прохладную летнюю поездку по Аризоне выбираем?',
  '',
  '1. Пейсон / Моголлон-Рим',
  '2. Флагстафф',
  '3. Прескотт',
  '4. Show Low / Pinetop',
  '5. Финикс: крытые места + вода',
  '',
  'Ответьте номером, и соберём план.',
  'Гайд: https://sage.healthandtravels.com/ru/arizona/cool-summer-trips-with-kids',
].join('\n');

export default function RussianCoolArizonaSummerTrips() {
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
    <article className="min-h-screen bg-white pb-20 text-zinc-900">
      <SEOJsonLd
        title="Прохладные летние поездки по Аризоне с детьми | Sage"
        description="Русская страница Sage для семей, которые ищут прохладные летние поездки по Аризоне: Пейсон, Флагстафф, Прескотт, Шоу-Лоу, Пайнтоп, Седона утром и крытые планы в Финиксе."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'Прохладные летние поездки', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-sky-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Вид на сосны и горы в Rim Country рядом с Пейсоном"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/85 to-sky-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/cool-summer-trips-with-kids"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-sky-950"
            >
              English
            </Link>
            <Link
              to="/es/arizona/viajes-frescos-verano-con-ninos"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-sky-950"
            >
              Espanol
            </Link>
            <span className="rounded-full bg-cyan-300 px-4 py-2 text-sky-950">
              Русский
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200">
            Летний семейный гид по Аризоне
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Прохладные летние поездки по Аризоне с детьми
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-100 md:text-xl">
            Когда Финикс становится слишком жарким, задача не в том, чтобы
            сделать больше. Задача в том, чтобы выбрать умнее: подняться выше,
            выехать раньше, найти воду или спокойно поставить крытый план.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=cool-summer&length=weekend&season=summer&ages=mixed&shade=true&bathrooms=true&drive=180&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950 transition hover:bg-cyan-200"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Спланировать прохладную поездку
            </Link>
            <Link
              to="/arizona/payson-rim-country-with-kids"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Trees className="h-4 w-4" aria-hidden="true" />
              Начать с Пейсона
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-sky-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Car, label: 'Старт', value: 'Семьи из Финикса' },
            { icon: Mountain, label: 'Главная стратегия', value: 'Подняться выше' },
            { icon: Droplets, label: 'Перезагрузка для детей', value: 'Вода, тень, перекусы' },
            { icon: CalendarDays, label: 'Лучший темп', value: 'Утро на улице, день гибкий' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-lg border border-sky-100 bg-white p-4">
                <Icon className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                <p className="mt-2 text-sm font-black leading-6 text-zinc-950">{stat.value}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            Простое правило
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Подняться выше, выйти раньше или уйти в помещение
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Если летний план в Аризоне не делает хотя бы одну из этих трёх вещей,
            он, скорее всего, будет слишком тяжёлым для семьи.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {tripTypes.map((type) => {
            const Icon = type.icon;
            return (
              <article key={type.title} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                <Icon className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">{type.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{type.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {type.links.map(([label, to]) => (
                    <Link
                      key={to}
                      to={to}
                      className="rounded-full bg-sky-50 px-3 py-2 text-[11px] font-black uppercase tracking-wide text-sky-800 transition hover:bg-sky-100"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Сравнить направления
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Куда ехать, когда в Финиксе слишком жарко
            </h2>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            {destinationRows.map((row) => (
              <Link
                key={row.place}
                to={row.to}
                className="grid gap-3 border-b border-zinc-100 p-5 transition last:border-b-0 hover:bg-sky-50 md:grid-cols-[0.8fr_1.2fr_1fr]"
              >
                <p className="text-lg font-black text-zinc-950">{row.place}</p>
                <p className="text-sm leading-6 text-zinc-600">{row.bestFor}</p>
                <p className="text-sm leading-6 text-zinc-500">{row.caution}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            Летняя безопасность
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Правила, которые сохраняют день спокойным
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            Более прохладное направление помогает, но не заменяет проверку погоды,
            воды, туалетов, тени и реального темпа.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
          <ShieldCheck className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
          <ul className="space-y-3">
            {safetyRules.map((rule) => (
              <li key={rule} className="flex gap-3 text-sm leading-7 text-zinc-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SharePlanPanel
        title="Отправить голосование за прохладную поездку"
        description="Скопируйте простой план или отправьте голосование группе, чтобы идея стала реальной поездкой."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="russian_cool_arizona_summer_trips_with_kids"
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Продолжить планирование
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Связанные гиды
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['English version', '/arizona/cool-summer-trips-with-kids'],
              ['Version en espanol', '/es/arizona/viajes-frescos-verano-con-ninos'],
              ['Пейсон и Rim Country с детьми', '/arizona/payson-rim-country-with-kids'],
              ['Финикс с детьми в жару', '/archive/phoenix-things-to-do-with-kids-when-hot'],
              ['Выходные поездки по Аризоне', '/arizona/weekend-trips'],
              ['Безопасность в пустыне', '/arizona/desert-hiking-safety'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black uppercase tracking-wide text-zinc-800 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
            FAQ
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            Вопросы о прохладных летних поездках по Аризоне
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
        </div>
      </section>
    </article>
  );
}
