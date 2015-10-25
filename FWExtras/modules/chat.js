/*
*  Chat.js
*
*  Manages all things related to the chat on all pages
*
*/

//TODO: update chat based on what messages are currently in the DOM (check every element and keep track of it in an object!), not what the newest one is
//TODO: display indicator if a chat message is still in-progress of sending

var _chatHistory = [];
var _loadedChatIds = [];

function refreshLoadedChatIds() {
    _loadedChatIds = [];
    var chats = $('.msg_rcvd');
    for(var i = 0; i < chats.length; i++) {
        _loadedChatIds.push(parseInt(chats[i].getAttribute('data-msgid')));
    }
}

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

Options.get(function(options){

    if(window.location.pathname === '/home.php' && options.chat_base === true) {

        function problemMessage(err,txt) {
            console.log('session expired', err, txt);
            Materialize.toast('Your session has expired. Please refresh the page and log in.');
            clearInterval(refreshIntervalId);
        }

        $.ajax({
            url: "/api/chat_messages.php",
            type: 'get',
            error: function(XMLHttpRequest, textStatus, errorThrown){
                //alert('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
                problemMessage(XMLHttpRequest.status, XMLHttpRequest.statusText);
            },
            success: function(data){
                _chatHistory = JSON.parse(data).reverse();
            }
        });


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
            try {
                lastcbpid = getLastChatId();
                refreshChat();
            }
            catch(err) {
                console.log(err);
            }
        },5000);
        console.log('Refreshing chat with interval id: ', refreshIntervalId);

        function refreshChat() {
            try {
                var chatHistory = [];
                var sumResponse = [];
                console.log('Trying to refresh the chat.')

                $.ajax({
                    url: "/api/chat_messages.php",
                    type: 'get',
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        problemMessage(XMLHttpRequest.status, XMLHttpRequest.statusText);
                    },
                    success: function(data){

                        try {
                            data = JSON.parse(data);
                        }
                        catch(err) {
                            problemMessage(err);
                        }

                        chatHistory = data.reverse();

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

                        $.ajax({
                            url: "/scripts/auto_refresh_home.php",
                            type: 'get',
                            error: function(XMLHttpRequest, textStatus, errorThrown){
                                problemMessage(XMLHttpRequest.status, XMLHttpRequest.statusText);
                            },
                            success: function(data){
                                try {
                                    data = JSON.parse(data);
                                }
                                catch(err) {
                                    problemMessage()
                                }
                                sumResponse = data;
                                sumResponse[2] = _chatHistory;
                                onSumResponse(JSON.stringify(sumResponse), undefined, options.visuals_emoji);
                                lastcbpid = getLastChatId();
                            }
                        });

                    }
                });
            }
            catch(err) {
                console.log(err);
                problemMessage();
            }

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
                //console.log(event.keyCode);
                sendChatMessage();
            }
        });

    }


});
