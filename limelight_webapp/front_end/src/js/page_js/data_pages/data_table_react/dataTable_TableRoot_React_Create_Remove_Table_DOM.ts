/**
 * dataTable_TableRoot_React_Create_Remove_Table_DOM.ts
 * 
 * Add / Remove  DataTable_TableRoot React Component into DOM
 * 
 * <DataTable_TableRoot>  in  dataTable_TableRoot_React.tsx
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { DataTable_RootTableObject, DataTable_ColumnId, DataTable_TableOptions, DataTable_SortColumnsInfoEntry, DataTable_RootTableDataObject, DataTable_DataRowEntry, DataTable_DataGroupRowEntry } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { DataTable_TableRoot, DataTable_TableRoot_Props } from './dataTable_TableRoot_React'

/**
 * Create a Data Table on the Page  - using React
 * 
 * Calling create_dataTable_Root_React on a DOM node that contains a React instance updates that React instance
 * 
 * @param tableObject - Same as for standard data table
 * 
 * @param tableOptions { 
 *      rowClickHandler - function({ event, uniqueId, dataObject }) 
 * 
 * @param containerDOMElement - DOM element reference
 * 
 * @param renderCompleteCallbackFcn - Optional - Function called on Component Rendered
 * 
 * @returns created React Component
 */
const create_dataTable_Root_React = function({ tableObject, containerDOMElement, renderCompleteCallbackFcn } : { 
    
    tableObject : DataTable_RootTableObject
    containerDOMElement, 
    renderCompleteCallbackFcn 
}) {

    if ( containerDOMElement === undefined || containerDOMElement === null ) {
        throw Error("create_dataTable_Root_React({ containerDOMElement }): containerDOMElement is undefined or null ");
    }

    const renderCompletecallbackFcn_Local = ( ) => {
        var z = 0;
        if ( renderCompleteCallbackFcn ) {
            renderCompleteCallbackFcn();
        }

        //   This code shows that after the component is created it can be updated from outside.

        //  Fake code to update the state after some time.  
        //    React render happens some time after setState is called from headerColumnClicked_UpdateState
        // window.setTimeout( () => { 

        //     const columnId = "?????";  // value in column.id
        //     const shiftKeyDown = false;

        //     renderedReactComponent.headerColumnClicked_UpdateState({ shiftKeyDown, columnIndex });
               
        // }, 5000 );
    }

    const renderCompletecallbackFcn = ( ) => { };

    const projectPage_ExperimentsSectionRoot_Component = (
        React.createElement(
            DataTable_TableRoot,
            {
                tableObject
            },
            null
        )
    );

    const renderedReactComponent = ReactDOM.render( 
        projectPage_ExperimentsSectionRoot_Component, 
        containerDOMElement,
        renderCompletecallbackFcn_Local 
    );

    return renderedReactComponent;
    //  To Remove React from the DOM element

    //  ReactDOM.unmountComponentAtNode(domContainerNode)
}

/**
 * Remove Data Table on the Page  - using React
 * 
 * No Error if call this on DOM element NOT containing a React Component
 * 
* @param containerDOMElement - DOM element reference
*/
const remove_dataTable_Root_React = function({ containerDOMElement }) {
    if ( containerDOMElement === undefined || containerDOMElement === null ) {
        throw Error("remove_dataTable_Root_React({ containerDOMElement }): containerDOMElement is undefined or null ");
    }
    ReactDOM.unmountComponentAtNode( containerDOMElement );
}

    //  May be out of date.  Compare to create_dataTable_Root_React
// /**
//  * Update a Data Table on the Page  - using React
//  * 
//  * @param tableObject - Same as for standard data table
//  * 
//  * @param tableOptions { 
//  *      rowClickHandler - function({ event, uniqueId, dataObject }) 
//  * 
//  * }
//  * 
//  * @param containerDOMElement - DOM element reference
//  */
// const update_dataTable_Root_React = function({ tableObject, tableOptions, containerDOMElement }) {

//     ReactDOM.render( <DataTable_TableRoot tableObject={ tableObject } tableOptions={ tableOptions }  />, containerDOMElement );
// }


export { create_dataTable_Root_React, remove_dataTable_Root_React
    // , update_dataTable_Root_React 
}
