/*
 *  Visual.js
 *
 *  Manages all things related to visual-only tweaks on all pages
 *
 */


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

});
