function renderUI(data) {
    var content = "";

    for (var i = 0; i < data.length; i++) {
        const phone = data[i];
        content += `<tr>
                        <td>${i + 1}</td>
                        <td>${phone.name}</td>
                        <td>$${phone.price}</td>
                        <td>
                            <img src="${phone.image}" width="70px"/>
                        </td>
                        <td>${phone.description}</td>
                        <td>
                        <button class="btn btn-primary" data-toggle="modal"
                        data-target="#myModal" onclick ="handleEdit('${
                            phone.id
                        }')"> Edit </button>
                            <button class="btn btn-danger" onclick ="deleteProduct('${
                                phone.id
                            }')"> Delete </button>
                        </td>
                    </tr>`;
    }
    getEle("tblDanhSachSP").innerHTML = content;
}

function renderAddModal() {
    const modal = document.querySelector(".modal-footer");
    modal.innerHTML = `<button
                            type="button"
                            id="closeModal"
                            class="btn btn-secondary"
                            data-dismiss="modal">
                            Close
                        </button>
                        <button id="addPhone" type="button" class="btn btn-success">
                            Add Phone
                        </button>`;
}

function setError(element, message) {
    element.className = "form-control is-invalid";
    element.nextElementSibling.innerText = message;
    element.nextElementSibling.className = "invalid-feedback";
}

function setSuccess(element) {
    element.className = "form-control is-valid";
    element.nextElementSibling.innerText = "";
    element.nextElementSibling.className = "valid-feedback";
}

function setNormal(element) {
    element.className = "form-control";
    element.nextElementSibling.innerText = "";
    element.nextElementSibling.className = "";
}

function resetForm() {
    nameProduct.value = "";
    price.value = "";
    screen.value = "";
    backCamera.value = "";
    frontCamera.value = "";
    image.value = "";
    description.value = "";
    type.value = "";
    const listInputElement = document.querySelectorAll(".modal-body input");
    const selectElement = document.querySelector("#type");
    listInputElement.forEach((inputElement) => {
        setNormal(inputElement);
    });
    setNormal(selectElement);
}
