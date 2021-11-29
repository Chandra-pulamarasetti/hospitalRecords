// **************************Admin account ********************************


document.getElementById('Radio2').addEventListener('click', adminLogin)

function adminLogin(){

    document.getElementById('adminId').innerHTML = 'Admin ID';
    document.getElementById('adminPassword').innerHTML = 'Admin Password';

    document.getElementById('forgot').style.display = 'none';
    document.getElementById('newAccount').style.display = 'none';
    document.getElementById('login').addEventListener('click', accountAdmin)

    function accountAdmin(){
        let userID = document.getElementById('userID').value;
    let userPassword = document.getElementById('userPassword').value;

    if(userID === '' && userPassword === '') {
        document.getElementById('userID').style.border = '2px solid salmon';
        document.getElementById('userPassword').style.border = '2px solid salmon';

        setTimeout(() =>document.getElementById('userID').style.border = 'none', 3000);
        setTimeout(() =>document.getElementById('userPassword').style.border = 'none', 3000);
        showAlertAdd('Please fill all the details', 'danger');
     }
     else if (userID === ''){
        document.getElementById('userID').style.border = '2px solid salmon';
        document.getElementById('errID').innerHTML = 'Enter ID'
        document.getElementById('errID').style.display = 'block'
        function errorName(){
            document.getElementById('userID').style.border = 'none';
            document.getElementById('errID').style.display = 'none';
        }
        setTimeout(errorName, 3000);
        document.getElementById('userID').focus()
     }
     else if (userPassword === ''){
        document.getElementById('userPassword').style.border = '2px solid salmon';
        document.getElementById('errPassword').innerHTML = 'Enter Password'
        document.getElementById('errPassword').style.display = 'block'
        function errorName(){
            document.getElementById('userPassword').style.border = 'none';
            document.getElementById('errPassword').style.display = 'none';
        }
        setTimeout(errorName, 3000);
        document.getElementById('userPassword').focus()
     }
     else{
         if (userID === 'admin' && userPassword === '1234'){
             clearFields()
            return setTimeout(timeout("admin.html"), 3000)
         }

         else{
            showAlertAdd('Admin Id or Password are wrong', 'danger');
         }
     }
    }
}


// ******************************************** show alert ************************************


function showAlertAdd(message, classname) {
    document.getElementById('errorDetails').style.display = 'block'
    const para = document.getElementById('errorDetails');
    para.className = `container alert alert-dismissible alert-${classname}`;
    para.innerHTML = `${message}`;
    //  ************* Vanish in 3 seconds ************************
    function errorDetails(){
        document.getElementById('errorDetails').style.display = 'none'
    }
    setTimeout(errorDetails, 3000);
  }

  function timeout(address){
    return window.location.assign(`${address}`)
}


// **************************Admin account ********************************


document.getElementById('Radio1').addEventListener('click', userLogin)

function userLogin(){

    document.getElementById('adminId').innerHTML = 'Email Address';
    document.getElementById('adminPassword').innerHTML = 'Password';

    document.getElementById('forgot').style.display = 'block';
    document.getElementById('newAccount').style.display = 'block';
    document.getElementById('login').addEventListener('click', accountUser)

    function accountUser(){
        let userID = document.getElementById('userID').value;
        let userPassword = document.getElementById('userPassword').value;
        let emails = UserSearch.Emails()
        let passwords = UserSearch.Passwords()

    if(userID === '' && userPassword === '') {
        document.getElementById('userID').style.border = '2px solid salmon';
        document.getElementById('userPassword').style.border = '2px solid salmon';

        setTimeout(() =>document.getElementById('userID').style.border = 'none', 3000);
        setTimeout(() =>document.getElementById('userPassword').style.border = 'none', 3000);
        showAlertAdd('Please fill all the details', 'danger');
     }
     else if (userID === ''){
        document.getElementById('userID').style.border = '2px solid salmon';
        document.getElementById('errID').innerHTML = 'Enter Email address'
        document.getElementById('errID').style.display = 'block'
        function errorName(){
            document.getElementById('userID').style.border = 'none';
            document.getElementById('errID').style.display = 'none';
        }
        setTimeout(errorName, 3000);
        document.getElementById('userID').focus()
     }
     else if (userPassword === ''){
        document.getElementById('userPassword').style.border = '2px solid salmon';
        document.getElementById('errPassword').innerHTML = 'Enter Password'
        document.getElementById('errPassword').style.display = 'block'
        function errorName(){
            document.getElementById('userPassword').style.border = 'none';
            document.getElementById('errPassword').style.display = 'none';
        }
        setTimeout(errorName, 3000);
        document.getElementById('userPassword').focus()
     }
     else{
         if ((emails.indexOf(userID) >= 0) && (passwords.indexOf(userPassword) >= 0) ){
             clearFields()
            return setTimeout(timeout("index.html"), 3000)
         }

         else{
            showAlertAdd('Email Address or Password are wrong', 'danger');
         }
     }
    }
}


function clearFields() {
    document.querySelector('#userID').value = '';
    document.querySelector('#userPassword').value = '';
  }

  class UserSearch {
    static Emails(){
      var users = JSON.parse(localStorage.getItem('users'))
      var emails = []
      for (var i=0; i<users.length ;i++) {
        emails.push(users[i].email)
      }
      return emails
    }
    static Passwords(){
      var users = JSON.parse(localStorage.getItem('users'))
      var passwords = []
      for (var i=0; i<users.length ;i++) {
        passwords.push(users[i].password)
      }
      return passwords
    }
  }
