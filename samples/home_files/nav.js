function showNav(name)
{
	var height = (document.getElementById(name + "_dropdown").getElementsByTagName("A").length * 40) + "px";
	document.getElementById(name + "_dropdown").style.visibility = "visible";
	document.getElementById(name + "_dropdown").style.height = height;
}

function retractAll()
{
	document.getElementById("downloads_dropdown").style.visibility = "hidden";
	document.getElementById("downloads_dropdown").style.height = "0px";
	document.getElementById("settings_dropdown").style.visibility = "hidden";
	document.getElementById("settings_dropdown").style.height = "0px";
	document.getElementById("games_dropdown").style.visibility = "hidden";
	document.getElementById("games_dropdown").style.height = "0px";
}

function hoverNav(e)
{
	e.style.color = "#FFFFFF";
	e.style.backgroundColor = "#00FF00";
}

function hoverOut(e)
{
	e.style.color = "#00FF00";
	e.style.backgroundColor = "#000000";
}