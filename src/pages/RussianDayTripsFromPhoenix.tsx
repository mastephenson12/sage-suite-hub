import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl =
  'https://sage.healthandtravels.com/ru/arizona/day-trips-from-phoenix';
const englishUrl = 'https://sage.healthandtravels.com/arizona/day-trips-from-phoenix';
const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/viajes-de-un-dia-desde-phoenix';

const russianFaqs = [
  {
    question: 'Куда поехать из Финикса на один день с детьми?',
    answer:
      'Хорошие варианты для семейной поездки на один день из Финикса: Cave Creek, Papago Park, Scottsdale, Payson, Prescott, Cottonwood, Sedona, Tucson и Flagstaff, если погода, туалеты, еда и время в дороге подходят вашей группе.',
  },
  {
    question: 'Куда уехать из жары Финикса на один день?',
    answer:
      'Летом лучше выбирать места выше по высоте или с водой, тенью и соснами: Payson, Prescott, Flagstaff, Show Low, Pinetop-Lakeside или планы с ранним стартом и дневным отдыхом в помещении.',
  },
  {
    question: 'Сколько времени в дороге нормально для семейной поездки?',
    answer:
      'Для большинства семей самый комфортный диапазон - до двух часов в одну сторону. Sedona, Flagstaff и Tucson возможны, но день должен быть простым: одна главная остановка, еда и запасной вариант.',
  },
  {
    question: 'Как сделать поездку проще для группы друзей или нескольких семей?',
    answer:
      'Сначала выберите одну главную цель, затем добавьте простую еду, туалеты, воду и план Б. Не пытайтесь вместить пять остановок в один день.',
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

const driveBands = [
  {
    label: 'До 1 часа',
    icon: Clock,
    title: 'Короткий выезд без большого дня',
    bestFor: 'Маленькие дети, гости, свободное утро',
    destinations: ['Cave Creek', 'Papago Park', 'Desert Botanical Garden', 'Scottsdale'],
    note:
      'Хорошо, когда нужны виды, прогулка, завтрак или обед, но без долгой дороги.',
  },
  {
    label: '1-2 часа',
    icon: Trees,
    title: 'Самый удобный диапазон для семьи',
    bestFor: 'Сосны, озера, простая еда и меньше жары',
    destinations: ['Payson', 'Prescott', 'Cottonwood', 'Tonto Natural Bridge'],
    note:
      'Обычно это лучший баланс: поездка ощущается как приключение, но дорога не забирает весь день.',
  },
  {
    label: '2-3 часа',
    icon: Mountain,
    title: 'Большие виды, но простой план',
    bestFor: 'Фотографии, гости, подростки, группы с энергией',
    destinations: ['Sedona', 'Flagstaff', 'Tucson'],
    note:
      'Выбирайте одну главную активность и один понятный перерыв на еду.',
  },
  {
    label: 'Лучше с ночевкой',
    icon: Car,
    title: 'Когда место заслуживает больше времени',
    bestFor: 'Grand Canyon, Page, Show Low, Pinetop-Lakeside',
    destinations: ['Grand Canyon', 'Page', 'Show Low', 'Pinetop-Lakeside'],
    note:
      'Можно ехать туда-обратно, но с ночевкой почти всегда спокойнее и безопаснее.',
  },
];

const seasonalRules = [
  {
    season: 'Зима',
    icon: Sun,
    text:
      'Низкая пустыня, Phoenix, Cave Creek, Scottsdale и Tucson часто удобнее. Для Flagstaff и Grand Canyon проверяйте снег и дорогу.',
  },
  {
    season: 'Весна',
    icon: MapPin,
    text:
      'Sedona, Tucson, Prescott, Cottonwood и Cave Creek особенно хороши. По выходным выезжайте рано.',
  },
  {
    season: 'Лето',
    icon: Droplets,
    text:
      'Ищите высоту, сосны, воду и тень: Payson, Flagstaff, Prescott, Show Low и Pinetop. В Phoenix и Sedona прогулки только очень рано.',
  },
  {
    season: 'Осень',
    icon: Trees,
    text:
      'Prescott, Sedona, Payson, Cottonwood и Tucson хорошо работают для семей и групп друзей.',
  },
];

const starterPlans = [
  {
    title: 'Короткое утро с гостями',
    route: 'Papago Park, Scottsdale или Cave Creek',
    bestFor: 'Мало времени, маленькие дети, первая поездка',
    steps: ['Выехать рано', 'Сделать короткую прогулку или видовую остановку', 'Закончить завтраком или обедом'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=visitors&activity=relax&length=half-day&season=winter&shade=true&bathrooms=true&language=ru',
  },
  {
    title: 'Прохладный день в Payson',
    route: 'Payson, Mogollon Rim или Woods Canyon Lake',
    bestFor: 'Лето, жара в Phoenix, дети которым надо двигаться',
    steps: ['Подняться выше по высоте', 'Выбрать озеро, лес или видовую точку', 'Оставить еду как спокойный перерыв'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&shade=true&bathrooms=true&language=ru',
  },
  {
    title: 'Sedona без перегруза',
    route: 'Один вид, короткая прогулка и еда',
    bestFor: 'Фотографии, гости, дети постарше',
    steps: ['Приехать рано', 'Выбрать один главный маршрут', 'Сохранить силы на еду и дорогу домой'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=ru',
  },
];

const safetyChecks = [
  'Проверьте прогноз: жара, ветер, муссон, снег или дым могут поменять план.',
  'Главную прогулку ставьте утром, а середину дня держите гибкой.',
  'Найдите туалеты, воду и еду до того, как пообещаете план группе.',
  'Выберите одну главную остановку вместо пяти маленьких.',
  'Имейте план Б: помещение, тень, более короткий маршрут или ранний возврат.',
];

const quickPlanText = [
  'Идея поездки на один день из Phoenix:',
  '',
  'Выбираем по времени в дороге:',
  '- До 1 часа: Cave Creek, Papago Park, Scottsdale',
  '- 1-2 часа: Payson, Prescott, Cottonwood',
  '- 2-3 часа: Sedona, Flagstaff, Tucson',
  '',
  'Правило Sage: одна главная остановка, простая еда и запасной план.',
  `Гайд: ${russianUrl}`,
].join('\n');

const voteText = [
  'Куда едем на один день из Phoenix?',
  '',
  '1. Коротко и легко: Cave Creek, Papago Park или Scottsdale',
  '2. Прохладнее: Payson, Prescott или Flagstaff',
  '3. Большие виды: Sedona или Tucson',
  '',
  'Ответьте номером, и соберем план.',
  `Гайд: ${russianUrl}`,
].join('\n');

export default function RussianDayTripsFromPhoenix() {
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
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Поездки на один день из Phoenix с детьми | Sage"
        description="Русская страница Sage для семейных поездок на один день из Phoenix: Payson, Sedona, Flagstaff, Prescott, Tucson, жара, дорога, еда, туалеты и запасной план."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'Поездки на один день из Phoenix', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-sky-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Сосны и горный вид в Аризоне для поездки на один день из Phoenix"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/90 to-sky-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/day-trips-from-phoenix"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-sky-950"
            >
              English
            </Link>
            <Link
              to="/es/arizona/viajes-de-un-dia-desde-phoenix"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-sky-950"
            >
              Espanol
            </Link>
            <span className="rounded-full bg-sky-200 px-4 py-2 text-sky-950">
              Русский
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-sky-200">
            Гид из Phoenix
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Поездки на один день из Phoenix с детьми
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50 md:text-xl">
            Хороший семейный день в Аризоне начинается не с самого известного
            места, а с правильного расстояния, погоды, еды, туалетов и энергии
            вашей группы.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=explore&length=full-day&season=spring&shade=true&bathrooms=true&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950 transition hover:bg-sky-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Создать план
            </Link>
            <Link
              to="/ru/arizona/cool-summer-trips-with-kids"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Droplets className="h-4 w-4" aria-hidden="true" />
              Прохладные поездки
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-zinc-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Выберите расстояние
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Самый простой фильтр - время в дороге
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {driveBands.map((band) => {
              const Icon = band.icon;
              return (
                <article key={band.label} className="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm">
                  <Icon className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                    {band.label}
                  </p>
                  <h3 className="mt-2 text-lg font-black tracking-tight">{band.title}</h3>
                  <p className="mt-3 text-xs font-black uppercase tracking-wide text-sky-800">
                    {band.bestFor}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {band.destinations.map((destination) => (
                      <span key={destination} className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-black text-sky-800">
                        {destination}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-zinc-600">{band.note}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Сезон
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Один и тот же город может быть отличным или тяжелым
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {seasonalRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <article key={rule.season} className="rounded-lg border border-zinc-100 bg-white p-5">
                  <Icon className="mb-4 h-6 w-6 text-sky-700" aria-hidden="true" />
                  <h3 className="text-xl font-black tracking-tight">{rule.season}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{rule.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-100 bg-sky-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Готовые варианты
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Три плана, которые легко объяснить группе
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {starterPlans.map((plan) => (
              <Link
                key={plan.title}
                to={plan.to}
                className="flex h-full flex-col rounded-lg border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <h3 className="text-xl font-black tracking-tight">{plan.title}</h3>
                <p className="mt-2 text-sm font-black text-sky-800">{plan.route}</p>
                <p className="mt-3 rounded-lg bg-sky-50 p-3 text-xs font-black uppercase tracking-wide text-sky-800">
                  {plan.bestFor}
                </p>
                <ol className="mt-4 space-y-2 text-sm leading-7 text-zinc-600">
                  {plan.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <span className="mt-5 inline-flex text-xs font-black uppercase tracking-widest text-sky-700">
                  Открыть в Sage
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-sky-700">
              Проверка перед выездом
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Сделайте день проще до того, как сядете в машину
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Для родителей и групп друзей главное - не идеальное расписание, а
              понятный план, вода, туалеты и свобода поменять курс.
            </p>
          </div>
          <div className="grid gap-3">
            {safetyChecks.map((check) => (
              <div key={check} className="flex gap-3 rounded-lg border border-zinc-100 bg-white p-4">
                <ShieldCheck className="mt-1 h-5 w-5 flex-none text-sky-700" aria-hidden="true" />
                <p className="text-sm leading-7 text-zinc-700">{check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <SharePlanPanel
            title="Поделиться планом поездки"
            description="Отправьте короткую версию семье или друзьям, чтобы быстро выбрать направление."
            quickPlanText={quickPlanText}
            voteText={voteText}
            eventContext="russian_day_trips_from_phoenix"
            locale="ru"
          />
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Следующие полезные страницы
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ['Аризона на русском', '/ru'],
              ['Прохладные летние поездки', '/ru/arizona/cool-summer-trips-with-kids'],
              ['Походы с детьми', '/ru/arizona/hikes-with-kids'],
              ['Планировать по ситуации', '/ru/arizona/plan-by-situation'],
              ['English day trip guide', '/arizona/day-trips-from-phoenix'],
              ['Создать план в Sage', '/trip-builder?language=ru'],
            ].map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg border border-zinc-100 bg-white p-4 text-sm font-black text-zinc-800 transition hover:border-sky-200 hover:text-sky-700"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
