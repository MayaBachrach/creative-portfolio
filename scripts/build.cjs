const fs=require("node:fs"),vm=require("node:vm"),crypto=require("node:crypto");
const read=p=>fs.readFileSync(p,"utf8");
const ctx={window:{}};for(const p of ["src/data/content.js","src/data/lettering.js","src/data/latin-lettering.js","src/data/shapes.js"])vm.runInNewContext(read(p),ctx);
const active=ctx.window.PORTFOLIO_CONTENT;active.projects=active.projects.filter(p=>p.id==="mix");
const chars=new Set(("MAYA BACHRACH DJ "+active.projects.map(p=>p.title).join(" ")+" DJ והפקת סאונד בואו ניצור משהו יפה ביחד (:").replace(/\s/g,""));
const glyphs=Object.fromEntries(Object.entries(ctx.window.PORTFOLIO_LETTERING).filter(([c])=>chars.has(c)));
let app=read("src/js/cursors.js")+"\nwindow.PORTFOLIO_CONTENT="+JSON.stringify(active)+";\nwindow.PORTFOLIO_LETTERING="+JSON.stringify(glyphs)+";\nwindow.PORTFOLIO_SHAPES="+JSON.stringify(ctx.window.PORTFOLIO_SHAPES)+";\n";
for(const p of ["src/js/lettering.js","src/js/shapes.js","src/js/portfolio.js","src/js/music.js","src/js/scrollbars.js"]){let s=read(p);if(p.endsWith("portfolio.js"))s=s.replace(/^renderCards\(\);/m,"// Inactive project grid is not built in this version.").replace('const accent = theme.getPropertyValue(openingStar ? "--carousel-color" : source ? "--card-accent" : "--accent-1").trim();','const accent = theme.getPropertyValue(openingStar ? "--carousel-color" : source ? "--card-accent" : "--accent-1").trim() || "var(--accent-1)";');app+="\n"+s;}
new vm.Script(app);
fs.mkdirSync("assets/runtime",{recursive:true});const hash=crypto.createHash("sha256").update(app).digest("hex").slice(0,10);const out="assets/runtime/app."+hash+".js";fs.writeFileSync(out,app);
let css=read("src/css/style.css").replace(/url\(['"]?\.\.\/\.\.\/(assets\/typography\/[^'")?]+)(?:\?[^'")]+)?['"]?\)/g,(_,p)=>'url("data:image/svg+xml;base64,'+fs.readFileSync(p).toString("base64")+'")');
let html=read("src/template/index.html").replace(/<script[^>]*src="\.\/src\/[^"]*"[^>]*><\/script>\s*/g,"").replace(/<link rel="stylesheet" href="\.\/src\/css[^"]*">/,'<style>'+css+'</style>');
html=html.replace("</head>","<script>"+read("src/config/site-config.js")+"\nwindow.updatePortfolioCursors=function(){};\n"+read("src/js/theme.js")+"</script>\n<script src=\"./"+out+"\" defer></script>\n</head>");
fs.writeFileSync("index.html",html);
console.log(JSON.stringify({runtime:out,bytes:Buffer.byteLength(app),glyphs:Object.keys(glyphs).length,projects:active.projects.length}));
