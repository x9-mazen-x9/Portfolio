document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    // تنقل سلس عند الضغط على الروابط
    document.querySelectorAll('.nav ul li a, .sidebar a, .sidebar2 a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // التنقل عند تمرير الماوس
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("mouseenter", function () {
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // تحديث حالة الروابط أثناء التمرير
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar a, .sidebar2 ul li a");

    function changeActiveSection() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", changeActiveSection);

    // إظهار الـ sidebar2 عند الوصول إلى قسم معين
    window.addEventListener("scroll", function () {
        var sidebar2 = document.querySelector(".sidebar2");
        var aboutSection = document.getElementById("about");

        if (sidebar2 && aboutSection) {
            var aboutPosition = aboutSection.getBoundingClientRect().top;

            if (aboutPosition <= 50) {
                sidebar2.style.transform = "translateX(0)";
            } else {
                sidebar2.style.transform = "translateX(-100%)";
            }
        }
    });

    // إنشاء السلايدر
    function createSlider(sliderId, counterId, slideClass) {
        let currentIndex = 0;
        let slides = document.querySelectorAll(`.${slideClass}`);
        let totalSlides = slides.length;
        let counter = document.getElementById(counterId);
        let autoSlide;

        function updateCounter() {
            counter.textContent = `${totalSlides} / ${currentIndex + 1}`;
        }

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
                slide.style.opacity = i === index ? "1" : "0";
            });
            updateCounter();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        }

        function startAutoSlide() {
            autoSlide = setInterval(nextSlide, 5000);
        }

        showSlide(currentIndex);
        startAutoSlide();

        return { nextSlide, prevSlide };
    }

    let slider1 = createSlider("slider", "counter", "slide");
    let slider2 = createSlider("slider2", "counter2", "slide2");

    window.nextSlide = () => slider1.nextSlide();
    window.prevSlide = () => slider1.prevSlide();
    window.nextSlide2 = () => slider2.nextSlide();
    window.prevSlide2 = () => slider2.prevSlide();
});
