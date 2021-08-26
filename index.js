const main = document.querySelector('.main');
const btnQuantityPlus = document.querySelector('.btn__quantity--plus');
const quantityInput = document.querySelector('.quantity__input');
const btnQuantityMinus = document.querySelector('.btn__quantity--minus');
const priceOutput = document.querySelector('.manage__price');
const btnPriceValue = document.querySelector('.btn__price');
const btnAddToOrder = document.querySelector('.manage__btn--add');
const manageForm = document.querySelector('.manage');
const productTitle = document.querySelector('.manage__product');
const backArrow = document.querySelector('.manage__title--icon');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

const checkoutReference = document.querySelector('.checkout__reference');
const referenceQuantity = document.querySelector('.reference__quantity');
const referencePrice = document.querySelector('.reference__price');

// PRODUCTS

const products = [
    {
        title: 'Strawberry, Banana & Mint',
        price: 5.90,
        background: 'pink'
    },
    {
        title: 'Coconut cream, Avocado & Mint',
        price: 6.50,
        background: 'mint'
    },
    {
        title: 'Cucumber, Mint & Avocado',
        price: 6.50,
        background: 'green'
    },
    {
        title: 'Kiwi, Banana & Spinach',
        price: 4.95,
        background: 'blue'
    },
    {
        title: 'Blueberries, Banana & Spinach',
        price: 4.50,
        background: 'purple'
    },
    {
        title: 'Yoghurt, Pineapple & Orange',
        price: 4.45,
        background: 'yellow'
    }
]

// UI START

const mappedProducts = products.map(function(product) {
    return `
            <section class="product product__background--${product.background}">
                <p class="product__description">${product.title}</p>
                <p class="product__price">£${product.price.toFixed(2)}</p>
            </section> 
            `
}).join('');

main.insertAdjacentHTML('afterbegin', mappedProducts);

let bodyHeight = body.clientHeight;

const closeManageSection = function() {

    manageForm.style.top = `${bodyHeight}px`;

    manageForm.style.display = 'none';

    main.style.display = 'grid';

    footer.style.display = 'block';
}

const openManageSection = function() {
    
    manageForm.style.top = '0';

    manageForm.style.display = 'flex';

    main.style.display = 'none';

    footer.style.display = 'none';
}

closeManageSection();


// DISPLAY CHOOSE SECTION

let productPrice;
let productQuantity;

const displayChooseSection = function(product) {

    openManageSection();

    if (checkoutReference.classList.contains('checkout__reference--active')) {
        
        checkoutReference.classList.remove('checkout__reference--active');
    }

    productTitle.textContent = product.title;
    
    priceOutput.innerHTML = `£${product.price.toFixed(2)}`;

    priceOutput.textContent = `£${product.price.toFixed(2)}`;

    btnPriceValue.textContent = `£${product.price.toFixed(2)}`;

    productPrice = quantityInput.value * selectedProduct.price;
    productQuantity = Number(quantityInput.value);

    priceOutput.textContent = `£${productPrice.toFixed(2)}`;

    btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
}

// SELECTED PRODUCT

let selectedProduct;

const productSections = document.querySelectorAll('.product');

productSections.forEach(function(section, ind) {
    
    section.addEventListener('click', function() {
        
        selectedProduct = products[ind];

        displayChooseSection(selectedProduct);
    })
})

// STEP UP BUTTON

btnQuantityPlus.addEventListener('click', function(ev) {
    ev.preventDefault();

    btnQuantityMinus.classList.remove('state--inactive');
    quantityInput.value++;

    productPrice = quantityInput.value * selectedProduct.price;
    productQuantity = Number(quantityInput.value);

    priceOutput.textContent = `£${productPrice.toFixed(2)}`;

    btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
})

// STEP DOWN BUTTON 

btnQuantityMinus.addEventListener('click', function(ev) {
    ev.preventDefault();

    if (quantityInput.value > 1) {

        quantityInput.value--;
    } 
    
    if (quantityInput.value < 2) {

        this.classList.add('state--inactive');
    }

    productPrice = quantityInput.value * selectedProduct.price;
    productQuantity = Number(quantityInput.value);

    priceOutput.textContent = `£${productPrice.toFixed(2)}`;

    btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
})

// CLOSE MANAGE SECTION

backArrow.addEventListener('click', closeManageSection);

// ADD TO ORDER

btnAddToOrder.addEventListener('click', function(ev) {
    ev.preventDefault();

    // console.log(selectedProduct.title);
    // console.log(productQuantity);
    // console.log(productPrice.toFixed(2));

    // yourOrderProducts.push(selectedProduct.title);
    // yourOrderPrices.push(productPrice.toFixed(2));
    // yourOrderQuantities.push(productQuantity);

    // console.log(yourOrderProducts);
    // console.log(yourOrderPrices);
    // console.log(yourOrderQuantities);

    const currentOrder = new YourOrder(selectedProduct.title, productPrice.toFixed(2), productQuantity);

    yourOrders.push(currentOrder);
    console.log(yourOrders);

    console.log(yourOrders[0].selectedProductQuantity);

    const orderQuantity = yourOrders.map(function(order) {
        return order.selectedProductQuantity;
    });

    console.log(orderQuantity);

    // Tu skończyłam

    referenceQuantity.textContent = productQuantity;
    referencePrice.textContent = `£${productPrice.toFixed(2)}`;

    closeManageSection();
    checkoutReference.classList.add('checkout__reference--active');
    footer.style.height = `${checkoutReference.clientHeight}px`;
    footer.innerHTML = '';
})

// GO TO CHECKOUT

checkoutReference.addEventListener('click', function() {

    
})

// YOUR ORDER 

// const yourOrderProducts = [];
// const yourOrderPrices = [];
// const yourOrderQuantities = [];

// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
// }

// const myFather = new Person("John", "Doe", 50, "blue");
// const myMother = new Person("Sally", "Rally", 48, "green");

function YourOrder(title, price, quantity) {
    this.selectedProductTitle = title;
    this.selectedProductPrice = price;
    this.selectedProductQuantity = quantity;
}

const yourOrders = [];


