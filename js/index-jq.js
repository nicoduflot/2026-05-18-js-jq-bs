$(function(){
    $('#welcomeButton').on('click', function(){
        alert('Bienvenue !');
    });

    /* Pour déclencher le même comportement avec le même événement sur deux boutons différents, il suffit d'écrire les deux sélecteur css des deux boutons dans $(''), séparés par une virgule */

    $('#info, #close-info').on('click', function(){
        $('#last-info').slideToggle();
    });

    /* Pour effacer  le contenu d'un élément, on va utiliser .empty() sur l'élement */

    $('#loadArticles').on('click', function(){
        $('#articles').empty();
        charger('#article');
    });

    async function charger(target){
        /*
        pour les appels ajax asynchrone,on utilise $.get(url) qui contrairement à .fetch() renvoie le résultat directement en JSON
        soit un tableau d'objet soit un objet
        */
        let data = await $.get('https://jsonplaceholder.typicode.com/posts');
        if(!data.hasOwnProperty('length')) data = [data];
        data.map((article)=>{
            createArticle(article, '#articles');
        });
    }

    async function userPosts(userid, target) {
        $(target).empty();
        let data = await $.get(`https://jsonplaceholder.typicode.com/posts/?userId=${userid}`);
        if(!data.hasOwnProperty('length')) data = [data];
        data.map(article=>{
            createArticle(article, target);
        });
    }

    function createArticle(element, target){
        const article = $('<article>', {
            class: 'border'
        });
        const header = $('<header>');
        const h2 = $('<h2>');
        const content = $('<p>');
        const linkUserPosts = $('<a>', {
            'data-userid':element.userId,
            'data-target':target,
            href: '#'
        });
        linkUserPosts.text('Du même auteur');
        h2.text(element.title);
        header.append(h2);
        article.append(header);
        content.text(element.body);
        article.append(content);

        linkUserPosts.on('click', event=>{
            event.preventDefault();
            event.stopPropagation();
            userPosts(linkUserPosts.data('userid'), target);
        });
        article.append(linkUserPosts);

        /*
        transcription en jquery
        */

        const linkUser = document.createElement('a');
        linkUser.setAttribute('data-userid', element.userId);
        linkUser.setAttribute('data-target', target);
        linkUser.setAttribute('href', '#');
        linkUser.append(document.createTextNode('Voir l\'auteur'));
        linkUser.addEventListener('click', event=>{
            event.preventDefault();
            event.stopPropagation();
            getUser(linkUser.dataset.userid, target);
        });
        article.append(document.createElement('br'));
        article.append(linkUser);

        $(target).append(article);
    }

    function createUser(userId, target){
        /*
        transcrire le JS en JQuery
        */
        
    }

});