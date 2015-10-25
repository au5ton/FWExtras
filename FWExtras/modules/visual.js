/*
*  Visual.js
*
*  Manages all things related to visual-only tweaks on all pages
*
*/

function addEmojisToBody(selector) {
    if(selector === undefined) {
        selector = '.msg_rcvd, .msg_sent, span';
    }
    var all_path = chrome.extension.getURL('/assets/unicode/');
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

    $(selector).emoji();
}

function emoji_replace_colons(text) {
    var all_path = chrome.extension.getURL('/assets/unicode/');
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
    return emoji.replace_colons(text);
}


$(document).ready(function(){

    var _optionsElement = document.createElement('a');
    _optionsElement.setAttribute('class','dropdown_btn');
    _optionsElement.setAttribute('href',chrome.extension.getURL('options.html'));
    _optionsElement.setAttribute('target','_blank');
    _optionsElement.setAttribute('onmouseover','hoverNav(this);showNav(\'settings\')');
    _optionsElement.setAttribute('onmouseout','hoverOut(this)');
    _optionsElement.setAttribute('id','options_button');
    _optionsElement.innerHTML = 'FWExtras options';

    $('#settings_dropdown').append(_optionsElement);

    if(window.location.pathname === '/user.php') {
        if(getQueryVariable('name') === 'soot') {
            Materialize.toast('Thanks for using FWExtras! Please let me know of anything bad with it. <3', 10000);
        }
    }

    Options.get(function(options){
        var _emoji = document.createElement('img');
        var _link = document.createElement('a');
        if(options.visuals_emoji === true) {
            addEmojisToBody();
            _emoji.setAttribute('src',chrome.extension.getURL('/assets/unicode/2705.png')); //green checkmark
            _emoji.setAttribute('title','Emoji is enabled and should work in the chat.');
            _link.setAttribute('href','http://www.emoji-cheat-sheet.com/');
            _link.setAttribute('target','_blank');
            _link.appendChild(_emoji);
        }
        else {
            _emoji.setAttribute('src',chrome.extension.getURL('/assets/unicode/274c.png')); //red X
            _emoji.setAttribute('title','Emoji isn\'t enabled. :(');
        }
        _emoji.setAttribute('id','emoji_indicator');

        var rect = document.getElementById('settings_dropdown').getBoundingClientRect();

        _emoji.style.position = 'absolute';
        _emoji.style.top = (rect.top - 13)+'px';
        _emoji.style.left = (rect.left + rect.width + 15)+'px';
        if(options.visuals_emoji === true) {
            $(document.body).append(_link);
        }
        else {
            $(document.body).append(_emoji);
        }
    });

});

window.onresize = function() {
    var settings_rect = document.getElementById('settings_dropdown').getBoundingClientRect();
    $('#emoji_indicator').css('top', (settings_rect.top - 13)+'px');
    $('#emoji_indicator').css('left', (settings_rect.left + settings_rect.width + 15)+'px');
};
