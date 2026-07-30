import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
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

const russianUrl = 'https://sage.healthandtravels.com/ru';
const englishUrl = 'https://sage.healthandtravels.com/arizona';

const russianFaqs = [
  {
    question: 'Что такое Sage на русском языке?',
    answer:
      'Sage помогает семьям планировать поездки по Аризоне: выбирать маршруты, учитывать жару, воду, тень, возраст детей, время в дороге и запасной план.',
  },
  {
    question: 'Подходит ли Sage для поездок с детьми?',
    answer:
      'Да. Sage делает упор на семейные поездки, короткие прогулки, понятную логистику, безопасность и реалистичный темп без перегруженного расписания.',
  },
  {
    question: 'Какие места в Аризоне подходят семьям?',
    answer:
      'Седона, Флагстафф, Пейсон, Прескотт, Гранд-Каньон, Тусон, Шоу-Лоу и Пайнтоп-Лейксайд могут быть отличным выбором в зависимости от сезона и погоды.',
  },
  {
    question: 'Можно ли задать Sage вопрос на русском?',
    answer:
      'Да. Перейдите в планировщик и опишите поездку по-русски: кто едет, откуда вы выезжаете, сколько есть времени и что нравится вашей семье.',
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

const examplePrompts = [
  'Найди прохладную семейную поездку из Финикса на выходные.',
  'Подбери лёгкую прогулку в Аризоне для детей 5 и 9 лет.',
  'Составь однодневный маршрут в Седону с едой и красивыми видами.',
  'Куда поехать летом, чтобы избежать сильной жары?',
];

const destinations = [
  {
    name: 'Флагстафф',
    description: 'Сосновый лес, более прохладная погода, обсерватория и удобный летний отдых.',
    to: '/arizona/flagstaff',
    icon: Trees,
  },
  {
    name: 'Седона',
    description: 'Красные скалы, короткие маршруты, смотровые площадки и семейные фотографии.',
    to: '/arizona/sedona',
    icon: Mountain,
  },
  {
    name: 'Пейсон и Моголлон-Рим',
    description: 'Сосны, озёра, обзорные точки и передышка от жары пустыни.',
    to: '/arizona/payson-rim-country-with-kids',
    icon: Droplets,
  },
];

const planningCards = [
  {
    title: 'Планировать по ситуации',
    description:
      'Начните с реальности вашей поездки: маленькие дети, жара, гости, полдня, выходные, туалеты, тень, вода или группа друзей.',
    to: '/ru/arizona/plan-by-situation',
    icon: Compass,
  },
  {
    title: 'Когда слишком жарко',
    description:
      'Раннее утро, прохладные остановки, вода, тень и запасные варианты вместо открытых маршрутов в середине дня.',
    to: '/ru/arizona/cool-summer-trips-with-kids',
    icon: Sun,
  },
  {
    title: 'Для семьи или друзей',
    description:
      'Планы для детей, гостей, нескольких семей или друзей, которым нужен простой и гибкий день.',
    to: '/ru/arizona/plan-by-situation#friends',
    icon: Users,
  },
];

export default function RussianArizonaHub() {
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
        title="Путешествия по Аризоне на русском языке | Sage"
        description="Планируйте семейные поездки по Аризоне на русском языке: маршруты, жара, безопасность, поездки с детьми, Седона, Флагстафф, Пейсон и другие направления."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-rim-overlook.avif"
            alt="Сосновый лес и горы Аризоны"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Русский
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Sage Arizona на русском
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Исследуйте Аризону вместе с семьёй
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            Найдите семейные маршруты, красивые места и практичные идеи для отдыха.
            Sage помогает учесть жару, воду, тень, время в дороге и возраст детей,
            чтобы поездка была приятной, а не очередным семейным логистическим экзаменом.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Спланировать поездку
            </Link>
            <Link
              to="/ru/arizona/plan-by-situation"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10"
            >
              <Sun className="h-4 w-4" aria-hidden="true" />
              По ситуации
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: 'Для кого', value: 'Семьи и группы' },
            { icon: ShieldCheck, label: 'Приоритет', value: 'Безопасность и жара' },
            { icon: MapPin, label: 'Регион', value: 'Вся Аризона' },
            { icon: Compass, label: 'Формат', value: 'Готовый план поездки' },
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
            Быстрый выбор
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Начните с вашей ситуации
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Это самый быстрый путь к полезному плану, когда важны жара, дети, гости, время или энергия группы.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {planningCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.to}
                className="group rounded-xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black">{card.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{card.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800">
                  Открыть <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Популярные направления
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            С чего начать
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Выберите направление, которое подходит сезону и энергии вашей семьи.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {destinations.map((destination) => {
            const Icon = destination.icon;
            return (
              <Link
                key={destination.name}
                to={destination.to}
                className="group rounded-xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-black">{destination.name}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{destination.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800">
                  Открыть маршрут <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Попробуйте спросить Sage
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Примеры вопросов на русском
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {examplePrompts.map((prompt) => (
              <Link
                key={prompt}
                to={`/trip-builder?language=ru&prompt=${encodeURIComponent(prompt)}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-emerald-300/50 hover:bg-white/10"
              >
                <span className="leading-7 text-zinc-100">{prompt}</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Частые вопросы</h2>
        <div className="mt-7 space-y-4">
          {russianFaqs.map((faq) => (
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
