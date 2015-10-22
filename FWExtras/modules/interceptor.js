/*
*  Interceptor.js
*
*  Manages all things related to requests and re-routing them
*
*/

var _localAssetIndexLoadedEvent = new Event('FWExtrasLocalAssetIndexLoaded');
var _assetIndex = [];
var _globalOptions = {};


jQuery.get(chrome.extension.getURL('../assets/index.json'), function(data){
    _assetIndex = JSON.parse(data);
    document.dispatchEvent(_localAssetIndexLoadedEvent);
    console.log('Local asset index loaded.');
});

function hasLocalAsset(path){
    for(var i = 0; i < _assetIndex.length; i++) {
        if(_assetIndex[i] === path) {
            return true;
        }
    }
    return false;
}

$(document).on('FWExtrasLocalAssetIndexLoaded', function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.greeting === 'GlobalOptionsLoaded' || request.greeting === 'GlobalOptionsUpdated') {
            _globalOptions = request.globalOptions;
            console.log('Global options loaded or updated (background):', _globalOptions);
        }
    });

    //Blocks out the sites JavaScript chat refresher so we can use our own chat refresh code
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {

            if(_globalOptions.chat_base === true) {
                var a = document.createElement('a');
                a.href = details.url;
                //console.log(a.pathname);
                if(a.pathname === '/scripts/auto_refresh_home.js') {
                    console.log('Blocking '+a.pathname);
                    return {cancel: true};
                }
            }
            else {
                return {cancel: false};
            }

        },
        {urls: ["*://108.197.28.233/*"]},["blocking"]
    );

    //Redirects asset requests to local copies for speed
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            if(details.type !== 'xmlhttprequest' && _globalOptions.interceptor_localassets === true){

                var a = document.createElement('a');
                a.href = details.url;

                var requestedAsset = a.pathname;
                if(hasLocalAsset(requestedAsset)) {
                    console.log('✅ '+chrome.extension.getURL('/assets'+requestedAsset));
                    return {redirectUrl: chrome.extension.getURL('/assets'+requestedAsset)};
                }
                else {
                    console.log('❌ '+requestedAsset);
                }
            }
            return {redirectUrl: details.url};
        }, {urls: ["*://108.197.28.233/*"]},["blocking"]
    );
});
