document.addEventListener('DOMContentLoaded', function() {
    
    // ---------------------------------------------navigation
    let navlinks = document.getElementById('nav-links');
    let opennav = document.getElementById('open');
    let nav = document.getElementById('nav');
    let isOpen = false;

    function toggleMenu() {
        if(!isOpen) {
            nav.style.height = '240px';
            navlinks.style.marginTop = '80px';
        } else {
            nav.style.height = '80px';
            navlinks.style.marginTop = '220px';
        }
        isOpen = !isOpen;
    }

    function resetMenuOnResize() {
        if (window.innerWidth > 768) { 
            nav.style.height = ''; 
            navlinks.style.marginTop = ''; 
            isOpen = false; 
        }
    }

    if (opennav) {
        opennav.addEventListener('click', toggleMenu);
    }
    
    window.addEventListener('resize', resetMenuOnResize);
});
// -------------------------------------------------تماس با ما
document.addEventListener('DOMContentLoaded', function() {
    // انتخاب لینک تماس با ما
    const contactLink = document.getElementById('contact');
    
    // اضافه کردن event listener برای کلیک
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
            
            // نمایش alert با اطلاعات تماس
            alert(`اطلاعات تماس:\n\nتلفن: 09034862625\nآدرس:  اهواز کوی مهدیس، پلاک ۱۲\nایمیل: jmusavi15@gmail.com\nساعات کاری: ۱۰ صبح تا ۱۲ شب`);
        });
    }

    // --------------------------------------------------درباره ما

    const aboutLink = document.getElementById('about');
    
    // اضافه کردن event listener برای کلیک
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
            
            // نمایش alert با اطلاعات تماس
            alert(`✨ **به دنیای طعم‌های به یاد ماندنی خوش آمدید!** ✨

                رستوران ما با بیش از ۱۵ سال سابقه درخشان، میزبان لحظات شیرین و به یاد ماندنی شماست.     
                ما با عشق و خلاقیت، بهترین غذاهای ایرانی و بین‌المللی را برای شما آماده می‌کنیم.

                🍽️ **چرا ما را انتخاب کنید؟**
                ✔ استفاده از مواد اولیه تازه و باکیفیت
                ✔ محیطی گرم و دوست‌داشتنی
                ✔ سرویس سریع و حرفه‌ای
                ✔ تنوع منوی بی‌نظیر

                ما افتخار می‌کنیم که میزبان شما هستیم. ❤️`);
        });
    }
});