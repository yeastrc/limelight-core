/**
 * scanFilenameId_On_PSM_Filter_UserSelection_Component.tsx
 *
 * Filter on Scan Filename on PSM
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();
 // Set Prop param 'scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

/**
 *
 */
export interface ScanFilenameId_On_PSM_Filter_UserSelection_Component_Props {

    allSearches_Have_ScanFilenames: boolean

    projectSearchIds : Array<number>

    /**
     * NOT Populated if NOT all Searches have Scan Filenames
     *
     * value for <option> of <select>
     */
    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject;
    scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject : object

    updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback : () => void
}

interface ScanFilenameId_On_PSM_Filter_UserSelection_Component_State {

    skip_show_ShowingAll_Message?: boolean
    prev_scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    forceUpdate?: object
}

/**
 *
 */
export class ScanFilenameId_On_PSM_Filter_UserSelection_Component extends React.Component< ScanFilenameId_On_PSM_Filter_UserSelection_Component_Props, ScanFilenameId_On_PSM_Filter_UserSelection_Component_State > {

    private readonly __scanFilenameId_Entry_Ref :  React.RefObject<HTMLSelectElement>

    /**
     *
     */
    constructor(props : ScanFilenameId_On_PSM_Filter_UserSelection_Component_Props) {
        super(props);

        this.__scanFilenameId_Entry_Ref = React.createRef();

        let skip_show_ShowingAll_Message = false;

        if ( ! this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) {
            skip_show_ShowingAll_Message = true;
        }

        this.state = {
            skip_show_ShowingAll_Message,
            prev_scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: props.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject,
            forceUpdate: {}
        }
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps(props : ScanFilenameId_On_PSM_Filter_UserSelection_Component_Props, state : ScanFilenameId_On_PSM_Filter_UserSelection_Component_State ) : ScanFilenameId_On_PSM_Filter_UserSelection_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        if ( props.allSearches_Have_ScanFilenames ) {

            //    Return new state (like return from setState(callback)) or null

            if ( props.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
                !== state.prev_scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject ) {

                return {
                    skip_show_ShowingAll_Message: false,
                    prev_scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject : props.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
                };
            }
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ScanFilenameId_On_PSM_Filter_UserSelection_Component_Props, nextState : ScanFilenameId_On_PSM_Filter_UserSelection_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if ( this.props.allSearches_Have_ScanFilenames ) {

            if (
                this.state.skip_show_ShowingAll_Message !== nextState.skip_show_ShowingAll_Message
                || this.props.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject !== nextProps.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
                || this.state.forceUpdate !== nextState.forceUpdate
            ) {
                return true;
            }
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

    private _remove_ShowingAllMessage() {
        this.setState({ skip_show_ShowingAll_Message: true });
    }

    /**
     *
     */
    render() {
        try {
            let selectionsElementBlock: React.JSX.Element = undefined;
            let show_ShowingAll_Message : boolean = false;

            if ( this.props.allSearches_Have_ScanFilenames ) {


                const scanFilenameIds_Selected = this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();

                let showingForAllSearchScanFiles = true;
                if ( scanFilenameIds_Selected ) {
                    showingForAllSearchScanFiles = false;
                }

                if ( showingForAllSearchScanFiles && ( ! this.state.skip_show_ShowingAll_Message ) ) {

                    show_ShowingAll_Message = true;

                } else {
                    //  Render all selections
                    selectionsElementBlock = this._render_ScanFilename_Selections();
                }
            }

            return (
                <React.Fragment>

                    {/* Parent is CSS Grid with 2 Columns */}

                    <div className=" filter-common-filter-label ">
                        Filter On Scan Filename:

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Only data from the selected scan file(s) will be used.
                                </span>
                            }
                        />
                    </div>

                    <div className=" filter-common-selection-block " >

                        {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                        <div style={ { marginBottom: 6 } }>

                            <div>

                                { ( ! this.props.allSearches_Have_ScanFilenames ) ? (
                                    <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                                        Not all searches have scan filenames
                                    </div>
                                ) : ( show_ShowingAll_Message ) ? (
                                    <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                                        <span
                                            className=" filter-single-value-display-block clickable "
                                            onClick={ event => { this._remove_ShowingAllMessage() } }
                                        >
                                            Showing All
                                        </span>
                                        <span> </span>
                                        <span
                                            className=" fake-link "
                                            style={ { fontSize: 10 } }
                                            onClick={ event => { this._remove_ShowingAllMessage() } }
                                        >
                                            Change Selection
                                        </span>
                                    </div>
                                ) : (
                                    selectionsElementBlock
                                )}
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

    //////////////////////

    /**
     *  Render ScanFilename Selections
     *
     *
     */
    private _render_ScanFilename_Selections() : React.JSX.Element {

        const selectionsElements: Array<React.JSX.Element> = [];

        const multipleSearches = this.props.projectSearchIds.length > 1;

        const searchScanFileData_For_ProjectSearchIdArray : Array<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry> = [];

        for ( const projectSearchId of this.props.projectSearchIds ) {
            const searchScanFileData_For_ProjectSearchId = this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId(projectSearchId);
            if ( ! searchScanFileData_For_ProjectSearchId ) {
                const msg = "this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId(projectSearchId); returned nothing for : " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            searchScanFileData_For_ProjectSearchIdArray.push(searchScanFileData_For_ProjectSearchId);
        }

        //  Sort on Search Id
        searchScanFileData_For_ProjectSearchIdArray.sort( (a, b) => {
            if ( a.searchId < b.searchId ) {
                return -1;
            }
            if ( a.searchId > b.searchId ) {
                return 1
            }
            return 0;
        });

        const scanFilenameIds_Selected = this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();

        let showingForAllSearchScanFiles = true;
        if ( scanFilenameIds_Selected ) {
            showingForAllSearchScanFiles = false;
        }

        for ( const searchScanFileData_For_ProjectSearchId of searchScanFileData_For_ProjectSearchIdArray ) {

            for ( const searchScanFileData of searchScanFileData_For_ProjectSearchId.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                const element = (

                    <div
                        key={ searchScanFileData.searchScanFileId }
                    >
                        <div className=" label-element-like ">  {/* CSS Class to make this <div> format and hover like <label>  */}
                            <div
                                className=" clickable "
                                style={ { display: "flex", alignItems: "baseline" } }
                                onClick={ event => {
                                    try {
                                        let all_SearchScanFileIds: Set<number> = undefined;
                                        let scanFilenameIds_Selected_InOnChange = this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();
                                        if ( ! scanFilenameIds_Selected_InOnChange ) {
                                            all_SearchScanFileIds = this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds();
                                            scanFilenameIds_Selected_InOnChange = new Set( all_SearchScanFileIds );
                                        }

                                        if ( ! scanFilenameIds_Selected_InOnChange.has( searchScanFileData.searchScanFileId ) ) {
                                            scanFilenameIds_Selected_InOnChange.add( searchScanFileData.searchScanFileId );

                                            if ( ! all_SearchScanFileIds ) {
                                                all_SearchScanFileIds = this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds();
                                            }
                                            if ( scanFilenameIds_Selected_InOnChange.size === all_SearchScanFileIds.size ) {
                                                // All Selected so set to undefined
                                                scanFilenameIds_Selected_InOnChange = undefined;
                                            }
                                        } else {
                                            scanFilenameIds_Selected_InOnChange.delete( searchScanFileData.searchScanFileId );
                                        }
                                        this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected( scanFilenameIds_Selected_InOnChange );

                                        this.setState( { forceUpdate: {} } );

                                        this.props.updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback();


                                    } catch( e ) {
                                        console.warn("Exception caught in onclick", e );
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                }}
                            >
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={ showingForAllSearchScanFiles || scanFilenameIds_Selected.has( searchScanFileData.searchScanFileId ) }
                                        onChange={ event => {
                                            let all_SearchScanFileIds: Set<number> = undefined;
                                            let scanFilenameIds_Selected_InOnChange = this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();
                                            if ( ! scanFilenameIds_Selected_InOnChange ) {
                                                all_SearchScanFileIds = this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds();
                                                scanFilenameIds_Selected_InOnChange = new Set( all_SearchScanFileIds );
                                            }

                                            if ( event.target.checked ) {
                                                scanFilenameIds_Selected_InOnChange.add( searchScanFileData.searchScanFileId );

                                                if ( ! all_SearchScanFileIds ) {
                                                    all_SearchScanFileIds = this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_All_SearchScanFileIds();
                                                }
                                                if ( scanFilenameIds_Selected_InOnChange.size === all_SearchScanFileIds.size ) {
                                                    // All Selected so set to undefined
                                                    scanFilenameIds_Selected_InOnChange = undefined;
                                                }
                                            } else {
                                                scanFilenameIds_Selected_InOnChange.delete( searchScanFileData.searchScanFileId );
                                            }
                                            this.props.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected( scanFilenameIds_Selected_InOnChange );

                                            this.setState( { forceUpdate: {} } );

                                            this.props.updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback();

                                        } }
                                    />
                                </div>
                                <div className=" word-break-break-word-backup-break-all ">
                                    <span>{ searchScanFileData.filename }</span>
                                    <span> </span>
                                    { ( multipleSearches ) ? (
                                        <span style={ { whiteSpace: "nowrap" } }>
                                            { "(" + searchScanFileData.searchId + ")" }
                                        </span>
                                    ) : null }
                                </div>
                            </div>
                        </div>
                    </div>
                );

                selectionsElements.push(element);
            }
        }

        const selectionsElementBlock = (
            <div style={ { display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 2 } }>
                { selectionsElements }
            </div>
        )

        return selectionsElementBlock
    }
}



