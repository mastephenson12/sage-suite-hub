export default function ArizonaFamilyAdventuresPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-6">
        Best Arizona Family Adventures
      </h1>

      <p className="text-lg mb-8">
        Arizona is packed with amazing places for families to explore together.
        From Sedona red rocks to cooler mountain towns and easy desert escapes,
        this page is your starting point for unforgettable family adventures.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Sedona Adventures</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="/sedona-airport-mesa" className="underline">
              Airport Mesa Sunset Guide
            </a>
          </li>
          <li>
            <a href="/devils-bridge-sedona" className="underline">
              Devil&apos;s Bridge Viewing Tips
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Northern Arizona</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="/eagar-arizona" className="underline">
              Eagar Arizona Family Adventure
            </a>
          </li>
          <li>
            <a href="/show-low-arizona" className="underline">
              Show Low Family Guide
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Phoenix Area Adventures</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="/goodyear-arizona" className="underline">
              Goodyear AZ Family Adventure
            </a>
          </li>
          <li>
            <a href="/estrella-mountain-regional-park" className="underline">
              Estrella Mountain Regional Park Guide
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
