function closeMessage(e)
{
	e.style.opacity = 0;
	setTimeout(function(){ e.style.display = "none"; }, 1000);
}

function getFont(font_val)
{
	var font = "Arial";
	var name = "undefined";
	switch(font_val)
	{
		case '1':
			font = "Arial, Helvetica, sans-serif";
			name = "Arial";
			break;
		case '2':
			font = "'Palatino Linotype', 'Book Antiqua', Palatino, serif";
			name = "Palatino Linotype";
			break;
		case '3':
			font = "Tahoma, Geneva, sans-serif";
			name = "Tahoma";
			break;
		case '4':
			font = "Georgia, serif";
			name = "Georgia";
			break;
		case '5':
			font = "'Times New Roman', Times, serif";
			name = "Times New Roman";
			break;
		case '6':
			font = "'Comic Sans', 'Comic Sans MS', 'Chalkboard', 'ChalkboardSE-Regular', sans-serif";
			name = "Comic Sans MS";
			break;
		case '7':
			font = "Impact, Charcoal, sans-serif";
			name = "Impact";
			break;
		case '8':
			font = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
			name = "Lucida Sans";
			break;
		case '9':
			font = "'Trebuchet MS', Helvetica, sans-serif";
			name = "Trebuchet MS";
			break;
		case '10':
			font = "Verdana, Geneva, sans-serif";
			name = "Verdana";
			break;
		case '11':
			font = "'Courier New', Courier, monospace";
			name = "Courier New";
			break;
		case '12':
			font = "'Lucida Console', Monaco, monospace";
			name = "Lucida Console";
			break;
		case '13':
			font = "Copperplate, 'Copperplate Gothic', sans-serif";
			name = "Copperplate Gothic";
			break;
		case '14':
			font = "'Gill Sans', 'Gill Sans MT', sans-serif";
			name = "Gill Sans";
			break;
		case '15':
			font = "script, cursive, sans-serif";
			name = "Cursive";
			break;
	}
	return font;
}