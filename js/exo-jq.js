async function getProducts(target){
    const data = await $.get('https://dummyjson.com/products');
    console.log(data.products);
    createCatalog(data.products, target);
}

async function getProduct(pid, target) {
    const data = await $.get(`https://dummyjson.com/products/${pid}`);
    console.log(data);
    createProduct(data, target);
}

$('#products').on('click', ()=>{
    getProducts('#catalog');
});

function createCatalog(products, target){
    $(target).empty();
    products.map(product=>{
        const article = $('<article>', {
            class: 'border'
        });
        const header = $('<header>');
        const h3 = $('<h3>').text(product.title);
        const description = $('<p>').text(product.description);
        const price = $('<p>').text(`${product.price} €`);
        const divImg = $('<div>');
        const img = $('<img>',{
            src:product.thumbnail,
            class: 'vignette'
        });
        const showproduct = $('<button>', {
            class: 'btn btn-ok',
            'data-id': product.id
        }).text('Voir plus').on('click', ()=>{
            getProduct(product.id, target);
        });
        article.append(header.append(h3), description, divImg.append(img), price, showproduct);
        $(target).append(article);
    });
}

function createProduct(product, target){
    $(target).empty();
    const article = $('<article>',{
        class: 'w-100'
    });
    const header = $('<header>');
    const h3 = $('<h3>').text(product.title);
    const description = $('<p>').text(product.description);
    const price = $('<p>').text(`${product.price} €`);
    const galerie = $('<div>', {
        class: 'galerie'
    });
    
    product.images.map(img=>{
        const imgProduct = $('<img>', {
            src: img,
            class: 'vignette-200'
        });
        galerie.append(imgProduct);
    });
    article.append(header.append(h3), description, galerie, price);
    $(target).append(article);
}