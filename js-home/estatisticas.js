document.addEventListener('DOMContentLoaded', function() {
  // Animated Counter
  function animateCounter(id, target, duration = 2000) {
    const element = document.getElementById(id);
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = "+ de " + Math.floor(current);
    }, 16);
  }

  // Intersection Observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('impacted-counter', 500);
        animateCounter('workshops-counter', 50);
        animateCounter('partners-counter', 30);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById('stats'));
});
