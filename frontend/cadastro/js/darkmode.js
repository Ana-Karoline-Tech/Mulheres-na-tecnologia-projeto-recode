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
        
        // Script para alternar entre login e cadastro
        const botaoLogin = document.getElementById('botao-login');
        const conteudoCadastro = document.querySelector('.conteudo-cadastro');
        
        botaoLogin.addEventListener('click', function() {
            conteudoCadastro.classList.toggle('conteudo-login-js');
        });