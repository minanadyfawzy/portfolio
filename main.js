// ===========================
//   THEME (Dark / Light)
// ===========================
let currentTheme = localStorage.getItem("ms_theme") || "dark";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    const btn = document.getElementById("theme-btn");
    if (!btn) return;

    btn.innerHTML = theme === "dark"
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
        </svg>`;

    btn.title = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function initTheme() {
    applyTheme(currentTheme);

    const btn = document.getElementById("theme-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("ms_theme", currentTheme);
        applyTheme(currentTheme);
    });
}


// ===========================
//   NAVBAR SCROLL + ACTIVE
// ===========================
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        // navbar background on scroll
        navbar?.classList.toggle("scrolled", window.scrollY > 30);

        // active section detection
        let current = "";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.dataset.section === current);
        });
    });

    // smooth scroll
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const target = document.getElementById(link.dataset.section);
            target?.scrollIntoView({ behavior: "smooth" });

            closeMobileMenu();
        });
    });
}


// ===========================
//   MOBILE MENU
// ===========================
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-menu");

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open");

        document.body.style.overflow =
            mobileMenu.classList.contains("open") ? "hidden" : "";
    });

    closeBtn?.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
    document.getElementById("hamburger")?.classList.remove("open");
    document.getElementById("mobile-menu")?.classList.remove("open");
    document.body.style.overflow = "";
}


// ===========================
//   SCROLL REVEAL ANIMATION
// ===========================
function observeReveal() {
    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-pop, .reveal-label"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}


// ===========================
//   INIT
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    observeReveal();
});


/* ===========================
   to show more projects 
=========================== */

const btn = document.getElementById("show-more-btn");
const extra = document.getElementById("extra-projects");

let isOpen = false;

btn.addEventListener("click", function () {
    isOpen = !isOpen;

    if (isOpen) {
        extra.classList.add("show");
        btn.innerText = "Show less projects";
    } else {
        extra.classList.remove("show");
        btn.innerText = "Show 3 more projects";
    }
});
