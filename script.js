// Typing animation
const textArray = ["Software Engineer", ".NET Developer", "Full Stack Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const typingEl = document.querySelector(".typing");
    if (!typingEl) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

window.onload = function () {
    type();
    animateStats();
};

// Scroll progress indicator

window.onscroll = function () {
    progressBar();
    reveal();
};

function progressBar() {

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    var bar = document.getElementById("progress-bar");

    if (bar) {
        bar.style.width = scrolled + "%";
    }

}

// Reveal animation

function reveal() {

    var elements = document.querySelectorAll(".project-card, .skill, .timeline-item");

    for (var i = 0; i < elements.length; i++) {

        var windowHeight = window.innerHeight;
        var elementTop = elements[i].getBoundingClientRect().top;
        var visible = 100;

        if (elementTop < windowHeight - visible) {
            elements[i].style.opacity = 1;
            elements[i].style.transform = "translateY(0)";
        }

    }

}

// Animated statistics

function animateStats() {

    const stats = document.querySelectorAll(".stat-number");

    stats.forEach(stat => {

        const target = +stat.getAttribute("data-target");
        let count = 0;

        const update = () => {

            const increment = target / 100;

            if (count < target) {
                count += increment;
                stat.innerText = Math.floor(count);
                setTimeout(update, 20);
            }
            else {
                stat.innerText = target;
            }

        }

        update();

    });

}