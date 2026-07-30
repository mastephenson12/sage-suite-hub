import React from 'react';

const faqs = [
  {
    question: 'What is Sage Health and Travels?',
    answer:
      'Sage Health and Travels is a family adventure planning tool that helps people explore Arizona hikes, road trips, outdoor destinations, and healthy travel ideas.',
  },
  {
    question: 'Who is Sage for?',
    answer:
      'Sage is built for families, friends, parents, and beginner adventurers who want easier ways to plan meaningful Arizona trips.',
  },
  {
    question: 'Can Sage help plan Arizona hikes with kids?',
    answer:
      'Yes. Sage focuses on family-friendly Arizona adventures, including beginner hikes, scenic stops, and road trip ideas that work well for kids and groups.',
  },
  {
    question: 'Does Sage only cover Arizona?',
    answer:
      'Sage currently focuses heavily on Arizona family adventures while also supporting broader healthy travel and trip planning ideas.',
  },
  {
    question: 'How does Sage connect with Health and Travels?',
    answer:
      'Sage is part of Health and Travels, a family-focused travel brand that helps people plan healthier adventures and discover outdoor destinations.',
  },
];

export default function HomeFAQ() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16" aria-labelledby="home-faq-heading">
      <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
          Sage FAQ
        </p>

        <h2
          id="home-faq-heading"
          className="text-3xl font-black tracking-tight text-zinc-950"
        >
          Frequently Asked Questions About Sage
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-600">
          Quick answers for families planning Arizona adventures with less guesswork.
        </p>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-zinc-200 bg-zinc-50/60 px-5 py-4"
              open={index === 0}
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-zinc-950 marker:hidden">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="float-right text-zinc-500 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <p className="mt-3 text-sm leading-7 text-zinc-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
