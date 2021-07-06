const site = {
    introOverflow: 0,
    alreadyScrolled: false,
    navbar: document.getElementById('navbar'),
    menuBurgerButton: document.getElementById('menuBurgerButton'),
    scrollToTopButton: document.getElementById('scrollToTopButton'),

    init: function() {
        document.addEventListener('DOMContentLoaded', site.onReady, false);
    },
    onReady: function() {
        setTimeout(function() {
            site.setIntroOverflow();
            site.addListeners();
            site.scrollToTop();
            site.setAge();
            site.setCopyrightYear();
            site.hideLoad();
        }, 3750);
    },
    setIntroOverflow: function() {
        // Get the device screen height
        let deviceHeight = window.innerHeight;

        // Get the intro section height
        let introSectionHeight = document.getElementById('intro').scrollHeight;

        // Work out the difference between the intro height and device screen height
        let difference = introSectionHeight - deviceHeight;

        // Set the intro overflow variable to the difference, plus 175 to use when activating the age increment animation
        site.introOverflow = difference + 175;
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
    setAge: function() {
        // 9th July 1994
        let birthDate = new Date("07/09/1994");
        let dateToday = new Date();

        // Get the difference of dates in years
        let yearCalc = dateToday.getFullYear() - birthDate.getFullYear();

        // Get the difference of dates in months
        let monthCalc = dateToday.getMonth() - birthDate.getMonth();

        // Get the difference of dates in days
        let dayCalc = dateToday.getDate() - birthDate.getDate();

        // If the monthCalc specifies there is still months until the birthDate month (less than 0)
        // Or, it's the current month of the birthDate AND there is still days until the birthDate day (less than 0)
        // Then take a year off the yearCalc as it's not yet the birthday
        if (monthCalc < 0 ||
            monthCalc == 0 && (dayCalc < 0)) {
            yearCalc--;
        }

        // Set the data-target attribute for animation when scrolled
        document.getElementById('yearsOldCalc').setAttribute('data-target', yearCalc);

        // If today is my birthday, add appropriate styling to the section
        if (monthCalc == 0 && dayCalc == 0) {
            document.getElementById('birthday').classList.add('isToday');
            document.getElementById('yearsOldDesc').textContent = 'TODAY';
        }
        else {
            document.getElementById('yearsOldDesc').textContent = 'Years Old';
        }
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
        if (window.scrollY > site.introOverflow && 
            !site.alreadyScrolled) {
            // Animate the 'Years Old' value from 0 to target
            site.updateAgeCount();

            // Update boolean so the animation does not happen again
            site.alreadyScrolled = true;
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
    updateAgeCount: function() {
        // Get the element to read and write to
        let countElement = document.getElementById('yearsOldCalc');

        // Get the target value and current value of the element as a number (+)
        let targetValue = +countElement.getAttribute('data-target');
		let currentValue = +countElement.textContent;

		// Check to see if the target value has been reached
		if (currentValue < targetValue) {
			// Add 1 to the current value and update the web page value
			countElement.textContent = ++currentValue;
			
            // Run this function again in 0.025 seconds
			setTimeout(site.updateAgeCount, 25);
		}
        else {
			countElement.textContent = targetValue;
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
    window.location.href = "https://danlawson.co.uk/error.html";
}
else {
    site.init();
}