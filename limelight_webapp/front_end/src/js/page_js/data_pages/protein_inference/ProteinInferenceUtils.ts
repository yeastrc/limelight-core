/**
 *
 */

import {ProteinGroup} from './ProteinGroup';

/**
 *
 */
export class ProteinInferenceUtils {

    /**
     * Given a map of protein ids to peptide ids, return an array of all indistinguishable protein groups, where
     * each protein group contains the proteins identified by exactly the same peptides
     *
     * @param proteinPeptideMap
     */
    public static async getProteinGroups(
        {
            proteinPeptideMap
        }:{
            proteinPeptideMap: Map<number, Set<number|string>>

        }): Promise<Array<ProteinGroup>> {

        const innerMost_Loop_Counter = new INTERNAL__InnerMost_Loop_Counter()

        return _getProteinGroups_Main({ proteinPeptideMap, innerMost_Loop_Counter });
    }

    /**
     * Given a map of protein ids to peptide ids:
     * get all protein groups, where each protein group is designated as either being part of the
     * parsimonious solution for the peptides or not.
     *
     * @param proteinPeptideMap
     */
    public static async getParsimoniousProteinGroupsFromProteinPeptideMap(
        {
            proteinPeptideMap
        }:{
            proteinPeptideMap: Map<number, Set<number|string>>

        }): Promise<Array<ProteinGroup>> {

        const innerMost_Loop_Counter = new INTERNAL__InnerMost_Loop_Counter()

        const proteinGroups_FromMain = await _getProteinGroups_Main({ proteinPeptideMap, innerMost_Loop_Counter })

        return await _getParsimoniousGroupsFromProteinGroupMap({
            proteinGroups: proteinGroups_FromMain, innerMost_Loop_Counter
        });
    }

    /**
     * Given a map of protein ids to peptide ids:
     * get all protein groups, where each protein group is designated as either being a non subset group
     * (passed filter set to true) or not. A non subset protein group is a protein group whose identifying
     * peptides are not wholly contained in the peptide set of another protein group.
     *
     * @param proteinPeptideMap
     */
    public static async getNonSubsetProteinGroupsFromProteinPeptideMap(
        {
            proteinPeptideMap
        }:{
            proteinPeptideMap: Map<number, Set<number|string>>

        }): Promise<Array<ProteinGroup>> {

        const innerMost_Loop_Counter = new INTERNAL__InnerMost_Loop_Counter()

        const proteinGroups_FromMain = await _getProteinGroups_Main({ proteinPeptideMap, innerMost_Loop_Counter })

        return await _getNonSubsetProteinGroupsFromProteinGroupMap({
            proteinGroups: proteinGroups_FromMain, innerMost_Loop_Counter
        });
    }
}

/**
 * Given a map of protein ids to peptide ids, return an array of all indistinguishable protein groups, where
 * each protein group contains the proteins identified by exactly the same peptides
 *
 * @param proteinPeptideMap
 */
const _getProteinGroups_Main = async function (
    {
        proteinPeptideMap, innerMost_Loop_Counter
    }:{
        proteinPeptideMap: Map<number, Set<number|string>>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

    }): Promise<Array<ProteinGroup>> {

    console.log('ENTER _getProteinGroups_Main({ proteinPeptideMap }): proteinPeptideMap.size: ' + proteinPeptideMap.size + ", Now: " + new Date() );

    let total_proteinPeptideMap_ValuesSize = 0

    {
        for ( const proteinPeptideMap_ValueEntry of proteinPeptideMap.values() ) {
            total_proteinPeptideMap_ValuesSize += proteinPeptideMap_ValueEntry.size
        }

        console.log('Just after ENTER: _getProteinGroups_Main({ proteinPeptideMap }): proteinPeptideMap.size: ' + proteinPeptideMap.size + ", total size of all all Map Value Sets: " + total_proteinPeptideMap_ValuesSize + ", Now: " + new Date() );
    }

    const proteinGroupArray_FunctionResult: Array<ProteinGroup> = []

    const proteinPeptideMap_InputParam_AsArray = Array.from( proteinPeptideMap.entries() )

    let proteinPeptideMap_InputParam_AsArray_Index_Start = 0
    let moreToProcess = true

    while ( moreToProcess ) {

        const getProteinGroups_ProcessEachBlock_Result = await _getProteinGroups_ProcessEachBlock( {
            proteinPeptideMap_InputParam_AsArray_Index_Start,
            proteinPeptideMap_InputParam_AsArray,
            innerMost_Loop_Counter,
            proteinGroupArray_FunctionResult
        } )

        moreToProcess = getProteinGroups_ProcessEachBlock_Result.moreToProcess
        proteinPeptideMap_InputParam_AsArray_Index_Start = getProteinGroups_ProcessEachBlock_Result.proteinPeptideMap_InputParam_AsArray_Index_Start_Next
    }

    console.log('EXIT _getProteinGroups_Main({ proteinPeptideMap }): proteinPeptideMap.size: ' + proteinPeptideMap.size + ", total size of all all Map Value Sets: " + total_proteinPeptideMap_ValuesSize + ". Returned proteinGroupArray_FunctionResult.length: " + proteinGroupArray_FunctionResult.length + ", Now: " + new Date() );

    return proteinGroupArray_FunctionResult;
}

/**
 *
 * @param proteinPeptideMap_InputParam_AsArray_Index_Start
 * @param proteinPeptideMap_InputParam_AsArray
 * @param innerMost_Loop_Counter
 * @param proteinGroupArray_FunctionResult
 */
const _getProteinGroups_ProcessEachBlock = async function (
    {
        proteinPeptideMap_InputParam_AsArray_Index_Start, proteinPeptideMap_InputParam_AsArray, innerMost_Loop_Counter, proteinGroupArray_FunctionResult
    } : {
        proteinPeptideMap_InputParam_AsArray_Index_Start: number
        proteinPeptideMap_InputParam_AsArray: [number, Set<string | number>][]
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

        proteinGroupArray_FunctionResult: Array<ProteinGroup>  // UPDATED
    }) :
    Promise<
        {
            moreToProcess: boolean
            proteinPeptideMap_InputParam_AsArray_Index_Start_Next: number
        }> {

    console.log( "ENTER _getProteinGroups_ProcessEachBlock(...): proteinPeptideMap_InputParam_AsArray_Index_Start: " + proteinPeptideMap_InputParam_AsArray_Index_Start + ", proteinPeptideMap_InputParam_AsArray.length: " + proteinPeptideMap_InputParam_AsArray.length )

    for ( let proteinPeptideMap_InputParam_AsArray_Index = proteinPeptideMap_InputParam_AsArray_Index_Start; proteinPeptideMap_InputParam_AsArray_Index < proteinPeptideMap_InputParam_AsArray.length; proteinPeptideMap_InputParam_AsArray_Index++ ) {

        if ( innerMost_Loop_Counter.isTime_For_CheckUI() ) {

            console.log( "EXIT _getProteinGroups_ProcessEachBlock(...): innerMost_Loop_Counter.isTime_For_CheckUI() returned true. proteinPeptideMap_InputParam_AsArray_Index: " + proteinPeptideMap_InputParam_AsArray_Index
                + ", returning { moreToProcess: true, proteinPeptideMap_InputParam_AsArray_Index_Start_Next: proteinPeptideMap_InputParam_AsArray_Index } " )

            return {
                moreToProcess: true,
                proteinPeptideMap_InputParam_AsArray_Index_Start_Next: proteinPeptideMap_InputParam_AsArray_Index
            } //  EARLY RETURN
        }

        const [ proteinId_FromInputParamMap, peptideSet_FromInputParamMap ] = proteinPeptideMap_InputParam_AsArray[ proteinPeptideMap_InputParam_AsArray_Index ]

        let newProteinGroup = true;

        for ( const proteinGroup_InFunctionResult of proteinGroupArray_FunctionResult ) {

            if ( _setsAreEqual( peptideSet_FromInputParamMap, proteinGroup_InFunctionResult.peptides, innerMost_Loop_Counter ) ) {

                proteinGroup_InFunctionResult.addProtein( proteinId_FromInputParamMap );
                newProteinGroup = false;
                break;
            }
        }

        if ( newProteinGroup ) {

            const proteinGroup = new ProteinGroup();
            proteinGroup.addProtein( proteinId_FromInputParamMap );
            proteinGroup.peptides = peptideSet_FromInputParamMap;
            proteinGroup.passesFilter = true;

            proteinGroupArray_FunctionResult.push( proteinGroup );
        }
    }

    console.log( "EXIT _getProteinGroups_ProcessEachBlock(...): Exit at end of function. returning { moreToProcess: false, proteinPeptideMap_InputParam_AsArray_Index_Start_Next: undefined } " )

    return {
        moreToProcess: false,
        proteinPeptideMap_InputParam_AsArray_Index_Start_Next: undefined
    } //  EARLY RETURN
}


/**
 * Given an array of protein groups, return:
 * all protein groups, where each protein group is designated as either being a non subset group
 * (passed filter set to true) or not. A non subset protein group is a protein group whose identifying
 * peptides are not wholly contained in the peptide set of another protein group.
 *
 * @param proteinGroups
 */
const _getNonSubsetProteinGroupsFromProteinGroupMap = async function (
    {
        proteinGroups, innerMost_Loop_Counter
    }:{
        proteinGroups: Array<ProteinGroup>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

    }): Promise<Array<ProteinGroup>> {

    console.log('ENTER _getNonSubsetProteinGroupsFromProteinGroupMap({ proteinGroups }): proteinGroups.length: ' + proteinGroups.length + ", Now: " + new Date() );

    const noSubsetProteinGroups_FunctionResult: Array<ProteinGroup> = []
    const noSubsetCount_Object = { noSubsetCount: 0 }


    let proteinGroups_Index_Start = 0
    let moreToProcess = true

    while ( moreToProcess ) {

        const getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock_Result =
            await _getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock( {
                proteinGroups_Index_Start,
                proteinGroups,
                innerMost_Loop_Counter,
                noSubsetProteinGroups_FunctionResult,
                noSubsetCount_Object
            } )

        moreToProcess = getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock_Result.moreToProcess
        proteinGroups_Index_Start = getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock_Result.proteinGroups_Index_Start_Next
    }

    console.log("Got " + noSubsetCount_Object.noSubsetCount + " groups that passed filter.");

        /* test: compare to parsimonious group */
    // const parsiGroups = _getParsimoniousGroupsFromProteinGroupMap({proteinGroups});
    // for(let i = 0; i < parsiGroups.length; i++) {
    //     const pg = parsiGroups[i];
    //
    //     for( const nsg of noSubsetProteinGroups_FunctionResult) {
    //         if(_setsAreEqual(pg.proteins, nsg.proteins)) {
    //
    //             if (pg.passesFilter !== nsg.passesFilter) {
    //                 console.log('DIFFERENCE DETECTED');
    //                 console.log('parsi group', pg);
    //                 console.log('non subset group', nsg);
    //             }
    //         }
    //     }
    // }

    console.log('EXIT _getNonSubsetProteinGroupsFromProteinGroupMap({ proteinGroups }): proteinGroups.length: ' + proteinGroups.length + ".  Returning noSubsetProteinGroups_FunctionResult. noSubsetProteinGroups_FunctionResult.length: " + noSubsetProteinGroups_FunctionResult.length + ", Now: " + new Date() );

    return noSubsetProteinGroups_FunctionResult;
}

/**
 * Given an array of protein groups, return:
 * all protein groups, where each protein group is designated as either being a non subset group
 * (passed filter set to true) or not. A non subset protein group is a protein group whose identifying
 * peptides are not wholly contained in the peptide set of another protein group.
 *
 * @param proteinGroups
 */
const _getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock = async function (
    {
        proteinGroups_Index_Start, proteinGroups, innerMost_Loop_Counter, noSubsetProteinGroups_FunctionResult, noSubsetCount_Object
    }:{
        proteinGroups_Index_Start: number
        proteinGroups: Array<ProteinGroup>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

        noSubsetProteinGroups_FunctionResult: Array<ProteinGroup>  // Updated
        noSubsetCount_Object : { noSubsetCount: number } // Updated
    }):
    Promise<
    {
        moreToProcess: boolean
        proteinGroups_Index_Start_Next: number
    }>  {


    for ( let proteinGroups_Index = proteinGroups_Index_Start; proteinGroups_Index < proteinGroups.length; proteinGroups_Index++ ) {

        const proteinGroup = proteinGroups[ proteinGroups_Index ]


        if ( innerMost_Loop_Counter.isTime_For_CheckUI() ) {

            console.log( "EXIT _getNonSubsetProteinGroupsFromProteinGroupMap_EachBlock(...): innerMost_Loop_Counter.isTime_For_CheckUI() returned true. proteinGroups_Index: " + proteinGroups_Index
                + ", returning { moreToProcess: true, proteinGroups_Index_Start_Next: proteinGroups_Index } " )

            return {
                moreToProcess: true,
                proteinGroups_Index_Start_Next: proteinGroups_Index
            } //  EARLY RETURN
        }


        const newProteinGroup_passesFilter = ! ( _proteinGroupIsSubset({ proteinGroup, proteinGroups, innerMost_Loop_Counter }) );

        const newProteinGroup = new ProteinGroup();
        newProteinGroup.proteins =  proteinGroup.proteins;
        newProteinGroup.peptides =  proteinGroup.peptides;
        newProteinGroup.passesFilter =  newProteinGroup_passesFilter

        if ( newProteinGroup.passesFilter ) {
            noSubsetCount_Object.noSubsetCount++;
        }

        noSubsetProteinGroups_FunctionResult.push(newProteinGroup)
    }

    return {
        moreToProcess: false,
        proteinGroups_Index_Start_Next: undefined
    }
}

//////////////

/**
 * Determine if the given protein group is a subset of any other protein group. A subset means that its
 * identifying peptides are wholly contained in the identifying peptides of another protein group.
 *
 * @param proteinGroup
 * @param proteinGroups
 */
const _proteinGroupIsSubset =  function (
    {
        proteinGroup, proteinGroups, innerMost_Loop_Counter
    }:{
        proteinGroup: ProteinGroup
        proteinGroups: Array<ProteinGroup>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

    }) : boolean {

    for ( const queryProteinGroup of proteinGroups ) {

        if ( _setsAreEqual( proteinGroup.proteins, queryProteinGroup.proteins, innerMost_Loop_Counter ) ) {
            continue;
        }

        if ( _isSubsetOf({ subset: proteinGroup.peptides, superset:queryProteinGroup.peptides, innerMost_Loop_Counter }) ) {
            return true;
        }
    }

    return false;
}

/**
 *
 * @param proteinGroups
 * @param innerMost_Loop_Counter
 */
const _getParsimoniousGroupsFromProteinGroupMap = async function (
    {
        proteinGroups, innerMost_Loop_Counter
    }:{
        proteinGroups: Array<ProteinGroup>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

    }) : Promise<Array<ProteinGroup>> {

    console.log('ENTER _getParsimoniousGroupsFromProteinGroupMap({ proteinGroups }): proteinGroups.length: ' + proteinGroups.length + ", Now: " + new Date() );

    innerMost_Loop_Counter.isTime_For_CheckUI()

    // sort proteinGroups from largest peptide set to smallest
    proteinGroups.sort( (a, b) => (a.peptides.size === b.peptides.size) ? 0 : (a.peptides.size > b.peptides.size) ? -1 : 1);

    const explainedPeptides: Set<number|string> = new Set();
    const nonParsimoniousGroupIndices: Set<number> = new Set();

    // initialize unexplainedGroupIndices
    for ( let i = 0; i < proteinGroups.length; i++ ) {
        nonParsimoniousGroupIndices.add( i );
    }

    let moreToProcess = true

    while ( moreToProcess ) {

        const getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock_Result = await _getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock( {
            proteinGroups, innerMost_Loop_Counter, explainedPeptides, nonParsimoniousGroupIndices
        } )

        moreToProcess = getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock_Result.moreToProcess
    }

    // go through and mark each protein group as to whether it is in the desired (parsimonious) set or not
    for ( const nonParsimoniousIndex of nonParsimoniousGroupIndices ) {
        proteinGroups[ nonParsimoniousIndex ].passesFilter = false;
    }

    console.log('EXIT _getParsimoniousGroupsFromProteinGroupMap({ proteinGroups }): proteinGroups.length: ' + proteinGroups.length + ". Got " + (proteinGroups.length - nonParsimoniousGroupIndices.size) + " groups that passed filter." + ", Now: " + new Date() );

    return proteinGroups;
}



const _getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock = async function (
    {
         proteinGroups, innerMost_Loop_Counter, explainedPeptides, nonParsimoniousGroupIndices
    } : {
        proteinGroups: Array<ProteinGroup>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

        //  Updated
        explainedPeptides: Set<number|string>
        nonParsimoniousGroupIndices: Set<number>
    }) :
    Promise<
        {
            moreToProcess: boolean
        }> {


    // do the analysis
    let currentGroupIndex = _getProteinIndexExplainingMostPeptides({
        proteinGroups, explainedPeptides, unexplainedGroupIndices: nonParsimoniousGroupIndices, innerMost_Loop_Counter
    });
    while ( currentGroupIndex !== -1 ) {

        const proteinGroup = proteinGroups[currentGroupIndex];

        nonParsimoniousGroupIndices.delete(currentGroupIndex);

        for ( const peptide of proteinGroup.peptides ) {
            explainedPeptides.add( peptide );
        }

        currentGroupIndex = _getProteinIndexExplainingMostPeptides({
            proteinGroups, explainedPeptides, unexplainedGroupIndices: nonParsimoniousGroupIndices, innerMost_Loop_Counter
        });

        if ( innerMost_Loop_Counter.isTime_For_CheckUI() ) {

            console.log( "EXIT _getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock(...): innerMost_Loop_Counter.isTime_For_CheckUI() returned true. returning { moreToProcess: true } " )

            return { moreToProcess: true }  // EARLY RETURN
        }
    }

    console.log( "EXIT _getParsimoniousGroupsFromProteinGroupMap_ProcessEachBlock(...): Exit at end of function. returning { moreToProcess: false } " )

    return { moreToProcess: false }
}






///////////////


/**
 *
 * @param proteinGroups
 * @param explainedPeptides
 * @param unexplainedGroupIndices
 * @param innerMost_Loop_Counter
 */
const _getProteinIndexExplainingMostPeptides =  function (
    {
        proteinGroups,
        explainedPeptides,
        unexplainedGroupIndices,
        innerMost_Loop_Counter
    } : {
        proteinGroups: Array<ProteinGroup>
        explainedPeptides: Set<number|string>
        unexplainedGroupIndices: Set<number>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter
    }) : number {

    let maxPeptideCount:number = 0;
    let currentProteinGroupIndex = -1;

    for ( const i of unexplainedGroupIndices ) {
        let peptideCount = 0;

        for ( const peptide of proteinGroups[i].peptides ) {

            innerMost_Loop_Counter.increment_InnerMost_Loop_Counter()

            if ( ! ( explainedPeptides.has( peptide ) ) ) {
                peptideCount++;
            }
        }

        if ( peptideCount != 0 ) {
            if ( peptideCount > maxPeptideCount ) {
                maxPeptideCount = peptideCount;
                currentProteinGroupIndex = i;
            }
        }
    }

    return currentProteinGroupIndex;
}

const _populateUniquePeptideSet =  function ({ nonSubsetProteinGroups } : { nonSubsetProteinGroups:Array<ProteinGroup> }) {



}

const  _peptideIsUniqueToGroup =  function ({ peptideId, peptideProteinGroup, nonSubsetProteinGroups } : { peptideId:number|string, peptideProteinGroup:ProteinGroup, nonSubsetProteinGroups:Array<ProteinGroup> }) {



}


/**
 * Return true if superset contains every element in subset. False otherwise
 * Note: Always returns true if subset is empty.
 *
 * @param subset
 * @param superset
 * @returns {boolean}
 */
const _isSubsetOf =  function (
    {
        subset, superset, innerMost_Loop_Counter
    }:{
        subset:  Set<number | string>
        superset:  Set<number | string>
        innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter

    }): boolean {

    innerMost_Loop_Counter.increment_InnerMost_Loop_Counter()

    if ( subset.size > superset.size ) {
        return false;
    }

    for ( const elem of subset ) {

        innerMost_Loop_Counter.increment_InnerMost_Loop_Counter()

        if ( ! superset.has( elem ) ) {
            return false;
        }
    }

    return true;
}

/**
 * Return true if both sets contain exactly the same elements, false otherwise
 *
 * @param setA
 * @param setB
 * @returns {boolean}
 */
const _setsAreEqual =  function ( setA: Set<number | string>, setB: Set<number | string>, innerMost_Loop_Counter: INTERNAL__InnerMost_Loop_Counter ):boolean {

    innerMost_Loop_Counter.increment_InnerMost_Loop_Counter()

    if ( setA.size !== setB.size ) {
        return false;
    }

    for ( const a of setA ) {

        innerMost_Loop_Counter.increment_InnerMost_Loop_Counter()

        if ( ! setB.has( a ) ) {
            return false;
        }
    }
    return true;
}


class INTERNAL__InnerMost_Loop_Counter {

    private _innerMost_Loop_Counter_ToNextCheckTime: number = 0
    private _innerMost_Loop_Counter_ToNextElapsedTimeTarget: number = 0

    // private _innerMost_Loop_Counter_NextTarget: number = _INNER_MOST_LOOP_COUNTER__COUNT_FOR_TARGET_ELAPSED_TIME_INITIAL_SETTING

    private _performance_now_InMilliseconds_When_Last_Reset_CounterToZero: number = performance.now()

    constructor() {
    }

    isTime_For_CheckUI() {

        if ( this._innerMost_Loop_Counter_ToNextCheckTime > _INNER_MOST_LOOP_COUNTER__COUNT_CHECK_TIME ) {

            this._innerMost_Loop_Counter_ToNextElapsedTimeTarget += this._innerMost_Loop_Counter_ToNextCheckTime

            this._innerMost_Loop_Counter_ToNextCheckTime = 0

            const performanceNOW = performance.now()

            const timeDifference_Milliseconds = performanceNOW - this._performance_now_InMilliseconds_When_Last_Reset_CounterToZero

            if ( timeDifference_Milliseconds > _INNER_MOST_LOOP_COUNTER__TARGET_ELAPSED_TIME_MILLISECONDS ) {

                //  Time has elapsed more than target time
                console.log( "this._innerMost_Loop_Counter_ToNextElapsedTimeTarget: " + this._innerMost_Loop_Counter_ToNextElapsedTimeTarget + ", timeDifference_Milliseconds: " + timeDifference_Milliseconds + ". NOW: " + new Date() )

                this._innerMost_Loop_Counter_ToNextElapsedTimeTarget = 0
                this._performance_now_InMilliseconds_When_Last_Reset_CounterToZero = performanceNOW

                return true
            }
        }

        return false
    }

    increment_InnerMost_Loop_Counter() {
        this._innerMost_Loop_Counter_ToNextCheckTime++
    }
}


const _INNER_MOST_LOOP_COUNTER__COUNT_CHECK_TIME = 500000


// const _INNER_MOST_LOOP_COUNTER__COUNT_FOR_TARGET_ELAPSED_TIME_INITIAL_SETTING = 1000000

const _INNER_MOST_LOOP_COUNTER__TARGET_ELAPSED_TIME_MILLISECONDS = 3000  // 3 seconds
