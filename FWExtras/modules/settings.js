/*
*  Settings.js
*
*  Manages all things related to the settings pane
*  Referred to as 'names' internally because I type 'alias' wrong too many times
*
*/

if(window.location.pathname === '/user.php') {

    var settingsButton = document.createElement('span');
    settingsButton.setAttribute('id','settings_button');
    settingsButton.setAttribute('title','Open the FWExtras settings pane.');
    settingsButton.innerHTML = '<i class="material-icons">settings</i>';

    $('#user_prof_team').after(settingsButton);

}

function openFWExtrasSettingsPane() {



}
