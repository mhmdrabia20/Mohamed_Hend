
window.addEventListener("load", () => {

const loader = document.getElementById("loader");

setTimeout(() => {

loader.style.opacity = "0";

loader.style.visibility = "hidden";

},1500);

});


/* ===========================
COUNTDOWN
=========================== */

const weddingDate = new Date("March 12, 2027 20:00:00").getTime();

const countdown = setInterval(()=>{

const now = new Date().getTime();

const distance = weddingDate - now;

const days = Math.floor(distance/(1000*60*60*24));

const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerHTML = days;

document.getElementById("hours").innerHTML = hours;

document.getElementById("minutes").innerHTML = minutes;

document.getElementById("seconds").innerHTML = seconds;

if(distance<0){

clearInterval(countdown);

document.getElementById("countdown").innerHTML="<h2>🎉 بدأ الحفل 🎉</h2>";

}

},1000);


/* ===========================
FLOWERS
=========================== */

const flowers=document.getElementById("flowers");

function createFlower(){

const flower=document.createElement("div");

flower.innerHTML="🌸";

flower.classList.add("flower");

flower.style.left=Math.random()*100+"vw";

flower.style.fontSize=Math.random()*20+15+"px";

flower.style.animationDuration=Math.random()*5+5+"s";

flowers.appendChild(flower);

setTimeout(()=>{

flower.remove();

},10000);

}

setInterval(createFlower,300);


/* ===========================
SCROLL ANIMATION
=========================== */

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

sections.forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});


/* ===========================
BACK TO TOP
=========================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/* ===========================
CONFETTI
=========================== */

const form=document.querySelector("form");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("❤️ شكراً لتأكيد حضوركم ❤️");

for(let i=0;i<120;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.background=`hsl(${Math.random()*360},100%,60%)`;

c.style.animationDuration=Math.random()*3+2+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},5000);

}

});


/* ===========================
MUSIC
=========================== */

const music=new Audio("music/wedding.mp3");

music.loop=true;

const musicBtn=document.createElement("button");

musicBtn.innerHTML="🎵";

musicBtn.id="musicBtn";

document.body.appendChild(musicBtn);

let playing=false;

musicBtn.onclick=()=>{

if(!playing){

music.play();

musicBtn.innerHTML="⏸";

playing=true;

}else{

music.pause();

musicBtn.innerHTML="🎵";

playing=false;

}

};


/* ===========================
IMAGE POPUP
=========================== */

const images=document.querySelectorAll(".gallery img");

images.forEach(img=>{

img.onclick=()=>{

const popup=document.createElement("div");

popup.style.position="fixed";

popup.style.inset="0";

popup.style.background="rgba(0,0,0,.9)";

popup.style.display="flex";

popup.style.alignItems="center";

popup.style.justifyContent="center";

popup.style.zIndex="99999";

const image=document.createElement("img");

image.src=img.src;

image.style.maxWidth="90%";

image.style.maxHeight="90%";

image.style.borderRadius="20px";

popup.appendChild(image);

popup.onclick=()=>popup.remove();

document.body.appendChild(popup);

};

});


/* ===========================
HEART CURSOR
=========================== */

document.addEventListener("mousemove",(e)=>{

const heart=document.createElement("span");

heart.innerHTML="❤";

heart.style.position="fixed";

heart.style.left=e.clientX+"px";

heart.style.top=e.clientY+"px";

heart.style.color="rgba(255,215,0,.7)";

heart.style.pointerEvents="none";

heart.style.fontSize="14px";

heart.style.transition="1s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.style.transform="translateY(-25px)";

heart.style.opacity="0";

},20);

setTimeout(()=>{

heart.remove();

},1000);

});
