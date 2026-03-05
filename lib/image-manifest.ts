// Image manifest - maps winners to their optimized image paths (manually maintained)

type ImageVariant = { jpg: string; webp: string };

type WinnerImageSet = {
  portrait: ImageVariant;
  thumb: ImageVariant;
  web: ImageVariant;
  modal: ImageVariant;
  /** CSS object-position for cropping (face-priority), e.g. "50% 20%" */
  focalPoint?: string;
};

export const IMAGE_MANIFEST: Partial<Record<number, WinnerImageSet>> = {
  2025: {
    portrait: {
      jpg: "/images/optimized/2025-elian-oliva-portrait.jpg",
      webp: "/images/optimized/2025-elian-oliva-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2025-elian-oliva-thumb.jpg",
      webp: "/images/optimized/2025-elian-oliva-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2025-elian-oliva-web.jpg",
      webp: "/images/optimized/2025-elian-oliva-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2025-elian-oliva-modal.jpg",
      webp: "/images/optimized/2025-elian-oliva-modal.webp",
    },
    focalPoint: "50% 25%",
  },
  2024: {
    portrait: {
      jpg: "/images/optimized/2024-marcus-mozer-portrait.jpg",
      webp: "/images/optimized/2024-marcus-mozer-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2024-marcus-mozer-thumb.jpg",
      webp: "/images/optimized/2024-marcus-mozer-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2024-marcus-mozer-web.jpg",
      webp: "/images/optimized/2024-marcus-mozer-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2024-marcus-mozer-modal.jpg",
      webp: "/images/optimized/2024-marcus-mozer-modal.webp",
    },
    focalPoint: "50% 25%",
  },
  2023: {
    portrait: {
      jpg: "/images/optimized/2023-josh-snyder-portrait.jpg",
      webp: "/images/optimized/2023-josh-snyder-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2023-josh-snyder-thumb.jpg",
      webp: "/images/optimized/2023-josh-snyder-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2023-josh-snyder-web.jpg",
      webp: "/images/optimized/2023-josh-snyder-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2023-josh-snyder-modal.jpg",
      webp: "/images/optimized/2023-josh-snyder-modal.webp",
    },
    focalPoint: "50% 15%",
  },
  2022: {
    portrait: {
      jpg: "/images/optimized/2022-brayden-dorman-portrait.jpg",
      webp: "/images/optimized/2022-brayden-dorman-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2022-brayden-dorman-thumb.jpg",
      webp: "/images/optimized/2022-brayden-dorman-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2022-brayden-dorman-web.jpg",
      webp: "/images/optimized/2022-brayden-dorman-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2022-brayden-dorman-modal.jpg",
      webp: "/images/optimized/2022-brayden-dorman-modal.webp",
    },
    focalPoint: "50% 20%",
  },
  2021: {
    portrait: {
      jpg: "/images/optimized/2021-gavin-sawchuk-portrait.jpg",
      webp: "/images/optimized/2021-gavin-sawchuk-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2021-gavin-sawchuk-thumb.jpg",
      webp: "/images/optimized/2021-gavin-sawchuk-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2021-gavin-sawchuk-web.jpg",
      webp: "/images/optimized/2021-gavin-sawchuk-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2021-gavin-sawchuk-modal.jpg",
      webp: "/images/optimized/2021-gavin-sawchuk-modal.webp",
    },
    focalPoint: "70% 20%",
  },
  2020: {
    portrait: {
      jpg: "/images/optimized/2020-q-jones-jr-portrait.jpg",
      webp: "/images/optimized/2020-q-jones-jr-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2020-q-jones-jr-thumb.jpg",
      webp: "/images/optimized/2020-q-jones-jr-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2020-q-jones-jr-web.jpg",
      webp: "/images/optimized/2020-q-jones-jr-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2020-q-jones-jr-modal.jpg",
      webp: "/images/optimized/2020-q-jones-jr-modal.webp",
    },
    focalPoint: "50% 20%",
  },
  2019: {
    portrait: {
      jpg: "/images/optimized/2019-andrew-gentry-portrait.jpg",
      webp: "/images/optimized/2019-andrew-gentry-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2019-andrew-gentry-thumb.jpg",
      webp: "/images/optimized/2019-andrew-gentry-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2019-andrew-gentry-web.jpg",
      webp: "/images/optimized/2019-andrew-gentry-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2019-andrew-gentry-modal.jpg",
      webp: "/images/optimized/2019-andrew-gentry-modal.webp",
    },
    focalPoint: "55% 20%",
  },
  2018: {
    portrait: {
      jpg: "/images/optimized/2018-barrett-miller-portrait.jpg",
      webp: "/images/optimized/2018-barrett-miller-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2018-barrett-miller-thumb.jpg",
      webp: "/images/optimized/2018-barrett-miller-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2018-barrett-miller-web.jpg",
      webp: "/images/optimized/2018-barrett-miller-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2018-barrett-miller-modal.jpg",
      webp: "/images/optimized/2018-barrett-miller-modal.webp",
    },
    focalPoint: "50% 15%",
  },
  2017: {
    portrait: {
      jpg: "/images/optimized/2017-max-borghi-portrait.jpg",
      webp: "/images/optimized/2017-max-borghi-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2017-max-borghi-thumb.jpg",
      webp: "/images/optimized/2017-max-borghi-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2017-max-borghi-web.jpg",
      webp: "/images/optimized/2017-max-borghi-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2017-max-borghi-modal.jpg",
      webp: "/images/optimized/2017-max-borghi-modal.webp",
    },
    focalPoint: "55% 20%",
  },
  2016: {
    portrait: {
      jpg: "/images/optimized/2016-dylan-mccaffrey-portrait.jpg",
      webp: "/images/optimized/2016-dylan-mccaffrey-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2016-dylan-mccaffrey-thumb.jpg",
      webp: "/images/optimized/2016-dylan-mccaffrey-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2016-dylan-mccaffrey-web.jpg",
      webp: "/images/optimized/2016-dylan-mccaffrey-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2016-dylan-mccaffrey-modal.jpg",
      webp: "/images/optimized/2016-dylan-mccaffrey-modal.webp",
    },
    focalPoint: "55% 20%",
  },
  2015: {
    portrait: {
      jpg: "/images/optimized/2015-carlo-kemp-portrait.jpg",
      webp: "/images/optimized/2015-carlo-kemp-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2015-carlo-kemp-thumb.jpg",
      webp: "/images/optimized/2015-carlo-kemp-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2015-carlo-kemp-web.jpg",
      webp: "/images/optimized/2015-carlo-kemp-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2015-carlo-kemp-modal.jpg",
      webp: "/images/optimized/2015-carlo-kemp-modal.webp",
    },
    focalPoint: "50% 18%",
  },
  2014: {
    portrait: {
      jpg: "/images/optimized/2014-mike-morean-portrait.jpg",
      webp: "/images/optimized/2014-mike-morean-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2014-mike-morean-thumb.jpg",
      webp: "/images/optimized/2014-mike-morean-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2014-mike-morean-web.jpg",
      webp: "/images/optimized/2014-mike-morean-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2014-mike-morean-modal.jpg",
      webp: "/images/optimized/2014-mike-morean-modal.webp",
    },
    focalPoint: "50% 22%",
  },
  2013: {
    portrait: {
      jpg: "/images/optimized/2013-christian-mccaffrey-portrait.jpg",
      webp: "/images/optimized/2013-christian-mccaffrey-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2013-christian-mccaffrey-thumb.jpg",
      webp: "/images/optimized/2013-christian-mccaffrey-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2013-christian-mccaffrey-web.jpg",
      webp: "/images/optimized/2013-christian-mccaffrey-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2013-christian-mccaffrey-modal.jpg",
      webp: "/images/optimized/2013-christian-mccaffrey-modal.webp",
    },
    focalPoint: "50% 20%",
  },
  2012: {
    portrait: {
      jpg: "/images/optimized/2012-xavier-lewis-portrait.jpg",
      webp: "/images/optimized/2012-xavier-lewis-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2012-xavier-lewis-thumb.jpg",
      webp: "/images/optimized/2012-xavier-lewis-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2012-xavier-lewis-web.jpg",
      webp: "/images/optimized/2012-xavier-lewis-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2012-xavier-lewis-modal.jpg",
      webp: "/images/optimized/2012-xavier-lewis-modal.webp",
    },
    focalPoint: "45% 22%",
  },
  2011: {
    portrait: {
      jpg: "/images/optimized/2011-sean-rubalcaba-portrait.jpg",
      webp: "/images/optimized/2011-sean-rubalcaba-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2011-sean-rubalcaba-thumb.jpg",
      webp: "/images/optimized/2011-sean-rubalcaba-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2011-sean-rubalcaba-web.jpg",
      webp: "/images/optimized/2011-sean-rubalcaba-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2011-sean-rubalcaba-modal.jpg",
      webp: "/images/optimized/2011-sean-rubalcaba-modal.webp",
    },
    focalPoint: "50% 15%",
  },
  2010: {
    portrait: {
      jpg: "/images/optimized/2010-ian-imamura-portrait.jpg",
      webp: "/images/optimized/2010-ian-imamura-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2010-ian-imamura-thumb.jpg",
      webp: "/images/optimized/2010-ian-imamura-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2010-ian-imamura-web.jpg",
      webp: "/images/optimized/2010-ian-imamura-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2010-ian-imamura-modal.jpg",
      webp: "/images/optimized/2010-ian-imamura-modal.webp",
    },
    focalPoint: "50% 20%",
  },
  2009: {
    portrait: {
      jpg: "/images/optimized/2009-matt-brown-portrait.jpg",
      webp: "/images/optimized/2009-matt-brown-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2009-matt-brown-thumb.jpg",
      webp: "/images/optimized/2009-matt-brown-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2009-matt-brown-web.jpg",
      webp: "/images/optimized/2009-matt-brown-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2009-matt-brown-modal.jpg",
      webp: "/images/optimized/2009-matt-brown-modal.webp",
    },
    focalPoint: "50% 20%",
  },
  2008: {
    portrait: {
      jpg: "/images/optimized/2008-bryan-peters-portrait.jpg",
      webp: "/images/optimized/2008-bryan-peters-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2008-bryan-peters-thumb.jpg",
      webp: "/images/optimized/2008-bryan-peters-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2008-bryan-peters-web.jpg",
      webp: "/images/optimized/2008-bryan-peters-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2008-bryan-peters-modal.jpg",
      webp: "/images/optimized/2008-bryan-peters-modal.webp",
    },
    focalPoint: "50% 30%",
  },
  2007: {
    portrait: {
      jpg: "/images/optimized/2007-tyler-jackson-portrait.jpg",
      webp: "/images/optimized/2007-tyler-jackson-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/2007-tyler-jackson-thumb.jpg",
      webp: "/images/optimized/2007-tyler-jackson-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/2007-tyler-jackson-web.jpg",
      webp: "/images/optimized/2007-tyler-jackson-web.webp",
    },
    modal: {
      jpg: "/images/optimized/2007-tyler-jackson-modal.jpg",
      webp: "/images/optimized/2007-tyler-jackson-modal.webp",
    },
    focalPoint: "45% 18%",
  },
  1999: {
    portrait: {
      jpg: "/images/optimized/1999-marcus-houston-portrait.jpg",
      webp: "/images/optimized/1999-marcus-houston-portrait.webp",
    },
    thumb: {
      jpg: "/images/optimized/1999-marcus-houston-thumb.jpg",
      webp: "/images/optimized/1999-marcus-houston-thumb.webp",
    },
    web: {
      jpg: "/images/optimized/1999-marcus-houston-web.jpg",
      webp: "/images/optimized/1999-marcus-houston-web.webp",
    },
    modal: {
      jpg: "/images/optimized/1999-marcus-houston-modal.jpg",
      webp: "/images/optimized/1999-marcus-houston-modal.webp",
    },
    focalPoint: "45% 20%",
  },
};

export function getWinnerImage(
  year: number,
  type: "portrait" | "thumb" | "web" | "modal" = "portrait"
) {
  const entry = IMAGE_MANIFEST[year];
  if (!entry) return undefined;
  return { ...entry[type], focalPoint: entry.focalPoint };
}
