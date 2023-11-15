/**
 * commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders.ts
 *
 * Javascript - Data from server for Project Identifier or Project Search Ids - Searches, Search Tags, Folders
 *
 * MAIN FUNCTION:   getSearchesSearchTagsAndFolders_SingleProject
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";


//  MAIN FUNCTION:   getSearchesSearchTagsAndFolders_SingleProject

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root {

    private _userIsProjectOwner: boolean

    private _all_Searches_ProjectSearchIds_Set : ReadonlySet<number>

    private _searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder : ReadonlyArray<number>

    private _allSearches_Map_Key_ProjectSearchId: ReadonlyMap<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data>

    private _allFolders_Data_InDisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>

    private _all_SearchTagCategories_InProject_Map_Key_TagCategoryId: ReadonlyMap<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data>

    private _all_SearchTagCategories_InProject_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data>

    private _all_SearchTags_UNCategorized_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

    private _all_SearchTags_UNCategorized_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

    private _all_SearchTags_InProject_Map_Key_TagId: ReadonlyMap<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

    private _all_SearchTags_InProject_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

    ////  Created here, on demand

    private _searchData_ALL_StandardDisplay_Sorted_SearchId_Descending : ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data>



    constructor(
        { userIsProjectOwner, all_Searches_ProjectSearchIds_Set, searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder,
            allSearches_Map_Key_ProjectSearchId, allFolders_Data_InDisplayOrder,
            all_SearchTags_InProject_Map_Key_TagId, all_SearchTags_InProject_In_DisplayOrder,
            all_SearchTags_UNCategorized_Map_Key_TagId, all_SearchTags_UNCategorized_In_DisplayOrder,
            all_SearchTagCategories_InProject_Map_Key_TagCategoryId, all_SearchTagCategories_InProject_In_DisplayOrder
        } : {
            userIsProjectOwner: boolean

            all_Searches_ProjectSearchIds_Set : ReadonlySet<number>

            searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder : ReadonlyArray<number>

            allSearches_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data >

            allFolders_Data_InDisplayOrder: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>

            all_SearchTags_InProject_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>
            all_SearchTags_InProject_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

            all_SearchTags_UNCategorized_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

            all_SearchTags_UNCategorized_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

            all_SearchTagCategories_InProject_Map_Key_TagCategoryId: ReadonlyMap<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data>
            all_SearchTagCategories_InProject_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data>
    }) {
        this._userIsProjectOwner = userIsProjectOwner;
        this._all_Searches_ProjectSearchIds_Set = all_Searches_ProjectSearchIds_Set;
        this._searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder = searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder;
        this._allSearches_Map_Key_ProjectSearchId = allSearches_Map_Key_ProjectSearchId;
        this._allFolders_Data_InDisplayOrder = allFolders_Data_InDisplayOrder;
        this._all_SearchTags_InProject_Map_Key_TagId = all_SearchTags_InProject_Map_Key_TagId
        this._all_SearchTags_InProject_In_DisplayOrder = all_SearchTags_InProject_In_DisplayOrder;
        this._all_SearchTags_UNCategorized_Map_Key_TagId = all_SearchTags_UNCategorized_Map_Key_TagId;
        this._all_SearchTags_UNCategorized_In_DisplayOrder = all_SearchTags_UNCategorized_In_DisplayOrder;
        this._all_SearchTagCategories_InProject_Map_Key_TagCategoryId = all_SearchTagCategories_InProject_Map_Key_TagCategoryId;
        this._all_SearchTagCategories_InProject_In_DisplayOrder = all_SearchTagCategories_InProject_In_DisplayOrder;
    }

    is_userIsProjectOwner() {
        return this._userIsProjectOwner;
    }

    is_NO_Searches_In_Project() {
        return this._all_Searches_ProjectSearchIds_Set.size === 0;
    }

    get_all_Searches_ProjectSearchIds_Set() {
        return this._all_Searches_ProjectSearchIds_Set
    }

    get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() {
        return this._searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder
    }

    get_SearchData_For_ProjectSearchId( projectSearchId: number ) {
        return this._allSearches_Map_Key_ProjectSearchId.get(projectSearchId)
    }

    get_SearchData_ALL_Iterator() {
        return this._allSearches_Map_Key_ProjectSearchId.values()
    }

    get_SearchData_ALL_StandardDisplay_Sorted_SearchId_Descending() : ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data> {

        if ( this._searchData_ALL_StandardDisplay_Sorted_SearchId_Descending ) {
            return  this._searchData_ALL_StandardDisplay_Sorted_SearchId_Descending // EARLY RETURN
        }

        const searchData_ALL_StandardDisplay_Sorted_SearchId_Descending : Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data> =
            Array.from( this._allSearches_Map_Key_ProjectSearchId.values() )

        // sort on search id descending
        searchData_ALL_StandardDisplay_Sorted_SearchId_Descending.sort( (a,b) => {
            if ( a.searchId < b.searchId ) {
                return 1; // descending
            }
            if ( a.searchId > b.searchId ) {
                return -1; // descending
            }
            return 0;
        });

        this._searchData_ALL_StandardDisplay_Sorted_SearchId_Descending = searchData_ALL_StandardDisplay_Sorted_SearchId_Descending

        return  this._searchData_ALL_StandardDisplay_Sorted_SearchId_Descending
    }

    is_NO_Folders_In_Project() {
        return this._allFolders_Data_InDisplayOrder.length === 0;
    }

    get_allFolders_Data_InDisplayOrder() {
        return this._allFolders_Data_InDisplayOrder;
    }

    get_all_SearchTags_InProject_Iterator() {
        return this._all_SearchTags_InProject_Map_Key_TagId.values()
    }

    get_SearchTags_InProject_For_TagId( tagId: number ) {
        return this._all_SearchTags_InProject_Map_Key_TagId.get( tagId );
    }

    get_SearchTags_InProject_InDisplayOrder() {
        return this._all_SearchTags_InProject_In_DisplayOrder
    }

    get_all_SearchTagCategories_InProject_In_DisplayOrder() {
        return this._all_SearchTagCategories_InProject_In_DisplayOrder
    }

    get_all_SearchTags_UNCategorized_In_DisplayOrder() {
        return this._all_SearchTags_UNCategorized_In_DisplayOrder
    }

}

/////

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data {

    readonly folderId : number
    readonly folderName : string
    readonly displayOrder : number

    readonly searchesInFolder_ProjectSearchIds_InDisplayOrder : ReadonlyArray<number>
}

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data {

    //  Search
    readonly projectSearchId : number
    readonly projectSearchIdCode : string
    readonly searchId : number
    readonly searchName : string
    readonly searchShortName : string
    readonly displayOrder_AllSearches : number

    readonly searchTagIds_Set: ReadonlySet<number>
}

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data {

    readonly category_id: number;
    readonly category_label: string;
    readonly label_Color_Font: string;
    readonly label_Color_Background: string;
    readonly label_Color_Border: string;

    readonly all_SearchTagIds_InCategory_Set: ReadonlySet<number>
    readonly all_SearchTags_InCategory_Map_Key_TagCategoryId: ReadonlyMap<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>

    readonly all_SearchTags_InCategory_In_DisplayOrder: ReadonlyArray<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>
}

/**
 *
 */
export class CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data {

    readonly tagId: number;
    readonly tagCategoryId: number;  //  null if uncategorized
    readonly tagString: string;
    readonly tag_Color_Font: string;
    readonly tag_Color_Background: string;
    readonly tag_Color_Border: string;
}


/**
 *
 */
export const getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds = function (
    {
        projectIdentifier, projectSearchIds
    } : {
        projectIdentifier : string
        projectSearchIds?: ReadonlyArray<number> //  Optional restriction to specific projectSearchIds.  projectIdentifier is then ignored if not populated.  projectIdentifier MUST be for same project if populated.
    }) : Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root> {

    return new Promise<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root> ( ( resolve, reject ) => {
        try {

            let requestObj = {
                projectIdentifier, projectSearchIds
            };

            const url = "d/rws/for-page/project-view-page-or-project-search-ids-search-list";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch((reason : any) => {
                reject(reason);
            });

            promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
                try {
                    const result = _getSearchList_FromServerResponseData(responseData);

                    resolve(result);

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException: e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    });
}

/**
 *
 */
const _getSearchList_FromServerResponseData = function ( responseData: any ) : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root {

    const folderList_FromWebService = responseData.folderList;
    const folderProjectSearchMappingList_FromWebService = responseData.folderProjectSearchMappingList;
    const searchList_FromWebService = responseData.searchList;
    const tagCategories_DistinctInProject_FromWebService = responseData.tagCategories_DistinctInProject;
    const projectSearchTagList_FromWebService = responseData.projectSearchTagList;
    const projectSearchTag_ProjectSearchId_Mapping_List_FromWebService = responseData.projectSearchTag_ProjectSearchId_Mapping_List;

    const noSearchesFound = responseData.noSearchesFound;

    if (noSearchesFound) {
        return new CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root({
            userIsProjectOwner: responseData.userIsProjectOwner,
            all_Searches_ProjectSearchIds_Set : new Set(),
            searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder: [],
            allSearches_Map_Key_ProjectSearchId: new Map(),
            allFolders_Data_InDisplayOrder: [],
            all_SearchTags_InProject_Map_Key_TagId: new Map(),
            all_SearchTags_InProject_In_DisplayOrder: [],
            all_SearchTags_UNCategorized_Map_Key_TagId: new Map(),
            all_SearchTags_UNCategorized_In_DisplayOrder: [],
            all_SearchTagCategories_InProject_Map_Key_TagCategoryId: new Map(),
            all_SearchTagCategories_InProject_In_DisplayOrder: []
        }); // EARLY RETURN
    }

    const allSearches_Map_Key_ProjectSearchId: Map<number,CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data > = new Map()

    const allFolders_Data_InDisplayOrder: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data> = []

    const all_SearchTags_InProject_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data> = new Map()

    let all_SearchTags_InProject_In_DisplayOrder: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data> = []

    //  Intermediate storage:

    const searchTagIds_Set__Map_Key_projectSearchId__LOCAL: Map<number, Set<number>> = new Map()

    const all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL:
        Map<number,
            {
                TEMP__SingleSearchTagCategory_Data: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data
                IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data>
            }
            > = new Map()

    const all_SearchTags_UNCategorized_Map_Key_TagId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data> = new Map()

    //  Process tagCategories_DistinctInProject_FromWebService into all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL

    if ( tagCategories_DistinctInProject_FromWebService ) {

        if ( ! ( tagCategories_DistinctInProject_FromWebService instanceof Array ) ) {
            throw Error("( tagCategories_DistinctInProject_FromWebService && ( ! ( tagCategories_DistinctInProject_FromWebService instanceof Array ) ) )")
        }

        for ( const tagCategory of tagCategories_DistinctInProject_FromWebService ) {

            if ( tagCategory.category_id === undefined || tagCategory.category_id === null ) {
                throw Error("( tagCategory.category_id === undefined || tagCategory.category_id === null )")
            }
            if ( ! variable_is_type_number_Check( tagCategory.category_id ) ) {
                throw Error("( ! variable_is_type_number_Check( tagCategory.category_id ) )")
            }

            if ( tagCategory.category_label === undefined || tagCategory.category_label === null ) {
                throw Error("( tagCategory.category_label === undefined || tagCategory.category_label === null )")
            }
            if ( ! limelight__IsVariableAString( tagCategory.category_label ) ) {
                throw Error("( ! limelight__IsVariableAString( tagCategory.category_label ) )")
            }

            if ( all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL.has( tagCategory.category_id ) ) {
                throw Error( "tagCategories_DistinctInProject_FromWebService has records with duplicate category_id")
            }

            all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL.set( tagCategory.category_id, {
                TEMP__SingleSearchTagCategory_Data: {
                    category_id: tagCategory.category_id,
                    category_label: tagCategory.category_label,
                    label_Color_Font: tagCategory.label_Color_Font,
                    label_Color_Background: tagCategory.label_Color_Background,
                    label_Color_Border: tagCategory.label_Color_Border,
                    all_SearchTagIds_InCategory_Set: null,
                    all_SearchTags_InCategory_Map_Key_TagCategoryId: null,
                    all_SearchTags_InCategory_In_DisplayOrder: null
                },
                IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId: new Map()
            })
        }
    }

    //  Process projectSearchTagList_FromWebService into all_SearchTags_InProject_Map_Key_TagId and all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL

    if ( projectSearchTagList_FromWebService ) {

        if ( ! ( projectSearchTagList_FromWebService instanceof Array ) ) {
            throw Error("( projectSearchTagList_FromWebService && ( ! ( projectSearchTagList_FromWebService instanceof Array ) ) )")
        }

        for ( const projectSearchTag of projectSearchTagList_FromWebService ) {

            if ( projectSearchTag.tagId === undefined || projectSearchTag.tagId === null ) {
                throw Error("( projectSearchTag.tagId === undefined || projectSearchTag.tagId === null )")
            }
            if ( ! variable_is_type_number_Check( projectSearchTag.tagId ) ) {
                throw Error("( ! variable_is_type_number_Check( projectSearchTag.tagId ) )")
            }
            if ( projectSearchTag.tagCategoryId !== null && ( ! variable_is_type_number_Check( projectSearchTag.tagCategoryId ) ) ) {
                throw Error("( projectSearchTag.tagCategoryId !== null && ( ! variable_is_type_number_Check( projectSearchTag.tagCategoryId ) ) )")
            }
            if ( projectSearchTag.tagString === undefined || projectSearchTag.tagString === null ) {
                throw Error("( projectSearchTag.tagString === undefined || projectSearchTag.tagString === null )")
            }
            if ( ! limelight__IsVariableAString( projectSearchTag.tagString ) ) {
                throw Error("( ! limelight__IsVariableAString( projectSearchTag.tagString ) )")
            }

            if ( projectSearchTag.tag_Color_Background !== undefined && projectSearchTag.tag_Color_Background !== null ) {
                if ( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Background ) ) {
                    throw Error("( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Background ) )")
                }
            }
            if ( projectSearchTag.tag_Color_Font !== undefined && projectSearchTag.tag_Color_Font !== null ) {
                if ( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Font ) ) {
                    throw Error("( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Font ) )")
                }
            }
            if ( projectSearchTag.tag_Color_Border !== undefined && projectSearchTag.tag_Color_Border !== null ) {
                if ( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Border ) ) {
                    throw Error("( ! limelight__IsVariableAString( projectSearchTag.tag_Color_Border ) )")
                }
            }

            if ( all_SearchTags_InProject_Map_Key_TagId.has( projectSearchTag.tagId ) ) {
                throw Error( "projectSearchTagList_FromWebService has records with duplicate tagId")
            }

            const newTagEntry: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTag_Data  = {
                tagId: projectSearchTag.tagId,
                tagCategoryId: projectSearchTag.tagCategoryId,
                tagString: projectSearchTag.tagString,
                tag_Color_Background: projectSearchTag.tag_Color_Background,
                tag_Color_Font: projectSearchTag.tag_Color_Font,
                tag_Color_Border: projectSearchTag.tag_Color_Border
            }

            all_SearchTags_InProject_Map_Key_TagId.set( newTagEntry.tagId, newTagEntry )

            let newTagEntry_StoredInCategory = false;

            if ( newTagEntry.tagCategoryId !== undefined && newTagEntry.tagCategoryId !== null ) {

                const all_SearchTagCategories_InProject_Entry = all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL.get( newTagEntry.tagCategoryId )
                if ( ! all_SearchTagCategories_InProject_Entry ) {
                    //  Category does NOT exist for newTagEntry.tagCategoryId.  DB Foreign key prevents this but maybe DB query timing resulted in this
                    //  Stick in Uncategorized below
                }
                if ( all_SearchTagCategories_InProject_Entry ) {

                    if ( all_SearchTagCategories_InProject_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId.has( newTagEntry.tagId ) ) {
                        const msg = "tagId already in category:  ( all_SearchTagCategories_InProject_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId.has( newTagEntry.tagId ) ). newTagEntry.tagId: " + newTagEntry.tagId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    all_SearchTagCategories_InProject_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId.set( newTagEntry.tagId, newTagEntry )

                    newTagEntry_StoredInCategory = true;
                }
            }

            if ( ! newTagEntry_StoredInCategory ) {
                //  Not in a Category so store here in Uncategorized

                if ( all_SearchTags_UNCategorized_Map_Key_TagId.has( newTagEntry.tagId ) ) {
                    const msg = "tagId already in category:  ( all_SearchTags_UNCategorized_Map_Key_TagId.has( newTagEntry.tagId ) ).  newTagEntry.tagId: " + newTagEntry.tagId
                    console.warn(msg)
                    throw Error(msg)
                }

                all_SearchTags_UNCategorized_Map_Key_TagId.set( newTagEntry.tagId, newTagEntry )
            }
        }

        all_SearchTags_InProject_In_DisplayOrder = Array.from( all_SearchTags_InProject_Map_Key_TagId.values() );

        all_SearchTags_InProject_In_DisplayOrder.sort( (a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tagString, b.tagString);
        })
    }

    //  Process projectSearchTag_ProjectSearchId_Mapping_List_FromWebService into searchTagIds_Set__Map_Key_projectSearchId__LOCAL

    if ( projectSearchTag_ProjectSearchId_Mapping_List_FromWebService ) {

        if ( ! ( projectSearchTagList_FromWebService instanceof Array ) ) {
            throw Error("( projectSearchTag_ProjectSearchId_Mapping_List_FromWebService && ( ! ( projectSearchTag_ProjectSearchId_Mapping_List_FromWebService instanceof Array ) ) )")
        }

        for ( const projectSearchTag_ProjectSearchId_Mapping___Entry of projectSearchTag_ProjectSearchId_Mapping_List_FromWebService ) {

            if ( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId === undefined || projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId === null ) {
                throw Error("( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId === undefined || projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId === null )")
            }
            if ( ! variable_is_type_number_Check( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId ) ) {
                throw Error("( ! variable_is_type_number_Check( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId ) )")
            }
            if ( projectSearchTag_ProjectSearchId_Mapping___Entry.tagId === undefined || projectSearchTag_ProjectSearchId_Mapping___Entry.tagId === null ) {
                throw Error("( projectSearchTag_ProjectSearchId_Mapping___Entry.tagId === undefined || projectSearchTag_ProjectSearchId_Mapping___Entry.tagId === null )")
            }
            if ( ! variable_is_type_number_Check( projectSearchTag_ProjectSearchId_Mapping___Entry.tagId ) ) {
                throw Error("( ! variable_is_type_number_Check( projectSearchTag_ProjectSearchId_Mapping___Entry.tagId ) )")
            }

            if ( ! all_SearchTags_InProject_Map_Key_TagId.has( projectSearchTag_ProjectSearchId_Mapping___Entry.tagId ) ) {
                throw Error( "projectSearchTag_ProjectSearchId_Mapping___Entry.tagId not found in all_SearchTags_InProject_Map_Key_TagId")
            }

            let searchTagIds_Set = searchTagIds_Set__Map_Key_projectSearchId__LOCAL.get( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId );
            if ( ! searchTagIds_Set ) {
                searchTagIds_Set = new Set();
                searchTagIds_Set__Map_Key_projectSearchId__LOCAL.set( projectSearchTag_ProjectSearchId_Mapping___Entry.projectSearchId , searchTagIds_Set );
            }
            searchTagIds_Set.add(projectSearchTag_ProjectSearchId_Mapping___Entry.tagId);
        }
    }

    //  Process searchList_FromWebService into allSearches_Map_Key_ProjectSearchId

    if ( ! searchList_FromWebService ) {
        throw Error("noSearchesFound is NOT true and searchList_FromWebService is not populated")
    }

    if ( ! ( searchList_FromWebService instanceof Array ) ) {
        throw Error("( ! ( searchList_FromWebService instanceof Array ) ) )")
    }

    for (const searchItem of searchList_FromWebService) {

        if ( searchItem.projectSearchId === undefined || searchItem.projectSearchId === null ) {
            throw Error("( searchItem.projectSearchId === undefined || searchItem.projectSearchId === null )")
        }
        if ( ! variable_is_type_number_Check( searchItem.projectSearchId ) ) {
            const msg = "( ! variable_is_type_number_Check( searchItem.projectSearchId ) ). searchItem.projectSearchId: " + searchItem.projectSearchId
            console.warn( msg )
            throw  Error( msg )
        }

        if ( searchItem.projectSearchId === undefined || searchItem.projectSearchId === null ) {
            throw Error("( searchItem.projectSearchId === undefined || searchItem.projectSearchId === null )")
        }
        if ( ! variable_is_type_number_Check( searchItem.searchId ) ) {
            const msg = "( ! variable_is_type_number_Check( searchItem.searchId ) ). searchItem.searchId: " + searchItem.searchId
            console.warn( msg )
            throw  Error( msg )
        }

        if ( searchItem.name === undefined || searchItem.name === null ) {
            throw Error("( searchItem.name === undefined || searchItem.name === null )")
        }
        if ( ! limelight__IsVariableAString( searchItem.name ) ) {
            const msg = "( ! limelight__IsVariableAString( searchItem.name ) ). searchItem.name: " + searchItem.name
            console.warn( msg )
            throw  Error( msg )
        }

        //  Display Order for "All Searches"
        if ( searchItem.displayOrder === undefined || searchItem.displayOrder === null ) {
            throw Error("( searchItem.displayOrder === undefined || searchItem.displayOrder === null )")
        }
        if ( ! variable_is_type_number_Check( searchItem.displayOrder ) ) {
            const msg = "( ! variable_is_type_number_Check( searchItem.displayOrder ) ). searchItem.displayOrder: " + searchItem.displayOrder
            console.warn( msg )
            throw  Error( msg )
        }

        //  projectSearchIdCode

        if ( searchItem.projectSearchIdCode === undefined || searchItem.projectSearchIdCode === null ) {
            throw Error("( searchItem.projectSearchIdCode === undefined || searchItem.projectSearchIdCode === null )")
        }
        if ( ! limelight__IsVariableAString( searchItem.projectSearchIdCode ) ) {
            const msg = "( ! limelight__IsVariableAString( searchItem.projectSearchIdCode ) ). searchItem.projectSearchIdCode: " + searchItem.projectSearchIdCode
            console.warn( msg )
            throw  Error( msg )
        }



        let searchTagIds_Set = searchTagIds_Set__Map_Key_projectSearchId__LOCAL.get( searchItem.projectSearchId );

        if ( ! searchTagIds_Set ) {
            //  none found so set to empty set
            searchTagIds_Set = new Set()
        }

        const searchList_Entry : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data = {
            projectSearchId : searchItem.projectSearchId,
            projectSearchIdCode : searchItem.projectSearchIdCode,
            searchId : searchItem.searchId,
            searchName : searchItem.name,
            searchShortName: searchItem.searchShortName,
            displayOrder_AllSearches : searchItem.displayOrder,
            searchTagIds_Set
        }

        allSearches_Map_Key_ProjectSearchId.set( searchList_Entry.projectSearchId, searchList_Entry )
    }

    //  Process folderProjectSearchMappingList_FromWebService into folder_SearchData__Map_Key_folderId__LOCAL

    const folder_SearchData__Map_Key_folderId__LOCAL: Map<number, Array<{ projectSearchId: number, searchDisplayOrder: number }>> = new Map()

    if ( folderProjectSearchMappingList_FromWebService ) {

        if ( ! ( folderProjectSearchMappingList_FromWebService instanceof Array ) ) {
            throw Error("( ! ( folderProjectSearchMappingList_FromWebService instanceof Array ) ) )")
        }

        for ( const folderProjectSearchMapping_Entry of folderProjectSearchMappingList_FromWebService ) {

            if ( folderProjectSearchMapping_Entry.folderId === undefined || folderProjectSearchMapping_Entry.folderId === null ) {
                throw Error("( folderProjectSearchMapping_Entry.folderId === undefined || folderProjectSearchMapping_Entry.folderId === null )")
            }
            if ( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.folderId ) ) {
                throw Error("( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.folderId ) )")
            }
            if ( folderProjectSearchMapping_Entry.projectSearchId === undefined || folderProjectSearchMapping_Entry.projectSearchId === null ) {
                throw Error("( folderProjectSearchMapping_Entry.projectSearchId === undefined || folderProjectSearchMapping_Entry.projectSearchId === null )")
            }
            if ( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.projectSearchId ) ) {
                throw Error("( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.projectSearchId ) )")
            }
            if ( folderProjectSearchMapping_Entry.searchDisplayOrder === undefined || folderProjectSearchMapping_Entry.searchDisplayOrder === null ) {
                throw Error("( folderProjectSearchMapping_Entry.searchDisplayOrder === undefined || folderProjectSearchMapping_Entry.searchDisplayOrder === null )")
            }
            if ( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.searchDisplayOrder ) ) {
                throw Error("( ! variable_is_type_number_Check( folderProjectSearchMapping_Entry.searchDisplayOrder ) )")
            }

            let folder_SearchData = folder_SearchData__Map_Key_folderId__LOCAL.get( folderProjectSearchMapping_Entry.folderId );
            if ( ! folder_SearchData ) {
                folder_SearchData = [];
                folder_SearchData__Map_Key_folderId__LOCAL.set( folderProjectSearchMapping_Entry.folderId, folder_SearchData );
            }
            folder_SearchData.push({ projectSearchId: folderProjectSearchMapping_Entry.projectSearchId, searchDisplayOrder: folderProjectSearchMapping_Entry.searchDisplayOrder });
        }
    }

    ////   Process FOLDERS

    const projectSearchIds_InAny_Folder_Set : Set<number> = new Set()

    if (folderList_FromWebService ) {

        if ( ! ( folderList_FromWebService instanceof Array ) ) {
            throw Error("( ! ( folderList_FromWebService instanceof Array ) ) )")
        }

        for (const folderItem_FromWebService of folderList_FromWebService) {

            if ( folderItem_FromWebService.id === undefined || folderItem_FromWebService.id === null ) {
                throw Error("( folderItem_FromWebService.id === undefined || folderItem_FromWebService.id === null )")
            }
            if ( ! variable_is_type_number_Check( folderItem_FromWebService.id ) ) {
                const msg = "( ! variable_is_type_number_Check( folderItem_FromWebService.id ) ). folderItem_FromWebService.id: " + folderItem_FromWebService.id
                console.warn( msg )
                throw  Error( msg )
            }
            if ( folderItem_FromWebService.folderName === undefined || folderItem_FromWebService.folderName === null ) {
                throw Error("( folderItem_FromWebService.folderName === undefined || folderItem_FromWebService.folderName === null )")
            }
            if ( ! limelight__IsVariableAString( folderItem_FromWebService.folderName ) ) {
                const msg = "( ! limelight__IsVariableAString( folderItem_FromWebService.folderName ) ). folderItem_FromWebService.folderName: " + folderItem_FromWebService.folderName
                console.warn( msg )
                throw  Error( msg )
            }
            if ( folderItem_FromWebService.displayOrder === undefined || folderItem_FromWebService.displayOrder === null ) {
                throw Error("( folderItem_FromWebService.displayOrder === undefined || folderItem_FromWebService.displayOrder === null )")
            }
            if ( ! variable_is_type_number_Check( folderItem_FromWebService.displayOrder ) ) {
                const msg = "( ! variable_is_type_number_Check( folderItem_FromWebService.displayOrder ) ). folderItem_FromWebService.displayOrder: " + folderItem_FromWebService.displayOrder
                console.warn( msg )
                throw  Error( msg )
            }

            const searchesInFolder_ProjectSearchIds_InDisplayOrder: Array<number> = [];

            const folderId = folderItem_FromWebService.id as number;

            const folder_SearchData_For_FolderId = folder_SearchData__Map_Key_folderId__LOCAL.get( folderId )
            if ( folder_SearchData_For_FolderId ) {

                const searchData_SearchesInFolder: Array<{ searchData: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data, searchDisplayOrder_ToUse: number }> = []

                for ( const folder_SearchData_Entry of folder_SearchData_For_FolderId ) {

                    const searchData = allSearches_Map_Key_ProjectSearchId.get( folder_SearchData_Entry.projectSearchId );
                    if ( ! searchData ) {

                        try {
                            //  NOT FOUND so skip search and NOT put in folder
                            const msg = "WARN: NO Error shown to web user:  SearchData not found for projectSearchId in folder. folder_SearchData_Entry.projectSearchId: " + folder_SearchData_Entry.projectSearchId;
                            console.warn( msg )
                            throw Error(msg) //  SO Log to server

                        } catch (e) {

                            //  report error to user but NOT show Javascript Error overlay to user

                            reportWebErrorToServer.reportErrorObjectToServer({
                                errorException: e,
                                skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error: true
                            });
                            //  EAT Error
                        }
                        //  NOT FOUND so skip search and NOT put in folder
                        continue;  //  EARLY CONTINUE
                    }

                    projectSearchIds_InAny_Folder_Set.add( searchData.projectSearchId )

                    searchData_SearchesInFolder.push( { searchData, searchDisplayOrder_ToUse: folder_SearchData_Entry.searchDisplayOrder })
                }

                _sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList({ searchData_Array: searchData_SearchesInFolder })

                for ( const searchData_SearchesInFolder_Entry of searchData_SearchesInFolder ) {
                    searchesInFolder_ProjectSearchIds_InDisplayOrder.push( searchData_SearchesInFolder_Entry.searchData.projectSearchId )
                }

            }

            const folderItem : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data = {

                folderId,
                folderName : folderItem_FromWebService.folderName,
                displayOrder : folderItem_FromWebService.displayOrder,

                searchesInFolder_ProjectSearchIds_InDisplayOrder
            }

            allFolders_Data_InDisplayOrder.push(folderItem)
        }
    }

    allFolders_Data_InDisplayOrder.sort( (a,b) => {
        if ( a.displayOrder < b.displayOrder ) {
            return -1;
        }
        if ( a.displayOrder > b.displayOrder ) {
            return 1;
        }
        return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.folderName, b.folderName);
    })


    const all_Searches_ProjectSearchIds_Set : Set<number> = new Set();
    for ( const entry of allSearches_Map_Key_ProjectSearchId.values() ) {
        all_Searches_ProjectSearchIds_Set.add( entry.projectSearchId )
    }


    const searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder : Array<number> = []
    {
        const searchData_Searches_NOT_IN_ANY_Folder: Array<{ searchData: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data, searchDisplayOrder_ToUse: number }> = []
        for ( const entry of allSearches_Map_Key_ProjectSearchId.values() ) {
            if ( projectSearchIds_InAny_Folder_Set.has( entry.projectSearchId ) ) {
                //  In a folder so skip
                continue; // EALRY CONTINUE
            }

            searchData_Searches_NOT_IN_ANY_Folder.push({ searchData: entry, searchDisplayOrder_ToUse: entry.displayOrder_AllSearches })
        }
        _sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList({ searchData_Array: searchData_Searches_NOT_IN_ANY_Folder })

        for ( const searchData_Searches_NOT_IN_ANY_Folder_Entry of searchData_Searches_NOT_IN_ANY_Folder ) {
            searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder.push( searchData_Searches_NOT_IN_ANY_Folder_Entry.searchData.projectSearchId )
        }
    }

    const all_SearchTags_UNCategorized_In_DisplayOrder = Array.from( all_SearchTags_UNCategorized_Map_Key_TagId.values() );
    all_SearchTags_UNCategorized_In_DisplayOrder.sort( (a,b) => {
        return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tagString, b.tagString)
    })



    const all_SearchTagCategories_InProject_Map_Key_TagCategoryId: Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data> = new Map()

    for ( const all_SearchTagCategories__LOCAL_Entry of all_SearchTagCategories_InProject_Map_Key_TagCategoryId__LOCAL.values() ) {

        const all_SearchTagIds_InCategory_Set = new Set( all_SearchTagCategories__LOCAL_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId.keys() )
        const all_SearchTags_InCategory_In_DisplayOrder = Array.from( all_SearchTagCategories__LOCAL_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId.values() );

        all_SearchTags_InCategory_In_DisplayOrder.sort((a,b) => {
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.tagString, b.tagString)
        })

        const all_SearchTagCategories_InProject_Entry: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearchTagCategory_Data = {

            category_id: all_SearchTagCategories__LOCAL_Entry.TEMP__SingleSearchTagCategory_Data.category_id,
            category_label: all_SearchTagCategories__LOCAL_Entry.TEMP__SingleSearchTagCategory_Data.category_label,
            label_Color_Font: all_SearchTagCategories__LOCAL_Entry.TEMP__SingleSearchTagCategory_Data.label_Color_Font,
            label_Color_Background: all_SearchTagCategories__LOCAL_Entry.TEMP__SingleSearchTagCategory_Data.label_Color_Background,
            label_Color_Border: all_SearchTagCategories__LOCAL_Entry.TEMP__SingleSearchTagCategory_Data.label_Color_Border,

            all_SearchTagIds_InCategory_Set,

            all_SearchTags_InCategory_Map_Key_TagCategoryId: all_SearchTagCategories__LOCAL_Entry.IN_PROGRESS__all_SearchTags_InCategory_Map_Key_TagId,

            all_SearchTags_InCategory_In_DisplayOrder
        }

        all_SearchTagCategories_InProject_Map_Key_TagCategoryId.set( all_SearchTagCategories_InProject_Entry.category_id, all_SearchTagCategories_InProject_Entry )
    }

    const all_SearchTagCategories_InProject_In_DisplayOrder = Array.from( all_SearchTagCategories_InProject_Map_Key_TagCategoryId.values() );
    all_SearchTagCategories_InProject_In_DisplayOrder.sort((a,b) => {
        return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.category_label, b.category_label)
    })

    ///

    const resultRoot = new CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root({
        userIsProjectOwner: responseData.userIsProjectOwner,
        all_Searches_ProjectSearchIds_Set,
        searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder,
        allSearches_Map_Key_ProjectSearchId,
        allFolders_Data_InDisplayOrder,
        all_SearchTags_InProject_Map_Key_TagId,
        all_SearchTags_InProject_In_DisplayOrder,
        all_SearchTags_UNCategorized_Map_Key_TagId,
        all_SearchTags_UNCategorized_In_DisplayOrder,
        all_SearchTagCategories_InProject_Map_Key_TagCategoryId,
        all_SearchTagCategories_InProject_In_DisplayOrder
    })

    return resultRoot;
}

/**
 *
 */
const _sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList = function(
    {
        searchData_Array
    }:{
        searchData_Array: Array<{ searchData: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data, searchDisplayOrder_ToUse: number }>
    }) {

    if ( ( ! searchData_Array ) || searchData_Array.length === 0 ) {
        //  no searches
        return; // EARLY RETURN
    }

    //  Sort on display order ascending then search id descending

    searchData_Array.sort( (a, b) => {
        // display order ascending
        if ( a.searchDisplayOrder_ToUse < b.searchDisplayOrder_ToUse ) {
            return -1;
        }
        if ( a.searchDisplayOrder_ToUse > b.searchDisplayOrder_ToUse ) {
            return 1;
        }
        // search id descending
        if ( a.searchData.searchId < b.searchData.searchId ) {
            return 1;
        }
        if ( a.searchData.searchId > b.searchData.searchId ) {
            return -1;
        }
        // console.warn("sorting search list.  displayOrder and searchId match");
        return 0; // should never get here
    })
}