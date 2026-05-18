window.addEventListener('DOMContentLoaded', function(){

    document.getElementById('welcomeButton').addEventListener('click', ()=>{
        alert('Bienvenue !');
    });

    function afficheInfo(){
        document.getElementById('last-info').classList.toggle('hidden');
    }

    document.getElementById('info').addEventListener('click', () => {
        afficheInfo();
    });
    
    document.getElementById('close-info').addEventListener('click', () => {
        afficheInfo();
    });


    async function charger(target) {
        const reponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        /*console.log(reponse);*/
        const data = await reponse.json();
        /*console.log(data);*/
        data.map(article=>{
            console.log(article);
            createArticle(article, target);
        });
    }

    document.getElementById('loadArticles').addEventListener('click', ()=>{
        charger('articles');
    });

    function createArticle(element, target){
        const article = document.createElement('article');
        const header = document.createElement('header');
        const h2 = document.createElement('h2');
        const content = document.createElement('p');
        const linkUserPosts = document.createElement('a');
        article.classList.add('border');
        h2.append(document.createTextNode(element.title));
        header.append(h2);
        article.append(header);
        content.append(document.createTextNode(element.body));
        article.append(content);
        linkUserPosts.setAttribute('data-userId', element.userId);
        linkUserPosts.setAttribute('data-target', target);
        linkUserPosts.setAttribute('href', '#');
        linkUserPosts.append(document.createTextNode('Du même auteur'));

        article.append(linkUserPosts);
        document.getElementById(target).append(article);
    }

});