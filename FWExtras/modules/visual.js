/*
 *  Visual.js
 *
 *  Manages all things related to visual-only tweaks on all pages
 *
 */


 var materialIcons = document.createElement("link");
 materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
 materialIcons.rel = "stylesheet";
 $($(document.head).children()[0]).after(materialIcons);

 if(window.location.pathname === "/home.php") {
      $("#chat_file_link")[0].innerHTML = "<i style=\"position:relative;top:5px;\"class=\"material-icons\">attach_file</i>";
 }
