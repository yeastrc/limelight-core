/**
 * scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay.tsx
 *
 *  Scan Number and Scan Files and/or Searches Selection
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/////

const _Overlay_Title = "Scan Number Filter"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 1000;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 1400;

const _Checkbox_ContainingDiv_Style: React.CSSProperties = { marginRight: 5 }


/**
 *
 */
export const get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component = function ( props: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_Props ) {

    return (
        <ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component
            { ...props }
        />
    )
}

////  Callback definitions



////  React Components

/**
 *
 */
interface ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_Props {

    projectSearchIds : Array<number>

    dataPageStateManager : DataPageStateManager

    /**
     * NOT Populated if no Searches have Scan Filenames
     *
     */
    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject;

    callbackOn_Cancel_Close_Clicked: () => void
    callbackOn_StateObject_Changed:  () => void
}

/**
 *
 */
interface ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component extends React.Component< ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_Props, ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_State > {

    private _add_Button_Clicked_BindThis = this._add_Button_Clicked.bind(this);
    private _scanNumber_UserInput_FieldChanged_BindThis = this._scanNumber_UserInput_FieldChanged.bind(this)
    private _allSearches_Checkbox_Clicked_BindThis = this._allSearches_Checkbox_Clicked.bind(this)
    private _search_or_ScanFile_Checkbox_Changed_BindThis = this._search_or_ScanFile_Checkbox_Changed.bind(this)

    private _scanNumber_UserInput: number

    private _scanFiles_Selections_Root: INTERNAL__Internal_Searches_ScanFiles_Selections_Root

    private _add_Button_Enabled = false

    /**
     *
     */
    constructor(props: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection__UserInputOverlay_Component_Props) {
        super(props);

        { //  this._scanFiles_Selections_Root  Initialize

            const searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId: Map<number, INTERNAL__Internal_Searches_ScanFiles_Selections_SingleSearch> = new Map()

            for ( const projectSearchId of props.projectSearchIds ) {
                searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId.set( projectSearchId, { projectSearchId, wholeSearch_Selected: false, searchScanFile_Ids_Selected: new Set() })
            }
            this._scanFiles_Selections_Root = {
                allSearches_Selected: false, searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId
            }
        }

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _add_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            this._enable_Disable_Add_Button()

            if ( ! this._add_Button_Enabled ) {
                //  Button should not be enabled based on current values

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }


            let wholeSearches_Selected_ProjectSearchIds: Set<number> = undefined
            let searchScanFile_Ids_Selected: Set<number> = undefined

            if ( ! this._scanFiles_Selections_Root.allSearches_Selected ) {

                for ( const searches_Or_Their_ScanFiles_Selections_Entry of this._scanFiles_Selections_Root.searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId.values() ) {
                    if ( searches_Or_Their_ScanFiles_Selections_Entry.wholeSearch_Selected ) {
                        if ( ! wholeSearches_Selected_ProjectSearchIds ) {
                            wholeSearches_Selected_ProjectSearchIds = new Set()
                        }
                        wholeSearches_Selected_ProjectSearchIds.add( searches_Or_Their_ScanFiles_Selections_Entry.projectSearchId )
                    } else {
                        if ( searches_Or_Their_ScanFiles_Selections_Entry.searchScanFile_Ids_Selected.size > 0 ) {
                            if ( ! searchScanFile_Ids_Selected ) {
                                searchScanFile_Ids_Selected = new Set()
                            }
                            for ( const searchScanFile_Id of searches_Or_Their_ScanFiles_Selections_Entry.searchScanFile_Ids_Selected ) {
                                searchScanFile_Ids_Selected.add( searchScanFile_Id )
                            }
                        }
                    }
                }
            }

            const stateObject_Entry: ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject__ENTRY = {

                scanNumber: this._scanNumber_UserInput,
                allSearches_Selected: this._scanFiles_Selections_Root.allSearches_Selected,
                wholeSearches_Selected_ProjectSearchIds,
                searchScanFile_Ids_Selected
            }

            this.props.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.add_Entry( stateObject_Entry )

            this.props.callbackOn_StateObject_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _scanNumber_UserInput_FieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const newValue_InField = event.target.value.replaceAll( ".", "").replaceAll( ",", "" ).trim()

            if ( newValue_InField === "" ) {

                this._scanNumber_UserInput = undefined

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            const newValue_Number = Number.parseInt( newValue_InField )

            if ( Number.isNaN( newValue_Number ) ) {

                this._scanNumber_UserInput = undefined

                this._enable_Disable_Add_Button()

                this.setState({ objectForceRerender: {} })

                return // EARLY RETURN
            }

            this._scanNumber_UserInput = newValue_Number

            this._enable_Disable_Add_Button()

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _allSearches_Checkbox_Clicked( event: unknown ) {
        try {
            //  Invert Selection
            this._scanFiles_Selections_Root.allSearches_Selected = ! this._scanFiles_Selections_Root.allSearches_Selected

            this._enable_Disable_Add_Button()

            this.setState({ objectForceRerender: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _search_or_ScanFile_Checkbox_Changed() {

        this._enable_Disable_Add_Button()

        this.setState({ objectForceRerender: {} })
    }

    private _enable_Disable_Add_Button() {

        this._add_Button_Enabled = false;

        if ( this._scanNumber_UserInput ) {

            if ( this._scanFiles_Selections_Root.allSearches_Selected ) {

                this._add_Button_Enabled = true

                return // EARLY RETURN
            }

            for ( const searches_Or_Their_ScanFiles_Selections_Entry of this._scanFiles_Selections_Root.searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId.values() ) {

                if ( searches_Or_Their_ScanFiles_Selections_Entry.wholeSearch_Selected
                    || searches_Or_Their_ScanFiles_Selections_Entry.searchScanFile_Ids_Selected.size > 0 ) {

                    this._add_Button_Enabled = true

                    return // EARLY RETURN
                }
            }
        }
    }

    /**
     *
     */
    render() {

        const selectionsElements: Array<React.JSX.Element>  = []

        for ( const projectSearchId of this.props.projectSearchIds ) {

            const searchData_For_ProjectSearchId = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                throw Error("this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const singleSearch_CurrentSelections = this._scanFiles_Selections_Root.searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId.get( projectSearchId )

            const element = (
                <INTERNAL__SingleSearch_Component
                    key={ projectSearchId }
                    allSearches_Selected={  this._scanFiles_Selections_Root.allSearches_Selected }
                    singleSearch_CurrentSelections={ singleSearch_CurrentSelections }
                    projectSearchId={ projectSearchId }
                    dataPageStateManager={ this.props.dataPageStateManager }

                    /**
                     * NOT Populated if no Searches have Scan Filenames
                     *
                     */
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder={ this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder }

                    callbackOn_Selection_Changed={ this._search_or_ScanFile_Checkbox_Changed_BindThis }
                />
            )
            selectionsElements.push( element )
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div style={ { marginBottom: 10 } }>
                            <div style={ { position: "relative", display: "inline-block" } } >
                                <button
                                    disabled={ ! this._add_Button_Enabled }
                                    onClick={ this._add_Button_Clicked_BindThis }
                                >
                                    Add
                                </button>
                                { ! this._add_Button_Enabled ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Enter a Scan Number and select something below in searchs and scan numbers to add
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <div
                                            style={ { position: "absolute", inset: 0 } }
                                        >
                                        </div>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                ) : null }
                            </div>
                            <span> </span>
                            <button
                                onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            No changes are saved until "Add" is clicked.
                        </div>

                        <div className="standard-border-color-dark"
                             style={ { marginTop: 7, marginBottom: 8, width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 } }
                        ></div>

                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */}

                        <div style={ { marginBottom: 10 } }>
                            <span>Scan Number: </span>
                            <input
                                type="text"
                                maxLength={ 25 }
                                autoFocus={ true }
                                placeholder="Scan Number"
                                value={ this._scanNumber_UserInput !== undefined ? this._scanNumber_UserInput : "" }
                                onChange={ this._scanNumber_UserInput_FieldChanged_BindThis }
                            />
                        </div>
                        <div style={ { display: "flex", flexDirection: "column", gap: 10 } }>

                            <div style={ { display: "flex" } }>
                                <div style={ _Checkbox_ContainingDiv_Style }>
                                    <input
                                        type="checkbox"
                                        checked={ this._scanFiles_Selections_Root.allSearches_Selected }
                                        onChange={ this._allSearches_Checkbox_Clicked_BindThis }  // onChange since react not like no onChange when managed component
                                    />
                                </div>
                                <div style={ { width: "calc(100% - 40px)", flexGrow: 0 } }>
                                    <span
                                        className=" clickable "
                                        style={ { overflowWrap: "break-word" } }
                                        onClick={ this._allSearches_Checkbox_Clicked_BindThis }
                                    >
                                        All Searches and their scan files
                                    </span>
                                </div>
                            </div>

                            { selectionsElements }

                        </div>
                    </div>

                </React.Fragment>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}


//////////////////////////

//  Single Search

/**
 *
 */
interface INTERNAL__SingleSearch_Component_Props {

    allSearches_Selected: boolean
    singleSearch_CurrentSelections: INTERNAL__Internal_Searches_ScanFiles_Selections_SingleSearch

    projectSearchId: number

    dataPageStateManager: DataPageStateManager

    /**
     * NOT Populated if no Searches have Scan Filenames
     *
     */
    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    callbackOn_Selection_Changed: () => void
}

/**
 *
 */
interface INTERNAL__SingleSearch_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class INTERNAL__SingleSearch_Component extends React.Component< INTERNAL__SingleSearch_Component_Props, INTERNAL__SingleSearch_Component_State > {

    private _search_Checkbox_Clicked_BindThis = this._search_Checkbox_Clicked.bind(this)
    private _singleScanFile_UnderSearch_Component__Changed_Callback_BindThis = this._singleScanFile_UnderSearch_Component__Changed_Callback.bind(this)

    /**
     *
     */
    constructor(props: INTERNAL__SingleSearch_Component_Props) {
        super(props);

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    private _search_Checkbox_Clicked( event: unknown ) {
        try {
            this.props.singleSearch_CurrentSelections.wholeSearch_Selected = ! this.props.singleSearch_CurrentSelections.wholeSearch_Selected

            this.setState({ objectForceRerender: {} })

            this.props.callbackOn_Selection_Changed()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _singleScanFile_UnderSearch_Component__Changed_Callback( params: INTERNAL__SingleScanFile_UnderSearch_Component__Changed_Callback_Params ) : void {

        //  Could change to move the add/delete to the scan file component

        if ( params.fileIsSelected ) {
            this.props.singleSearch_CurrentSelections.searchScanFile_Ids_Selected.add( params.searchScanFileId )
        } else {
            this.props.singleSearch_CurrentSelections.searchScanFile_Ids_Selected.delete( params.searchScanFileId )
        }

        this.setState({ objectForceRerender: {} })

        this.props.callbackOn_Selection_Changed()
    }

    /**
     *
     */
    render() {

        const projectSearchId = this.props.projectSearchId

        const searchData_For_ProjectSearchId = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
        if ( ! searchData_For_ProjectSearchId ) {
            throw Error("this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        let scanFiles_ForSearch_Elements: Array<React.JSX.Element> = undefined

        if ( this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {

            const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder =
                this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( projectSearchId )

            if ( scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                && scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_EntryCount() > 1 ) {

                scanFiles_ForSearch_Elements = []

                for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

                    let fileIsSelected = false
                    if ( this.props.singleSearch_CurrentSelections.searchScanFile_Ids_Selected && this.props.singleSearch_CurrentSelections.searchScanFile_Ids_Selected.has( searchScanFileData.searchScanFileId ) ) {
                        fileIsSelected = true
                    }

                    const element = (
                        <INTERNAL__SingleScanFile_UnderSearch_Component
                            key={ searchScanFileData.searchScanFileId }
                            searchScanFileData={ searchScanFileData }
                            fileIsSelected={ fileIsSelected }
                            wholeSearch_Selected={ this.props.singleSearch_CurrentSelections.wholeSearch_Selected }
                            allSearches_Selected={ this.props.allSearches_Selected }
                            callbackOn_Selection_Changed={ this._singleScanFile_UnderSearch_Component__Changed_Callback_BindThis }
                        />
                    )

                    scanFiles_ForSearch_Elements.push( element )
                }
            }
        }

        let searchSelected = false

        if ( this.props.allSearches_Selected || this.props.singleSearch_CurrentSelections.wholeSearch_Selected ) {

            searchSelected = true
        }

        let title_SearchCheckbox: string = null

        if ( this.props.allSearches_Selected ) {
            title_SearchCheckbox = "Selected since All Searches is selected"
        }

        return (
            <div>
                {/*  Display Search  */}
                <div style={ { display: "flex" } }>
                    <div style={ _Checkbox_ContainingDiv_Style }>
                        <input
                            type="checkbox"
                            checked={ searchSelected }
                            disabled={ this.props.allSearches_Selected }
                            title={ title_SearchCheckbox }
                            onChange={ this._search_Checkbox_Clicked_BindThis }  // onChange since react not like no onChange when managed component
                        />
                    </div>
                    <div style={ { width: "calc(100% - 40px)", flexGrow: 0 } }>
                        <span
                            className=" clickable "
                            style={ { overflowWrap : "break-word" } }
                            onClick={ this._search_Checkbox_Clicked_BindThis }
                        >
                            Search: ({ searchData_For_ProjectSearchId.searchId }) { searchData_For_ProjectSearchId.name }
                        </span>
                    </div>
                </div>
                { scanFiles_ForSearch_Elements ? (
                    <div style={ { display: "flex", flexDirection: "column", gap: 10, marginLeft: 20, marginTop: 10 } }>
                        { scanFiles_ForSearch_Elements }
                    </div>
                ) : null }
            </div>
        );
    }


}



//////////////////////////

//  Single Scan File under Search

class INTERNAL__SingleScanFile_UnderSearch_Component__Changed_Callback_Params {
    searchScanFileId: number
    fileIsSelected: boolean
}

/**
 *
 */
interface INTERNAL__SingleScanFile_UnderSearch_Component_Props {

    searchScanFileData: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry

    allSearches_Selected : boolean
    wholeSearch_Selected : boolean
    fileIsSelected: boolean

    callbackOn_Selection_Changed:  ( params: INTERNAL__SingleScanFile_UnderSearch_Component__Changed_Callback_Params ) => void
}

/**
 *
 */
interface INTERNAL__SingleScanFile_UnderSearch_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class INTERNAL__SingleScanFile_UnderSearch_Component extends React.Component< INTERNAL__SingleScanFile_UnderSearch_Component_Props, INTERNAL__SingleScanFile_UnderSearch_Component_State > {

    private _scanFile_Checkbox_Clicked_BindThis = this._scanFile_Checkbox_Clicked.bind(this)

    /**
     *
     */
    constructor(props: INTERNAL__SingleScanFile_UnderSearch_Component_Props) {
        super(props);

        try {
            this.state = {
                objectForceRerender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    private _scanFile_Checkbox_Clicked( event: unknown ) {
        try {
            const fileIsSelected = ! this.props.fileIsSelected

            this.props.callbackOn_Selection_Changed({ searchScanFileId: this.props.searchScanFileData.searchScanFileId, fileIsSelected })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let input_CheckboxField_Title: string = null

        if ( this.props.allSearches_Selected ) {
            input_CheckboxField_Title = "Selected since All Searches is selected"
        }
        if ( this.props.wholeSearch_Selected ) {
            input_CheckboxField_Title = "Selected since Search is selected"
        }

        return (
            <div>
                <div style={ { display: "flex" } }>
                    <div style={ _Checkbox_ContainingDiv_Style }>
                        <input
                            type="checkbox"
                            checked={ this.props.fileIsSelected || this.props.allSearches_Selected || this.props.wholeSearch_Selected }
                            disabled={ this.props.allSearches_Selected || this.props.wholeSearch_Selected }
                            title={ input_CheckboxField_Title }
                            onChange={ this._scanFile_Checkbox_Clicked_BindThis }  // onChange since react not like no onChange when managed component
                        />
                    </div>
                    <div style={ { width: "calc(100% - 40px)", flexGrow: 0 } }>
                        <span
                            className=" clickable "
                            style={ { overflowWrap : "break-word" } }
                            onClick={ this._scanFile_Checkbox_Clicked_BindThis }
                        >
                            { this.props.searchScanFileData.filename }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


////////////

//  Internal Classes

class INTERNAL__Internal_Searches_ScanFiles_Selections_Root {

    allSearches_Selected: boolean
    searches_Or_Their_ScanFiles_Selections__Map_Key_ProjectSearchId: Map<number, INTERNAL__Internal_Searches_ScanFiles_Selections_SingleSearch>
}

class INTERNAL__Internal_Searches_ScanFiles_Selections_SingleSearch {

    projectSearchId: number
    wholeSearch_Selected: boolean
    searchScanFile_Ids_Selected: Set<number>
}
