// **************************   Record Class: Represents a Record *****************************
class Record {
    constructor(name, height, weight, bp,u_id) {
      this.userName = name;
      this.userHeight = height;
      this.userWeight = weight;
      this.bloodPressure = bp;
      this.userID = u_id;
    }
  }

//  ****************************  BMI value Calculation ***********************************

function getBMI(record){
      let bmi = (record.userWeight/(record.userHeight**2));
      if (bmi<=18.5) {
        return `<a href="#" class="btn btn-warning btn-sm">Under Weight</a>`
      } else if (bmi>18.5 && bmi<=24.9) {
        return `<a href="#" class="btn btn-success btn-sm">Healthy</a>`
      } else if (bmi>24.9 && bmi<=29.9){
        return `<a href="#" class="btn btn-danger btn-sm">OverWeight</a>`
      }
      else {
        return `<a href="#" class="btn btn-warning btn-sm">Obese</a>`
      }
    }

//  ************************** Generating a unique ID for every user *********************
  
function UniqueID() {
    const calender = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 
                        9:'Sep', 10:'Oct',11:'Nov',12:'Dec'}
    var min = 1001
    var max = 9999
    var arr = Array.from(Array(1001).keys())
    const d = new Date();
    let month = calender[d.getMonth() + 1] ;
    let year = d.getFullYear()
    let date = d.getDate()
    const number = 'PCS/' + year +'/' + month +'/'+ date + '/' + (Math.floor(Math.random() * (max - min + 1)) + min)
   return  number
};

  // *********************************** UI Class: Handle UI Tasks ********************************
  
  class UI {
    static displayBooks() {
      const records = Store.getBooks();
  
      records.forEach((record) => UI.addBookToList(record));
    }
    static addBookToList(record) {
      const lsit = document.querySelector('#book-list');
      const row = document.createElement('tr');
      row.className = 'items'
        row.innerHTML = `
        <td> <a href="#" style="text-decoration:none"><strong>${record.userID}</a></td>
        <td><strong>${record.userName}</strong></td>
        <td><strong>${getBMI(record)}</strong></td>
        <td><strong>${record.bloodPressure}</strong></td>
        <td><button id="delete-btn" class="btn btn-info btn-sm delete">Delete</button></td>   `;
      lsit.appendChild(row)
    
    }
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
    static showAlertAdd(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-dismissible alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      //  ************* Vanish in 3 seconds ************************
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#height').value = '';
      document.querySelector('#weight').value = '';
      document.getElementById('bp').value = '';
    }
  }

  // ***********************************  Store Class: Handles Storage *************************
  
  class Store {
    static getBooks() {
      let records;
      if(localStorage.getItem('records') === null) {
        records = [];
      } else {
        records = JSON.parse(localStorage.getItem('records'));
      }
      return records;
    }
    static addBook(record) {
      const records = Store.getBooks();
      records.push(record);
      localStorage.setItem('records', JSON.stringify(records));
    }
    static removeBook(bp) {
      const records = Store.getBooks();
      records.forEach((record, index) => {
        if(record.bloodPressure === bp) {
          records.splice(index, 1);
        }
      });
      localStorage.setItem('records', JSON.stringify(records));
    }
  }

  // *************************************** Instantiate: User data *************************************
  
  function userData() {
    const name = document.querySelector('#name').value;
    const height = document.querySelector('#height').value/100;
    const weight = document.querySelector('#weight').value;
    const bp = document.querySelector('#bp').value;
    const record = new Record(name, height, weight, bp, UniqueID());

     if(name === '' || height === '' || weight === '' || bp === '' || height==0 || weight==0) {
      UI.showAlertAdd('Please fill the details correctly', 'danger');
    }  
    else {
          return record
  }
}

  // ******************************* Display user dayaRecords *************************************
  
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
      // Add Book to UI
      UI.addBookToList(userData());
      // Add book to store
      Store.addBook(userData());
      // Show success message
      UI.showAlertAdd('You added ' + userData().userName, 'success');
      // Clear fields
      UI.clearFields();
    })

// ************************************************* Search for Users *****************************

document.getElementById('search').style.display = 'none';
document.querySelector('.back').style.display = 'none';
document.getElementById('noUsers').style.display = 'none';
document.getElementById('noSearch').style.display = 'none';
document.getElementById('dropDown').style.display = 'none';


document.getElementById('search-button').addEventListener('click', searchUsers)

function searchUsers() {
    document.getElementById('search').style.display = 'block';
    document.getElementById('book-form').style.display = 'none';
    document.querySelector('.back').style.display = 'block';
    document.getElementById('search-button').style.display = 'none';
    document.getElementById('noUsers').style.display = 'block';
    document.getElementById('dropDown').style.display = 'block';

    var total = document.getElementById('count-1');
    total.innerHTML = searchData.Names().length
}

document.getElementById('search').addEventListener('keyup', searchInput)

function searchInput(){
  document.getElementById('noSearch').style.display = 'block';
  var actualInput = document.getElementById('search').value
  var input = actualInput.toLowerCase();
  var tbody = document.getElementById('book-list');
  var trows = tbody.querySelectorAll('tr.items')
  var names = searchData.Names()
  var bmis = searchData.bmiValues()
  var idValues = searchData.ids()
  let count = 0

  if (dropMenu() === 'ALL'){
    for (let i=0;i<names.length;i++){
      if ((names[i].indexOf(input)==0 || bmis[i].split(">")[1].split("<")[0].indexOf(input)==0  || idValues[i].indexOf(input) > -1) ){
        trows[i].style.display = ''
          count = count + 1
      } else{
        trows[i].style.display = 'none'
      }
    }
    
    var nameBold = `"${actualInput}"`
    document.getElementById('search-data').innerHTML = `Showing the users with ${nameBold}` +`   <span class="badge bg-primary rounded-pill" style="font-size: medium; color:black;">${count}</span>`
  
    if(input.length == 0 ){
      document.getElementById('noSearch').style.display = 'none';
    }
  } else if( dropMenu() === 'UserName'){
    for (let i=0;i<names.length;i++){
      if (names[i].indexOf(input)==0  ){
        trows[i].style.display = ''
          count = count + 1
      } else{
        trows[i].style.display = 'none'
      }
    }
    var nameBold = `"${actualInput}"`
    document.getElementById('search-data').innerHTML = `Showing the users with ${nameBold}` +`   <span class="badge bg-primary rounded-pill" style="font-size: medium; color:black;">${count}</span>`
  
  
    if(input.length == 0 ){
      document.getElementById('noSearch').style.display = 'none';
    } 
  }
  else if( dropMenu() === 'BMI'){
    for (let i=0;i<names.length;i++){
      if ( bmis[i].split(">")[1].split("<")[0].indexOf(input)==0   ){
        trows[i].style.display = ''
          count = count + 1
      } else{
        trows[i].style.display = 'none'
      }
    }
    var nameBold = `"${actualInput}"`
    document.getElementById('search-data').innerHTML = `Showing the users with ${nameBold}` +`   <span class="badge bg-primary rounded-pill" style="font-size: medium; color:black;">${count}</span>`
  
    if(input.length == 0 ){
      document.getElementById('noSearch').style.display = 'none';
    } 
  }
  else if( dropMenu() === 'UniqueID'){
    for (let i=0;i<names.length;i++){
      if ( idValues[i].indexOf(input) > -1){
        trows[i].style.display = ''
          count = count + 1
      } else{
        trows[i].style.display = 'none'
      }
    }
    var nameBold = `"${actualInput}"`
    document.getElementById('search-data').innerHTML = `Showing the users with ${nameBold}` +`   <span class="badge bg-primary rounded-pill" style="font-size: medium; color:black;">${count}</span>`
  
    if(input.length == 0 ){
      document.getElementById('noSearch').style.display = 'none';
    } 
  }

}

// ****************************** DropDwon for searching users by preferred type *****************************

function dropMenu() {  
  var mylist = document.getElementById("myPreference");  
  return mylist.options[mylist.selectedIndex].text;  
  }  

  // **************************** Class for storing users in an array  ***********************

class searchData {
  static Names() {
    var records = JSON.parse(localStorage.getItem('records'))
    var names = []
    for (var i=0; i<records.length ;i++) {
      names.push(records[i].userName.toLowerCase())
    }
    return names
  }
  static bmiValues(){
    var records = JSON.parse(localStorage.getItem('records'))
    var bmis = []
    for (var i=0; i<records.length ;i++) {
      bmis.push(getBMI(records[i]).toLowerCase())
    }
    return bmis
  }
  static ids(){
    var records = JSON.parse(localStorage.getItem('records'))
    var idValues = []
    for (var i=0; i<records.length ;i++) {
      idValues.push(records[i].userID.toLowerCase())
    }
    return idValues
  }
}
// ***************************** Back button(to go back to home page) ***********************

document.querySelector('.back').addEventListener('click',backHome)

function backHome() {
    document.getElementById('book-form').style.display = 'block'
    document.querySelector('.back').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('search-button').style.display = 'block';
    document.getElementById('noUsers').style.display = 'none';
    document.getElementById('noUsers').style.display = 'none';
    document.getElementById('dropDown').style.display = 'none';

  };
// **************************************** modal creation for deleting a user ***********************
  
document.getElementById('book-list').addEventListener('click', (event) => {
    
  if (event.target.classList.contains('delete')) {
    
    document.getElementById('modalDisplay').style.display = 'block';
    
    var content = document.getElementById('content')
    let user = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    let bmi = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    content.innerHTML = ` <p style="color:aqua;">Patient Details:</p>
                          <p style="color:white;">Name: ${user}</p>
                          <p style="color:white;">BMI: ${bmi}</p>`
    
    var noButton = document.getElementById("noButton");
    noButton.onclick = function(){
      document.getElementById('modalDisplay').style.display = 'none';
    }
    
    var closeButton = document.getElementById('close');
    closeButton.onclick = function(){
      document.getElementById('modalDisplay').style.display = 'none';
    }
    
    var yesButton = document.getElementById("yesButton");
    yesButton.onclick = function(){
    // Remove book from UI
      UI.deleteBook(event.target);
    // Remove book from store
      Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
      document.getElementById('modalDisplay').style.display = 'none';
    }
    }
  });

  

  