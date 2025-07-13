document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('load-more-btn');
    const allCards = document.querySelectorAll('#mentorias-container > .col-md-6');
    const cardsPerLoad = 4; // Mostra 4 cards por clique
    let visibleCards = 2; // Cards visíveis inicialmente (os 2 primeiros)

    // Esconde cards extras no início
    allCards.forEach((card, index) => {
        if (index >= visibleCards) card.classList.add('d-none');
    });

    btn.addEventListener('click', function() {
        // Se todos já estiverem visíveis, volta para 2 cards
        if (visibleCards >= allCards.length) {
            visibleCards = 2;
            btn.textContent = 'Carregar Mais Mentorias';
        } 
        // Senão, mostra mais 2 cards
        else {
            visibleCards = Math.min(visibleCards + cardsPerLoad, allCards.length);
            if (visibleCards >= allCards.length) {
                btn.textContent = 'Mostrar Menos';
            }
        }

        // Atualiza visibilidade dos cards
        allCards.forEach((card, index) => {
            card.classList.toggle('d-none', index >= visibleCards);
        });
    });
});
