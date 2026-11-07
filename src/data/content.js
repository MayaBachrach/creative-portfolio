(() => {
// Add future animation files here. Each item accepts image or video media.
const carouselItems = [
  { type: "image", src: "./assets/illustrations/dj-mayu.png", frames: ["./assets/illustrations/dj-frame-1.svg", "./assets/illustrations/dj-frame-2.svg", "./assets/illustrations/dj-frame-3.svg"], frameDuration: 280, alt: "DJ Mayu, איור של מאיה" },
];
const carouselSettings = { minimumTiles: 6, secondsPerTile: 7 };

// Add another project object to extend the home page.
const projects = [
  {
    id: "mix", title: "הפקה מוזיקלית ומיקס", cover: "./assets/illustrations/dj-mayu.png", contain: true,
    description: "מיקס, רמיקסים והפקה מוזיקלית.",
    tags: ["מוזיקה", "מיקס", "הפקה"],
    media: [{ type: "image", src: "./assets/illustrations/dj-mayu.png", alt: "איור DJ Mayu", caption: "DJ Mayu", tags: ["איור", "מוזיקה"] }],
  },
  {
    id: "social", title: "תוכן וסושיאל", cover: "./assets/images/social-1.webp",
    description: "שני סרטוני סושיאל. התפקיד שלי הוא הופעה מול מצלמה ואלתור. הקונספט והעריכה נעשו על ידי אחרים.",
    tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    media: [1, 2].map(number => ({
      type: "video", src: `./assets/videos/social-${number}.mp4`, poster: `./assets/images/social-${number}.webp`,
      alt: `סרטון סושיאל ${number}`, tags: ["סושיאל", "הופעה מול מצלמה", "אלתור"],
    })),
  },
  {
    id: "set-design", title: "עיצוב תפאורה וחלל", cover: "./assets/images/lobby-3.webp",
    description: "עיצוב לובי, תפאורה ואביזרים. מהעבודה בסדנה ופרטי החיבורים ועד למיצגים בחלל המלון.",
    tags: ["תפאורה", "עיצוב חלל", "אביזרים", "עבודת יד"],
    media: [
      ...[3, 2, 1].map(number => ({
        type: "image", src: `./assets/images/lobby-${number}.webp`,
        alt: ["מיצג עם בלונים ודמויות בלובי", "מיצג אדום ולב מבלונים", "תפאורת מסגרות ירוקות בלובי"][number - 1],
        tags: ["תפאורה", "עיצוב חלל", "הקמה"],
      })),
      { type: "video", src: "./assets/videos/set-process.mp4", poster: "./assets/images/set-poster.webp", alt: "תהליך עבודה על התפאורה", tags: ["תפאורה", "אביזרים", "עבודת יד"] },
      ...[
        [6, "מסגרת תפאורה מעוטרת בעלים"], [5, "סדנת העבודה"], [4, "חלקי תפאורה בסדנה"],
        [3, "קישוט ידית עץ"], [10, "חיבור באביזר צהוב"], [7, "פין ושרשרת במסגרת"],
        [8, "רצועת חיבור באביזר"], [1, "עבודה על כובע"], [2, "עבודה על אביזר מקופל"],
      ].map(([number, alt]) => ({ type: "image", src: `./assets/images/set-${number}.webp`, alt, tags: ["תפאורה", "אביזרים", "עבודת יד"] })),
    ],
  },
  {
    id: "graphic", title: "עיצוב גרפי", cover: "./assets/illustrations/dj-mayu.png", contain: true,
    description: "איור DJ Mayu והזהות החזותית של PICKY, כלי לבחירת צבעים לכרום.",
    tags: ["איור", "עיצוב גרפי", "עיצוב ממשק"],
    media: [
      { type: "image", src: "./assets/illustrations/dj-mayu.png", alt: "DJ Mayu — איור של דמות מתקלטת", caption: "DJ Mayu", tags: ["איור", "מוזיקה", "עיצוב גרפי"] },
      { type: "image", src: "./assets/branding/picky.png", alt: "האייקון של PICKY", caption: "PICKY", link: "https://github.com/MayaBachrach/picky", tags: ["עיצוב גרפי", "עיצוב ממשק", "כלי צבע"] },
    ],
  },
  {
    id: "performance", title: "הופעה ופרפורמנס", cover: "./assets/images/social-2.webp",
    description: "הופעה מול מצלמה ואלתור.", tags: ["הופעה", "אלתור", "מול מצלמה"],
    media: [{ type: "video", src: "./assets/videos/social-2.mp4", poster: "./assets/images/social-2.webp", alt: "הופעה מול מצלמה", tags: ["הופעה", "אלתור", "מול מצלמה"] }],
  },
  {
    id: "animation", title: "איור ואנימציה", cover: "./assets/illustrations/dj-mayu.png", contain: true,
    description: "איורים, דמויות ותנועה.", tags: ["איור", "אנימציה", "דמויות"],
    media: [{ type: "image", src: "./assets/illustrations/dj-frame-2.svg", alt: "DJ Mayu — פריים מתוך האיור", tags: ["איור", "אנימציה", "דמויות"] }],
  },
  {
    id: "concepts", title: "פיתוח קונספטים", cover: "./assets/branding/picky.png", contain: true,
    description: "מרעיון ראשוני לכיוון ברור: פיתוח רעיונות, סיפורים ושפה חזותית.", tags: ["קונספט", "רעיונאות", "פיתוח רעיון"],
    media: [{ type: "image", src: "./assets/branding/picky.png", alt: "PICKY — תמונה לסידור המשבצת", tags: ["קונספט", "רעיונאות"] }],
  },
  {
    id: "creative", title: "קריאייטיב", cover: "./assets/images/lobby-2.webp",
    description: "רעיונות וחיבורים בין תוכן, עיצוב וחוויה.", tags: ["קריאייטיב", "שפה חזותית", "חוויה"],
    media: [{ type: "image", src: "./assets/images/lobby-2.webp", alt: "תמונת אווירה למשבצת הקריאייטיב", tags: ["קריאייטיב", "חוויה"] }],
  },
  {
    id: "storytelling", title: "סטוריטלינג", cover: "./assets/images/social-1.webp",
    description: "סיפורים, דמויות ונרטיבים — מהרעיון ועד לאופן שבו הסיפור פוגש את הקהל.",
    tags: ["סטוריטלינג", "סיפור", "דמויות"],
    media: [{ type: "image", src: "./assets/images/social-1.webp", alt: "תמונת אווירה למשבצת הסטוריטלינג", tags: ["סטוריטלינג", "סיפור"] }],
  },
  {
    id: "app-development", title: "פיתוח אפליקציות", cover: "./assets/branding/picky.png", contain: true,
    description: "מוצרים דיגיטליים, ממשקים וכלים אינטראקטיביים.",
    tags: ["פיתוח אפליקציות", "ממשק משתמש", "מוצרים דיגיטליים"],
    media: [{ type: "image", src: "./assets/branding/picky.png", alt: "PICKY — תמונה למשבצת הפיתוח", tags: ["פיתוח אפליקציות", "מוצרים דיגיטליים"] }],
  },
];


window.PORTFOLIO_CONTENT = { carouselItems, carouselSettings, projects };
})();
