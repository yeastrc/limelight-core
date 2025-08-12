/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.tsx
 *
 * React Component
 *
 * Search Details Block for All Users
 */


import React from 'react'
import {
    DataPages_LoggedInUser_CommonObjectsFactory
} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import {
    SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback,
    SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params
} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/js/search_sub_group__manage__group_names__open_overlay__pass__project_search_id";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Comment_Item,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchFile_Item,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__WebLink_Item,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject,
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Search_Scan_File_Item
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";




const _STANDARD_PADDING_BOTTOM = 3
const _STANDARD_LABEL_PADDING_RIGHT = 4


export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component__DataChanged_Callback_Params {
    projectSearchId: number
}

export type SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component__DataChanged_Callback =
    (params: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component__DataChanged_Callback_Params) => void

/**
 *
 */
export interface SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_Props {

    //  force_Rerender_EmptyObjectReference_EmptyObjectReference:  Bypass all shouldComponentUpdate and render current value
    force_Rerender_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    //  force_ReloadFromServer_EmptyObjectReference:  Reload all data from server and display that data.  Display "Loading" message.
    force_ReloadFromServer_EmptyObjectReference: object  //  All child components need to compare this object reference for display updating message since a newer force_Rerender_EmptyObjectReference object may come down while the child component is getting data to refresh

    projectSearchId: number
    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject_Class

    update_force_ReRender_EmptyObjectReference_Callback: () => void
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender (Root class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component)
 *      is to create a new propValue : SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_Props_PropValue object
 *      and pass that as the props
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component extends React.Component<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_Props, SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_State> {

    private _searchDetails_ContentsChanged_Callback_BindThis = this._searchDetails_ContentsChanged_Callback.bind(this)
    private _search_SubGroups_ContentsChanged_Callback_BindThis = this._search_SubGroups_ContentsChanged_Callback.bind(this)
    private _searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments_Clicked_BindThis = this._searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments_Clicked.bind(this)

    private _show_LoadingData_Message = true

    private _searchDetails_CommonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    private _searchDetails_ForProjectSearchId: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item

    private _searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments = false

    /**
     *
     */
    constructor( props: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_Props ) {
        super( props );

        if ( props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject ) {

            this._searchDetails_ForProjectSearchId = props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_result_PerProjectSearchId_Item_For_ProjectSearchId( props.projectSearchId )

            if ( this._searchDetails_ForProjectSearchId ) {

                this._searchDetails_CommonForProject = props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_commonForProject()

                if ( ! this._searchDetails_CommonForProject ) {
                    throw Error("props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_result_PerProjectSearchId_Item_For_ProjectSearchId( props.projectSearchId ) returned a value BUT props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_commonForProject() did NOT")
                }

                this._show_LoadingData_Message = false
            }
        }

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( ! this._searchDetails_ForProjectSearchId ) {
                this._load_Data_FromServer_For_ProjectSearchId( this.props.projectSearchId )
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_Props>, prevState: Readonly<SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component_State>, snapshot?: any ) {
        try {
            if ( prevProps.projectSearchId !== this.props.projectSearchId
                || prevProps.force_ReloadFromServer_EmptyObjectReference !== this.props.force_ReloadFromServer_EmptyObjectReference ) {

                this._load_Data_FromServer_For_ProjectSearchId( this.props.projectSearchId )

                return
            }

            if ( prevProps.force_Rerender_EmptyObjectReference !== this.props.force_Rerender_EmptyObjectReference ) {

                if ( this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject ) {

                    this._searchDetails_CommonForProject = this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_commonForProject()
                    this._searchDetails_ForProjectSearchId = this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.get_result_PerProjectSearchId_Item_For_ProjectSearchId( this.props.projectSearchId )

                    this.setState({ force_Rerender_Object: {} })
                }
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _load_Data_FromServer_For_ProjectSearchId( projectSearchId: number ) : void {

        this._show_LoadingData_Message = true

        this.setState( { force_Rerender_Object: {} } )

        const promise__internal__get_SearchDetails_DataFromServer_All =
            searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer( {
                projectSearchIds: [ projectSearchId ],
                retrieveSearchNamesFromServer_Result__Optional__AssumedToBeUpToDate: undefined   //  ONLY populated on Project Search Based Page
            } )

        promise__internal__get_SearchDetails_DataFromServer_All.catch( reason => {
        } )
        promise__internal__get_SearchDetails_DataFromServer_All.then( ( searchDetails_Root ) => {
            try {

                this._searchDetails_CommonForProject = searchDetails_Root.commonForProject

                this._searchDetails_ForProjectSearchId = searchDetails_Root.get_result_PerProjectSearchId_Item_For_ProjectSearchId( this.props.projectSearchId )
                if ( ! this._searchDetails_ForProjectSearchId ) {
                    const msg = "searchDetails_Root.get_result_PerProjectSearchId_Item( this.props.projectSearchId ) returned NOTHING for this.props.projectSearchId: " + this.props.projectSearchId
                    console.warn( msg )
                    throw Error( msg )
                }

                this._show_LoadingData_Message = false
                this.setState( { force_Rerender_Object: {} } )

                if ( this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject ) {

                    this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.set_commonForProject( searchDetails_Root.commonForProject )
                    this.props.searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject.set_result_PerProjectSearchId_Item_For_ProjectSearchId( this._searchDetails_ForProjectSearchId )

                    if ( this.props.update_force_ReRender_EmptyObjectReference_Callback ) {
                        this.props.update_force_ReRender_EmptyObjectReference_Callback()
                    }
                }


            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e
            }
        } )
    }

    /**
     *
     * @private
     */
    private _searchDetails_ContentsChanged_Callback() : void {

        this._load_Data_FromServer_For_ProjectSearchId( this.props.projectSearchId )
    }

    /**
     *
     * @private
     */
    private _search_SubGroups_ContentsChanged_Callback() : void {

        if ( this.props.update_force_ReRender_EmptyObjectReference_Callback ) {

            this._load_Data_FromServer_For_ProjectSearchId( this.props.projectSearchId )
        }

        limelight__ReloadPage_Function()
    }

    /**
     *
     * @param event
     * @private
     */
    private _searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            this._searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments = true
            this.setState( { force_Rerender_Object: {} } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    render() {

        const rootDiv_Style: React.CSSProperties = { marginTop: 7, marginLeft: 30 }

        if ( this._show_LoadingData_Message ) {
            return (
                <div
                    style={ rootDiv_Style }
                >
                    <span
                        style={ { color: "green", fontSize: 18 } }
                    >
                        LOADING
                    </span>
                </div>
            )
        }

        return (
            <div
                style={ rootDiv_Style }
            >
                <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>

                    {/* 2 column grid */ }

                    { this._searchDetails_ForProjectSearchId.mainPart.path ? (
                        <>
                            <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                Path:
                            </div>
                            {/* Add  'word-break: break-word;' to keep path on overlay in single protein overlay.
                                'word-break: break-word;' is deprecated but adding 'overflow-wrap: break-word;' does not work.
                                */ }
                            <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                                <span style={ { overflowWrap: "break-word" } }>
                                    { this._searchDetails_ForProjectSearchId.mainPart.path }
                                </span>
                            </div>
                        </>
                    ) : null }

                    <Internal__SubGroups_Component
                        projectSearchId={ this.props.projectSearchId }
                        searchDetails_CommonForProject={ this._searchDetails_CommonForProject }
                        searchDetails_ForProjectSearchId={ this._searchDetails_ForProjectSearchId }
                        dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                        search_SubGroups_ContentsChanged_Callback={ this._search_SubGroups_ContentsChanged_Callback_BindThis }
                    />

                    { this._searchDetails_ForProjectSearchId.mainPart.searchProgramsPerSearchList ? (
                        <>
                            <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                Search Programs:
                            </div>
                            <div style={ {
                                display: "grid",
                                gridTemplateColumns: "min-content 1fr",
                                paddingBottom: _STANDARD_PADDING_BOTTOM
                            } }>
                                { this._searchDetails_ForProjectSearchId.mainPart.searchProgramsPerSearchList.map( ( searchProgramsPerSearch_Entry, index ) => {
                                    return (
                                        <React.Fragment key={ searchProgramsPerSearch_Entry.id }>
                                            <div style={ {
                                                whiteSpace: "nowrap",
                                                marginRight: _STANDARD_LABEL_PADDING_RIGHT
                                            } }>
                                                { searchProgramsPerSearch_Entry.displayName }
                                            </div>
                                            <div>
                                                { searchProgramsPerSearch_Entry.version }
                                            </div>
                                        </React.Fragment>
                                    )
                                } ) }
                            </div>
                        </>
                    ) : null }

                    { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Name ? (
                        <>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Program used to generate Limelight XML file
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <div
                                    style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }
                                >
                                    Converter Program:
                                </div>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr", paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                    Name:
                                </div>
                                <div>
                                    { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Name }
                                </div>
                                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                    Version:
                                </div>
                                <div>
                                    { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Version }
                                </div>
                                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                    URL:
                                </div>
                                <div>
                                    { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Pgm_URI }
                                </div>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Date Conversion Program was run
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }
                                    >
                                        Conversion Date:
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                <div>
                                    { this._searchDetails_ForProjectSearchId.mainPart.formatted_converterProgram_ConversionDate }
                                </div>
                                { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Pgm_Arguments ? (
                                    <>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Command Line Arguments
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }
                                            >
                                                CLI Arguments:
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        <div>
                                            { ! this._searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments ? (
                                                <span
                                                    className=" fake-link "
                                                    onClick={ this._searchDetails_ForProjectSearchId__Show__converterProgram_Pgm_Arguments_Clicked_BindThis }
                                                >
                                                    Show Command Line Arguments
                                                </span>
                                            ) : (
                                                <span>
                                                    { this._searchDetails_ForProjectSearchId.mainPart.converterProgram_Pgm_Arguments }
                                                </span>
                                            ) }
                                        </div>
                                    </>
                                ) : null }
                            </div>
                        </>
                    ) : null }

                    <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                        Upload:
                    </div>
                    {/* Add  'word-break: break-word;' to keep path on overlay in single protein overlay.
                        'word-break: break-word;' is deprecated but adding 'overflow-wrap: break-word;' does not work.
                        */ }
                    <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                        <span style={ { overflowWrap: "break-word" } }>
                            { this._searchDetails_ForProjectSearchId.mainPart.formattedLoadTime }
                        </span>
                    </div>

                    <Internal__FASTA_File_Component
                        searchDetails_ForProjectSearchId={ this._searchDetails_ForProjectSearchId }
                    />

                    { this._searchDetails_ForProjectSearchId.mainPart.scanFile_List && this._searchDetails_ForProjectSearchId.mainPart.scanFile_List.length > 0 ? (
                        <>
                            <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                Scan Filenames:
                            </div>
                            {/* Add  'word-break: break-word;' to keep path on overlay in single protein overlay.
                                'word-break: break-word;' is deprecated but adding 'overflow-wrap: break-word;' does not work.
                                */ }
                            <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                                <span style={ { overflowWrap: "break-word" } }>
                                    { this._searchDetails_ForProjectSearchId.mainPart.scanFile_List.map( (scanFile_Entry, scanFile_Entry_Index, scanFile_List_Inside_Map) => {

                                        const commaAfter = scanFile_Entry_Index !== scanFile_List_Inside_Map.length - 1;
                                        return (
                                            <Internal__Scan_File_Component
                                                key={ scanFile_Entry.id }
                                                search_Scan_File_Item={ scanFile_Entry}
                                                projectSearchId={ this._searchDetails_ForProjectSearchId.mainPart.projectSearchId }
                                                commaAfter={ commaAfter }
                                            />
                                        )
                                    }) }
                                </span>
                            </div>
                        </>
                    ) : null }

                    <Internal__WebLinks_Component
                        projectSearchId={ this._searchDetails_ForProjectSearchId.mainPart.projectSearchId }
                        searchDetails__CommonForProject={ this._searchDetails_CommonForProject }
                        searchDetails_ForProjectSearchId={ this._searchDetails_ForProjectSearchId }
                        dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                        searchDetails_ContentsChanged_Callback={ this._searchDetails_ContentsChanged_Callback_BindThis }
                    />

                    { this._searchDetails_ForProjectSearchId.mainPart.searchFileList && this._searchDetails_ForProjectSearchId.mainPart.searchFileList.length > 0 ? (
                        <>
                            <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                                Additional files:
                            </div>
                            <div style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                                { this._searchDetails_ForProjectSearchId.mainPart.searchFileList.map((searchFile_Entry, index) => {

                                    return (
                                        <Internal__SearchFile_Entry_Component
                                            key={ searchFile_Entry.id }
                                            projectSearchId={ this.props.projectSearchId }
                                            searchFile_Entry={ searchFile_Entry }
                                            dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                            searchDetails_ContentsChanged_Callback={ this._searchDetails_ContentsChanged_Callback_BindThis }
                                        />
                                    )
                                })}
                            </div>
                        </>
                    ) : null }

                    <Internal__Comments_Component
                        projectSearchId={ this._searchDetails_ForProjectSearchId.mainPart.projectSearchId }
                        searchDetails__CommonForProject={ this._searchDetails_CommonForProject }
                        searchDetails_ForProjectSearchId={ this._searchDetails_ForProjectSearchId }
                        dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                        searchDetails_ContentsChanged_Callback={ this._searchDetails_ContentsChanged_Callback_BindThis }
                    />

                </div>
            </div>
        )
    }
}

///////////////////

/**
 *
 */
interface Internal__FASTA_File_Component_Props {

    searchDetails_ForProjectSearchId: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item
}

/**
 *
 */
interface Internal__FASTA_File_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__FASTA_File_Component extends React.Component<Internal__FASTA_File_Component_Props, Internal__FASTA_File_Component_State> {

    private _fasta_Filename_Clicked_For_Download_BindThis = this._fasta_Filename_Clicked_For_Download.bind(this)

    /**
     *
     */
    constructor( props: Internal__FASTA_File_Component_Props ) {
        super( props );

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _fasta_Filename_Clicked_For_Download( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {

            let requestObj = {
                weuonklUUUQSJDVCWvweyhizwoqy: true
            };

            const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

            console.log( "_fasta_Filename_Clicked_For_Download(): first call webservice at URL: " + url )

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {  }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log( "_fasta_Filename_Clicked_For_Download(): called webservice at URL: " + url + ", responseData.downloadIdentifier: " + responseData.downloadIdentifier + ", next call this._fasta_Filename_Clicked_For_Download_DoActual(...)" )

                    this._fasta_Filename_Clicked_For_Download_DoActual({
                        downloadIdentifier: responseData.downloadIdentifier
                    })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @private
     */
    private _fasta_Filename_Clicked_For_Download_DoActual(
        {
            downloadIdentifier
        } : {
            downloadIdentifier: string
        }
    ) {

        const requestJSONObject = {
            projectSearchId: this.props.searchDetails_ForProjectSearchId.mainPart.projectSearchId,
            fileObjectStorageForSearch_Id : this.props.searchDetails_ForProjectSearchId.mainPart.fastaFile_FileObjectStorageId,
            downloadIdentifier
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        form.style.display = "none"

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/file-object-storage-entry");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        requestJSONStringField.value = requestJSONString

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary

        try {
            form.submit();
        } finally {

            document.body.removeChild(form);
        }

        this._fasta_Filename_Clicked_For_Download_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
    }
    /**
     *
     * @param downloadIdentifier
     * @param retryCount
     */
    _fasta_Filename_Clicked_For_Download_AfterSubmitForm(
        {
            downloadIdentifier, retryCount
        } : {
            downloadIdentifier: string
            retryCount: number
        }
    ) {

        console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )


        let requestObj = {
            downloadIdentifier
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

        console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", next call webservice at url: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {

                if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                    console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    const _RETRY_COUNT_MAX = 20

                    const _MIN_DELAY_IN_SECONDS = 3

                    if ( retryCount > _RETRY_COUNT_MAX ) {

                        console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                            ", downloadIdentifier: " + downloadIdentifier +
                            ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                        return // EARLY RETURN
                    }

                    const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                    //  Retry after wait
                    window.setTimeout( () => {

                        this._fasta_Filename_Clicked_For_Download_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                    }, timeoutDelay )

                    return  // EARLY RETURN
                }

                if ( responseData.statusSuccess ) {

                    //  Successful

                    console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    return  // EARLY RETURN
                }

                if ( responseData.statusFail ) {

                    //  Fail

                    console.log( "_fasta_Filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    window.alert( "FASTA Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                    return  // EARLY RETURN
                }

                //  NOT expect to get here

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }


    /**
     *
     */
    render() {

        return (
            <>
                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                    FASTA file:
                </div>
                {/* Add  'word-break: break-word;' to keep path on overlay in single protein overlay.
                        'word-break: break-word;' is deprecated but adding 'overflow-wrap: break-word;' does not work.
                        */
                }
                <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>

                    { this.props.searchDetails_ForProjectSearchId.mainPart.fastaFile_FileObjectStorageId ? (
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to download FASTA file
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                style={ { overflowWrap: "break-word" } }
                                className=" fake-link "
                                onClick={ this._fasta_Filename_Clicked_For_Download_BindThis }
                            >
                                { this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    ) : (
                        ( this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename === ""
                            || this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename === undefined
                            || this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename === null ) ? (
                            <span>
                                Not Applicable
                            </span>
                        ) : (
                            <span>
                                { this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename }
                            </span>
                        )
                    ) }
                    { this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename_IfLimelightXMLHasDifferentFilename ? (
                        <>
                            <span> </span>
                            <span>
                                    (listed as { this.props.searchDetails_ForProjectSearchId.mainPart.fastaFilename_IfLimelightXMLHasDifferentFilename } in Limelight XML)
                                </span>
                        </>
                    ) : null }
                </div>
            </>
        )
    }
}


///////////////////

/**
 *
 */
interface Internal__Scan_File_Component_Props {

    search_Scan_File_Item: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_Search_Scan_File_Item
    projectSearchId: number
    commaAfter: boolean
}

/**
 *
 */
interface Internal__Scan_File_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__Scan_File_Component extends React.Component<Internal__Scan_File_Component_Props, Internal__Scan_File_Component_State> {

    private _filename_Clicked_For_Download_BindThis = this._filename_Clicked_For_Download.bind(this)

    /**
     *
     */
    constructor( props: Internal__Scan_File_Component_Props ) {
        super( props );

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _filename_Clicked_For_Download( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {

            let requestObj = {
                weuonklUUUQSJDVCWvweyhizwoqy: true
            };

            const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

            console.log( "_filename_Clicked_For_Download(): first call webservice at URL: " + url )

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {  }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log( "_filename_Clicked_For_Download(): called webservice at URL: " + url + ", responseData.downloadIdentifier: " + responseData.downloadIdentifier + ", next call this._filename_Clicked_For_Download_DoActual(...)" )

                    this._filename_Clicked_For_Download_DoActual({
                        downloadIdentifier: responseData.downloadIdentifier
                    })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @private
     */
    private _filename_Clicked_For_Download_DoActual(
        {
            downloadIdentifier
        } : {
            downloadIdentifier: string
        }
    ) {

        const requestJSONObject = {
            projectSearchId: this.props.projectSearchId,
            searchScanFile_Id : this.props.search_Scan_File_Item.id,
            downloadIdentifier
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        form.style.display = "none"

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/scan-file-contents-from-file-object-storage-entry-using-search-scan-file-id-psid");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        requestJSONStringField.value = requestJSONString

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary

        try {
            form.submit();
        } finally {

            document.body.removeChild(form);
        }

        this._filename_Clicked_For_Download_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
    }

    /**
     *
     * @param downloadIdentifier
     * @param retryCount
     */
    _filename_Clicked_For_Download_AfterSubmitForm(
        {
            downloadIdentifier, retryCount
        } : {
            downloadIdentifier: string
            retryCount: number
        }
    ) {

        console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )


        let requestObj = {
            downloadIdentifier
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

        console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", next call webservice at url: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {

                if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                    console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    const _RETRY_COUNT_MAX = 20

                    const _MIN_DELAY_IN_SECONDS = 3

                    if ( retryCount > _RETRY_COUNT_MAX ) {

                        console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                            ", downloadIdentifier: " + downloadIdentifier +
                            ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                        return // EARLY RETURN
                    }

                    const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                    //  Retry after wait
                    window.setTimeout( () => {

                        this._filename_Clicked_For_Download_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                    }, timeoutDelay )

                    return  // EARLY RETURN
                }

                if ( responseData.statusSuccess ) {

                    //  Successful

                    console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    return  // EARLY RETURN
                }

                if ( responseData.statusFail ) {

                    //  Fail

                    console.log( "_filename_Clicked_For_Download_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    window.alert( "Scan Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                    return  // EARLY RETURN
                }

                //  NOT expect to get here

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     */
    render() {

        return (
            <>
                { this.props.search_Scan_File_Item.canDownload ? (
                    <>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to download scan file
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                style={ { overflowWrap: "break-word" } }
                                className=" fake-link "
                                onClick={ this._filename_Clicked_For_Download_BindThis }
                            >
                                { this.props.search_Scan_File_Item.filename }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </>
                ) : (
                    <span>
                        { this.props.search_Scan_File_Item.filename }
                    </span>
                ) }
                { this.props.commaAfter ? (
                    <span>, </span>
                ) : null }
            </>
        )
    }
}


///////////////////

//   Component for Sub Groups

/**
 *
 */
interface Internal__SubGroups_Component_Props {

    projectSearchId: number

    searchDetails_CommonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    searchDetails_ForProjectSearchId: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    search_SubGroups_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__SubGroups_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__SubGroups_Component extends React.Component<Internal__SubGroups_Component_Props, Internal__SubGroups_Component_State> {

    private _manage_SubGroups_Clicked_BindThis = this._manage_SubGroups_Clicked.bind( this )

    /**
     *
     */
    constructor( props: Internal__SubGroups_Component_Props ) {
        super( props );

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _manage_SubGroups_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            const searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback: SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback =
                ( params : SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params ) => {

                    this.props.search_SubGroups_ContentsChanged_Callback()
                }

            this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId()({
                projectSearchId: this.props.searchDetails_ForProjectSearchId.subGroupData.projectSearchId,
                searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        if ( ( ! this.props.searchDetails_ForProjectSearchId.subGroupData )
            || ( ! this.props.searchDetails_ForProjectSearchId.subGroupData.searchSubgroupItems )
            || this.props.searchDetails_ForProjectSearchId.subGroupData.searchSubgroupItems.length === 0 ) {

            //  No Data so render NOTHING

            return null;  // EARLY RETURN
        }


        return (
            //  2 Column Table
            <>
                <div style={ { paddingBottom: _STANDARD_PADDING_BOTTOM }}>
                    <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                        Sub Searches:
                    </div>
                    { this.props.searchDetails_CommonForProject.canEditSearchSubGroups ? (
                        <div>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Manage Sub Searches
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    className=" fake-link "
                                    style={ { fontSize: 12, whiteSpace: "nowrap" } }
                                    onClick={ this._manage_SubGroups_Clicked_BindThis }
                                >
                                    Manage
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    ) : null }
                </div>

                <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>

                    { this.props.searchDetails_ForProjectSearchId.subGroupData.searchSubgroupItems.map( (searchSubgroupItem, index) => {
                        return (
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                key={ searchSubgroupItem.searchSubGroupId }
                                title={
                                    <span>
                                        { searchSubgroupItem.subgroupName_fromImportFile }
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    key={ searchSubgroupItem.searchSubGroupId }
                                    style={ { overflowWrap: "break-word" } }
                                    className=" filter-single-value-display-block "
                                >
                                    { searchSubgroupItem.subgroupName_Display }
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        )
                    } ) }
                </div>

            </>
        )
    }
}

///////////////////

//   Component for Search File Entry

/**
 *
 */
interface Internal__SearchFile_Entry_Component_Props {

    projectSearchId: number
    searchFile_Entry: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__SearchFile_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__SearchFile_Entry_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__SearchFile_Entry_Component extends React.Component<Internal__SearchFile_Entry_Component_Props, Internal__SearchFile_Entry_Component_State> {

    private _searchFile_Name_Clicked_BindThis = this._searchFile_Name_Clicked.bind(this)
    private _edit_SearchFile_Name_Clicked_BindThis = this._edit_SearchFile_Name_Clicked.bind( this )

    private _searchFileName_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor( props: Internal__SearchFile_Entry_Component_Props ) {
        super( props );

        this._searchFileName_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _searchFile_Name_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            if ( this.props.searchFile_Entry.entryIsFileObjectStorageFile ) {

                this._download_Entry_Is_FileObjectStorageFile()
            } else {
                this._download_Entry_Is_NOT_FileObjectStorageFile()
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_NOT_FileObjectStorageFile() {

        let requestObj = {
            weuonklUUUQSJDVCWvweyhizwoqy: true
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

        console.log( "_download_Entry_Is_NOT_FileObjectStorageFile(): first call webservice at URL: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                console.log( "_download_Entry_Is_NOT_FileObjectStorageFile(): called webservice at URL: " + url + ", responseData.downloadIdentifier: " + responseData.downloadIdentifier + ", next call this._download_Entry_Is_NOT_FileObjectStorageFile_DoActual(...)" )

                this._download_Entry_Is_NOT_FileObjectStorageFile_DoActual({
                    downloadIdentifier: responseData.downloadIdentifier
                })

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_NOT_FileObjectStorageFile_DoActual(
        {
            downloadIdentifier
        } : {
            downloadIdentifier: string
        }
    ) {

        //  File contents stored in Limelight DB

        const requestJSONObject = {
            projectSearchId: this.props.projectSearchId,
            projectSearchFileId : this.props.searchFile_Entry.id,
            downloadIdentifier
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        form.style.display = "none"

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/search-file");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        requestJSONStringField.value = requestJSONString

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary

        try {
            form.submit();
        } finally {

            document.body.removeChild(form);
        }

        console.log( "at end of _download_Entry_Is_NOT_FileObjectStorageFile_DoActual(): downloadIdentifier: " + downloadIdentifier + ", next call this._download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(...)" )

        this._download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(
        {
            downloadIdentifier, retryCount
        } : {
            downloadIdentifier: string
            retryCount: number
        }
    ) {

        console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

        let requestObj = {
            downloadIdentifier
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

        console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", next call webservice at url: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {

                if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                    console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    const _RETRY_COUNT_MAX = 20

                    const _MIN_DELAY_IN_SECONDS = 3

                    if ( retryCount > _RETRY_COUNT_MAX ) {

                        console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                            ", downloadIdentifier: " + downloadIdentifier +
                            ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                        return // EARLY RETURN
                    }

                    const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                    //  Retry after wait
                    window.setTimeout( () => {

                        this._download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                    }, timeoutDelay )

                    return  // EARLY RETURN
                }

                if ( responseData.statusSuccess ) {

                    //  Successful

                    console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    return  // EARLY RETURN
                }

                if ( responseData.statusFail ) {

                    //  Fail

                    console.log( "_download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    window.alert( "File Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                    return  // EARLY RETURN
                }

                //  NOT expect to get here

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_FileObjectStorageFile() {

        let requestObj = {
            weuonklUUUQSJDVCWvweyhizwoqy: true
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

        console.log( "_download_Entry_Is_FileObjectStorageFile(): first call webservice at URL: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                console.log( "_download_Entry_Is_FileObjectStorageFile(): called webservice at URL: " + url + ", responseData.downloadIdentifier: " + responseData.downloadIdentifier + ", next call this._download_Entry_Is_FileObjectStorageFile_DoActual(...)" )

                this._download_Entry_Is_FileObjectStorageFile_DoActual({
                    downloadIdentifier: responseData.downloadIdentifier
                })

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_FileObjectStorageFile_DoActual(
        {
            downloadIdentifier
        } : {
            downloadIdentifier: string
        }
    ) {

        const requestJSONObject = {
            projectSearchId: this.props.projectSearchId,
            fileObjectStorageForSearch_Id : this.props.searchFile_Entry.id,
            downloadIdentifier
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        form.style.display = "none"

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/file-object-storage-entry");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        requestJSONStringField.value = requestJSONString

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary

        try {
            form.submit();
        } finally {

            document.body.removeChild(form);
        }

        console.log( "at end of _download_Entry_Is_NOT_FileObjectStorageFile_DoActual(): downloadIdentifier: " + downloadIdentifier + ", next call this._download_Entry_Is_NOT_FileObjectStorageFile_AfterSubmitForm(...)" )

        this._download_Entry_Is_FileObjectStorageFile_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
    }

    /**
     *
     * @private
     */
    private _download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(
        {
            downloadIdentifier, retryCount
        } : {
            downloadIdentifier: string
            retryCount: number
        }
    ) {

        console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

        let requestObj = {
            downloadIdentifier
        };

        const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

        console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): downloadIdentifier: " + downloadIdentifier + ", next call webservice at url: " + url )

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {

                if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                    console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    const _RETRY_COUNT_MAX = 20

                    const _MIN_DELAY_IN_SECONDS = 3

                    if ( retryCount > _RETRY_COUNT_MAX ) {

                        console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                            ", downloadIdentifier: " + downloadIdentifier +
                            ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                        return // EARLY RETURN
                    }

                    const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                    //  Retry after wait
                    window.setTimeout( () => {

                        this._download_Entry_Is_FileObjectStorageFile_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                    }, timeoutDelay )

                    return  // EARLY RETURN
                }

                if ( responseData.statusSuccess ) {

                    //  Successful

                    console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    return  // EARLY RETURN
                }

                if ( responseData.statusFail ) {

                    //  Fail

                    console.log( "_download_Entry_Is_FileObjectStorageFile_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                    window.alert( "File Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                    return  // EARLY RETURN
                }

                //  NOT expect to get here

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
    }

    /**
     *
     * @param event
     * @private
     */
    private _edit_SearchFile_Name_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {

            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            const buttonContainer_BoundingRect = this._searchFileName_Div_Ref.current.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left;

            const  projectSearchFileId = this.props.searchFile_Entry.id

            this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay()({
                projectSearchId: this.props.projectSearchId,
                projectSearchFileId,
                existingSearchFileName: this.props.searchFile_Entry.name,
                position_top,
                position_left,
                change_Callback: this.props.searchDetails_ContentsChanged_Callback,
                cancel_Callback: undefined
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <div className=" word-break-break-word-backup-break-all " style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={
                        <span>
                            Download file
                        </span>
                    }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <span
                        ref={ this._searchFileName_Div_Ref }
                        className=" fake-link "
                        onClick={ this._searchFile_Name_Clicked_BindThis }
                    >
                        { this.props.searchFile_Entry.name }
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                { this.props.searchFile_Entry.canEdit ? (
                    <>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Edit name
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                src="static/images/icon-edit.png"
                                className="fake-link-image icon-small"
                                onClick={ this._edit_SearchFile_Name_Clicked_BindThis }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </>
                ) : null }
            </div>

        )
    }
}

///////////////////

//   Component for Comments

/**
 *
 */
interface Internal__Comments_Component_Props {

    projectSearchId: number

    searchDetails__CommonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    searchDetails_ForProjectSearchId: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__Comments_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__Comments_Component extends React.Component<Internal__Comments_Component_Props, Internal__Comments_Component_State> {

    private _add_Comment_Clicked_BindThis = this._add_Comment_Clicked.bind( this )

    private _add_Comment_Span_Ref: React.RefObject<HTMLSpanElement>; //  React.createRef()

    /**
     *
     */
    constructor( props: Internal__Comments_Component_Props ) {
        super( props );

        this._add_Comment_Span_Ref = React.createRef<HTMLSpanElement>();

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _add_Comment_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            const buttonContainer_BoundingRect = this._add_Comment_Span_Ref.current.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left;

            this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Add__OpenOverlay()({
                projectSearchId: this.props.projectSearchId,
                position_left,
                position_top,
                change_Callback: () => { this.props.searchDetails_ContentsChanged_Callback() },
                cancel_Callback: () => {}
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        if ( ( ! this.props.searchDetails__CommonForProject )
            || ( ! (
                this.props.searchDetails__CommonForProject.commentsShowBlockAlways
                || ( this.props.searchDetails_ForProjectSearchId.mainPart.commentList && this.props.searchDetails_ForProjectSearchId.mainPart.commentList.length > 0 ) ) ) ) {

            //  No Data so render NOTHING

            return null;  // EARLY RETURN
        }


        return (
            //  2 Column Table
            <>
                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                    Comments:
                </div>
                <div style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                    { ( this.props.searchDetails_ForProjectSearchId.mainPart.commentList && this.props.searchDetails_ForProjectSearchId.mainPart.commentList.length > 0 ) ? (
                        this.props.searchDetails_ForProjectSearchId.mainPart.commentList.map( ( comment_Entry, index ) => {

                            return (
                                <Internal__Comment_Entry_Component
                                    key={ comment_Entry.id }
                                    projectSearchId={ this.props.projectSearchId }
                                    comment_Entry={ comment_Entry }
                                    dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                    searchDetails_ContentsChanged_Callback={ this.props.searchDetails_ContentsChanged_Callback }
                                />
                            )
                        } )
                    ) : null }
                    { this.props.searchDetails__CommonForProject.commentsShowBlockAlways ? (
                        <div>
                           <span style={ { whiteSpace: "nowrap" } }>
                                <span>[</span>
                               <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                   title={
                                       <span>
                                           Add a Comment
                                       </span>
                                   }
                                   { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                               >
                                    <span
                                        ref={ this._add_Comment_Span_Ref }
                                        className=" fake-link "
                                        style={ { whiteSpace: "nowrap", fontSize: "80%", textDecoration: "none" } }
                                        onClick={ this._add_Comment_Clicked_BindThis }
                                    >
                                        +Comment
                                    </span>
                               </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                               <span>]</span>
                           </span>
                        </div>
                        ) : null }
                </div>
            </>
        )
    }
    }

    ///////////////////

//   Component for Comment Entry

/**
 *
 */
interface Internal__Comment_Entry_Component_Props {

    projectSearchId: number
    comment_Entry: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__Comment_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__Comment_Entry_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__Comment_Entry_Component extends React.Component<Internal__Comment_Entry_Component_Props, Internal__Comment_Entry_Component_State> {

    private _delete_Comment_Clicked_BindThis = this._delete_Comment_Clicked.bind( this )
    private _edit_Comment_Clicked_BindThis = this._edit_Comment_Clicked.bind( this )

    private _comment_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor( props: Internal__Comment_Entry_Component_Props ) {
        super( props );

        this._comment_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _delete_Comment_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            if ( ! window.confirm( "Delete Comment?" ) ) {
                return;  // EARLY RETURN
            }

            const commentId = this.props.comment_Entry.id

            const promise =
                this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete()( {
                    commentId
                } )
            promise.catch( reason => {
            } )
            promise.then( novalue => { try {

                this.props.searchDetails_ContentsChanged_Callback()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     * @param event
     * @private
     */
    private _edit_Comment_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            const buttonContainer_BoundingRect = this._comment_Div_Ref.current.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left;

            const  commentId = this.props.comment_Entry.id

            this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Change__OpenOverlay()({
                projectSearchId: this.props.projectSearchId,
                commentId,
                existing_CommentText: this.props.comment_Entry.commentText,
                position_top,
                position_left,
                change_Callback: () => {

                    if ( this.props.searchDetails_ContentsChanged_Callback ) {
                        this.props.searchDetails_ContentsChanged_Callback()

                        return // EARLY RETURN
                    }

                    limelight__ReloadPage_Function()

                }, // SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Change_Comment__Component_Change_Callback
                cancel_Callback: () => {}
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <div
                ref={ this._comment_Div_Ref }
                className=" word-break-break-word-backup-break-all "
                style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }
            >
                { this.props.comment_Entry.canDelete ? (
                    <>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Delete Comment
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                src="static/images/icon-circle-delete.png"
                                className="fake-link-image icon-small"
                                onClick={ this._delete_Comment_Clicked_BindThis }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                    </>
                ) : null }
                <span>
                    { this.props.comment_Entry.commentText }
                </span>
                { this.props.comment_Entry.canEdit ? (
                    <>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Edit Comment
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                src="static/images/icon-edit.png"
                                className="fake-link-image icon-small"
                                onClick={ this._edit_Comment_Clicked_BindThis }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </>
                ) : null }
                { this.props.comment_Entry.commentDate ? (
                    <>
                        <span> </span>
                        <span>
                            { this.props.comment_Entry.commentDate }
                        </span>
                    </>
                ) : null }
            </div>

        )
    }
}



///////////////////

//   Component for WebLinks

/**
 *
 */
interface Internal__WebLinks_Component_Props {

    projectSearchId: number

    searchDetails__CommonForProject: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result_CommonForProject
    searchDetails_ForProjectSearchId: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__PerProjectSearchId_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__WebLinks_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__WebLinks_Component extends React.Component<Internal__WebLinks_Component_Props, Internal__WebLinks_Component_State> {

    private _add_WebLink_Clicked_BindThis = this._add_WebLink_Clicked.bind( this )

    private _add_WebLink_Span_Ref: React.RefObject<HTMLSpanElement>; //  React.createRef()

    /**
     *
     */
    constructor( props: Internal__WebLinks_Component_Props ) {
        super( props );

        this._add_WebLink_Span_Ref = React.createRef<HTMLSpanElement>();

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _add_WebLink_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            const buttonContainer_BoundingRect = this._add_WebLink_Span_Ref.current.getBoundingClientRect();

            let position_top =  buttonContainer_BoundingRect.top;
            let position_left =  buttonContainer_BoundingRect.left;

            this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay()({
                projectSearchId: this.props.projectSearchId,
                position_left,
                position_top,
                change_Callback: () => { this.props.searchDetails_ContentsChanged_Callback() },
                cancel_Callback: () => {}
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        if ( ( ! this.props.searchDetails__CommonForProject )
            || ( ! (
                this.props.searchDetails__CommonForProject.weblinksShowBlockAlways
                || ( this.props.searchDetails_ForProjectSearchId.mainPart.webLinkList && this.props.searchDetails_ForProjectSearchId.mainPart.webLinkList.length > 0 ) ) ) ) {

            //  No Data so render NOTHING

            return null;  // EARLY RETURN
        }


        return (
            //  2 Column Table
            <>
                <div style={ { whiteSpace: "nowrap", marginRight: _STANDARD_LABEL_PADDING_RIGHT } }>
                    Raw MS data files:
                </div>
                <div style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }>
                    { ( this.props.searchDetails_ForProjectSearchId.mainPart.webLinkList && this.props.searchDetails_ForProjectSearchId.mainPart.webLinkList.length > 0 ) ? (
                        this.props.searchDetails_ForProjectSearchId.mainPart.webLinkList.map( ( webLink_Entry, index ) => {

                            return (
                                <Internal__WebLink_Entry_Component
                                    key={ webLink_Entry.id }
                                    projectSearchId={ this.props.projectSearchId }
                                    webLink_Entry={ webLink_Entry }
                                    dataPages_LoggedInUser_CommonObjectsFactory={ this.props.dataPages_LoggedInUser_CommonObjectsFactory }
                                    searchDetails_ContentsChanged_Callback={ this.props.searchDetails_ContentsChanged_Callback }
                                />
                            )
                        } )
                    ) : null }
                    { this.props.searchDetails__CommonForProject.weblinksShowAddWeblinkLink ? (
                        <div>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>[</span>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Add a Link to a Raw file
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span
                                        ref={ this._add_WebLink_Span_Ref }
                                        className=" fake-link "
                                        style={ { whiteSpace: "nowrap", fontSize: "80%", textDecoration: "none" } }
                                        onClick={ this._add_WebLink_Clicked_BindThis }
                                    >
                                        +Link to Raw file
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                <span>]</span>
                            </span>
                        </div>
                    ) : null }
                </div>
            </>
        )
    }
}

///////////////////

//   Component for WebLink Entry

/**
 *
 */
interface Internal__WebLink_Entry_Component_Props {

    projectSearchId: number
    webLink_Entry: SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers__GetDataFromServer_Result__WebLink_Item

    dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    searchDetails_ContentsChanged_Callback: () => void
}

/**
 *
 */
interface Internal__WebLink_Entry_Component_State {

    force_Rerender_Object?: object
}

/**
 *
 */
class Internal__WebLink_Entry_Component extends React.Component<Internal__WebLink_Entry_Component_Props, Internal__WebLink_Entry_Component_State> {

    private _delete_WebLink_Clicked_BindThis = this._delete_WebLink_Clicked.bind( this )

    private _webLink_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    /**
     *
     */
    constructor( props: Internal__WebLink_Entry_Component_Props ) {
        super( props );

        this._webLink_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            force_Rerender_Object: {}
        };
    }

    /**
     *
     * @param event
     * @private
     */
    private _delete_WebLink_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                return; // EARLY RETURN
            }

            if ( ! window.confirm( "Delete WebLink?" ) ) {
                return;  // EARLY RETURN
            }

            const webLinkId = this.props.webLink_Entry.id

            const promise =
                this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Delete()( {
                    webLinkId
                } )
            promise.catch( reason => {
            } )
            promise.then( novalue => {
                try {
                    this.props.searchDetails_ContentsChanged_Callback()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <div
                ref={ this._webLink_Div_Ref }
                className=" word-break-break-word-backup-break-all "
                style={ { paddingBottom: _STANDARD_PADDING_BOTTOM } }
            >
                { this.props.webLink_Entry.canDelete ? (
                    <>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Delete Link
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                src="static/images/icon-circle-delete.png"
                                className="fake-link-image icon-small"
                                onClick={ this._delete_WebLink_Clicked_BindThis }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                    </>
                ) : null }
                <a target="_blank" href={ this.props.webLink_Entry.linkURL }>
                    { this.props.webLink_Entry.linkLabel }
                </a>
            </div>
        )
    }
}

