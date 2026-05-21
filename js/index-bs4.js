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
        $(target).empty();
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
           const divAuthor = $('<div>', {
            class: 'card-footer'
           });
           authors.each(function(){
               const author = $(this).text();
               const spanAuthor = $('<span>').text(author);
               divAuthor.append(spanAuthor, $('<br />'));    
            });
            const year = $(this).find('year').text();
            const price = $(this).find('price').text();
            const divBook = $('<div>', {
                class: 'col-12 col-md-4 col-lg-3 my-2'
            });
            const article = $('<article>', {
                class: 'card'
            });
            
            const cardBody = $('<div>', {
                class: 'card-body'
            });
            const cardTitle = $('<h5>', {
                class: 'card-title'
            }).text(title);
            const pYear = $('<p>').html(`<b>Année de publication :</b> ${year}`);
            const pPrice = $('<p>').html(`<b>Prix public :</b> ${price} £`);
            divBook.append(article);
            article.append(cardBody.append(cardTitle, pYear, pPrice), divAuthor);

            $(target).append(divBook);
        });
    }

});