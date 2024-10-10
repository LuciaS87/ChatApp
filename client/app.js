const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, 
    content));

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-message-form');
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector(".add-messages-form .text-input");

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
    let message = messageContentInput.value;

    if (!message) {
        alert('please type message');
    } else {
       addMessage(userName, messageContentInput.value); 
       socket.emit('message', { author: userName, content: 
        message })
        messageContentInput.value = '';
    }
}

loginBtn.addEventListener('click', loginHandler);
submitBtn.addEventListener('click', sendMessage);

function addMessage(author, content) {
const message = document.createElement('li');
message.classList.add('message');
message.classList.add('message--received');

if(author === userName) {
    message.classList.add('message--self');
}
const header = document.createElement('h3');
header.classList.add('message__author');
if(author !== userName){
    header.innerHTML = author;  
} else {
    header.innerHTML = 'You';
}

const div = document.createElement('div');
div.classList.add('message__content');
div.innerHTML = content;
message.appendChild(header);
message.appendChild(div);

messagesList.appendChild(message);
}
