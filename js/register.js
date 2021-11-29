// *********************** Class for storing the credentials **************************

class StoreData {
    static getUsers() {
        let users;
        if(localStorage.getItem('users') === null) {
          users = [];
        } else {
          users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
      }
      static addUser(user) {
        const users = StoreData.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }
      static removeUser(user) {
        const users = StoreData.getBooks();
        users.forEach((each, index) => {
          if(each.name === user) {
            users.splice(index, 1);
          }
        });
        localStorage.setItem('users', JSON.stringify(users));
      }
}
 //******************************************  */
 class Register {
    constructor(name, email, password, confPassword) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.confPassword = confPassword;
    }
    static showAlertAdd(message, classname) {
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
          static clearFields() {
            document.querySelector('#typeName').value = '';
            document.querySelector('#typeEmail').value = '';
            document.querySelector('#typePassword').value = '';
            document.getElementById('typePasswordX').value = '';
          }
    }
// ************************************ Search users data ***************************
class searchDetails {
    static accountNames() {
      var users = JSON.parse(localStorage.getItem('users'))
      var names = []
      for (var i=0; i<users.length ;i++) {
        names.push(users[i].name)
      }
      return names
    }
    static accountEmails(){
      var users = JSON.parse(localStorage.getItem('users'))
      var emails = []
      for (var i=0; i<users.length ;i++) {
        emails.push(users[i].email)
      }
      return emails
    }
  }
// **************************** Instantiate user data ************************************

function newData() {
    let name = document.getElementById('typeName').value;
    let email = document.getElementById('typeEmail').value;
    let password = document.getElementById('typePassword').value;
    let confPassword = document.getElementById('typePasswordX').value;
    let names = searchDetails.accountNames();
    let emails = searchDetails.accountEmails();

     if(name === '' && email === '' && password === '' && confPassword === '') {
        document.getElementById('typeName').style.border = '2px solid salmon';
        document.getElementById('typeEmail').style.border = '2px solid salmon';
        document.getElementById('typePassword').style.border = '2px solid salmon';
        document.getElementById('typePasswordX').style.border = '2px solid salmon';
        setTimeout(() =>document.getElementById('typeName').style.border = 'none', 3000);
        setTimeout(() =>document.getElementById('typeEmail').style.border = 'none', 3000);
        setTimeout(() =>document.getElementById('typePassword').style.border = 'none', 3000);
        setTimeout(() =>document.getElementById('typePasswordX').style.border = 'none', 3000);
      Register.showAlertAdd('Please fill all the details', 'danger');
     }
     else if (name === ''){
        document.getElementById('typeName').style.border = '2px solid salmon';
        document.getElementById('errName').innerHTML = 'Enter username'
        document.getElementById('errName').style.display = 'block'
        function errorName(){
            document.getElementById('typeName').style.border = 'none';
            document.getElementById('errName').style.display = 'none';
        }
        setTimeout(errorName, 3000);
        document.getElementById('typeName').focus()
     }

     else if (names.indexOf(name) >= 0){
        document.getElementById('typeName').style.border = '2px solid salmon';
        document.getElementById('errName').innerHTML = 'Username already exists'
        document.getElementById('errName').style.display = 'block'
        function errorName(){
            document.getElementById('typeName').style.border = 'none';
            document.getElementById('errName').style.display = 'none';
            document.querySelector('#typeName').value = '';
        }
        setTimeout(errorName, 3000);
        document.getElementById('typeName').focus()
     }

     else if (email === ''){
        document.getElementById('typeEmail').style.border = '2px solid salmon';
        document.getElementById('errEmail').innerHTML = 'Enter the Email Address'
        document.getElementById('errEmail').style.display = 'block';

        function errorEmail(){
            document.getElementById('typeEmail').style.border = 'none';
            document.getElementById('errEmail').style.display = 'none';
        }
        setTimeout(errorEmail, 3000);
        document.getElementById('typeEmail').focus()
     }
     else if (emails.indexOf(email) >= 0){
        document.getElementById('typeEmail').style.border = '2px solid salmon';
        document.getElementById('errEmail').innerHTML = 'Email address alrady taken'
        document.getElementById('errEmail').style.display = 'block';

        function errorEmail(){
            document.getElementById('typeEmail').style.border = 'none';
            document.getElementById('errEmail').style.display = 'none';
            document.querySelector('#typeEmail').value = '';

        }
        setTimeout(errorEmail, 3000);
        document.getElementById('typeEmail').focus()
     }

     else if (ValidateEmail() === false) {
        document.getElementById('typeEmail').style.border = '2px solid salmon';
        document.getElementById('errEmail').innerHTML = 'Invalid Email Address'
        document.getElementById('errEmail').style.display = 'block';

        function errorEmail(){
            document.getElementById('typeEmail').style.border = 'none';
            document.getElementById('errEmail').style.display = 'none';
            document.querySelector('#typeEmail').value = '';
        }
        setTimeout(errorEmail, 3000);
        document.getElementById('typeEmail').focus()
     }
     
     else if (password === ''){
        document.getElementById('typePassword').style.border = '2px solid salmon';
        document.getElementById('errPassword').style.display = 'block'
        function errorPassword(){
            document.getElementById('typePassword').style.border = 'none';
            document.getElementById('errPassword').style.display = 'none';
        }
        setTimeout(errorPassword, 3000);
        document.getElementById('typePassword').focus() 
     }
     
     else if (confPassword === ''){
        document.getElementById('typePasswordX').style.border = '2px solid salmon';
        document.getElementById('errConfPassword').innerHTML = 'Enter confirm password'
        document.getElementById('errConfPassword').style.display = 'block'
        function errorConf(){
            document.getElementById('typePasswordX').style.border = 'none';
            document.getElementById('errConfPassword').style.display = 'none';
        }
        setTimeout(errorConf, 3000);
        document.getElementById('typePasswordX').focus()
     } 

     else if (password != confPassword) {
        document.getElementById('typePasswordX').style.border = '2px solid salmon';
        document.getElementById('errConfPassword').innerHTML = 'Passwords does not match'
        document.getElementById('errConfPassword').style.display = 'block'
        function errorMatch(){
            document.getElementById('typePasswordX').style.border = 'none';
            document.getElementById('errConfPassword').style.display = 'none';
            document.getElementById('typePasswordX').value = '';

        }
        setTimeout(errorMatch, 3000);
        document.getElementById('typePasswordX').focus()
     }
    else {
        const user = new Register(name, email, password, confPassword);
        
          return user
  }
}
// *************************** Validation of EMail and Passwords *********************************
function ValidateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('typeEmail').value))
  {
    return true
  } else{
    return false
  }
}

function matchPassword() {
    let password = document.getElementById('typePassword').value;
    let confPassword = document.getElementById('typePasswordX').value;

    if (password == confPassword) {
        document.getElementById('errConfPassword').innerHTML = `<strong>passwords matched</strong> <img src="images/check-1.svg" style="color:white;" />`;
        document.getElementById('errConfPassword').style.color = 'springgreen';
        document.getElementById('errConfPassword').style.display = 'block';
        function errorMatch(){
            document.getElementById('typePasswordX').style.border = 'none';
            document.getElementById('errConfPassword').style.display = 'none';
        }
        setTimeout(errorMatch, 5000);
    }
}

document.getElementById('typePasswordX').addEventListener('keyup', matchPassword)

// *************************** Blocking Content from the visibility *********************************

document.getElementById('errName').style.display = 'none';
document.getElementById('errEmail').style.display  = 'none';
document.getElementById('errPassword').style.display = 'none';
document.getElementById('errConfPassword').style.display = 'none';
document.getElementById('errorDetails').style.display = 'none';

// ***************************************** Registering ***********************************************

function complete() {
        StoreData.getUsers();
        if (!newData()) {
        } else{
            StoreData.addUser(newData());
            Register.clearFields()
            Register.showAlertAdd('Successfully registered!!!', 'primary');
        return setTimeout(timeout, 3000)
        }
    }

function timeout(){
    return window.location.assign("login.html")
}

// ********************************* 

