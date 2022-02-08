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
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";

/**
 *
 */
export interface FilterOn_SearchProgramsGroup_ConditionalRender_Component_Props {

    //  Render control for SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component

    searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData

    //  Render control for ScanFilenameId_On_PSM_Filter_UserSelection_Component

    anySearches_Have_ScanFilenames: boolean
    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
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
                    ! ( this.props.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                        && this.props.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_total_SearchScanFileCount() === 1
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


