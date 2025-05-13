document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Send email using Formspree
            fetch('https://formspree.io/f/xyzebzdz', {  // Replace with your form ID
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    // Hide the form
                    contactForm.style.display = 'none';
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon">
                            <img src="mail-icon.png" alt="Success">
                        </div>
                        <h2>Thank you!!</h2>
                        <p>Your message has been received! One of our team members will be in touch with you shortly.</p>
                        <button onclick="window.location.href='index.html'" class="go-home">Go home</button>
                    `;
                    contactForm.parentElement.appendChild(successMessage);
                } else {
                    throw new Error('Failed to submit form');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error submitting your request. Please try again.');
            });
        });
    }

    // Floating label handling
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add placeholder to make the label float when there's content
        input.setAttribute('placeholder', ' ');
        
        // Handle focus events
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Map link handling
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace with your actual Google Maps URL
            window.open('https://www.google.co.in/maps/place/Customised+Technologies+Private+Limited/@12.8377113,77.6616913,19z/data=!4m6!3m5!1s0x3bae14673d54d43b:0x93bb4dc52f723631!8m2!3d12.8377922!4d77.6618729!16s%2Fg%2F1tg852cs?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D', '_blank');
        });
    }
});
