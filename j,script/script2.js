document.addEventListener('DOMContentLoaded', function() {    
    const registerContainer = document.getElementById('registerContainer');
    const loginContainer = document.getElementById('loginContainer');
    const welcomeContainer = document.getElementById('welcomeContainer');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const logoutBtn = document.getElementById('logoutBtn');
    const phoneError = document.getElementById('phoneError');
    const loginError = document.getElementById('loginError');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // بررسی اگر کاربر قبلاً وارد شده است
    checkLoggedInUser();

    // رویدادهای نمایش فرم‌ها
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });

    showRegister.addEventListener('click', function() {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    });

    // ثبت نام کاربر جدید
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
                
        const name = document.getElementById('regName').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const email = document.getElementById('regEmail').value.trim();

        // اعتبارسنجی شماره تلفن
        if (!/^09\d{9}$/.test(phone)) {
            phoneError.textContent = 'شماره تلفن باید 11 رقمی و با 09 شروع شود';
            phoneError.classList.remove('hidden');
            return;
        } 
        else {
            phoneError.classList.add('hidden');
        }

        // ذخیره کاربر در localStorage
        const user = {
            name: name,
            phone: phone,
            email: email
        };

        
        if (!localStorage.getItem('restaurantUsers')) {
        localStorage.setItem('restaurantUsers', JSON.stringify([]));
        }


        let users = JSON.parse(localStorage.getItem('restaurantUsers'));

                
        // بررسی تکراری نبودن شماره تلفن
        const existingUser = users.find(u => u.phone === phone);
        if (existingUser) {
            phoneError.textContent = 'این شماره تلفن قبلاً ثبت شده است';
            phoneError.classList.remove('hidden');
            return;
        }

        users.push(user);
        localStorage.setItem('restaurantUsers', JSON.stringify(users));
                
        // ذخیره کاربر فعلی و نمایش صفحه خوش آمدگویی
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        showWelcomePage(user);
        });
        logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        welcomeContainer.classList.add('hidden');
        window.location.href = 'index2.html';
        });

        // ورود کاربر
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
                
            const phone = document.getElementById('loginPhone').value.trim();

            // اعتبارسنجی شماره تلفن
            if (!/^09\d{9}$/.test(phone)) {
                loginError.textContent = 'شماره تلفن باید 11 رقمی و با 09 شروع شود';
                loginError.classList.remove('hidden');
                 return;
            } 
            else {
                loginError.classList.add('hidden');
            }

            // جستجوی کاربر در localStorage
            const users = JSON.parse(localStorage.getItem('restaurantUsers')) || [];
            const user = users.find(u => u.phone === phone);

            if (!user) {
                loginError.textContent = 'کاربری با این شماره تلفن یافت نشد';
                loginError.classList.remove('hidden');
                 return;
            }

            // ذخیره کاربر فعلی و نمایش صفحه خوش آمدگویی
            localStorage.setItem('currentUser', JSON.stringify(user));
                showWelcomePage(user);
            });

            // تابع نمایش صفحه خوش آمدگویی
            function showWelcomePage(user) {
                registerContainer.classList.add('hidden');
                loginContainer.classList.add('hidden');
                welcomeContainer.classList.remove('hidden');
                welcomeMessage.textContent = `${user.name} عزیز، به رستوران ما خوش آمدید!`;
            }

            // تابع بررسی کاربر لاگین کرده
            function checkLoggedInUser() {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    showWelcomePage(currentUser);
                } else {
                    // به صورت پیش‌فرض فرم ثبت نام نمایش داده شود
                    registerContainer.classList.remove('hidden');
                    loginContainer.classList.add('hidden');
                }
        }
    })