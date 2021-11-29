//*************************** */


function addUsers(user) {
      const lsit = document.querySelector('#book-list');
      const row = document.createElement('tr');
        row.innerHTML = `
        <td> <a href="#" style="text-decoration:none"><strong>${user.name}</a></td>
        <td><strong>${user.email}</strong></td>
        <td><strong>${user.password}</strong></td>
        <td><button id="delete-btn" class="btn btn-info btn-sm delete">Block</button></td>   `;
      lsit.appendChild(row)
    
    }


function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users'));

    users.forEach((user) => addUsers(user));
}


document.addEventListener('DOMContentLoaded', displayUsers);

