// ==================================================
// ELEMENTS REFERENCE
// ==================================================

const loader = document.querySelector(".loader");
const sections = document.querySelectorAll(".section");
const faqHeaders = document.querySelectorAll('.faq-header');

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
                if (typed) { return; }

                typed = new Typed('#searchQuery', {
                    strings: [
                        "Avenue Fitness",
                        "Avenue Gym",
                        "Avenue Fitness Reviews",
                        "Avenue Fitness Pricing",
                        "Avenue Fitness Transformations",
                        "Avenue Fitness Contact"
                    ],
                    typeSpeed: 50,
                    loop: true,
                    smartBackspace: true,
                    backSpeed: 20,
                });
            }
            else if (typed) {
                typed.destroy();
                typed = undefined;
            }
        });
    }, {
        threshold: 0.3,
    });

    const queryTarget = document.querySelector("#searchQuery");
    if (queryTarget) {
        queryObserver.observe(queryTarget);
    }
}

// * FUNCTION TO SETUP BOOK-BTN ANIMATION
function startBookBtnAnimation() {
    const bookBtn = document.querySelector('#bookBtn');
    if (!bookBtn) { return; }

    const bookObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('glass');
            } else {
                entry.target.classList.remove('glass');
            }
        });
    }, {
        threshold: 0.4,
    });

    bookObserver.observe(bookBtn);
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
    hideLoader();
    startQueryAnimation();
    startBookBtnAnimation();
});

// & EVENT LISTENERS FOR FAQ-HEADER CLICK
faqHeaders.forEach(faqHeader => {
    faqHeader.addEventListener('click', () => {
        faqHeader.closest('.faq-item').classList.toggle('active');
    });
});
