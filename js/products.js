/**
 * products.js
 * Handles product-related interactions: quick view, image zoom, filtering
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Image Zoom Effect on Hover for Product Details
    const productImages = document.querySelectorAll('.product_img img');

    productImages.forEach(img => {
        img.addEventListener('mousemove', function (e) {
            const width = img.offsetWidth;
            const height = img.offsetHeight;
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;

            const bgPosX = (mouseX / width * 100);
            const bgPosY = (mouseY / height * 100);

            img.style.transformOrigin = `${bgPosX}% ${bgPosY}%`;
            img.style.transform = 'scale(1.5)';
        });

        img.addEventListener('mouseleave', function () {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    });

    // 2. Add "Add to Cart" ripple effect
    const btnPrimary = document.querySelectorAll('.btn-primary');
    btnPrimary.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Ripple logic
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
