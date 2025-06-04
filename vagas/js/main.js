// Seleciona elementos do DOM
const btnCadastrar = document.getElementById('cadastrarCliente');
const modal = document.getElementById('modal');
const btnFechar = document.getElementById('modal-Close');
const btnCancelar = document.querySelector('.modal-footer .button.red');

// Abrir modal ao clicar em "Cadastrar Vaga"
btnCadastrar.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Fechar modal ao clicar no X ou em "Cancelar"
btnFechar.addEventListener('click', () => {
    modal.style.display = 'none';
});
btnCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


    