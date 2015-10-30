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

                //Redirects asset requests to local copies for speed
                if(details.type !== 'xmlhttprequest' && options.interceptor_localassets === true){
                    var requestedAsset = a.pathname;
                    if(hasLocalAsset(requestedAsset)) {
                        console.log('✅ '+chrome.extension.getURL('/assets'+requestedAsset));
                        return {redirectUrl: chrome.extension.getURL('/assets'+requestedAsset)};
                    }
                    else {
                        //console.log('❌ '+requestedAsset);
                    }
                }

            },
            {urls: ["*://108.197.28.233/*"]},["blocking"]
        );

    });

});
