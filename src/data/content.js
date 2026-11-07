(() => {
// Add future animation files here. Each item accepts image or video media.
const carouselItems = [
  { type: "image", src: "./assets/illustrations/dj-mayu.png", frames: ["./assets/illustrations/dj-frame-1.svg", "./assets/illustrations/dj-frame-2.svg", "./assets/illustrations/dj-frame-3.svg"], frameDuration: 280, alt: "DJ Mayu, איור של מאיה" },
];
const carouselSettings = { minimumTiles: 6, secondsPerTile: 7 };

// Add another project object to extend the home page.
const projects = [
  {
    "id": "mix",
    "title": "DJ והפקה מוזיקלית",
    "cover": "./assets/illustrations/dj-mayu.png",
    "contain": true,
    "description": "מיקס, רמיקסים והפקה מוזיקלית.",
    "tags": [
      "מוזיקה",
      "מיקס",
      "הפקה"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/illustrations/dj-mayu.png",
        "alt": "איור DJ Mayu",
        "caption": "DJ Mayu",
        "tags": [
          "איור",
          "מוזיקה"
        ]
      }
    ]
  },
  {
    "id": "creative",
    "title": "קריאייטיב",
    "cover": "./assets/images/lobby-2.webp",
    "description": "רעיונות וחיבורים בין תוכן, עיצוב וחוויה.",
    "tags": [
      "קריאייטיב",
      "שפה חזותית",
      "חוויה"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/images/lobby-2.webp",
        "alt": "תמונת אווירה למשבצת הקריאייטיב",
        "tags": [
          "קריאייטיב",
          "חוויה"
        ]
      }
    ]
  },
  {
    "id": "social",
    "title": "סושיאל ותוכן",
    "cover": "./assets/images/social-1.webp",
    "description": "שני סרטוני סושיאל. התפקיד שלי הוא הופעה מול מצלמה ואלתור. הקונספט והעריכה נעשו על ידי אחרים.",
    "tags": [
      "סושיאל",
      "הופעה מול מצלמה",
      "אלתור"
    ],
    "media": [
      {
        "type": "video",
        "src": "./assets/videos/social-1.mp4",
        "poster": "./assets/images/social-1.webp",
        "alt": "סרטון סושיאל 1",
        "tags": [
          "סושיאל",
          "הופעה מול מצלמה",
          "אלתור"
        ]
      },
      {
        "type": "video",
        "src": "./assets/videos/social-2.mp4",
        "poster": "./assets/images/social-2.webp",
        "alt": "סרטון סושיאל 2",
        "tags": [
          "סושיאל",
          "הופעה מול מצלמה",
          "אלתור"
        ]
      }
    ]
  },
  {
    "id": "set-design",
    "title": "עיצוב תפאורה וחלל",
    "cover": "./assets/images/lobby-3.webp",
    "description": "עיצוב לובי, תפאורה ואביזרים. מהעבודה בסדנה ופרטי החיבורים ועד למיצגים בחלל המלון.",
    "tags": [
      "תפאורה",
      "עיצוב חלל",
      "אביזרים",
      "עבודת יד"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/images/lobby-3.webp",
        "alt": "תפאורת מסגרות ירוקות בלובי",
        "tags": [
          "תפאורה",
          "עיצוב חלל",
          "הקמה"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/lobby-2.webp",
        "alt": "מיצג אדום ולב מבלונים",
        "tags": [
          "תפאורה",
          "עיצוב חלל",
          "הקמה"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/lobby-1.webp",
        "alt": "מיצג עם בלונים ודמויות בלובי",
        "tags": [
          "תפאורה",
          "עיצוב חלל",
          "הקמה"
        ]
      },
      {
        "type": "video",
        "src": "./assets/videos/set-process.mp4",
        "poster": "./assets/images/set-poster.webp",
        "alt": "תהליך עבודה על התפאורה",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-6.webp",
        "alt": "מסגרת תפאורה מעוטרת בעלים",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-5.webp",
        "alt": "סדנת העבודה",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-4.webp",
        "alt": "חלקי תפאורה בסדנה",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-3.webp",
        "alt": "קישוט ידית עץ",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-10.webp",
        "alt": "חיבור באביזר צהוב",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-7.webp",
        "alt": "פין ושרשרת במסגרת",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-8.webp",
        "alt": "רצועת חיבור באביזר",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-1.webp",
        "alt": "עבודה על כובע",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      },
      {
        "type": "image",
        "src": "./assets/images/set-2.webp",
        "alt": "עבודה על אביזר מקופל",
        "tags": [
          "תפאורה",
          "אביזרים",
          "עבודת יד"
        ]
      }
    ]
  },
  {
    "id": "performance",
    "title": "פרפורמנס",
    "cover": "./assets/images/social-2.webp",
    "description": "הופעה מול מצלמה ואלתור.",
    "tags": [
      "הופעה",
      "אלתור",
      "מול מצלמה"
    ],
    "media": [
      {
        "type": "video",
        "src": "./assets/videos/social-2.mp4",
        "poster": "./assets/images/social-2.webp",
        "alt": "הופעה מול מצלמה",
        "tags": [
          "הופעה",
          "אלתור",
          "מול מצלמה"
        ]
      }
    ]
  },
  {
    "id": "animation",
    "title": "איור ואנימציה",
    "cover": "./assets/illustrations/dj-mayu.png",
    "contain": true,
    "description": "איורים, דמויות ותנועה.",
    "tags": [
      "איור",
      "אנימציה",
      "דמויות"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/illustrations/dj-frame-2.svg",
        "alt": "DJ Mayu — פריים מתוך האיור",
        "tags": [
          "איור",
          "אנימציה",
          "דמויות"
        ]
      }
    ]
  },
  {
    "id": "graphic",
    "title": "עיצוב גרפי",
    "cover": "./assets/illustrations/dj-mayu.png",
    "contain": true,
    "description": "איור DJ Mayu והזהות החזותית של PICKY, כלי לבחירת צבעים לכרום.",
    "tags": [
      "איור",
      "עיצוב גרפי",
      "עיצוב ממשק"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/illustrations/dj-mayu.png",
        "alt": "DJ Mayu — איור של דמות מתקלטת",
        "caption": "DJ Mayu",
        "tags": [
          "איור",
          "מוזיקה",
          "עיצוב גרפי"
        ]
      },
      {
        "type": "image",
        "src": "./assets/branding/picky.png",
        "alt": "האייקון של PICKY",
        "caption": "PICKY",
        "link": "https://github.com/MayaBachrach/picky",
        "tags": [
          "עיצוב גרפי",
          "עיצוב ממשק",
          "כלי צבע"
        ]
      }
    ]
  },
  {
    "id": "app-development",
    "title": "מוצרים דיגיטליים",
    "cover": "./assets/branding/picky.png",
    "contain": true,
    "description": "מוצרים דיגיטליים, ממשקים וכלים אינטראקטיביים.",
    "tags": [
      "פיתוח אפליקציות",
      "ממשק משתמש",
      "מוצרים דיגיטליים"
    ],
    "media": [
      {
        "type": "image",
        "src": "./assets/branding/picky.png",
        "alt": "PICKY — תמונה למשבצת הפיתוח",
        "tags": [
          "פיתוח אפליקציות",
          "מוצרים דיגיטליים"
        ]
      }
    ]
  }
];


window.PORTFOLIO_CONTENT = { carouselItems, carouselSettings, projects };
})();
