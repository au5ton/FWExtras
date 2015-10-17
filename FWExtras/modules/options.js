/*
*  Settings.js
*
*  Manages all things related to the settings pane
*  Referred to as 'names' internally because I type 'alias' wrong too many times
*
*/

var settings = document.createElement('a');
settings.setAttribute('class','dropdown_btn');
settings.removeAttribute('href');
settings.setAttribute('onmouseover','hoverNav(this);showNav(\'settings\')');
settings.setAttribute('onmouseout','hoverOut(this)');
settings.setAttribute('id','settings_button');
settings.innerHTML = 'FWExtras settings';

var config = {
    data: {}
};

$(document).ready(function(){
    $('#settings_dropdown').append(settings);

    $('#settings_button').on('click', function(){
        chrome.runtime.openOptionsPage();
    });
});

if(window.location.pathname === '/options.html') {

    $('input[type=\'checkbox\']').on('click',function(){
        console.log('hello world')
    })

    // Saves options to chrome.storage
    function save_options() {
        var likesColor = document.getElementById('like').checked;
        chrome.storage.local.set({
            likesColor: likesColor
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    function restore_options() {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.local.get({
            likesColor: true
        }, function(items) {
            document.getElementById('like').checked = items.likesColor;
        });
    }
    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('save').addEventListener('click',save_options);

}
