/**
 * create_experiment_SearchFilterValuesFromDefaultCutoffs.ts
 * 
 * Put data in conditionGroupsDataContainer
 * for per search (project search id) 
 * filter data based on Default Cutoffs
 * for specified projectSearchIds
 */

import { Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData, Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes';
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
    AnnotationTypeData_Root, AnnotationTypeItem,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Experiment_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";

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
     searchDataMap_KeyProjectSearchId : Map<number, GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
     searchesData : {
         searches_TopLevelAndNestedInFolders: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
         searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;
         searchesSubData : {
             searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
             annotationTypeData_Root : AnnotationTypeData_Root
         }
     }
     conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
 }) => {

    const searchesSubData = searchesData.searchesSubData;

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
            _create_SearchFilterValues_SingleSearchContents({ projectSearchId, searchesSubData, data_conditionGroupsDataContainer });
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
        data_conditionGroupsDataContainer //  output
    } : {
        projectSearchId : number
        searchesSubData : {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
        data_conditionGroupsDataContainer: Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData
    }) => {

    const searchAnnotationTypesData = searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId )
    if ( ! searchAnnotationTypesData ) {
        console.log("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
        throw Error("create_experiment_SearchFilterValuesFromDefaultCutoffs:_create_SearchFilterValues_SingleSearchContents: No data in searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId );
    }

    // const searchAnnotationTypesData = dataForProjectSearchId.searchAnnotationTypesData;

    //  Map key ann type id
    const psmFilterableAnnotationTypes = searchAnnotationTypesData.psmFilterableAnnotationTypes;
    const reportedPeptideFilterableAnnotationTypes = searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes;

    //   matchedProteinFilters not currently processed
    // const matchedProteinFilters = searchAnnotationTypesData.matchedProteinFilterableAnnotationTypes;

    //   Default Search Filters/Cutoffs

    // Process PSM filters
    if ( psmFilterableAnnotationTypes ) { 
        const psmFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : psmFilterableAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_psmFilters_PerProjectSearchId( psmFilterData );
    }
    // Process Reported Peptide filters
    if ( reportedPeptideFilterableAnnotationTypes ) {
        const reportedPeptideFilterData : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = _create_SearchFilterValues_SingleFilterableType({
            filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_reportedPeptideFilters_PerProjectSearchId( reportedPeptideFilterData );
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
    // Process PSM filters
    if ( searchAnnotationTypesData.psmFilterableAnnotationTypes || searchAnnotationTypesData.psmDescriptiveAnnotationTypes ) {
        const reportedPeptideAnnTypeDisplay = _getDefaultsAnnTypeDisplayForType({ 
            param_FilterableAnnotationTypes : searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes, 
            param_DescriptiveAnnotationTypes : searchAnnotationTypesData.reportedPeptideDescriptiveAnnotationTypes
        });
        data_conditionGroupsDataContainer.set_reportedPeptideAnnTypeDisplay_PerProjectSearchId( reportedPeptideAnnTypeDisplay );
    }
}

/**
 * Contents for 1 Search for single type (PSM, Reported Petide, Protein)
 * 
 */
const _create_SearchFilterValues_SingleFilterableType = ({ 
    filterableAnnotationTypes
}:{
    filterableAnnotationTypes: Map<number, AnnotationTypeItem>
}) : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> => {

    const resultArray : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = [];

    for ( const entry of filterableAnnotationTypes ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;
        const defaultFilter = filterableAnnotationType.defaultFilter;

        if ( defaultFilter ) {
            // const annotationTypeName = filterableAnnotationType.name;
            const filterValue = filterableAnnotationType.defaultFilterValue;
            // const defaultFilterValueString = filterableAnnotationType.defaultFilterValueString;
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
