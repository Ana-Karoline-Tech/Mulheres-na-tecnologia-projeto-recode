document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o Dark Mode
    inicializarDarkMode();
    
    // Variáveis globais
    let vagas = JSON.parse(localStorage.getItem('vagas')) || [];
    let vagaEditando = null;
    
    // Elementos do DOM
    const btnCadastrar = document.getElementById('cadastrarVaga');
    const formVaga = document.getElementById('form-vaga');
    const tabelaVagas = document.getElementById('tabela-vagas').querySelector('tbody');
    const modal = document.getElementById('modal-vaga');
    const modalTitulo = document.getElementById('modal-titulo');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const modalClose = document.getElementById('modal-close');
    const logoInput = document.getElementById('logo');
    const logoPreview = document.getElementById('logo-preview');
    
    // Event Listeners
    btnCadastrar.addEventListener('click', abrirModalCadastro);
    btnSalvar.addEventListener('click', salvarVaga);
    btnCancelar.addEventListener('click', fecharModal);
    modalClose.addEventListener('click', fecharModal);
    logoInput.addEventListener('change', atualizarPreviewLogo);
    
    // Inicialização
    atualizarTabela();
    
    // Funções
    function inicializarDarkMode() {
        const alternador = document.getElementById('alternador');
        if(!alternador) return;
        
        // Verifica preferência salva
        const temaSalvo = localStorage.getItem('tema') || 'claro';
        
        // Aplica o tema salvo
        if(temaSalvo === 'escuro') {
            document.body.classList.add('tema-escuro');
            document.documentElement.setAttribute('data-tema', 'escuro');
            alternador.checked = true;
        }
        
        // Listener para alternância
        alternador.addEventListener('change', function() {
            if(this.checked) {
                document.body.classList.add('tema-escuro');
                document.body.classList.remove('tema-claro');
                document.documentElement.setAttribute('data-tema', 'escuro');
                localStorage.setItem('tema', 'escuro');
            } else {
                document.body.classList.remove('tema-escuro');
                document.body.classList.add('tema-claro');
                document.documentElement.setAttribute('data-tema', 'claro');
                localStorage.setItem('tema', 'claro');
            }
        });
    }
    
    function abrirModalCadastro() {
        vagaEditando = null;
        modalTitulo.textContent = 'Nova Vaga';
        formVaga.reset();
        logoPreview.src = 'assets/empresa-default.png';
        modal.classList.add('active');
    }
    
    function fecharModal() {
        modal.classList.remove('active');
    }
    
    function atualizarPreviewLogo(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                logoPreview.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    
    function salvarVaga() {
        const novaVaga = {
            empresa: document.getElementById('empresa').value,
            nivel: document.getElementById('nivel').value,
            tipo: document.getElementById('tipo').value,
            salario: document.getElementById('salario').value,
            descricao: document.getElementById('descricao').value,
            beneficios: document.getElementById('beneficios').value,
            link: document.getElementById('link').value,
            exclusivaMulheres: document.getElementById('exclusivaMulheres').checked,
            logo: logoPreview.src
        };
        
        // Validação
        if (!novaVaga.empresa || !novaVaga.nivel || !novaVaga.tipo || !novaVaga.salario || !novaVaga.descricao) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Adiciona ID e data de cadastro
        novaVaga.id = Date.now();
        novaVaga.dataCadastro = new Date().toLocaleString();
        
        if (vagaEditando) {
            // Atualiza vaga existente
            const index = vagas.findIndex(v => v.id == vagaEditando.id);
            vagas[index] = novaVaga;
        } else {
            // Adiciona nova vaga
            vagas.push(novaVaga);
        }
        
        // Salva no localStorage
        localStorage.setItem('vagas', JSON.stringify(vagas));
        
        // Atualiza a tabela
        atualizarTabela();
        
        // Fecha o modal
        fecharModal();
        
        // Feedback para o usuário
        alert('Vaga salva com sucesso!');
    }
    
    function atualizarTabela() {
        tabelaVagas.innerHTML = '';
        
        if (vagas.length === 0) {
            tabelaVagas.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center">Nenhuma vaga cadastrada ainda.</td>
                </tr>
            `;
            return;
        }
        
        vagas.forEach(vaga => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${vaga.logo}" alt="Logo ${vaga.empresa}" style="width: 50px; height: 50px; object-fit: contain;"></td>
                <td>${vaga.empresa}</td>
                <td>${vaga.descricao.substring(0, 50)}${vaga.descricao.length > 50 ? '...' : ''}</td>
                <td>${vaga.nivel}</td>
                <td>${vaga.tipo}</td>
                <td>${vaga.salario}</td>
                <td>
                    <button class="button green btn-editar" data-id="${vaga.id}">Editar</button>
                    <button class="button red btn-excluir" data-id="${vaga.id}">Excluir</button>
                </td>
            `;
            tabelaVagas.appendChild(tr);
        });
        
        // Adiciona eventos aos botões
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                editarVaga(parseInt(this.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function() {
                excluirVaga(parseInt(this.getAttribute('data-id')));
            });
        });
    }
    
    function editarVaga(id) {
        vagaEditando = vagas.find(v => v.id === id);
        
        // Preenche o formulário
        document.getElementById('empresa').value = vagaEditando.empresa;
        document.getElementById('nivel').value = vagaEditando.nivel;
        document.getElementById('tipo').value = vagaEditando.tipo;
        document.getElementById('salario').value = vagaEditando.salario;
        document.getElementById('link').value = vagaEditando.link || '';
        document.getElementById('descricao').value = vagaEditando.descricao;
        document.getElementById('beneficios').value = vagaEditando.beneficios || '';
        document.getElementById('exclusivaMulheres').checked = vagaEditando.exclusivaMulheres || false;
        
        logoPreview.src = vagaEditando.logo;
        modalTitulo.textContent = 'Editar Vaga';
        modal.classList.add('active');
    }
    
    function excluirVaga(id) {
        if (confirm('Tem certeza que deseja excluir esta vaga?')) {
            vagas = vagas.filter(v => v.id !== id);
            localStorage.setItem('vagas', JSON.stringify(vagas));
            atualizarTabela();
            alert('Vaga excluída com sucesso!');
        }
    }
});