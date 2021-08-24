const main = document.querySelector('.main');
const btnQuantityPlus = document.querySelector('.btn__quantity--plus');
const quantityInput = document.querySelector('.quantity__input');
const btnQuantityMinus = document.querySelector('.btn__quantity--minus');

// PRODUCTS

const products = [
    {
        title: 'Strawberry, Banana & Mint',
        price: '5.95',
        background: 'pink'
    },
    {
        title: 'Coconut cream, Avocado & Mint',
        price: '6.50',
        background: 'mint'
    },
    {
        title: 'Cucumber, Mint & Avocado',
        price: '6.50',
        background: 'green'
    },
    {
        title: 'Kiwi, Banana & Spinach',
        price: '4.95',
        background: 'blue'
    },
    {
        title: 'Blueberries, Banana & Spinach',
        price: '4.50',
        background: 'purple'
    },
    {
        title: 'Yoghurt, Pineapple & Orange',
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

// STEP UP BUTTON

btnQuantityPlus.addEventListener('click', function(ev) {
    ev.preventDefault();

    btnQuantityMinus.classList.remove('state--inactive');
    quantityInput.value++;
})

// STEP DOWN BUTTON 

btnQuantityMinus.addEventListener('click', function(ev) {
    ev.preventDefault();

    if (quantityInput.value > 1) {

        quantityInput.value--;
    } else {

        this.classList.add('state--inactive');
    }
})


