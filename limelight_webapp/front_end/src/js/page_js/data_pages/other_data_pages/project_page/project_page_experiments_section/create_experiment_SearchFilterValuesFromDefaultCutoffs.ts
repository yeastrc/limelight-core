/**
 * create_experiment_SearchFilterValuesFromDefaultCutoffs.ts
 * 
 * Put data in conditionGroupsDataContainer
 * for per search (project search id) 
 * filter data based on Default Cutoffs
 * for specified projectSearchIds
 */

import { Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData, Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes';
import {
    AnnotationTypeData_Root, AnnotationTypeItem,
    SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItems_PerProjectSearchId
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Experiment_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {
    DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein,
    DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
} from "page_js/data_pages/data_pages_common/defaultFilter_Cutoffs_Overrides_ProjectWide_DataRetrieval";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";

 /**
 * 
 * 
 * @param projectSearchIds
 * @param searchDataMap_KeyProjectSearchId
 * @param searchesData
 * @param conditionGroupsDataContainer
 */
export const create_experiment_SearchFilterValuesFromDefaultCutoffs = ({ 
    projectSearchIds, 
    searchDataMap_KeyProjectSearchId,
    searchesData, 
    conditionGroupsDataContainer
} : {
     projectSearchIds : Set<number>
     searchDataMap_KeyProjectSearchId : Map<number, CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data>
     searchesData : {
         searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
         searchesSubData : {
             searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
             annotationTypeData_Root : AnnotationTypeData_Root
         }
         defaultFilter_Cutoffs_Overrides_ProjectWide_Root: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
     }
     conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
 }) => {

    const searchesSubData = searchesData.searchesSubData;
    const defaultFilter_Cutoffs_Overrides_ProjectWide_Root = searchesData.defaultFilter_Cutoffs_Overrides_ProjectWide_Root;

    for ( const projectSearchId of projectSearchIds ) {
        const searchDataEntry = searchDataMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchDataEntry ) {
            console.log("WARN: No entry in searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
            continue; // EARLY CONTINUE
        }

        const data_conditionGroupsDataContainer_EmptyCheck = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
    
        if ( ! data_conditionGroupsDataContainer_EmptyCheck ) {

            const data_conditionGroupsDataContainer = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId, createIfNotFound : true });
        
            //  Entries for Search
            _create_SearchFilterValues_SingleSearchContents({
                projectSearchId, searchesSubData, defaultFilter_Cutoffs_Overrides_ProjectWide_Root, data_conditionGroupsDataContainer
            });
        }
    }
}

/**
 * Contents for 1 Search
 * 
 */
const _create_SearchFilterValues_SingleSearchContents = (
    {
        projectSearchId,
        searchesSubData,
        defaultFilter_Cutoffs_Overrides_ProjectWide_Root,
        data_conditionGroupsDataContainer //  output
    } : {
        projectSearchId : number
        searchesSubData : {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
        defaultFilter_Cutoffs_Overrides_ProjectWide_Root: DefaultFilter_Cutoffs_Overrides_ProjectWide_Root
        data_conditionGroupsDataContainer: Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData
    }) => {

    const searchProgramsPerSearchData = searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId )
    if ( ! searchProgramsPerSearchData ) {
        console.log("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
        throw Error("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
    }

    const searchAnnotationTypesData = searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId )
    if ( ! searchAnnotationTypesData ) {
        console.log("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
        throw Error("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
    }

    // const searchAnnotationTypesData = dataForProjectSearchId.searchAnnotationTypesData;

    //  Map key ann type id
    const psmFilterableAnnotationTypes = searchAnnotationTypesData.psmFilterableAnnotationTypes;
    const reportedPeptideFilterableAnnotationTypes = searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes;
    const matchedProteinFilters = searchAnnotationTypesData.matchedProteinFilterableAnnotationTypes;
    const modificationPositionFilters = searchAnnotationTypesData.modificationPositionFilterableAnnotationTypes;

    const defaultFilter_Cutoffs_Overrides_PSM = defaultFilter_Cutoffs_Overrides_ProjectWide_Root.defaultFilter_Cutoffs_Overrides_PSM;
    const defaultFilter_Cutoffs_Overrides_ReportedPeptide = defaultFilter_Cutoffs_Overrides_ProjectWide_Root.defaultFilter_Cutoffs_Overrides_ReportedPeptide;
    const defaultFilter_Cutoffs_Overrides_MatchedProtein = defaultFilter_Cutoffs_Overrides_ProjectWide_Root.defaultFilter_Cutoffs_Overrides_MatchedProtein;
    const defaultFilter_Cutoffs_Overrides_ModificationPosition = defaultFilter_Cutoffs_Overrides_ProjectWide_Root.defaultFilter_Cutoffs_Overrides_ModificationPosition;

    //   Default Search Filters/Cutoffs

    // Process PSM filters
    if ( psmFilterableAnnotationTypes ) { 
        const psmFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : psmFilterableAnnotationTypes,
            defaultFilter_Cutoffs_Overrides: defaultFilter_Cutoffs_Overrides_PSM,
            searchProgramsPerSearchData
        });
        data_conditionGroupsDataContainer.set_psmFilters_PerProjectSearchId( psmFilterData );
    }
    // Process Reported Peptide filters
    if ( reportedPeptideFilterableAnnotationTypes ) {
        const reportedPeptideFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes,
            defaultFilter_Cutoffs_Overrides: defaultFilter_Cutoffs_Overrides_ReportedPeptide,
            searchProgramsPerSearchData
        });
        data_conditionGroupsDataContainer.set_reportedPeptideFilters_PerProjectSearchId( reportedPeptideFilterData );
    }
    // Process Matched Protein filters
    if ( defaultFilter_Cutoffs_Overrides_MatchedProtein ) {
        const matchedProteinFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : matchedProteinFilters,
            defaultFilter_Cutoffs_Overrides: defaultFilter_Cutoffs_Overrides_MatchedProtein,
            searchProgramsPerSearchData
        });
        data_conditionGroupsDataContainer.set_matchedProteinFilters_PerProjectSearchId( matchedProteinFilterData );
    }
    // Process Modification Position filters
    if ( defaultFilter_Cutoffs_Overrides_ModificationPosition ) {
        const modificationPositionFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : modificationPositionFilters,
            defaultFilter_Cutoffs_Overrides: defaultFilter_Cutoffs_Overrides_ModificationPosition,
            searchProgramsPerSearchData
        });
        data_conditionGroupsDataContainer.set_modificationPositionFilters_PerProjectSearchId( modificationPositionFilterData );
    }


    //   Default Annotation Type Ids to display

    // Process PSM filters
    if ( searchAnnotationTypesData.psmFilterableAnnotationTypes || searchAnnotationTypesData.psmDescriptiveAnnotationTypes ) {
        const psmAnnTypeDisplay = _getDefaultsAnnTypeDisplayForType({ 
            param_FilterableAnnotationTypes : searchAnnotationTypesData.psmFilterableAnnotationTypes, 
            param_DescriptiveAnnotationTypes : searchAnnotationTypesData.psmDescriptiveAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_psmAnnTypeDisplay_PerProjectSearchId( psmAnnTypeDisplay );
    }
    // Process Reported Peptide filters
    if ( searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes || searchAnnotationTypesData.reportedPeptideDescriptiveAnnotationTypes ) {
        const reportedPeptideAnnTypeDisplay = _getDefaultsAnnTypeDisplayForType({ 
            param_FilterableAnnotationTypes : searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes, 
            param_DescriptiveAnnotationTypes : searchAnnotationTypesData.reportedPeptideDescriptiveAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_reportedPeptideAnnTypeDisplay_PerProjectSearchId( reportedPeptideAnnTypeDisplay );
    }
    // Process Matched Protein filters
    if ( searchAnnotationTypesData.matchedProteinFilterableAnnotationTypes || searchAnnotationTypesData.matchedProteinDescriptiveAnnotationTypes ) {
        const matchedProteinAnnTypeDisplay = _getDefaultsAnnTypeDisplayForType({
            param_FilterableAnnotationTypes : searchAnnotationTypesData.matchedProteinFilterableAnnotationTypes,
            param_DescriptiveAnnotationTypes : searchAnnotationTypesData.matchedProteinDescriptiveAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_matchedProteinAnnTypeDisplay_PerProjectSearchId( matchedProteinAnnTypeDisplay );
    }
    // Process Modification Position filters
    if ( searchAnnotationTypesData.modificationPositionFilterableAnnotationTypes || searchAnnotationTypesData.modificationPositionDescriptiveAnnotationTypes ) {
        const modificationPositionAnnTypeDisplay = _getDefaultsAnnTypeDisplayForType({
            param_FilterableAnnotationTypes : searchAnnotationTypesData.modificationPositionFilterableAnnotationTypes,
            param_DescriptiveAnnotationTypes : searchAnnotationTypesData.modificationPositionDescriptiveAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_matchedProteinAnnTypeDisplay_PerProjectSearchId( modificationPositionAnnTypeDisplay );
    }
}

/**
 * Contents for 1 Search for single type (PSM, Reported Petide, Protein)
 * 
 */
const _create_SearchFilterValues_SingleFilterableType = (
    {
        filterableAnnotationTypes,
        defaultFilter_Cutoffs_Overrides,
        searchProgramsPerSearchData
    }:{
        filterableAnnotationTypes: Map<number, AnnotationTypeItem>
        defaultFilter_Cutoffs_Overrides:  DefaultFilter_Cutoffs_Overrides_ProjectWide_PerType_PSM_ReportedPeptide_MatchedProtein
        searchProgramsPerSearchData: SearchProgramsPerSearchItems_PerProjectSearchId

    }) : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> => {

    const resultArray : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = [];

    for ( const entry of filterableAnnotationTypes ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;
        const annotationTypeName = filterableAnnotationType.name;
        const defaultFilter = filterableAnnotationType.defaultFilter;

        let filterValue : number = null;


        if ( defaultFilter ) {

            filterValue = filterableAnnotationType.defaultFilterValue;
        }

        if ( defaultFilter_Cutoffs_Overrides ) {
            //  Have Project Wide Overrides

            //  Get Search Program Name
            const searchProgramsPerSearch_For_Id = searchProgramsPerSearchData.searchProgramsPerSearchItem_Map.get( filterableAnnotationType.searchProgramsPerSearchId );
            if ( ! searchProgramsPerSearch_For_Id ) {
                const msg = "searchProgramsPerSearchData.searchProgramsPerSearchItem_Map.get( ) returned nothing for filterableAnnotationType.searchProgramsPerSearchId: " + filterableAnnotationType.searchProgramsPerSearchId;
                console.warn(msg);
                throw Error(msg)
            }
            const searchProgramName = searchProgramsPerSearch_For_Id.name;

            const defaultFilter_Cutoffs_Overrides_For_SearchProgramName = defaultFilter_Cutoffs_Overrides.defaultFilter_Cutoffs_Overrides_Per_SearchProgramName.get( searchProgramName );
            if ( defaultFilter_Cutoffs_Overrides_For_SearchProgramName && defaultFilter_Cutoffs_Overrides_For_SearchProgramName.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName ) {

                const defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName = defaultFilter_Cutoffs_Overrides_For_SearchProgramName.defaultFilter_Cutoffs_Overrides_Per_AnnotationTypeName.get( annotationTypeName )
                if ( defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName ) {

                    //  Have Default Filter Cutoff Override for AnnotationTypeName

                    filterValue = defaultFilter_Cutoffs_Overrides_For_AnnotationTypeName.defaultValue_ProjectWide_Number
                }
            }
        }


        if ( filterValue !== null ) {

            const result = new Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data();
            result.set_annTypeId( annotationTypeId );
            result.set_value( filterValue );
            resultArray.push( result );
        }
    }

    return resultArray;
}


/**
 * 
 */
const _getDefaultsAnnTypeDisplayForType = function (
    {
        param_FilterableAnnotationTypes, param_DescriptiveAnnotationTypes
    }: {
        param_FilterableAnnotationTypes: Map<number, AnnotationTypeItem>
        param_DescriptiveAnnotationTypes: Map<number, AnnotationTypeItem>
    }) {

    if ( ( ! param_FilterableAnnotationTypes ) && ( ! param_DescriptiveAnnotationTypes )  ) {
        return [];
    }
    

    const searchDetails_AnnTypeDisplayDefaultDisplayItems: Array<AnnotationTypeItem> = [];

    _getDefaultsAnnTypeDisplayForType_Add_Filterable_Or_Descriptive({ param_AnnotationTypes : param_FilterableAnnotationTypes, searchDetails_AnnTypeDisplayDefaultDisplayItems });
    
    _getDefaultsAnnTypeDisplayForType_Add_Filterable_Or_Descriptive({ param_AnnotationTypes : param_DescriptiveAnnotationTypes, searchDetails_AnnTypeDisplayDefaultDisplayItems });

    if ( searchDetails_AnnTypeDisplayDefaultDisplayItems.length === 0 ) {
        return [];
    }

    //  Sort array on Display Order
    
    searchDetails_AnnTypeDisplayDefaultDisplayItems.sort( function( a, b ) {
        if ( ( a.displayOrder === undefined || a.displayOrder === null ) && ( b.displayOrder === undefined || b.displayOrder === null ) ) {
            return a.name.localeCompare( b.name );
        }
        if ( a.displayOrder === undefined || a.displayOrder === null ) {
            return 1;  // sort a after b 
        }
        if ( b.displayOrder === undefined || b.displayOrder === null ) {
            return -1;  // sort a before b 
        }
        return a.displayOrder - b.displayOrder;
    })
    
    //  Create final array of annotation type ids
    
    const searchDetails_AnnTypeDisplayDefaultDisplayFinal = [];
    
    for ( const item of searchDetails_AnnTypeDisplayDefaultDisplayItems ) {
        searchDetails_AnnTypeDisplayDefaultDisplayFinal.push( item.annotationTypeId );
    }
    
    return searchDetails_AnnTypeDisplayDefaultDisplayFinal;
};


/**
 * @param param_AnnotationTypes - Map
 * @param searchDetails_AnnTypeDisplayDefaultDisplayItems - Array to add to
 */
const _getDefaultsAnnTypeDisplayForType_Add_Filterable_Or_Descriptive = (
    {
        param_AnnotationTypes,
        searchDetails_AnnTypeDisplayDefaultDisplayItems
    }: {
        param_AnnotationTypes: Map<number, AnnotationTypeItem>
        searchDetails_AnnTypeDisplayDefaultDisplayItems: Array<AnnotationTypeItem>
    } ) => {

    if ( ! param_AnnotationTypes ) {
        return;
    }

    for ( const entry of param_AnnotationTypes.entries() ) {

        const mapKey = entry[ 0 ];
        const mapValue = entry[ 1 ];

        if ( mapValue.defaultVisible ) {
            // Is Default Visible so add to array
            searchDetails_AnnTypeDisplayDefaultDisplayItems.push( mapValue );
        }
    }
}
