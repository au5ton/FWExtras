try {
	(function($) {
		$.fn.changeElementType = function(newType) {
			var attrs = {};

			$.each(this[0].attributes, function(idx, attr) {
				attrs[attr.nodeName] = attr.nodeValue;
			});

			this.replaceWith(function() {
				return $("<" + newType + "/>", attrs).append($(this).contents());
			});
		}
		//Thanks: http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery
	})(jQuery);
}
catch(err) {
	console.err("You likely don't have jQuery loaded because I got an error over here lol.")
}
