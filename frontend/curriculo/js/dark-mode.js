    
        const alternador = document.getElementById('alternador');
        
        alternador.addEventListener('change', function() {
            if(this.checked) {
                document.body.classList.remove('tema-claro');
                document.body.classList.add('tema-escuro');
                document.documentElement.setAttribute('data-tema', 'escuro');
            } else {
                document.body.classList.remove('tema-escuro');
                document.body.classList.add('tema-claro');
                document.documentElement.setAttribute('data-tema', 'claro');
            }
        });
    