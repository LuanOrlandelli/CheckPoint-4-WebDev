let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];
let spinner = document.getElementById('spinner');
let filterSelect = document.getElementById('filter');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';

    if (products.length > 0) {
        let selectedCategory = filterSelect.value;
        let filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

        filteredProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addCart">Comprar</button>`;
            
            addRemoveButton(newProduct, product.id);
            listProductHTML.appendChild(newProduct);
        });
    }
};



filterSelect.addEventListener('change', () => {
    addDataToHTML();
});

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            if (positionProduct !== -1) {
                let info = products[positionProduct];
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}" alt="${info.name}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(newItem);
            } else {
                console.error(`Produto com ID ${item.product_id} não encontrado.`);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
};


listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        if (type === 'plus') {
            cart[positionItemInCart].quantity += 1;
        } else {
            let newQuantity = cart[positionItemInCart].quantity - 1;
            if (newQuantity > 0) {
                cart[positionItemInCart].quantity = newQuantity;
            } else {
                cart.splice(positionItemInCart, 1);
            }
        }
        addCartToHTML();
        addCartToMemory();
    }
};

const checkOut = () => {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           
            resolve('Compra finalizada com sucesso!');
        }, 2000);
    });
};

const handleCheckout = async () => {
    if (cart.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }
    
    try {
        spinner.style.display = 'block'; 
        let message = await checkOut();
        alert(message);
        cart = []; 
        addCartToHTML();
        addCartToMemory();
    } catch (error) {
        alert(error);
    } finally {
        spinner.style.display = 'none'; 
    }
};

document.querySelector('.checkOut').addEventListener('click', handleCheckout);


const initApp = async () => {
    spinner.style.display = 'block'; 

    try {
        let storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            let response = await fetch('products.json');
            products = await response.json();
        }
        addDataToHTML();

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    } finally {
        spinner.style.display = 'none'; 
    }
};

document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productImage = document.getElementById('productImage').value;
    const productCategory = document.getElementById('productCategory').value;

    if (!productName || isNaN(productPrice) || !productImage || !productCategory) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (productId) {
        
        const index = products.findIndex(product => product.id == productId);
        if (index > -1) {
            products[index] = { id: productId, name: productName, price: productPrice, image: productImage, category: productCategory };
        }
    } else {
        
        const newProduct = {
            id: Date.now(), 
            name: productName,
            price: productPrice.toFixed(2),
            image: productImage,
            category: productCategory
        };
        products.push(newProduct);
    }

    updateProducts(); 
    saveProducts(); 

    
    document.getElementById('productForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();

});

const updateProducts = () => {
    addDataToHTML();
};

const saveProducts = () => {
    localStorage.setItem('products', JSON.stringify(products));
};


const openEditModal = (product) => {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productCategory').value = product.category;

    new bootstrap.Modal(document.getElementById('productModal')).show();
};


document.querySelector('.add-product').addEventListener('click', () => {
    document.getElementById('productId').value = '';
    document.getElementById('productForm').reset();
    new bootstrap.Modal(document.getElementById('productModal')).show();
});
const addRemoveButton = (productElement, productId) => {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.classList.add('removeProduct');
    removeButton.addEventListener('click', () => {
        removeProduct(productId);
    });
    productElement.appendChild(removeButton);
};

const removeProduct = (productId) => {
    products = products.filter(product => product.id != productId);
    updateProducts();
    saveProducts();
};



initApp();
