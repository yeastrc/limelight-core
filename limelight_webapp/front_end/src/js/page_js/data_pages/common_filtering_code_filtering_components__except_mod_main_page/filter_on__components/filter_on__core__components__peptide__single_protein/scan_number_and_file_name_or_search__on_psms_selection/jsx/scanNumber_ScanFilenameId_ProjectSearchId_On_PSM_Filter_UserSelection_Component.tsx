/**
 * scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Component.tsx
 *
 * Filter on Scan Number for SearchScanFilenameId Or ProjectSearchId on PSM
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.clearAll();
 // Set Prop param 'scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    DataPageStateManager,
    SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/jsx/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/**
 *
 */
export interface ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_Props {

    projectSearchIds : Array<number>

    dataPageStateManager : DataPageStateManager

    /**
     * NOT Populated if no Searches have Scan Filenames
     *
     */
    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject;
    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject : object

    updateMadeTo_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_Callback : () => void
}

interface ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_State {

    prev_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    forceUpdate?: object
}

/**
 *
 */
export class ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component extends React.Component< ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_Props, ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_State > {

    private _open_Add_Overlay_BindThis = this._open_Add_Overlay.bind(this)

    private readonly __scanFilenameId_Entry_Ref :  React.RefObject<HTMLSelectElement>

    /**
     *
     */
    constructor(props : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_Props) {
        super(props);

        this.__scanFilenameId_Entry_Ref = React.createRef();

        this.state = {
            prev_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject,
            forceUpdate: {}
        }
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_Props, nextState : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if (
            this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject !== nextProps.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
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

    private _open_Add_Overlay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            event.stopPropagation()

            let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

            const callbackOn_Cancel_Close_Clicked = (): void => {

                overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
            }

            const callbackOn_StateObject_Changed = (): void => {

                overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()

                this.setState({ forceUpdate: {} })

                window.setTimeout( () => {
                    try {
                        this.props.updateMadeTo_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_Callback()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                }, 10 )
            }


            const overlayComponent = get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component( {
                projectSearchIds: this.props.projectSearchIds,

                dataPageStateManager: this.props.dataPageStateManager,

                /**
                 * NOT Populated if no Searches have Scan Filenames
                 *
                 */
                commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,

                scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,

                callbackOn_Cancel_Close_Clicked,
                callbackOn_StateObject_Changed
            } )

            overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );

        } catch( e ) {
            console.warn("Exception caught in _open_Add_Overlay", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {
        try {
            if ( ! this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject ) {
                return null
            }

            let selectionsElements: Array<JSX.Element> = undefined;

            if ( this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.is_AnySelections() ) {

                selectionsElements = []

                for ( const scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry of this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.get__scanNumber_ScanFilenameIds_ProjectSearchIds_Selections() ) {

                    const searchData_For_ProjectSearchId__HasSelection: Array<SearchData_SearchName_Etc_SingleSearchEntry__DataPageStateManagerEntry> = []

                    for ( const projectSearchId of this.props.projectSearchIds ) {

                        const searchData_For_ProjectSearchId = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                        if ( ! searchData_For_ProjectSearchId ) {
                            throw Error( "dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                        }

                        if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.wholeSearches_Selected_ProjectSearchIds
                            && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.wholeSearches_Selected_ProjectSearchIds.has( projectSearchId ) ) {

                            searchData_For_ProjectSearchId__HasSelection.push( searchData_For_ProjectSearchId )

                        } else if (
                            scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected
                            && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.size > 0 ) {

                            const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
                                this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( projectSearchId )

                            if ( scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {
                                for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                                    if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.has( searchScanFileData.searchScanFileId ) ) {

                                        searchData_For_ProjectSearchId__HasSelection.push( searchData_For_ProjectSearchId )

                                        break;
                                    }
                                }
                            }
                        }
                    }

                    const searchData_For_ProjectSearchId__HasSelection__Length = searchData_For_ProjectSearchId__HasSelection.length


                    let searchesAndTheirScanFilenamesText = undefined



                    for ( let index = 0; index < searchData_For_ProjectSearchId__HasSelection__Length; index++ ) {

                        if ( ! searchesAndTheirScanFilenamesText ) {

                            let searchesLabel = ""
                            if ( searchData_For_ProjectSearchId__HasSelection__Length > 1 ) {
                                searchesLabel = "es"
                            }
                            searchesAndTheirScanFilenamesText = " in search" + searchesLabel + " "

                        } else {

                            if ( index === ( searchData_For_ProjectSearchId__HasSelection__Length - 1 ) ) {
                                //  last entry
                                searchesAndTheirScanFilenamesText += " or "
                            } else {
                                //  NOT last entry
                                searchesAndTheirScanFilenamesText += " or "
                            }
                        }

                        const searchData_For_ProjectSearchId__HasSelection_Entry = searchData_For_ProjectSearchId__HasSelection[ index ]

                        searchesAndTheirScanFilenamesText += searchData_For_ProjectSearchId__HasSelection_Entry.searchId

                        if (
                            scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected
                            && scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.size > 0 ) {

                            const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
                                this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( searchData_For_ProjectSearchId__HasSelection_Entry.projectSearchId )

                            if ( scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {

                                const scanFilenames_INITIAL_STRING = ""

                                let scanFilenames = scanFilenames_INITIAL_STRING

                                for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                                    if ( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.searchScanFile_Ids_Selected.has( searchScanFileData.searchScanFileId ) ) {

                                        if ( scanFilenames !== scanFilenames_INITIAL_STRING ) {
                                            scanFilenames += ", "
                                        }

                                        scanFilenames += searchScanFileData.filename
                                    }
                                }

                                if ( scanFilenames !== scanFilenames_INITIAL_STRING ) {
                                    searchesAndTheirScanFilenamesText += " (" + scanFilenames + ")"
                                }
                            }
                        }
                    }

                    selectionsElements.push(
                        <div
                            key={ selectionsElements.length }
                            style={ { display: "grid", gridTemplateColumns: "max-content 1fr", alignItems: "baseline", marginBottom: 4 } }
                        >
                            {/*  2 Column Grid  */}
                            <div style={ { marginRight: 5 } }>
                                <img
                                    className=" fake-link-image icon-small "
                                    title="Delete Entry"
                                    src="static/images/icon-circle-delete.png"
                                    onClick={ event => {
                                        this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.delete_Entry( scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry )

                                        this.setState( { forceUpdate: {} } )

                                        this.props.updateMadeTo_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_Callback()
                                    } }
                                />
                            </div>
                            <div>
                                { "Scan number " + scanNumber_ScanFilenameIds_ProjectSearchIds_Selection_Entry.scanNumber + ( searchesAndTheirScanFilenamesText ? ( " " + searchesAndTheirScanFilenamesText ) : "" ) }
                            </div>
                        </div>
                    )
                }
            }

            return (
                <React.Fragment>

                    {/* Parent is CSS Grid with 2 Columns */ }

                    <div className=" filter-common-filter-label ">
                        Filter On Scan:

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Only data for the selected scan number(s) and scan file(s) and/or search(es) will be
                                    used.
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
                                            onClick={ this._open_Add_Overlay_BindThis }
                                        >
                                            Not Filtering on Scan Number
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



