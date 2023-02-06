/**
 * projectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet.ts
 *
 * Javascript for projectView.jsp page
 *
 * Searches Section - Save and Get Session Storage data
 *
 *
 */


import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";



const _SESSION_STORAGE_KEY__limelight_project_page_folders_expanded_ids = "limelight_project_page_folders_expanded_ids"

const _SESSION_STORAGE_KEY__limelight_project_page_search_tag_ids_selected = "limelight_project_page_search_tag_ids_selected"

const _SESSION_STORAGE_KEY__limelight_project_page_search_name_search_id_filter_value = "limelight_project_page_search_name_search_id_filter_value"


/**
 *
 */
export class ProjectPage_SearchesSection_MainBlock_Container_SessionStorage_SaveGet {

    private _initializeCalled = false;

    private _projectIdentifierFromURL : string

    private _current__folderIds_ExpandedFolders : Set<number>

    private _current__SearchTagIds_Selected : Set<number>

    private _current__SearchName_SearchId_FilterValue: string

    /**
     * searchSelectionChangeCallback - function called when the search selection changes
     */
    constructor(
        {
            projectIdentifierFromURL
        } : {
            projectIdentifierFromURL : string
        }) {

        this._projectIdentifierFromURL = projectIdentifierFromURL;

    }

    /**
     *
     */
    initialize() {

        this._initializeCalled = true;

        this._initialize__current__folderIds_ExpandedFolders()

        this._initialize__current__SearchTagIds_Selected()

        this._initialize__current__SearchName_SearchId_FilterValue()
    }

    /**
     *
     */
    private _initialize__current__folderIds_ExpandedFolders() {

        this._current__folderIds_ExpandedFolders = new Set();

        const storedValueJSON = window.sessionStorage.getItem(_SESSION_STORAGE_KEY__limelight_project_page_folders_expanded_ids )
        if ( ! storedValueJSON ) {


        } else {

            let storageValue: Internal__FolderIds_ExpandedFolders__SessionStorageObject = null
            try {
                storageValue = JSON.parse( storedValueJSON );
            } catch (e) {

            }
            if ( storageValue ) {
                if ( storageValue.projectIdentifier === this._projectIdentifierFromURL ) {

                    if ( storageValue.folderIds_ExpandedFolders && ( storageValue.folderIds_ExpandedFolders instanceof Array )) {

                        for ( const entry of storageValue.folderIds_ExpandedFolders ) {
                            if ( variable_is_type_number_Check(entry) ) {
                                this._current__folderIds_ExpandedFolders.add(entry)
                            }
                        }
                    }
                }
            }
        }

        this._save_folderIds_ExpandedFolders_To_SessionStorage( this._current__folderIds_ExpandedFolders );
    };

    /**
     *
     */
    private _initialize__current__SearchTagIds_Selected() {

        this._current__SearchTagIds_Selected = new Set();

        const storedValueJSON = window.sessionStorage.getItem(_SESSION_STORAGE_KEY__limelight_project_page_search_tag_ids_selected )
        if ( ! storedValueJSON ) {


        } else {

            let storageValue: Internal__SearchTagIds_Selected__SessionStorageObject = null
            try {
                storageValue = JSON.parse( storedValueJSON );
            } catch (e) {

            }
            if ( storageValue ) {
                if ( storageValue.projectIdentifier === this._projectIdentifierFromURL ) {

                    if ( storageValue.searchTagIds_Selected && ( storageValue.searchTagIds_Selected instanceof Array )) {

                        for ( const entry of storageValue.searchTagIds_Selected ) {
                            if ( variable_is_type_number_Check(entry) ) {
                                this._current__SearchTagIds_Selected.add(entry)
                            }
                        }
                    }
                }
            }
        }

        this._save_searchTagIds_Selected_To_SessionStorage( this._current__SearchTagIds_Selected );
    };

    /**
     *
     */
    private _initialize__current__SearchName_SearchId_FilterValue() {

        this._current__SearchName_SearchId_FilterValue = "";

        const storedValueJSON = window.sessionStorage.getItem(_SESSION_STORAGE_KEY__limelight_project_page_search_name_search_id_filter_value )
        if ( ! storedValueJSON ) {


        } else {

            let storageValue: Internal__SearchName_SearchId_FilterValue__SessionStorageObject = null
            try {
                storageValue = JSON.parse( storedValueJSON );
            } catch (e) {

            }
            if ( storageValue ) {
                if ( storageValue.projectIdentifier === this._projectIdentifierFromURL ) {

                    if ( storageValue.searchName_SearchId_FilterValue && limelight__IsVariableAString( storageValue.searchName_SearchId_FilterValue ) ) {

                        this._current__SearchName_SearchId_FilterValue = storageValue.searchName_SearchId_FilterValue;
                    }
                }
            }
        }

        this._save_searchTagIds_Selected_To_SessionStorage( this._current__SearchTagIds_Selected );
    };

    ////

    get_FolderIds_ExpandedFolders() : ReadonlySet<number> {
        return this._current__folderIds_ExpandedFolders
    }

    /**
     *
     * @param updated_folderIds_ExpandedFolders
     */
    update_folderIds_ExpandedFolders(
        {
            updated_folderIds_ExpandedFolders
        } : {
            updated_folderIds_ExpandedFolders : Set<number>
        } ) {

        this._current__folderIds_ExpandedFolders = updated_folderIds_ExpandedFolders;

        this._save_folderIds_ExpandedFolders_To_SessionStorage( updated_folderIds_ExpandedFolders )
    }

    private _save_folderIds_ExpandedFolders_To_SessionStorage( updated_folderIds_ExpandedFolders_Set : Set<number> ) {

        window.setTimeout( () => {

            let updated_folderIds_ExpandedFolders = [];
            if ( updated_folderIds_ExpandedFolders_Set ) {
                updated_folderIds_ExpandedFolders = Array.from( updated_folderIds_ExpandedFolders_Set )
            }

            const storageValue: Internal__FolderIds_ExpandedFolders__SessionStorageObject = {
                folderIds_ExpandedFolders: updated_folderIds_ExpandedFolders,
                projectIdentifier: this._projectIdentifierFromURL
            }
            const storedValueJSON = JSON.stringify( storageValue );

            window.sessionStorage.setItem(_SESSION_STORAGE_KEY__limelight_project_page_folders_expanded_ids, storedValueJSON )

        }, 50 );
    }

    ////

    get_SearchTagIds_Selected() : ReadonlySet<number> {
        return this._current__SearchTagIds_Selected
    }

    /**
     *
     * @param updated_SearchTagIds_Selected
     */
    update_SearchTagIds_Selected(
        {
            updated_SearchTagIds_Selected
        } : {
            updated_SearchTagIds_Selected : Set<number>
        }
    ) {

        this._current__SearchTagIds_Selected = updated_SearchTagIds_Selected;

        this._save_searchTagIds_Selected_To_SessionStorage( updated_SearchTagIds_Selected )
    }

    private _save_searchTagIds_Selected_To_SessionStorage( updated_SearchTagIds_Selected_Set : Set<number> ) {

        window.setTimeout( () => {

            let updated_SearchTagIds_Selected: Array<number> = [];
            if ( updated_SearchTagIds_Selected_Set ) {
                updated_SearchTagIds_Selected = Array.from( updated_SearchTagIds_Selected_Set )
            }

            const storageValue: Internal__SearchTagIds_Selected__SessionStorageObject = {
                searchTagIds_Selected: updated_SearchTagIds_Selected,
                projectIdentifier: this._projectIdentifierFromURL
            }
            const storedValueJSON = JSON.stringify( storageValue );

            window.sessionStorage.setItem(_SESSION_STORAGE_KEY__limelight_project_page_search_tag_ids_selected, storedValueJSON )

        }, 50 );
    }

    /**
     *
     */
    get_current__SearchName_SearchId_FilterValue() : string {

        return this._current__SearchName_SearchId_FilterValue;
    }

    /**
     *
     * @param updated_SearchName_SearchId_FilterValue
     */
    update_SearchName_SearchId_FilterValue(
        {
            updated_SearchName_SearchId_FilterValue
        } : {
            updated_SearchName_SearchId_FilterValue : string
        }
    ) {

        this._current__SearchName_SearchId_FilterValue = updated_SearchName_SearchId_FilterValue;

        this._save_SearchName_SearchId_FilterValue_To_SessionStorage( updated_SearchName_SearchId_FilterValue )
    }

    private _save_SearchName_SearchId_FilterValue_To_SessionStorage( updated_SearchName_SearchId_FilterValue : string ) {

        window.setTimeout( () => {

            const storageValue: Internal__SearchName_SearchId_FilterValue__SessionStorageObject = {
                searchName_SearchId_FilterValue: updated_SearchName_SearchId_FilterValue,
                projectIdentifier: this._projectIdentifierFromURL
            }
            const storedValueJSON = JSON.stringify( storageValue );

            window.sessionStorage.setItem(_SESSION_STORAGE_KEY__limelight_project_page_search_name_search_id_filter_value, storedValueJSON )

        }, 50 );
    }


}


interface Internal__FolderIds_ExpandedFolders__SessionStorageObject {
    folderIds_ExpandedFolders: Array<number>
    projectIdentifier: string
}

interface Internal__SearchTagIds_Selected__SessionStorageObject {
    searchTagIds_Selected: Array<number>
    projectIdentifier: string
}



interface Internal__SearchName_SearchId_FilterValue__SessionStorageObject {
    searchName_SearchId_FilterValue: string
    projectIdentifier: string
}

