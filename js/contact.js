document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            sendFormData(form);
        } else {
            console.log("Form is invalid! Cannot send.");
        }
    });

    // --------------------------------
    // Client Side - Validation Function
    // --------------------------------
    function validateForm() {
        let isValid = true;

        const nameInput = document.querySelector('[name="name"]');
        const emailInput = document.querySelector('[name="email"]');
        const phoneInput = document.querySelector('[name="phone"]');
        const subjectSelect = document.querySelector('[name="subject"]');
        const messageArea = document.querySelector('[name="message"]');

        // Helper function - show/hide error styling
        const toggleError = (element, condition) => {
            if (condition) {
                element.classList.add('error');
                isValid = false;
            } else {
                element.classList.remove('error');
            }
        };

        // --- NAME Validation ---
        toggleError(nameInput, nameInput.value.trim() === '');

        // --- MESSAGE Validation ---
        toggleError(messageArea, messageArea.value.trim() === '');

        // --- SUBJECT Validation ---
        toggleError(subjectSelect, subjectSelect.value === '');

        // --- EMAIL Validation ---
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        toggleError(emailInput, !emailPattern.test(emailInput.value.trim()));

        // --- PHONE Validation (optional) ---
        const phonePattern = /^[\d\s\-\(\)\+]{7,20}$/;
        if (phoneInput.value.trim() !== '' && !phonePattern.test(phoneInput.value.trim())) {
            toggleError(phoneInput, true);
        } else {
            toggleError(phoneInput, false);
        }

        return isValid;
    }

    // -------------
    // Send Function (EmailJS)
    // -------------
    function sendFormData(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const loader = document.getElementById('formLoader');

        // Disable button and show loader
        submitButton.disabled = true;
        loader.classList.add('active');

        emailjs.sendForm("service_6ekxpdr", "template_lpylhuo", form)
            .then(function (response) {
                console.log("SUCCESS!", response.status, response.text);
                form.reset();
                showPopup("Message sent!", "success");
            }, function (error) {
                console.error("FAILED...", error);
                showPopup("Message Not Sent.", "error");
            })
            .finally(() => {
                submitButton.disabled = false;
                loader.classList.remove('active');
            });
    }

    // ---------------
    // Pop-Up Function
    // ---------------
    function showPopup(message, type) {
        const successBox = document.getElementById('successMessage');
        const errorBox = document.getElementById('errorMessage');

        // Reset both boxes
        successBox.style.display = 'none';
        errorBox.style.display = 'none';
        successBox.classList.remove('show');
        errorBox.classList.remove('show');

        if (type === 'success') {
            successBox.querySelector('span').textContent = message;
            successBox.style.display = 'flex';
            successBox.classList.add('show');
        } else {
            errorBox.querySelector('span').textContent = message;
            errorBox.style.display = 'flex';
            errorBox.classList.add('show');
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            successBox.style.display = 'none';
            errorBox.style.display = 'none';
            successBox.classList.remove('show');
            errorBox.classList.remove('show');
        }, 5000);
    }
});
