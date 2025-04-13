document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('mobile').value
    };

    // Send email using Email.js or your preferred email service
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
            document.getElementById('appointmentForm').style.display = 'none';
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
        } else {
            throw new Error('Failed to submit form');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error submitting your request. Please try again.');
    });
});
