const nameProduct = document.querySelector("#name");
const price = document.querySelector("#price");
const screen = document.querySelector("#screen");
const backCamera = document.querySelector("#backCamera");
const frontCamera = document.querySelector("#frontCamera");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const type = document.querySelector("#type");

const api = new Api();

function getEle(id) {
  return document.getElementById(id);
}


function getListProducts() {
  api
    .getListProduct()
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProducts();

//delete phone
function deleteProduct(id) {
  api
    .deletePhone(id)
    .then(function (result) {
      //show infor
      alert("Delete Success!");
      //re-fetch data
      getListProducts();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//addphone
function addPhone() {
  const phoneName = nameProduct.value;
  const phonePrice = price.value;
  const phoneScreen = screen.value;
  const phoneBackCam = backCamera.value;
  const phoneFrontCam = frontCamera.value;
  const phoneImgLink = image.value;
  const phoneDes = description.value;
  const phoneType = type.value;

  const phone = new Phone(
    "",
    phoneName,
    phonePrice,
    phoneScreen,
    phoneBackCam,
    phoneFrontCam,
    phoneImgLink,
    phoneDes,
    phoneType
  );
  api.postPhone(phone)
  .then(function(result){
    // alert("Add success!!!");
    const closeModalAdd = document.getElementById("closeModal");
    closeModalAdd.click();
  //re-fetch data
  getListProducts();
  })
  .catch(function(error){
    console.log(error);
  })
}


//edit phone
function handleEdit(id){
  // update tittle model
document.getElementsByClassName("modal-title")[0].innerHTML = "Update Product";
//add close 
const btnClose = `<button class="btn btn-secondary" id="closeUpdate" data-dismiss="modal">Close</button>`;
//add buttom "add product" => footer modal
const btnUpdate =`<button class="btn btn-primary" onclick="updateProduct(${id})">Update Product</button>`;
// document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;


document.getElementsByClassName("modal-footer")[0].innerHTML =btnClose + btnUpdate  ;
// modalFooter.innerHTML = modalFooter.innerHTML + btnUpdate + btnClose;

api.getProduct(id)
    .then(function(result) {
      const phone = result.data;
      getEle("name").value = phone.name;
      getEle("price").value = phone.price;
      getEle("screen").value = phone.screen;
      getEle("backCamera").value = phone.backCamera;
      getEle("frontCamera").value = phone.frontCamera;
      getEle("image").value = phone.image;
      getEle("description").value = phone.description;
      getEle("type").value = phone.type;
      

})
.catch(function(error){
  console.log(error);
})
}


//Update Phone
function updateProduct(id) {
  const phoneName = nameProduct.value;
  const phonePrice = price.value;
  const phoneScreen = screen.value;
  const phoneBackCam = backCamera.value;
  const phoneFrontCam = frontCamera.value;
  const phoneImgLink = image.value;
  const phoneDes = description.value;
  const phoneType = type.value;

  const phone = new Phone(
    "",
    phoneName,
    phonePrice,
    phoneScreen,
    phoneBackCam,
    phoneFrontCam,
    phoneImgLink,
    phoneDes,
    phoneType
  );

  api.putPhone(phone,id)
  .then(function(result){
    alert("Update success!!!");
    const closeModalButton = document.getElementById("closeUpdate");
    closeModalButton.click();
    getListProducts();
    resetForm();
  })
  .catch(function(error){
    console.log(error);
  })
  
}


const openAddModalButton = document.querySelector("#openAddModal");
openAddModalButton.addEventListener("click", () => {
  renderAddModal();
  resetForm();

  

  const addPhoneButton = document.querySelector("#addPhone");
  addPhoneButton.addEventListener("click", () => {
    if (validation()) {
      addPhone();
      closeModalButton.click();
      resetForm();
    }
  });
});

function validation() {
  const listInputElement = document.querySelectorAll(".modal-body input");
  const validate = Array.from(listInputElement).map((element, index) => {
    let isCheck = false;
    element.addEventListener("input", () => {
      setNormal(element);
    });

    if (element.value.trim() === "") {
      setError(element, "Vui lòng nhập trường này");
      isCheck = false;
    } else {
      setSuccess(element);
      isCheck = true;
    }

    if (index === 1) {
      const regex = /^[0-9]+$/;
      if (regex.test(element.value)) {
        setSuccess(element);
        isCheck = true;
      } else if (element.value.trim() !== "") {
        setError(element, "Trường này phải là số");
        isCheck = false;
      }
    }

    if (index === 5) {
      const regex =
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      if (regex.test(element.value)) {
        setSuccess(element);
        isCheck = true;
      } else if (element.value.trim() !== "") {
        setError(element, "Trường này phải là link");
        isCheck = false;
      }
    }
    return isCheck;
  });
  let isCheck = false;
  const selectElement = document.querySelector("#type");
  selectElement.addEventListener("change", () => {
    setNormal(selectElement);
  });

  if (selectElement.value === "") {
    isCheck = false;
    setError(selectElement, "Vui lòng chọn thương hiệu");
  } else {
    isCheck = true;
    setSuccess(selectElement);
  }

  return validate.reduce((total, current) => total && current, true) && isCheck;
}
