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

    function erase_childs(node){        
        if(node.childNodes){
            let childs = node.childNodes;
            
            while(childs.length > 0){                
                node.removeChild(node.lastChild);
            }
        }
    }

    async function charger(target) {
        erase_childs(document.getElementById(target));
        const reponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await reponse.json();
        data.map(article=>{
            createArticle(article, target);
        });
    }

    async function getUser(userId, target){
        erase_childs(document.getElementById(target));
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await reponse.json();
        createUser(data, target);
    }

    function createUser(user, target){
        const article = document.createElement('article');
        article.classList.add('border');
        for(const key in user){
            if('object' !== typeof user[key]){
                const p = document.createElement('p');
                p.innerHTML = `<b>${key}</b> : ${user[key]}`;
                article.append(p);
            }
        }
        document.getElementById(target).append(article);
    }

    async function userPosts(userid, target) {
        erase_childs(document.getElementById(target));
        const reponse = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${userid}`);
        const data = await reponse.json();
        data.map(article=>{
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
        linkUserPosts.setAttribute('data-userid', element.userId);
        linkUserPosts.setAttribute('data-target', target);
        linkUserPosts.setAttribute('href', '#');
        linkUserPosts.append(document.createTextNode('Du même auteur'));
        linkUserPosts.addEventListener('click', event=>{
            event.preventDefault();
            userPosts(linkUserPosts.dataset.userid, target);
        });
        article.append(linkUserPosts);
        

        /*
        créer un lien "voir l'auteur"
        data-userid element.userid
        data-target target
        au clic, créer une fiche auteur et l'afficher à la place de la liste des articles
        getUser(userId, target)
        https://jsonplaceholder.typicode.com/users/1
        createUser(user, target) similaire à createArticle
        */

        const linkUser = document.createElement('a');
        linkUser.setAttribute('data-userid', element.userId);
        linkUser.setAttribute('data-target', target);
        linkUser.setAttribute('href', '#');
        linkUser.append(document.createTextNode('Voir l\'auteur'));
        linkUser.addEventListener('click', event=>{
            event.preventDefault();
            getUser(linkUser.dataset.userid, target);
        });
        article.append(document.createElement('br'));
        article.append(linkUser);
        document.getElementById(target).append(article);

    }



});