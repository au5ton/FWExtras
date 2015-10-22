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
            chat_base: true,
            nicknames_base: true,
            interceptor_localassets: false,
            mentions_pane: false,
            mentions_highlighter: false,
            blackjack_base: false,
            loteria_suggestions: false
        }, function(items) {
            this.loadedOptions = items;
            callback(this.loadedOptions);
        });
    };

    this.set = function(data, callback) {
        chrome.storage.local.set({
            chat_base: data.chat_base,
            nicknames_base: data.nicknames_base,
            interceptor_localassets: data.interceptor_localassets,
            mentions_pane: data.mentions_pane,
            mentions_highlighter: data.mentions_highlighter,
            blackjack_base: data.blackjack_base,
            loteria_suggestions: data.loteria_suggestions
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
