/**
 * searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_AddToDOM.ts
 *
 * Add / Remove  SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer React Component into DOM
 *
 * <SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>  in  searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer.tsx
 */


import React from 'react';
import ReactDOM from 'react-dom';

import {SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer";



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
const create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = function({ jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, containerDOMElement, renderCompleteCallbackFcn } : {

    jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer : JSX.Element
    containerDOMElement: HTMLElement
    renderCompleteCallbackFcn: any
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

    const renderedReactComponent = ReactDOM.render(
        jsxElement_Of_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer,
        containerDOMElement,
        renderCompletecallbackFcn_Local
    );

    return renderedReactComponent;
    //  To Remove React from the DOM element

    //  ReactDOM.unmountComponentAtNode(domContainerNode)
}

/**
 * Remove SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer on the Page  - using React
 *
 * No Error if call this on DOM element NOT containing a React Component
 *
 * @param containerDOMElement - DOM element reference
 */
const remove_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer = function({ containerDOMElement }: { containerDOMElement: HTMLElement }) {
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


export { create_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer, remove_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer
    // , update_dataTable_Root_React
}
