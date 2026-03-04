const text = "Raja Machine Works";

const container = document.getElementById("companyName");
const crane = document.getElementById("crane");
const trolley = document.getElementById("trolley");
const rope = document.getElementById("rope");
const logo = document.getElementById("logo");
const intro = document.querySelector(".intro");
const home = document.querySelector(".home");

/* ---------------- BACKGROUND PARTICLES ---------------- */

const bgCanvas = document.createElement("canvas");
bgCanvas.id = "bgParticles";
document.body.appendChild(bgCanvas);

const bgCtx = bgCanvas.getContext("2d");
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
    particles.push({
        x:Math.random()*bgCanvas.width,
        y:Math.random()*bgCanvas.height,
        r:Math.random()*2,
        dx:(Math.random()-0.5)*0.4,
        dy:(Math.random()-0.5)*0.4
    });
}

function animateBG(){
    bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);

    particles.forEach(p=>{
        p.x+=p.dx;
        p.y+=p.dy;

        if(p.x<0||p.x>bgCanvas.width) p.dx*=-1;
        if(p.y<0||p.y>bgCanvas.height) p.dy*=-1;

        bgCtx.beginPath();
        bgCtx.arc(p.x,p.y,p.r,0,Math.PI*2);
        bgCtx.fillStyle="rgba(255,255,255,0.15)";
        bgCtx.fill();
    });

    requestAnimationFrame(animateBG);
}

animateBG();

/* ---------------- WELDING TYPING ---------------- */

let sparks = [];
let index = 0;

function weldType(){
    if(index < text.length){

        const span = document.createElement("span");
        span.textContent = text[index];
        span.classList.add("letter");
        container.appendChild(span);

        const rect = span.getBoundingClientRect();
        createWeldFlash(rect);
        createWeldSparks(rect);

        setTimeout(()=>{
            span.style.opacity = 1;
        },50);

        index++;
        setTimeout(weldType, 80);

    } else {
        setTimeout(showCrane, 500);
    }
}

function createWeldFlash(rect){
    const flash = document.createElement("div");
    flash.classList.add("flash-light");

    flash.style.left = rect.left + rect.width/2 - 20 + "px";
    flash.style.top = rect.top + rect.height/2 - 20 + "px";

    document.body.appendChild(flash);

    setTimeout(()=>flash.remove(),300);
}

function createWeldSparks(rect){
    for(let i=0;i<10;i++){
        sparks.push({
            x: rect.left + rect.width/2,
            y: rect.top + rect.height/2,
            dx:(Math.random()-0.5)*6,
            dy:(Math.random()-0.5)*6,
            life:25
        });
    }
}

const sparkCanvas = document.createElement("canvas");
sparkCanvas.style.position = "fixed";
sparkCanvas.style.top = 0;
sparkCanvas.style.left = 0;
sparkCanvas.style.pointerEvents = "none";
document.body.appendChild(sparkCanvas);

const sparkCtx = sparkCanvas.getContext("2d");
sparkCanvas.width = window.innerWidth;
sparkCanvas.height = window.innerHeight;

function animateSparks(){
    sparkCtx.clearRect(0,0,sparkCanvas.width,sparkCanvas.height);

    sparks.forEach((s,i)=>{
        s.x += s.dx;
        s.y += s.dy;
        s.dy += 0.1; // gravity
        s.life--;

        sparkCtx.fillStyle = "orange";
        sparkCtx.fillRect(s.x, s.y, 3, 3);

        if(s.life <= 0){
            sparks.splice(i,1);
        }
    });

    requestAnimationFrame(animateSparks);
}

animateSparks();

/* ---------------- CRANE SEQUENCE ---------------- */

function showCrane(){
    crane.classList.add("crane-show");

    setTimeout(()=>{
        trolley.classList.add("move-center");

        setTimeout(dropLogo, 1200);

    }, 400);
}

function dropLogo(){
    rope.classList.add("drop");
    logo.classList.add("logo-drop");

    setTimeout(()=>{
        logo.classList.add("impact");

        setTimeout(showHome, 1500);

    }, 900);
}

/* ---------------- HOME TRANSITION ---------------- */

function showHome(){
    const intro = document.querySelector(".intro");
    const home = document.querySelector(".home");

    intro.style.opacity = "0";

    document.body.style.overflowY = "auto";

    setTimeout(()=>{
        intro.style.display = "none";
        home.style.display = "block";

        // Smooth fade in
        home.style.opacity = "0";
        setTimeout(()=>{
            home.style.opacity = "1";
        },50);

        document.body.style.overflow = "auto";
    },800);
}

/* START ANIMATION */
weldType();

function resizeCanvas(){
    sparkCanvas.width = window.innerWidth;
    sparkCanvas.height = window.innerHeight;

    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const timeline = document.querySelector(".timeline");
const timelineItems = document.querySelectorAll(".timeline-item");

function checkTimeline(){
    const trigger = window.innerHeight * 0.85;

    timelineItems.forEach(item=>{
        const rect = item.getBoundingClientRect();

        if(rect.top < trigger){
            item.classList.add("show");
            timeline.classList.add("animate-line");
        }
    });
}

window.addEventListener("scroll", checkTimeline);

/* Also trigger once after page loads */
window.addEventListener("load", checkTimeline);

document.addEventListener("DOMContentLoaded", function(){

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if(hamburger){
        hamburger.addEventListener("click", function(){
            navMenu.classList.toggle("active");
        });
    }

});