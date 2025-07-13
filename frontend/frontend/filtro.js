document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos filtros
    const tipoMentorias = document.getElementById('mentorias');
    const tipoCursos = document.getElementById('cursos');
    const tipoWorkshops = document.getElementById('workshops');
    const formatoOnline = document.getElementById('online');
    const formatoPresencial = document.getElementById('presencial');
    const areaInteresse = document.querySelector('.form-select');
    const filtroInstrutor = document.querySelector('select[data-filtro="instrutor"]');
    
    // Elementos das mentorias
    const todasMentorias = Array.from(document.querySelectorAll('.col-md-6.mb-4'));
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Variáveis de controle
    let mentoriasVisiveis = 4; // Mostra 4 mentorias inicialmente
    const mentoriasPorPagina = 4; // Quantidade a carregar por clique

    // 1. Inicialização
    function init() {
        selecionarTodosFiltros();
        esconderMentoriasExtras();
        filtrarMentorias();
        centralizarBotao();
    }

    // 2. Selecionar todos os filtros inicialmente
    function selecionarTodosFiltros() {
        tipoMentorias.checked = true;
        tipoCursos.checked = true;
        tipoWorkshops.checked = true;
        formatoOnline.checked = true;
        formatoPresencial.checked = true;
        areaInteresse.value = 'Todas as áreas';
        filtroInstrutor.value = 'Todas';
    }

    // 3. Esconder mentorias extras no carregamento
    function esconderMentoriasExtras() {
        todasMentorias.forEach((mentoria, index) => {
            if (index >= mentoriasVisiveis) {
                mentoria.classList.add('d-none');
            }
        });
    }

    // 4. Função principal de filtragem (versão corrigida)
function filtrarMentorias() {
    const tiposSelecionados = {
        mentoria: tipoMentorias.checked,
        curso: tipoCursos.checked,
        workshop: tipoWorkshops.checked
    };
    
    const formatosSelecionados = {
        online: formatoOnline.checked,
        presencial: formatoPresencial.checked
    };
    
    const areaSelecionada = areaInteresse.value.toLowerCase().trim();
    const instrutorSelecionado = filtroInstrutor.value.toLowerCase().trim();
    
    // Resetar contagem ao filtrar
    mentoriasVisiveis = mentoriasPorPagina;
    
    todasMentorias.forEach((mentoria, index) => {
        const tipo = mentoria.getAttribute('data-tipo');
        const formato = mentoria.getAttribute('data-formato');
        const area = mentoria.getAttribute('data-area').toLowerCase().trim();
        const instrutor = (mentoria.getAttribute('data-instrutor') || '').toLowerCase().trim();
        
        const deveMostrar = (
            tiposSelecionados[tipo] &&
            formatosSelecionados[formato] &&
            (areaSelecionada === 'todas as áreas' || area === areaSelecionada) &&
            (instrutorSelecionado === 'todas' || instrutor.includes(instrutorSelecionado))
        );
        
        if (deveMostrar) {
            mentoria.style.display = 'block';
            mentoria.classList.toggle('d-none', index >= mentoriasVisiveis);
        } else {
            mentoria.style.display = 'none';
            mentoria.classList.add('d-none');
        }
    });
    
    atualizarBotao();
}

    // 5. Atualizar visibilidade do botão
    function atualizarBotao() {
        const mentoriasFiltradas = todasMentorias.filter(mentoria => 
            mentoria.style.display !== 'none'
        );
        
        const mentoriasOcultas = mentoriasFiltradas.filter(mentoria => 
            mentoria.classList.contains('d-none')
        );
        
        loadMoreBtn.style.display = mentoriasOcultas.length > 0 ? 'block' : 'none';
        centralizarBotao();
    }

    // 6. Centralizar o botão
    function centralizarBotao() {
        loadMoreBtn.style.margin = '20px auto';
        loadMoreBtn.style.display = 'block';
    }

    // 7. Carregar mais mentorias
    loadMoreBtn.addEventListener('click', function() {
        const mentoriasOcultas = todasMentorias.filter(mentoria => 
            mentoria.style.display !== 'none' && 
            mentoria.classList.contains('d-none')
        );
        
        // Mostra as próximas mentorias
        mentoriasOcultas.slice(0, mentoriasPorPagina).forEach(mentoria => {
            mentoria.classList.remove('d-none');
        });
        
        mentoriasVisiveis += mentoriasPorPagina;
        atualizarBotao();
    });

    // Event listeners para filtros
    [tipoMentorias, tipoCursos, tipoWorkshops, formatoOnline, formatoPresencial, 
     areaInteresse, filtroInstrutor].forEach(element => {
        element.addEventListener('change', filtrarMentorias);
    });

    // Inicializar
    init();
});