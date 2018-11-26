/**
 * Code related to displaying the table containing the data
 */

"use strict";

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';


export class TableDisplayHandler {

    constructor( params ) {
	
    }

	/**
	 * Get 'uniqueId' for the row in the table for the provided DOM element reference.
	 * 
	 * @param {*} param0 
	 */
    getRowUniqueIdForDOMElement( { domElement } ) {

    	const $jQueryDOMElement = $( domElement );
    	return this.getRowUniqueIdForJQueryDOMElement( { $jQueryDOMElement } );
    }

	/**
	 * Get 'uniqueId' for the row in the table for the provided jQuery DOM element reference.
	 * 
	 * @param {*} param0 
	 * return undefined if table row element not found
	 */
    getRowUniqueIdForJQueryDOMElement( { $jQueryDOMElement } ) {

    	let $jQueryDOMElementForRow = undefined;
    	
    	if ( $jQueryDOMElement.hasClass( "selector_data_table_row" ) ) {
    		$jQueryDOMElementForRow = $jQueryDOMElement;
    	} else {
    		$jQueryDOMElementForRow = $jQueryDOMElement.closest( ".selector_data_table_row" );
    		if ( $jQueryDOMElementForRow.length === 0 ) {
    			return undefined
    		}
    	}
    	
    	const uniqueId = $jQueryDOMElementForRow.data( "id" );
    	return uniqueId;
    }

	/**
	 * Ensure the supplied column id is first in sort priority
	 * for the given table.
	 * 
	 * @param {*} param0 
	 */
    setSortPriority( { tableStateObject, columnId } ) {
        
        if( !tableStateObject.sortPriority ) {
            tableStateObject.sortPriority = [ ];
        }

        // create new array with this columnId in the front
        let newSortPriority = [ columnId ];
        for (let ci of tableStateObject.sortPriority) {
            if( ci !== columnId ) {
                newSortPriority.push( ci );
            }
        }
        tableStateObject.sortPriority = newSortPriority;
    }

	/**
	 * Switch between sorting smallest to largest, largest to
	 * smallest for the given column for the given table.
	 * 
	 * @param {*} param0 
	 */
    toggleSortOrder( { tableStateObject, columnId } ) {

        let lastClickedId = tableStateObject.lastClickedId;
        tableStateObject.lastClickedId = columnId;
        
        if( !tableStateObject[ columnId ] ) {
            tableStateObject[ columnId ] = { 'currentSort' : 'low' };
        } else {

            if( columnId === lastClickedId ) {
                if( tableStateObject[ columnId ][ 'currentSort' ] === 'low' ) {
                    tableStateObject[ columnId ][ 'currentSort' ] = 'high';
                } else {
                    tableStateObject[ columnId ][ 'currentSort' ] = 'low';
                }
            }
        }
    }

	/**
	 * Get the sort type (number or string) for the given column in the given
	 * table.
	 * 
	 * @param {*} param0 
	 */
    getSortTypeForColumnId( { $tableContainerDiv, columnId } ) {

        let $columnHeader = $tableContainerDiv.children( 'div.div-table-header-row' ).children( 'div.column-' + columnId );
        return $columnHeader.data( 'sorttype' );
    }

	/**
	 * Add the event handler for clicking on column headers for
	 * sorting the given table.
	 * 
	 * @param {*}  
	 */
    addSortHandlerToHeader( $tableContainerDiv ) {

        let objectThis = this;
		let tableStateObject = { };

		$tableContainerDiv.children( 'div.div-table-header-row' ).children('div.sortable-header').click( function(e) {

			let $columnHeader = $( this );
            let columnId = $columnHeader.data( 'columnid' );
            
            objectThis.setSortPriority( { tableStateObject, columnId } );
            objectThis.toggleSortOrder( { tableStateObject, columnId } );

			let mylist = $columnHeader.parent().parent().children('div.table-rows-container');
			let listitems = mylist.children('div.div-table-row').get();

			listitems.sort(function(a, b) {

                for (let ci of tableStateObject.sortPriority) {

                    let sortType = objectThis.getSortTypeForColumnId( { $tableContainerDiv, columnId : ci } );

                    let itemA = $(a).children( 'div.column-' + ci );
                    let itemB = $(b).children( 'div.column-' + ci )

                    let valueA = itemA.data( 'value' );
                    let valueB = itemB.data( 'value' );

                    if( sortType === 'number' ) {
                        valueA = parseFloat( valueA );
                        valueB = parseFloat( valueB );
                    } else {

                    }
                    
                    if( tableStateObject[ ci ][ 'currentSort' ] === 'low' ) {

                        if( valueA < valueB ) { return -1 }
                        if( valueA > valueB ) { return 1; }

                    } else {

                        if( valueA < valueB ) { return 1 }
                        if( valueA > valueB ) { return -1; }

                    }
                }

                return 0;
			})

			$.each(listitems, function(idx, itm) { mylist.append(itm); });

			return false;
		});

		// put a click handler on non sortable headers as well, to prevent clicks from collapsing this table via the parent's row click handler
		$tableContainerDiv.children( 'div.div-table-header-row' ).children('div.non-sortable-header').click( function(e) {
			return false;
		});

    }

	/**
	 * Add the width to use for the bar graph present in applicable
	 * columns, add a 'showGraphBar' and 'graphWidth' property to
	 * dataObjects for each data object.
	 * 
	 * @param {*} param0 
	 */
	addGraphWidths({ dataObjects, columns }) {

		for (let column of columns) {

			if( column.showHorizontalGraph ) {

				for( let dataObject of dataObjects ) {

					if( !dataObject.graphWidths ) { dataObject.graphWidths = { }; }

					let width = Math.round( dataObject[ column.dataProperty ] / column.graphMaxValue * column.graphWidth );
					dataObject.graphWidths[ column.id ] = width;

					/*
					if( !width || width <= 1 ) {
						dataObject.graphWidths[ column.id ][ 'showGraphBar' ] = false;
					} else {
						dataObject.graphWidths[ column.id ][ 'showGraphBar' ] = true;
					}
					*/
				}
			}
		}
	}

	/**
	 * Add click handler to expandable rows in a table.
	 * getElementToInsertFunction is a reference to a function that
	 * will return a jquery element to show when a row is expanded.
	 * 
	 * @param {*} param0 
	 */
	addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction, functionParams } ) {

		let objectThis = this;

		let $rowsContainer = $tableContainerDiv.children( 'div.table-rows-container' );

		if ( $rowsContainer.length === 0 ) {

			const errorMsg = "Possibly/Probably Error: addExpansionHandlerToRows(...)  No children elements found using selector 'div.table-rows-container' for $tableContainerDiv: ";
			console.log( errorMsg );
			console.log( $tableContainerDiv );
        	try {
	        	throw Error( errorMsg );
    		} catch( e ) {
    			console.log( "Log as exception to get call stack (Also to have error send to server):" );
    			console.log( e );
    			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    			//  Log error msg to server.  Do not re-throw exception, may break other code
    		}
		}
		
		let $expandableRows = $rowsContainer.children('div.expandable-table-row');

		let expansionStateObject = { };

		$expandableRows.click( function() {
			
			// disable expansion code from running when user was highlighting text
			let sel = getSelection().toString();
			if(sel){
				return false;
			}

			objectThis.rowExpansionFunction( { expansionStateObject, $clickedRow : $(this), getElementToInsertFunction, functionParams } );
			return false;
		});
	}

	/**
	 * Add a click handler to non expandable rows, so that clicking them won't fire the
	 * parent click handler and collapse the row containing sub tables.
	 * 
	 * @param {*} param0 
	 */
	addNoExpansionHandlerToRows( { $tableContainerDiv } ) {

		let objectThis = this;

		let $rowsContainer = $tableContainerDiv.children( 'div.table-rows-container' );

		if ( $rowsContainer.length === 0 ) {

			const errorMsg = "Possibly/Probably Error: addNoExpansionHandlerToRows(...)  No children elements found using selector 'div.table-rows-container' for $tableContainerDiv: ";
			console.log( errorMsg );
			console.log( $tableContainerDiv );
        	try {
	        	throw Error( errorMsg );
    		} catch( e ) {
    			console.log( "Log as exception to get call stack (Also to have error send to server):" );
    			console.log( e );
    			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    			//  Log error msg to server.  Do not re-throw exception, may break other code
    		}
		}
		
		let $expandableRows = $rowsContainer.children('div.expandable-table-row');

		$expandableRows.click( function() { return false; } );
	}

	/**
	 * The function called when a row is clicked on for expansion. Handles either
	 * expanding or contracting the row depending on its current state.
	 * 
	 * @param {*} param0 
	 */
	rowExpansionFunction( { $clickedRow, getElementToInsertFunction, expansionStateObject, functionParams } ) {

		let uniqueId = $clickedRow.data( 'id' );

		let $expandIconCell

		if( expansionStateObject[ uniqueId ] ) {

			let expansionData = expansionStateObject[ uniqueId ];

			if( expansionData.expanded ) {
				expansionData.expanded = false;
				expansionData.element.hide();
			} else {
				expansionData.expanded = true;
				expansionData.element.show();
			}

		} else {

			let expansionData = { };

			functionParams.$clickedRow = $clickedRow;

			let $elementToAdd = getElementToInsertFunction( functionParams );

			expansionData.element = $elementToAdd;
			expansionData.expanded = true;
			expansionStateObject[ uniqueId ] = expansionData;

			$clickedRow.append( $elementToAdd );
		}

		this.updateExpandableIconForRow( { $clickedRow, expansionStateObject } );
	}

	updateExpandableIconForRow( { $clickedRow, expansionStateObject } ) {

		let uniqueId = $clickedRow.data( 'id' );
		let isExpanded = expansionStateObject[ uniqueId ][ 'expanded' ];

		let $cellToUpdate = $clickedRow.children( 'div.expand-icon' );
		$cellToUpdate.empty();

		if( isExpanded ) {
			$cellToUpdate.append( $( '<img src="static/images/pointer-down.png" style="max-width:11px;max-height:11px;">' ) );
		} else {
			$cellToUpdate.append( $( '<img src="static/images/pointer-right.png" style="max-width:11px;max-height:11px;">' ) );
		}

	}

	/**
	 * Add mousein and mouseout handlers for table rows to perform highlighting
	 * of current row.
	 * 
	 * @param {*} param0 
	 */
	addHoverHandlerToRows( { $tableContainerDiv, getElementToInsertFunction } ) {
		let objectThis = this;

		let $rowsContainer = $tableContainerDiv.children( 'div.table-rows-container' );

		if ( $rowsContainer.length === 0 ) {

			const errorMsg = "Possibly/Probably Error: addHoverHandlerToRows(...)  No children elements found using selector 'div.table-rows-container' for $tableContainerDiv: ";
			console.log( errorMsg );
			console.log( $tableContainerDiv );
        	try {
	        	throw Error( errorMsg );
    		} catch( e ) {
    			console.log( "Log as exception to get call stack (Also to have error send to server):" );
    			console.log( e );
    			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    			//  Log error msg to server.  Do not re-throw exception, may break other code
    		}
		}
		
		let $expandableRows = $rowsContainer.children('div.expandable-table-row');

		let handlerIn = function() {
			$( this ).addClass( 'hoveredTableRow' );
		};

		let handlerOut = function() {
			$( this ).removeClass( 'hoveredTableRow' );
		}

		$expandableRows.mouseenter( handlerIn ).mouseleave( handlerOut );
	}

}