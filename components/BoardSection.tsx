const GIVING_LEVELS = [
  {
    name: "Gold Helmet Legends",
    range: "$5,000\u2013$9,999",
    perks: "Website recognition + banquet recognition",
  },
  {
    name: "Captain\u2019s Club",
    range: "$2,500\u2013$4,999",
    perks: "Website recognition",
  },
  {
    name: "Gold Helmet Brotherhood",
    range: "$1,000\u2013$2,499",
    perks: "Website recognition (winner participation level)",
  },
  {
    name: "Teammate Level",
    range: "Up to $999",
    perks: "",
  },
];

export function BoardSection() {
  return (
    <section id="board" className="py-24 lg:py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="h-px w-16 bg-gold mb-6" />
          <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
            Leadership
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-6">
            Board of Directors
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            The Gold Helmet Award Corp is governed by a volunteer board of
            alumni, community leaders, and former winners dedicated to honoring
            excellence in Colorado high school football.
          </p>
        </div>

        {/* Giving Levels */}
        <div>
          <h3 className="font-display text-2xl font-medium italic text-foreground mb-8">
            Giving Levels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GIVING_LEVELS.map((level) => (
              <div
                key={level.name}
                className="border border-border bg-background p-6 hover:border-gold/40 transition-colors"
              >
                <p className="text-gold font-display text-lg font-semibold mb-1">
                  {level.name}
                </p>
                <p className="text-foreground font-medium text-sm mb-3">
                  {level.range}
                </p>
                {level.perks && (
                  <p className="text-secondary text-sm">{level.perks}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
