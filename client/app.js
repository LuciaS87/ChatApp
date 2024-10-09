const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-message-form');
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector("#text-input");

const loginBtn = document.querySelector('.welcome-form .btn');
const submitBtn = document.querySelector('.add-messages-form .btn');

let userName='';

const loginHandler = function(event) {
    event.preventDefault();
   let username = userNameInput.value;

    if(!username) {
        alert('Brak nazwy');
    } else {
        userName = username;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

const sendMessage = function(event) {
    event.preventDefault();
    console.log('sendMessage')
}

loginBtn.addEventListener('click', loginHandler);
submitBtn.addEventListener('click', sendMessage)
