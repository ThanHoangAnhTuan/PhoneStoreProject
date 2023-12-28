function CART() {
    this.cart = [];

    this.addCart = function(item) {
        this.cart.push(item);
    };
}