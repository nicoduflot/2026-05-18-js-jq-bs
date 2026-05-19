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

    document.getElementById('toggleAlert').addEventListener('click', ()=>{
        $('section#hero article').toggleClass('invisible');
        $('#toggleAlert').text(( $('#toggleAlert').text() === 'Cacher l\'alerte' )? 'Afficher l\'alerte' : 'Cacher l\'alerte');
    });

    /* anciennes versions de JQuery */
    $('#testClick').click(()=>{
        console.log('clic');        
    });

    $('#testClick').hover(()=>{
        console.log('survol');
    });
    /* Version moderne */
    $('#testClickJq').on('click',()=>{
        console.log('clicJq');
    });

    /* Gestion d'événements multiple sur un élément */
    /* on utilise un objet litéral */

    const toto = {
        tata: 'tutu',
        salut: function(){console.log('salut')},
        titi: 45
    };

    console.log(toto);
    console.log(toto.tata);
    toto.salut();
    console.log(toto.titi);
    
    /* dans l'objet litéral qui aliment le .on(), l'attribut est l'événement surveillé, la valeur est le comportement (callback function) */

    $('#testClickOverJq').on(
        {
            mouseenter: function(){console.log('entrer');},
            mouseleave: function(){console.log('sortir');},
            click: function(){console.log('click on multi');}
        }
    );

    let delegCount = 0;

    $(document).on('click', '#testClickDeleg', function(){
        console.log(this);
        $('#list li:last-child').after(`<li>titi ${++delegCount}</li>`);
    });

    /* 
    Créer un écouteur d'événement par ligne
    pas optimal
    */
    /*
    $('#tabDeleg tr').on('click', function(){
       console.log( $(this).text());
       ;
    });
    */

    /*
    on va déléguer l'événement
    On abonne au clic un seul élément et on se base sur la cible du clic pour interagir
    js natif
    On est obligé, ici, pour ramener le tr du tableau, de chercher le noeud parent du td cliqué
    */
    /*
    document.getElementById('tabDeleg').addEventListener('click', function(event){
        console.log(event.target.parentNode);        
    });
    */

    /* 
    JQuery 
    on surveille clic sur le tableau et avec le .on on précise l'élément qu'on recherche dans les parents de la cible du clic
    */
    $('#tabDeleg').on('click', 'tr', function(){
        console.log($(this));
    });

    /* Effets Jquery */
    $('button.toggleMenu').on('click', function(){
        $(`${$(this).data('target')}`).slideToggle('slow');
    });

});