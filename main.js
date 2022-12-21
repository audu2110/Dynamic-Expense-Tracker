const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#Description');
const categoryInput=document.querySelector('category');
const expenseList = document.querySelector('#expense');

myForm.addEventListener('submit', onSubmit);
var desc=descriptionInput.value;

function onSubmit(e){
    e.preventDefault();
    var amt=amountInput.value
    var desc=descriptionInput.value

    var hdgdg=document.getElementById('category')
    var tehdhdxt=hdgdg.options[hdgdg.selectedIndex].text;




    let obj={
        amt,
        desc,
        tehdhdxt
    };

    axios.post("https://crudcrud.com/api/78c6345a85304941b0e072789a7f4e77/AppiontmentData",obj).then((response)=>{
      showNewUserOnScreen(response.data)  
    console.log(response)
    }).catch((err)=>{
      console.log(err);
    })
}

window.addEventListener("DOMContentLoaded", () =>{
    
    
    axios.get("https://crudcrud.com/api/78c6345a85304941b0e072789a7f4e77/AppiontmentData").then((response)=>{
    showNewUserOnScreen(response.data)  
    for(var i=0;i<response.data.length;i++){
      showNewUserOnScreen(response.data[i])
    }
      console.log(response)
    }).catch((err)=>{
      console.log(err);
    })
  })
  function showNewUserOnScreen(user){
    if(localStorage.getItem(user.desc) !== null){
      removeUserFromScreen(desc);
    }
    const parentNode=document.getElementById('expense');
    const childHTML = `<li id=${user._id}> ${user.amt} - ${user.desc}-${user.tehdhdxt}
                                          <button onclick=deleteUser('${user._id}')> Delete Expense </button>
                                          <button onclick=editUserDetails('${user._id}','${user.amt}','${user.desc}','${user.tehdhdxt}')>Edit Expense </button>
                                       </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
  }
  
  function editUserDetails(uid,amont, descrp, drop){
  
    document.getElementById('Description').value = descrp;
    document.getElementById('amount').value = amont;
    document.getElementById('category').options[document.getElementById('category').selectedIndex].text=drop;
    console.log(document.getElementById('category').options[document.getElementById('category').selectedIndex].text)
    deleteUser(uid);
  }
  
  function deleteUser(uid){
    axios.delete(`https://crudcrud.com/api/78c6345a85304941b0e072789a7f4e77/AppiontmentData/${uid}`).then((response)=>{    
    removeUserFromScreen(uid)
    }).catch((err)=>{
      console.log(err);
    })
    console.log(uid)
  
    removeUserFromScreen(uid);
  }
  
  function removeUserFromScreen(uid){
    const parentNode = document.getElementById('expense');
    const childNodeToBeDeleted = document.getElementById(uid);
    if(childNodeToBeDeleted){
      parentNode.removeChild(childNodeToBeDeleted);
    }
    
  }
