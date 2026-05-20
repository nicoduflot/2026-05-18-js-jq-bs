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
    
    $('#loadPosts').on('click', function(){
        getPosts('');
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

    async function getUser(userid, target) {
        $(target).empty();
        const data = await $.get(`https://jsonplaceholder.typicode.com/users/${userid}`);
        createUser(data, target);
    }

    function getPosts(target) {
        $.ajax({
            url: 'https://dummyjson.com/posts',
            method: 'GET',
            success: function(data){
                console.log(data);
            }
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
        linkUserPosts.after($('<br>'));

        /*
        transcription en jquery
        */

        const linkUser = $('<a>', {
            'data-userid': element.userId,
            'data-target': target,
            href: '#'
        }).text('Voir l\'auteur');
        linkUser.on('click', event=>{
            event.preventDefault();
            event.stopPropagation();
            getUser(linkUser.data('userid'), target);
        });
        article.append(linkUser);

        $(target).append(article);
    }

    function createUser(user, target){
        /*
        transcrire le JS en JQuery
        */
        const article = $('<article>', {
            class: 'border w-100'
        });
        article.append(parseJsonToList(user));
        $(target).append(article);
    }

    function parseJsonToList(data){
        const ul = $('<ul>');
        if(!data.length){
            data = [data];
        }
        data.map(element=>{
            for(key in element){
                const li = $('<li>');
                const b = $('<b>');
                b.text(`${key} : `);
                li.append(b);
                if('object' !== typeof element[key]){
                    const i = $('<i>');
                    i.text(element[key]);
                    li.append(i);
                }else{
                    li.append(parseJsonToList(element[key]));
                }
                ul.append(li);
            }
        });
        return ul;
    }

});