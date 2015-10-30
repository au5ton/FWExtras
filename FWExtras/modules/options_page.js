/*
*  options_page.js
*
*  Content script for the options.html page
*
*/

document.write('This background page is intentionally blank. Please press Ctrl+Shift+I to open the dev tools.');

var needsReload = false;

var optionsThatNeedRestart = [
    'interceptor_localassets'
];

$('input[type=\'checkbox\']').change(function(){
    for(var i = 0; i < optionsThatNeedRestart.length; i++) {
        if(this.getAttribute('id') === optionsThatNeedRestart[i]) {
            needsReload = true;
        }
    }
});

$('.cool').on('click', function(){
    Materialize.toast('<img class="emoji" src="img/warning.png"><h5>Reloading in 2 seconds.</h5>',2000);
    window.onbeforeunload = function () {
        return "Please let the extension reload first.";
    };
    setTimeout(function(){
        window.onbeforeunload = undefined;
        chrome.runtime.reload();
    },2000);
});

$('.tv').on('click', function(){
  chrome.tabs.create({url: chrome.extension.getURL('_generated_background_page.html')});
});

//http://developer.chrome.com/extensions/runtime.html#method-reload

// Saves options to chrome.storage
function save_options() {
    var nicknames_base = document.getElementById('nicknames_base').checked;
    var interceptor_localassets = document.getElementById('interceptor_localassets').checked;
    var mentions_pane = document.getElementById('mentions_pane').checked;
    var mentions_highlighter = document.getElementById('mentions_highlighter').checked;
    var blackjack_base = document.getElementById('blackjack_base').checked;
    var loteria_base = document.getElementById('loteria_suggestions').checked;
    var visuals_emoji = document.getElementById('visuals_emoji').checked;
    var home_online_users = document.getElementById('home_online_users').checked;
    Options.set({
        nicknames_base: nicknames_base,
        interceptor_localassets: interceptor_localassets,
        mentions_pane: mentions_pane,
        mentions_highlighter: mentions_highlighter,
        blackjack_base: blackjack_base,
        loteria_base: loteria_base,
        visuals_emoji: visuals_emoji,
        home_online_users: home_online_users
    }, function() {
        // Update status to let user know options were saved.
        if(needsReload === true) {
            Materialize.toast('<img class="emoji" src="img/warning.png"><h5>Your options have been saved, but a reload is required for them to take effect. Reloading in 2 seconds.</h5>',2000);
            window.onbeforeunload = function () {
                return "Please let the extension reload first.";
            };
            setTimeout(function(){
                window.onbeforeunload = undefined;
                chrome.runtime.reload();
            },2000);
            needsReload = false;
        }
        else {
            Materialize.toast('Options saved.',4000);
            restore_options();
        }
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage
function restore_options() {
    Options.get(function(items) {
        document.getElementById('nicknames_base').checked = items.nicknames_base;
        document.getElementById('interceptor_localassets').checked = items.interceptor_localassets;
        document.getElementById('mentions_pane').checked = items.mentions_pane;
        document.getElementById('mentions_highlighter').checked = items.mentions_highlighter;
        document.getElementById('blackjack_base').checked = items.blackjack_base;
        document.getElementById('loteria_base').checked = items.loteria_base;
        document.getElementById('visuals_emoji').checked = items.visuals_emoji;
        document.getElementById('home_online_users'.checked = items.home_online_users;
        Materialize.toast('Options restored.',4000);
    });
}

if(window.location.pathname === '/options.html') {
    document.getElementById('save').addEventListener('click',save_options);

    Options.get(function(options){
        if(options.visuals_emoji === true) {
            var all_path = '/assets/unicode/';
            emoji.img_path = all_path;
            emoji.use_sheet = false;
            emoji.img_set = 'apple';
            emoji.text_mode = false;
            emoji.replace_mode = 'img';
            emoji.supports_css = false;
            emoji.include_title = true;
            emoji.img_sets = {
                'apple'    : {'path' : all_path, 'sheet' : '/emoji-data/sheet_apple_64.png', 'mask' : 1 },
                'google'   : {'path' : all_path, 'sheet' : '/emoji-data/sheet_google_64.png', 'mask' : 2 },
                'twitter'  : {'path' : all_path, 'sheet' : '/emoji-data/sheet_twitter_64.png', 'mask' : 4 },
                'emojione' : {'path' : all_path, 'sheet' : '/emoji-data/sheet_emojione_64.png', 'mask' : 8 }
            };

            $('span').emoji();
        }
    });

}
restore_options();
