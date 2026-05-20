$(function(){
    /* répérer le clic sur le bouton welcomeButton */
    $('#welcomeButton').on('click', ()=>{
        alert('Bienvenue !');
    });

    /* l'élément last-info s'affiche ou pas à l'aide de la classe show et d-none manipulée via le clic sur le bouton info */
    $('#info').on('click', ()=>{
        $('#last-info').toggleClass('show d-none');
    });

    /* Au clic sur le boutons id books, charger le xml
    adapter l'exemple 
    https://stackoverflow.com/questions/10811511/jquery-how-to-get-xml-data
    */
   

});