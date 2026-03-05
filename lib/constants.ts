export const AWARD_INFO = {
  name: "Gold Helmet Award",
  founded: 1951,
  yearsOfHistory: 75,
  charity: "Gold Helmet Award Corp",
  scholarshipAmount: 1000,
  contactEmail: "goldhelmet2025@gmail.com",
  chair: "Kyle Newman",
  chairAffiliation: "Denver Post",
};

export interface Winner {
  year: number;
  name: string;
  school: string;
  position: string;
  college: string;
  imageUrl?: string;
}

// Complete list of 75 winners (1951-2025)
// Source: https://www.denverpost.com/2013/12/09/list-of-gold-helmet-award-winners-for-colorado-prep-football-from-the-denver-post/
export const WINNERS: readonly Winner[] = [
  { year: 2025, name: "Elian Oliva", school: "Northfield", position: "LB", college: "Air Force" },
  { year: 2024, name: "Marcus Mozer", school: "Fossil Ridge", position: "", college: "" },
  { year: 2023, name: "Josh Snyder", school: "Columbine", position: "", college: "" },
  { year: 2022, name: "Brayden Dorman", school: "Vista Ridge", position: "QB", college: "" },
  { year: 2021, name: "Gavin Sawchuk", school: "Valor Christian", position: "RB", college: "Oklahoma" },
  { year: 2020, name: 'Alexisius "Q" Jones Jr.', school: "Fountain-Fort Carson", position: "", college: "" },
  { year: 2019, name: "Andrew Gentry", school: "Columbine", position: "OL", college: "" },
  { year: 2018, name: "Barrett Miller", school: "Eaglecrest", position: "", college: "" },
  { year: 2017, name: "Max Borghi", school: "Pomona", position: "RB", college: "Washington State" },
  { year: 2016, name: "Dylan McCaffrey", school: "Valor Christian", position: "QB", college: "Michigan" },
  { year: 2015, name: "Carlo Kemp", school: "Fairview", position: "DL", college: "Michigan" },
  { year: 2014, name: "Mike Morean", school: "Cherry Creek", position: "", college: "" },
  { year: 2013, name: "Christian McCaffrey", school: "Valor Christian", position: "RB/WR", college: "Stanford" },
  { year: 2012, name: "Xavier Lewis", school: "Eaglecrest", position: "DB", college: "" },
  { year: 2011, name: "Sean Rubalcaba", school: "Grand Junction", position: "", college: "" },
  { year: 2010, name: "Ian Imamura", school: "Pueblo West", position: "", college: "" },
  { year: 2009, name: "Matt Brown", school: "Limon", position: "", college: "" },
  { year: 2008, name: "Bryan Peters", school: "Rocky Mountain", position: "QB", college: "" },
  { year: 2007, name: "Tyler Jackson", school: "Douglas County", position: "", college: "" },
  { year: 2006, name: "Clay Garcia", school: "Alamosa", position: "", college: "" },
  { year: 2005, name: "Tim McGraw", school: "Douglas County", position: "", college: "" },
  { year: 2004, name: "Tyler Sale", school: "Arapahoe", position: "", college: "" },
  { year: 2003, name: "Jeff Byers", school: "Loveland", position: "OL", college: "USC" },
  { year: 2002, name: "Jonathan Lucas", school: "Arvada West", position: "", college: "" },
  { year: 2001, name: "Jake Stone", school: "Limon", position: "", college: "" },
  { year: 2000, name: "Nick Brown", school: "Woodland Park", position: "", college: "" },
  { year: 1999, name: "Marcus Houston", school: "Thomas Jefferson", position: "RB", college: "Colorado" },
  { year: 1998, name: "Ryan Haywood", school: "Thomas Jefferson", position: "", college: "" },
  { year: 1997, name: "Jason Lucas", school: "Arvada West", position: "", college: "" },
  { year: 1996, name: "Wayne Southam", school: "Overland", position: "", college: "" },
  { year: 1995, name: "Matt Rillos", school: "Golden", position: "", college: "" },
  { year: 1994, name: "Shane Cook", school: "Bear Creek", position: "", college: "" },
  { year: 1993, name: "Ryan Clement", school: "Mullen", position: "", college: "" },
  { year: 1992, name: "Jeff Singleton", school: "Broomfield", position: "", college: "" },
  { year: 1991, name: "Greg Jones", school: "J.F. Kennedy", position: "", college: "" },
  { year: 1990, name: "Justin Armour", school: "Manitou Springs", position: "WR", college: "Stanford" },
  { year: 1989, name: "Kent Kahl", school: "Fort Morgan", position: "", college: "" },
  { year: 1988, name: "Doug Musgrave", school: "Grand Junction", position: "QB", college: "Oregon" },
  { year: 1987, name: "Jerry Dunn", school: "Mullen", position: "", college: "" },
  { year: 1986, name: "Lance French", school: "Green Mountain", position: "", college: "" },
  { year: 1985, name: "Bill Musgrave", school: "Grand Junction", position: "QB", college: "Oregon" },
  { year: 1984, name: "Maurice Frilot", school: "Montbello", position: "", college: "" },
  { year: 1983, name: "David Gaines", school: "Wasson", position: "", college: "" },
  { year: 1982, name: "Eric McCarty", school: "Boulder", position: "", college: "" },
  { year: 1981, name: "Steve Markstrom", school: "Rocky Mountain", position: "", college: "" },
  { year: 1980, name: "Griff Wirth", school: "Wheat Ridge", position: "", college: "" },
  { year: 1979, name: "Alvin Rubalcaba", school: "Grand Junction", position: "", college: "" },
  { year: 1978, name: "Ellis Wood", school: "Centaurus", position: "", college: "" },
  { year: 1977, name: "Tony Federico", school: "Northglenn", position: "", college: "" },
  { year: 1976, name: "Greg Jaeger", school: "Ranum", position: "", college: "" },
  { year: 1975, name: "Mike Edwards", school: "J.F. Kennedy", position: "", college: "" },
  { year: 1974, name: "Pete Cyphers", school: "Grand Junction", position: "", college: "" },
  { year: 1973, name: "Randy Strandberg", school: "Arvada West", position: "", college: "" },
  { year: 1972, name: "Tom Tesone", school: "Cherry Creek", position: "", college: "" },
  { year: 1971, name: "Dave Logan", school: "Wheat Ridge", position: "WR", college: "Colorado" },
  { year: 1970, name: "Doug Quimby", school: "Grand Junction", position: "", college: "" },
  { year: 1969, name: "Joe Duenas", school: "La Junta", position: "", college: "" },
  { year: 1968, name: "Mike Boryla", school: "Regis", position: "QB", college: "Stanford" },
  { year: 1967, name: "Paul Arendt", school: "Thomas Jefferson", position: "", college: "" },
  { year: 1966, name: "Fred Steinmark", school: "Wheat Ridge", position: "DB", college: "Texas" },
  { year: 1965, name: "Bobby Anderson", school: "Boulder", position: "RB", college: "Colorado" },
  { year: 1964, name: "Craig Bozich", school: "Aurora Central", position: "", college: "" },
  { year: 1963, name: "Steve Elliott", school: "Lakewood", position: "", college: "" },
  { year: 1962, name: "Jim Blaschke", school: "Denver East", position: "", college: "" },
  { year: 1961, name: "Tom Elliott", school: "Lakewood", position: "", college: "" },
  { year: 1960, name: "Gordon Rowley", school: "Arvada", position: "", college: "" },
  { year: 1959, name: "Ted Somerville", school: "Greeley", position: "", college: "" },
  { year: 1958, name: "Kent Hutcheson", school: "Denver South", position: "", college: "" },
  { year: 1957, name: "Joe Romig", school: "Lakewood", position: "", college: "Colorado" },
  { year: 1956, name: "Kay McFarland", school: "Englewood", position: "", college: "" },
  { year: 1955, name: "Bob Erickson", school: "Denver East", position: "", college: "" },
  { year: 1954, name: "Charles Inagaki", school: "Denver North", position: "", college: "" },
  { year: 1953, name: "Eloy Mares", school: "Annunciation", position: "", college: "" },
  { year: 1952, name: "Ray Carlsen", school: "Denver East", position: "", college: "" },
  { year: 1951, name: "Bill Faddis", school: "Regis", position: "", college: "" },
];

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
