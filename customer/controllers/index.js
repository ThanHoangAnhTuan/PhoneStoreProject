const api = new Api();
const cart = new CART();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function getListProduct() {
    const promise = api.getListProduct();

    promise
        .then(function (result) {
            console.log("result", result.data);
            renderUI(result.data);
        })
        .catch(function (error) {
            console.log("error", error);
        });
}

getListProduct();

function layThongTinCartItem() {
    const _name = getEle("phoneName").value;
    const _price = getEle("phonePrice").value;
    const _image = getEle("phoneImage").value;
    var _quality = 1;

    const cartItem = new CartItem(_name, _price, _image, _quality);

    return cartItem;
}

function renderUI(data) {
    console.log(data);
    var content = "";
    for (var i = 0; i < data.length; i++) {
        const product = data[i];
        content += `
        <div class="col-12 col-md-6 col-lg-4">
                    <div class="card cardPhone">
                        <img id="phoneImage" src="${product.image}" class="card-img-top" alt="phone Image">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h3 id="phoneName" class="cardPhone__title">${product.name}</h3>
                                    <p class="cardPhone__text">${product.description}</p>
                                </div>
                                <div>
                                    <h3 id="phonePrice" class="cardPhone__title">${product.price}$</h3>
                                </div>
                            </div>
                            <div>
                        <p class="spec">Screen : ${product.screen}</p>
                        <p class="spec">Back Camera : ${product.backCamera}</p>
                        <p class="spec">Front Camera : ${product.frontCamera}</p>
                    </div>
                            <div class="d-flex justify-content-between">
                                <div class="cardPhone__rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div>
                                    <button id="btnAdd" onclick="handleAddCart()" class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i> Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }
    document.getElementById("productList").innerHTML = content;
}

function renderUICart(data) {
    console.log(data);
    var content = "";
    for (var i = 0; i < data.length; i++) {
        const product = data[i];
        content += `
        <tr>
            <td>${i}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.image}</td>
            <td>1</td>
            <td>
                <button class="btn btn-info" onclick="handleEdit('${product.id}')">Edit</button>
                <button class="btn btn-danger" onclick="handleDelete('${product.id}')">delete</button>
            </td>
        </tr>`;
    }

    document.getElementById("tbodyCartItem").innerHTML = content;
}

function handleAddCart() {
    const cartItem = layThongTinCartItem();
    cart.addCart(cartItem);
    renderUICart(cart.arr);
    setLocalStorage();
}

function setLocalStorage() {
    const dataString = JSON.stringify(cart.arr);
    localStorage.setItem("CART", dataString);
}

function getLocalStorage() {
    const dataString = localStorage.getItem("CART");

    if (dataString) {
        const dataJson = JSON.parse(dataString);
        cart.arr = dataJson;
        renderUICart(cart.arr);
    }
}
