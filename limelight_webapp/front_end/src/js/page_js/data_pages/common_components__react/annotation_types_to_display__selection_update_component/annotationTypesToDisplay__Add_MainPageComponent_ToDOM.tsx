/**
 * annotationTypesToDisplay__Add_MainPageComponent_ToDOM.tsx
 *
 *  Annotation Types to Display (PSM, Peptide, ) :  Add Component to DOM.  Used on non-React pages like Mod page
 *
 */

import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import ReactDOM from "react-dom";
import React from "react";
import {AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component} from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component";

/**
 *
 */
export const annotationTypesToDisplay__Add_MainPageComponent_ToDOM = function (
    {
        div_DOM_Element_ToRenderIn,
        projectSearchIds, searchDataLookupParameters_Root, dataPageStateManager_DataFrom_Server
    } : {
        div_DOM_Element_ToRenderIn: HTMLElement
        projectSearchIds: Array<number>
        searchDataLookupParameters_Root: SearchDataLookupParameters_Root  //  Existing values
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    }) : void {


    const componentToAdd = (
        <AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component
            projectSearchIds={ projectSearchIds }
            searchDataLookupParameters_Root={ searchDataLookupParameters_Root }
            dataPageStateManager_DataFrom_Server={ dataPageStateManager_DataFrom_Server }
        />
    )

    const renderCompletecallbackFcn = ( ) => { };

    const renderedReactComponent = ReactDOM.render(
        componentToAdd,
        div_DOM_Element_ToRenderIn,
        renderCompletecallbackFcn
    );

}
