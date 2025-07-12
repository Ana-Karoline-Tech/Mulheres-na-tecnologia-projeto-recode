document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos filtros
    const tipoMentorias = document.getElementById('mentorias');
    const tipoCursos = document.getElementById('cursos');
    const tipoWorkshops = document.getElementById('workshops');
    const formatoOnline = document.getElementById('online');
    const formatoPresencial = document.getElementById('presencial');
    const areaInteresse = document.querySelector('.form-select');
    
    // Elemento container das mentorias
    const mentoriasContainer = document.getElementById('mentorias-container');
    const todasMentorias = document.querySelectorAll('.col-md-6.mb-4');
    
    // Função para filtrar as mentorias
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
        
        const areaSelecionada = areaInteresse.value;
        
        todasMentorias.forEach(mentoria => {
            // Verificar se a mentoria corresponde aos tipos selecionados
            const cardText = mentoria.querySelector('.card-body').textContent.toLowerCase();
            const tipoMatch = 
                (tiposSelecionados.mentoria && cardText.includes('mentoria')) ||
                (tiposSelecionados.curso && cardText.includes('curso')) ||
                (tiposSelecionados.workshop && cardText.includes('workshop'));
            
            // Verificar se a mentoria corresponde aos formatos selecionados
            const badge = mentoria.querySelector('.badge').textContent.toLowerCase();
            const formatoMatch = 
                (formatosSelecionados.online && badge.includes('online')) ||
                (formatosSelecionados.presencial && badge.includes('presencial'));
            
            // Verificar se a mentoria corresponde à área de interesse selecionada
            let areaMatch = true;
            if (areaSelecionada !== 'Todas as áreas') {
                areaMatch = cardText.includes(areaSelecionada.toLowerCase());
            }
            
            // Mostrar ou esconder a mentoria com base nos filtros
            if (tipoMatch && formatoMatch && areaMatch) {
                mentoria.style.display = 'block';
            } else {
                mentoria.style.display = 'none';
            }
        });
    }
    
    // Adicionar event listeners para os filtros
    tipoMentorias.addEventListener('change', filtrarMentorias);
    tipoCursos.addEventListener('change', filtrarMentorias);
    tipoWorkshops.addEventListener('change', filtrarMentorias);
    formatoOnline.addEventListener('change', filtrarMentorias);
    formatoPresencial.addEventListener('change', filtrarMentorias);
    areaInteresse.addEventListener('change', filtrarMentorias);
    
    // Carregar mais mentorias
    const loadMoreBtn = document.getElementById('load-more-btn');
    const extraMentorias = document.querySelectorAll('.extra-mentoria');
    let mentoriasVisiveis = 2; // Começa mostrando 2 mentorias
    
    loadMoreBtn.addEventListener('click', function() {
        // Mostrar as próximas 2 mentorias
        for (let i = mentoriasVisiveis; i < mentoriasVisiveis + 2 && i < extraMentorias.length; i++) {
            extraMentorias[i].classList.remove('d-none');
        }
        
        mentoriasVisiveis += 2;
        
        // Esconder o botão se todas as mentorias estiverem visíveis
        if (mentoriasVisiveis >= extraMentorias.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        // Reaplicar os filtros após mostrar mais mentorias
        filtrarMentorias();
    });
    
    // Inicialmente esconder o botão se não houver mentorias extras
    if (extraMentorias.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
});