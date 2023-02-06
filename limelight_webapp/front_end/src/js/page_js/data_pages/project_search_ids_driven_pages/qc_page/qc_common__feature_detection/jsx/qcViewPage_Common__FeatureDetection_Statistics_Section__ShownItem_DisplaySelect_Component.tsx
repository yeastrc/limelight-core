/**
 * qcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component.tsx
 *
 * QC Page Common - Section - Feature Detection Statistics
 *
 * Component at top of section that displays or provides selection of which Feature Detection Root / Search to display
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";


/**
 *
 */
export interface QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component_Props {

    selected_FeatureDetection_Root_Entry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
    projectSearchId__For__selected_FeatureDetection_Root_Entry: number   //  Only populated when need to display Search Name etc

    callback__FeatureDetectionEntryClickedForChange: () => void  // When populated, display in form with selection

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
export class QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component extends React.Component< QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component_Props, QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component_Props) {
        super(props);
    }

    /**
     *
     */
    render() {

        let searchNameIdEtc: string

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1
            && this.props.projectSearchId__For__selected_FeatureDetection_Root_Entry ) {

            const searchData =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.
                get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( this.props.projectSearchId__For__selected_FeatureDetection_Root_Entry )

            let searchShortName = "";
            if ( searchData.searchShortName ) {
                searchShortName = " (" + searchData.searchShortName + ")";
            }

            searchNameIdEtc = searchData.name + searchShortName + " (" + searchData.searchId + ")"
        }

        const scanFilename_Search_FeatureDetection_Element = (

            <React.Fragment>
                { searchNameIdEtc ? (
                    <div>
                        <span style={ { fontWeight: "bold" } }>Search: </span>
                        <span>
                            { searchNameIdEtc }
                        </span>
                    </div>
                ) : null }
                <div>
                    <span style={ { fontWeight: "bold" } }>Scan File: </span>
                    {/*  Scan File(s) associated with this Feature Detection Run  */}
                    { this.props.selected_FeatureDetection_Root_Entry.searchScanFileEntries.map((value, index) => {
                        return (
                            <React.Fragment key={ value.searchScanFileId }>
                                { index !== 0 ? (
                                    <span>, </span>
                                ) : null }
                                <span>
                                    { value.searchScanFilename }
                                </span>
                            </React.Fragment>
                        )
                    }) }
                </div>
                <div>
                    <span style={ { fontWeight: "bold" } }>Feature Detection Run: </span>
                    <span>
                        { this.props.selected_FeatureDetection_Root_Entry.description }
                    </span>
                    <span style={ { whiteSpace: "nowrap" } }>
                        <span> (</span>
                        <span>
                            { this.props.selected_FeatureDetection_Root_Entry.displayLabel }
                        </span>
                        <span>)</span>
                    </span>
                </div>
            </React.Fragment>
        )

        return (

            <div style={ { marginBottom: 15 } }>
                <div>
                    { ( ! this.props.callback__FeatureDetectionEntryClickedForChange ) ? (
                        //  No Callback so display without selection change option

                        <React.Fragment>
                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr " } }>
                                {/*  Column 1  */}
                                <div
                                    style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 6 } }
                                >
                                    <span>Feature Detection Run: </span>
                                </div>
                                {/*  Column 2  */}
                                <div>
                                    { scanFilename_Search_FeatureDetection_Element }
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        //  More than 1 entry in this.state.featureDetection_Root_Entries
                        <React.Fragment>
                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr " } }>
                                {/*  Column 1  */}
                                <div
                                    style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 16 } }
                                >
                                    <span>Select Feature Detection Run:</span>

                                    <div className=" help-tip-symbol--next-to-font-size-18px-text ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                                <p className="help-tip-actual">
                                                    The current feature detection run and associated scan file are listed in the box to the right.
                                                    If data on the page were derived from multiple scan files or if there are multiple feature detection runs,
                                                    click the box to the right to open a select menu to select the desired feature detection data.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  Column 2  */}
                                <div>

                                    <div
                                        className=" standard-border-color-gray clickable "
                                        style={ {
                                            display: "inline-block", borderStyle: "solid", borderWidth: 1,
                                            paddingLeft: 4, paddingRight: 4
                                        } }
                                        onClick={ event => {
                                            event.stopPropagation()

                                            if ( limelight__IsTextSelected() ) {
                                                return
                                            }

                                            this.props.callback__FeatureDetectionEntryClickedForChange()
                                        }}
                                    >
                                        <div style={ { display: "grid", gridTemplateColumns: "1fr min-content" } }>
                                            <div>
                                                { scanFilename_Search_FeatureDetection_Element }
                                            </div>
                                            <div>
                                                <img
                                                    src="static/images/pointer-down.png"
                                                    className=" icon-small fake-link-image "
                                                    style={ { marginLeft: 4 } }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </React.Fragment>
                    )}
                </div>

            </div>
        );
    }

}
