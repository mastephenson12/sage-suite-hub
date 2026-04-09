import React from 'react';

const QUIZ_URL = 'https://quiz.thefamilyfreedomplan.com/';

export default function FreedomBridge() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-zinc-200 bg-white p-8 shadow-sm md:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
              More Freedom for Families
            </p>

            <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-zinc-900 md:text-6xl">
              Wish You Could Take More Trips Like This?
            </h2>

            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
              Most families do not struggle with ideas. They struggle with time and
              money.
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
              Some families are learning how to create extra income from their phones
              so they can say yes to more hikes, weekend getaways, and memory-making
              adventures together.
            </p>

            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
              If that has ever crossed your mind, this quick quiz is a simple place to
              start.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-blue-700"
              >
                Take the 60-Second Quiz
              </a>

              <a
                href="/#/about"
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-zinc-800 transition-colors duration-200 hover:border-zinc-900 hover:text-zinc-900"
              >
                Learn More About Sage
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
