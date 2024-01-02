function renderUI(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    const phone = data[i];
    content += `
       <tr>
          <td>${i + 1}</td>
          <td>${phone.name}</td>
          <td>${phone.price}</td>
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
          
       </tr>
       `;
  }
  getEle("tblDanhSachSP").innerHTML = content;
}
