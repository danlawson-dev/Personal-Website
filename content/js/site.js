const site = {
    navbar: document.getElementById('navbar'),
    menuBurgerButton: document.getElementById('menuBurgerButton'),
    scrollToTopButton: document.getElementById('scrollToTopButton'),

    init: function() {
        document.addEventListener('DOMContentLoaded', site.onReady, false);
    },
    onReady: function() {
        setTimeout(function() {
            site.addListeners();
            site.scrollToTop();
            site.setCopyrightYear();
            site.hideLoad();
        }, 3750);
    },
    addListeners: function() {
        window.addEventListener('scroll', site.watchScrollY);
        site.menuBurgerButton.addEventListener('click', site.menuBurgerButtonClicked);
    },
    scrollToTop: function() {
        // Scroll to the of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    setCopyrightYear: function() {
        // Set current year in the footer copyright text
        document.getElementById('copyrightYear').textContent = new Date().getFullYear();
    },
    hideLoad: function() {
        // Hide the page load gif from view
        document.getElementById('pageLoad').style.display = 'none';
    },
    watchScrollY: function() {
        if (window.scrollY <= 75) {
            // Remove 'scrolled' css styling from navbar
            site.navbar.classList.remove('scrolled');
        }
        if (window.scrollY > 75) {
            // Add 'scrolled' css styling to navbar
            site.navbar.classList.add('scrolled');
        }
        if (window.scrollY <= 320) {
            // Hide scroll to top button from view
            site.scrollToTopButton.style.bottom = '-80px';
        }
        if (window.scrollY > 320) {
            // Show scroll to top button
            site.scrollToTopButton.style.bottom = '-30px';
        }
    },
    menuBurgerButtonClicked: function() {
        // Toggle 'open' css styling for menu burger menu
        site.menuBurgerButton.classList.toggle('open');
    },
    resetNavbar: function() {
        // Ensure the navbar menu is closed and styling is reset
        site.menuBurgerButton.classList.add('collapsed');
        site.menuBurgerButton.classList.remove('open');
        document.getElementById('navDropdown').classList.remove('show');
    }
};

// If the browser is IE, redirect it to the error page
var isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) {
    window.location.href = "http://127.0.0.1:5500/error.html";
}
else {
    site.init();
}