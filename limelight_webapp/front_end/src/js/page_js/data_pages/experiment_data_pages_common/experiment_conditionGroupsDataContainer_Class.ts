/**
 * experiment_conditionGroupsDataContainer_Class.ts
 * 
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData, Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data } from './experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes';
import { Experiment_ConditionGroup, Experiment_ConditionGroupsContainer } from './experiment_ConditionGroupsContainer_AndChildren_Classes';
import { SearchDataLookupParameters_Root, SearchDataLookupParams_Filter_Per_AnnotationType } from '../data_pages__common_data_classes/searchDataLookupParameters';
import {ExperimentConditions_GraphicRepresentation_SelectedCells} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {ExperimentConditions_GraphicRepresentation_MainCell_Identifier} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers";

const _VERSION = 1;


//////////

//   Other Exported Classes

/**
 * 
 * 
 */
export class Experiment_ConditionGroupsDataContainer_DataEntry {

    data : { projectSearchIds : Set<number> }
}

/**
 * 
 * 
 */
export class Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param {
    data : Experiment_ConditionGroupsDataContainer_DataEntry
    conditionIds_Path : Set<number>
}

//////////

//   Internal Classes

/**
 * 
 */
class ConditionData_InternalHolder_Root {

    conditionData_InternalHolder_PerConditionId_Root_Map_Entry : ConditionData_InternalHolder_PerConditionId_Map_Entry
}

/**
 * 
 */
class ConditionData_InternalHolder_PerConditionId_Map_Entry {

    conditionId : number
    data? : Experiment_ConditionGroupsDataContainer_DataEntry
    subConditionDataMap? : Map<number, ConditionData_InternalHolder_PerConditionId_Map_Entry>
}

/**
 * 
 */
class PerSearchData_InternalHolder_Root {

    perSearchData_KeyProjectSearchId : Map<number, Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData>
}

/////

/**
 *  Used in _getAllData_ConditionGroupCondition_ProcessSubMaps(...)
 */
class DataArrayCurrentEntry__getAllData_ConditionGroupCondition_ProcessSubMaps {

    conditionId : number
    conditions : Array<DataArrayCurrentEntry__getAllData_ConditionGroupCondition_ProcessSubMaps>
    data: {
        data: {
            projectSearchIds: Array<number>
        }
    }
}

/////////////

//   Main Exported Class

/**
 * 
 * 
 */
export class Experiment_ConditionGroupsDataContainer {

    private _conditionData : ConditionData_InternalHolder_Root;
    private _perSearchData : PerSearchData_InternalHolder_Root;

    /**
     * @param params - { experimentConditionData }
     * 
     */
    constructor({ 
        experimentConditionData_Serialized, 
        searchDataLookupParamsRoot 
    } : { 
        experimentConditionData_Serialized?, 
        searchDataLookupParamsRoot? : SearchDataLookupParameters_Root
    }) {

        // let experimentConditionData_Serialized = experimentConditionData;

        if ( experimentConditionData_Serialized ) {

            this._construct_from_experimentConditionData_Serialized({ experimentConditionData_Serialized, searchDataLookupParamsRoot });

        } else {
            this._intitial_conditionData();
        }
    }

    /**
     * 
     * 
     */
    private _intitial_conditionData() {
        this._conditionData = { conditionData_InternalHolder_PerConditionId_Root_Map_Entry : new ConditionData_InternalHolder_PerConditionId_Map_Entry() };
        this._perSearchData = { perSearchData_KeyProjectSearchId : new Map() };
    }


    /**
     * Construct from data returned from this.getAllData_ForSave_ConditionGroupCondition({ conditionGroups }).
     * 
     */
    private _construct_from_experimentConditionData_Serialized({ experimentConditionData_Serialized, searchDataLookupParamsRoot } : { 
        
        experimentConditionData_Serialized, 
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root 
    }) {

        const result : {
            _conditionData : ConditionData_InternalHolder_Root
            _perSearchData : PerSearchData_InternalHolder_Root
         } = _construct_from_experimentConditionData_Serialized_Internal({ experimentConditionData_Serialized, searchDataLookupParamsRoot });

        if ( ! result ) {

            this._intitial_conditionData();
        } else {

            this._conditionData = result._conditionData;
            this._perSearchData = result._perSearchData;
        }
    }

    /**
     * 'cloneShallow' creates a new object so that a === comparison with the original will see that the contents of the object changed.
     *                This === comparison is helpful in React component should update functions.
     * 
     * This does NOT provide the ability to 'time travel' by using a the instance the clone was made from 
     *    since the contained data structure is pointed to by the original object and the clone 
     *    so any changes made to the clone are reflected in the original object.
     * 
     */
    cloneShallow() {
        const clone = new Experiment_ConditionGroupsDataContainer({ experimentConditionData_Serialized : undefined, searchDataLookupParamsRoot : undefined  });
        clone._conditionData = this._conditionData;
        clone._perSearchData = this._perSearchData;
        return clone;
    }

    /**
     * 
     * 
     */
    clearConditionData() {
        this._intitial_conditionData();
    }

    ///////////////

    //   Store Data for Project Search Ids

    //  this._perSearchData.perSearchData_KeyProjectSearchId may contain data for projectSearchId values NOT under any condition.
    //      Those values will never be retrieved and will not be stored to the server.
  
    /**
     * Get data for project search id.  This is separate storage from the data per initial index.
     * @param projectSearchId - key to the data
     * @param createIfNotFound - create object of class ConditionGroupsData_PerProjectSearchIdData, insert to internal datastructure, and return it
     * 
     * @returns Object of class ConditionGroupsData_PerProjectSearchIdData if found or param 'createIfNotFound' is true, otherwise undefined
     */
    get_data_ForProjectSearchId({ projectSearchId, createIfNotFound } : { 
        
        projectSearchId : number 
        createIfNotFound? : boolean 
    }) : Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData {

        let result : Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData = this._perSearchData.perSearchData_KeyProjectSearchId.get( projectSearchId );
        if ( ( ! result ) && createIfNotFound ) {
            result = new Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData();
            this._perSearchData.perSearchData_KeyProjectSearchId.set( projectSearchId, result );
        }
        return result;
    }

    // /**
    //  * Put data for project search id.  This is separate storage from the data per initial index.
    //  * @param data - data to store
    //  * @param projectSearchId - key to the data
    //  */
    // put_data_ForProjectSearchId({ data, projectSearchId }) {

    //     if ( ! data ) {
    //         throw Error("data param cannot be empty");
    //     }
    //     // if ( ! ( data instanceof ConditionGroupsData_PerProjectSearchIdData ) ) {
    //     //     throw Error("data param not instance of ConditionGroupsData_PerProjectSearchIdData");
    //     // }

    //     this._perSearchData.perSearchData_KeyProjectSearchId.set( projectSearchId, data );
    // }

    ////////////////////

    //   using condition initial indexes

    /**
     * Get Data using condition id
     * 
     * Pass conditionIds_Array or conditionIds_Set
     * 
     * @param conditionIds - pass 'conditionIds_Array' values as array [{  }, ...] - Array order does not matter
     * @returns entry based on conditionIds_Array
     */
    get_data ({ conditionIds_Array } : { 
        
        conditionIds_Array : Array<number>

    }) : Experiment_ConditionGroupsDataContainer_DataEntry {

        if ( conditionIds_Array === undefined || conditionIds_Array === null ) {
            const msg = "ConditionGroupsDataContainer: get_data: conditionIds_Array cannot be undefined or null"
            console.warn( msg )
            throw Error( msg );
        }
        if ( ! ( conditionIds_Array instanceof Array ) ) {
            const msg = "ConditionGroupsDataContainer: get_data: conditionIds_Array must be Array"
            console.warn( msg )
            throw Error( msg );
        }
        if ( conditionIds_Array.length === undefined ) {
            const msg = "ConditionGroupsDataContainer: get_data: conditionIds_Array.length cannot be undefined"
            console.warn( msg )
            throw Error( msg );
        }
        if ( conditionIds_Array.length === 0 ) {
            const msg = "ConditionGroupsDataContainer: get_data: conditionIds_Array.length cannot be zero"
            console.warn( msg )
            throw Error( msg );
        }

        return _get_data_ConditionIds ({ conditionIds_Array, _conditionData : this._conditionData });
    }


    /**
     * Take data and {condition group and condition initial indexes} and 
     * 
     * @param data - Data to Put
     * @param conditionIds_Array - pass 'conditionId' values as array [conditionId, ...] - Array order does not matter
     */
    put_data({ data, conditionIds_Array } : { 
        
        data : Experiment_ConditionGroupsDataContainer_DataEntry,
        conditionIds_Array : Array<number>
    }) : void {

        _put_data_UsingConditionIds({ data, conditionIds_Array, _conditionData : this._conditionData });
    }

    /**
     * Process All data Entries, calling callback with parameter ( param : ProcessAllDataEntries_callback_Param )
     * 
     * @param callback - function to call with the data
     * 
     *   NOT IMPLEMENTED
     *          OPTIONAL:
     *   param filter_id_Condition - Must have this id on a Condition in the path
     * 
     */
    processAllDataEntries_ConditionGroupsDataContainer({ callback } : { 
        
        callback( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) : void
    }) {

        //  Since leave empty maps in place, need to search through all maps

        //  Process down through the property 'subConditionDataMap' containing a Map with data in it

        const conditionDataCurrent = this._conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;

        return _processAllDataEntries_ProcessSubMaps ({ callback, experimentConditions_GraphicRepresentation_SelectedCells : undefined, conditionDataCurrent, conditionId_Path_PreviousLevels : undefined })
    }

    /**
     * Process data Entries, Filtering on Selected Condition Ids, calling callback with parameter ( param : ProcessAllDataEntries_callback_Param )
     * 
     * @param callback - function to call with the data
     * @param selectedConditionIds
     * @param conditionGroupsContainer - Required to determine which conditions in which condition groups
     * 
     */
    processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({ callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionGroupsContainer  } : {
        
        callback( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) : void

        // Need something different here
        // selectedConditionIds : Set<number>

        experimentConditions_GraphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells

        conditionGroupsContainer : Experiment_ConditionGroupsContainer //  Required to determine which conditions in which condition groups
    }) {

        //  Process down through the property 'subConditionDataMap' containing a Map with data in it

        const conditionDataCurrent = this._conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;

        return _processAllDataEntries_ProcessSubMaps ({ callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionDataCurrent, conditionId_Path_PreviousLevels : undefined })
    }

    /**
     * Get All Condition Group / Condition data Entries as arrays of arrays for sending to server to Save
     * 
     * @param conditionGroups - Error if found data not in provided condition groups
     * 
     * @returns { mainResult, projectSearchIds_All }
     *   - projectSearchIds_All - Array of projectSearchIds found
     * 
     */
    getAllData_ForSave_ConditionGroupCondition({ conditionGroups } : { conditionGroups : Array<Experiment_ConditionGroup> }) : {
        version : number
        mainResult?;
        projectSearchIds_All? : Array<number>;
    } {

        return _getAllData_ConditionGroupCondition_Internal({ conditionGroups, _conditionData : this._conditionData });
    }

    /**
     * Delete Data using condition conditionId
     * 
     * All Data for This conditionId will be deleted
     * 
     * @param conditionId
     * 
     */
    delete_data_For_ConditionId ({ conditionId } : { conditionId : number }) {

        if ( conditionId === undefined || conditionId === null ) {
            const msg = " ConditionGroupsDataContainer.delete_data_For_ConditionId(...): param conditionId is undefined or null";
            console.warn( msg );
            throw Error( msg );
            // return; // EARLY RETURN
        }

        //  Process down through the property 'subConditionDataMap' containing a Map with key of conditionId

        const conditionDataCurrent = this._conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;

        //  Process to where conditionId is in child maps

        //  Calls itself recursively
        _delete_data_For_ConditionId_ProcessSubMaps ({ conditionId, conditionDataCurrent })
    }
        
}

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////


//  NOT in any Class

/**
 * Get Data using condition initial indexes
 * 
 * @param conditionIds_Array - pass 'conditionIds' values as array [conditionId, ...] - Array order does not matter
 * @returns entry based on conditionIds_Array
 */
const _get_data_ConditionIds = function ({ conditionIds_Array, _conditionData } : { 
    
    conditionIds_Array : Array<number>, 
    _conditionData : ConditionData_InternalHolder_Root
}) : Experiment_ConditionGroupsDataContainer_DataEntry {

    if ( ! conditionIds_Array ) {
        console.log(" ConditionGroupsDataContainer.get_data(...): param conditionIds_Array is not populated")
        return undefined; // EARLY RETURN
    }

    const conditionIds_Array_Copy = Array.from( conditionIds_Array );

    //  Sort ascending
    conditionIds_Array_Copy.sort((a, b) : number => {
        if ( a < b ) return -1;
        if ( a > b ) return 1;
        return 0;
    });

    let conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry = _conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;
    
    for ( const conditionIds_Array_Entry of conditionIds_Array_Copy ) {

        {
            let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
            if ( subConditionDataMap === undefined ) {
                // Not found so exit loop
                break; //  EARLY LOOP EXIT
            }
            if ( ! ( subConditionDataMap instanceof Map ) ) {
                var z = 0;
            }

            let mapEntry = subConditionDataMap.get( conditionIds_Array_Entry );
            if ( mapEntry === undefined ) {
                // Not found so exit loop
                break; //  EARLY LOOP EXIT
            }
            conditionDataCurrent = mapEntry;
        }
    }
    if ( conditionDataCurrent === undefined ) {

        return undefined;  // EARLY RETURN
    }
    if ( conditionDataCurrent.data === undefined ) {
        // No Stored 'data' property
        return undefined;  // EARLY RETURN
    }

    //  Have final conditionDataCurrent object so return data

    return conditionDataCurrent.data;
}

/**
 * Take data and { condition.id } and 
 * 
 * @param data - Data to Put
 * @param conditionIds_Array - pass 'conditionId' values as array [conditionIds, ...] - Array order does not matter
 */
const _put_data_UsingConditionIds = function ({ data, conditionIds_Array, _conditionData } : { 
    data : Experiment_ConditionGroupsDataContainer_DataEntry,
    conditionIds_Array : Array<number>, 
    _conditionData : ConditionData_InternalHolder_Root
}){

    if ( conditionIds_Array === undefined || conditionIds_Array === null ) {
        const msg = "ConditionGroupsDataContainer.put_data(...) conditionIds_Array is undefined or null";
        console.log( msg );
        throw Error( msg );
    }
    if ( conditionIds_Array.length === undefined || conditionIds_Array.length === null ) {
        const msg = "ConditionGroupsDataContainer.put_data(...) conditionIds_Array.length is undefined or null";
        console.log( msg );
        throw Error( msg );
    }
    if ( conditionIds_Array.length === 0 ) {
        const msg = "ConditionGroupsDataContainer.put_data(...) conditionIds_Array.length is 0";
        console.log( msg );
        throw Error( msg );
    }

    const conditionIds_Array_Copy = Array.from( conditionIds_Array );

    //  Sort ascending
    conditionIds_Array_Copy.sort((a, b) : number => {
        if ( a < b ) return -1;
        if ( a > b ) return 1;
        return 0;
    });

    //  Process down through the property 'subConditionDataMap' containing a Map with key of conditionId

    let conditionDataCurrent = _conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;
    
    for ( const conditionIds_Array_Entry of conditionIds_Array_Copy ) {

        let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
        if ( subConditionDataMap === undefined ) {
            subConditionDataMap = new Map();
            conditionDataCurrent.subConditionDataMap = subConditionDataMap;
        }

        let mapEntry = subConditionDataMap.get( conditionIds_Array_Entry );
        if ( mapEntry === undefined ) {
            // Not found add
            mapEntry = { conditionId : conditionIds_Array_Entry };
            subConditionDataMap.set( conditionIds_Array_Entry, mapEntry );
        }
        conditionDataCurrent = mapEntry;

    }

    //  Have final bucket so set data
    
    conditionDataCurrent.data = data;
}

////////////////////////////////

/**
 * Internal, Used by function processAllDataEntries
 * 
 * Called Recursively
 * 
 * Process All conditionId Submaps
 * 
 * @param callback 
 * 
 *          Internal
 * @param conditionDataCurrent - Recursively passed as navigate down the tree of Maps
 * 
 *          Internal - Array of Objects - Recursively passed as navigate down the tree of Maps
 * @param conditionId_Path_PreviousLevels - Path of conditionId before current function call, or undefined if top level call
 * 
 */
const _processAllDataEntries_ProcessSubMaps = function ({ 
    
    callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionDataCurrent, conditionId_Path_PreviousLevels
} : {
    
    callback( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) : void
    experimentConditions_GraphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells
    conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry
    conditionId_Path_PreviousLevels : Set<number> 
}) {

    // console.log("_processAllDataEntries_ProcessSubMaps(...)")

    //  Walk the tree of Maps of Maps

    //   Maps with keys conditionId
    let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
    if ( subConditionDataMap === undefined ) {
        //  No sub map so skip
        return;  // EARLY RETURN
    }

    for ( const subConditionDataMap_Entry of subConditionDataMap.entries() ) {

        const subConditionDataMap_Entry_Key = subConditionDataMap_Entry[ 0 ];
        const conditionDataCurrent_MapEntry = subConditionDataMap_Entry[ 1 ];

        const conditionId = conditionDataCurrent_MapEntry.conditionId;

        //  Create conditionIds_Path for Current level

        let conditionIds_Path_PreviousLevels_And_CurrentLevel : Set<number> = undefined;

        if ( ! conditionId_Path_PreviousLevels ) {
            conditionIds_Path_PreviousLevels_And_CurrentLevel = new Set();
        } else {
            conditionIds_Path_PreviousLevels_And_CurrentLevel = new Set( conditionId_Path_PreviousLevels );
        }

        //  Add in current entry for current Condition

        conditionIds_Path_PreviousLevels_And_CurrentLevel.add( conditionId );

        if ( conditionDataCurrent_MapEntry.data ) {

            //  Have 'data' property so pass to callback if call_callback stays true

            let call_callback = true;

            if ( experimentConditions_GraphicRepresentation_SelectedCells && experimentConditions_GraphicRepresentation_SelectedCells.mainCell_Selected_FromConditionLabelSelections_HasAnyEntries() ) {

                const mainCell_Identifier = new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set : conditionIds_Path_PreviousLevels_And_CurrentLevel });

                if ( ! experimentConditions_GraphicRepresentation_SelectedCells.mainCell_Selected_FromConditionLabelSelections_ContainsEntry( mainCell_Identifier ) ) {

                    //  selectedConditionIds not found in conditionIds_Path so skip

                    call_callback = false;  //  skip Callback
                }
            }

            //  Have 'data' property and no selected or is in selected so pass to callback

            if ( call_callback ) {

                callback({ 
                    data : conditionDataCurrent_MapEntry.data, 
                    conditionIds_Path : conditionIds_Path_PreviousLevels_And_CurrentLevel
                });
            }

        } else {

            //  Recursive call to process conditionIds_Path_PreviousLevels_And_CurrentLevel
            _processAllDataEntries_ProcessSubMaps ({ 
                callback,
                experimentConditions_GraphicRepresentation_SelectedCells,
                conditionDataCurrent : conditionDataCurrent_MapEntry,
                conditionId_Path_PreviousLevels : conditionIds_Path_PreviousLevels_And_CurrentLevel
            });
        }
    }

}

////////////////////////////////

/**
 * Internal, Used by function getAllData_ConditionGroupCondition
 * 
 * Get All Condition Group / Condition data Entries as arrays of arrays for sending to server for saving
 * 
 * @param conditionGroups - Error if found data not in provided condition groups
 * 
 * @returns { mainResult, projectSearchIds_All }
 *   - projectSearchIds_All - Array of projectSearchIds found
 * 
 */
const _getAllData_ConditionGroupCondition_Internal = function ({ conditionGroups, _conditionData } : { 
    
    conditionGroups : Array<Experiment_ConditionGroup>, 
    _conditionData : ConditionData_InternalHolder_Root
}) : {
    version : number
    mainResult?;
    projectSearchIds_All? : Array<number>;
} {
    //  Since leave empty maps in place, need to search through all maps

    //  Process down through the property 'subConditionDataMap' containing a Map with data in it

    if ( ( ! conditionGroups ) || conditionGroups.length === 0 ) {

        return {
            version : _VERSION
        };
    }

    //  First convert conditionGroups to maps of maps for faster retrieval/validation that exists

    let foundAnyConditions = false;

    const all_conditionIds : Set<number> = new Set();

    for ( const conditionGroup of conditionGroups ) {

        const conditions = conditionGroup.conditions;

        if ( ( ! conditions ) || conditions.length === 0 ) {
            //  no conditions so skip
            continue;  // EARLY CONTINUE
        }

        foundAnyConditions = true;

        for ( const condition of conditions ) {
            all_conditionIds.add( condition.id );
        }
    }

    if ( ! foundAnyConditions ) {

        return {
            version : _VERSION
        };
    }



    const conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry = _conditionData.conditionData_InternalHolder_PerConditionId_Root_Map_Entry;

    const projectSearchIds_All_Set : Set<number> = new Set();

    const getAllData_ConditionGroupCondition_ProcessSubMaps_Results = _getAllData_ConditionGroupCondition_ProcessSubMaps({ projectSearchIds_All_Set, all_conditionIds, conditionDataCurrent });

    let dataArrayCurrent = undefined;

    if ( getAllData_ConditionGroupCondition_ProcessSubMaps_Results ) {
        dataArrayCurrent = getAllData_ConditionGroupCondition_ProcessSubMaps_Results.dataArrayCurrent;
    }
    if ( ! dataArrayCurrent ) {
        dataArrayCurrent = [];
    }

    const projectSearchIds_All_Array = Array.from( projectSearchIds_All_Set );

    projectSearchIds_All_Array.sort();

    const mainResult = { mainResultDataArray : dataArrayCurrent };

    return { version : _VERSION, mainResult, projectSearchIds_All : projectSearchIds_All_Array };
}

/**
 * Internal, Used by function _getAllData_ConditionGroupCondition_Internal
 * 
 * Called Recursively
 * 
 * Process All ConditionIds Submaps
 * 
 * @param projectSearchIds_All_Set - Result
 * 
 *   NOT IMPLEMENTED
 *          OPTIONAL:
 *   param filter_ConditionIds
 * 
 *          Internal
 * @param conditionDataCurrent - Recursively passed as navigate down the tree of Maps
 * 
 */
const _getAllData_ConditionGroupCondition_ProcessSubMaps = function ({ projectSearchIds_All_Set, all_conditionIds, conditionDataCurrent } : { 
    
    projectSearchIds_All_Set : Set<number> //  Is result
    all_conditionIds : Set<number>
    conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry
}) : {
    dataArrayCurrent : Array<DataArrayCurrentEntry__getAllData_ConditionGroupCondition_ProcessSubMaps>
} {

    //  Walk the tree of Maps of Maps

    let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
    if ( subConditionDataMap === undefined ) {
        //  No sub map so skip
        return null;  // EARLY RETURN
    }
    if ( subConditionDataMap.size === 0 ) {
        //  Sub map empty so skip
        return null;  // EARLY RETURN
    }

    const dataArrayCurrent : Array<DataArrayCurrentEntry__getAllData_ConditionGroupCondition_ProcessSubMaps> = [];

    for ( const subConditionDataMap_Entry of subConditionDataMap.entries() ) {

        const subConditionDataMap_Entry_Key = subConditionDataMap_Entry[ 0 ];
        const conditionDataCurrent = subConditionDataMap_Entry[ 1 ];

        const conditionId = conditionDataCurrent.conditionId;

        if ( ! all_conditionIds.has( conditionId ) ) {
            //  Entry not in current conditionIds so skip

            continue;  // EARLY CONTINUE
        }

        const dataArrayCurrent_For_condition : DataArrayCurrentEntry__getAllData_ConditionGroupCondition_ProcessSubMaps = {
            conditionId,
            conditions : undefined,
            data : undefined
        }
        dataArrayCurrent.push( dataArrayCurrent_For_condition );


        if ( conditionDataCurrent.data ) {

            const data = conditionDataCurrent.data;

            //  The contents of conditionDataCurrent.data are managed outside this class/file.
            //     Maybe that should change.

            const data_InnerData = data.data;

            const projectSearchIds = data_InnerData.projectSearchIds;
            
            let projectSearchIdsArray : Array<number> = undefined;
            if ( projectSearchIds && projectSearchIds.size !== 0 ) {
                projectSearchIdsArray = Array.from( projectSearchIds );
            }

            const data_result : {
                data : {
                    projectSearchIds : Array<number>
                }
            } = {
                data : {
                    projectSearchIds : projectSearchIdsArray
                }
            };

            dataArrayCurrent_For_condition.data = data_result;

            //  Add to projectSearchIds_All_Set
            if ( projectSearchIds && projectSearchIds.size !== 0 ) {
                for ( const projectSearchId of projectSearchIds ) {
                    projectSearchIds_All_Set.add( projectSearchId );
                }
            }

        } else {

            //  Recursive call to process conditionDataCurrent and output to dataArrayCurrent_For_condition
            const getAllData_ConditionGroupCondition_ProcessSubMaps_Results = _getAllData_ConditionGroupCondition_ProcessSubMaps ({ 
                projectSearchIds_All_Set,
                all_conditionIds, 
                conditionDataCurrent : conditionDataCurrent
            });

            if ( getAllData_ConditionGroupCondition_ProcessSubMaps_Results ) {
                const dataArrayCurrent = getAllData_ConditionGroupCondition_ProcessSubMaps_Results.dataArrayCurrent;

                if ( dataArrayCurrent ) {
                    dataArrayCurrent_For_condition.conditions = dataArrayCurrent;
                }
            }
        }
    }

    return { dataArrayCurrent };

}


////////////////////////////////

/**
 * Internal, Used by function constructor, via function _construct_from_experimentConditionData_Serialized
 * 
 * !!  Opposite of function _getAllData_ConditionGroupCondition_Internal
 * 
 * Populate object from parameter
 * 
 * @param experimentConditionData_Serialized
 * 
 * 
 */
const _construct_from_experimentConditionData_Serialized_Internal = function ({ experimentConditionData_Serialized, searchDataLookupParamsRoot } : { 
    
    experimentConditionData_Serialized, 
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
}) : {
    _conditionData : ConditionData_InternalHolder_Root
    _perSearchData : PerSearchData_InternalHolder_Root
} {

    if ( ! experimentConditionData_Serialized ) {
        return null; // EARLY RETURN
    }

    const mainResultDataArray = experimentConditionData_Serialized.mainResultDataArray;
    
    if ( ( ! mainResultDataArray ) || ( mainResultDataArray.length === 0 ) ) {
        return null; // EARLY RETURN
    }

    const conditions = mainResultDataArray;  //  Root level of conditions

    const conditionData_InternalHolder_PerConditionId_Root_Map_Entry : ConditionData_InternalHolder_PerConditionId_Map_Entry = ( 
        _construct_from_experimentConditionData_Serialized_Internal_Create_subConditionDataMap({ subConditionDataInput : conditions })
    );

    const _conditionData : ConditionData_InternalHolder_Root = { conditionData_InternalHolder_PerConditionId_Root_Map_Entry };
    
    const _perSearchData : PerSearchData_InternalHolder_Root = _construct_from_experimentConditionData_Serialized_Internal_Create_perSearchData({ searchDataLookupParamsRoot });

    return { _conditionData, _perSearchData };
}


/**
 * Internal, Used by function _construct_from_experimentConditionData_Serialized_Internal
 * 
 * Populate Map from parameter
 * 
 * @param searchDataLookupParamsRoot
 * 
 * 
 */
const _construct_from_experimentConditionData_Serialized_Internal_Create_perSearchData = function ({ searchDataLookupParamsRoot } : { 
    
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root 
}) : PerSearchData_InternalHolder_Root {

    const perSearchData_KeyProjectSearchId : Map<number, Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData> = new Map();

    if ( searchDataLookupParamsRoot ) {

        _construct_from_experimentConditionData_Serialized_Internal_Process_searchDataLookupParamsRoot({ searchDataLookupParamsRoot, perSearchData_KeyProjectSearchId });
    }

    const result = new PerSearchData_InternalHolder_Root();
    result.perSearchData_KeyProjectSearchId = perSearchData_KeyProjectSearchId;

    return result;
}

/**
 * Internal, Used by function _construct_from_experimentConditionData_Serialized_Internal_Create_perSearchData
 * 
 * Populate Map from parameter
 * 
 * @param searchDataLookupParamsRoot
 */
const _construct_from_experimentConditionData_Serialized_Internal_Process_searchDataLookupParamsRoot = function ({ searchDataLookupParamsRoot, perSearchData_KeyProjectSearchId } : { 
    
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root 
    perSearchData_KeyProjectSearchId : Map<number, Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData>
}) : void {

    if ( ! searchDataLookupParamsRoot.paramsForProjectSearchIds ) {
        return; // EARLY RETURN
    }

    const paramsForProjectSearchIdsList = searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList;
    if ( ! paramsForProjectSearchIdsList || paramsForProjectSearchIdsList.length === 0 ) {
        return; // EARLY RETURN
    }

    for ( const paramsForProjectSearchId_Entry of paramsForProjectSearchIdsList ) {

        const reportedPeptideFilterData = _construct_from_experimentConditionData_Serialized_Internal_Process_SearchFilter_ForType({ filtersForType_InArray : paramsForProjectSearchId_Entry.reportedPeptideFilters });
        const psmFilterData = _construct_from_experimentConditionData_Serialized_Internal_Process_SearchFilter_ForType({ filtersForType_InArray : paramsForProjectSearchId_Entry.psmFilters });
        const matchedProteinFilters = _construct_from_experimentConditionData_Serialized_Internal_Process_SearchFilter_ForType({ filtersForType_InArray : paramsForProjectSearchId_Entry.matchedProteinFilters });

        const perSearchData = new Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData();

        perSearchData.set_reportedPeptideFilters_PerProjectSearchId( reportedPeptideFilterData );
        perSearchData.set_psmFilters_PerProjectSearchId( psmFilterData );
        perSearchData.set_matchedProteinFilters_PerProjectSearchId( matchedProteinFilters )

        perSearchData.set_psmAnnTypeDisplay_PerProjectSearchId( paramsForProjectSearchId_Entry.psmAnnTypeDisplay );
        perSearchData.set_reportedPeptideAnnTypeDisplay_PerProjectSearchId( paramsForProjectSearchId_Entry.reportedPeptideAnnTypeDisplay );
        perSearchData.set_matchedProteinAnnTypeDisplay_PerProjectSearchId( paramsForProjectSearchId_Entry.matchedProteinAnnTypeDisplay );

        perSearchData_KeyProjectSearchId.set( paramsForProjectSearchId_Entry.projectSearchId, perSearchData );
    }

}

/**
 * Internal, Used by function _construct_from_experimentConditionData_Serialized_Internal_Create_perSearchData
 * 
 * Populate Map from parameter
 * 
 */
const _construct_from_experimentConditionData_Serialized_Internal_Process_SearchFilter_ForType = function ({ filtersForType_InArray } : { 
    
    filtersForType_InArray : Array<SearchDataLookupParams_Filter_Per_AnnotationType>
    
}) : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> {

    if ( ! filtersForType_InArray || filtersForType_InArray.length === 0 ) {
        return undefined;
    }

    const filterDataArray : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = [];

    for ( const entry of filtersForType_InArray ) {
        const resultEntry = new Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data();
        resultEntry.set_annTypeId( entry.annTypeId );
        resultEntry.set_value( entry.value );
        filterDataArray.push( resultEntry );
    }

    return filterDataArray;
}

/**
 * Internal, Used by function _construct_from_experimentConditionData_Serialized_Internal
 * 
 * !!  Opposite of function _getAllData_ConditionGroupCondition_Internal
 * 
 * Populate Map from parameter
 * 
 * @param subConditionDataInput
 * 
 * 
 */
const _construct_from_experimentConditionData_Serialized_Internal_Create_subConditionDataMap = function ({ subConditionDataInput }) : ConditionData_InternalHolder_PerConditionId_Map_Entry {

    if ( ( ! subConditionDataInput ) || ( subConditionDataInput.length === 0 ) ) {
        return undefined;
    }


    // throw Error("_construct_from_experimentConditionData_Serialized_Internal_Create_subConditionDataMap(...) Not Updated")

    
    const subConditionDataMap : Map<number, ConditionData_InternalHolder_PerConditionId_Map_Entry> = new Map();

    for ( const subConditionDataInput_Entry of subConditionDataInput ) {

        if ( subConditionDataInput_Entry.conditionId === undefined || subConditionDataInput_Entry.conditionId === null ) {
            const msg = "_construct_from_experimentConditionData_Serialized_Internal_Create_subConditionDataMap: subConditionDataInput_Entry.conditionId is undefined or null.  subConditionDataInput_Entry: ";
            console.warn( msg, subConditionDataInput_Entry );
            throw Error( msg );
        }

        let resultMapKey = subConditionDataInput_Entry.conditionId;
        let resultEntry : ConditionData_InternalHolder_PerConditionId_Map_Entry = undefined;

        if ( subConditionDataInput_Entry.data !== undefined && subConditionDataInput_Entry.data !== null ) {
            //  Convert 'data'

            const resultData : Experiment_ConditionGroupsDataContainer_DataEntry = { data : undefined };

            const subData = subConditionDataInput_Entry.data.data;
            if ( subData !== undefined && subData !== null ) {
                resultData.data = { projectSearchIds : undefined };
                const projectSearchIds : Array<number> = subData.projectSearchIds;
                if ( projectSearchIds ) {
                    if ( ! ( projectSearchIds instanceof Array ) ) {
                        const msg = "subData.projectSearchIds is not Array"
                        console.warn( msg + ". projectSearchIds: ", projectSearchIds )
                        throw Error( msg )
                    }
                    for ( const projectSearchId of projectSearchIds ) {
                        if ( ! variable_is_type_number_Check( projectSearchId ) ) {
                            const msg = "subData.projectSearchIds entry is not number."
                            console.warn( msg + "  Entry: " + projectSearchId )
                            throw Error( msg )
                        }
                    }
                
                    const projectSearchIdsResult = new Set( projectSearchIds );
                    resultData.data.projectSearchIds = projectSearchIdsResult;
                }
            }

            resultEntry = { conditionId : subConditionDataInput_Entry.conditionId, subConditionDataMap : undefined, data : resultData };

        } else {

            const child_subConditionDataInput = subConditionDataInput_Entry.conditions;
            if ( child_subConditionDataInput && child_subConditionDataInput.length !== 0 ) {
                //  Recursive Call
                const childEntry : ConditionData_InternalHolder_PerConditionId_Map_Entry = ( 
                    _construct_from_experimentConditionData_Serialized_Internal_Create_subConditionDataMap({ subConditionDataInput : child_subConditionDataInput })
                );
                resultEntry  = childEntry;
                resultEntry.conditionId = subConditionDataInput_Entry.conditionId;
            }
        }

        if ( resultEntry ) {

            subConditionDataMap.set( resultMapKey, resultEntry );
        }
    }

    const result = new ConditionData_InternalHolder_PerConditionId_Map_Entry();
    result.subConditionDataMap = subConditionDataMap;

    return result;
}

/**
 * Internal, Used by function delete_data_For_ConditionGroupCondition
 * 
 * Called Recursively
 * 
 * Process All conditionId Submaps
 * 
 * All Data for This conditionId will be deleted
 * 
 * @param conditionId
 * @param conditionDataCurrent - Recursively passed as navigate down the tree of Maps
 * 
 */
const _delete_data_For_ConditionId_ProcessSubMaps = function ({ conditionId, conditionDataCurrent } : {

    conditionId : number
    conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry
}) {

    //  Delete where conditionId
    _delete_data_For_ConditionGroupCondition_conditionDataCurrent ({ conditionId, conditionDataCurrent });

    //  Walk the tree of Maps of Maps

    //   Maps with keys id_Condition
    let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
    if ( subConditionDataMap === undefined ) {
        //  No sub map so skip
        return;  // EARLY RETURN
    }

    for ( const conditionData_InternalHolder_PerConditionId_Map_Entry__MapEntry of subConditionDataMap.entries() ) {

        // const conditionData_InternalHolder_PerConditionId_Map_Entry__MapEntry_Key = conditionData_InternalHolder_PerConditionId_Map_Entry__MapEntry[ 0 ];
        const conditionData_InternalHolder_PerConditionId_Map_Entry_SubMap_Entry = conditionData_InternalHolder_PerConditionId_Map_Entry__MapEntry[ 1 ];

        //  Processing for id_Condition 

        let subConditionDataMap_SubMap_Entry = conditionData_InternalHolder_PerConditionId_Map_Entry_SubMap_Entry.subConditionDataMap;
        if ( subConditionDataMap_SubMap_Entry === undefined ) {
            //  No sub map so skip
            continue;  // EARLY CONTINUE
        }

        for ( const subConditionDataMap_SubMap_Entry_MapEntry of subConditionDataMap_SubMap_Entry.entries() ) {

            const subConditionDataMap_SubMap_MapEntry_Key = subConditionDataMap_SubMap_Entry_MapEntry[ 0 ];
            const conditionDataCurrent_SubMap_MapEntry_Value = subConditionDataMap_SubMap_Entry_MapEntry[ 1 ];

            //  Recursive call to process conditionDataCurrent_SubMap_Entry
            _delete_data_For_ConditionId_ProcessSubMaps ({ 
                conditionId, conditionDataCurrent : conditionDataCurrent_SubMap_MapEntry_Value
            });
        }
    }

}

/**
 * Internal, Used by function _delete_data_For_ConditionGroupCondition_ProcessSubMaps
 * 
 * Delete Data from Map in param conditionDataCurrent using condition id
 * 
 * All Data for This conditionId will be deleted
 * 
 * @param conditionId
 * @param conditionDataCurrent
 * 
 */
const _delete_data_For_ConditionGroupCondition_conditionDataCurrent = function ({ conditionId, conditionDataCurrent } : {

    conditionId : number
    conditionDataCurrent : ConditionData_InternalHolder_PerConditionId_Map_Entry
}) {


    let subConditionDataMap = conditionDataCurrent.subConditionDataMap;
    if ( subConditionDataMap === undefined ) {
        //  No sub map so skip
        return;  // EARLY RETURN
    }

    const valueToDelete = subConditionDataMap.get( conditionId );

    //  Delete the Map Entry, if exists for this key
    subConditionDataMap.delete( conditionId );
    
}


