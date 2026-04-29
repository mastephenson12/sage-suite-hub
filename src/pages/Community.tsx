export default function Community() {
  return (
    <main className="min-h-screen bg-orange-50 px-6 py-16">
      <section className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-orange-700">
          Health & Travels Community
        </p>

        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
          Don’t just plan the trip. Actually go.
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
          Sage helps you plan better Arizona adventures. The community is where
          those plans turn into real hikes, real meetups, and real family
          memories.
        </p>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="mb-2 font-bold">Find Local Adventures</h3>
            <p className="text-sm text-gray-600">
              See hikes, meetups, and family-friendly outdoor ideas.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="mb-2 font-bold">Go With Real People</h3>
            <p className="text-sm text-gray-600">
              Connect with others who want to explore Arizona too.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="mb-2 font-bold">Keep the Momentum</h3>
            <p className="text-sm text-gray-600">
              Save ideas, ask questions, and stop letting plans die in your notes app.
            </p>
          </div>
        </div>

        <a
          href="https://members.arizonahikersassociation.org/home"
          className="inline-block rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow hover:bg-orange-600"
        >
          Enter the Community
        </a>

        <p className="mt-4 text-sm text-gray-500">
          You’ll be taken to our member community powered by Arizona Hikers Association.
        </p>
      </section>
    </main>
  );
}
