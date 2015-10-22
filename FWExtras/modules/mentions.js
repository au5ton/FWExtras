/*
*  Mentions.js
*
*  Manages all things related to the mentions of your username in the chat
*
*/

function getChatMessageStrings() {
    var strs = [];
    for(var i = 0; i < _chatHistory.length; i++) {
        //strs.push(_chatHistory[i]['mes'])
        console.log(_chatHistory[i]);
    }
}

Options.get(function(options){
  $(document).on('FWExtrasChatHistoryInitialLoad', function(){

      if(window.location.pathname === '/home.php' && options.mentions_highlighter === true) {
          //getChatMessageStrings();
          console.log('hello world?', _chatHistory);

      }

  });
});
