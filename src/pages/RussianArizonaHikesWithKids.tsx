import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Baby,
  CalendarDays,
  Compass,
  Droplets,
  Map,
  Mountain,
  ShieldCheck,
  Sun,
  Trees,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import SharePlanPanel from '../components/SharePlanPanel';

const russianUrl = 'https://sage.healthandtravels.com/ru/arizona/hikes-with-kids';
const englishUrl = 'https://sage.healthandtravels.com/arizona/hikes-with-kids';
const spanishUrl =
  'https://sage.healthandtravels.com/es/arizona/caminatas-con-ninos';

const russianFaqs = [
  {
    question: 'Какие походы в Аризоне подходят детям?',
    answer:
      'Лучшие семейные походы в Аризоне короткие, понятные, подходят сезону и имеют рядом туалеты, воду, тень, еду или простой запасной план. Для семей хорошо подходят Финикс зимой, Седона весной, Пейсон и Флагстафф летом, Прескотт осенью.',
  },
  {
    question: 'Сколько должна длиться прогулка с детьми?',
    answer:
      'Для маленьких детей часто лучше начинать с прогулок до 2 миль. Для детей постарше можно выбрать более длинный маршрут, если есть вода, правильное время старта, обувь, перекусы и понятное место для разворота.',
  },
  {
    question: 'Когда лучше ходить по маршрутам в Аризоне?',
    answer:
      'Обычно лучшее время это раннее утро. Летом выбирайте более высокие места, лес, воду, тень и избегайте открытых пустынных троп в середине дня.',
  },
  {
    question: 'Что взять с собой на семейный поход?',
    answer:
      'Возьмите больше воды, чем кажется нужным, соленые перекусы, солнцезащиту, шляпы, карту без интернета, заряженный телефон, аптечку и легкие слои одежды для высоких районов.',
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

const ageBands = [
  {
    label: 'Маленькие дети',
    icon: Baby,
    bestFor: 'Коротко, просто, туалеты рядом, легкий выход',
    plan:
      'Главная цель не вершина, а хорошая первая победа. Пусть дети закончат прогулку с желанием пойти снова.',
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&language=ru',
  },
  {
    label: 'Дети школьного возраста',
    icon: Trees,
    bestFor: 'Ручьи, камни, виды, лес и понятная награда',
    plan:
      'Дайте маршруту цель: дойти до вида, найти воду, увидеть мост или заработать перекус.',
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&language=ru',
  },
  {
    label: 'Подростки',
    icon: Mountain,
    bestFor: 'Больше вида, умеренный вызов, фото и еда после',
    plan:
      'Позвольте им выбрать часть маршрута или место еды. Так поход ощущается как общий план, а не приказ.',
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=challenge&length=full-day&season=fall&ages=teens&shade=true&bathrooms=false&language=ru',
  },
];

const seasonalPicks = [
  {
    season: 'Весна',
    icon: Sun,
    destinations: 'Седона, Тусон, Кейв-Крик, Прескотт',
    why:
      'Температура мягче, виды ярче, а у семей больше времени до сильной жары.',
  },
  {
    season: 'Лето',
    icon: Trees,
    destinations: 'Флагстафф, Пейсон, Шоу-Лоу, Пайнтоп-Лейксайд',
    why:
      'Нужны высота, сосны, озера, тень и очень ранний старт. Открытая пустыня днем слишком рискованна.',
  },
  {
    season: 'Осень',
    icon: Map,
    destinations: 'Прескотт, Седона, Пейсон, Коттонвуд',
    why:
      'Хороший сезон для семейных прогулок, городских остановок и спокойных выходных.',
  },
  {
    season: 'Зима',
    icon: ShieldCheck,
    destinations: 'Финикс, Кейв-Крик, Тусон, Юма, низкая Седона',
    why:
      'Низкая пустыня становится комфортной, но в горах надо проверять снег, лед и дороги.',
  },
];

const starterPlans = [
  {
    title: 'Легкое утро в пустыне',
    route: 'Финикс, Скоттсдейл или Кейв-Крик',
    bestFor: 'Маленькие дети, гости, короткий день',
    steps: ['Выйти рано', 'Выбрать короткую прогулку', 'Закончить завтраком или парком'],
    to: '/trip-builder?plan=ready&location=phoenix&kids=yes&group=family&activity=relax&length=half-day&season=winter&ages=young-kids&shade=true&bathrooms=true&language=ru',
  },
  {
    title: 'Прохладный день среди сосен',
    route: 'Пейсон, Прескотт или Флагстафф',
    bestFor: 'Лето, активные дети, передышка от жары',
    steps: ['Подняться выше', 'Выбрать озеро, лес или обзорную точку', 'Сделать еду главным перерывом'],
    to: '/trip-builder?plan=ready&location=payson&kids=yes&group=family&activity=explore&length=full-day&season=summer&ages=mixed&shade=true&bathrooms=true&language=ru',
  },
  {
    title: 'Красные скалы без перегруза',
    route: 'Седона или Коттонвуд',
    bestFor: 'Фото, дети постарше, гости из другого города',
    steps: ['Приехать рано', 'Выбрать один главный маршрут', 'Оставить силы на еду и обратную дорогу'],
    to: '/trip-builder?plan=ready&location=sedona&kids=yes&group=family&activity=explore&length=full-day&season=spring&ages=older-kids&shade=true&bathrooms=false&language=ru',
  },
];

const safetyRules = [
  'Начинайте раньше, чем кажется нужным.',
  'Решите заранее, где разворачиваться.',
  'Берите больше воды, чем планируете выпить.',
  'С маленькими детьми выбирайте туалеты, тень и еду рядом.',
  'Скачайте карту, потому что связь может пропасть.',
  'Не ходите по открытым пустынным маршрутам в сильную жару.',
];

const quickPlanText = [
  'Идея семейного похода в Аризоне:',
  '',
  'Выбираем по возрасту и сезону.',
  '- Маленькие дети: коротко, тень, туалеты, легкий выход',
  '- Школьники: ручей, вид, лес или понятная цель',
  '- Подростки: умеренный вызов, фото и еда после',
  '',
  'Правило Sage: один маршрут, один перекус или еда, один запасной план.',
  'Гид: https://sage.healthandtravels.com/ru/arizona/hikes-with-kids',
].join('\n');

const voteText = [
  'Какой семейный поход в Аризоне выбрать?',
  '',
  '1. Легкое утро в Финиксе, Скоттсдейле или Кейв-Крик',
  '2. Прохладный день среди сосен в Пейсоне, Прескотте или Флагстаффе',
  '3. Красные скалы в Седоне или Коттонвуде',
  '',
  'Ответьте номером, и соберем план.',
  'Гид: https://sage.healthandtravels.com/ru/arizona/hikes-with-kids',
].join('\n');

export default function RussianArizonaHikesWithKids() {
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
        title="Походы по Аризоне с детьми | Семейный гид | Sage"
        description="Русский гид по семейным походам в Аризоне: возраст детей, сезон, жара, тень, туалеты, вода, расстояние, еда и запасной план."
        url={russianUrl}
        faqs={russianFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Аризона на русском', url: 'https://sage.healthandtravels.com/ru' },
          { name: 'Походы с детьми', url: russianUrl },
        ]}
      />

      <section className="relative overflow-hidden bg-emerald-950 px-6 py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/images/payson-family-rim-view.avif"
            alt="Семья на тропе среди сосен и гор Аризоны"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/35" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.22em]">
            <Link
              to="/arizona/hikes-with-kids"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              English
            </Link>
            <Link
              to="/es/arizona/caminatas-con-ninos"
              className="rounded-full border border-white/30 px-4 py-2 text-white/80 transition hover:bg-white hover:text-emerald-950"
            >
              Espanol
            </Link>
            <span className="rounded-full bg-emerald-200 px-4 py-2 text-emerald-950">
              Русский
            </span>
          </div>

          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-200">
            Семейный гид по тропам
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Походы по Аризоне с детьми
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50 md:text-xl">
            Хороший семейный поход это не самый известный маршрут. Это прогулка,
            где подходят погода, возраст детей, вода, тень, туалеты и запасной
            выход, если день пойдет не по плану.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/trip-builder?plan=ready&location=arizona&kids=yes&group=family&activity=hike&length=half-day&season=spring&ages=mixed&shade=true&bathrooms=true&language=ru"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-200 px-6 py-3 text-sm font-black uppercase tracking-wide text-emerald-950 transition hover:bg-emerald-100"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Создать план похода
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

      <section className="border-b border-zinc-100 bg-emerald-50 px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: 'Для кого', value: 'Семьи с детьми' },
            { icon: Mountain, label: 'Тип', value: 'Маршруты и прогулки' },
            { icon: CalendarDays, label: 'Выбор', value: 'По сезону' },
            { icon: ShieldCheck, label: 'Важно', value: 'Вода и жара' },
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
            Возраст детей
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Начните с самого младшего участника
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {ageBands.map((band) => {
            const Icon = band.icon;
            return (
              <Link
                key={band.label}
                to={band.to}
                className="group rounded-lg border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-black tracking-tight">{band.label}</h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-zinc-500">{band.bestFor}</p>
                <p className="mt-4 leading-7 text-zinc-600">{band.plan}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-800">
                  Открыть план <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
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
              Сезон
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Где лучше гулять в разное время года
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {seasonalPicks.map((pick) => {
              const Icon = pick.icon;
              return (
                <article key={pick.season} className="rounded-lg border border-zinc-100 bg-white p-5">
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-black">{pick.season}</h3>
                  <p className="mt-2 text-sm font-black uppercase tracking-wide text-zinc-500">
                    {pick.destinations}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{pick.why}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-700">
            Готовые идеи
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Три простых семейных маршрута
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {starterPlans.map((plan) => (
            <Link
              key={plan.title}
              to={plan.to}
              className="group rounded-lg border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
                {plan.route}
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{plan.title}</h3>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-zinc-500">{plan.bestFor}</p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-600">
                {plan.steps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-emerald-800">
                Создать этот план <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
              Безопасность
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Правила, которые помогают семье закончить день хорошо
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {safetyRules.map((rule) => (
              <div key={rule} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-6 text-emerald-50">
                {rule}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SharePlanPanel
        title="Отправьте план семье или друзьям"
        description="Скопируйте короткий вариант, чтобы все выбрали маршрут до того, как вы окажетесь в машине."
        quickPlanText={quickPlanText}
        voteText={voteText}
        eventContext="russian_arizona_hikes_with_kids"
        locale="ru"
      />

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-3xl font-black tracking-tight">Частые вопросы</h2>
        <div className="mt-7 space-y-4">
          {russianFaqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-zinc-100 p-6">
              <h3 className="text-lg font-black">{faq.question}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
