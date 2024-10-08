/**
 * projectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Upload Limelight XML File and Optional Scan Files
 *
 *
 */


//////////////////////

//   Upload Limelight XML file and Optional Scan Files Component


import React from "react";
import {
    ProjectPage_UploadData_SendUploadFileToServer,
    ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback,
    ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params,
    ProjectPage_UploadData_SendUploadFileToServer__Send_Response
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_SendUploadFileToServer";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component";
import {
    ProjectPage_UploadData_UploadFiles__Common_Constants,
    ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {
    projectPage_UploadData_UploadFiles__Common__Init_Upload__LimelightXMLFile_AndOr_ScanFile,
    ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response,
    ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile,
    ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File,
    ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_SearchTagCategory,
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile";
import {SearchName_SearchShortName_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/search_name_search_short_name/searchName_SearchShortName_Max_FieldLengths_Constants";
import {
    searchTags__Get_For_ProjectId,
    SearchTags__Get_For_ProjectId_Result
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/searchTags__Get_For_ProjectId";
import {
    searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds,
    SearchTagCategories__Get_For_ProjectId_Result
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_project/search_tag_categories___get__for__project_id__or__project_id_from_project_search_ids";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params
    accepted_ScanFilename_Suffix_List: Array<string>

    callbackOn_Close_Clicked: ()=>void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component_State {

    showLoadingMessage?: boolean

    submitButton_Enabled?: boolean
    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component_State > {

    private readonly _searchName_Ref :  React.RefObject<HTMLInputElement>
    private readonly _searchShortName_Ref :  React.RefObject<HTMLInputElement>
    private readonly _fileInput_LimelightXMLFile_Ref :  React.RefObject<HTMLInputElement>
    private readonly _fileInput_fastaFile_Ref :  React.RefObject<HTMLInputElement>
    private readonly _fileInput_ScanFile_Ref :  React.RefObject<HTMLInputElement>

    private _limelight_XML_File_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data

    private _fasta_File_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data

    private _scan_Files_Data: Array<ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data> = []

    private _internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data = 0;

    private _accepted_ScanFilename_Suffix_List: Array<string>
    private _accepted_ScanFilename_Suffixes_CommaDelim: string

    private _projectPage_UploadData_SendUploadFileToServer__InProgress: ProjectPage_UploadData_SendUploadFileToServer


    /**
     *   Tag Category
     *
     *   New Array Object created when any of contents changes
     */
    private _searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry>

    //  Tag

    private _searchTags_Uncategorized__DistinctInProject: Array<Internal_SearchTagEntry>


    private _searchTagIds_Selected: Set<number> = new Set()


    private _submit_InProgress: boolean = false;

    private _component_Mounted: boolean = false;

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component_Props) {
        super(props);

        this._searchName_Ref = React.createRef();
        this._searchShortName_Ref = React.createRef();
        this._fileInput_LimelightXMLFile_Ref = React.createRef();
        this._fileInput_fastaFile_Ref = React.createRef();
        this._fileInput_ScanFile_Ref = React.createRef();

        {
            this._accepted_ScanFilename_Suffix_List = ProjectPage_UploadData_UploadFiles__Common_Constants.accepted_ScanFilename_Suffix_List__DEFAULT //  DEFAULT

            if ( this.props.accepted_ScanFilename_Suffix_List ) {

                this._accepted_ScanFilename_Suffix_List = this.props.accepted_ScanFilename_Suffix_List;
            }

            this._accepted_ScanFilename_Suffixes_CommaDelim = this._accepted_ScanFilename_Suffix_List.join(",");
        }

        this.state = { showLoadingMessage: true, submitButton_Enabled: false }
    }

    /**
     *
     */
    componentWillUnmount() {
        try {
            this._component_Mounted = false;

            if ( this._projectPage_UploadData_SendUploadFileToServer__InProgress ) {
                this._projectPage_UploadData_SendUploadFileToServer__InProgress.abort_FileSend();
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    componentDidMount() {

        this._component_Mounted = true;

        try {
            this._loadData_SearchTags_SearchTagCategories()
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _loadData_SearchTags_SearchTagCategories() {
        try {
            //  Load Search Tags for searches

            let searchTags__Get_For_ProjectId_Result: SearchTags__Get_For_ProjectId_Result
            let searchTagCategories__Get_For_ProjectId_Result: SearchTagCategories__Get_For_ProjectId_Result

            const promises: Array<Promise<void>> = []

            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_getSearchTagList = searchTags__Get_For_ProjectId({ projectIdentifier: this.props.mainParams.projectIdentifierFromURL });

                    promise_getSearchTagList.catch(reason => { reject(reason) })

                    promise_getSearchTagList.then( ( searchTags__Get_For_ProjectId_Result__PromiseResolve ) => { try {

                        if ( ! this._component_Mounted ) {
                            // unmounted so exit
                            return; // EARLY RETURN
                        }

                        searchTags__Get_For_ProjectId_Result = searchTags__Get_For_ProjectId_Result__PromiseResolve;

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push( promise );
            }
            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_getSearchTagCategoryList =
                        searchTagCategories__Get_For_ProjectId_Or_ProjectIdFromProjectSearchIds({
                            projectIdentifier: this.props.mainParams.projectIdentifierFromURL, projectSearchIds: null
                        });

                    promise_getSearchTagCategoryList.catch(reason => { reject(reason) })

                    promise_getSearchTagCategoryList.then( ( searchTagCategories__Get_For_ProjectId_Result__PromiseResolve ) => { try {

                        if ( ! this._component_Mounted ) {
                            // unmounted so exit
                            return; // EARLY RETURN
                        }

                        searchTagCategories__Get_For_ProjectId_Result = searchTagCategories__Get_For_ProjectId_Result__PromiseResolve;

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push( promise );
            }

            const promisesAll = Promise.all( promises );

            promisesAll.catch((reason => {}))

            promisesAll.then( () => { try {

                if ( ! this._component_Mounted ) {
                    // unmounted so exit

                    return; // EARLY RETURN
                }

                const searchTagCategories_Map_Key_CategoryId: Map<number, Internal_SearchTagCategory_Entry> = new Map()

                for ( const tagCategoryEntry_DistinctInProject of searchTagCategories__Get_For_ProjectId_Result.tagCategories_DistinctInProject ) {

                    const tagCategory_InProgress: Internal_SearchTagCategory_Entry = {

                        tagCategoryId: tagCategoryEntry_DistinctInProject.category_id,
                        categoryLabel: tagCategoryEntry_DistinctInProject.category_label,
                        label_Color_Font: tagCategoryEntry_DistinctInProject.label_Color_Font,
                        label_Color_Background: tagCategoryEntry_DistinctInProject.label_Color_Background,
                        label_Color_Border: tagCategoryEntry_DistinctInProject.label_Color_Border,

                        searchTags_DistinctInProject__InCategory: []
                    }

                    if ( searchTagCategories_Map_Key_CategoryId.has( tagCategory_InProgress.tagCategoryId ) ) {
                        const msg = "Duplicate tagCategoryId: " + tagCategory_InProgress.tagCategoryId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    searchTagCategories_Map_Key_CategoryId.set( tagCategory_InProgress.tagCategoryId, tagCategory_InProgress );
                }

                const searchTags_Uncategorized__DistinctInProject: Array<Internal_SearchTagEntry> = []

                for ( const tagEntry_DistinctInProject of searchTags__Get_For_ProjectId_Result.tags_DistinctInProject ) {

                    const tag_InProgress: Internal_SearchTagEntry = {

                        tagId: tagEntry_DistinctInProject.tag_id,
                        tag_category_id: tagEntry_DistinctInProject.tag_category_id,
                        tagString: tagEntry_DistinctInProject.tag_string,
                        tag_Color_Font: tagEntry_DistinctInProject.tag_Color_Font,
                        tag_Color_Background: tagEntry_DistinctInProject.tag_Color_Background,
                        tag_Color_Border: tagEntry_DistinctInProject.tag_Color_Border,
                        tag_Added: false
                    }

                    let tagNotInCategory = true;

                    if ( tag_InProgress.tag_category_id !== undefined && tag_InProgress.tag_category_id !== null ) {

                        const category = searchTagCategories_Map_Key_CategoryId.get( tag_InProgress.tag_category_id )
                        if ( category ) {
                            category.searchTags_DistinctInProject__InCategory.push( tag_InProgress );
                            tagNotInCategory = false;
                        }
                    }

                    if ( tagNotInCategory ) {
                        searchTags_Uncategorized__DistinctInProject.push( tag_InProgress );
                    }
                }

                const searchTagCategories_DistinctInProject: Array<Internal_SearchTagCategory_Entry> = []

                for ( const searchTagCategory of searchTagCategories_Map_Key_CategoryId.values() ) {
                    searchTagCategories_DistinctInProject.push( searchTagCategory );

                    //  Sort tags in each category
                    searchTagCategory.searchTags_DistinctInProject__InCategory.sort( (a,b ) => {
                        return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
                    })
                }

                searchTagCategories_DistinctInProject.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.categoryLabel, b.categoryLabel )
                })

                //  Sort tags uncategorized
                searchTags_Uncategorized__DistinctInProject.sort( (a,b ) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam( a.tagString, b.tagString )
                })

                this._searchTagCategories_DistinctInProject = searchTagCategories_DistinctInProject;

                this._searchTags_Uncategorized__DistinctInProject = searchTags_Uncategorized__DistinctInProject;

                this.setState({
                    showLoadingMessage: false,
                    force_ReRender_Object: {}
                })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _sort__searchTagCategories_DistinctInProject() {
        this._searchTagCategories_DistinctInProject.sort( (a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.categoryLabel, b.categoryLabel)
        })
    }


    /**
     *
     */
    private _limelight_XML_File_InputElement_OnChangeEvent( event: React.ChangeEvent<HTMLInputElement> ) : void {

        const files_Selected = event.target.files;

        if ( files_Selected.length === 0 ) {
            //  No file selected so just exit

            return; // EARLY RETURN
        }

        if ( files_Selected.length > 1 ) {
            //  More than 1 file selected so error message and exit
            window.alert( "Only 1 file allowed for Limelight XML file" )

            return; // EARLY RETURN
        }

        const file_Selected = files_Selected[0];

        const filename = file_Selected.name;

        this._limelight_XML_File_Data = {
            filename,
            file_JS_File_Object: file_Selected,
            internal_Identifier: ++this._internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data,
            fileImportSubmit_Complete: false,
            fileSendToServer_Complete: false,
            fileSendToServer_Percentage: undefined,
            fileSendToServer_ErrorMessage: undefined
        }

        this.setState({ submitButton_Enabled: true, force_ReRender_Object: {} })
    }

    /**
     *
     */
    private _fasta_File_InputElement_OnChangeEvent( event: React.ChangeEvent<HTMLInputElement> ) : void {

        const files_Selected = event.target.files;

        if ( files_Selected.length === 0 ) {
            //  No file selected so just exit

            return; // EARLY RETURN
        }

        if ( files_Selected.length > 1 ) {
            //  More than 1 file selected so error message and exit
            window.alert( "Only 1 file allowed for FASTA file" )

            return; // EARLY RETURN
        }

        const file_Selected = files_Selected[0];

        const filename = file_Selected.name;

        this._fasta_File_Data = {
            filename,
            file_JS_File_Object: file_Selected,
            internal_Identifier: ++this._internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data,
            fileImportSubmit_Complete: false,
            fileSendToServer_Complete: false,
            fileSendToServer_Percentage: undefined,
            fileSendToServer_ErrorMessage: undefined
        }

        this.setState({ submitButton_Enabled: true, force_ReRender_Object: {} })
    }

    /**
     *
     */
    private _scanFile_InputElement_OnChangeEvent( event: React.ChangeEvent<HTMLInputElement> ) : void {

        const files_Selected = event.target.files;

        if ( files_Selected.length === 0 ) {
            //  No file selected so just exit

            return; // EARLY RETURN
        }

        for ( const file_Selected of files_Selected ) {
            //  Process each file selected, likely only 1

            const filename = file_Selected.name;

            let filename_Suffix_IsValid = false;

            for ( const accepted_ScanFilename_Suffix of this._accepted_ScanFilename_Suffix_List ) {
                if ( filename.endsWith( accepted_ScanFilename_Suffix ) ) {
                    filename_Suffix_IsValid = true;
                    break;
                }
            }

            if ( ! filename_Suffix_IsValid ) {

                window.alert( "scan filename must end with one of the valid suffixes: " + this._accepted_ScanFilename_Suffixes_CommaDelim );
                return; // EARLY RETURN
            }

            const single_UploadFile_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data = {
                filename,
                file_JS_File_Object: file_Selected,
                internal_Identifier: ++this._internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data,
                fileImportSubmit_Complete: false,
                fileSendToServer_Complete: false,
                fileSendToServer_Percentage: undefined,
                fileSendToServer_ErrorMessage: undefined
            }

            this._scan_Files_Data.push( single_UploadFile_Data )
        }

        event.target.value = ""; // Clear selection to re-use same <input>

        this.setState({ force_ReRender_Object: {} })
    }

    /**
     *
     * @param event
     */
    private _submitUpload( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {

        if ( ! this._limelight_XML_File_Data ) {

            window.alert("No Limelight XML File data")

            return; // EARLY RETURN
        }

        this._submit_InProgress = true;

        this.setState({ force_ReRender_Object: {} })

        this._submitUpload_Main()
    }

    /**
     *
     */
    private async _submitUpload_Main() {
        try {
            let error = false;

            /////   Get Search Tags and Search Categories to send

            let searchTagList_Uncategorized_Selected: Array<string> = [] //  Search Tags NOT in any Category
            let searchTagCategoryAndItsSearchTagsList_Selected: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_SearchTagCategory> = []

            {
                //  For In Category

                for ( const searchTagCategory of this._searchTagCategories_DistinctInProject ) {

                    const searchTagList_ForCategory: Array<string> = []

                    for ( const searchTag of searchTagCategory.searchTags_DistinctInProject__InCategory ) {
                        if ( this._searchTagIds_Selected.has( searchTag.tagId ) ) {
                            searchTagList_ForCategory.push( searchTag.tagString )
                        }
                    }

                    if ( searchTagList_ForCategory.length > 0 ) {

                        const searchTagCategoryAndItsSearchTags_Selected: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_SearchTagCategory = {
                            searchTagCategoryLabel: searchTagCategory.categoryLabel,
                            searchTagList: searchTagList_ForCategory
                        }
                        searchTagCategoryAndItsSearchTagsList_Selected.push( searchTagCategoryAndItsSearchTags_Selected )
                    }
                }

                if ( searchTagCategoryAndItsSearchTagsList_Selected.length === 0 ) {
                    searchTagCategoryAndItsSearchTagsList_Selected = undefined
                }

                //  For Uncategorized

                for ( const searchTag of this._searchTags_Uncategorized__DistinctInProject ) {
                    if ( this._searchTagIds_Selected.has( searchTag.tagId ) ) {
                        searchTagList_Uncategorized_Selected.push( searchTag.tagString )
                    }
                }

                if ( searchTagList_Uncategorized_Selected.length === 0 ) {
                    searchTagList_Uncategorized_Selected = undefined
                }
            }

            ///////////////

            let searchName = undefined;
            let searchShortName = undefined;

            if ( this._searchName_Ref.current && this._searchName_Ref.current.value !== "" ) {
                searchName = this._searchName_Ref.current.value
            }
            if ( this._searchShortName_Ref.current && this._searchShortName_Ref.current.value !== "" ) {
                searchShortName = this._searchShortName_Ref.current.value
            }

            const files_InSubmitImport: Array<ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile> = []
            {
                let fileIndex = 0;

                {  //  Limelight XML file
                    fileIndex++;

                    const file_InSubmitImport: ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile = {
                        fileIndex,
                        fileType: this.props.mainParams.limelight_import_file_type_limelight_xml_file,
                        filename: this._limelight_XML_File_Data.filename,
                        uploadFileSize: this._limelight_XML_File_Data.file_JS_File_Object.size
                    }
                    files_InSubmitImport.push(file_InSubmitImport)
                }
                if ( this._fasta_File_Data ) {  //  FASTA file if provided

                    fileIndex++;

                    const file_InSubmitImport: ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile = {
                        fileIndex,
                        fileType: this.props.mainParams.limelight_import_file_type_fasta_file,
                        filename: this._fasta_File_Data.filename,
                        uploadFileSize: this._fasta_File_Data.file_JS_File_Object.size
                    }
                    files_InSubmitImport.push(file_InSubmitImport)
                }
                {  //  Scan file(s) if provided

                    for ( const scan_Files_Data_Entry of this._scan_Files_Data ) {

                        //  single Scan File

                        fileIndex++;

                        const file_InSubmitImport: ProjectPage_UploadData_UploadFiles__Common_Init_Upload_Request_SingleFile = {
                            fileIndex,
                            fileType: this.props.mainParams.limelight_import_file_type_scan_file,
                            filename: scan_Files_Data_Entry.filename,
                            uploadFileSize: scan_Files_Data_Entry.file_JS_File_Object.size
                        }
                        files_InSubmitImport.push(file_InSubmitImport)
                    }
                }
            }

            const init_Upload_Response = await projectPage_UploadData_UploadFiles__Common__Init_Upload__LimelightXMLFile_AndOr_ScanFile({
                projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                searchName, searchShortName, files_InSubmitImport
            });

            if ( ! this._component_Mounted ) {
                return;  // EARLY RETURN
            }

            const filesUploaded: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File> = []

            let fileIndex = 0;

            {  //  Upload Limelight XML file
                try {
                    fileIndex++;

                    const result = await this._upload_File({
                        projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                        single_UploadFile_Data: this._limelight_XML_File_Data,
                        isLimelightXMLFile: true,
                        fileIndex,
                        fileType: this.props.mainParams.limelight_import_file_type_limelight_xml_file,
                        init_Upload_Response
                    });

                    const submit_Upload_Request_Single_File: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File = {
                        isLimelightXMLFile : true,
                        uploadedFilename : this._limelight_XML_File_Data.filename,
                        fileType: this.props.mainParams.limelight_import_file_type_limelight_xml_file,
                        fileIndex : fileIndex
                    }

                    filesUploaded.push( submit_Upload_Request_Single_File )

                    this._limelight_XML_File_Data.fileSendToServer_Complete = true;
                    this._limelight_XML_File_Data.fileSendToServer_Percentage = undefined;

                    if ( ! result.statusSuccess ) {
                        this._limelight_XML_File_Data.fileSendToServer_ErrorMessage  = result.errorMessage
                        error = true;
                    }

                } catch (e) {

                    this._limelight_XML_File_Data.fileSendToServer_ErrorMessage = "Failed Upload"

                    throw e;
                }
            }

            if ( ! error ) {

                {  //  Upload FASTA file if provided

                    if ( this._fasta_File_Data ) {

                        fileIndex++;

                        try {
                            const result = await this._upload_File({
                                projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                                single_UploadFile_Data: this._fasta_File_Data,
                                isLimelightXMLFile: false,
                                fileIndex,
                                fileType: this.props.mainParams.limelight_import_file_type_fasta_file,
                                init_Upload_Response
                            });

                            const submit_Upload_Request_Single_File: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File = {
                                isLimelightXMLFile : false,
                                uploadedFilename : this._fasta_File_Data.filename,
                                fileType: this.props.mainParams.limelight_import_file_type_fasta_file,
                                fileIndex : fileIndex
                            }

                            filesUploaded.push( submit_Upload_Request_Single_File )

                            this._fasta_File_Data.fileSendToServer_Complete = true;
                            this._fasta_File_Data.fileSendToServer_Percentage = undefined;

                            if ( ! result.statusSuccess ) {
                                this._fasta_File_Data.fileSendToServer_ErrorMessage  = result.errorMessage
                                error = true;
                            }

                        } catch (e) {

                            this._fasta_File_Data.fileSendToServer_ErrorMessage = "Failed Upload"

                            throw e;
                        }
                    }
                }

                if ( ! error ) {

                    //  Upload Scan Files

                    for ( const scan_Files_Data_Entry of this._scan_Files_Data ) {

                        if ( ! this._component_Mounted ) {
                            return;  // EARLY RETURN
                        }

                        //  Upload a single Scan File

                        fileIndex++;

                        try {
                            const result = await this._upload_File({
                                projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                                single_UploadFile_Data: scan_Files_Data_Entry,
                                isLimelightXMLFile: false,
                                fileIndex,
                                fileType: this.props.mainParams.limelight_import_file_type_scan_file,
                                init_Upload_Response
                            });

                            const submit_Upload_Request_Single_File: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File = {
                                isLimelightXMLFile : false,
                                uploadedFilename : scan_Files_Data_Entry.filename,
                                fileType: this.props.mainParams.limelight_import_file_type_scan_file,
                                fileIndex : fileIndex
                            }

                            filesUploaded.push( submit_Upload_Request_Single_File )

                            scan_Files_Data_Entry.fileSendToServer_Complete = true;
                            scan_Files_Data_Entry.fileSendToServer_Percentage = undefined;

                            if ( ! result.statusSuccess ) {
                                scan_Files_Data_Entry.fileSendToServer_ErrorMessage  = result.errorMessage
                                error = true;
                                break;
                            }
                        } catch (e) {

                            scan_Files_Data_Entry.fileSendToServer_ErrorMessage = "Failed Upload"
                            error = true;

                            throw e;
                        }
                    }
                }
            }

            if ( ! this._component_Mounted ) {
                return;  // EARLY RETURN
            }

            if ( ! error ) {

                let searchName = undefined;
                let searchShortName = undefined;

                if ( this._searchName_Ref.current && this._searchName_Ref.current.value !== "" ) {
                    searchName = this._searchName_Ref.current.value
                }
                if ( this._searchShortName_Ref.current && this._searchShortName_Ref.current.value !== "" ) {
                    searchShortName = this._searchShortName_Ref.current.value
                }

                await projectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile({
                    projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                    uploadKey: init_Upload_Response.uploadKey,
                    searchName,
                    searchShortName,
                    filesUploaded,
                    searchTagList: searchTagList_Uncategorized_Selected,
                    searchTagCategoryAndItsSearchTagsList: searchTagCategoryAndItsSearchTagsList_Selected
                })
            }

            if ( ! error ) {

                //  All successful so refresh main page and close

                this.props.mainParams.callback_UpdateAfterSuccessfulSubmit();

                this.props.callbackOn_Close_Clicked()
            }

            this.setState({ force_ReRender_Object: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _upload_File(
        {
            projectIdentifier, single_UploadFile_Data, isLimelightXMLFile, fileIndex, fileType, init_Upload_Response
        } : {
            projectIdentifier: string
            single_UploadFile_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data
            isLimelightXMLFile: boolean
            fileIndex: number
            fileType: number
            init_Upload_Response: ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response
        }
    ) : Promise<{
        statusSuccess: boolean
        errorMessage: string
    }> {

        let uniqueRequestIdentifier_ForThisFile = "";
        {
            const now = new Date()

            uniqueRequestIdentifier_ForThisFile = "MS" + now.getTime().toString()
        }

        try {
            single_UploadFile_Data.fileSendToServer_Percentage = 1; // start at 1 percent

            this.setState({ force_ReRender_Object: {} })

            //  Reloads page if any error
            const initializeResult = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile({
                projectIdentifier,
                uniqueRequestIdentifier_ForThisFile,
                uploadKey: init_Upload_Response.uploadKey,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadFileSize: single_UploadFile_Data.file_JS_File_Object.size,
            })

            if ( ! initializeResult.statusSuccess  ) {

                //  EARLY RETURN
                return {
                    statusSuccess: initializeResult.statusSuccess,
                    errorMessage: initializeResult.errorMessage
                }
            }

            const progress_Callback: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback =
                (params: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params) : void => {

                    single_UploadFile_Data.fileSendToServer_Percentage = params.progressPercent

                    this.setState({ force_ReRender_Object: {} })
                }

            this._projectPage_UploadData_SendUploadFileToServer__InProgress = new ProjectPage_UploadData_SendUploadFileToServer({
                projectIdentifierFromURL: this.props.mainParams.projectIdentifierFromURL,

                maxFileUploadChunkSize: initializeResult.maxFileUploadChunkSize,

                isLimelightXMLFile,
                fileToUpload: single_UploadFile_Data.file_JS_File_Object,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadKey: init_Upload_Response.uploadKey,
                requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: initializeResult.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified,
                progress_Callback
            })

            let sendResult: ProjectPage_UploadData_SendUploadFileToServer__Send_Response


            try {
                sendResult = await this._projectPage_UploadData_SendUploadFileToServer__InProgress.projectPage_UploadData_SendUploadFileToServer({
                    uniqueRequestIdentifier_ForThisFile
                });

            } catch (e) {

            } finally {

                this._projectPage_UploadData_SendUploadFileToServer__InProgress = undefined;
            }

            if ( ! sendResult.statusSuccess  ) {

                try {
                    const cancelDeleteOfFile = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile({
                        projectIdentifier,
                        uniqueRequestIdentifier_ForThisFile,
                        uploadKey: init_Upload_Response.uploadKey,
                        fileIndex,
                        fileType,
                        filename: single_UploadFile_Data.filename
                    });

                } catch (e) {
                }

                //  EARLY RETURN
                return {
                    statusSuccess: sendResult.statusSuccess,
                    errorMessage: sendResult.errorMessage
                }
            }

            /////////////////////

            //  Reloads page if any error
            const submitFinalOfFile = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile({
                projectIdentifier,
                uniqueRequestIdentifier_ForThisFile,
                uploadKey: init_Upload_Response.uploadKey,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadFileSize: single_UploadFile_Data.file_JS_File_Object.size
            })

            return {
                statusSuccess: submitFinalOfFile.statusSuccess,
                errorMessage: submitFinalOfFile.errorMessage
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        const choose_type_of_data_to_import_TextBelowLink_FontSize = 12; // in px

        return (

            <>

                {/*  Section  */}
                <div className="  top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right  ">

                    <div style={ { marginBottom: 20 } }>
                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            <span>Import Search Results </span>
                        </div>
                        <div style={ { fontSize: choose_type_of_data_to_import_TextBelowLink_FontSize } }>
                            <div>
                                Import a Limelight XML file and associated files.
                            </div>
                            <div>
                                Please
                                <span > </span>
                                <a href="https://limelight-ms.readthedocs.io/en/latest/using-limelight/conversion-guide.html" target="_blank" rel="noopener">read our documentation</a>
                                <span > </span>
                                for more information on creating a Limelight XML file from your data.
                            </div>
                        </div>
                    </div>

                </div>

                {/*  Section - Variable Height.  Scrollable Div overflow */}
                <div
                    className=" top-level single-entry-variable-height  standard-border-color-medium   modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    style={ { overflowY: "auto", overflowX: "hidden",
                        borderStyle: "solid", borderWidth: 1
                    } }
                >

                    { ( this.state.showLoadingMessage ) ? (
                        <div>
                            <div style={ { marginTop: 20, textAlign: "center" }}>
                                LOADING DATA
                            </div>
                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>
                    ) : (

                        <>
                            { this._submit_InProgress ? (
                                <div style={ { fontWeight: "bold", fontSize: 16, marginTop: 10, marginBottom: 10 } }>
                                    Submitting request to server
                                </div>

                            ) : null }

                            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                                {/*  Two Column Grid  */}
                                {/*  Row 1  */}
                                <div style={ { marginRight: 20 } }>
                                    <div style={ { whiteSpace: "nowrap" } }>
                                        <span>Description:</span>
                                    </div>
                                </div>
                                <div style={ { marginBottom: 6 } }>
                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Maximum length is " + SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_NAME_MAX_LENGTH + " characters"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <input
                                                // Keep maxLength in sync with database field size
                                                maxLength={ SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_NAME_MAX_LENGTH }
                                                style={ { width: 450 } }
                                                ref={ this._searchName_Ref }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                    <div style={ { color: "#A55353", fontSize: "80%", whiteSpace: "nowrap" } }>
                                        Brief description of the search.
                                    </div>
                                </div>
                                {/*  Row 2  */}
                                <div style={ { marginRight: 20 } }>
                                    <div style={ { whiteSpace: "nowrap" } }>
                                        <span>Short Label:</span>
                                    </div>
                                </div>
                                <div
                                    style={ { marginBottom: 10 } }
                                >
                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Maximum length is " + SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_SHORT_NAME_MAX_LENGTH + " characters"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <input
                                                // Keep maxLength in sync with database field size
                                                maxLength={ SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_SHORT_NAME_MAX_LENGTH }
                                                style={ { width: 110 } }
                                                ref={ this._searchShortName_Ref }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                    <div style={ { color: "#A55353", fontSize: "80%", whiteSpace: "nowrap" } }>
                                        Short label to display when space is limited.
                                    </div>
                                </div>
                            </div>

                            {/*  Border  */}

                            {/*<div*/}
                            {/*    className="top-level-label-bottom-border"*/}
                            {/*    style={ { opacity: 1 } }*/}
                            {/*></div>*/}

                            <div style={ { fontSize: 16, fontWeight: "bold", marginBottom: 10 } }>
                                Files to Import
                            </div>

                            {/*  Limelight XML File  */}

                            <div style={ { marginBottom: 11 } }>
                                <div>
                                    <input
                                        ref={ this._fileInput_LimelightXMLFile_Ref }
                                        type="file"
                                        accept=".xml"
                                        style={ { display: "none" } }
                                        onChange={ event => {
                                            this._limelight_XML_File_InputElement_OnChangeEvent( event );
                                        }}
                                    />
                                </div>

                                { this._limelight_XML_File_Data ? (
                                    <div>
                                        <ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component
                                            single_UploadFile_Data={ this._limelight_XML_File_Data }
                                            callbackOn_Delete_Clicked={ () => {
                                                this._limelight_XML_File_Data = undefined;
                                                this.setState({ submitButton_Enabled: false, force_ReRender_Object: {} })
                                                try {
                                                    if ( this._fileInput_LimelightXMLFile_Ref.current ) {
                                                        this._fileInput_LimelightXMLFile_Ref.current.value = ""
                                                    }
                                                } catch (e) {
                                                    //  Eat Exception
                                                }
                                            } }
                                            submit_InProgress={ this._submit_InProgress }
                                        />
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div>
                                            <span
                                                className=" fake-link "
                                                onClick={ event => {
                                                    if ( this._fileInput_LimelightXMLFile_Ref.current ) {
                                                        this._fileInput_LimelightXMLFile_Ref.current.click()
                                                    }
                                                }}
                                            >+Add Limelight XML File</span>
                                        </div>
                                        <div>
                                            <div style={ { fontSize: "80%" } }>
                                                (Max file size: { this.props.mainParams.maxLimelightXMLFileUploadSizeFormatted })
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}

                            </div>

                            { this.props.mainParams.is_uploading_FileObjectStorage_Files ? (

                                <React.Fragment>
                                    {/*  FASTA File  */}

                                    <div style={ { marginBottom: 11 } }>
                                        <div>
                                            <input
                                                ref={ this._fileInput_fastaFile_Ref }
                                                type="file"
                                                style={ { display: "none" } }
                                                onChange={ event => {
                                                    this._fasta_File_InputElement_OnChangeEvent( event );
                                                }}
                                            />
                                        </div>

                                        { this._fasta_File_Data ? (
                                            <div>
                                                <ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component
                                                    single_UploadFile_Data={ this._fasta_File_Data }
                                                    callbackOn_Delete_Clicked={ () => {
                                                        this._fasta_File_Data = undefined;
                                                        this.setState({ force_ReRender_Object: {} })
                                                        try {
                                                            if ( this._fileInput_fastaFile_Ref.current ) {
                                                                this._fileInput_fastaFile_Ref.current.value = ""
                                                            }
                                                        } catch (e) {
                                                            //  Eat Exception
                                                        }
                                                    } }
                                                    submit_InProgress={ this._submit_InProgress }
                                                />
                                            </div>
                                        ) : ( this._limelight_XML_File_Data && ( ! this._submit_InProgress ) ) ? (

                                            // Display "+Add FASTA File" since have Limelight XML file AND NOT Submission in progress
                                            <React.Fragment>
                                                <div>
                                                <span
                                                    className=" fake-link "
                                                    onClick={ event => {
                                                        if ( this._fileInput_fastaFile_Ref.current ) {
                                                            this._fileInput_fastaFile_Ref.current.click()
                                                        }
                                                    }}
                                                >+Add FASTA File</span>
                                                </div>
                                                <div>
                                                    <div style={ { fontSize: "80%" } }>
                                                        (Optional file.  Max file size:
                                                        { this.props.mainParams.maxFASTAFileUploadSizeFormatted }
                                                        )
                                                    </div>
                                                </div>
                                            </React.Fragment>

                                        ) : null }

                                    </div>

                                </React.Fragment>
                            ) : null }

                            {/*  Scan Files  */}

                            { this.props.mainParams.limelight_import_file_type_scan_file !== undefined && this.props.mainParams.limelight_import_file_type_scan_file !== null ? (
                                <div style={ { marginBottom: 11 } }>
                                    <div>
                                        <input
                                            ref={ this._fileInput_ScanFile_Ref }
                                            type="file"
                                            accept={ this._accepted_ScanFilename_Suffixes_CommaDelim }
                                            style={ { display: "none" } }
                                            onChange={ event => {
                                                this._scanFile_InputElement_OnChangeEvent( event );
                                            }}
                                        />
                                    </div>
                                    <div>
                                        { this._scan_Files_Data.map( scan_Files_Data__Entry_To_Render => {
                                            if ( ! scan_Files_Data__Entry_To_Render ) {
                                                return null;
                                            }
                                            return (
                                                <div
                                                    key={ scan_Files_Data__Entry_To_Render.internal_Identifier }
                                                    style={ { marginBottom: 3 } }
                                                >
                                                    <ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component
                                                        key={ scan_Files_Data__Entry_To_Render.internal_Identifier }
                                                        single_UploadFile_Data={ scan_Files_Data__Entry_To_Render }
                                                        callbackOn_Delete_Clicked={ () => {

                                                            this._scan_Files_Data = this._scan_Files_Data.filter(scan_Files_Data__Entry_To_FilterOn => {
                                                                if ( scan_Files_Data__Entry_To_FilterOn.internal_Identifier === scan_Files_Data__Entry_To_Render.internal_Identifier ) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            })

                                                            this.setState({ force_ReRender_Object: {} })
                                                        } }
                                                        submit_InProgress={ this._submit_InProgress }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    { this._limelight_XML_File_Data && ( ! this._submit_InProgress ) ? (
                                        // Display "+Add Scan File" since have Limelight XML file AND NOT Submission in progress
                                        <React.Fragment>
                                            <div>
                                                <span
                                                    className=" fake-link "
                                                    onClick={ event => {
                                                        if ( this._fileInput_ScanFile_Ref.current ) {
                                                            this._fileInput_ScanFile_Ref.current.click()
                                                        }
                                                    }}
                                                >+Add Scan File(s)</span>
                                            </div>
                                            <div>
                                                <div style={ { fontSize: "80%" } }>
                                                    (Optional. If uploading scan files, all scan files in search must be included.)
                                                </div>
                                                <div style={ { fontSize: "80%" } }>
                                                    (Max file size: { this.props.mainParams.maxScanFileUploadSizeFormatted })
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : null }

                                </div>
                            ) : null }

                            { ( this._searchTagCategories_DistinctInProject.length > 0 || this._searchTags_Uncategorized__DistinctInProject.length > 0 ) ? (
                                <div>

                                    {/*  Border  */}

                                    {/*<div*/}
                                    {/*    className="top-level-label-bottom-border"*/}
                                    {/*    style={ { opacity: 1 } }*/}
                                    {/*></div>*/}


                                    <div style={ { marginTop: 20, marginBottom: 10 } }>
                                        <div style={ { fontSize: 16, fontWeight: "bold" } }>
                                            Select Tags
                                        </div>
                                        <div style={ { fontSize: "80%" } }>
                                            To add tags, close this window and click "Manage Tags".
                                        </div>
                                    </div>

                                    <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>

                                        {/*  2 Column Grid.  Column 1 is Search Category.  Column 2 is Search Tags  */}

                                        {/*  List Existing Categories and their tags  */}

                                        { this._searchTagCategories_DistinctInProject.map( (searchTagCategory, index, array) => {

                                            return (

                                                <React.Fragment
                                                    key={ searchTagCategory.tagCategoryId }
                                                >
                                                    {/*  Column 1  */}
                                                    <div
                                                        style={ { whiteSpace: "nowrap", paddingTop: 8, paddingBottom: 10, marginRight: 10 } }
                                                    >
                                                        {/*  Display the Category Label  */}
                                                        <span>
                                                            { searchTagCategory.categoryLabel }
                                                        </span>
                                                    </div>

                                                    {/*  Column 2  */}
                                                    <div>
                                                        <div>
                                                            {/*  Search Tags For Category  */}
                                                            { this._list_SearchTags_For_Array({ searchTags_Array: searchTagCategory.searchTags_DistinctInProject__InCategory }) }
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })}

                                        {/*  Uncategorized Tags  */}

                                        <div
                                            style={ { whiteSpace: "nowrap", paddingTop: 8, paddingBottom: 10, marginRight: 10, position: "relative" } }
                                        >
                                            Uncategorized:
                                        </div>
                                        <div>

                                            {/*  Search Tags For Uncategorized  */}
                                            { this._list_SearchTags_For_Array({ searchTags_Array: this._searchTags_Uncategorized__DistinctInProject }) }

                                        </div>
                                    </div>
                                </div>
                            ) : null }
                        </>
                    )}
                </div>

                {/*  Section  */}
                <div className="  top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right  ">

                    <div style={ { marginTop: 15 } }>
                        { ! this._submit_InProgress ? (
                            <div style={ { display: "inline-block", position: "relative" } }>
                                <button
                                    disabled={ ( ! this.state.submitButton_Enabled ) }
                                    onClick={ event => {

                                        this._submitUpload( event );
                                    }}
                                >
                                    Submit Upload
                                </button>
                                {/*  Cover button when disabled so have tooltip  */}
                                { ! this.state.submitButton_Enabled ? (
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Submit Upload. Enabled when Limelight XML file is selected.
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <div style={ { position: "absolute", inset: 0 } }></div>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                ) : null }
                            </div>
                        ) : null }
                        <span> </span>
                        <button
                            onClick={ event => {
                                this.props.callbackOn_Close_Clicked()
                            }}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </>
        );
    }

    /**
     *
     */
    private _list_SearchTags_For_Array(
        {
            searchTags_Array
        } : {
            searchTags_Array: Internal_SearchTagEntry[]
        }
    ) : JSX.Element {

        return (

            <React.Fragment>
                { searchTags_Array.map( (searchTagEntry, index, array) => {

                    const divStyle: React.CSSProperties = {
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        backgroundColor: searchTagEntry.tag_Color_Background,
                        color: searchTagEntry.tag_Color_Font
                    }

                    const borderColor = "black"
                    const borderWidth = 3

                    let div_title: string

                    if ( this._searchTagIds_Selected.has(  searchTagEntry.tagId ) ) {

                        divStyle.borderStyle = "solid"
                        divStyle.borderColor = borderColor
                        divStyle.borderWidth = borderWidth

                        divStyle.margin = 0

                        div_title = "Click to Unselect Tag"
                    } else {

                        div_title = "Click to Select Tag"
                        divStyle.margin = borderWidth
                    }

                    return (

                        <div
                            key={ searchTagEntry.tagId }
                            style={ { display: "inline-block", whiteSpace: "nowrap", paddingBottom: 5, marginRight: 2 } }
                        >
                            <div
                                // style={ { : 6 } }
                            >
                                {/*  Display the Tag  */}
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        div_title
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ divStyle }
                                        className=" clickable search-tag-display-everywhere "
                                        onClick={ event => {

                                            if ( limelight__IsTextSelected() ) {
                                                return
                                            }

                                            if ( this._searchTagIds_Selected.has(  searchTagEntry.tagId ) ) {

                                                this._searchTagIds_Selected.delete( searchTagEntry.tagId )

                                            } else {

                                                this._searchTagIds_Selected.add( searchTagEntry.tagId )
                                            }

                                            this.setState({ force_ReRender_Object: {} })
                                        }}
                                    >
                                        { searchTagEntry.tagString }
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            </div>
                        </div>
                    )
                })}
            </React.Fragment>
        )

    }
}



////////////////////////

//  Private code

//  SEARCH TAG CATEGORY

class Internal_SearchTagCategory_Entry {

    tagCategoryId: number
    categoryLabel: string
    label_Color_Font: string
    label_Color_Background: string
    label_Color_Border: string

    searchTags_DistinctInProject__InCategory: Array<Internal_SearchTagEntry>
}


/////////

//  SEARCH TAG

class Internal_SearchTagEntry {

    tagId: number  //  Negative for newly added tags
    tag_category_id: number;  // null if uncategorized
    tagString: string
    tag_Color_Font: string
    tag_Color_Background: string
    tag_Color_Border: string
    tag_Added: boolean
}

