/**
 * qcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component.tsx
 *
 * QC Page Common - Section - Gold Standard Statistics
 *
 * Component at top of section that displays or provides selection of which Gold Standard Root / Search to display
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";


/**
 *
 */
export interface QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component_Props {

    scanFilenames_CommaDelim: string
    goldStandard_Description: string
    goldStandard_DisplayLabel: string

    callback__GoldStandardEntryClickedForChange: () => void  // When populated, display in form with selection

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
export class QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component extends React.Component< QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component_Props, QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_Common__GoldStandard_Statistics_Section__ShownItem_DisplaySelect_Component_Props) {
        super(props);
    }

    /**
     *
     */
    render() {

        const scanFilename_GoldStandard_Element = (

            <React.Fragment>
                <div>
                    <span style={ { fontWeight: "bold" } }>Scan File: </span>
                    {/*  Scan File(s) associated with this Gold Standard Run  */}
                    { this.props.scanFilenames_CommaDelim }
                </div>
                <div>
                    <span style={ { fontWeight: "bold" } }>Gold Standard Run: </span>
                    <span>
                        { this.props.goldStandard_Description }
                    </span>
                    <span style={ { whiteSpace: "nowrap" } }>
                        <span> (</span>
                        <span>
                            { this.props.goldStandard_DisplayLabel }
                        </span>
                        <span>)</span>
                    </span>
                </div>
            </React.Fragment>
        )

        return (

            <div style={ { marginBottom: 15 } }  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }>
                <div>
                    { ( ! this.props.callback__GoldStandardEntryClickedForChange ) ? (
                        //  No Callback so display without selection change option

                        <React.Fragment>
                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr " } }>
                                {/*  Column 1  */}
                                <div
                                    style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 6 } }
                                >
                                    <span>Gold Standard Run: </span>
                                </div>
                                {/*  Column 2  */}
                                <div>
                                    { scanFilename_GoldStandard_Element }
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        //  More than 1 entry in this.state.goldStandard_Root_Entries
                        <React.Fragment>
                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr " } }>
                                {/*  Column 1  */}
                                <div
                                    style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 16 } }
                                >
                                    <span>Select Gold Standard Run:</span>

                                    <div className=" help-tip-symbol--next-to-font-size-18px-text ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                                <p className="help-tip-actual">
                                                    The current gold standard entry and associated scan file are listed in the box to the right.
                                                    If data on the page were derived from multiple scan files or if there are multiple gold standard entries,
                                                    click the box to the right to open a select menu to select the desired gold standard data.
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

                                            this.props.callback__GoldStandardEntryClickedForChange()
                                        }}
                                    >
                                        <div style={ { display: "grid", gridTemplateColumns: "1fr min-content" } }>
                                            <div>
                                                { scanFilename_GoldStandard_Element }
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
