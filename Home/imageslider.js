document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       MOBILE HAMBURGER MENU
       ========================================================= */

    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    function closeMobileMenu() {
        if (!menuButton || !mobileNav) return;

        mobileNav.classList.remove("open");
        menuButton.classList.remove("active");

        /* Also close any open dropdown sub-menu */
        mobileNav.querySelectorAll(".dropdown.open").forEach(function (dropdown) {
            dropdown.classList.remove("open");
        });

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
    }

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", function () {

            const isOpen = mobileNav.classList.toggle("open");

            menuButton.classList.toggle("active", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });


        /* =========================================================
           MOBILE DROPDOWN SUB-MENUS
           Tapping "About School" / "Academics" opens their links
           instead of closing the whole menu or jumping to "#".
        ========================================================= */

        mobileNav.querySelectorAll(".mobile-dropdown-heading").forEach(function (heading) {

            heading.addEventListener("click", function (event) {

                event.preventDefault();

                const dropdown = heading.closest(".dropdown");

                if (!dropdown) return;

                const isOpen = dropdown.classList.toggle("open");

                heading.setAttribute("aria-expanded", String(isOpen));

            });

        });


        /* Close menu after clicking any mobile link
           (but keep dropdown headings from closing the menu) */
        mobileNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                if (link.classList.contains("mobile-dropdown-heading")) return;

                closeMobileMenu();

            });

        });


        /* Close mobile menu when returning to desktop */
        window.addEventListener("resize", function () {

            if (window.innerWidth > 1000) {
                closeMobileMenu();
            }

        });

    }


    /* =========================================================
       HERO SLIDER
       ========================================================= */

    const slides = document.querySelectorAll(".hero-slide");

    const nextButton =
        document.getElementById("nextSlide");

    const previousButton =
        document.getElementById("previousSlide");

    const currentSlideNumber =
        document.getElementById("currentSlide");

    const hero =
        document.querySelector(".hero");


    let currentIndex = 0;
    let slideInterval = null;


    /* =========================================================
       CHECK SLIDES
       ========================================================= */

    if (slides.length > 0) {


        /* =====================================================
           SHOW SLIDE
           ===================================================== */
        function showSlide(index) {
            slides.forEach(function (slide) {
                slide.classList.remove("active");
            });
            slides[index].classList.add("active");
            if (currentSlideNumber) {
                currentSlideNumber.textContent =
                    String(index + 1).padStart(2, "0");
            }
        }
        /* =====================================================
           NEXT SLIDE
           ===================================================== */

        function nextSlide() {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0;
            }
            showSlide(currentIndex);
        }


        /* =====================================================
           PREVIOUS SLIDE
           ===================================================== */

        function previousSlide() {

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex = slides.length - 1;

            }

            showSlide(currentIndex);

        }


        /* =====================================================
           START AUTOMATIC SLIDER
           ===================================================== */

        function startSlider() {

            clearInterval(slideInterval);

            slideInterval = setInterval(function () {

                nextSlide();

            }, 5000);

        }


        /* =====================================================
           NEXT BUTTON
           ===================================================== */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();

                    startSlider();

                }
            );

        }


        /* =====================================================
           PREVIOUS BUTTON
           ===================================================== */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    startSlider();

                }
            );

        }


        /* =====================================================
           PAUSE SLIDER WHEN MOUSE IS OVER HERO
           ===================================================== */

        if (hero) {


            hero.addEventListener(
                "mouseenter",
                function () {

                    clearInterval(slideInterval);

                }
            );


            hero.addEventListener(
                "mouseleave",
                function () {

                    startSlider();

                }
            );


            /* =================================================
               MOBILE SWIPE
               ================================================= */

            let touchStartX = 0;


            hero.addEventListener(
                "touchstart",
                function (event) {

                    if (event.touches.length > 0) {

                        touchStartX =
                            event.touches[0].clientX;

                    }

                },
                { passive: true }
            );


            hero.addEventListener(
                "touchend",
                function (event) {

                    if (
                        event.changedTouches.length === 0
                    ) {
                        return;
                    }


                    const touchEndX =
                        event.changedTouches[0].clientX;


                    const difference =
                        touchEndX - touchStartX;


                    /* Swipe left */

                    if (difference < -50) {

                        nextSlide();

                        startSlider();

                    }


                    /* Swipe right */

                    if (difference > 50) {

                        previousSlide();

                        startSlider();

                    }

                },
                { passive: true }
            );

        }


        /* =====================================================
           KEYBOARD CONTROLS
           ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {


                if (event.key === "ArrowRight") {

                    nextSlide();

                    startSlider();

                }


                if (event.key === "ArrowLeft") {

                    previousSlide();

                    startSlider();

                }

            }
        );


        /* =====================================================
           INITIAL SLIDE
           ===================================================== */

        showSlide(0);


        /* =====================================================
           START SLIDER
           ===================================================== */

        startSlider();

    }

});