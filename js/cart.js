/**
 * cart.js
 * Handles shopping cart logic, local storage state, and dynamic updates
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize cart state from local storage or set default
    let cart = JSON.parse(localStorage.getItem('ecommerce_cart')) || { items: [], total: 0 };
    updateCartIcon();

    // 2. Mock adding to cart functionality
    const addToCartBtns = document.querySelectorAll('a[href="cart.html"]'); // Adjust selector as needed, or add a specific class like .add-to-cart

    // For demo purposes, we will attach to buttons that look like add to cart actions
    document.querySelectorAll('.single_product h4 a').forEach((productLink, index) => {
        // Let's dynamically add a button just to show professional JS working seamlessly
        const productContainer = productLink.closest('.single_product');
        if (productContainer) {
            const btnContainer = document.createElement('div');
            btnContainer.classList.add('mt-3');
            btnContainer.innerHTML = `<button class="btn btn-outline-primary btn-sm btn-block add-to-cart-action" data-id="${index}" data-name="${productLink.innerText}" data-price="400">Add to Cart</button>`;
            productContainer.querySelector('.product-caption').appendChild(btnContainer);
        }
    });

    // Handle clicks on dynamic add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-action')) {
            const btn = e.target;
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            addToCart(id, name, price);

            // Professional UX Feedback
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-primary');

            setTimeout(() => {
                btn.innerHTML = 'Add to Cart';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-primary');
            }, 2000);
        }
    });

    function addToCart(id, name, price) {
        const existingItem = cart.items.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ id, name, price, quantity: 1 });
        }

        cart.total += price;
        localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
        updateCartIcon();
    }

    function updateCartIcon() {
        const cartBadges = document.querySelectorAll('.cart .badge');
        let totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        cartBadges.forEach(badge => {
            badge.innerText = totalItems;

            // Animate badge
            badge.style.transform = 'scale(1.5)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // 3. Cart Page Logic (if on cart.html)
    if (window.location.pathname.includes('cart.html')) {
        // Mocking dynamic updates for the cart quantity inputs
        const quantityInputs = document.querySelectorAll('input[name="quantity"]');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function () {
                // Here we would sync with local storage and update summaries 
                // Currently visually reacting to show functionality
                const summaryTotal = document.querySelectorAll('.border-top span strong, #summary');
                summaryTotal.forEach(el => {
                    el.style.color = '#3B82F6';
                    setTimeout(() => el.style.color = '', 500);
                });
            });
        });
    }
});
