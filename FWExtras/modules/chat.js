/*
*  Chat.js
*
*  Manages all things related to the chat on all pages
*
*/

var _chatHistory = [];

jQuery.getJSON('api/chat_messages.php',function(res){
    _chatHistory = res.reverse();
});

function sortChatHistoryById(a,b) {
    //a is less than b by some ordering criterion
    if (parseInt(a['id']) < parseInt(b['id'])) {
        return -1;
    }
    //a is greater than b by the ordering criterion
    if (parseInt(a['id']) > parseInt(b['id'])) {
        return 1;
    }
    return 0;
}

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
            jQuery.getJSON('/scripts/auto_refresh_home.php', function(data){
                lastcbpid = getLastChatId();;
                refreshChat();
            });
        },5000);
        console.log('Refreshing chat with new code at id: ',refreshIntervalId);

        function refreshChat() {
            var chatHistory = [];
            var sumResponse = [];
            console.log('Trying to refresh the chat.')



            jQuery.getJSON('api/chat_messages.php',function(res){
                chatHistory = res.reverse();

                //Taking the previously stored _chatHistory and doing some processing to append only the new chat messages
                //Underscore.js (_.uniq) is a big help here.
                //Because you can't compare objects with ===, I compare the object's JSON string instead

                var _chatHistoryStrings = [];
                for(var i = 0; i < _chatHistory.length; i++) {
                    _chatHistoryStrings.push(JSON.stringify(_chatHistory[i]));
                }

                var chatHistoryStrings = [];
                for(var i = 0; i < chatHistory.length; i++) {
                    chatHistoryStrings.push(JSON.stringify(chatHistory[i]));
                }

                var uniqueChatStrings = _.uniq(_chatHistoryStrings.concat(chatHistoryStrings));
                //console.log('uniqueChatStrings.length',uniqueChatStrings.length);

                var resultingChatHistory = [];
                for(var i = 0; i < uniqueChatStrings.length; i++) {
                    resultingChatHistory.push(JSON.parse(uniqueChatStrings[i]));
                }

                _chatHistory = resultingChatHistory;

                jQuery.get('scripts/auto_refresh_home.php',function(res2){
                    res2 = JSON.parse(res2);
                    sumResponse = res2;
                    sumResponse[2] = _chatHistory;
                    onSumResponse(JSON.stringify(sumResponse));
                    lastcbpid = getLastChatId();
                });


            });


            // jQuery.get('/scripts/auto_refresh_home.php',function(response1){
            //     response1 = JSON.parse(response1);
            //     sumResponse = response1;
            //     jQuery.getJSON('api/chat_messages.php',function(response2){
            //         sumResponse[2] = response2.reverse();
            //         //$('#chatbox').empty();
            //         onSumResponse(JSON.stringify(sumResponse));
            //     });
            // });
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
