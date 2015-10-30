/*
*  Online_users.js
*
*  Updates the currently online users on the home page
*
*/

var _online_users_refresh_interval;

Options.get(function(options){

    if(window.location.pathname === '/home.php' && options.home_online_users === true && false) {
        $(document).ready(function(){

            var elem_online_users = document.getElementById('online_users');
            var elem_online_users_box = document.createElement('div'); //Everything goes in this box
            
            var elem_online_users_title = document.getElementById('online_users_title');
            var $online_users = $('#online_users');
            $online_users.empty();
            var $online_users_title = $('#online_users_title');
            var elem_hidden_users;
            var elem_hidden_users_count;
            if(document.getElementById('hidden_users') === null) {
                //currently no hidden users, but there could be in the future
                elem_hidden_users = document.createElement('div');
                elem_hidden_users.setAttribute('id','hidden_users');
                elem_hidden_users_count = document.createElement('span');
                elem_hidden_users_count.innerHTML = '0';
                elem_hidden_users_count.style.color = '#00FF00';
                elem_hidden_users.appendChild(elem_hidden_users_count);
                elem_hidden_users.innerHTML += ' hidden users';
                $online_users.append(elem_hidden_users);
            }
            else {
                elem_hidden_users = document.getElementById('hidden_users');
                elem_hidden_users_count = elem_hidden_users.firstChild;
            }




            /*
            <a href="user.php?name=soot" class="online_users_list" style="color: #d6e3ef; background-color: #01579b; font-family: 'Lucida Console', Monaco, monospace">soot</a>

            <div id="hidden_users"><span style="color: #00FF00">1</span> hidden user</div>
            */


            _online_users_refresh_interval = setInterval(function(){
                $.ajax({
                    url: "/api/online_users.php",
                    type: 'get',
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        console.log('oopsies');
                    },
                    success: function(data){
                        data = JSON.parse(data);
                        console.log('hidden users: ', data['hidden_users']);
                        elem_hidden_users_count.innerHTML = data['hidden_users'];
                        delete data['hidden_users'];
                        var array = $.map(data, function(value, index) {
                            return [value];
                        });
                        console.log(array);

                        for(var i = array.length-1; i >= 0; i--) {
                            //console.log(array[i]);
                            var user = document.createElement('a');
                            user.setAttribute('href','user.php?name='+array[i]['username']);
                            user.setAttribute('class','online_users_list');
                            user.innerHTML = array[i]['username'];
                            user.style.color = array[i]['color'];
                            user.style.backgroundColor = array[i]['secondary_color'];
                            user.style.fontFamily = array[i]['font'];
                            $online_users_title.after(user);
                            $online_users_title.after(', ');
                        }

                    }
                });
            },10000);
        });
    }

});
