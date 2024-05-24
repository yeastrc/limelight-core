/**
 * scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component.tsx
 *
 * Filter on Scan Peak m/z and intensity
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.clearAll();
 // Set Prop param 'scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import {
    get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/jsx/scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 */
export interface ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_Props {

    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject;

    projectSearchIds : Array<number>

    dataPageStateManager : DataPageStateManager

    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject : object

    updateMadeTo_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_Callback : () => void
}

interface ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_State {

    prev_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    forceUpdate?: object
}

/**
 *
 */
export class ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component extends React.Component< ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_Props, ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_State > {

    private _open_Add_Overlay_BindThis = this._open_Add_Overlay.bind(this)

    private readonly __scanFilenameId_Entry_Ref :  React.RefObject<HTMLSelectElement>

    /**
     *
     */
    constructor(props : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_Props) {
        super(props);

        this.__scanFilenameId_Entry_Ref = React.createRef();

        this.state = {
            prev_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject: props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject,
            forceUpdate: {}
        }
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_Props, nextState : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if (
            this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject !== nextProps.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_Object_Force_ResetToStateObject
            || this.state.forceUpdate !== nextState.forceUpdate
        ) {
            return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }

    // /**
    //  * After render()
    //  */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    // }

    /**
     *
     * @param event
     */
    private _open_Add_Overlay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            event.stopPropagation()

            this._open_Add_Change_Overlay({ selection_Entry_To_Change: undefined })

        } catch( e ) {
            console.warn("Exception caught in _open_Add_Overlay", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _open_Add_Change_Overlay(
        {
            selection_Entry_To_Change
        } : {
            selection_Entry_To_Change: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY
        }
    ) {
        let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

        const callbackOn_Cancel_Close_Clicked = (): void => {
            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
        }

        const callbackOn_StateObject_Changed = (): void => {

            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()

            this.setState({ forceUpdate: {} })

            window.setTimeout( () => {
                try {
                    this.props.updateMadeTo_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_Callback()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, 10 )
        }

        const overlayComponent = get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection__UserInputOverlay_Component( {
            selection_Entry_To_Change,
            projectSearchIds: this.props.projectSearchIds,
            dataPageStateManager: this.props.dataPageStateManager,
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
            callbackOn_Cancel_Close_Clicked,
            callbackOn_StateObject_Changed
        } )

        overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
    }

    /**
     *
     */
    render() {
        try {
            if ( ! this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject ) {
                return null
            }

            let selectionsElements: Array<JSX.Element> = undefined;

            if ( this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.is_AnySelections() ) {

                selectionsElements = []

                for ( const selection_Entry of this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

                    selectionsElements.push(
                        <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", marginBottom: 4 } }>
                            {/*  2 Column Grid  */}
                            <div style={ { marginRight: 5 } }>
                                <img
                                    className=" fake-link-image icon-small "
                                    title="Change Entry"
                                    src="static/images/icon-edit.png"
                                    onClick={ event => {
                                        try {
                                            this._open_Add_Change_Overlay({ selection_Entry_To_Change: selection_Entry })

                                            //  This code was for when was "Delete Entry"

                                            // this.props.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.delete_Entry( selection_Entry )
                                            //
                                            // this.setState( { forceUpdate: {} } )
                                            //
                                            // this.props.updateMadeTo_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_Callback()
                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                    } }
                                />
                            </div>
                            <div
                                className=" clickable "
                                title="Change Entry"
                                onClick={ event => {
                                    try {
                                        this._open_Add_Change_Overlay({ selection_Entry_To_Change: selection_Entry })
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                } }
                            >
                                { "Mass " + selection_Entry.monoisotopicMass + " +/- " + selection_Entry.plus_Minus_MassRange_In_PPM + " Min % of max peak " + selection_Entry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan  }
                            </div>
                        </div>
                    )
                }
            }

            return (
                <React.Fragment>

                    {/* Parent is CSS Grid with 2 Columns */ }

                    <div className=" filter-common-filter-label ">
                        Filter On Scan Peak:

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Only data for the selected scan peaks will be used.
                                </span>
                            }
                        />
                    </div>

                    <div className=" filter-common-selection-block " >

                        {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                        <div style={ { marginBottom: 6 } }>

                            <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                                { ( ! selectionsElements ) ? (
                                    <div>
                                        <span
                                            className=" filter-single-value-display-block clickable "
                                        >
                                            Not Filtering on Scan Peak
                                        </span>
                                    </div>
                                ) : (
                                    selectionsElements
                                )}

                                <div>
                                    <button
                                        onClick={ this._open_Add_Overlay_BindThis }
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            );

        } catch( e ) {
            console.warn("Exception caught in render", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}



