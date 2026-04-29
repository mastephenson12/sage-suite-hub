import React from 'react';

export default function Community() {
  return (
    <main className="min-h-screen bg-[#fff8ef] px-6 py-16">
      <section className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-orange-600">
          Arizona Hikers Association
        </p>

        <h1 className="mb-6 text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
          Don’t just plan the hike.
          <br />
          Come with us.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-zinc-600">
          Sage helps you find the adventure. The Arizona Hikers Association
          community helps you actually get outside with real people, real
          meetups, and simple Arizona hiking ideas your family can enjoy.
        </p>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-black text-zinc-900">
              Find beginner-friendly hikes
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Get trail ideas, local tips, and places to explore around Arizona.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-black text-zinc-900">
              Join real outdoor meetups
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Connect with people who want to stop scrolling and actually go.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-black text-zinc-900">
              Bring your family outside
            </h3>
            <p className="text-sm leading-6 text-zinc-600">
              Build memories without needing to become a wilderness survival influencer.
            </p>
          </div>
        </div>

        <div className="mx-auto mb-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              Monthly
            </p>

            <h2 className="mb-4 text-4xl font-black text-zinc-900">
              $7<span className="text-base font-bold text-zinc-500">/month</span>
            </h2>

            <p className="mb-6 text-sm leading-6 text-zinc-600">
              Great if you want to try the community and start joining the adventure.
            </p>

            <a
              href="https://members.arizonahikersassociation.org/checkout/monthly"
              className="block rounded-full bg-zinc-900 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-zinc-700"
            >
              Join Monthly
            </a>
          </div>

          <div className="relative rounded-3xl border-2 border-orange-400 bg-white p-8 shadow-md">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
              Best Value
            </div>

            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Annual
            </p>

            <h2 className="mb-4 text-4xl font-black text-zinc-900">
              $49<span className="text-base font-bold text-zinc-500">/year</span>
            </h2>

            <p className="mb-6 text-sm leading-6 text-zinc-600">
              Save money and get a bonus Arizona Hikers Association T-shirt
              when you join for the year.
            </p>

            <a
              href="https://members.arizonahikersassociation.org/checkout/annual"
              className="block rounded-full bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Join Yearly + Get the Shirt
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-bold text-zinc-600">
            Already a member?
          </p>

          <a
            href="https://members.arizonahikersassociation.org/login"
            className="inline-block rounded-full border border-zinc-300 px-6 py-3 text-sm font-black uppercase tracking-widest text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            Log In Here
          </a>
        </div>
      </section>
    </main>
  );
}
