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

$('.dropdown_btn[href="user.php"]').after(settings);

$('#settings_button').on('click', function(){
    openFWExtrasSettingsPane();
});

function openFWExtrasSettingsPane() {

    alert('You opened the settings pane!');

}
