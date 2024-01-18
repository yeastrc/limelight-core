/**
 * filterOn_SearchProgramsGroup_ConditionalRender_Component.tsx
 *
 * Filter On:  "Search Programs" Group is conditionally rendered based in if any of children filters are rendered
 *
 * Clone is render logic for children filters
 *
 */

import React from "react";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";

/**
 *
 */
export interface FilterOn_SearchProgramsGroup_ConditionalRender_Component_Props {

    //  Render control for SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component

    searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData

    //  Render control for ScanFilenameId_On_PSM_Filter_UserSelection_Component

    anySearches_Have_ScanFilenames: boolean
    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
}



interface FilterOn_SearchProgramsGroup_ConditionalRender_Component_State {

    _placeholder?: any
}

/**
 *
 */
export class FilterOn_SearchProgramsGroup_ConditionalRender_Component extends React.Component< FilterOn_SearchProgramsGroup_ConditionalRender_Component_Props, FilterOn_SearchProgramsGroup_ConditionalRender_Component_State > {

    constructor(props: FilterOn_SearchProgramsGroup_ConditionalRender_Component_Props) {
        super(props);

        // this.state = {  };
    }

    render() {

        let showChildren = false;

        if ( SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component.limelight_willComponentRender({ displayData: this.props.searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData })
            || (
                this.props.anySearches_Have_ScanFilenames
                && (
                    ! ( this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                        && this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_total_SearchScanFileCount() === 1
                    )
                )
            )
        ) {
            //  Nothing to display so set to false

            showChildren = true;
        }

        return (

            <React.Fragment>

                { ( showChildren ) ? (
                    this.props.children
                ) : null }

            </React.Fragment>
        )
    }

}


