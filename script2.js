const isTouch = window.matchMedia("(hover: none)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===========================
   LOADER
=========================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1200);
});

/* ===========================
   MOBILE MENU
=========================== */
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

function closeMenu() {
  menu.classList.remove("open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
});

menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

document.addEventListener("click", e => {
  if (!e.target.closest("nav")) closeMenu();
});

/* ===========================
   COUNTDOWN
=========================== */
const weddingDate = new Date("March 12, 2027 20:00:00").getTime();

function updateCountdown() {
  const distance = weddingDate - Date.now();

  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("countdown").innerHTML = "<h2>🎉 بدأ الحفل 🎉</h2>";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / 86400000);
  document.getElementById("hours").textContent = Math.floor((distance % 86400000) / 3600000);
  document.getElementById("minutes").textContent = Math.floor((distance % 3600000) / 60000);
  document.getElementById("seconds").textContent = Math.floor((distance % 60000) / 1000);
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

/* ===========================
   FLOWERS (أخف على الموبايل)
=========================== */
const flowers = document.getElementById("flowers");
const maxFlowers = isTouch ? 8 : 25;

function createFlower() {
  if (document.hidden || flowers.children.length >= maxFlowers) return;

  const flower = document.createElement("div");
  flower.textContent = "🌸";
  flower.classList.add("flower");
  flower.style.left = Math.random() * 95 + "vw";
  flower.style.fontSize = Math.random() * 14 + (isTouch ? 14 : 18) + "px";
  flower.style.animationDuration = Math.random() * 5 + 6 + "s";
  flowers.appendChild(flower);

  setTimeout(() => flower.remove(), 11000);
}

if (!reduceMotion) setInterval(createFlower, isTouch ? 900 : 350);

/* ===========================
   SCROLL ANIMATION
=========================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll("section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});

/* ===========================
   BACK TO TOP
=========================== */
const topBtn = document.createElement("button");
topBtn.textContent = "⬆";
topBtn.id = "topBtn";
topBtn.setAttribute("aria-label", "للأعلى");
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 500 ? "block" : "none";
}, { passive: true });

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ===========================
   TOAST + CONFETTI
=========================== */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

const form = document.querySelector("form");

/* الصق هنا رابط Web App اللي هتاخده من Google Apps Script
   (الخطوات في ملف README-RSVP.txt) */
const SHEET_URL = "";

function launchConfetti() {
  if (reduceMotion) return;
  const count = isTouch ? 50 : 120;
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    c.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  if (!SHEET_URL) {
    showToast("لم يتم ربط النموذج بالشيت بعد");
    return;
  }

  const btn = form.querySelector("button[type=submit]");
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "جاري الإرسال...";

  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script مش بيرجّع CORS headers، والبيانات بتتسجل عادي
      body: new URLSearchParams(new FormData(form))
    });
    showToast("❤️ شكراً لتأكيد حضوركم ❤️");
    form.reset();
    launchConfetti();
  } catch (err) {
    showToast("تعذّر الإرسال، تأكد من الإنترنت وحاول مرة أخرى");
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
});

/* ===========================
   MUSIC
   (ملف الأغنية لازم يتحط في music/wedding.mp3)
=========================== */
const music = new Audio("music/wedding.mp3");
music.loop = true;
music.preload = "none";

const musicBtn = document.createElement("button");
musicBtn.textContent = "🎵";
musicBtn.id = "musicBtn";
musicBtn.setAttribute("aria-label", "تشغيل الموسيقى");
document.body.appendChild(musicBtn);

let playing = false;
let musicBroken = false;

music.addEventListener("error", () => {
  musicBroken = true;
  musicBtn.style.display = "none"; // نخفي الزر لو الملف مش موجود
});

musicBtn.onclick = () => {
  if (musicBroken) return;
  if (!playing) {
    music.play().then(() => {
      musicBtn.textContent = "⏸";
      playing = true;
    }).catch(() => {});
  } else {
    music.pause();
    musicBtn.textContent = "🎵";
    playing = false;
  }
};

/* ===========================
   IMAGE POPUP
=========================== */
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    const box = document.createElement("div");
    box.className = "lightbox";

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;

    const close = document.createElement("button");
    close.textContent = "✕";
    close.setAttribute("aria-label", "إغلاق");

    box.append(image, close);

    const remove = () => {
      box.remove();
      document.body.classList.remove("no-scroll");
    };

    box.addEventListener("click", remove);
    document.body.classList.add("no-scroll");
    document.body.appendChild(box);
  });
});

/* ===========================
   HEART CURSOR (للماوس فقط)
=========================== */
if (!isTouch && !reduceMotion) {
  document.addEventListener("mousemove", e => {
    const heart = document.createElement("span");
    heart.textContent = "❤";
    Object.assign(heart.style, {
      position: "fixed",
      left: e.clientX + "px",
      top: e.clientY + "px",
      color: "rgba(255,215,0,.7)",
      pointerEvents: "none",
      fontSize: "14px",
      transition: "1s",
      zIndex: 99997
    });
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = "translateY(-25px)";
      heart.style.opacity = "0";
    }, 20);

    setTimeout(() => heart.remove(), 1000);
  });
}


/* ===========================
   ADD TO CALENDAR (.ics)
=========================== */
document.getElementById("calBtn").addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//AR",
    "BEGIN:VEVENT",
    "UID:wedding-mohamed-hend-2027@invite",
    "DTSTAMP:20261029T000000Z",
    "DTSTART:20270312T200000",
    "DTEND:20270312T230000",
    "SUMMARY:حفل زفاف محمد وهند",
    "LOCATION:قاعة ريونا - دكرنس",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:حفل زفاف محمد وهند غداً",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
});
