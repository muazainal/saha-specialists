/**
 * SAHA Specialists - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('SAHA Specialists website loaded');

    // --- Helper Functions ---

    /**
     * Dynamically sets an ID for an element (demonstrating user request)
     * @param {string} selector - CSS selector
     * @param {string} id - New ID to set
     */
    const setElementId = (selector, id) => {
        const element = document.querySelector(selector);
        if (element) {
            element.id = id;
            console.log(`ID "${id}" set for element matching "${selector}"`);
        }
    };

    // --- Navigation Interactivity ---

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .btn-primary');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Form Handling ---

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you shortly.');
            contactForm.reset();
        });
    }

    // --- Geolocation API ---

    const locationDisplay = document.getElementById('user-location');

    const fetchLocation = () => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
            return;
        }

        locationDisplay.textContent = 'Detecting your location...';

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Using a simple reverse geocoding approach or just displaying coords
                    // For this demo, let's try to get a city name via a free API if possible
                    // or just show the coordinates gracefully.
                    locationDisplay.textContent = `Visting from: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;

                    // Optional: Reverse geocoding (OpenStreetMap Nominatim - note: check usage terms for production)
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    if (data.address) {
                        const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
                        const country = data.address.country || '';
                        locationDisplay.textContent = `Viewing from: ${city}, ${country}`;
                    }
                } catch (error) {
                    console.error('Error fetching address:', error);
                    locationDisplay.textContent = `Viewing from: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
                }
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                locationDisplay.textContent = ''; // Hide if denied or error
            }
        );
    };

    // Trigger location fetch
    fetchLocation();

    // --- Mobile Menu Toggle ---

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Toggle icon between bars and xmark
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        const submenuLinks = navLinksContainer.querySelectorAll('a');
        submenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
