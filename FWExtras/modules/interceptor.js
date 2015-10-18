/*
*  Interceptor.js
*
*  Manages all things related to requests and re-routing them
*
*/

var _globalOptions = {};

chrome.storage.local.get({
    chat_base: true,
    nicknames_base: true,
    interceptor_localassets: false,
    mentions_pane: false,
    mentions_highlighter: false,
    blackjack_base: false,
    loteria_suggestions: false,
    loteria_bot: false
}, function(items) {
    _globalOptions = items;
    console.log(_globalOptions);


    if(_globalOptions.chat_base === true) {

        //Blocks out the sites JavaScript chat refresher so we can use our own chat refresh code
        chrome.webRequest.onBeforeRequest.addListener(
            function(details) {
                if(details.url.indexOf("://108.197.28.233/scripts/auto_refresh_home.js") != -1) {
                    console.log('Blocking /scripts/auto_refresh_home.js');
                }
                return {cancel: details.url.indexOf("://108.197.28.233/scripts/auto_refresh_home.js") != -1};
            },
            {urls: ["*://108.197.28.233/*"]},
            ["blocking"]
        );
    }

    if(_globalOptions.interceptor_localassets === true) {

        //Redirects asset requests to local copies for speed
        chrome.webRequest.onBeforeRequest.addListener(function(details) {
            if(details.type !== 'xmlhttprequest'){
                //console.log(details.type+'  ('+details.url+')');
                var requestedAsset = details.url.substring('http://108.197.28.233'.length);
                //console.log('requestedAsset:',requestedAsset)
                if(requestedAsset.indexOf('/loteria/') !== -1) {
                    //likely a loteria image
                    //console.log('/loteria/ file?');
                    console.log('Intercepted '+requestedAsset+' to '+chrome.extension.getURL('../assets'+requestedAsset.substring('/img'.length)));
                    return {redirectUrl: chrome.extension.getURL('../assets'+requestedAsset.substring('/img'.length))}
                }
                if(requestedAsset.indexOf('/cards/') !== -1) {
                    //likely a blackjack card
                    //console.log('/cards/ file?');
                    //console.log(chrome.extension.getURL('../assets'+requestedAsset.substring('/img'.length)))
                    console.log('Intercepted '+requestedAsset+' to '+chrome.extension.getURL('../assets'+requestedAsset.substring('/img'.length)));
                    return {redirectUrl: chrome.extension.getURL('../assets'+requestedAsset.substring('/img'.length))}
                }
                /*if(requestedAsset.indexOf('/media/') !== -1) {
                //console.log('/media/ file?');
                console.log('Intercepted '+requestedAsset+' to '+chrome.extension.getURL('../assets'+requestedAsset));
                return {redirectUrl: chrome.extension.getURL('../assets'+requestedAsset)};
            }*/
        }
        return {redirectUrl: details.url};
    }, {urls: ["*://108.197.28.233/*"]},["blocking"]);
}


});
