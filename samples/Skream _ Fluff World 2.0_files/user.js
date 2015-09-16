function showColorForm()
{
	document.getElementById("user_pic_change_form").style.display = "none";
	setTimeout(function(){ document.getElementById("user_pic_change_form").style.opacity = "100";}, 0);
	document.getElementById("user_color_form").style.display = "block";
	setTimeout(function(){ document.getElementById("user_color_form").style.opacity = "100"; document.getElementById("user_color_form").style.height = "150px";}, 50);
}

function showPicForm()
{
	document.getElementById("user_pic_change_form").style.display = "block";
	setTimeout(function(){ document.getElementById("user_pic_change_form").style.opacity = "100";}, 50);
	document.getElementById("change_color_button").style.display = "none";
	document.getElementById("user_color_form").style.display = "none";
	document.getElementById("user_color_form").style.opacity = "0";
	document.getElementById("user_color_form").style.height = "0px";
}