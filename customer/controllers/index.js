const api = new Api();
let cart = new Cart();
let listProduct = [];

cart.listCartItem = JSON.parse(localStorage.getItem("cart"));
if (cart.listCartItem) {
    renderCart(cart.listCartItem);
}

const start = async () => {
    const responsive = await api.getListProduct();
    const data = responsive.data;
    listProduct = data;
    renderUI(listProduct);
};

start();

const handleAddCart = (id) => {
    const fintCartItem = cart.listCartItem.find(
        (cartItem) => Number(cartItem.id) === id,
    );
    if (fintCartItem) {
        fintCartItem.quantity++;
    } else {
        const product = listProduct.find(
            (product) => Number(product.id) === id,
        );
        const cartItem = new CartItem(
            product.id,
            product.name,
            product.price,
            product.image,
            1,
        );
        cart.addCartItem(cartItem);
    }

    renderCart(cart.listCartItem);
    localStorage.setItem("cart", JSON.stringify(cart.listCartItem));
};

const minusQuantity = (id) => {
    const fintCartItem = cart.listCartItem.find(
        (cartItem) => Number(cartItem.id) === id,
    );

    if (fintCartItem.quantity > 1) {
        fintCartItem.quantity--;
        renderCart(cart.listCartItem);
        localStorage.setItem("cart", JSON.stringify(cart.listCartItem));
    }
};

const addQuantity = (id) => {
    const fintCartItem = cart.listCartItem.find(
        (cartItem) => Number(cartItem.id) === id,
    );

    fintCartItem.quantity++;
    renderCart(cart.listCartItem);
    localStorage.setItem("cart", JSON.stringify(cart.listCartItem));
};

const removeCartItem = (id) => {
    cart.listCartItem = cart.listCartItem.filter(
        (cartItem) => Number(cartItem.id) !== id,
    );
    renderCart(cart.listCartItem);
    localStorage.setItem("cart", JSON.stringify(cart.listCartItem));
};

const removeCart = () => {
    cart.listCartItem = [];
    renderCart(cart.listCartItem);
    localStorage.setItem("cart", JSON.stringify(cart.listCartItem));
};

const payNow = () => {
    removeCart();
    alert("Buy Success");
};

const phoneSelect = document.querySelector("#phoneSelect");
phoneSelect.addEventListener("change", () => {
    if (phoneSelect.value === "all") {
        renderUI(listProduct);
    } else {
        const filterPhoneSelect = listProduct.filter(
            (product) => product.type === phoneSelect.value,
        );
        renderUI(filterPhoneSelect);
    }
});
