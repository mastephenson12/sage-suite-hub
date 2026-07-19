import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';

const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/plan-by-situation';
const englishUrl = 'https://sage.healthandtravels.com/arizona/plan-by-situation';

const situationFaqs = [
  {
    question: 'Как выбрать лучшую семейную поездку по Аризоне?',
    answer:
      'Начните с реальной ситуации: жара, возраст детей, время в дороге, туалеты, тень, вода, гости или длина поездки. Затем выберите одну главную активность, место для еды и запасной план.',
  },
  {
    question: 'Что делать в Аризоне, когда слишком жарко?',
    answer:
      'В сильную жару избегайте открытых маршрутов в середине дня. Используйте раннее утро, музеи, бассейны, splash pads, тень, озёра или более прохладные места на высоте.',
  },
  {
    question: 'Какие поездки подходят с маленькими детьми?',
    answer:
      'Маленьким детям обычно лучше подходят короткие прогулки, туалеты рядом, тень, перекусы, простой выход с маршрута и реалистичный темп.',
  },
  {
    question: 'Как планировать Аризону для группы друзей?',
    answer:
      'Выберите одну главную активность, простое место для еды, понятную точку встречи и запасной вариант для тех, кто хочет отдохнуть или сделать что-то легче.',
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

type SituationCard = {
  id: string;
  title: string;
  description: string;
  bestFor: string;
  action: string;
  to: string;
  icon: LucideIcon;
};

const situations: SituationCard[] = [
  {
    id: 'kids',
    title: 'Мы едем с маленькими детьми',
    description:
      'Короткие прогулки, туалеты рядом, тень, перекусы, простой выход с маршрута и запасной план.',
    bestFor: 'Малыши, дети до 8 лет, первая поездка',
    action: 'Собрать детский план',
    to: '/trip-builder?language=ru&group=family&kids=yes&pace=easy&prompt=Составь%20лёгкий%20семейный%20план%20по%20Аризоне%20с%20маленькими%20детьми%2C%20туалетами%2C%20тенью%20и%20запасным%20вариантом.',
    icon: Baby,
  },
  {
    id: 'heat',
    title: 'Слишком жарко',
    description:
      'Раннее утро, крытые места, вода, бассейн, splash pads или поездка в более прохладные места.',
    bestFor: 'Лето, высокий UV, гости из других штатов',
    action: 'План против жары',
    to: '/trip-builder?language=ru&heat=extreme&prompt=Составь%20безопасный%20план%20по%20Аризоне%20для%20дня%20с%20сильной%20жарой%3A%20только%20ранние%20активности%20на%20улице%20и%20прохладные%20варианты%20днём.',
    icon: Sun,
  },
  {
    id: 'visitors',
    title: 'К нам приехали гости',
    description:
      'Красивые виды, понятная логистика, еда рядом и не слишком сложный день, который кажется особенным.',
    bestFor: 'Родственники, друзья, первый визит в Аризону',
    action: 'Найти маршрут для гостей',
    to: '/arizona/day-trips-from-phoenix',
    icon: Users,
  },
  {
    id: 'half-day',
    title: 'У нас только полдня',
    description:
      'Одна главная остановка, короткая прогулка, кофе или еда, затем возвращение без перегруза.',
    bestFor: 'Утро, вечер, день перед вылетом',
    action: 'Сделать короткий план',
    to: '/trip-builder?language=ru&time=half-day&prompt=Составь%20полудневный%20семейный%20маршрут%20по%20Аризоне%20с%20короткой%20прогулкой%2C%20едой%20и%20реалистичным%20темпом.',
    icon: Clock3,
  },
  {
    id: 'weekend',
    title: 'Нужен план на выходные',
    description:
      'База для ночёвки, один активный день, один лёгкий день, еда и запасной вариант по погоде.',
    bestFor: 'Семьи, пары, группы друзей',
    action: 'Открыть идеи на выходные',
    to: '/arizona/weekend-trips',
    icon: CalendarDays,
  },
  {
    id: 'amenities',
    title: 'Нужны туалеты, тень и еда рядом',
    description:
      'Практичный план для реальной семьи: меньше сюрпризов, проще парковка, больше комфорта.',
    bestFor: 'Дети, бабушки и дедушки, большие группы',
    action: 'План с удобствами',
    to: '/trip-builder?language=ru&needs=bathrooms-shade-food&prompt=Составь%20семейный%20маршрут%20по%20Аризоне%20с%20туалетами%2C%20тенью%2C%20едой%20рядом%20и%20простым%20запасным%20планом.',
    icon: ShieldCheck,
  },
  {
    id: 'cooler-air',
    title: 'Хотим воду, сосны или прохладу',
    description:
      'Пейсон, Моголлон-Рим, Флагстафф, Прескотт и озёра помогают сделать летний день легче.',
    bestFor: 'Лето, день из Финикса, семейная перезагрузка',
    action: 'Посмотреть прохладные идеи',
    to: '/arizona/payson-rim-country-with-kids',
    icon: Trees,
  },
  {
    id: 'friends',
    title: 'Едем группой друзей',
    description:
      'Гибкий план с точкой встречи, одной главной активностью, едой и вариантами разной сложности.',
    bestFor: 'Друзья, несколько семей, день рождения',
    action: 'Подобрать приключение',
    to: '/arizona/adventure-finder',
    icon: Sparkles,
  },
];

const quickRules = [
  {
    icon: Clock3,
    title: 'Начинайте раньше',
    text: 'Для пустынных маршрутов утро почти всегда лучше, особенно весной, летом и ранней осенью.',
  },
  {
    icon: Droplets,
    title: 'Планируйте воду',
    text: 'Берите больше воды, чем кажется нужным, и выбирайте места, где можно сделать прохладную паузу.',
  },
  {
    icon: Car,
    title: 'Не перегружайте день',
    text: 'Одна главная активность плюс еда и запасной вариант обычно работает лучше, чем пять остановок.',
  },
  {
    icon: CloudSun,
    title: 'Сезон решает всё',
    text: 'Один и тот же маршрут может быть прекрасным зимой и плохой идеей в летний полдень.',
  },
];

export default function RussianPlanBySituation() {
  React.useEffect(() => {
    const previousLang = document.documentElement.lang;

    document.documentElement.lang = 'ru';
    setAlternateLink('ru', russianUrl);
    setAlternateLink('en', englishUrl);
    setAlternateLink('x-default', englishUrl);

    return () => {
      document.documentElement.lang = previousLang || 'en';
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="План поездки по Аризоне по ситуации | Sage"
        description="Русская страница Sage для выбора семейной поездки по Аризоне: маленькие дети, жара, гости, полдня, выходные, туалеты, тень, вода и группы друзей."
        url={russianUrl}
        faqs={situationFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'План по ситуации', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-family-pine-forest.avif"
            alt="Семейная прогулка в сосновом лесу Аризоны"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/ru"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-zinc-950"
            >
              Аризона на русском
            </Link>
            <Link
              to="/arizona/plan-by-situation"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-zinc-950"
            >
              English
            </Link>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">
            Выберите план по ситуации
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Планируйте Аризону по реальной жизни, а не по случайному списку
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-100 md:text-xl">
            Сначала скажите, что происходит: дети устали, жарко, гости приехали,
            есть только полдня, хочется воды или едет большая компания. Потом Sage
            поможет выбрать маршрут, еду, время и запасной план.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-emerald-200"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Создать план
            </Link>
            <a
              href="#situations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Выбрать ситуацию
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {quickRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <article key={rule.title} className="rounded-lg border border-emerald-100 bg-white p-5">
                <Icon className="mb-3 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h2 className="text-sm font-black text-zinc-950">{rule.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{rule.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="situations" className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Самый простой старт
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Что нужно вашей группе сегодня?
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Нажмите на ситуацию, которая ближе всего к вашей поездке. Некоторые ссылки ведут к готовым гайдам, другие сразу открывают планировщик Sage на русском.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {situations.map((situation) => {
            const Icon = situation.icon;
            return (
              <article
                key={situation.id}
                id={situation.id}
                className="rounded-xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-emerald-100 p-3 text-emerald-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-400">
                      {situation.bestFor}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
                      {situation.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-zinc-600">{situation.description}</p>
                <Link
                  to={situation.to}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-emerald-800 transition hover:text-emerald-950"
                >
                  {situation.action}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
            Быстрый рецепт
          </p>
          <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-4xl">
            Хороший семейный план по Аризоне обычно состоит из трёх частей
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['1', 'Одна главная активность', 'Маршрут, озеро, парк, музей, смотровая площадка или центр города.'],
              ['2', 'Еда или прохладная пауза', 'Место, где можно сесть, пополнить воду, охладиться и восстановить настроение.'],
              ['3', 'Запасной вариант', 'Крытая активность, короткий маршрут, бассейн, парк с тенью или ранний финиш.'],
            ].map(([number, title, text]) => (
              <article key={number} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="mb-4 text-3xl font-black text-emerald-300">{number}</p>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Частые вопросы</h2>
        <div className="mt-7 space-y-4">
          {situationFaqs.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-zinc-100 p-6">
              <h3 className="text-lg font-black">{faq.question}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
