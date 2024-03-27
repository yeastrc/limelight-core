/**
 * qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component.tsx
 *
 * QC Page Common - Section - Gold Standard Statistics - Select Gold Standard entry
 *
 */

import React from 'react'
import { CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_i_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


export class QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry {
    currentlySelected: boolean
    gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
    searchScanFileIds_In_GoldStandardEntries: Set<number>
    // goldStandard_Id: number
    goldStandard_Label: string
    goldStandard_Description: string
    scanFilenames: string
    goldStandard_Root_Entry_Array:  Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>

    projectSearchId_Set: Set<number>
}

export class QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams {

    selectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
}

export type QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback =
    ( params: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams) => void

/////////

//  React Component

/**
 *
 */
export interface QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_Props {

    goldStandard_Root_SelectionEntry_InitialSelection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    selectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry>

    selectionChosen_Callback: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback

}

/**
 *
 */
export interface QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_State {

    forceRerenderObject: object      //  Force Rerender object
}

/**
 *
 */
export class QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component extends React.Component< QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_Props, QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_State > {

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private _selectionEntry_CurrentSelection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    /**
     *
     */
    constructor(props: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_Props) {
        super(props);

        this._selectionEntry_CurrentSelection = props.goldStandard_Root_SelectionEntry_InitialSelection

        this.state = {
            forceRerenderObject: {}
        };
    }

    /**
     *
     */
    render() {

        return (

            <div>
                { ( this.props.selectionEntriesArray.length === 1 ) ? (
                    //  Only 1 entry so display without selection change option

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
                                <div>
                                    <span style={ { fontWeight: "bold" } }>Scan File: </span>
                                    {/*  Scan File(s) associated with this Gold Standard Run  */}
                                    { this.props.goldStandard_Root_SelectionEntry_InitialSelection.scanFilenames }
                                </div>
                                <div>
                                    <span style={ { fontWeight: "bold" } }>Gold Standard Run: </span>
                                    <span>
                                        { this.props.goldStandard_Root_SelectionEntry_InitialSelection.goldStandard_Description }
                                    </span>
                                    <span style={ { whiteSpace: "nowrap" } }>
                                        <span> (</span>
                                        <span>
                                            { this.props.goldStandard_Root_SelectionEntry_InitialSelection.goldStandard_Label }
                                        </span>
                                        <span>)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div>

                            <span
                                style={ { fontSize: 18, fontWeight: "bold", whiteSpace: "nowrap", marginRight: 16 } }
                            >
                                <span>Select Gold Standard Run:</span>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            The current gold standard entry and associated scan file are listed in the box to the right.
                                            If data on the page were derived from multiple scan files or if there are multiple gold standard entries,
                                            click the box to the right to open a select menu to select the desired gold standard data.
                                        </span>
                                    }
                                />
                            </span>

                            <select
                                title={ "Scan File: " + this._selectionEntry_CurrentSelection.scanFilenames + "\nGold Standard Run: " + this._selectionEntry_CurrentSelection.goldStandard_Description + " (" + this._selectionEntry_CurrentSelection.goldStandard_Label + ")" }
                                value={ this._selectionEntry_CurrentSelection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id }
                                onChange={ event => { try {

                                    event.stopPropagation()

                                    const selectedValue_String = event.target.value

                                    const selectedValue_Number = Number.parseInt( selectedValue_String )

                                    if ( Number.isNaN( selectedValue_Number ) ) {
                                        const msg = "selectedValue_Number is NaN. selectedValue_String: " + selectedValue_String
                                        console.warn(msg)
                                        throw Error(msg)
                                    }

                                    let selectionEntry_ForSelection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

                                    //  Update currentlySelected and find selectionEntry_ForSelection
                                    for ( const selectionEntry of this.props.selectionEntriesArray ) {

                                        if ( selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id === selectedValue_Number ) {

                                            selectionEntry_ForSelection = selectionEntry

                                            selectionEntry.currentlySelected = true;

                                        } else {
                                            selectionEntry.currentlySelected = false;
                                        }
                                    }

                                    if ( ! selectionEntry_ForSelection ) {
                                        const msg = "NO entry in this.props.selectionEntriesArray for selectedValue_Number: " + selectedValue_Number
                                        console.warn(msg)
                                        throw Error(msg)
                                    }

                                    this._selectionEntry_CurrentSelection = selectionEntry_ForSelection

                                    this.setState({ forceRerenderObject: {} })

                                    window.setTimeout( ()=> {
                                        try {
                                            this.props.selectionChosen_Callback({ selectionEntry: selectionEntry_ForSelection })


                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    }, 10 )

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                                }}
                            >
                                { this.props.selectionEntriesArray.map((value, index, array) => {

                                    return (
                                        <option
                                            key={ value.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id }
                                            value={ value.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id }
                                            title={ "Scan File: " + value.scanFilenames + "\nGold Standard Run: " + value.goldStandard_Description + " (" + value.goldStandard_Label + ")" }
                                        >
                                            { "Scan File: " + value.scanFilenames + " - Gold Standard Run: " + value.goldStandard_Description + " (" + value.goldStandard_Label + ")" }
                                        </option>
                                    )
                                })}
                            </select>

                        </div>

                    </React.Fragment>
                )}
            </div>
        );
    }
}
