function Phone(
    _id,
    _name,
    _price,
    _screen,
    _backCamera,
    _frontCamera,
    _image,
    _description,
    _type,
) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.screen = _screen;
    this.backCamera = _backCamera;
    this.frontCamera = _frontCamera;
    this.image = _image;
    this.description = _description;
    this.type = _type;
}

function Cart(_id, _name, _price, _image, _quantity) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.image = _image;
    this.quantity = _quantity;
}
