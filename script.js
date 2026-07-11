// Smooth Fade Animation

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

const elements = document.querySelectorAll(".feature, .card, .review");

elements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.8s ease";

    observer.observe(el);

});


// Navbar Background Change

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "#000";

    } else {

        navbar.style.background = "rgba(0,0,0,.8)";

    }

});


// Active Navbar Link

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// Scroll To Top Button

const topBtn = document.createElement("div");

topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 350) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});