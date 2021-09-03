const main = document.querySelector('.main');
const btnQuantityPlus = document.querySelectorAll('.btn__quantity--plus');
const quantityInput = document.querySelectorAll('.quantity__input');
const quantityInputChoose = document.querySelector('.quantity__input--choose');
const quantityInputChange = document.querySelector('.quantity__input--change');
const btnQuantityMinus = document.querySelectorAll('.btn__quantity--minus');
const priceOutput = document.querySelectorAll('.manage__price');
const priceOutputChoose = document.querySelector('.manage__price--choose');
const priceOutputChange = document.querySelector('.manage__price--change');
const btnPriceValue = document.querySelector('.btn__price');
const btnAddToOrder = document.querySelector('.manage__btn--add');
const btnChange = document.querySelector('.manage__btn--change');
// const manage = document.querySelector('.manage');
const manageChoose = document.querySelector('.manage__choose');
const manageOrder = document.querySelector('.manage__order');
const manageChange = document.querySelector('.manage__change');
const productTitle = document.querySelector('.manage__product--choose');
const productTitleChange = document.querySelector('.manage__product--change')
const backArrow = document.querySelectorAll('.manage__icon--back');
const changeBackArrow = document.querySelector('.manage_icon--back-change');
const body = document.querySelector('body');
const footer = document.querySelector('footer');

const checkoutReference = document.querySelector('.checkout__reference');
const referenceQuantity = document.querySelector('.reference__quantity');
const referencePrice = document.querySelector('.reference__price');

const ordersSection = document.querySelector('.manage__orders');

const totalPriceOutput = document.querySelector('.manage__total--output');

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

const closeManageChooseSection = function() {

    manageChoose.style.top = `${bodyHeight}px`;

    manageChoose.style.display = 'none';

    main.style.display = 'grid';

    footer.style.display = 'block';
}

const openManageChooseSection = function() {
    
    manageChoose.style.top = '0';

    manageChoose.style.display = 'flex';

    main.style.display = 'none';

    footer.style.display = 'none';
}

const closeManageOrderSection = function() {

    manageOrder.style.top = `${bodyHeight}px`;

    manageOrder.style.display = 'none';

    main.style.display = 'grid';

    footer.style.display = 'block';

    if (yourOrders.length > 0) {
        checkoutReference.classList.add('checkout__reference--active');
    }
}

const openManageOrderSection = function() {
    
    manageOrder.style.top = '0';

    manageOrder.style.display = 'flex';

    main.style.display = 'none';

    footer.style.display = 'none';
}

const openManageChangeSection = function() {

    manageChange.style.top = '0';

    manageChange.style.display = 'flex';

    main.style.display = 'none';

    footer.style.display = 'none';
}

const closeManageChangeSection = function() {
    
    manageChange.style.top = `${bodyHeight}px`;

    manageChange.style.display = 'none';
}

closeManageChooseSection();

// Open for styling
// openManageOrderSection();


// DISPLAY CHOOSE SECTION

let productPrice;
let productQuantity;

const displayChooseSection = function(product) {

    openManageChooseSection();

    if (checkoutReference.classList.contains('checkout__reference--active')) {
        
        checkoutReference.classList.remove('checkout__reference--active');
    }

    productTitle.textContent = product.title;
    
    priceOutputChoose.innerHTML = `£${product.price.toFixed(2)}`;

    priceOutputChoose.textContent = `£${product.price.toFixed(2)}`;

    btnPriceValue.textContent = `£${product.price.toFixed(2)}`;

    productPrice = quantityInputChoose.value * selectedProduct.price;
    productQuantity = Number(quantityInputChoose.value);

    priceOutputChoose.textContent = `£${productPrice.toFixed(2)}`;

    btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
}

// SELECTED PRODUCT

let selectedProduct;

const productSections = document.querySelectorAll('.product');

productSections.forEach(function(section, ind) {
    
    section.addEventListener('click', function() {
        
        selectedProduct = products[ind];

        quantityInput.forEach(function(input) {
            input.value = 1;
        })

        // quantityInputChoose.value = 1;

        btnQuantityMinus.forEach(function(minusButton) {
            minusButton.classList.add('state--inactive');
        })

        displayChooseSection(selectedProduct);
    })
})

// STEP UP BUTTON

btnQuantityPlus.forEach(function(plusButton) {
    
    plusButton.addEventListener('click', function(ev) {
        ev.preventDefault();

        btnQuantityMinus.forEach(function(minusButton) {
            minusButton.classList.remove('state--inactive');
        })

        quantityInput.forEach(function(input) {
            input.value++;
            productPrice = input.value * selectedProduct.price;
            productQuantity = Number(input.value);
        })
        
        // quantityInput.value++;
    
        // productPrice = quantityInput.value * selectedProduct.price;
        // productQuantity = Number(quantityInput.value);
    
        priceOutput.forEach(function(output) {
            output.textContent = `£${productPrice.toFixed(2)}`;
        })
    
        btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
    })
})

// STEP DOWN BUTTON 

btnQuantityMinus.forEach(function(minusButton) {
    
    minusButton.addEventListener('click', function(ev) {
        ev.preventDefault();
    
        quantityInput.forEach(function(input) {
            if (input.value > 1) {
    
                input.value--;
            } 
            
            if (input.value < 2) {
        
                minusButton.classList.add('state--inactive');
            }
    
            productPrice = input.value * selectedProduct.price;
            productQuantity = Number(input.value);
        })
    
        priceOutput.forEach(function(output) {
            output.textContent = `£${productPrice.toFixed(2)}`;
        })
    
        btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
    })
})

// CLOSE MANAGE SECTION

backArrow.forEach(function(arrow) {
    
    arrow.addEventListener('click', closeManageChooseSection);
    arrow.addEventListener('click', closeManageOrderSection);
})

changeBackArrow.addEventListener('click', closeManageChangeSection);

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

    const orderQuantity = yourOrders
        .map(function(order) {
            return order.selectedProductQuantity;
        })
        .reduce(function(acc, curr) {
            return acc + curr;
        }, 0);

    console.log(orderQuantity);

    // const orderPrice = yourOrders.forEach(function(yourOrder) {
    //     console.log(Number(yourOrder.selectedProductPrice)); 
    //     console.log(yourOrder.selectedProductQuantity);
    // });

    const orderPrice = yourOrders
        .map(function(order) {
            return Number(order.selectedProductPrice);
        })
        .reduce(function(acc, curr) {
            return acc + curr;
        }, 0)
        .toFixed(2);
        

    console.log(orderPrice);

    referenceQuantity.textContent = orderQuantity;
    referencePrice.textContent = `£${orderPrice}`;

    closeManageChooseSection();
    checkoutReference.classList.add('checkout__reference--active');
    footer.style.height = `${checkoutReference.clientHeight}px`;
    footer.innerHTML = '';

    displayOrders(yourOrders);

    totalPriceOutput.textContent = `£${orderPrice}`;
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

// const mappedProducts = products.map(function(product) {
//     return `
//             <section class="product product__background--${product.background}">
//                 <p class="product__description">${product.title}</p>
//                 <p class="product__price">£${product.price.toFixed(2)}</p>
//             </section> 
//             `
// }).join('');

// main.insertAdjacentHTML('afterbegin', mappedProducts);

// const displayOrders = function(orders) {
//     orders.map(function(order) {
//         return `
//             <div class="order__row">
//                 <output class="order__row--quantity">${order.selectedProductQuantity}</output>
//                 <output class="order__row--title">${order.selectedProductTitle}</output>
//                 <output class="order__row--price">£${order.selectedProductPrice}</output>
//             </div>
//         `
//     })

//     ordersSection.insertAdjacentHTML('afterbegin', orders);
// }

// displayOrders(yourOrders);

// let selectedOrder;

const displayOrders = function(orders) {
    const mappedOrders = orders.map(function(order) {
        return `
            <div class="order__row">
                <output class="order__row--quantity">${order.selectedProductQuantity}</output>
                <output class="order__row--title">${order.selectedProductTitle}</output>
                <output class="order__row--price">£${order.selectedProductPrice}</output>
            </div>
        `
    }).join('');

    ordersSection.innerHTML = '';
    
    ordersSection.insertAdjacentHTML('afterbegin', mappedOrders);

    const orderRow = document.querySelectorAll('.order__row');

    orderRow.forEach(function(row, ind) {
        
        row.addEventListener('click', function() {
            displayChangeSection(ind);

            btnQuantityMinus.forEach(function(minusButton) {
                if (minusButton.classList.contains('state--inactive') && quantityInputChange.value > 1) {
                    minusButton.classList.remove('state--inactive')
                }
            })
        });
            
    });
};

// GO TO CHECKOUT

checkoutReference.addEventListener('click', function() {

    openManageOrderSection();

    checkoutReference.classList.remove('checkout__reference--active');
})

// CHANGE QUANTITY OR REMOVE

let changedOrder;

const displayChangeSection = function(ind) {
    
    openManageChangeSection(ind);

    selectedProduct.price = yourOrders[ind].selectedProductPrice / yourOrders[ind].selectedProductQuantity;
    console.log(ind)
    console.log(yourOrders[ind].selectedProductTitle)
    console.log(yourOrders[ind].selectedProductPrice)
    console.log(yourOrders[ind].selectedProductQuantity)
    console.log(selectedProduct.price)

    productTitleChange.textContent = yourOrders[ind].selectedProductTitle;
    priceOutputChange.textContent =`£${yourOrders[ind].selectedProductPrice}`;
    quantityInputChange.value = yourOrders[ind].selectedProductQuantity;

    btnQuantityMinus.forEach(function(minusButton) {
        if (quantityInputChange.value < 2) {
            minusButton.classList.add('state--inactive');
        }
    })

    changedOrder = yourOrders[ind];
};

btnChange.addEventListener('click', function(ev) {
    ev.preventDefault();

    closeManageChangeSection();

    // tu skończyłam (update Order form with provided changes)
    console.log(changedOrder)
})




