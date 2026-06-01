// ==================================================
// ELEMENTS REFERENCE
// ==================================================

const loader = document.querySelector(".loader");
const sections = document.querySelectorAll(".section");

// ==================================================
// OBSERVER STATE
// ==================================================

let sectionObserver;

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO CREATE AN INTERSECTION OBSERVER
function createSectionObserver() {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2,
    });
}

// * FUNCTION TO SETUP SEARCH-QUERY ANIMATION
function startQueryAnimation() {
    let typed;
    const queryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                typed = new Typed('#searchQuery', {
                    strings: ['Avenue Fitness', 'Avenue Gym', 'BMW', 'coderadi'],
                    typeSpeed: 50,
                    loop: true,
                    smartBackspace: true,
                    backSpeed: 20,
                });
            }
            else { typed.destroy(); }
        });
    }, {
        threshold: 0.3,
    });

    queryObserver.observe(document.querySelector("#searchQuery"));
}

// * FUNCTION TO START SECTION OBSERVER
function startSectionObserver() {
    if (sectionObserver || sections.length === 0) { return; }

    sectionObserver = createSectionObserver();
    sections.forEach((section) => sectionObserver.observe(section));
}

// * FUNCTION TO HIDE THE LOADER AFTER 5 SECONDS
function hideLoader() {
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        startSectionObserver();
    }, 4500);
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & EVENT LISTENER TO HIDE LOADER ON LOAD
document.addEventListener("DOMContentLoaded", () => {
    // startSectionObserver();
    startQueryAnimation();
});
