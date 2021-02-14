/**
 * dataPageStateManager.ts
 * 
 * Javascript:  A simple "State Manager" where all page state will be stored.
 * 
 */



 //   !!!!!!!!!!!    This File needs a lot of work for FULL Conversion to Typescript

 //          All properties in the sub class and setters and getters should be typed.



//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { AnnotationTypeData_ReturnSpecifiedTypes } from './annotationTypeData_ReturnSpecifiedTypes';
import { SearchDataLookupParameters_Root, copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root } from '../data_pages__common_data_classes/searchDataLookupParameters';

//  Class Exported at bottom


//  Classes and types for what is stored in DataPageStateManager are below the class definitions for DataPageStateManager and PageState_InternalData_Properties

/**
 * 
 */
class DataPageStateManager {

	// private _pageState;

	private _PrivateProperties_MayChangeWithoutNotice : PageState_InternalData_Properties;

	private _AnnotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;

	/**
	 * 
	 */
	constructor() {
		this._PrivateProperties_MayChangeWithoutNotice = new PageState_InternalData_Properties();

		this._AnnotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({ dataPageStateManager_DataFrom_Server : this });
	}

	get_util_AnnotationTypeData_ReturnSpecifiedTypes() : AnnotationTypeData_ReturnSpecifiedTypes {
		return this._AnnotationTypeData_ReturnSpecifiedTypes;
	}
	
	/**
	 * @returns [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them
	 */
	get_projectSearchIds() : Array<number>  {
		return this._PrivateProperties_MayChangeWithoutNotice._projectSearchIds;
	}
	/**
	 * @param [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them
	 */
	set_projectSearchIds( _projectSearchIds : Array<number> ) {
		this._PrivateProperties_MayChangeWithoutNotice._projectSearchIds = _projectSearchIds;
	}
	
		//  Not currently set or used.  !!!  MUST set before can use
	// /**
	//  * @returns { <projectSearchId> : <searchId>, ... }
	//  */
	// get_projectSearchIdsSearchIdsMapping() {
	// 	return this._PrivateProperties_MayChangeWithoutNotice._projectSearchIdsSearchIdsMapping;
	// }
	// /**
	//  * @param { <projectSearchId> : <searchId>, ... }
	//  */
	// set_projectSearchIdsSearchIdsMapping( _projectSearchIdsSearchIdsMapping ) {
	// 	this._PrivateProperties_MayChangeWithoutNotice._projectSearchIdsSearchIdsMapping = _projectSearchIdsSearchIdsMapping;
	// }

	//  NOT SET
	// /**
	//  * !!! Should NO longer be called  !!!
	//  * 
	//  * Returns Object where 
	//  * 	Property Name is Project Search Id as Number and 
	//  *  Property Value: { projectSearchId : number, searchId : number, name (string search name) }
	//  * 
	//  * @ returns void since should not be called
	//  */
	// get_searchNames() : void {  LINE COMMENTED OUT
	// 	const msg = "call DataPageStateManager::get_searchNames_AsMap() instead";
	// 	console.warn( msg );
	// 	throw Error( msg );
	// 	// return this._PrivateProperties_MayChangeWithoutNotice._searchNames;
	// }
	//  NOT SET
	/**
	//  No Longer Set
	// /**
	//  * @ param { <projectSearchId> : 'search name', ... }
	//  */
	// set_searchNames( searchNames ) : void {   LINE COMMENTED OUT
	// 	this._PrivateProperties_MayChangeWithoutNotice._searchNames = searchNames;
	// }

	/**
	 * 
	 * @returns Map<ProjectSearchId, SearchNames_AsMap_Entry>
	 *     Where Map value is SearchNames_AsMap_Entry:
	 *
	 *     Current value of type SearchNames_AsMap_Entry (In this file) = { projectSearchId : number, searchId : number, name : string, searchHasSubgroups : boolean }
	 *
	 */
	get_searchNames_AsMap() : SearchNames_AsMap {
		return this._PrivateProperties_MayChangeWithoutNotice._searchNames_AsMap;
	}
	/**
	 * @param { <projectSearchId> : 'search name', ... }
	 */
	set_searchNames_AsMap( searchNames_AsMap : SearchNames_AsMap ) : void {
		this._PrivateProperties_MayChangeWithoutNotice._searchNames_AsMap = searchNames_AsMap;
	}

	get_userCanEditSearchSubGroups() : boolean {
		return this._PrivateProperties_MayChangeWithoutNotice._userCanEditSearchSubGroups;
	}

	set_userCanEditSearchSubGroups( userCanEditSearchSubGroups : boolean ) : void {
		this._PrivateProperties_MayChangeWithoutNotice._userCanEditSearchSubGroups = userCanEditSearchSubGroups;
	}

	/**
	 *
	 * @returns undefined IF NO searches have search sub groups
	 */
	get_SearchSubGroups_Root() : SearchSubGroups_Root__DataPageStateManagerEntry {
		return this._PrivateProperties_MayChangeWithoutNotice._searchSubGroups_Root;
	}
	/**
	 *
	 */
	set_SearchSubGroups_Root( searchSubGroups_Root : SearchSubGroups_Root__DataPageStateManagerEntry ) : void {
		this._PrivateProperties_MayChangeWithoutNotice._searchSubGroups_Root = searchSubGroups_Root;
	}

	//  NOT SET
	//  V1 Format: No longer populated
	// /**
	//  * !!! Should NO longer be called  !!!
	//  * 
	//  * @returns void since should not be called
	//  * // was returns { <projectSearchId> : { <ann type data> } ... }
	//  */
	// get_annotationTypeData() : void { //  Throws Error
	// 	const msg = "call DataPageStateManager::get_searchNames_AsMap() instead";
	// 	console.warn( msg );
	// 	throw Error( msg );
	// 	// return this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData;
	// }
	//  No Longer Set
	// /**
	//  * @param { <projectSearchId> : { <ann type data> } ... }
	//  */
	// set_annotationTypeData( _annotationTypeData ) {
	// 	this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData = _annotationTypeData;
	// }

	//  V2 Format:
	/**
	 * @returns AnnotationTypeData_Root
	 */
	get_annotationTypeData_Root() : AnnotationTypeData_Root {
		return this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData_Root;
	}
	/**
	 * @param { <projectSearchId> : { <ann type data> } ... }
	 */
	set_annotationTypeData_Root( _annotationTypeData_Root : AnnotationTypeData_Root ) {
		this._PrivateProperties_MayChangeWithoutNotice._annotationTypeData_Root = _annotationTypeData_Root;
	}

	//  NOT SET
	// /**
	//  * !!! Should NO longer be called  !!!
	//  * 
	//  * @returns void since should not be called
	//  * // was returns { <projectSearchId> : { <search programs per search data> } ... }
	//  */
	// get_searchProgramsPerSearchData()  : void { //  Throws Error
	// 	const msg = "call DataPageStateManager::get_searchProgramsPerSearchData_Root() instead";
	// 	console.warn( msg );
	// 	throw Error( msg );
	// 	// return this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData;
	// }
	//  NOT SET
	// /**
	//  * @param { <projectSearchId> : { <search programs per search data> } ... }
	//  */
	// set_searchProgramsPerSearchData( _searchProgramsPerSearchData ) {
	// 	this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData = _searchProgramsPerSearchData;
	// }

	/**
	 * @returns { <projectSearchId> : { <search programs per search data> } ... }
	 */
	get_searchProgramsPerSearchData_Root() : SearchProgramsPerSearchData_Root {
		return this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData_Root;
	}
	/**
	 * @param { <projectSearchId> : { <search programs per search data> } ... }
	 */
	set_searchProgramsPerSearchData_Root( _searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root ) {
		this._PrivateProperties_MayChangeWithoutNotice._searchProgramsPerSearchData_Root = _searchProgramsPerSearchData_Root;
	}

	/**
	 * @returns { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }
	 */
	get_searchDetailsCriteriaData() : SearchDataLookupParameters_Root {
		return this._PrivateProperties_MayChangeWithoutNotice._searchDetailsCriteriaData;
	}
	/**
	 * @param { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }
	 */
	set_searchDetailsCriteriaData( searchDetailsCriteriaDataParam : SearchDataLookupParameters_Root ) {

		//  New Object graph created in various places when user changes the data so always here run the code to copy in to proper classes and validate
		const searchDetailsCriteriaDataCopyValidated = copyAndValidate_ParsedJSON_Into_SearchDataLookupParameters_Root( searchDetailsCriteriaDataParam );
		
		this._PrivateProperties_MayChangeWithoutNotice._searchDetailsCriteriaData = searchDetailsCriteriaDataCopyValidated;
	}

}

/**
 * 
 */
class PageState_InternalData_Properties {

	_projectSearchIds : Array<number>; // [ <projectSearchId>, ... ]  In the order they are on the URL, specifying the order to display them

	//  Not currently set or used    !!!  MUST set before can use
	// _projectSearchIdsSearchIdsMapping; // { <projectSearchId> : <searchId>, ... }

	_searchNames_AsMap : SearchNames_AsMap

	_userCanEditSearchSubGroups : boolean

	_searchSubGroups_Root : SearchSubGroups_Root__DataPageStateManagerEntry

	//  No longer used/set
	// _searchNames; // { <projectSearchId> : 'search name', ... }
	// 			// Object
	// 			// 	264:  object key projectSearchId
	// 			// 			name: "Add Rep Pept Desc Ann To Default Visible: Has Scan Filename on PSMs - 1_PSM_1_Peptide_Default_Cutoffs_NoProteinAnnotations Very Small Extracted entries from Pipeline Sample - limelightXML_Limited_With_1_PSM_1_Peptide_Default_Cutoffs_NoProteinAnnotations.xml"
	// 			// 			projectSearchId: 264
	// 			// 			searchId: 222

	//  V2 Format
	_annotationTypeData_Root : AnnotationTypeData_Root;

	//  V1 format
	//  No longer used/set
	// _annotationTypeData; // { <projectSearchId> : { <ann type data> } ... }
				//  Object  Objects all the way down

	
	_searchProgramsPerSearchData_Root :SearchProgramsPerSearchData_Root;

	//  No longer used/set
	// _searchProgramsPerSearchData : object; // { <projectSearchId> : { <search programs per search data> } ... }
				// Object
				// 	264:  object Key projectSearchId
				// 		Object
				// 			437:  object key searchProgramsPerSearchId
				// 				description: null
				// 				displayName: "kojak"
				// 				name: "kojak"
				// 				searchId: 222
				// 				searchProgramsPerSearchId: 437
				// 				version: "1.4.3"

	_searchDetailsCriteriaData: SearchDataLookupParameters_Root; // { <cutoffs data, managed by class SearchDetailsBlockDataMgmtProcessing> }

	/**
	 * 
	 */
	constructor() {
		
	}

}

///////////////////////////////////////////////////////////////

//  Types and Classes for what is stored in DataPageStateManager

type SearchNames_AsMap_Entry = { projectSearchId : number, searchId : number, name : string, searchHasSubgroups : boolean } ;

type SearchNames_AsMap = Map<number, SearchNames_AsMap_Entry> ;


/**
 * Search Sub Groups Entry for Project Search Id
 */
class SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry {

	searchSubGroup_Id : Readonly<number>
	displayOrder : Readonly<number>;  // null if not set, User specified Display Order
	searchSubgroupName_fromImportFile : Readonly<string>
	private _subgroupName_Display_FromServer_IfUserEnteredAValue : Readonly<string>  // null until user enters a value
	private _subgroupName_Display : string //  Computed on data load and can be updated by user

	constructor(
		{
			searchSubGroup_Id, displayOrder, searchSubgroupName_fromImportFile, subgroupName_Display_FromServer_IfUserEnteredAValue, subgroupName_Display
		} : {
			searchSubGroup_Id : Readonly<number>
			displayOrder : Readonly<number>;  // null if not set, User specified Display Order
			searchSubgroupName_fromImportFile : Readonly<string>
			subgroupName_Display_FromServer_IfUserEnteredAValue : Readonly<string>
			subgroupName_Display : string
		}) {
		this.searchSubGroup_Id = searchSubGroup_Id;
		this.displayOrder = displayOrder;
		this.searchSubgroupName_fromImportFile = searchSubgroupName_fromImportFile;
		this._subgroupName_Display_FromServer_IfUserEnteredAValue = subgroupName_Display_FromServer_IfUserEnteredAValue;
		this._subgroupName_Display = subgroupName_Display;
	}

	/**
	 * Return User entered Display or Compute subgroupName_Display
	 */
	get subgroupName_Display() {

		return this._subgroupName_Display
	}
	/**
	 * Update subgroupName_Display
	 */
	set subgroupName_Display( subgroupName_Display: string ) {
		this._subgroupName_Display = subgroupName_Display
	}
}

/**
 * Search Sub Groups Entry for Project Search Id
 */
class SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry {

	projectSearchId : Readonly<number>
	private searchSubGroups_Map : Readonly<Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>>
	private searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode : Readonly<Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>>

	constructor({ projectSearchId, searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode } : {
		projectSearchId : Readonly<number>
		searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode : Readonly<Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>>
	}) {
		this.projectSearchId = projectSearchId
		this.searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode = searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode;

		if ( searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode ) {
			const searchSubGroups_Map : Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Map();
			for ( const searchSubGroup of searchSubGroups_Array_SortedOn_subgroupName_Display_ByServerCode ) {
				searchSubGroups_Map.set( searchSubGroup.searchSubGroup_Id, searchSubGroup );
			}
			this.searchSubGroups_Map = searchSubGroups_Map;
		}
	}

	/**
	 *
	 */
	get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode(){
		return this.searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode
	}
	/**
	 *
	 */
	get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroup_Id : Readonly<number> ) {
		return this.searchSubGroups_Map.get( searchSubGroup_Id )
	}
}

/**
 * Search Sub Groups Root
 */
class SearchSubGroups_Root__DataPageStateManagerEntry {

	private entries_PerProjectSearchId : Map<number,SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry> = new Map<number, SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry>()

	public addForProjectSearchId( entry : SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry ) : void {

		this.entries_PerProjectSearchId.set( entry.projectSearchId, entry )
	}
	/**
	 *
	 */
	get_searchSubGroups_ForProjectSearchId( projectSearchId : Readonly<number> ) : SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry {
		return this.entries_PerProjectSearchId.get( projectSearchId )
	}
}


/**
 * Search Programs Per Search Data Root
 */
class SearchProgramsPerSearchData_Root {

	searchProgramsPerSearchItems_PerProjectSearchId_Map : Map<number, SearchProgramsPerSearchItems_PerProjectSearchId> = new Map();
}

/**
 * Each Search Programs Per Search Per ProjectSearchId
 */
class SearchProgramsPerSearchItems_PerProjectSearchId {

	projectSearchId : number;
	searchId : number;

	/**
	 * Key searchProgramsPerSearchId
	 */
	searchProgramsPerSearchItem_Map: Map<number, SearchProgramsPerSearchItem> = new Map();
}

/**
 * Each Search Programs Per Search Item Entry
 */
class SearchProgramsPerSearchItem {

	readonly searchProgramsPerSearchId : number
	readonly searchId : number
	readonly name : string
	readonly description : string
	readonly displayName : string
	readonly version : string

	constructor({
		searchProgramsPerSearchId,
		searchId,
		name,
		description,
		displayName,
		version
	} : {
		searchProgramsPerSearchId : number
		searchId : number
		name : string
		description : string
		displayName : string
		version : string
	}) {
		this.searchProgramsPerSearchId = searchProgramsPerSearchId;
		this.searchId = searchId
		this.name = name
		this.description = description
		this.displayName = displayName
		this.version = version
	}
}

//   

/**
 * Annotation Type Data Root
 */
class AnnotationTypeData_Root {

	annotationTypeItems_PerProjectSearchId_Map : Map<number, AnnotationTypeItems_PerProjectSearchId> = new Map();

	constructor() {

	}
}

/**
 * Each Annotation Type Data Per ProjectSearchId
 */
class AnnotationTypeItems_PerProjectSearchId {

	projectSearchId : number;
	searchId : number;

	//  Annotation Types Map: Key Annotation Type Id

	//  Filterable Annotation Types
	psmFilterableAnnotationTypes : Map<number, AnnotationTypeItem>;
	reportedPeptideFilterableAnnotationTypes : Map<number, AnnotationTypeItem>;
	matchedProteinFilterableAnnotationTypes : Map<number, AnnotationTypeItem>;

	//  Descriptive Annotation Types
	psmDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem>;
	reportedPeptideDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem>;
	matchedProteinDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem>;
}

/**
 * Each Annotation Type Item Entry
 */
class AnnotationTypeItem {

	readonly annotationTypeId : number;
    	
	readonly searchProgramsPerSearchId : number;
	
	readonly name : string;

	readonly defaultVisible : boolean;
	readonly displayOrder : number; // may be null

	readonly description : string;
	
	///  Filterable Annotation Types Only, ignore for descriptive annotation types

	readonly filterDirectionAbove : boolean;
	readonly filterDirectionBelow : boolean;

	readonly defaultFilter : boolean;
	readonly defaultFilterValue : number;
	readonly defaultFilterValueString : string;

	readonly sortOrder : number;

	//  Added by Javascript: 
	
	//  Used by V1 DataTable (Non-React version)
	readonly sorttype : string; //  Label as sort as number or string for Filterable or Descriptive

	constructor({

		annotationTypeId,
			
		searchProgramsPerSearchId,
		
		name,

		defaultVisible,
		displayOrder, // may be null

		description,
		
		///  Filterable Annotation Types Only, ignore for descriptive annotation types

		filterDirectionAbove,
		filterDirectionBelow,

		defaultFilter,
		defaultFilterValue,
		defaultFilterValueString,

		sortOrder,

		//  Added by Javascript: 
		
		//  Used by V1 DataTable (Non-React version)
		sorttype, //  Label as sort as number or string for Filterable or Descriptive

	} : {

		annotationTypeId : number;
			
		searchProgramsPerSearchId : number;
		
		name : string;

		defaultVisible : boolean;
		displayOrder : number; // may be null

		description : string;
		
		///  Filterable Annotation Types Only, ignore for descriptive annotation types

		filterDirectionAbove : boolean;
		filterDirectionBelow : boolean;

		defaultFilter : boolean;
		defaultFilterValue : number;
		defaultFilterValueString : string;

		sortOrder : number;

		//  Added by Javascript: 
		
		//  Used by V1 DataTable (Non-React version)
		sorttype : string; //  Label as sort as number or string for Filterable or Descriptive

	}) {

		this.annotationTypeId = annotationTypeId;
			
		this.searchProgramsPerSearchId = searchProgramsPerSearchId;
		
		this.name = name;

		this.defaultVisible = defaultVisible;
		this.displayOrder = displayOrder;

		this.description = description;
		
		///  Filterable Annotation Types Only, ignore for descriptive annotation types

		this.filterDirectionAbove = filterDirectionAbove;
		this.filterDirectionBelow = filterDirectionBelow;

		this.defaultFilter = defaultFilter;
		this.defaultFilterValue = defaultFilterValue;
		this.defaultFilterValueString = defaultFilterValueString;

		this.sortOrder = sortOrder;

		//  Added by Javascript: 
		
		//  Used by V1 DataTable (Non-React version)
		this.sorttype = sorttype; //  Label as sort as number or string for Filterable or Descriptive

	}

}


export { 
	DataPageStateManager, SearchNames_AsMap, SearchNames_AsMap_Entry,
	SearchSubGroups_Root__DataPageStateManagerEntry, SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry,
	SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry,
	SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItems_PerProjectSearchId, SearchProgramsPerSearchItem,
	AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem 
}
