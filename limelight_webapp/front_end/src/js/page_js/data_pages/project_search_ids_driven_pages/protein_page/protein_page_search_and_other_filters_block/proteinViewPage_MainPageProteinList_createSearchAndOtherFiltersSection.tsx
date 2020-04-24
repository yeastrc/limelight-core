/**
 * proteinViewPage_MainPageProteinList_createSearchAndOtherFiltersSection.tsx
 *
 * For use on "Main Page" Protein List
 *
 * Create JSX Element for Display of Search and Other Filters Section
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
import {
    ProteinPage_ProteinGroupingFilterSelection_Component_Root,
    ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue
} from "./proteinViewPage_ProteinGroupingFilterSelectionComponent";


/**
 *
 */
export const proteinViewPage_MainPageProteinList_createSearchDetailsSection = function(
    {
        searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
        proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue
    } : {
        searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
        proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue

    }) : JSX.Element {

    return (
        <ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue={ searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue={ proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
        />
    );
}


/**
 *
 */
interface ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props {

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue
}

/**
 *
 */
interface ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State {

    _placeHolder
}

/**
 *
 */
class ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component extends React.Component< ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props, ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State > {

    /**
     *
     */
    constructor(props: ProteinPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
                <SearchDetailsAndOtherFiltersOuterBlock_Layout >
                    <SearchDetailsAndFilterBlock_MainPage_Root
                        propValue={ this.props.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                    />
                    <ProteinPage_ProteinGroupingFilterSelection_Component_Root
                        propValue={ this.props.proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
                    />
                </SearchDetailsAndOtherFiltersOuterBlock_Layout>
            </SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
        )
    }
}
