// UI ELEMENTS

const main = document.querySelector('.main');
const body = document.querySelector('body');
const footer = document.querySelector('footer');
const forms = document.querySelector('.forms');
const footerDate = document.querySelector('.footer__date');

// SECTIONS

const manage = document.querySelectorAll('.manage');
const manageChoose = document.querySelector('.manage__choose');
const manageOrder = document.querySelector('.manage__order');
const manageChange = document.querySelector('.manage__change');
const productTitle = document.querySelector('.manage__product--choose');
const productTitleChange = document.querySelector('.manage__product--change');
const ordersSection = document.querySelectorAll('.manage__orders');
const finishedOrderSection = document.querySelector('.manage__finished');
const orderPlacedAnnouncement = document.querySelector('.placed__announcement');

// REFERENCE ELEMENTS

const checkoutReference = document.querySelector('.checkout__reference');
const referenceQuantity = document.querySelector('.reference__quantity');
const referencePrice = document.querySelector('.reference__price');
const ordersReference = document.querySelector('.orders__reference');

// INPUTS

const quantityInput = document.querySelectorAll('.quantity__input');
const quantityInputChoose = document.querySelector('.quantity__input--choose');
const quantityInputChange = document.querySelector('.quantity__input--change');
const tableSelect = document.querySelector('.table__number--select');

// OUTPUTS

const priceOutput = document.querySelectorAll('.manage__price');
const priceOutputChoose = document.querySelector('.manage__price--choose');
const priceOutputChange = document.querySelector('.manage__price--change');
const totalPriceOutput = document.querySelectorAll('.manage__total--output');
const tableNumberOutput = document.querySelector('.table__number--output');

// BUTTONS

const btnQuantityPlus = document.querySelectorAll('.btn__quantity--plus');
const btnQuantityMinus = document.querySelectorAll('.btn__quantity--minus');
const btnPriceValue = document.querySelector('.btn__price');
const btnAddToOrder = document.querySelector('.manage__btn--add');
const btnChange = document.querySelector('.manage__btn--change');
const btnGoToCheckout = document.querySelector('.manage__btn--checkout');
const btnRemove = document.querySelector('.btn__remove');
const btnDone = document.querySelector('.manage__btn--finished');

// ARROWS

const backArrow = document.querySelectorAll('.manage__icon--back');
const changeBackArrow = document.querySelector('.manage_icon--back-change');

// ORDER PLACED STATEMENT

let orderPlaced = false;

// DATA

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

function YourOrder(title, price, quantity) {
    
    this.selectedProductTitle = title;
    this.selectedProductPrice = price;
    this.selectedProductQuantity = quantity;
}

const yourOrders = [];

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
    
    manage.forEach(function(section) {
        
        section.style.top = `${bodyHeight}px`;

        section.style.display = 'none';

        main.style.display = 'grid';

        footer.style.display = 'block';

        footer.style.height = 'inherit';
        footer.style.visibility = 'visible';
    })
}

closeManageSection();

orderPlacedAnnouncement.style.top = `${bodyHeight}px`;
orderPlacedAnnouncement.style.display = 'none';

// OPERATE SECTIONS

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
    
    displayCheckoutReference();

    if (yourOrders.length > 0 && screen.width < 576) {
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

    main.style.display = 'grid';

    footer.style.display = 'block';

    footer.style.height = 'inherit';
    footer.style.visibility = 'visible';
}

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
let foundOrder;

const activateProductSections = function(currentIndex) {
    
    selectedProduct = products[currentIndex];
        
    foundOrder = yourOrders.find(function(order) {
        return order.selectedProductTitle === selectedProduct.title;
    })

    if (foundOrder) {
        console.log('Już masz to zamówienie w koszyku')
        const foundOrderIndex = yourOrders.findIndex(function(order) {
            return foundOrder.selectedProductTitle === order.selectedProductTitle;
        })

        displayChangeSection(foundOrderIndex);
    } else {
        console.log('pierwszy raz zamawiasz ten produkt')
    }

    quantityInput.forEach(function(input) {
        if (foundOrder) {
            input.value = foundOrder.selectedProductQuantity;
        } else {
            input.value = 1;
            btnQuantityMinus.forEach(function(minusButton) {
                minusButton.classList.add('state--inactive')
            })
        }
    })

    btnQuantityMinus.forEach(function(minusButton) {
        if (foundOrder && quantityInputChange.value > 1) {
            minusButton.classList.remove('state--inactive')
        }
    })

    displayChooseSection(selectedProduct);
}

const productSections = document.querySelectorAll('.product');

productSections.forEach(function(section, ind) {
    
    section.addEventListener('click', function() {

        if (!orderPlaced) {
            activateProductSections(ind) 
        } else {
            withdrawOrderPlacedAnnouncement();

            setTimeout(function() {
                hideOrderPlacedAnnouncement();
            }, 5000);
        }
    })
})

const withdrawOrderPlacedAnnouncement = function() {

    orderPlacedAnnouncement.style.display = 'flex';

    setTimeout(function() {
        orderPlacedAnnouncement.style.top = '20vh';
    }, 1);
}

const hideOrderPlacedAnnouncement = function() {
    
    orderPlacedAnnouncement.style.top = `${bodyHeight}px`;

    setTimeout(function() {
        orderPlacedAnnouncement.style.display = 'none';
    }, 501);
}


// STEP UP BUTTON

btnQuantityPlus.forEach(function(plusButton, ind) {
    
    plusButton.addEventListener('click', function(ev) {
        ev.preventDefault();

        btnQuantityMinus[ind].classList.remove('state--inactive');

        quantityInput.forEach(function(input) {
            input.value++;
            productPrice = input.value * selectedProduct.price;
            productQuantity = Number(input.value);
        })
    
        priceOutput.forEach(function(output) {
            output.textContent = `£${productPrice.toFixed(2)}`;
        })
    
        btnPriceValue.textContent = `£${productPrice.toFixed(2)}`;
    })
})

// STEP DOWN BUTTON 

btnQuantityMinus.forEach(function(minusButton) {

    if (productQuantity === 1) {
        minusButton.classList.add('state--inactve');
    } else {
        minusButton.classList.remove('state-inactive');
    }
    
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

changeBackArrow.addEventListener('click', function() {

    closeManageChangeSection();
    closeManageChooseSection();
    displayCheckoutReference();
});

// ADD TO ORDER

let orderPrice;
let orderQuantity;

const displayTotalPrice = function(orders) {
    orderPrice = orders
        .map(function(order) {
            return Number(order.selectedProductPrice);
        })
        .reduce(function(acc, curr) {
            return acc + curr;
        }, 0)
    .toFixed(2);

    totalPriceOutput.forEach(function(output) {
        output.textContent = `£${orderPrice}`;
    })
}

const updateCheckoutReference = function(orders) {
    
    orderQuantity = orders
        .map(function(order) {
            return order.selectedProductQuantity;
        })
        .reduce(function(acc, curr) {
            return acc + curr;
        }, 0);

    displayTotalPrice(orders);
}

const displayCheckoutReference = function() {

    referenceQuantity.textContent = orderQuantity;
    referencePrice.textContent = `£${orderPrice}`;
    checkoutReference.classList.add('checkout__reference--active');
    footer.style.height = `${checkoutReference.clientHeight}px`;
    footer.style.visibility = 'hidden';
}

const closeCheckoutReference = function() {
    checkoutReference.classList.remove('checkout__reference--active');
}

const displayOrdersReference = function() {
    ordersReference.classList.add('orders__reference--active');
}

btnAddToOrder.addEventListener('click', function(ev) {
    ev.preventDefault();

    const currentOrder = new YourOrder(selectedProduct.title, productPrice.toFixed(2), productQuantity);

    yourOrders.push(currentOrder);

    closeManageChooseSection();

    updateCheckoutReference(yourOrders);

    displayCheckoutReference();

    displayOrders(yourOrders);

    if (screen.width > 576) {
        openManageOrderSection();
    }
})

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

    ordersSection.forEach(function(section) {
        section.innerHTML = '';
        section.insertAdjacentHTML('afterbegin', mappedOrders);
    })

    displayTotalPrice(orders);

    const orderRow = document.querySelectorAll('.order__row');

    orderRow.forEach(function(row, ind) {
        
        row.addEventListener('click', function() {
            displayChangeSection(ind);

            btnQuantityMinus.forEach(function(minusButton) {
                if (minusButton.classList.contains('state--inactive') && quantityInputChange.value > 1) {
                    minusButton.classList.remove('state--inactive')
                }
            })

            if (screen.width > 576) {
                closeManageOrderSection();
            }
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

    changedOrder = yourOrders[ind];

    selectedProduct.price = changedOrder.selectedProductPrice / changedOrder.selectedProductQuantity;

    productTitleChange.textContent = changedOrder.selectedProductTitle;
    priceOutputChange.textContent =`£${changedOrder.selectedProductPrice}`;
    quantityInputChange.value = changedOrder.selectedProductQuantity;

    btnQuantityMinus.forEach(function(minusButton) {
        if (quantityInputChange.value < 2) {
            minusButton.classList.add('state--inactive');
        }
    })
};

// UPDATE ORDER WITH PREVIOUS CHANGES

btnChange.addEventListener('click', function(ev) {
    ev.preventDefault();

    closeManageChangeSection();

    changedOrder.selectedProductPrice = productPrice.toFixed(2);
    changedOrder.selectedProductQuantity = productQuantity;

    updateCheckoutReference(yourOrders);

    displayOrders(yourOrders);
    closeManageSection();
    displayCheckoutReference();

    if (screen.width > 576 && yourOrders.length > 0) {
        openManageOrderSection();
    }
})

btnRemove.addEventListener('click', function(ev) {
    ev.preventDefault();

    const index = yourOrders.findIndex(function(order) {
        return order.selectedProductTitle === changedOrder.selectedProductTitle;
    })

    yourOrders.splice(index, 1);

    if (yourOrders.length > 0) {
        
        closeManageChangeSection();
        displayOrders(yourOrders);
        updateCheckoutReference(yourOrders);

    } else if (yourOrders.length === 0) {
        
        closeManageSection();
    }

    if (screen.width > 576 && yourOrders.length > 0) {
        openManageOrderSection();
    }
})

// DISPLAY FINISHED ORDER

const displayFinishedOrderSection = function() {

    finishedOrderSection.style.top = '0';

    finishedOrderSection.style.display = 'flex';

    main.style.display = 'none';

    footer.style.display = 'none';

    ordersSection.forEach(function(section) {
        section.style.minHeight = '30%';
    })

    tableNumberOutput.textContent = tableSelect.value;
}

btnGoToCheckout.addEventListener('click', function(ev) {
    ev.preventDefault();

    displayFinishedOrderSection();
    if (screen.width > 576) {
        closeManageOrderSection();
    }
})

btnDone.addEventListener('click', function(ev) {

    ev.preventDefault();

    closeManageSection();

    displayOrdersReference();

    activateBackArrow(orderPlaced = true);

    orderPlaced = true;

    this.style.display = 'none';

    if (screen.width > 576) {
        displayFinishedOrderSection();
    }
});

ordersReference.addEventListener('click', function() {

    displayFinishedOrderSection();
    ordersReference.classList.remove('orders__reference--active');
});

// CLOSE MANAGE SECTION

const activateBackArrow = function(placed) {
    
    closeManageSection();
    closeCheckoutReference();

    if (yourOrders.length > 0) {
        
        !placed ? displayCheckoutReference() : displayOrdersReference();
    }
}

backArrow.forEach(function(arrow) {

    arrow.addEventListener('click', function() {
        activateBackArrow(orderPlaced)
    })
});

// FOOTER

let date = new Date;

footerDate.textContent = date.getFullYear();

// DESKTOP VERSION

if (screen.width > 576) {

    // let formHeight = forms.clientHeight;

    // console.log(formHeight)

    // manageChoose.style.top = '0';
    // manageOrder.style.top = `-${formHeight}px`;
    // manageChange.style.top = `-${2*formHeight}px`;
    // finishedOrderSection.style.top = `-${3*formHeight}px`;
}

// Po wciśnięciu remove pojawia się choose. Zrób tak, żeby wszystko się zamknęło. (Mobile)
// Readme
// Refakturyzacja
// consol logi