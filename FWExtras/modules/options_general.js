/*
*  options_general.js
*
*  Methods and things relevant to both options_foreground.js and options_background.js
*
*/


var _optionsChangedEvent = new Event('FWExtrasOptionsUpdated');
var _optionsLoadedEvent = new Event('FWExtrasOptionsLoaded');

var _globalOptions = {};

// Saves options to chrome.storage
function save_options() {
    var chat_base = document.getElementById('chat_base').checked;
    var nicknames_base = document.getElementById('nicknames_base').checked;
    var interceptor_localassets = document.getElementById('interceptor_localassets').checked;
    var mentions_pane = document.getElementById('mentions_pane').checked;
    var mentions_highlighter = document.getElementById('mentions_highlighter').checked;
    var blackjack_base = document.getElementById('blackjack_base').checked;
    var loteria_suggestions = document.getElementById('loteria_suggestions').checked;
    _globalOptions = {
        chat_base: chat_base,
        nicknames_base: nicknames_base,
        interceptor_localassets: interceptor_localassets,
        mentions_pane: mentions_pane,
        mentions_highlighter: mentions_highlighter,
        blackjack_base: blackjack_base,
        loteria_suggestions: loteria_suggestions
    };
    chrome.storage.local.set({
        chat_base: chat_base,
        nicknames_base: nicknames_base,
        interceptor_localassets: interceptor_localassets,
        mentions_pane: mentions_pane,
        mentions_highlighter: mentions_highlighter,
        blackjack_base: blackjack_base,
        loteria_suggestions: loteria_suggestions
    }, function() {
        // Update status to let user know options were saved.
        Materialize.toast('Options saved.',4000);
        chrome.runtime.sendMessage({
            greeting: 'GlobalOptionsUpdated',
            globalOptions: _globalOptions
        });
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(atOptionsPage) {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get({
        chat_base: true,
        nicknames_base: true,
        interceptor_localassets: false,
        mentions_pane: false,
        mentions_highlighter: false,
        blackjack_base: false,
        loteria_suggestions: false
    }, function(items) {
        if(atOptionsPage === true) {
            document.getElementById('chat_base').checked = items.chat_base;
            document.getElementById('nicknames_base').checked = items.nicknames_base;
            document.getElementById('interceptor_localassets').checked = items.interceptor_localassets;
            document.getElementById('mentions_pane').checked = items.mentions_pane;
            document.getElementById('mentions_highlighter').checked = items.mentions_highlighter;
            document.getElementById('blackjack_base').checked = items.blackjack_base;
            document.getElementById('loteria_suggestions').checked = items.loteria_suggestions;
            Materialize.toast('Options restored.',4000);
            document.dispatchEvent('FWExtrasOptionsLoaded');
        }
        _globalOptions = items;
        chrome.runtime.sendMessage({
            greeting: 'GlobalOptionsLoaded',
            globalOptions: _globalOptions
        });
        //console.log(_globalOptions);
    });
}
