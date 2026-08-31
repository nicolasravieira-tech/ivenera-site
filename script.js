document.addEventListener('DOMContentLoaded', function() {

/* 1. COMPORTAMENTO DO HEADER NO SCROLL */
const header = document.querySelector('.js-header');

function checkHeaderScroll() {
if (window.scrollY > 50) {
header.classList.add('header--scrolled');
} else {
header.classList.remove('header--scrolled');
}
}

// Verifica posição no carregamento e no scroll
checkHeaderScroll();
window.addEventListener('scroll', checkHeaderScroll);

/* 2. MENU MOBILE TOGGLE */
const menuToggle = document.querySelector('.js-menu-toggle');
const nav = document.querySelector('.js-nav');
const body = document.body;

if (menuToggle && nav) {
menuToggle.addEventListener('click', function() {
nav.classList.toggle('header__nav--open');
const isOpen = nav.classList.contains('header__nav--open');
menuToggle.setAttribute('aria-expanded', isOpen);
body.classList.toggle('no-scroll', isOpen); // Previne scroll do body quando menu está aberto
});

// Fecha o menu ao clicar em um link    
const menuLinks = document.querySelectorAll('.js-menu-link');    
menuLinks.forEach(link => {    
    link.addEventListener('click', function() {    
        if (nav.classList.contains('header__nav--open')) {    
            nav.classList.remove('header__nav--open');    
            menuToggle.setAttribute('aria-expanded', 'false');    
            body.classList.remove('no-scroll');    
        }    
    });    
});

}

/* 3. FAQ ACCORDION */
const faqItems = document.querySelectorAll('.js-faq-item');

if (faqItems) {
faqItems.forEach(item => {
const question = item.querySelector('.js-faq-question');

question.addEventListener('click', function() {    
        // Fecha outros itens abertos (comportamento accordion)    
        faqItems.forEach(otherItem => {    
            if (otherItem !== item) {    
                otherItem.classList.remove('faq__item--open');    
                otherItem.querySelector('.js-faq-question').setAttribute('aria-expanded', 'false');    
            }    
        });    
            
        // Toggle do item clicado    
        item.classList.toggle('faq__item--open');    
        const isOpen = item.classList.contains('faq__item--open');    
        question.setAttribute('aria-expanded', isOpen);    
    });    
});

}

/* 4. SCROLL REVEAL ANIMATIONS */
const revealElements = document.querySelectorAll('.scroll-reveal');

if ('IntersectionObserver' in window) {
const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const delay = entry.target.getAttribute('data-delay') || 0;
setTimeout(() => {
entry.target.classList.add('scroll-reveal--visible');
}, delay);
// Deixa de observar o elemento após revelar
revealObserver.unobserve(entry.target);
}
});
}, {
threshold: 0.2 // Começa a revelar quando 20% do elemento está visível
});

revealElements.forEach(element => {    
    revealObserver.observe(element);    
});

} else {
// Fallback para navegadores antigos: mostra todos os elementos
revealElements.forEach(element => {
element.classList.add('scroll-reveal--visible');
});
}

});
