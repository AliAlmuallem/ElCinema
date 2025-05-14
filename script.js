// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Lightbox options
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': true
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('#newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Seat selection simulation (for showtimes page)
    if (document.querySelector('.seat-map')) {
        setupSeatSelection();
    }
    
    // Movie filtering (for movies page)
    if (document.querySelector('.movie-filter')) {
        setupMovieFilter();
    }
    
    // Rotating logo effect
    const logo = document.querySelector('#branding h1');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.classList.add('rotating-logo');
        });
        
        logo.addEventListener('mouseout', function() {
            this.classList.remove('rotating-logo');
        });
    }
    
    // Disappearing header on scroll
    let lastScroll = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Seat selection functionality
function setupSeatSelection() {
    const seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.addEventListener('click', function() {
            if (this.classList.contains('occupied')) {
                return;
            }
            this.classList.toggle('selected');
            updateSelectedCount();
        });
    });
    
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const count = selectedSeats.length;
        document.getElementById('selected-count').textContent = count;
    }
}

// Movie filtering functionality
function setupMovieFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const movies = document.querySelectorAll('.movie-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            movies.forEach(movie => {
                if (filter === 'all' || movie.classList.contains(filter)) {
                    movie.style.display = 'block';
                } else {
                    movie.style.display = 'none';
                }
            });
        });
    });
}

// Countdown timer for next show
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 1);
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `Next show in: ${Math.floor(hours)}h ${minutes}m ${seconds}s`;
        
        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = "Now Showing!";
        }
    }, 1000);
}

// Initialize countdown when page loads
startCountdown();
// Showtimes Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize seat map
    const seatMap = document.querySelector('.seat-map');
    const rows = 6;
    const cols = 10;
    
    // Generate seats
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.row = String.fromCharCode(65 + row);
            seat.dataset.col = col + 1;
            
            // Randomly mark some seats as occupied
            if (Math.random() < 0.2) {
                seat.classList.add('occupied');
            }
            
            seat.addEventListener('click', function() {
                if (this.classList.contains('occupied')) {
                    return;
                }
                this.classList.toggle('selected');
                updateSeatSelection();
            });
            
            seatMap.appendChild(seat);
        }
    }
    
    // Show seat selection when a time is clicked
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('seat-selection').style.display = 'block';
            window.scrollTo({
                top: document.getElementById('seat-selection').offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Update date picker to today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('showtime-date').value = today;
    
    // showtimes date changes
    document.getElementById('update-showtimes').addEventListener('click', function() {
        const selectedDate = document.getElementById('showtime-date').value;
        alert(`Showtimes updated for ${selectedDate}`);
    });
    
    // Proceed to payment button + Ticket
    document.getElementById('proceed-btn').addEventListener('click', function() {
        const selectedCount = document.querySelectorAll('.seat.selected').length;
        if (selectedCount > 0) {
            alert(`Ticket purchased for ${selectedCount} seats`);
        } else {
            alert('Please select at least one seat');
        }
    });
});

function updateSeatSelection() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedCount = selectedSeats.length;
    const totalPrice = selectedCount * 3.3; // 3.3 BHD per seat
    
    document.getElementById('selected-count').textContent = selectedCount;
    document.getElementById('total-price').textContent = totalPrice;
}
// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Map
    function initMap() {
        // This is a placeholder for actual Google Maps API implementation
        // In a real implementation, you would use your Google Maps API key
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = '<div style="width:100%;height:100%;background:#ddd;display:flex;align-items:center;justify-content:center;">[Map would display here with API key]</div>';
        }
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Initialize the map
    initMap();
    
    // Add animation to about sections
    const aboutSections = document.querySelectorAll('.about-section');
    aboutSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.5s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // TV Guide Channel Filter
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.addEventListener('click', function() {
            // Remove active class from all channels
            channels.forEach(c => c.classList.remove('active'));
            // Add active class to clicked channel
            this.classList.add('active');
            
            const channelName = this.dataset.channel;
            const programs = document.querySelectorAll('.program');
            
            if (channelName === 'all') {
                programs.forEach(program => program.style.display = 'flex');
            } else {
                programs.forEach(program => {
                    if (program.dataset.channel === channelName) {
                        program.style.display = 'flex';
                    } else {
                        program.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Carousel scrolling buttons (would need more implementation)
    const carousels = document.querySelectorAll('.shows-carousel');
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Watchlist button functionality
    const watchlistButtons = document.querySelectorAll('.btn-watchlist');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const showTitle = this.closest('.show-overlay').querySelector('h4').textContent;
            if (this.textContent === '+ Watchlist') {
                this.textContent = '✓ Added';
                alert(`${showTitle} added to your watchlist`);
            } else {
                this.textContent = '+ Watchlist';
                alert(`${showTitle} removed from your watchlist`);
            }
        });
    });
    
    // Play button functionality
    const playButtons = document.querySelectorAll('.btn-play, .btn-play-sm');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const showTitle = this.closest('.popular-overlay').querySelector('h3, h4').textContent;
            alert(`Now playing: ${showTitle}`);
        });
    });
    
    // News card click functionality
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const newsTitle = this.querySelector('h4').textContent;
            alert(`Loading news article: ${newsTitle}`);
            // In a real implementation, this would navigate to the full article
        });
    });
    
    // Animate sections on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.tv-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const sections = document.querySelectorAll('.tv-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

document.addEventListener('DOMContentLoaded', function() {
    // Responsive navigation toggle for mobile
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('#branding').appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
    });

    // Filter movies by category
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const movieCards = document.querySelectorAll('.movie-card');
            
            movieCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Make carousels responsive
    function setupCarousels() {
        const carousels = document.querySelectorAll('.movies-carousel');
        
        carousels.forEach(carousel => {
            const cards = carousel.querySelectorAll('.movie-card');
            const containerWidth = carousel.offsetWidth;
            const cardWidth = 200; // Adjust based on your design
            const visibleCards = Math.floor(containerWidth / cardWidth);
            
            cards.forEach((card, index) => {
                if (index >= visibleCards) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'block';
                }
            });
        });
    }

    // Initialize carousels on load and resize
    window.addEventListener('load', setupCarousels);
    window.addEventListener('resize', setupCarousels);

    // Remove empty space by adjusting layout
    function optimizeLayout() {
        const windowWidth = window.innerWidth;
        
        // Adjust news cards layout
        const newsCards = document.querySelectorAll('.news-card');
        if (windowWidth < 768) {
            newsCards.forEach(card => {
                card.style.flexDirection = 'column';
            });
        } else {
            newsCards.forEach(card => {
                card.style.flexDirection = 'row';
            });
        }
        
        // Adjust main content and sidebar
        const mainContent = document.querySelector('.movies-main');
        const sidebar = document.querySelector('.movies-sidebar');
        
        if (windowWidth < 992) {
            mainContent.style.width = '100%';
            sidebar.style.width = '100%';
            sidebar.style.marginTop = '20px';
        } else {
            mainContent.style.width = '70%';
            sidebar.style.width = '28%';
            sidebar.style.marginTop = '0';
        }
    }

    // Initialize layout optimization
    window.addEventListener('load', optimizeLayout);
    window.addEventListener('resize', optimizeLayout);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTopBtn');

// Show button when user scrolls down 300px
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

