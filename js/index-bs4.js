$(function () {
    /* répérer le clic sur le bouton welcomeButton */
    $('#welcomeButton').on('click', () => {
        alert('Bienvenue !');
    });

    /* l'élément last-info s'affiche ou pas à l'aide de la classe show et d-none manipulée via le clic sur le bouton info */
    $('#info').on('click', () => {
        $('#last-info').toggleClass('show d-none');
    });

    /* Au clic sur le boutons id books, charger le xml
    adapter l'exemple 
    https://stackoverflow.com/questions/10811511/jquery-how-to-get-xml-data
    */

    $('#books').on('click', () => {
        $.ajax({
            type: 'GET',
            url: './xml/books.xml',
            dataType: 'xml',
            success: function (xml) {
                console.log(xml);
                parseXmlBooks(xml, '#dataDisplay');
            }
        });
    });

    function parseXmlBooks(data, target) {
        /*console.log($(xml));*/
        $(data).find('book').each(function () {
            const category = $(this).attr('category');
            const title = $(this).find('title').text();
            /* il pourrait y avoir plusieurs auteurs, il faut donc, à la création de la carte livre, faire une boucle sur l'objet authors */
            const authors = $(this).find('author');
            /* Complétez la suite de la récupération des information et créez un affichage
            mettez chaque article dans une div avec les classes col-12 col-md-4 col-lg-3
            <div class="col-12 col-md-4 col-lg-3">
                <article>
                </article>
            </div>
            */

        });
    }

});