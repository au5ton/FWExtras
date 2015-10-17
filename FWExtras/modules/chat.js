/*
*  Chat.js
*
*  Manages all things related to the chat on all pages
*
*/

var _chatHistory = [];

$(document).ready(function(){
    if(window.location.pathname === '/home.php') {

        titleText = document.title;

        $('#online_users_title').on('click',function(){
            Materialize.toast('I am a toast!', 60000);
        })

        var $form = $('[name=\'chatbox_form\']');
        var $submit = $('[name=\'chat_submit\']');
        var $chat_text = $('#chat_text');
        var $file = $('[name=\'attachment\']');

        var postingChat = false;

        function getLastChatId() {
            return parseInt($('#chatbox > .msg_container > [data-msgid]')[$('#chatbox > .msg_container > [data-msgid]').length-1].getAttribute('data-msgid'))
        }

        //Creates a new
        var refreshIntervalId = setInterval(function() {
            lastcbpid = getLastChatId();
            console.log('Most recent chat message has id of: ',lastcbpid);
            refreshChat();
        },5000);
        console.log('Refreshing chat with new code at id: ',refreshIntervalId);

        function refreshChat() {
            var chatHistory = [];
            var sumResponse = [];
            console.log('Trying to refresh the chat.')
            jQuery.get('scripts/auto_refresh_home.php',function(response1){
                response1 = JSON.parse(response1);
                sumResponse = response1;
                jQuery.getJSON('api/chat_messages.php',function(response2){
                    sumResponse[2] = response2;
                    onSumResponse(JSON.stringify(sumResponse));
                });
            });
        }

        function disableForm() {
            console.log('Disabled HTML chat form');
            $submit.attr('type','button');
            $form.changeElementType('div');
            $form = $('[name=\'chatbox_form\']');
        }

        function enableForm() {
            console.log('Enabled HTML chat form');
            $submit.attr('type','submit');
            $form.changeElementType('form');
            $form = $('[name=\'chatbox_form\']');
        }

        function sendChatMessage() {

            //If there is NO file attached
            if($file[0].files.length === 0) {
                console.log('No files detected to be attached. Using jQuery to post chat.');
                jQuery.post('scripts/chat_post.php', {
                    "chat_text": $chat_text.val()
                }, function(res){
                    console.log('Done POSTing chat!');
                    Materialize.toast('Chat message posted.', 3000);
                    refreshChat();
                });
                $chat_text[0].value = '';

            }
            else {
                //If there is, do it the old fashion way.
                enableForm();
                $submit.trigger('click');
            }

        }

        disableForm();
        $submit.on('click',function(event) {
            //Recursion preventative from manual $.trigger() above
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

    }
});
