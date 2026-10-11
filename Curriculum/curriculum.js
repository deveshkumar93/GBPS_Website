document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");

    function closeMobileMenu() {
        if (!menuButton || !mobileNav) {
            return;
        }

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
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });

        /* =========================================================
           MOBILE DROPDOWN SUB-MENUS
           Tapping "Academics" opens its links instead of closing
           the whole menu or jumping to "#".
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

        mobileNav.querySelectorAll("a").forEach(function (link) {
            /* Keep dropdown headings from closing the whole menu */
            if (link.classList.contains("mobile-dropdown-heading")) return;
            link.addEventListener("click", closeMobileMenu);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 1000) {
                closeMobileMenu();
            }
        });
    }
});
