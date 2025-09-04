document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // Visual feedback for the user
        status.style.color = '#ccc';
        status.innerHTML = "Sending...";
        
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.style.color = '#25D366'; // Green color for success
                status.innerHTML = "Message Sent! Thanks for reaching out.";
                form.reset(); // Clear the form fields
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.style.color = '#ff4d4d'; // Red color for error
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.style.color = '#ff4d4d';
                        status.innerHTML = "Oops! There was a problem submitting your form.";
                    }
                })
            }
        }).catch(error => {
            status.style.color = '#ff4d4d';
            status.innerHTML = "Oops! There was a problem submitting your form.";
        });
    }

    form.addEventListener("submit", handleSubmit);
});
