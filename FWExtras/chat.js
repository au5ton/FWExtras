/*
 *  Chat.js
 *
 *  Manages all things related to the chat on all pages
 *
 */


 //Refresh chat button

function refreshChat() {

}

 var refreshButton = document.createElement("span");
 refreshButton.setAttribute("id","refresh_button");
 refreshButton.setAttribute("title","Refresh the chat");
 refreshButton.innerHTML = "<i style=\"position:relative;top:5px;\"class=\"material-icons\">cached</i>";

 if(window.location.pathname === "/home.php") {
     $("[name='chat_submit']").after(refreshButton);
     $("#refresh_button").on("click",refreshChat);
 }
