const main = document.querySelector('main');

main.innerHTML = '';

// PRODUCTS

const products = [
    {
        title: 'Strawberry, Banana & Mint',
        price: '5.95',
        background: 'pink'
    },
    {
        title: 'Coconut cream, Mint & Avocado',
        price: '6.50',
        background: 'mint'
    },
    {
        title: 'Cucamber, Mint & Avocado',
        price: '6.50',
        background: 'green'
    },
    {
        title: 'Kiwi, Banana, Spinach',
        price: '4.95',
        background: 'blue'
    },
    {
        title: 'Blueberries, Spinach & Banana',
        price: '4.50',
        background: 'purple'
    },
    {
        title: 'Yoghurt, Pineaple & Orange',
        price: '4.45',
        background: 'yellow'
    }
]

const mappedProducts = products.map(function(product) {
    return `
            <section class="product product__background--${product.background}">
                <p class="product__description">${product.title}</p>
                <p class="product__price">£${product.price}</p>
            </section> 
            `
}).join('');

main.insertAdjacentHTML('afterbegin', mappedProducts);








