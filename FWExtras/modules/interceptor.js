/*
*  Interceptor.js
*
*  Manages all things related to requests and re-routing them
*
*/

var _localAssetIndexLoadedEvent = new Event('FWExtrasLocalAssetIndexLoaded');
var _assetIndex = [];

function hasLocalAsset(path){
    for(var i = 0; i < _assetIndex.length; i++) {
        if(_assetIndex[i] === path) {
            return true;
        }
    }
    return false;
}

jQuery.get(chrome.extension.getURL('../assets/index.json'), function(data){
    _assetIndex = JSON.parse(data);
    console.log('Local asset index loaded.');

    Options.get(function(options){

        console.log('Options loaded:', options);

        //Blocks out the sites JavaScript chat refresher so we can use our own chat refresh code
        chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
                var a = document.createElement('a');
                a.href = details.url;
                if(options.chat_base === true) {
                    //console.log(a.pathname);
                    if(a.pathname === '/scripts/auto_refresh_home.js') {
                        console.log('Blocking '+a.pathname);
                        return {cancel: true};
                    }
                }
                else {
                    if(a.pathname === '/scripts/auto_refresh_home.js') {
                        console.log('NOT blocking '+a.pathname);
                    }
                    return {cancel: false};
                }

            },
            {urls: ["*://108.197.28.233/*"]},["blocking"]
        );

        //Redirects asset requests to local copies for speed
        chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
                if(details.type !== 'xmlhttprequest' && options.interceptor_localassets === true){

                    var a = document.createElement('a');
                    a.href = details.url;

                    var requestedAsset = a.pathname;
                    if(hasLocalAsset(requestedAsset)) {
                        console.log('✅ '+chrome.extension.getURL('/assets'+requestedAsset));
                        return {redirectUrl: chrome.extension.getURL('/assets'+requestedAsset)};
                    }
                    else {
                        //console.log('❌ '+requestedAsset);
                    }
                }
                return {redirectUrl: details.url};
            }, {urls: ["*://108.197.28.233/*"]},["blocking"]
        );

    });

});
