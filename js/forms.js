/**
 * forms.js
 * Professional form validation, floating labels, input masaking
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Professional Form Validation for Contact and Checkout
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.setAttribute('novalidate', true); // Turn off browser default validation for custom UI

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input, textarea, select');

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    showError(input, 'This field is required');
                    isValid = false;
                } else if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        showError(input, 'Please enter a valid email');
                        isValid = false;
                    } else {
                        removeError(input);
                    }
                } else {
                    removeError(input);
                }
            });

            if (isValid) {
                // Professional Submit State
                const submitBtn = form.querySelector('button[type="submit"], .btn-primary');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
                    submitBtn.disabled = true;

                    // Mock API call
                    setTimeout(() => {
                        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Success!';
                        submitBtn.classList.add('bg-success');
                        submitBtn.classList.remove('btn-primary');
                        form.reset();

                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.classList.remove('bg-success');
                            submitBtn.classList.add('btn-primary');
                            submitBtn.disabled = false;
                        }, 3000);
                    }, 1500);
                }
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, listen');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    removeError(input);
                }
            });
        });
    });

    function showError(input, message) {
        removeError(input); // Clear existing
        input.classList.add('is-invalid');
        input.style.borderColor = '#ef4444'; // Red

        const errorDiv = document.createElement('div');
        errorDiv.className = 'custom-error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.innerText = message;

        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }

    function removeError(input) {
        input.classList.remove('is-invalid');
        input.style.borderColor = ''; // reset

        const nextSibling = input.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('custom-error-message')) {
            nextSibling.remove();
        }
    }

    // 2. Input interactions (Focus states)
    const allInputs = document.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = '#3B82F6';
                label.style.fontWeight = '600';
            }
        });

        input.addEventListener('blur', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = '';
                label.style.fontWeight = '';
            }
        });
    });
});
