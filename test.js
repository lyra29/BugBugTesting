 // Hardcoded credentials
        const validCredentials = {
            'admin': 'password123',
            'user': 'test123'
        };

        // DOM elements
        const loginContainer = document.getElementById('loginContainer');
        const homeContainer = document.getElementById('homeContainer');
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('errorMessage');
        const logoutBtn = document.getElementById('logoutBtn');
        const userName = document.getElementById('userName');
        const userAvatar = document.getElementById('userAvatar');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 6 + 4 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Login form submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            if (validCredentials[username] && validCredentials[username] === password) {
                // Hide error message
                errorMessage.style.display = 'none';
                
                // Update user info
                userName.textContent = username.charAt(0).toUpperCase() + username.slice(1) + ' User';
                userAvatar.textContent = username.charAt(0).toUpperCase();
                
                // Animate transition
                loginContainer.classList.add('slide-out');
                
                setTimeout(() => {
                    loginContainer.classList.add('hidden');
                    homeContainer.style.display = 'block';
                    setTimeout(() => {
                        homeContainer.classList.add('slide-in');
                    }, 50);
                }, 400);
                
                // Reset form
                loginForm.reset();
            } else {
                // Show error message
                errorMessage.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();
                
                // Add shake animation
                loginContainer.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    loginContainer.style.animation = '';
                }, 500);
            }
        });

        // Logout functionality
        logoutBtn.addEventListener('click', function() {
            homeContainer.classList.remove('slide-in');
            
            setTimeout(() => {
                homeContainer.style.display = 'none';
                loginContainer.classList.remove('hidden');
                loginContainer.classList.remove('slide-out');
                errorMessage.style.display = 'none';
                usernameInput.focus();
            }, 400);
        });

        // Add smooth hover effects to dashboard cards
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Initialize
        createParticles();
        usernameInput.focus();

        // Add ripple effect to buttons
        function createRipple(event) {
            const button = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Add ripple styles
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .login-btn, .logout-btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        document.querySelector('.login-btn').addEventListener('click', createRipple);
        document.querySelector('.logout-btn').addEventListener('click', createRipple);
   