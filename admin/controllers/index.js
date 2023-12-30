const nameProduct = document.querySelector("#name");
const price = document.querySelector("#price");
const screen = document.querySelector("#screen");
const backCamera = document.querySelector("#backCamera");
const frontCamera = document.querySelector("#frontCamera");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const type = document.querySelector("#type");

const openAddModalButton = document.querySelector("#openAddModal");
openAddModalButton.addEventListener("click", () => {
   renderAddModal();

   const closeModalButton = document.querySelector("#closeModal");
   const addPhoneButton = document.querySelector("#addPhone");
   addPhoneButton.addEventListener("click", () => {
      if (validation()) {
         // addProduct();
         closeModalButton.click();
         resetForm();
      }
   });
});

function validation() {
   const listInputElement = document.querySelectorAll(
      ".modal-body input"
   );
   const validate = Array.from(listInputElement).map(
      (element, index) => {
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
      }
   );
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

   return (
      validate.reduce((total, current) => total && current, true) &&
      isCheck
   );
}
