const figyelo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Stop observing after animation plays once
            figyelo.unobserve(entry.target);
        }
    });
});

const rejtették = document.querySelectorAll('.hidden');
rejtették.forEach((el) => figyelo.observe(el));