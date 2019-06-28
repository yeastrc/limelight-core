/**
 * genericToolTip.js
 * 
 * Javascript for Generic tool tip  
 * 
 * uses jQuery QTip2 plugin
 * 
 */	


//  Just define these functions again and attach to window

	
var addToolTips = function ( $element ) {

		var $elements;
		
		if( $element != undefined ) {
			$elements = $element.find( ".tool_tip_attached_jq" );
			//console.log($element);
			//console.log($elements);
		} else {
			$elements = $(".tool_tip_attached_jq" );
		}
		
		$elements.each( function(  ) {
			
			var $this = $( this );
	
			//console.log( "Adding handler to:" );
			//console.log( $this );
		
			addSingleGenericAppSpecificToolTip( $this );

		});
	};
	

var addSingleGenericAppSpecificToolTip = function ( $element ) {
		
		var tooltipText = $element.attr("data-tooltip");			
		
		$element.qtip( {
	        content: {
	            text: tooltipText
	        },
			position: {
				target: 'mouse',
				adjust: { x: 5, y: 5 }, // Offset it slightly from under the mouse
	            viewport: $(window)
	         }
	    });		
		
	};
	
export { addToolTips, addSingleGenericAppSpecificToolTip }
