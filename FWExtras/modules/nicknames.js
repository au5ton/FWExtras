/*
*  Aliases.js
*
*  Manages all things related to aliases on all pages
*  Referred to as 'names' internally because I type 'alias' wrong too many times
*
*/

$(document).ready(function(){
    if(window.location.pathname === '/user.php') {

        var names = {
            data: {}
        };

        function hasAlias(username) {
            if(username) {
                if(names.data[currentUser] !== undefined && names.data[currentUser] !== null) {
                    return true;
                }
                return false;
            }
            else {
                if(names.data[currentUser] !== undefined && names.data[currentUser] !== null) {
                    return true;
                }
                return false;
            }
        }

        chrome.storage.sync.get('names', function(items) {
            if(jQuery.isEmptyObject(items)) {
                //No previous record of names, likely a first run
                console.log('Empty object loaded, likely a first run');
                chrome.storage.sync.set({'names': names});
            }
            else {
                names = items.names;
                console.log('Names loaded');
            }

            if(hasAlias()) {
                nameLabel.innerHTML = names.data[currentUser];
            }
            else {
                nameLabel.innerHTML = '';
            }
        });

        var currentUser = $('#js_username').html();
        var nameButton = document.createElement('span');
        nameButton.setAttribute('id','name_button');
        nameButton.setAttribute('title','Edit this user\'s alias');
        nameButton.innerHTML = '+';
        var nameLabel = document.createElement('div');
        nameLabel.setAttribute('id','name_label');
        nameLabel.setAttribute('title','This is this user\'s alias. Click to refresh.');

        $('#js_username').after(nameButton);
        $('#name_button').after(nameLabel);

        if(hasAlias()) {
            nameLabel.innerHTML = names.data[currentUser];
        }
        else {
            nameLabel.innerHTML = '';
        }

        jQuery.get('scripts/auto_refresh_home.php',function(res){
            console.log(JSON.parse(res));
            res = JSON.parse(res);
            if(currentUser == res[1]) {
                document.getElementById('profile_visits').innerHTML += ("; <br>Fluff World member ID: "+res[0]);
            }
        });

        $('#name_button').on('click', function(){
            if(hasAlias()) {
                console.log('User already has name, will replace with new name');
                alert('This user already has an alias. This will overwrite their current alias. Press cancel to cancel. Leave empty for no alias.');
            }
            var input = prompt('Enter an alias for '+currentUser+':','');
            if(input === null) {
                //Cancel button pressed
                console.log('Name replace cancelled');
            }
            else if(input !== undefined && input !== null) {
                //Legit input was typed and pressed OK
                names.data[currentUser] = input;
                $('#name_label').trigger('click');
                chrome.storage.sync.set({'names': names}, function() {
                    console.log('Names updated:');
                    console.log(names);

                });
            }
        });

        $('#name_label').on('click', function(){
            if(hasAlias()) {
                nameLabel.innerHTML = names.data[currentUser];
            }
            else {
                nameLabel.innerHTML = '';
            }
        });

    }
});
