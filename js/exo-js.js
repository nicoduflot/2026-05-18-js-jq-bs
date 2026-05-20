function erase_childs(node){        
    if(node.childNodes){
        let childs = node.childNodes;
        
        while(childs.length > 0){                
            node.removeChild(node.lastChild);
        }
    }
}

async function getProducts(target){
    const reponse = await fetch('https://dummyjson.com/products');
    const data = await reponse.json()
    console.log(data);
    console.log(data.products);
    createCatalog(data.products, target);
}

async function getProduct(pid, target){
    const reponse = await fetch(`https://dummyjson.com/products/${pid}`);
    const data = await reponse.json()
    console.log(data);
    createProduct(data, target);
}

document.getElementById('products').addEventListener('click', ()=>{
    getProducts('catalog');
});

function createCatalog(products, target){
    erase_childs(document.getElementById(target));
    products.map(product=>{
        const article = document.createElement('article');
        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        h3.append(document.createTextNode(product.title));
        const description = document.createElement('p');
        description.append(document.createTextNode(product.description));
        const price = document.createElement('p');
        const divImg = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', product.thumbnail);
        img.classList.add('vignette');
        price.append(document.createTextNode(`${product.price} €`));
        const showproduct = document.createElement('button');
        showproduct.classList.add('btn', 'btn-ok');
        showproduct.append(document.createTextNode('Voir plus'));
        showproduct.setAttribute('data-pid', product.id);
        showproduct.addEventListener('click', ()=>{
            getProduct(showproduct.dataset.pid, target);
        });
        article.append(header);
        header.append(h3);
        article.append(description);
        article.append(divImg);
        divImg.append(img);
        article.append(price);
        article.append(showproduct);
        document.getElementById(target).append(article);
    });
}

function createProduct(product, target){
    erase_childs(document.getElementById(target));
    const article = document.createElement('article');
    article.classList.add('w-100');
    const header = document.createElement('header');
    const h3 = document.createElement('h3');
    h3.append(document.createTextNode(product.title));
    const description = document.createElement('p');
    description.append(document.createTextNode(product.description));
    const price = document.createElement('p');
    price.append(document.createTextNode(`${product.price} €`));
    const galerie = document.createElement('div');
    galerie.classList.add('galerie');
    product.images.map(img=>{
        const imgProduct = document.createElement('img');
        imgProduct.setAttribute('src', img);
        imgProduct.classList.add('vignette-200');
        galerie.append(imgProduct);
    });
    article.append(header);
    header.append(h3);
    article.append(description);
    article.append(galerie);
    article.append(price);
    document.getElementById(target).append(article);
}