/**
 * modViewPage_DisplayDataOnPage_createSearchDetailsSection.tsx
 *
 * Create JSX Element for Display of Search Details Section
 *
 *
 */

import React from 'react'
import {SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";


/**
 *
 */
export const modViewPage_DisplayDataOnPage_createSearchDetailsSection = function(
    {
        searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    } : {
        searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    }) : JSX.Element {

    return (
        <ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue={ searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
        />
    );
}


/**
 *
 */
interface ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props {

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
}

/**
 *
 */
interface ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State {

    _placeHolder
}

/**
 *
 */
class ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component extends React.Component< ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props, ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State > {

    /**
     *
     */
    constructor(props: ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
                <SearchDetailsAndOtherFiltersOuterBlock_Layout >
                    <SearchDetailsAndFilterBlock_MainPage_Root
                        propValue={ this.props.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                        searchSubGroup_CentralStateManagerObjectClass={ undefined }
                        searchSubGroup_SelectionsChanged_Callback={ undefined }
                        searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                    />
                </SearchDetailsAndOtherFiltersOuterBlock_Layout>
            </SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
        )
    }
}
