console.log("JS Loaded");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let current = 0;
let isScrolling = false;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    createSparkBurst(window.innerWidth * 0.5, window.innerHeight * 0.2);
    createConfetti();

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    if (index === 8) {
        setTimeout(blowCandle, 800);
    }
}

window.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--y", `${e.clientY}px`);

    if (Math.random() < 0.25) {
        createSparkBurst(e.clientX, e.clientY);
    }
});

window.addEventListener("wheel", (e) => {

    if (isScrolling) return;

    isScrolling = true;

    if (e.deltaY > 0) {

        if (current < slides.length - 1) {
            current++;
        }

    } else {

        if (current > 0) {
            current--;
        }

    }

    showSlide(current);

    setTimeout(() => {
        isScrolling = false;
    }, 1000);

});

let startY = 0;

window.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {

    let endY = e.changedTouches[0].clientY;

    if (startY - endY > 50) {

        if (current < slides.length - 1) {
            current++;
        }

    }

    else if (endY - startY > 50) {

        if (current > 0) {
            current--;
        }

    }

    showSlide(current);

}); const surpriseBtn = document.getElementById("surpriseBtn");

if (surpriseBtn) {

    surpriseBtn.addEventListener("click", () => {

        window.open("my_song.mp3", "_blank");

    });

} const cakeBtn = document.getElementById("cakeBtn");
if (cakeBtn) {

    cakeBtn.addEventListener("click", () => {

        console.log("Cake Clicked");

        const msg = document.getElementById("cakeMessage");

        if (msg) {
            msg.style.display = "block";
        }

        cakeBtn.innerText = "🎉 Cake Cut Gaya Ji 🎉";

        createConfetti();

    });

}

function createSparkBurst(x, y) {
    const burst = document.createElement("span");
    burst.className = "spark-burst";
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    document.body.appendChild(burst);

    requestAnimationFrame(() => burst.classList.add("show"));

    setTimeout(() => burst.remove(), 700);
}

function createConfetti() {

    const emojis = ["🎉", "🎊", "✨", "💖", "🌸", "🎂"];

    for (let i = 0; i < 40; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        document
            .getElementById("confetti-container")
            .appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 7000);

    }

}

setTimeout(createConfetti, 1000);

function blowCandle() {
    const candleBtn = document.getElementById("blowCandleBtn");
    if (candleBtn) {
        candleBtn.innerHTML = "🕯️ Candle Blown ✨";
        candleBtn.style.opacity = "0.7";
        candleBtn.style.pointerEvents = "none";
    }

    const msg = document.getElementById("candleMessage");
    if (msg) {
        msg.style.display = "block";
        msg.innerHTML = "<h2 style='margin:0 0 6px; font-size:22px;'>🎉 Happyyyy Birthdayyyy Antra Ji 🎉</h2><p style='margin:0;'>Aapki harr Wish poori ho ji... 🌸💖</p>";
    }

    const cakeStage = document.getElementById("cakeStage");
    if (cakeStage) {
        setTimeout(() => {
            cakeStage.classList.add("show", "cut");
        }, 250);
    }

    createSparkBurst(window.innerWidth / 2, 140);
    createConfetti();
}

document.addEventListener("DOMContentLoaded", () => {
    const candleBtn = document.getElementById("blowCandleBtn");
    if (candleBtn) {
        candleBtn.addEventListener("click", blowCandle);
    }

    typeIntroSection();
});

function typeIntroSection() {
    const title = document.querySelector(".intro-title");
    const lines = Array.from(document.querySelectorAll(".intro-line"));

    if (!title && lines.length === 0) return;

    const typeText = (element, text, speed = 40) => {
        if (!element) return;
        element.textContent = "";
        element.classList.add("is-typing");
        element.style.opacity = "1";

        let index = 0;
        const interval = setInterval(() => {
            element.textContent = text.slice(0, index + 1);
            index += 1;

            if (index >= text.length) {
                clearInterval(interval);
                element.classList.remove("is-typing");
                element.classList.add("is-done");
            }
        }, speed);
    };

    if (title) {
        setTimeout(() => typeText(title, title.dataset.text || title.textContent, 45), 300);
    }

    lines.forEach((line, index) => {
        setTimeout(() => {
            typeText(line, line.dataset.text || line.textContent, 35);
        }, 700 + index * 800);
    });
}

const mySong = document.getElementById("mySong");
const playSongBtn = document.getElementById("playSongBtn");

let musicStarted = false;

function startSongPlayback(force = false) {
    if (!mySong) return;
    if (!force && musicStarted) return;

    musicStarted = true;
    mySong.currentTime = 0;

    const playPromise = mySong.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((error) => {
            console.error("Audio playback failed:", error);
            musicStarted = false;
        });
    }

    if (playSongBtn) {
        playSongBtn.textContent = "⏸ Tap to pause song";
        playSongBtn.classList.add("is-playing");
    }
}

document.body.addEventListener("click", () => startSongPlayback(), { once: true });
document.body.addEventListener("touchstart", () => startSongPlayback(), { once: true });

if (playSongBtn && mySong) {
    playSongBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        if (mySong.paused) {
            startSongPlayback(true);
        } else {
            mySong.pause();
            playSongBtn.textContent = "🎧 Tap to play surprise song";
            playSongBtn.classList.remove("is-playing");
        }
    });
}

const finalBtn = document.querySelector(".surprise-btn");

if (finalBtn) {
    finalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        playFinalSong();
    });
}

function playFinalSong() {
    if (!mySong) return;

    mySong.currentTime = 0;

    const playPromise = mySong.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }

    if (playSongBtn) {
        playSongBtn.textContent = "⏸ Tap to pause song";
        playSongBtn.classList.add("is-playing");
    }
}