import { GIVING_LEVELS } from "@/lib/constants";

const BOARD_MEMBERS = [
  { name: "Matt Schubert", title: "Chairman & Treasurer" },
  { name: "Jason Lucas", title: "President" },
  { name: "Neil Devlin", title: "Vice President" },
  { name: "Kyle Newman", title: "Secretary" },
  { name: "Doug Quimby" },
  { name: "Mike Edwards" },
  { name: "Eric McCarty" },
  { name: "Maurice Frilot" },
  { name: "Carlo Kemp" },
  { name: "Lori Punko" },
] as const;

export function BoardSection() {
  return (
    <>
      {/* Board of Directors */}
      <section id="board" className="py-24 lg:py-32 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {BOARD_MEMBERS.map((member) => (
              <div key={member.name} className="flex items-baseline gap-2">
                <p className="text-foreground font-medium">{member.name}</p>
                {"title" in member && member.title && (
                  <p className="text-secondary text-sm">{member.title}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section id="supporters" className="py-24 lg:py-32 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="h-px w-16 bg-gold mb-6" />
            <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Give Back
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-6">
              Supporters
            </h2>
          </div>

          <h3 className="font-display text-2xl font-medium italic text-foreground mb-8">
            Giving Levels
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GIVING_LEVELS.map((level) => (
              <div
                key={level.name}
                className="border border-border bg-surface p-6 md:p-8 hover:border-gold/40 transition-colors text-center"
              >
                <p className="text-gold font-display font-medium italic leading-none" style={{ fontSize: "2.75rem" }}>
                  {level.name.startsWith("$") ? (
                    <><span style={{ fontSize: "1.75rem", verticalAlign: "0.15em" }}>$</span>{level.name.slice(1)}</>
                  ) : (
                    level.name
                  )}
                </p>
                {/* TODO: Replace with actual donor names once donations come in */}
                {/* <ul className="text-secondary text-sm mt-4 space-y-1">
                  <li>Donor Name</li>
                </ul> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
