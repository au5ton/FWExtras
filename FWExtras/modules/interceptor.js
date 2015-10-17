/*
*  Interceptor.js
*
*  Manages all things related to requests and re-routing them
*
*/

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

//Redirects asset requests to local copies for speed
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details);
        //return {redirectUrl: ""};
    },
    {urls: ["*://108.197.28.233/*"]},
    ["blocking"]
);
