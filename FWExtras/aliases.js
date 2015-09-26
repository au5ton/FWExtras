/*
 *  Aliases.js
 *
 *  Manages all things related to aliases on all pages
 *
 */



var sendButton = $("[name='chat_submit']");
var sendButtonType;
var chatTextBox = $("#chat_text");
var tempCount = 0;

function refreshChat() {
    console.log("Refreshing chat...");
    jQuery.get("scripts/auto_refresh_home.php",function(res){
        console.log("Chat diff retrieved.");
        processResponse(res);
    });
}

//<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
var materialIcons = document.createElement("link");
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
materialIcons.rel = "stylesheet";
$($(document.head).children()[0]).after(materialIcons);

if(window.location.pathname === "/home.php") {
    //
}
else if(window.location.pathname === "/user.php") {
    //Aliases
    var currentUser = $("#js_username").html();
    var aliasButton = document.createElement("span");
    aliasButton.setAttribute("id","alias_button");
    aliasButton.setAttribute("title","Edit this user's alias");
    aliasButton.innerHTML = "+";
    $("#js_username").after(aliasButton);

    var aliasLabel = document.createElement("div");
    aliasLabel.setAttribute("id","alias_label");
    aliasLabel.setAttribute("title","This is this user's alias. Click to refresh.");
    if(Cookies.get("alias_"+currentUser) !== undefined && Cookies.get("alias_"+currentUser) !== null) {
        aliasLabel.innerHTML = Cookies.get("alias_"+currentUser);
    }
    $("#alias_button").after(aliasLabel);

    $("#alias_button").on("click", function(){
        if(Cookies.get("alias_"+currentUser) !== undefined) {
            alert("This user already has an alias. This will overwrite their current alias. Press cancel to cancel. Leave empty for no alias.");
        }
        var input = prompt("Enter an alias for "+currentUser+":","");
        console.log(input);
        Cookies.set("alias_"+currentUser,input);
        $("#alias_label").trigger("click");
    });

    $("#alias_label").on("click", function(){
        if(Cookies.get("alias_"+currentUser) !== undefined && Cookies.get("alias_"+currentUser) !== null) {
            aliasLabel.innerHTML = Cookies.get("alias_"+currentUser);
        }
        else {
            aliasLabel.innerHTML = "";
        }
    });

}
