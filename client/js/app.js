/*$(document).ready(function(){*/
$(function(){
    const h1 = document.querySelector('h1');
    console.log(h1);
    
    const jH1 = $('h1');
    console.log(jH1);
    
    const allCardsJs = document.querySelectorAll('.card');
    console.log(allCardsJs);
    
    const allCardsJq = $('.card');
    console.log(allCardsJq);
    
    const allCardsTitleJq = $('.card h2');
    const tabTitle = [
        'Toto', 
        'titi', 
        'tata', 
        'tutu',
        'tete',
        'tyty'
    ];

    $('section#hero h2').text('Bonjour');
    $('section#hero p:first-child').html(`<b>Salut la compagnie</b>`);
    $('section#hero article').addClass('alert alert-primary');

    allCardsTitleJq.each(function(index, title){
        console.log(index, title);
        title.innerText = tabTitle[index];
    });
    
});