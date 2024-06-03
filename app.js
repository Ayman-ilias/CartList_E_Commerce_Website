// app.js
document.addEventListener('DOMContentLoaded', function() {
    let couponUsed = false; 
    updateTotals();

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            let quantityElement = this.previousElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;

            updateItemTotal(this.closest('tr'), quantity);
            updateTotals();
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            let quantityElement = this.nextElementSibling;
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;

                updateItemTotal(this.closest('tr'), quantity);
                updateTotals();
            }
        });
    });

    document.getElementById('add-coupon').addEventListener('click', function() {
        var couponInput = document.getElementById('coupon-input');
        if (couponInput.style.display === 'none' || couponInput.style.display === '') {
            couponInput.style.display = 'block';
        } else {
            couponInput.style.display = 'none';
        }
    });

    document.getElementById('apply-coupon').addEventListener('click', function() {
        var couponCode = document.getElementById('coupon-code').value;
        var couponPopup = document.getElementById('coupon-popup');
        var couponMessage = document.getElementById('coupon-message');

        if (couponCode === '1234' && !couponUsed) {
            couponMessage.textContent = 'Coupon applied successfully!';
            applyDiscount(0.05); // Apply 5% discount
            couponUsed = true; // Mark coupon as used
        } else if (couponCode === '1234' && couponUsed) {
            couponMessage.textContent = 'Coupon already used.';
        } else {
            couponMessage.textContent = 'No coupon available.';
        }

        couponPopup.style.display = 'flex';
        var couponInput = document.getElementById('coupon-input');
        couponInput.style.display = 'none';
    });

    document.getElementById('close-popup').addEventListener('click', function() {
        var couponPopup = document.getElementById('coupon-popup');
        couponPopup.style.display = 'none';
    });

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
            let row = this.closest('tr');
            row.remove();
            updateTotals();
        });
    });

    function updateItemTotal(row, quantity) {
        let priceElement = row.querySelector('td:nth-child(2)');
        let price = parseFloat(priceElement.textContent.replace('$', ''));
        let totalElement = row.querySelector('.item-total');
        let total = price * quantity;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    function updateTotals() {
        let subtotal = 0;
        document.querySelectorAll('.item-total').forEach(totalElement => {
            subtotal += parseFloat(totalElement.textContent.replace('$', ''));
        });
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        updateTotalWithDiscount(subtotal);
    }

    function applyDiscount(discountRate) {
        let subtotalElement = document.getElementById('subtotal');
        let subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
        let discount = subtotal * discountRate;
        document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
        updateTotalWithDiscount(subtotal);
    }

    function updateTotalWithDiscount(subtotal) {
        let discountElement = document.getElementById('discount');
        let discount = parseFloat(discountElement.textContent.replace('-$', '')) || 0;
        let total = subtotal - discount;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
});
