  const btnTestimonials = document.getElementById('btn-testimonials');
  const extras = document.querySelectorAll('.testimonial-extra');
  let mostrando = false;

  btnTestimonials.addEventListener('click', function(e) {
    e.preventDefault();
    mostrando = !mostrando;
    extras.forEach(card => {
      card.classList.toggle('d-none', !mostrando);
    });
    btnTestimonials.textContent = mostrando ? 'Ver menos histórias de sucesso' : 'Veja mais histórias de sucesso';
  });
