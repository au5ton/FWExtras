/*
*  options_foreground.js
*
*  Manages all things related to the settings pane and its seeds
*
*/

var atOptionsPage = true;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.greeting === 'GlobalOptionsLoaded' || request.greeting === 'GlobalOptionsUpdated') {
        _globalOptions = request.globalOptions;
        console.log('Global options loaded or updated (foreground):', _globalOptions);
    }
});

if(window.location.pathname === '/options.html') {
    restore_options(true);
    document.getElementById('save').addEventListener('click',save_options);
}
else {
    restore_options();
}
