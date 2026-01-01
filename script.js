        // Theme switching functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Set initial theme based on saved preference or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        body.classList.add(`theme-${savedTheme}`);
        
        themeToggle.addEventListener('click', () => {
            // Cycle through themes
            if (body.classList.contains('theme-light')) {
                body.classList.replace('theme-light', 'theme-dark');
                localStorage.setItem('portfolio-theme', 'dark');
            } else if (body.classList.contains('theme-dark')) {
                body.classList.replace('theme-dark', 'theme-skyblue');
                localStorage.setItem('portfolio-theme', 'skyblue');
            } else {
                body.classList.replace('theme-skyblue', 'theme-light');
                localStorage.setItem('portfolio-theme', 'light');
            }
        });

        // Menu Toggle for Mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form submission handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Merci pour votre message ! Je vous recontacterai très rapidement.');
            
            // Reset form
            this.reset();
        });

        // CORRECTION : Fonction de téléchargement du CV PDF
        document.getElementById('downloadCV').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Afficher un message de chargement
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération du PDF...';
            this.disabled = true;
            
            // Générer le PDF
            const element = document.getElementById('cvContent');
            const options = {
                margin: 10,
                filename: 'CV_Mouad_Mekrech.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(options).from(element).save().then(() => {
                // Réinitialiser le bouton après téléchargement
                this.innerHTML = originalText;
                this.disabled = false;
            }).catch(error => {
                console.error('Erreur:', error);
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Erreur lors de la génération du PDF');
            });
        });

        // Animation des barres de compétences au défilement
        document.addEventListener('DOMContentLoaded', function() {
            const skillCards = document.querySelectorAll('.skill-card');
            
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress');
                        progressBars.forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 300);
                        });
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            skillCards.forEach(card => {
                skillObserver.observe(card);
            });
        });


        const map = document.getElementById("map");
function updateMapTheme() {
    if (body.classList.contains("theme-dark")) {
        map.style.filter = "grayscale(1) invert(1)";
    } else {
        map.style.filter = "none";
    }
}

// Appel au chargement
updateMapTheme();

// Si tu changes de thème dynamiquement
document.getElementById("themeToggle")?.addEventListener("click", () => {
    setTimeout(updateMapTheme, 300);
});




    