
  const btnVerTodos = document.getElementById('ver-todos-eventos');
  const btnVerMenos = document.getElementById('ver-menos-eventos');
  const palestra5 = document.getElementById('palestra5');
  const palestra6 = document.getElementById('palestra6');
  const palestra7 = document.getElementById('palestra7');
  const palestra8 = document.getElementById('palestra8');
  const palestra9 = document.getElementById('palestra9');
  const palestra10 = document.getElementById('palestra10');

  btnVerTodos.addEventListener('click', function(e) {
    e.preventDefault();
    palestra5.classList.remove('d-none');
    palestra6.classList.remove('d-none');
    palestra7.classList.remove('d-none');
    palestra8.classList.remove('d-none');
    palestra9.classList.remove('d-none');
    palestra10.classList.remove('d-none');
    btnVerTodos.classList.add('d-none');
    btnVerMenos.classList.remove('d-none');
  });

  btnVerMenos.addEventListener('click', function(e) {
    e.preventDefault();
    palestra5.classList.add('d-none');
    palestra6.classList.add('d-none');
    palestra7.classList.add('d-none');
    palestra8.classList.add('d-none');
    palestra9.classList.add('d-none');
    palestra10.classList.add('d-none');
    btnVerMenos.classList.add('d-none');
    btnVerTodos.classList.remove('d-none');
  });
