/*
*  Chat.js
*
*  Manages all things related to the chat on all pages
*
*/

var $form = $('[name=\'chatbox_form\']');
var $submit = $('[name=\'chat_submit\']');
var $chat_text = $('#chat_text');
var $file = $('[name=\'attachment\']');

function refreshChat() {
    var chatHistory = [];
    var sumResponse = [];
    console.log('Trying to refresh the chat.')
    jQuery.get('scripts/auto_refresh_home.php',function(response1){
        response1 = JSON.parse(response1);
        //console.log(response1);
        sumResponse = response1;
        jQuery.getJSON('api/chat_messages.php',function(response2){
            //console.log('Retreived entire chat log');
            //console.log(response2);
            sumResponse[2] = response2;
            //console.log(sumResponse);
            onSumResponse2(JSON.stringify(sumResponse));
        });
    });
}

function disableForm() {
    console.log('Disabled HTML chat form');
    $submit.attr('type','button');
    $form.changeElementType('div');
}

function enableForm() {
    console.log('Enabled HTML chat form');
    $submit.attr('type','submit');
    $form.changeElementType('form');
}

function sendChatMessage() {

    //If there is NO file attached
    if($file[0].files.length === 0) {
        console.log('No files detected to be attached. Using jQuery to post chat.');
        jQuery.post('scripts/chat_post.php', {
            "chat_text": $chat_text.val()
        }, function(res){
            console.log('Done');
            $chat_text[0].value = '';
            refreshChat();
        });

    }
    else {
        //If there is, do it the old fashion way.
        enableForm();
        $submit.trigger('click');
    }

}

if(window.location.pathname === '/home.php') {
    disableForm();
    $submit.on('click',function(event) {
        //Recursion preventative from li
        if(event.originalEvent) {
            sendChatMessage();
        }
    });
    $chat_text.on('keyup', function(event){
        if(event.keyCode === 13) {
            console.log(event.keyCode);
            sendChatMessage();
        }
    });


    //refreshChat();
    var refreshButton = document.createElement('span');
    refreshButton.setAttribute('id','refresh_button');
    refreshButton.setAttribute('title','Refresh the chat');
    refreshButton.innerHTML = '@';
    var refreshButton2 = document.createElement('span');
    refreshButton2.setAttribute('id','refresh_button2');
    refreshButton2.setAttribute('title','Refresh the chat');
    refreshButton2.innerHTML = '$';
    var refreshButton3 = document.createElement('span');
    refreshButton3.setAttribute('id','refresh_button3');
    refreshButton3.setAttribute('title','Refresh the chat');
    refreshButton3.innerHTML = '%';

    $('[name=\'chat_submit\']').after(refreshButton3);
    $('[name=\'chat_submit\']').after(refreshButton2);
    $('[name=\'chat_submit\']').after(refreshButton);

    $('#refresh_button').on('click',refreshChat);
    $('#refresh_button2').on('click',function(){
        jQuery.getJSON('api/chat_messages.php',function(res){
            console.log(res);
        });
    });
    $('#refresh_button3').on('click',function(){
        jQuery.get('scripts/auto_refresh_home.php',function(res){
            console.log(res);
        });
    });

}
