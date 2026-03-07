export interface WinnerProfile {
  headline: string;
  bio: string;
  stats?: { label: string; value: string }[];
  careerHighlight?: string;
  highlights?: { title: string; value: string; description: string }[];
  quote?: { text: string; attribution: string };
  coachQuote?: { text: string; attribution: string };
  community?: string[];
  future?: { title: string; subtitle?: string };
  actionImage?: string;
}

export const WINNER_PROFILES: Partial<Record<number, WinnerProfile>> = {
  2024: {
    headline: "Most impactful athlete in Fossil Ridge history",
    bio: `Marcus Mozer, a 6\u20193\u201D, 210-pound receiver and free safety from Fossil Ridge, transformed himself from a raw speed threat into one of Colorado\u2019s most complete players. After his sophomore year he began daily 5 a.m. training sessions in Castle Rock with wideout coach Grayson Bankhead, sanding down the stiffness and building the route-running craft that turned him into a two-way star.`,
    stats: [
      { label: "Catches", value: "66" },
      { label: "Rec Yards", value: "933" },
      { label: "Rec TDs", value: "13" },
      { label: "Tackles", value: "22" },
      { label: "INTs", value: "2" },
      { label: "100m", value: "10.85s" },
    ],
    careerHighlight: "132 career catches, 2,173 yards, 25 touchdowns",
    highlights: [
      { title: "Academics", value: "4.074", description: "GPA, National Honor Society" },
      { title: "Track & Field", value: "2nd", description: "State Long Jump (missed title by \u00BC inch)" },
    ],
    quote: {
      text: "I realized I couldn\u2019t just be a go-ball guy. So I started working on all types of releases and route running.",
      attribution: "Marcus Mozer",
    },
    coachQuote: {
      text: "Okay, our dude is clearly better than everybody else\u2019s dude on the field.",
      attribution: "Coach Chris Tedford",
    },
    community: [
      "Youth group counselor (3+ years, twice weekly)",
      "Larimer County Food Bank volunteer",
      "Young Men\u2019s Service League (4 years with mother)",
      "Samaritan House Fort Collins volunteer",
    ],
    future: { title: "San Diego State", subtitle: "Financial Services" },
    actionImage: "/images/action/2024-marcus-mozer-action.jpg",
  },

  2022: {
    headline: "10,285 career passing yards across four varsity seasons",
    bio: `Brayden Dorman, a 6\u20195\u201D quarterback from Vista Ridge, threw for 10,285 career yards and 116 touchdowns over four varsity seasons. But Coach Mike Vrana points to a different number: nine students who showed up at dawn on spring break to pick up trash at a middle school, led by Dorman, who had no obligation to be there.`,
    stats: [
      { label: "Pass Yards", value: "3,783" },
      { label: "Pass TDs", value: "49" },
      { label: "Career Yards", value: "10,285" },
      { label: "Career TDs", value: "116" },
      { label: "Yards/Game", value: "321" },
      { label: "Total TDs", value: "54" },
    ],
    careerHighlight: "State-best 49 passing TDs and 3,783 yards as a senior",
    quote: {
      text: "I think it\u2019s always bigger than football. It\u2019s always about giving back to the community.",
      attribution: "Brayden Dorman",
    },
    coachQuote: {
      text: "Here\u2019s the QB of my program picking up trash at 7 a.m. on a Saturday. Not because he has to be. But because he wants to be.",
      attribution: "Coach Mike Vrana",
    },
    community: [
      "Led dawn trash cleanup on spring break",
      "Community garden volunteer",
      "Food pantry and shelter volunteer",
    ],
    future: { title: "Arizona", subtitle: "4-star prospect, chose AZ over CU, Wisconsin, Oregon State and 7 others" },
    actionImage: "/images/action/2022-brayden-dorman-action.jpg",
  },

  2021: {
    headline: "Broke Christian McCaffrey\u2019s Valor Christian rushing record",
    bio: `Gavin Sawchuk, a 5\u201911\u201D, 185-pound running back from Valor Christian, was a no-brainer from the moment coaches watched five plays of his freshman tape. The two-time Gatorade Player of the Year broke Christian McCaffrey\u2019s career rushing record and would have topped 3,500 yards as a senior if he\u2019d played full games. He sat out second halves in seven of them.`,
    stats: [
      { label: "Rush Yards", value: "2,004" },
      { label: "Rush TDs", value: "30" },
      { label: "Career Yards", value: "5,724" },
      { label: "Career TDs", value: "85" },
      { label: "YPC", value: "8.2" },
      { label: "Sacks Allowed", value: "0" },
    ],
    careerHighlight: "5,724 career rushing yards, 85 touchdowns, 8.2 yards per carry",
    highlights: [
      { title: "Academics", value: "3.64", description: "GPA, Valor Christian Cum Laude Society" },
    ],
    quote: {
      text: "Leaving a legacy that people can strive towards is most important to me, both on and off the field.",
      attribution: "Gavin Sawchuk",
    },
    coachQuote: {
      text: "He would\u2019ve had at least 3,500 yards if we let him play the whole game every Friday. He didn\u2019t play in the second half in seven of our games.",
      attribution: "Coach Donnie Yantis",
    },
    community: [
      "Dare to Play camps (youth with Down syndrome)",
      "Depression & suicide prevention panel",
      "Robotics club president (built campus trash robot)",
      "Brought O-line doughnuts every Saturday for 4 years",
    ],
    future: { title: "Oklahoma", subtitle: "Stayed committed after Lincoln Riley left for USC" },
  },

  2020: {
    headline: "First in his family to attend college",
    bio: `Alexisius "Q" Jones Jr., a 5\u201911\u201D, 180-pound running back from Fountain-Fort Carson, led the state in rushing despite a career interrupted by a broken tibia and fibula, a stress fracture, and a pandemic. His father Lex was incarcerated for a decade of Q\u2019s childhood. When Lex was released, the two moved to Fountain and rebuilt their lives around football. Q became the first in his family to attend college.`,
    stats: [
      { label: "Rush Yards", value: "1,853" },
      { label: "YPC", value: "9.9" },
      { label: "Rush TDs", value: "20" },
      { label: "Career Yards", value: "3,308" },
      { label: "Career TDs", value: "38" },
      { label: "Yards/Game", value: "231.6" },
    ],
    careerHighlight: "State-leading 1,853 yards on 9.9 per carry, two 300+ yard games",
    highlights: [
      { title: "Academics", value: "3.89", description: "GPA, full-ride academic scholarship" },
    ],
    quote: {
      text: "I\u2019ve been in Colorado for 13 years, and that\u2019s the best back I\u2019ve coached against.",
      attribution: "Ponderosa Coach Jaron Cohen",
    },
    coachQuote: {
      text: "This is a kid for whom football was taken away for a year and a half, and in some sense, it was almost taken away from him forever.",
      attribution: "Coach Jake Novotny",
    },
    community: [
      "Special Olympics volunteer",
      "Local veteran\u2019s fair volunteer",
      "Team youth football camp organizer",
      "Gave teammates rides home after practice",
    ],
    future: { title: "Dartmouth", subtitle: "Full-ride academic scholarship" },
  },

  2019: {
    headline: "Colorado\u2019s top recruit since 2010",
    bio: `Andrew Gentry, a 6\u20198\u201D, 310-pound offensive lineman from Columbine, was the country\u2019s No. 60 overall prospect and No. 6 offensive tackle. His day starts at 5:30 a.m. with chapel, then AP courses, then football until 6 p.m., then two more hours of schoolwork. He racked up 100 pancake blocks as a senior and paved the way for the state\u2019s top rushing attack. He\u2019ll serve a two-year church mission before playing college ball.`,
    stats: [
      { label: "Pancakes", value: "100" },
      { label: "Team Rush Yds", value: "3,500+" },
      { label: "Team Rush TDs", value: "50+" },
      { label: "National Rank", value: "#60" },
      { label: "OT Rank", value: "#6" },
      { label: "Offers", value: "30+" },
    ],
    highlights: [
      { title: "Academics", value: "4.33", description: "GPA, 1420 SAT (96th percentile)" },
    ],
    quote: {
      text: "I hope people realize that I can be one of the top prospects and I\u2019m still going on a mission.",
      attribution: "Andrew Gentry",
    },
    coachQuote: {
      text: "He\u2019s gotten more done in the first three hours of a day than most people get done in a week. He\u2019ll never be outworked by anyone.",
      attribution: "Coach Andy Lowry",
    },
    community: [
      "Volunteers with special needs students",
      "Peer mentor to incoming Columbine freshmen",
    ],
    future: { title: "Virginia", subtitle: "After a two-year church mission" },
  },

  2018: {
    headline: "From fashionista to Stanford",
    bio: `Barrett "Bear" Miller, a 6\u20195\u201D, 260-pound offensive tackle and defensive tackle from Eaglecrest, started his football career crying at flag football practices because his uniform wasn\u2019t comfortable enough. His primary concerns were visors, wristbands, and matching socks. Around fourth grade, something clicked, and the kid who cared only about looking good started enjoying working hard.`,
    stats: [
      { label: "Tackles", value: "34" },
      { label: "Sacks", value: "2" },
      { label: "Deadlift", value: "500+" },
      { label: "Squat", value: "400+" },
      { label: "Bench", value: "275" },
      { label: "Shot Put", value: "7th State" },
    ],
    highlights: [
      { title: "Academics", value: "4.2", description: "Weighted GPA, AP courses" },
    ],
    quote: {
      text: "When I was young, I never thought of being a Division I athlete. If you ask my family, they\u2019d describe me as a fashionista.",
      attribution: "Barrett Miller",
    },
    coachQuote: {
      text: "One of the most beautiful things you could watch was him getting on the edge. There were multiple times where he\u2019d be lead blocking 25 yards downfield, running past our backs.",
      attribution: "Coach Garrett Looney",
    },
    future: { title: "Stanford", subtitle: "Engineering" },
  },

  2017: {
    headline: "ACL comeback to first state title in Pomona history",
    bio: `Max Borghi, a 5\u201910\u201D, 195-pound running back from Pomona, tore his ACL and MCL in the junior-year state quarterfinals. Nine months later he returned to lead the Panthers to their first Class 5A state championship in a 56-49 thriller, the highest-scoring 5A title game in Colorado history.`,
    stats: [
      { label: "Rush Yards", value: "1,690" },
      { label: "Rush TDs", value: "27" },
      { label: "All-Purpose", value: "2,101" },
      { label: "Career AP Yds", value: "6,473" },
      { label: "40-Yard", value: "4.35s" },
      { label: "Bench", value: "335" },
    ],
    careerHighlight: "6,473 career all-purpose yards, 74 total touchdowns",
    highlights: [
      { title: "Academics", value: "3.86", description: "GPA, 29 ACT" },
    ],
    quote: {
      text: "My comeback was all in the mindset. I knew I wasn\u2019t going to let the injury stop me.",
      attribution: "Max Borghi",
    },
    coachQuote: {
      text: "The last half of this year, he started to show skills... that\u2019s power and ability to get tough yards.",
      attribution: "Coach Jay Madden",
    },
    community: [
      "Soup kitchen volunteer",
      "Retirement home volunteer",
    ],
    future: { title: "Washington State", subtitle: "Flipped from Colorado commitment" },
    actionImage: "/images/action/2017-max-borghi-action.jpg",
  },

  2016: {
    headline: "Back-to-back 5A state championships",
    bio: `Dylan McCaffrey, a 6\u20195\u201D, 210-pound quarterback from Valor Christian, is the son of Broncos legend Ed McCaffrey and brother of 2013 Gold Helmet winner Christian. He started 41 consecutive games, led the Eagles to consecutive state titles, and swept every major prep award including Gatorade Player of the Year and Army All-American.`,
    stats: [
      { label: "Pass Yards", value: "2,796" },
      { label: "Pass TDs", value: "31" },
      { label: "Rush Yards", value: "579" },
      { label: "Rush TDs", value: "10" },
      { label: "Career Pass Yds", value: "8,023" },
      { label: "Career Pass TDs", value: "80" },
    ],
    careerHighlight: "8,023 career passing yards, 80 touchdowns, 41 consecutive starts",
    highlights: [
      { title: "Academics", value: "3.71", description: "GPA" },
    ],
    quote: {
      text: "Even if I\u2019m not going to start as a freshman, I\u2019m going to at the very least make them take notice.",
      attribution: "Dylan McCaffrey",
    },
    coachQuote: {
      text: "He is so humble and has such a teachable spirit. It\u2019s not often that a guy has that many accomplishments and is so well-liked by his teammates.",
      attribution: "Coach Rod Sherman",
    },
    community: [
      "Dug water trenches in Thailand",
      "Dare to Play (Down syndrome football program)",
    ],
    future: { title: "Michigan", subtitle: "Following the McCaffrey family tradition" },
  },

  2015: {
    headline: "Football royalty: the Pagano family legacy",
    bio: `Carlo Kemp, a 6\u20193\u201D, 255-pound outside linebacker from Fairview, comes from Colorado football royalty. His grandfather Sam Pagano won three state titles coaching at Fairview. His uncle Chuck Pagano coached the Indianapolis Colts. His uncle John was the Chargers\u2019 defensive coordinator. Carlo completed high school in 3.5 years and enrolled early at Michigan, where Jim Harbaugh compared his attitude to Andrew Luck\u2019s.`,
    stats: [
      { label: "Career Starts", value: "43" },
      { label: "Record", value: "35-10" },
      { label: "Fundraised", value: "$53K" },
    ],
    highlights: [
      { title: "Academics", value: "4.057", description: "GPA, IB Chemistry, AP Calculus" },
    ],
    quote: {
      text: "Wearing Fairview across my chest was a huge honor. It\u2019s the most bittersweet moment in my life right now.",
      attribution: "Carlo Kemp",
    },
    coachQuote: {
      text: "He\u2019s so versatile, how could you not use him? You look over and it\u2019s the freshman on varsity hitting the sled.",
      attribution: "Coach Tom McCartney",
    },
    community: [
      "Raised $53,000 for Leukemia & Lymphoma Society",
      "Weekly mentoring at Louisville Middle School",
      "\u2018Pagano Strong\u2019 campaign for uncle\u2019s leukemia battle",
    ],
    future: { title: "Michigan", subtitle: "Early enrollment for spring ball" },
    actionImage: "/images/action/2015-carlo-kemp-action.jpg",
  },

  2014: {
    headline: "Led Cherry Creek to first state title in 18 years",
    bio: `Mike Morean, a 6\u20191\u201D, 190-pound safety from Cherry Creek, led the Bruins to a 25-24 championship win over Valor Christian, ending an 18-year title drought. His father Rich, a former Cherry Creek linebacker, had lost a state championship by one point in 1980. Also a high school All-American in lacrosse, Morean\u2019s drive sharpened when his brother Christopher was diagnosed with Hodgkin\u2019s lymphoma.`,
    stats: [
      { label: "Tackles", value: "127" },
      { label: "INTs", value: "3" },
      { label: "Passes Broken Up", value: "6" },
      { label: "Sacks", value: "1" },
      { label: "Class Rank", value: "25/845" },
      { label: "ACT", value: "29" },
    ],
    highlights: [
      { title: "Academics", value: "4.33", description: "GPA (4.44 senior year)" },
    ],
    quote: {
      text: "I\u2019ve grown up in a good house and family, and been given a lot. I\u2019ve had success and been fortunate. Now I can give back.",
      attribution: "Mike Morean",
    },
    coachQuote: {
      text: "He can run, he\u2019s physical and he\u2019s smart. Those are three pretty good qualities for a safety. Mike\u2019s a super kid. As good as I\u2019ve been around.",
      attribution: "Coach Dave Logan",
    },
    community: [
      "Service trip to Navajo Reservation in Arizona",
      "Race for the Cure participant",
      "Rocky Mountain Food Bank volunteer",
      "Ronald McDonald House volunteer",
    ],
    future: { title: "Princeton", subtitle: "Lacrosse" },
    actionImage: "/images/action/2014-mike-morean-action.jpg",
  },

  2013: {
    headline: "141 career touchdowns: a Colorado 11-man record",
    bio: `Christian McCaffrey, a 6\u20190\u201D, 195-pound running back from Valor Christian, set all-time Colorado records for career touchdowns (141) and points (848) while winning four state championships. The son of Stanford graduates Ed and Lisa McCaffrey, he scored 10 touchdowns in four state championship games and was limited to just 17 carries across four October games because the Eagles were blowing teams out.`,
    stats: [
      { label: "Career Rush", value: "5,340" },
      { label: "All-Purpose", value: "8,845" },
      { label: "Career TDs", value: "141" },
      { label: "Career Points", value: "848" },
      { label: "Rec TDs", value: "47" },
      { label: "YPC", value: "9.8" },
    ],
    careerHighlight: "Four state championships, 10 TDs in four title games",
    highlights: [
      { title: "Academics", value: "3.65", description: "GPA, Honors & AP courses" },
    ],
    quote: {
      text: "I try to stay humble, never be satisfied. At the next level, I\u2019ll be a no-name. I\u2019m excited for that. I can\u2019t wait to take that on.",
      attribution: "Christian McCaffrey",
    },
    coachQuote: {
      text: "All you had to do was see him.",
      attribution: "Former Coach Brent Vieselmeyer",
    },
    community: [
      "Two-week Rwanda mission trip",
      "Special Olympics (father\u2019s camp for individuals with Down syndrome)",
    ],
    future: { title: "Stanford", subtitle: "Following both parents" },
  },

  2012: {
    headline: "4.608 GPA, 5th in a class of 522",
    bio: `Xavier Lewis, a 6\u20190\u201D, 185-pound safety from Eaglecrest, never received a B in his life and was a serious candidate for valedictorian. He also transformed a program that went 2-8 and 3-7 into a playoff quarterfinal team while earning three consecutive All-Centennial League selections. His teacher said he\u2019d compare favorably with 22- and 23-year-olds.`,
    stats: [
      { label: "Class Rank", value: "5/522" },
      { label: "GPA", value: "4.608" },
      { label: "AP Classes", value: "6" },
      { label: "All-League", value: "3x" },
      { label: "Team Record", value: "7-5" },
      { label: "Playoff Run", value: "Quarters" },
    ],
    highlights: [
      { title: "Academics", value: "4.608", description: "GPA, never received a B" },
    ],
    quote: {
      text: "It\u2019s not the hours you put in; it\u2019s what you put into the hours.",
      attribution: "Xavier Lewis",
    },
    coachQuote: {
      text: "When I met the kid, right away I knew we could focus our entire program around a guy like that. He will knock the crap out of you.",
      attribution: "Coach Mike Schmitt",
    },
    community: [
      "Math tutor for classmates",
      "Freshman mentoring program",
      "Elementary school academic outreach",
      "Church involvement",
    ],
    future: { title: "Wyoming", subtitle: "Engineering" },
    actionImage: "/images/action/2012-xavier-lewis-action.jpg",
  },

  2011: {
    headline: "Sixth Gold Helmet winner from Grand Junction",
    bio: `Sean Rubalcaba, a 6\u20192\u00BD\u201D, 190-pound quarterback from Grand Junction, joined his uncle Alvin (1979 winner) as a Gold Helmet honoree. He led the Tigers from a 3-6 record to 11-1 and the No. 1 ranking in 5A, running an offense that topped the state at 482.7 yards per game. One of the last true 5A three-sport athletes, he also played guard in basketball and third base in baseball.`,
    stats: [
      { label: "Total Yards", value: "2,449" },
      { label: "Total TDs", value: "27" },
      { label: "Team YPG", value: "482.7" },
      { label: "Record", value: "11-1" },
      { label: "40-Yard", value: "4.55s" },
      { label: "Youth Record", value: "39-1" },
    ],
    highlights: [
      { title: "Academics", value: "3.9", description: "GPA, Vice President of Student Body" },
    ],
    quote: {
      text: "I just like competing. I\u2019m just trying to impress people with who you are.",
      attribution: "Sean Rubalcaba",
    },
    coachQuote: {
      text: "In 15 years of coaching, including 11 in NCAA Division II, he\u2019s the best all-around player I have ever had.",
      attribution: "Coach Robbie Owens",
    },
    community: [
      "Vice President of Student Body",
      "Organized Toys for Tots",
      "Delivered meals to homeless shelter",
    ],
    future: { title: "Exploring options", subtitle: "Wyoming, Nevada, Southern Utah among interested schools" },
  },

  2010: {
    headline: "First Gold Helmet winner from Pueblo",
    bio: `Ian Imamura, a 6\u20194\u201D, 205-pound tight end and linebacker from Pueblo West, made history as the first winner from Pueblo. A three-sport standout with a 35-inch vertical leap and size 15 shoes, he averaged 21.6 yards per reception with 11 touchdowns. His AP Chemistry teacher called him "humble, but a charmer with that grin."`,
    stats: [
      { label: "Receptions", value: "30" },
      { label: "Yards/Rec", value: "21.6" },
      { label: "Rec TDs", value: "11" },
      { label: "Vertical", value: "35\u2033" },
    ],
    highlights: [
      { title: "Academics", value: "3.7", description: "GPA, AP courses" },
    ],
    quote: {
      text: "You don\u2019t know how many people need help out there.",
      attribution: "Ian Imamura",
    },
    coachQuote: {
      text: "He did a great job blocking for us as well. He\u2019s kind of growing into his body, and it will be there.",
      attribution: "Coach Monte Pinkerton",
    },
    community: [
      "Tutored legally blind classmate",
      "Food drives and distribution",
      "Assisted-living facility visits",
    ],
    future: { title: "Air Force Academy", subtitle: "Considering the pilot program" },
  },

  2009: {
    headline: "Perfect 4.0 GPA since first grade",
    bio: `Matt Brown, a 6\u20193\u201D, 195-pound quarterback from tiny Limon, scored a 99-yard touchdown on his very first varsity snap as a freshman. A four-sport athlete in football, basketball, baseball, and track, he maintained a perfect 4.0 since first grade while earning 50 college credits. His father teaches math at the school. His mother works the cafeteria and drives the team bus.`,
    stats: [
      { label: "Pass Yards", value: "1,437" },
      { label: "Pass TDs", value: "15" },
      { label: "Rush Yards", value: "1,043" },
      { label: "Rush TDs", value: "20" },
      { label: "Total Points", value: "180" },
      { label: "ACT", value: "29" },
    ],
    careerHighlight: "42-6 career record, four-time South Central League champions",
    highlights: [
      { title: "Academics", value: "4.0", description: "GPA since 1st grade, 50 college credits" },
    ],
    quote: {
      text: "With everything I do, I don\u2019t have time to get into trouble. I\u2019m always working.",
      attribution: "Matt Brown",
    },
    coachQuote: {
      text: "I don\u2019t know how one individual can do more in a high school career than what Matt has done.",
      attribution: "Coach Mike O\u2019Dwyer",
    },
    community: [
      "Care packages to soldiers in Iraq",
      "Fundraisers for needy families",
      "Church mission trip to Wyoming",
      "Christmas baskets for less fortunate",
    ],
    future: { title: "Colorado School of Mines", subtitle: "Engineering or pre-med" },
    actionImage: "/images/action/2009-matt-brown-action.jpg",
  },

  2008: {
    headline: "Led Rocky Mountain to first undefeated regular season",
    bio: `Bryan Peters, a 6\u20192\u201D, 190-pound quarterback from Rocky Mountain in Fort Collins, piloted the first undefeated regular season in school history. A true three-sport star, he also went 14-0 as a pitcher and helped win two consecutive 5A state baseball championships. Only the second Gold Helmet winner in 58 years to choose a non-football sport for college.`,
    stats: [
      { label: "Pass Yards", value: "2,536" },
      { label: "Pass TDs", value: "31" },
      { label: "INTs Thrown", value: "2" },
      { label: "Rush Yards", value: "1,013" },
      { label: "Rush TDs", value: "12" },
      { label: "Pitching", value: "14-0" },
    ],
    careerHighlight: "9-0 regular season, 31 TDs to just 2 INTs",
    highlights: [
      { title: "Academics", value: "4.04", description: "GPA, AP Calculus & AP Statistics" },
      { title: "Baseball", value: "14-0", description: "Pitching record, 2 state titles" },
    ],
    quote: {
      text: "I was going to have fun either way. I love both sports, but I was going to lose one of them.",
      attribution: "Bryan Peters",
    },
    coachQuote: {
      text: "He was as good as I\u2019ve seen in 16 years of coaching prep football.",
      attribution: "Dave Logan, 1971 Gold Helmet winner",
    },
    community: [
      "Link Crew mentor for incoming freshmen",
      "Angel Fund/Lobo Fund (assists less fortunate students)",
      "Adopt-A-Family program volunteer",
    ],
    future: { title: "Nebraska", subtitle: "Baseball (pitcher/third base)" },
  },

  2007: {
    headline: "10 interceptions, 8 blocked kicks",
    bio: `Tyler Jackson, a 6\u20191\u201D, 185-pound cornerback from Douglas County, started 41 consecutive games and produced one of the most prolific defensive seasons in Colorado history. He picked off three passes in an 8-minute stretch against Rangeview and blocked eight kicks. His state championship ended with a heartbreaker: a punt block returned for a touchdown was negated by penalty, and Douglas County lost in overtime.`,
    stats: [
      { label: "INTs", value: "10" },
      { label: "Blocked Kicks", value: "8" },
      { label: "Starts", value: "41" },
      { label: "Career Record", value: "35-6" },
      { label: "Playoff Record", value: "11-2" },
      { label: "40-Yard", value: "4.5s" },
    ],
    highlights: [
      { title: "Academics", value: "3.82", description: "GPA, college-level courses" },
    ],
    quote: {
      text: "It was hard to swallow. I could have been the guy who blocked the punt, ran it back and won the state championship.",
      attribution: "Tyler Jackson",
    },
    coachQuote: {
      text: "Everything is natural to him. He moves naturally, then he explodes. To me, it\u2019s like watching a deer run. Boom! He\u2019s gone.",
      attribution: "Coach Jeff Ketron",
    },
    community: [
      "Douglas County Literacy Program",
      "Diversity Club member",
      "Castle Rock Rotary Student of the Month (twice)",
      "Advocated for mandatory community service",
    ],
    future: { title: "Boise State", subtitle: "Business" },
  },

  1999: {
    headline: "Named chief of a village in Ghana",
    bio: `Marcus Houston, a 6\u20192\u201D, 205-pound running back from Thomas Jefferson, was ranked the nation\u2019s top RB prospect by SuperPrep. Off the field, he created "Just Say Know," a literacy program where he visited middle schools to encourage reading and writing, funding prizes with money earned shoveling snow. A trip to Ghana led to his appointment as chief (Nene Akrofie) of Matsekope village, tasked with coordinating development. He was the last DPS winner before Elian Oliva in 2025.`,
    stats: [
      { label: "Rush Yards", value: "1,533" },
      { label: "Rush TDs", value: "22" },
      { label: "National Rank", value: "#1 RB" },
    ],
    highlights: [
      { title: "Academics", value: "3.5", description: "GPA, 24th of 205, accelerated courses" },
    ],
    quote: {
      text: "Don\u2019t sell yourself short in athletics or academics. Set your goals high and try to reach them.",
      attribution: "Marcus Houston",
    },
    coachQuote: {
      text: "His talent is as good as anybody who we\u2019ve had here in years, which says something, because we\u2019ve had some good ones.",
      attribution: "Coach Tim Cross",
    },
    community: [
      "Created \u2018Just Say Know\u2019 literacy program",
      "Named chief of Matsekope village, Ghana",
      "Amnesty International conference speaker",
      "BBC featured appearance on human rights",
    ],
    future: { title: "Colorado", subtitle: "International Business" },
  },
};
