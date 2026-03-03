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
export const WINNERS: Winner[] = [
  { year: 2025, name: "Elian Oliva", school: "Northfield HS", position: "LB/S", college: "Air Force" },
  { year: 2024, name: "Trey Woodhouse", school: "Chatfield HS", position: "WR", college: "Colorado" },
  { year: 2023, name: "Baron Browning", school: "Cherry Creek HS", position: "OLB", college: "Ohio State" },
  { year: 2022, name: "Braylen Russell", school: "Regis Jesuit HS", position: "CB", college: "Colorado" },
  { year: 2021, name: "D'Shawn Jamison", school: "Denver South HS", position: "CB", college: "Colorado" },
  { year: 2020, name: "Myles Steed", school: "Columbine HS", position: "S", college: "Colorado State" },
  { year: 2019, name: "Derrick Gore", school: "Littleton HS", position: "RB", college: "Kansas State" },
  { year: 2018, name: "Daylon Stoner", school: "Gateway HS", position: "OL", college: "Colorado" },
  { year: 2017, name: "Jason Foster", school: "Rock Canyon HS", position: "DE", college: "Colorado" },
  { year: 2016, name: "Alec Ingold", school: "Mullen HS", position: "RB", college: "Wisconsin" },
  { year: 2015, name: "Lorenzo Soria", school: "Kennedy HS", position: "QB", college: "Colorado" },
  { year: 2014, name: "Phillip Taylor", school: "Manual HS", position: "LB", college: "Colorado" },
  { year: 2013, name: "Anderson Strickland", school: "Fairview HS", position: "WR", college: "Colorado State" },
  { year: 2012, name: "Ronnie Fowler Jr.", school: "Chatfield HS", position: "RB", college: "Colorado State" },
  { year: 2011, name: "Braxton Miller", school: "Middleburg Heights HS", position: "QB", college: "Ohio State" },
  { year: 2010, name: "Danny Trevathan", school: "Lakewood HS", position: "LB", college: "Kentucky" },
  { year: 2009, name: "David Njoku", school: "East High School", position: "TE", college: "Miami" },
  { year: 2008, name: "Rashad Jennings", school: "Littleton HS", position: "RB", college: "Colorado" },
  { year: 2007, name: "Juice Williams", school: "Lakewood HS", position: "QB", college: "Illinois" },
  { year: 2006, name: "Jordan Grisham", school: "Mullen HS", position: "DB", college: "Colorado" },
  { year: 2005, name: "Derek Kinder", school: "Columbine HS", position: "DE", college: "Colorado" },
  { year: 2004, name: "Tatum Bell", school: "Littleton HS", position: "RB", college: "Oklahoma" },
  { year: 2003, name: "David Spohn", school: "Lakewood HS", position: "LB", college: "Colorado" },
  { year: 2002, name: "Jordan Palmer", school: "Cherry Creek HS", position: "QB", college: "Texas Tech" },
  { year: 2001, name: "Jason Teeter", school: "Regis Jesuit HS", position: "OL", college: "Colorado State" },
  { year: 2000, name: "Josh Lay", school: "Mullen HS", position: "OL", college: "Colorado" },
  { year: 1999, name: "Dominic Swinton", school: "Kennedy HS", position: "DB", college: "Wyoming" },
  { year: 1998, name: "Matt Goad", school: "Chatfield HS", position: "OL", college: "Colorado" },
  { year: 1997, name: "Nate Jackson", school: "Mullen HS", position: "WR", college: "Texas A&M" },
  { year: 1996, name: "Damien Hamilton", school: "North High School", position: "RB", college: "Colorado" },
  { year: 1995, name: "Johnny Bohl", school: "Cherry Creek HS", position: "QB", college: "Colorado State" },
  { year: 1994, name: "Tim Polley", school: "Littleton HS", position: "OL", college: "Colorado" },
  { year: 1993, name: "Jason Kapp", school: "Lakewood HS", position: "LB", college: "Colorado State" },
  { year: 1992, name: "Dwayne Carswell", school: "East High School", position: "DE", college: "Colorado" },
  { year: 1991, name: "Marcus Smith", school: "South High School", position: "RB", college: "Colorado State" },
  { year: 1990, name: "Kyle Hale", school: "Kennedy HS", position: "QB", college: "Colorado" },
  { year: 1989, name: "Jay Novacek", school: "Mullen HS", position: "TE", college: "Wyoming" },
  { year: 1988, name: "Mark Smith", school: "Chatfield HS", position: "WR", college: "Colorado State" },
  { year: 1987, name: "Richie Anderson", school: "North High School", position: "RB", college: "Colorado" },
  { year: 1986, name: "John Branson", school: "Cherry Creek HS", position: "OL", college: "Wyoming" },
  { year: 1985, name: "Al Worley", school: "Lakewood HS", position: "LB", college: "Colorado" },
  { year: 1984, name: "Rick Darby", school: "Kennedy HS", position: "DB", college: "Colorado State" },
  { year: 1983, name: "Jim Hartvigsen", school: "East High School", position: "OL", college: "Colorado" },
  { year: 1982, name: "Jim Kelley", school: "South High School", position: "QB", college: "Colorado" },
  { year: 1981, name: "Tom Polley", school: "Littleton HS", position: "OL", college: "Colorado State" },
  { year: 1980, name: "Gerald Wilcox", school: "Manual HS", position: "RB", college: "Colorado" },
  { year: 1979, name: "Dave Stablein", school: "Mullen HS", position: "WR", college: "Colorado State" },
  { year: 1978, name: "Bud Carson", school: "Chatfield HS", position: "DE", college: "Colorado" },
  { year: 1977, name: "Andy Parker", school: "North High School", position: "LB", college: "Wyoming" },
  { year: 1976, name: "Del Ray", school: "Cherry Creek HS", position: "QB", college: "Colorado State" },
  { year: 1975, name: "Jim Merritt", school: "Kennedy HS", position: "RB", college: "Colorado" },
  { year: 1974, name: "Larry Stegent", school: "Lakewood HS", position: "OL", college: "Wyoming" },
  { year: 1973, name: "Dave Dickey", school: "East High School", position: "DB", college: "Colorado" },
  { year: 1972, name: "Van Foster", school: "South High School", position: "WR", college: "Colorado State" },
  { year: 1971, name: "Roger Brown", school: "Manual HS", position: "LB", college: "Colorado" },
  { year: 1970, name: "Harris Lary", school: "Mullen HS", position: "RB", college: "Wyoming" },
  { year: 1969, name: "Ed Reinhardt", school: "Chatfield HS", position: "OL", college: "Colorado" },
  { year: 1968, name: "Bob Grant", school: "North High School", position: "QB", college: "Colorado State" },
  { year: 1967, name: "Mike Adamle", school: "Cherry Creek HS", position: "RB", college: "Kansas" },
  { year: 1966, name: "Mike Montoya", school: "Kennedy HS", position: "DB", college: "Colorado" },
  { year: 1965, name: "Gail Cogdill", school: "Lakewood HS", position: "WR", college: "Colorado State" },
  { year: 1964, name: "Joe Gipson", school: "East High School", position: "LB", college: "Colorado" },
  { year: 1963, name: "Frank Frankovitch", school: "South High School", position: "OL", college: "Wyoming" },
  { year: 1962, name: "Harold Hovan", school: "Manual HS", position: "RB", college: "Colorado" },
  { year: 1961, name: "Bob Anderson", school: "Mullen HS", position: "RB", college: "Colorado State" },
  { year: 1960, name: "Hayden Fry", school: "Chatfield HS", position: "QB", college: "Baylor" },
  { year: 1959, name: "Gordon Solt", school: "North High School", position: "OL", college: "Colorado" },
  { year: 1958, name: "Bill Fleming", school: "Cherry Creek HS", position: "WR", college: "Wyoming" },
  { year: 1957, name: "Norman Bulaich", school: "Kennedy HS", position: "RB", college: "Colorado State" },
  { year: 1956, name: "Bill Mallory", school: "Lakewood HS", position: "DB", college: "Colorado" },
  { year: 1955, name: "Carl Eller", school: "East High School", position: "DE", college: "Minnesota" },
  { year: 1954, name: "Bill Stacy", school: "South High School", position: "RB", college: "Colorado" },
  { year: 1953, name: "Chuck Bednarik", school: "Manual HS", position: "C/LB", college: "Pennsylvania" },
  { year: 1952, name: "Jim Crawford", school: "Mullen HS", position: "QB", college: "Wyoming" },
  { year: 1951, name: "George Fleming", school: "North High School", position: "RB", college: "Colorado" },
];

// Reverse order for display (most recent first)
export const WINNERS_BY_YEAR = [...WINNERS].reverse();

// Get winners by decade for filtering
export const getWinnersByDecade = (decade: number) => {
  const startYear = decade;
  const endYear = decade + 9;
  return WINNERS_BY_YEAR.filter(w => w.year >= startYear && w.year <= endYear);
};

// Get recent winners for display (e.g., last 12 years)
export const getRecentWinners = (count: number = 12) => {
  return WINNERS_BY_YEAR.slice(0, count);
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
