 function renderUI(data){
    var content ="";
    for (var i =0; i < data.length;i++){
       const phone = data[i];
       content +=`
       <tr>
          <td>${phone.id}</td>
          <td>${phone.name}</td>
          <td>${phone.price}</td>
          <td>${phone.image}</td>
          <td>${phone.description}</td>
          <td>
          <button class="btn btn-primary" onclick ="handleEdit('${phone.id}')"> Edit </button>
 
            <button class="btn btn-danger" onclick ="delPhone('${phone.id}')"> Delete </button>
          </td>
          
       </tr>
       `
    }
    getEle("tblDanhSachSP").innerHTML = content;
 }


 

