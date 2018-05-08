/**
 * NOTE: This approach is a mixture of Self-Executing Anonymous Function and Revealing Module Pattern.
 * 		 Parameters below are explained as follows;
 * 		 1) Any reference to Base will equate to window.Base.
 * 			If it is already defined, the existing definition will be used.
 * 			Thereby allowing our definitions to be appended to the existing one.
 * 			If it is not defined yet, all we get is {}
 * 			(look at 'window.Base = window.Base || {}' on bottom of script).
 * 			So in any case, our definitions will be available in any reference of Base.
 *  	 2) Make sure any reference to $ within this script refers to jQuery.
 *  		This is because it is possible that $ refers to other libraries as well,
 *  		i.e. calling jQuery.noConflict() while using script.aculo.us
 *  	 3) Make sure undefined uses it's default value, which is undefined.
 *  		This is because undefined can be "redefined" to another value.
 *  		Since our first line of code has 3 arguments, and the bottom line
 *  		only has two, the third argument, which is undefined, will evaluate
 *  		to undefined. Therefore, any reference to undefined within our script
 *  		will not produce any unexpected results.
 */
(function( Base, $, undefined ) {

	var base = null;
	var instance = function() {
		base = this;
	};

	/**
	 * Extend definition of Base, and add our own definitions
	 */
	$.extend(true, instance.prototype, {

		_documentReadyFunctions : {
			//prefix functions here with "class" name, i.e. <js name>_documentReady
		},

		documentReady : function() {
			var _this = this;
			$.each(base._documentReadyFunctions, function(index, element){
				element(_this); //call each merged _documentReadyFunctions
			});
		}
	});

	window.Base = instance;
}( window.Base = window.Base || {}, jQuery ));
