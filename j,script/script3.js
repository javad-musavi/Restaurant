document.addEventListener('DOMContentLoaded', function() {
    // سبد خرید را از localStorage دریافت یا ایجاد می‌کند
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // تمام دکمه‌های افزودن به سبد خرید
    const addToCartButtons = document.querySelectorAll('.add-to-cartt');
    
    // برای هر دکمه رویداد کلیک اضافه می‌کنیم
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // پیدا کردن کارت والد
            const foodCard = this.closest('.food-cardd');
            
            // استخراج اطلاعات غذا
            const foodName = foodCard.querySelector('h2').textContent;
            const foodPrice = foodCard.querySelector('span').textContent;
            const foodImage = foodCard.querySelector('.imgg').src;
            const foodDescription = foodCard.querySelector('h3').textContent;
            
            // ایجاد شیء غذا
            const foodItem = {
                name: foodName,
                price: foodPrice,
                image: foodImage,
                description: foodDescription,
                quantity: 1
            };
            
            // بررسی آیا غذا قبلاً در سبد خرید وجود دارد
            const existingItem = cart.find(item => item.name === foodName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(foodItem);
            }
            
            // ذخیره سبد خرید در localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // نمایش اعلان
            alert(`${foodName} به سبد خرید اضافه شد!`);
        });
    });
    
    // اگر در صفحه سبد خرید هستیم، آیتم‌ها را نمایش می‌دهیم
    if (document.querySelector('.cart-items-container')) {
        displayCartItems();
        setupCartControls();
    }
});

// نمایش آیتم‌های سبد خرید
function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // پاک کردن محتوای قبلی
    cartContainer.innerHTML = '';
    
    // اگر سبد خرید خالی است
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-message">سبد خرید شما خالی است.</p>';
        updateCartSummary();
        return;
    }
    
    // ایجاد کارت برای هر آیتم
    cart.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'cart-item-card';
        itemCard.innerHTML = `
            <div class="cart-item-image-container">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            </div>
            <div class="cart-item-details">
                <h2 class="cart-item-name">${item.name}</h2>
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-controls">
                    <button class="cart-item-decrease">-</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="cart-item-increase">+</button>
                </div>
            </div>
            <div class="cart-item-price-section">
                <span class="cart-item-price">${item.price}</span>
                <button class="cart-item-remove">حذف</button>
            </div>
        `;
        cartContainer.appendChild(itemCard);
    });
    
    updateCartSummary();
}

// تنظیم کنترل‌های سبد خرید (کم کردن، زیاد کردن، حذف)
function setupCartControls() {
    const cartContainer = document.querySelector('.cart-items-container');
    
    cartContainer.addEventListener('click', function(e) {
        const target = e.target;
        const cartItem = target.closest('.cart-item-card');
        const itemName = cartItem.querySelector('.cart-item-name').textContent;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // افزایش تعداد
        if (target.classList.contains('cart-item-increase')) {
            const item = cart.find(item => item.name === itemName);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        }
        
        // کاهش تعداد
        else if (target.classList.contains('cart-item-decrease')) {
            const item = cart.find(item => item.name === itemName);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.name !== itemName);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            }
        }
        
        // حذف آیتم
        else if (target.classList.contains('cart-item-remove')) {
            cart = cart.filter(item => item.name !== itemName);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    });
}

// محاسبه و نمایش خلاصه سبد خرید
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    
    cart.forEach(item => {
        // تبدیل قیمت به عدد (حذف کاما و تومان)
        const price = parseInt(item.price.replace(/,/g, '').replace('تومان', '').trim());
        subtotal += price * item.quantity;
    });
    
    // نمایش در صفحه
    const subtotalElement = document.querySelector('.cart-subtotal');
    const totalElement = document.querySelector('.cart-total');
    
    if (subtotalElement && totalElement) {
        subtotalElement.textContent = subtotal.toLocaleString('fa-IR') + ' تومان';
        totalElement.textContent = subtotal.toLocaleString('fa-IR') + ' تومان';
    }
}
document.addEventListener('DOMContentLoaded',function () {
    

    const cartbackbtnn = document.getElementById('cart-back-btnn');
    const cartnavv = document.querySelector('.hidencart'); 

    cartbackbtnn.addEventListener('click', function(e) {
    e.preventDefault();
    if (cartnavv.style.display === 'none' || !cartnavv.style.display) {
        cartnavv.style.display = 'flex';
    } else {
        cartnavv.style.display = 'none';
    }
    });

    // اضافه کردن event listener به document برای بستن cartnav هنگام کلیک خارج از آن
    document.addEventListener('click', function(e) {
    // بررسی کنید که آیا کلیک روی cartbackbtnn یا cartnav بوده یا نه
    const isClickInsideCart = cartnavv.contains(e.target) || cartbackbtnn.contains(e.target);
    
    if (!isClickInsideCart && cartnavv.style.display === 'flex') {
        cartnavv.style.display = 'none';
    }
    });
})