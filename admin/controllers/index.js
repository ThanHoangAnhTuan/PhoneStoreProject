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
function delPhone(id) {
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
  debugger;
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
  console.log(phone);
}

const openAddModalButton = document.querySelector("#openAddModal");
// nút này là nút khi em mở modal lên: là nút add phone
openAddModalButton.addEventListener("click", () => {
  renderAddModal();

  const closeModalButton = document.querySelector("#closeModal");
  const addPhoneButton = document.querySelector("#addPhone");
  // đây là nút khi em nhập thông tin vào input xong em click: nút add phone màu xanh
  addPhoneButton.addEventListener("click", () => {
    if (validation()) {
      // khi mà em điền thông tin vào phải đúng với điều kiện anh thực hiện ở đây
      // khi mà em nhập không đúng nó sẽ báo đỏ và hiện dòng chữ thông báo
      // em phải điền toàn bộ thì mới được add phone
      // nãy em chưa chạy hàm add phone khi validate xong: dòng 85
      // nên nó không ra gì hết
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
