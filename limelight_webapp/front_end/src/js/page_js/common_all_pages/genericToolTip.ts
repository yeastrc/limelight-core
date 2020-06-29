/**
 * genericToolTip.ts
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
			$elements = $element.find( ".selector_tool_tip_attached" );
			//console.log($element);
			//console.log($elements);
		} else {
			$elements = $(".selector_tool_tip_attached" );
		}
		
		$elements.each( function(  ) {
			
			const $this = $( this );
	
			//console.log( "Adding handler to:" );
			//console.log( $this );
		
			addSingleGenericAppSpecificToolTip( $this );

		});
	};
	

var addSingleGenericAppSpecificToolTip = function ( $element ) {
		
	let tooltipText = $element.attr("data-tooltip");			

	if ( tooltipText === undefined || tooltipText === null || tooltipText === "" ) {

		tooltipText = $element.attr("title");

		if ( tooltipText === undefined || tooltipText === null || tooltipText === "" ) {
			//  No Tooltip text so exit
			return; // EARLY RETURN
		} 

	}
		
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
