/*
*  options.js
*
*  Provides a simple API to get and set options to chrome.storage
*  Works effortlessly in content scripts and background scripts
*
*/

var Options = new Options();

function Options() {

    this.loadedOptions = {};

    this.get = function(callback) {
        chrome.storage.local.get({
            nicknames_base: true,
            interceptor_localassets: true,
            mentions_pane: false,
            mentions_highlighter: false,
            blackjack_base: false,
            loteria_base: false,
            visuals_emoji: true,
            home_online_users: true
        }, function(items) {
            this.loadedOptions = items;
            callback(this.loadedOptions);
        });
    };

    this.set = function(data, callback) {
        chrome.storage.local.set({
            nicknames_base: data.nicknames_base,
            interceptor_localassets: data.interceptor_localassets,
            mentions_pane: data.mentions_pane,
            mentions_highlighter: data.mentions_highlighter,
            blackjack_base: data.blackjack_base,
            loteria_base: data.loteria_base,
            visuals_emoji: data.visuals_emoji,
            home_online_users: data.home_online_users
        }, function() {
            callback();
        });
    };

    this.getOption = function(key, callback) {
        this.get(function(data){
            callback(data[key]);
        });
    };

    this.setOption = function(key, value, callback) {
        this.get(function(data){
            data[key] = value;
            this.set(data, function(){
                callback();
            })
        });
    };

}
