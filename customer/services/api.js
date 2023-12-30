function Api() {
    this.getListProduct = function () {
        return axios({
            method: "get",
            url: "https://657c7fff853beeefdb998ca8.mockapi.io/products",
        });
    };

    this.postPhone = function (data) {
        return axios({
            method: "post",
            url: "https://657c7fff853beeefdb998ca8.mockapi.io/products",
            data: data,
        });
    };

    this.putPhone = function (data, id) {
        return axios({
            method: "put",
            url: `https://657c7fff853beeefdb998ca8.mockapi.io/products/${id}`,
            data: data,
        });
    };

    this.deletePhone = function (id) {
        return axios({
            method: "delete",
            url: `https://657c7fff853beeefdb998ca8.mockapi.io/products/${id}`,
        });
    };
}
