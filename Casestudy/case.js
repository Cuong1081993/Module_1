class Contact {
    constructor(id, name, dob, email, phonenumber, address, major, avatar) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.phone = phonenumber;
        this.address = address;
        this.major = major;
        this.avatar = avatar;
    }
}
const contactvalue = "data-contact";
var contacts = [];
function savedata() {
    if (localStorage.getItem(contactvalue) == null) {
        contacts = [
            new Contact(1, "Trần Văn Thành", "14/09/2000", "abc@gmail.com", "098741234", "35 Lê Huân", "Luật kinh tế", "2.jpg"),
            new Contact(2, "Nguyễn Hữu Tiến", "15/08/2002", "tien123@gmail.com", "098741234", "25 Lê Duẫn", "Kiểm toán", "1.jpg"),
            new Contact(3, "Trần Văn Lợi", "10/09/1999", "iloveyou@gmail.com", "098741221", "35 Lê Lợi", "Kiến trúc", "3.jpg"),
            new Contact(4, "Lê Thị Bưởi", "11/07/1998", "foreveralone@gmail.com", "098743234", "35 Bùi Thị Xuân", "Luật kinh tế", "5.jpg")
        ];
        localStorage.setItem(contactvalue, JSON.stringify(contacts));
    }
    else {
        contacts = JSON.parse(localStorage.getItem(contactvalue));
    }
}
function renderList(contact) {
    let htmls = contact.map(function (student, index) {
        return `<tr>
                <td>${student.name}</td>
                <td>${student.dob}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.major}</td>
                <td><img  class="avatar" src="${student.avatar}"></td>
                <td>
                    <i class="fa fa-pencil" onclick="change(${student.id})"></i>
                    <i class="fa fa-trash" onclick="remove(${index})"></i>
                </td>
                </tr>`
    });
    document.querySelector('.table>tbody').innerHTML = htmls.join("");
}
function search(){
    let find=document.querySelector('#search').value
    let result= contacts.filter(function(contact){
        return contact.name.toLowerCase().includes(find.toLowerCase())
    })
    renderList(result);
}
function open_insert() {
    document.querySelector('.insert_add').classList.add('show');
}
function close_insert() {
    document.querySelector('.insert_add').classList.remove('show');
    reset_insert();
}

function changeAva() {
    document.querySelector('.avatar_insert').src = document.querySelector('#avatar').value || '/no.jfif'
}
// Thêm danh sách 
function add_insert() {
    let name = document.querySelector('#name').value;
    let dob = document.querySelector('#dob').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let address = document.querySelector('#address').value;
    let major = document.querySelector('#major').value;
    let avatar = document.querySelector('#avatar').value;
    let id = findMaxId() + 1;
    let newContact = new Contact(id, name, dob, email, phone, address, major, avatar);
    contacts.push(newContact);
    localStorage.setItem(contactvalue, JSON.stringify(contacts));
    close_insert();
    renderList(contacts);
}
function findMaxId() {
    let liststudents = [...contacts];
    let maxId = liststudents.sort(function (st1, st2) {
      return st2.id - st1.id;
    })[0].id;
    return maxId;
  }
// Reset danh sách về rỗng
function reset_insert() {
    document.querySelector('#name').value = "";
    document.querySelector('#dob').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#phone').value = "";
    document.querySelector('#address').value = "";
    document.querySelector('#major').value = "";
    document.querySelector('.avatar_insert').src = "no.jfif"
    document.querySelector('#btnSave').classList.add('d-none');
    document.querySelector('#btnAdd').classList.remove('d-none');
    document.querySelector('.insert_title').innerText = "Thêm danh sách";
}
// Xóa danh sách
function remove(index) {
    let confirm = window.confirm('Bạn có muốn xóa không?');
    if (confirm) {
        contacts.splice(index, 1);
        localStorage.setItem(contactvalue, JSON.stringify(contacts));
        renderList(contacts);
    }
}
//Sửa danh sách
function change(contactId) {
    let student = contacts.find(function (ct) {
        return ct.id === contactId;
    })
    document.querySelector('#contactId').value = student.id;
    document.querySelector('#name').value = student.name;
    document.querySelector('#dob').value = student.dob;
    document.querySelector('#email').value = student.email;
    document.querySelector('#phone').value = student.phone;
    document.querySelector('#address').value = student.address;
    document.querySelector('#major').value = student.major;
    document.querySelector('.avatar_insert').src = student.avatar;
    document.querySelector('#btnSave').classList.remove('d-none');
    document.querySelector('#btnAdd').classList.add('d-none');
    document.querySelector('.insert_title').innerText = "Update Contact";
    open_insert();
}
// Lưu danh sách
function save_insert() {
    let id = document.querySelector('#contactId').value;
    let contact = contacts.find(function (ct) {
        return ct.id == id;
    })
    contact.name = document.querySelector('#name').value;
    contact.dob = document.querySelector('#dob').value;
    contact.email = document.querySelector('#email').value;
    contact.phone = document.querySelector('#phone').value;
    contact.address = document.querySelector('#address').value;
    contact.major = document.querySelector('#major').value;
    contact.avatar = document.querySelector('#avatar').value;
    localStorage.setItem(contactvalue, JSON.stringify(contacts));
    close_insert();
    renderList(contacts);
}
savedata();
renderList(contacts);


