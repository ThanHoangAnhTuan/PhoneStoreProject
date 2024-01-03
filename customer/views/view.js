const renderUI = (data) => {
    const productList = document.querySelector("#productList");
    const htmls = data.map((product) => {
        return `
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <div class="card cardPhone">
                    <img
                        id="phoneImage"
                        src="${product.image}"
                        class="card-img-top"
                        alt="phone Image" />
                    <div class="card-body">
                        <h3 id="phoneName" class="cardPhone__title">
                            ${product.name}
                        </h3>
                        <h3 id="phonePrice" class="cardPhone__title">
                            $${product.price}
                        </h3>
                        <p class="cardPhone__text">
                            ${product.description}
                        </p>
                        <div>
                            <p class="spec">
                                Screen: ${product.screen}
                            </p>
                            <p class="spec">
                                Back Camera: ${product.backCamera}
                            </p>
                            <p class="spec">Front Camera: ${product.frontCamera}</p>
                        </div>
                        <div
                            class="d-flex justify-content-between align-items-center">
                            <div class="cardPhone__rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <div>
                                <button
                                    id="btnAdd"
                                    onclick="handleAddCart(${product.id})"
                                    class="btnPhone-shadow">
                                    <i class="fa fa-shopping-cart"></i>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    productList.innerHTML = htmls.join("");
};

const renderCart = (data) => {
    const tableCartItem = document.querySelector(".table tbody");
    const htmls = data.map((product) => {
        return `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>
                    <img
                        style="object-fit: contain"
                        src="${product.image}"
                        width="50px"
                        height="50px" />
                </td>
                <td>
                    <button class="btn btn-primary" onclick="minusQuantity(${product.id})">
                        -
                    </button>
                    <input
                        class="inputNumber"
                        type="number"
                        min="1"
                        value="${product.quantity}" />
                    <button class="btn btn-primary" onclick="addQuantity(${product.id})">
                        +
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="removeCartItem(${product.id})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });
    tableCartItem.innerHTML = htmls.join("");
    renderTotal(data);
};

const renderTotal = (data) => {
    const totalCart = document.querySelector(".totalCart");
    const total = data.reduce((total, current) => {
        return total + Number(current.price) * Number(current.quantity);
    }, 0);
    totalCart.innerHTML = `Total: $${total}`;
};
