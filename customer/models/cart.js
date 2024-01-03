function Cart() {
    this.listCartItem;

    this.addCartItem = (data) => {
        this.listCartItem.push(data);
    };

    this.find = (id) => {
        return this.listCartItem.findIndex((cartItem) => cartItem.id === id);
    };

    this.removeCartItem = (id) => {
        this.listCartItem = this.listCartItem.filter(
            (cartItem) => cartItem.id === id,
        );
    };
}
