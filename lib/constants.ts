export const AWARD_INFO = Object.freeze({
  name: "Gold Helmet Award",
  founded: 1951,
  yearsOfHistory: 75,
  charity: "Gold Helmet Award Corp",
  scholarshipAmount: 1000,
  contactEmail: "goldhelmet2025@gmail.com",
  chairman: "Matt Schubert",
});

export interface Winner {
  year: number;
  name: string;
  school: string;
  position: string;
  college: string;
  storyUrl?: string;
  imageUrl?: string;
}

// Complete list of 75 winners (1951-2025)
// Source: https://www.denverpost.com/2013/12/09/list-of-gold-helmet-award-winners-for-colorado-prep-football-from-the-denver-post/
export const WINNERS: readonly Winner[] = [
  { year: 2025, name: "Elian Oliva", school: "Northfield", position: "LB/S", college: "Air Force", storyUrl: "https://www.denverpost.com/2025/12/14/elian-oliva-gold-helmet-winner-northfield/" },
  { year: 2024, name: "Marcus Mozer", school: "Fossil Ridge", position: "WR", college: "San Diego State", storyUrl: "https://www.denverpost.com/2024/12/22/marcus-mozer-gold-helmet-award-fossil-ridge/" },
  { year: 2023, name: "Josh Snyder", school: "Columbine", position: "RB/DB", college: "Colorado School of Mines", storyUrl: "https://www.denverpost.com/2023/12/24/josh-snyder-columbine-gold-helmet-winner/" },
  { year: 2022, name: "Brayden Dorman", school: "Vista Ridge", position: "QB", college: "Arizona", storyUrl: "https://www.denverpost.com/2022/12/18/brayden-dorman-vista-ridge-gold-helmet-winner-football/" },
  { year: 2021, name: "Gavin Sawchuk", school: "Valor Christian", position: "RB", college: "Oklahoma", storyUrl: "https://www.denverpost.com/2021/12/19/gavin-sawchuk-valor-christian-2021-gold-helmet-award/" },
  { year: 2020, name: 'Alexisius "Q" Jones Jr.', school: "Fountain-Fort Carson", position: "RB", college: "Dartmouth", storyUrl: "https://www.denverpost.com/2021/06/13/q-jones-fountain-fort-carson-2020-gold-helmet-award/" },
  { year: 2019, name: "Andrew Gentry", school: "Columbine", position: "OL", college: "Michigan", storyUrl: "https://www.denverpost.com/2019/12/22/andrew-gentry-columbine-gold-helmet/" },
  { year: 2018, name: "Barrett Miller", school: "Eaglecrest", position: "OT", college: "Stanford", storyUrl: "https://www.denverpost.com/2018/12/23/bear-miller-eaglecrest-gold-helmet/" },
  { year: 2017, name: "Max Borghi", school: "Pomona", position: "RB", college: "Washington State", storyUrl: "https://www.denverpost.com/2017/12/17/max-borghi-pomona-2017-gold-helmet-award/" },
  { year: 2016, name: "Dylan McCaffrey", school: "Valor Christian", position: "QB", college: "Michigan", storyUrl: "https://www.denverpost.com/2016/12/18/dylan-mccaffrey-of-valor-christian-wins-2016-gold-helmet-award/" },
  { year: 2015, name: "Carlo Kemp", school: "Fairview", position: "OLB", college: "Michigan", storyUrl: "https://www.denverpost.com/preps/ci_29277962/carlo-kemp-fairview-gold-helmet-2015" },
  { year: 2014, name: "Mike Morean", school: "Cherry Creek", position: "S", college: "Princeton", storyUrl: "https://www.denverpost.com/preps/ci_27179856/mike-morean-cherry-creek-wins-2014-gold-helmet-award" },
  { year: 2013, name: "Christian McCaffrey", school: "Valor Christian", position: "RB", college: "Stanford", storyUrl: "https://www.denverpost.com/preps/ci_24683116/christian-mccaffrey-wins-denver-post-gold-helmet-award" },
  { year: 2012, name: "Xavier Lewis", school: "Eaglecrest", position: "S", college: "Wyoming", storyUrl: "https://www.denverpost.com/ci_22240900/gold-helmet-award-eaglecrests-xavier-lewis-hard-hitting" },
  { year: 2011, name: "Sean Rubalcaba", school: "Grand Junction", position: "QB", college: "Colorado Mesa", storyUrl: "https://www.denverpost.com/ci_19616237" },
  { year: 2010, name: "Ian Imamura", school: "Pueblo West", position: "TE/LB", college: "Air Force", storyUrl: "https://www.denverpost.com/ci_16942944" },
  { year: 2009, name: "Matt Brown", school: "Limon", position: "QB", college: "Colorado School of Mines", storyUrl: "https://www.denverpost.com/preps/ci_14034333" },
  { year: 2008, name: "Bryan Peters", school: "Rocky Mountain", position: "QB", college: "Nebraska", storyUrl: "https://www.denverpost.com/preps/ci_11279702" },
  { year: 2007, name: "Tyler Jackson", school: "Douglas County", position: "DB", college: "Boise State", storyUrl: "https://www.denverpost.com/preps/ci_7790407" },
  { year: 2006, name: "Clay Garcia", school: "Alamosa", position: "QB", college: "Colorado School of Mines", storyUrl: "https://www.denverpost.com/preps/ci_28367846/clay-garcia-named-2006-gold-helmet-football-winner" },
  { year: 2005, name: "Tim McGraw", school: "Douglas County", position: "OL", college: "Northern Colorado", storyUrl: "https://www.denverpost.com/preps/ci_28368021/tim-mcgraw-named-2005-gold-helmet-award-winner" },
  { year: 2004, name: "Tyler Sale", school: "Arapahoe", position: "OL/DL", college: "Colorado", storyUrl: "https://www.denverpost.com/preps/ci_28372877/tyler-sale-named-2004-gold-helmet-award-winner" },
  { year: 2003, name: "Jeff Byers", school: "Loveland", position: "OL/DL", college: "USC", storyUrl: "https://www.denverpost.com/preps/ci_28372968/jeff-byers-named-2003-gold-helmet-award-winner" },
  { year: 2002, name: "Jonathan Lucas", school: "Arvada West", position: "LB", college: "Cornell", storyUrl: "https://www.denverpost.com/preps/ci_28373230/jonathan-lucas-named-2002-gold-helmet-award-winner" },
  { year: 2001, name: "Jake Stone", school: "Limon", position: "WR", college: "Harvard", storyUrl: "https://www.denverpost.com/preps/ci_28373359/jake-stone-named-2001-gold-helmet-award-winner" },
  { year: 2000, name: "Nick Brown", school: "Woodland Park", position: "WR/DB", college: "Princeton", storyUrl: "https://www.denverpost.com/preps/ci_28373991/nick-brown-named-2000-gold-helmet-award-winner" },
  { year: 1999, name: "Marcus Houston", school: "Thomas Jefferson", position: "RB", college: "Colorado", storyUrl: "https://www.denverpost.com/preps/ci_28374083/marcus-houston-named-1999-gold-helmet-award-winner" },
  { year: 1998, name: "Ryan Haywood", school: "Thomas Jefferson", position: "OL/DL", college: "Northern Colorado", storyUrl: "https://www.denverpost.com/preps/ci_28374743/ryan-haywood-named-1998-gold-helmet-award-winner" },
  { year: 1997, name: "Jason Lucas", school: "Arvada West", position: "SS", college: "Brown", storyUrl: "https://www.denverpost.com/preps/ci_28407090/jason-lucas-named-1997-gold-helmet-award-winner" },
  { year: 1996, name: "Wayne Southam", school: "Overland", position: "OL/DL", college: "Air Force", storyUrl: "https://www.denverpost.com/ci_28375237/wayne-southam-named-1996-gold-helmet-award-winner" },
  { year: 1995, name: "Matt Rillos", school: "Golden", position: "WR", college: "Air Force", storyUrl: "https://www.denverpost.com/ci_28375505/matt-rillos-named-1995-gold-helmet-award-winner" },
  { year: 1994, name: "Shane Cook", school: "Bear Creek", position: "OL", college: "Colorado", storyUrl: "https://www.denverpost.com/ci_28375604/shane-cook-named-1994-gold-helmet-award-winner" },
  { year: 1993, name: "Ryan Clement", school: "Mullen", position: "QB", college: "Miami", storyUrl: "https://www.denverpost.com/news/ci_28375637/ryan-clement-named-1993-gold-helmet-award-winner" },
  { year: 1992, name: "Jeff Singleton", school: "Broomfield", position: "OL/DL", college: "Colorado", storyUrl: "https://www.denverpost.com/news/ci_28408953/jeff-singleton-1992-gold-helmet" },
  { year: 1991, name: "Greg Jones", school: "J.F. Kennedy", position: "DE", college: "Colorado", storyUrl: "https://www.denverpost.com/news/ci_28408941/greg-jones-1991-gold-helmet" },
  { year: 1990, name: "Justin Armour", school: "Manitou Springs", position: "WR", college: "Stanford", storyUrl: "https://www.denverpost.com/news/ci_28408922/justin-armour-1990-gold-helmet" },
  { year: 1989, name: "Kent Kahl", school: "Fort Morgan", position: "RB", college: "Iowa", storyUrl: "https://www.denverpost.com/news/ci_28408918/kent-kahl-1989-gold-helmet" },
  { year: 1988, name: "Doug Musgrave", school: "Grand Junction", position: "QB", college: "Oregon" },
  { year: 1987, name: "Jerry Dunn", school: "Mullen", position: "RB", college: "Colorado State" },
  { year: 1986, name: "Lance French", school: "Green Mountain", position: "RB", college: "Yale" },
  { year: 1985, name: "Bill Musgrave", school: "Grand Junction", position: "QB", college: "Oregon" },
  { year: 1984, name: "Maurice Frilot", school: "Montbello", position: "OL", college: "Harvard" },
  { year: 1983, name: "David Gaines", school: "Wasson", position: "C", college: "Air Force" },
  { year: 1982, name: "Eric McCarty", school: "Boulder", position: "RB", college: "Colorado" },
  { year: 1981, name: "Steve Markstrom", school: "Rocky Mountain", position: "OL", college: "Colorado" },
  { year: 1980, name: "Griff Wirth", school: "Wheat Ridge", position: "RB", college: "Colorado" },
  { year: 1979, name: "Alvin Rubalcaba", school: "Grand Junction", position: "RB", college: "Colorado" },
  { year: 1978, name: "Ellis Wood", school: "Centaurus", position: "RB", college: "Colorado" },
  { year: 1977, name: "Tony Federico", school: "Northglenn", position: "RB", college: "Colorado" },
  { year: 1976, name: "Greg Jaeger", school: "Ranum", position: "RB", college: "Dartmouth" },
  { year: 1975, name: "Mike Edwards", school: "J.F. Kennedy", position: "WR", college: "Colorado State" },
  { year: 1974, name: "Pete Cyphers", school: "Grand Junction", position: "RB", college: "Colorado" },
  { year: 1973, name: "Randy Strandberg", school: "Arvada West", position: "WR", college: "Colorado State" },
  { year: 1972, name: "Tom Tesone", school: "Cherry Creek", position: "RB", college: "Colorado" },
  { year: 1971, name: "Dave Logan", school: "Wheat Ridge", position: "WR", college: "Colorado" },
  { year: 1970, name: "Doug Quimby", school: "Grand Junction", position: "RB", college: "Harvard" },
  { year: 1969, name: "Joe Duenas", school: "La Junta", position: "RB", college: "Colorado" },
  { year: 1968, name: "Mike Boryla", school: "Regis", position: "QB", college: "Stanford" },
  { year: 1967, name: "Paul Arendt", school: "Thomas Jefferson", position: "RB", college: "Colorado" },
  { year: 1966, name: "Fred Steinmark", school: "Wheat Ridge", position: "DB", college: "Texas", storyUrl: "https://www.denverpost.com/breakingnews/ci_28488970/fred-steinmark-wheat-ridge-named-1966-gold-helmet" },
  { year: 1965, name: "Bobby Anderson", school: "Boulder", position: "RB", college: "Colorado" },
  { year: 1964, name: "Craig Bozich", school: "Aurora Central", position: "RB", college: "BYU", storyUrl: "https://www.denverpost.com/sports/ci_28495753/craig-bozich-aurora-central-gold-helmet-1964" },
  { year: 1963, name: "Steve Elliott", school: "Lakewood", position: "OL", college: "Colorado", storyUrl: "https://www.denverpost.com/breakingnews/ci_28489332/steve-elliott-lakewood-gold-helmet-1963" },
  { year: 1962, name: "Jim Blaschke", school: "Denver East", position: "RB", college: "Stanford" },
  { year: 1961, name: "Tom Elliott", school: "Lakewood", position: "RB", college: "Stanford" },
  { year: 1960, name: "Gordon Rowley", school: "Arvada", position: "WR", college: "Colorado" },
  { year: 1959, name: "Ted Somerville", school: "Greeley", position: "RB", college: "Colorado" },
  { year: 1958, name: "Kent Hutcheson", school: "Denver South", position: "RB", college: "Wheaton" },
  { year: 1957, name: "Joe Romig", school: "Lakewood", position: "RB", college: "Colorado" },
  { year: 1956, name: "Kay McFarland", school: "Englewood", position: "WR", college: "Colorado State" },
  { year: 1955, name: "Bob Erickson", school: "Denver East", position: "OL/LB", college: "Northwestern" },
  { year: 1954, name: "Charles Inagaki", school: "Denver North", position: "OL", college: "Denver" },
  { year: 1953, name: "Eloy Mares", school: "Annunciation", position: "RB", college: "Denver" },
  { year: 1952, name: "Ray Carlsen", school: "Denver East", position: "RB", college: "Yale" },
  { year: 1951, name: "Bill Faddis", school: "Regis", position: "RB", college: "USC" },
];

WINNERS.forEach(Object.freeze);
Object.freeze(WINNERS);

// WINNERS is already ordered most recent first (2025 → 1951)
export const WINNERS_BY_YEAR: readonly Winner[] = WINNERS;

// Get winners by decade for filtering
export const getWinnersByDecade = (decade: number) => {
  const startYear = decade;
  const endYear = decade + 9;
  return WINNERS_BY_YEAR.filter((w) => w.year >= startYear && w.year <= endYear);
};

// Get recent winners for display (e.g., last 12 years)
export const getRecentWinners = (count: number = 12) => {
  const n = Math.max(0, Math.min(Math.floor(Number.isFinite(count) ? count : 12), WINNERS_BY_YEAR.length));
  return WINNERS_BY_YEAR.slice(0, n);
};

// Award decades for filter
export const DECADES = [
  { label: "2020s", value: 2020 },
  { label: "2010s", value: 2010 },
  { label: "2000s", value: 2000 },
  { label: "1990s", value: 1990 },
  { label: "1980s", value: 1980 },
  { label: "1970s", value: 1970 },
  { label: "1960s", value: 1960 },
  { label: "1950s", value: 1950 },
];
