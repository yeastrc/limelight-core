/*
 * This class is responsible for being registered with the page central state manager and serializing and
 * deserializing the current state of the data visualization so that it may be saved/recovered from the
 * hash string in the URL
 */

////  Search for:   MAIN CLASS

import {MOD_VIEW_MULTI_SEARCH_DATA_VIZ__CENTRAL_STATE_MANAGER_KEY} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_Root,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";


export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum {
    HEATMAP = "HEATMAP",
    HISTOGRAM = "HISTOGRAM"
}

export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum {
    modListTab = "modListTab",
    zScoreTab = "zScoreTab"
}


export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum {
    counts = "counts",
    ratios = "ratios"
}

export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum {
    psms = "psms",
    scans = "scans"
}

export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum {
    none = "none",
    scaled_mean_diff = "scaled-mean-diff",
    per_mod_zscore = "per-mod-zscore",
    global_zscore = "global-zscore",
    global_pvalue_bonf = "global-pvalue-bonf",
    global_qvalue_bh = "global-qvalue-bh"
}


export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum {
    PVALUE = "PVALUE",
    ZSCORE = "ZSCORE"
}


export enum ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum {
    PROJECT_SEARCH_IDS = "PROJECT_SEARCH_IDS",
    SUB_SEARCH_IDS = "SUB_SEARCH_IDS"
}


export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class {

    static readonly SEPARATE_PLOTS = new ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class( 1 )
    static readonly STACKED_BAR_CHART = new ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class( 2 )
    static readonly ALL_DATA_MERGED_SINGLE_PLOT = new ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class( 3 )

    /**
     * Default
     */
    static readonly DEFAULT = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS

    readonly pageState_EncodingNumber__PageStateEncodingOnly: number

    /**
     *
     * @param pageState_EncodingNumber__PageStateEncodingOnly -- WARNING: MUST be UNIQUE across the values
     * @private
     */
    private constructor(pageState_EncodingNumber__PageStateEncodingOnly: number) {

        this.pageState_EncodingNumber__PageStateEncodingOnly = pageState_EncodingNumber__PageStateEncodingOnly
    }

    private _DO_NOT_CALL(){}  // Dummy so require constructor
}

/////////////////


/**
 *  Selections of Search Groups for ZScore
 */
export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections {

    private static _ENCODING__VERSION_NUMBER_PROPERTY_NAME = 'a'
    private static _ENCODING__VERSION_NUMBER = 1
    private static _ENCODING__GROUP_1_PROPERTY_NAME = 'b'
    private static _ENCODING__GROUP_2_PROPERTY_NAME = 'c'
    private static _ENCODING__NOT_IN_GROUP_PROPERTY_NAME = 'd'
    private static _ENCODING__PROJECT_SEARCH_ID_FOR_SUB_SEARCH_IDS_PROPERTY_NAME = 'e'
    private static _ENCODING__PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_PROPERTY_NAME = 'f'

    private static _PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_ENCODING_KEYS: { [key: string]: any } = {}

    private static _PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_DECODING_KEYS = [
        ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS,
        ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS
    ];


    private _group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()
    private _group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()
    private _searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()

    private _projectSearchId_FOR_SubSearchIds: number

    private _projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum

    private _selectionChanged_Callback: () => void

    // private _initializeComplete_StartCalling_SelectionChanged_Callback = false

    constructor(
        {
            callbackOnChange
        }: {
            callbackOnChange: () => void
        }
    ) {
        this._selectionChanged_Callback = callbackOnChange

        ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS ] = 0
        ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ] = 1
    }

    /**
     *
     */
    get_SearchGroups(): {
        group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: ReadonlySet<number>
        group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: ReadonlySet<number>
        searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: ReadonlySet<number>
        projectSearchId_FOR_SubSearchIds: number
        projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum
    } {
        return {
            group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            projectSearchId_FOR_SubSearchIds: this._projectSearchId_FOR_SubSearchIds,
            projectSearchIds_Or_SubSearchIds_Enum: this._projectSearchIds_Or_SubSearchIds_Enum
        }
    }

    /**
     *
     * @param group_1_SearchGroup_ProjectSearchIds_Set
     * @param group_2_SearchGroup_ProjectSearchIds_Set
     * @param searches_NOT_InAnyGroup_ProjectSearchIds_Set
     */
    set_SearchGroups(
        {
            group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            projectSearchId_FOR_SubSearchIds,
            projectSearchIds_Or_SubSearchIds_Enum
        } : {
            group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number>
            group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number>
            searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number>
            projectSearchId_FOR_SubSearchIds: number
            projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum
        }) : void {

        if ( group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {
            this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )
        } else  {
            this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
        }

        if ( group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {
            this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )
        } else  {
            this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
        }

        if ( searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {
            this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set )
        } else  {
            this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
        }

        this._projectSearchId_FOR_SubSearchIds = projectSearchId_FOR_SubSearchIds

        this._projectSearchIds_Or_SubSearchIds_Enum = projectSearchIds_Or_SubSearchIds_Enum

        this._selectionChanged_Callback()
    }

    /**
     *
     * @param encodedStateData
     */
    INTERNAL_ONLY__decode_EncodedSelection(
        {
            encodedStateData,
            projectSearchIds_MainPage
        } : {
            encodedStateData: any
            projectSearchIds_MainPage: Array<number>
        }) {

        if ( ! encodedStateData ) {
            return
        }

        if ( encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER_PROPERTY_NAME ] !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER ) {

            const msg = "Version Number is NOT expected value.  Expected value: " +
                ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER +
                ". value in encodedStateData: " +
                encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER_PROPERTY_NAME ]
            console.warn(msg)
            throw Error(msg)
        }

        {
            const encoded_Group = encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__GROUP_1_PROPERTY_NAME ]
            if ( encoded_Group ) {
                this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( encoded_Group )
            } else {
                this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
            }
        }
        {
            const encoded_Group = encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__GROUP_2_PROPERTY_NAME ]
            if ( encoded_Group ) {
                this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( encoded_Group )
            } else {
                this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
            }
        }
        {
            const encoded_Group = encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__NOT_IN_GROUP_PROPERTY_NAME ]
            if ( encoded_Group ) {
                this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set( encoded_Group )
            } else {
                this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
            }
        }
        {
            const encoded_Group = encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__PROJECT_SEARCH_ID_FOR_SUB_SEARCH_IDS_PROPERTY_NAME ]
            if ( encoded_Group ) {
                this._projectSearchId_FOR_SubSearchIds = encoded_Group
            }
        }

        {
            const encodedValue = encodedStateData[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_PROPERTY_NAME ]
            if ( encodedValue !== undefined ) {

                const value = ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_DECODING_KEYS[ encodedValue ]
                if ( value === undefined ) {
                    const msg = "ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_DECODING_KEYS[ encodedValue ] returned undefined for encodedValue: " + encodedValue
                    console.warn(msg)
                    throw Error(msg)
                }
                this._projectSearchIds_Or_SubSearchIds_Enum = value
            } else {

                if ( this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0
                    || this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0
                    || this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0 ) {

                    //  Set to default
                    this._projectSearchIds_Or_SubSearchIds_Enum = ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.PROJECT_SEARCH_IDS
                }
            }
        }

        this._purge_NotIn_projectSearchIds_MainPage__On_DecodeFromURL({ projectSearchIds_MainPage })
    }

    private _purge_NotIn_projectSearchIds_MainPage__On_DecodeFromURL(
        {
            projectSearchIds_MainPage
        } : {
            projectSearchIds_MainPage: Array<number>
        }) {

        if ( this._projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            //  Sub Searches

            let purgeSubSearchIds = false

            if ( projectSearchIds_MainPage.length === 1 ) {

                const projectSearchId = projectSearchIds_MainPage[ 0 ]

                if ( this._projectSearchId_FOR_SubSearchIds !== projectSearchId ) {
                    //  projectSearchId changed so purge selection
                    purgeSubSearchIds = true
                }
            } else {
                //  > 1 projectSearchIds so change from sub searches to multiple searches so purge selection
                purgeSubSearchIds = true
            }

            if ( purgeSubSearchIds ) {

                this._projectSearchIds_Or_SubSearchIds_Enum = undefined

                this._projectSearchId_FOR_SubSearchIds = undefined

                this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
                this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
                this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
            }

        } else {

            //  NOT Search Sub Groups

            if ( projectSearchIds_MainPage.length === 1 ) {

                //  ONLY have 1 search so reset everything

                this._projectSearchIds_Or_SubSearchIds_Enum = undefined

                this._projectSearchId_FOR_SubSearchIds = undefined

                this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
                this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()
                this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set = new Set()

            } else {

                //  > 1 search so purge projectSearchIds NOT IN projectSearchIds_MainPage

                const projectSearchIds_MainPage_Set = new Set( projectSearchIds_MainPage )

                if ( this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {

                    const group_ProjectSearchIds_Copy = Array.from( this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )
                    for ( const projectSearchId of group_ProjectSearchIds_Copy ) {
                        if ( ! projectSearchIds_MainPage_Set.has( projectSearchId ) ) {
                            this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.delete( projectSearchId )
                        }
                    }
                }

                if ( this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {

                    const group_ProjectSearchIds_Copy = Array.from( this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )
                    for ( const projectSearchId of group_ProjectSearchIds_Copy ) {
                        if ( ! projectSearchIds_MainPage_Set.has( projectSearchId ) ) {
                            this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.delete( projectSearchId )
                        }
                    }
                }

                if ( this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set ) {

                    const group_ProjectSearchIds_Copy = Array.from( this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set )
                    for ( const projectSearchId of group_ProjectSearchIds_Copy ) {
                        if ( ! projectSearchIds_MainPage_Set.has( projectSearchId ) ) {
                            this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.delete( projectSearchId )
                        }
                    }
                }
            }
        }
    }

    /**
     *
     */
    INTERNAL_ONLY__getEncodedSelection() : object {

        const result: { [key: string]: any } = {}

        if ( this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set && this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0 ) {

            const result_ProjectSearchIds = Array.from( this._group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )

            result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__GROUP_1_PROPERTY_NAME ] = result_ProjectSearchIds
        }

        if ( this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set && this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0 ) {

            const result_ProjectSearchIds = Array.from( this._group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )

            result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__GROUP_2_PROPERTY_NAME ] = result_ProjectSearchIds
        }

        if ( this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set && this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.size > 0 ) {

            const result_ProjectSearchIds = Array.from( this._searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set )

            result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__NOT_IN_GROUP_PROPERTY_NAME ] = result_ProjectSearchIds
        }

        if ( this._projectSearchId_FOR_SubSearchIds ) {

            result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__PROJECT_SEARCH_ID_FOR_SUB_SEARCH_IDS_PROPERTY_NAME ] = this._projectSearchId_FOR_SubSearchIds
        }

        if ( this._projectSearchIds_Or_SubSearchIds_Enum !== undefined ) {

            const encodedValue = ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_ENCODING_KEYS[ this._projectSearchIds_Or_SubSearchIds_Enum ]
            if ( encodedValue === undefined ) {
                const msg = "ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_ENCODING_KEYS[ this._projectSearchIds_Or_SubSearchIds_Enum ] returned undefined for this._projectSearchIds_Or_SubSearchIds_Enum: " + this._projectSearchIds_Or_SubSearchIds_Enum
                console.warn( msg )
                throw Error( msg )
            }
            result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__PROJECT_SEARCH_IDS_SUB_SEARCH_IDS_ENUM_PROPERTY_NAME ] = encodedValue
        }

        if ( Object.keys( result ).length === 0 ) {

            return undefined
        }

        result[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER_PROPERTY_NAME ] = ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections._ENCODING__VERSION_NUMBER

        return result
    }
}


////////////////

/**
 *
 */
export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch {

    selectionRanges: Array<ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch_RangeEntry>
}

/**
 *
 */
export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch_RangeEntry {

    /**
     * rangeStart is inclusive of the range
     */
    rangeStart: number

    /**
     * rangeEnd is inclusive of the range
     */
    rangeEnd: number
}

/**
 *  Selections of Mod Masses and/or ProjectSearchIds in the <svg> graphic
 */
export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections {

    private _selected_ModMasses_Set_Map_Key_ProjectSearchId: Map<number, Set<number>> = new Map()
    private _selectionChanged_Callback: () => void

    private _initializeComplete_StartCalling_SelectionChanged_Callback = false

    constructor(
        {
            callbackOnChange
        } : {
            callbackOnChange: () => void
        }
    ) {
        this._selectionChanged_Callback = callbackOnChange
    }

    clear_All() {
        this._selected_ModMasses_Set_Map_Key_ProjectSearchId.clear()

        this._call_Callback_For_Change()
    }

    is_AnySelections() {
        if ( this._selected_ModMasses_Set_Map_Key_ProjectSearchId.size === 0 ) {
            return false
        }
        for ( const mapValue of this._selected_ModMasses_Set_Map_Key_ProjectSearchId.values() ) {
            if ( mapValue.size > 0 ) {
                return true
            }
        }
        return false
    }

    /**
     * Replaces saved selectedModMasses Set for projectSearchId
     * @param selectedModMasses
     * @param projectSearchId
     */
    set_SelectedModMasses_Set_For_ProjectSearchId(
        {
            selectedModMasses_Set, projectSearchId
        } : {
            selectedModMasses_Set: Set<number>
            projectSearchId: number
        }
    ) : void {
        if ( ( ! selectedModMasses_Set ) || selectedModMasses_Set.size === 0 ) {

            this._selected_ModMasses_Set_Map_Key_ProjectSearchId.delete( projectSearchId )
        } else {

            const selectedModMasses_Set_COPY = new Set( selectedModMasses_Set )
            this._selected_ModMasses_Set_Map_Key_ProjectSearchId.set( projectSearchId, selectedModMasses_Set_COPY )
        }

        this._call_Callback_For_Change()
    }

    /**
     * Get selectedModMasses Set for projectSearchId
     * @param projectSearchId
     */
    get_SelectedModMasses_Set_For_ProjectSearchId( projectSearchId: number ) : ReadonlySet<number> {

        return this._selected_ModMasses_Set_Map_Key_ProjectSearchId.get( projectSearchId )
    }

    /**
     *
     * @param projectSearchId
     * @returns undefined if NO selections for projectSearchId
     *
     * returned rangeStart and rangeEnd are INCLUSIVE of the range
     */
    get_SelectedModMassRanges_ForSingleSearch( projectSearchId: number ) : ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch {

        const selected_ModMasses_Set = this._selected_ModMasses_Set_Map_Key_ProjectSearchId.get( projectSearchId )

        if ( ( ! selected_ModMasses_Set ) || selected_ModMasses_Set.size == 0 ) {
            return undefined
        }

        const result: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch = {
            selectionRanges: []
        }

        const selected_ModMass_Values_Array = Array.from( selected_ModMasses_Set )

        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( selected_ModMass_Values_Array )

        let rangeStart: number, rangeEnd: number;

        for ( let i = 0; i < selected_ModMass_Values_Array.length; i++ ) {
            rangeStart = selected_ModMass_Values_Array[i];
            rangeEnd = rangeStart;
            while ( selected_ModMass_Values_Array[i + 1] - selected_ModMass_Values_Array[i] === 1 ) {
                rangeEnd = selected_ModMass_Values_Array[i + 1]; // increment the index if the numbers sequential
                i++;
            }

            const range = { rangeStart, rangeEnd };
            result.selectionRanges.push(range)
        }

        return result
    }


    get_Selection_ProjectSearchIds() {
        return this._selected_ModMasses_Set_Map_Key_ProjectSearchId.keys()
    }
    get_Selection_ProjectSearchIdsCount() {
        return this._selected_ModMasses_Set_Map_Key_ProjectSearchId.size
    }


    delete_For_ProjectSearchId( projectSearchId: number ) : void {
        this._selected_ModMasses_Set_Map_Key_ProjectSearchId.delete( projectSearchId )

        this._call_Callback_For_Change()
    }

    private _call_Callback_For_Change() {
        if ( this._initializeComplete_StartCalling_SelectionChanged_Callback && this._selectionChanged_Callback ) {
            this._selectionChanged_Callback()
        }
    }

    /**
     * ONLY for use by parent class
     * @param callback
     */
    internal_USEONLY__Set_initializeComplete_StartCalling_SelectionChanged_Callback_TRUE() {
        this._initializeComplete_StartCalling_SelectionChanged_Callback = true
    }

    /**
     * Selections in the <svg> graphic showing the Mods for the searches
     */
    INTERNAL_ONLY__decode_EncodedSelectedRects(encodedSelectedRects: any): void {

        for ( const projectSearchId_String of Object.keys(encodedSelectedRects)) {

            const selectedModMasses_Set: Set<number> = new Set()

            const ranges_For_ProjectSearchId_Array = encodedSelectedRects[projectSearchId_String]

            if ( ! ( ranges_For_ProjectSearchId_Array instanceof Array ) ) {
                throw Error("if ( ! ( ranges_For_ProjectSearchId_Array instanceof Array ) ) {")
            }

            for ( const range of ranges_For_ProjectSearchId_Array) {

                const rangeStart_InclusiveOfRange = range[0]

                //  Exclusive of range since that is the existing coding of what is put in the URL
                const rangeEnd_ExclusiveOfRange = range[1]

                for ( let i = rangeStart_InclusiveOfRange; i < rangeEnd_ExclusiveOfRange; i++) {
                    selectedModMasses_Set.add(i);
                }
            }

            const projectSearchId_Number = Number.parseInt( projectSearchId_String )

            this.set_SelectedModMasses_Set_For_ProjectSearchId({ projectSearchId: projectSearchId_Number, selectedModMasses_Set })
        }
    }

    /**
     * Return the ranges of selected mods for each project search id, where for each project search id the
     * ranges are stored as:
     * project search id=> [
     *                      [start, end], [start, end], ...
     *                     ]
     * where start is included and end is excluded
     * @param selectedVizOptions
     */
    INTERNAL_ONLY__getEncodedSelectedRects() {

        if ( ! this._is_Any_Data_For_Encoding() ) {
            return undefined
        }

        let encodedData: any = { };

        for ( const projectSearchId of this._selected_ModMasses_Set_Map_Key_ProjectSearchId.keys() ) {
            const ranges = this._get_SelectedModMassRanges_ForSingleSearch_ForEncoding(projectSearchId);
            encodedData[projectSearchId] = ranges;
        }

        if ( Object.keys( encodedData ).length === 0 ) {
            return undefined
        }

        return encodedData;
    }

    /**
     * Return the ranges in the ordered array of integers as an array of 2-element arrays where
     * the element of the 2-element arrays are the start and end of the ranges where the start
     * is inclusive and the end is exclusive.
     *
     * E.g., getRanges([1,2,3,4,5,6,7,8,9,10,11,12,13,14,21,22,55]) would return:
     * [ [1,15], [21,23], [55,56] ]
     *
     * @param intArray
     */
    private _get_SelectedModMassRanges_ForSingleSearch_ForEncoding( projectSearchId: number ) {

        const ranges_ForEncoding_Output: Array<Array<number>> = []

        const ranges_Result = this.get_SelectedModMassRanges_ForSingleSearch( projectSearchId )
        if ( ! ranges_Result ) {
            return ranges_ForEncoding_Output
        }

        for ( const range of ranges_Result.selectionRanges ) {

            const rangeStart_InclusiveOfRange = range.rangeStart

            //  Exclusive of range since that is the existing coding of what is put in the URL
            const rangeEnd_ExclusiveOfRange = range.rangeEnd + 1

            const range_ForEncoding_Output = [ rangeStart_InclusiveOfRange, rangeEnd_ExclusiveOfRange ]
            ranges_ForEncoding_Output.push(range_ForEncoding_Output)
        }

        return ranges_ForEncoding_Output;
    }

    private _is_Any_Data_For_Encoding() : boolean {
        if ( this._selected_ModMasses_Set_Map_Key_ProjectSearchId.size === 0 ) {
            return false
        }
        for ( const value of this._selected_ModMasses_Set_Map_Key_ProjectSearchId.values() ) {
            if ( value.size > 0 ) {
                return true
            }
        }
        return false
    }

}




// definitions used for saving state to URL
const _COMPONENT_UNIQUE_ID = MOD_VIEW_MULTI_SEARCH_DATA_VIZ__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;
const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'v';

const _SAVE_STATE_KEYS = {
    'QUANT_TYPE': 'a',
    SIGNIFICANCE_METRIC_CHART_TYPE: 'b',
    'COLOR_MAX_CUTOFF_COUNT': 'c',
    'DISPLAY_TAB': 'd',
    VISUALIZATION_DISPLAY_TAB: 'e',
    zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData: 'f',
    searchGroups_For_ZScore_Selections: 'g',
    histogram_ChartType_Enum_Class: 'h',
    show_inverse_RangeDirection_Plot_2_WhenTwoPlots: 'i',
    display_Mean_StandardDeviation_Line_And_Number: 'j',
    show_DifferenceChart_WhenTwoPlots: 'k',
    MOD_MASS_MIN_CUTOFF__ROUNDED_MASS_FOR_HEATMAP: 'n',
    MOD_MASS_MIN_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM: 'o',
    PROJECT_SEARCH_IDS: 'p',
    'PSM_QUANT_METHOD': 'q',
    'COLOR_MAX_CUTOFF_RATIO': 'r',
    'SELECTED_RECTS': 's',
    'DATA_TRANSFORMATION' : 't',
    psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: 'u',
    MOD_MASS_MAX_CUTOFF__ROUNDED_MASS_FOR_HEATMAP: 'x',
    MOD_MASS_MAX_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM: 'y',
    'PROTEIN_POSITION_FILTER' : 'pp',
    'EXCLUDE_UNLOCALIZED_MODS' : 'xu',
} as const


////////

const _VISUALIZATION_DISPLAY_TAB_ENCODING_KEYS: { [key: string]: any } = {}

_VISUALIZATION_DISPLAY_TAB_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP ] = 0
_VISUALIZATION_DISPLAY_TAB_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM ] = 1

const _VISUALIZATION_DISPLAY_TAB_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HISTOGRAM
]

/////

const _DISPLAY_TAB_ENCODING_KEYS: { [key: string]: any } = {}

_DISPLAY_TAB_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab ] = 0
_DISPLAY_TAB_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab ] = 1

const _DISPLAY_TAB_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.zScoreTab
]

/////

const _PSM_QUANT_METHOD_ENCODING_KEYS: { [key: string]: any } = {}

_PSM_QUANT_METHOD_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ] = 0
_PSM_QUANT_METHOD_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ] = 1

const _PSM_QUANT_METHOD_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios
]

const _QUANT_TYPE_ENCODING_KEYS: { [key: string]: any } = {}

_QUANT_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ] = 0
_QUANT_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ] = 1

const _QUANT_TYPE_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans
]

const _DATA_TRANSFORMATION_ENCODING_KEYS: { [key: string]: any } = {}

_DATA_TRANSFORMATION_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff ] = 0
_DATA_TRANSFORMATION_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore ] = 1
_DATA_TRANSFORMATION_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore ] = 2
_DATA_TRANSFORMATION_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf ] = 3
_DATA_TRANSFORMATION_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh ] = 4

const _DATA_TRANSFORMATION_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh
];

////


const _SIGNIFICANCE_METRIC_CHART_TYPE_ENCODING_KEYS: { [key: string]: any } = {}

_SIGNIFICANCE_METRIC_CHART_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE ] = 0
_SIGNIFICANCE_METRIC_CHART_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE ] = 1

const _SIGNIFICANCE_METRIC_CHART_TYPE_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE
];


//////////////////////
//////////////////////

//   MAIN CLASS  !!!!!

//////

export class ModViewPage_DataVizOptions_VizSelections_PageStateManager {

    private _updateState_ForChange_BindThis = this._updateState_ForChange.bind(this)

    private _centralPageStateManager : CentralPageStateManager

    private _storedState: {

        projectSearchIds_OrderOverride_Deprecated : Array<number>  //  Deprecated override of ProjectSearchId order where user changed search order in Mod Page graphic which is no longer supported

        visualization_DisplayTab: ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum

        displayTab : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum

        quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum

        /**
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        psmQuant_WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum
        /**
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: boolean  //  true means to use result of filters in 'Click to Show Filters and Options' for Denominator for Ratios calculations

        /**
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        dataTransformation_For__WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum

        /**
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number
        /**
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number

        /**
         * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
         *
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number
        /**
         * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
         *
         * Ignore when visualization_DisplayTab is HISTOGRAM
         */
        modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number


        /**
         * Cutoff based on Actual Mod Mass:
         *
         * Ignore when visualization_DisplayTab is HEATMAP
         */
        modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : number
        /**
         * Cutoff based on Actual Mod Mass:
         *
         * Ignore when visualization_DisplayTab is HEATMAP
         */
        modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : number


        excludeUnlocalizedOpenMods : boolean

        modMasses_ProjectSearchIds_Visualization_Selections_Root: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections

        searchGroups_For_ZScore_Selections: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections

        zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData : boolean

        significance_metric_chart_type : ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum

        histogram_ChartType_Enum_Class : ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class

        show_inverse_RangeDirection_Plot_2_WhenTwoPlots: boolean

        display_Mean_StandardDeviation_Line_And_Number: boolean

        show_DifferenceChart_WhenTwoPlots: boolean
    }

    private _projectSearchIds_WereLoadedFromStateInURL = false

    private _initialize_Completed = false

    constructor({centralPageStateManager} : {

        centralPageStateManager : CentralPageStateManager
    }) {
        if (centralPageStateManager) {
            this._centralPageStateManager = centralPageStateManager;
            this._centralPageStateManager.unregister({componentUniqueId: this.getUniqueId()});
            this._centralPageStateManager.register({component: this});
        }

        this._create_Or_Reset_StoredState()
    }

    private _create_Or_Reset_StoredState() {

        this._storedState = {
            projectSearchIds_OrderOverride_Deprecated : undefined,  //  Deprecated override of ProjectSearchId order where user changed search order in Mod Page graphic (which user can no longer do)

            visualization_DisplayTab: ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP,  //  Default HEATMAP
            displayTab: ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum.modListTab,   // DEFAULT modListTab
            quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms,          // DEFAULT psms
            psmQuant_WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts,   // DEFAULT counts
            psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: undefined,
            dataTransformation_For__WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none, // DEFAULT none
            colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : undefined,
            colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : undefined,
            modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : undefined,
            modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : undefined,
            modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : undefined,
            modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : undefined,
            excludeUnlocalizedOpenMods : false,  //  DEFAULT false
            modMasses_ProjectSearchIds_Visualization_Selections_Root:
                new ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections({ callbackOnChange: this._updateState_ForChange_BindThis }),
            searchGroups_For_ZScore_Selections:
                new ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections({ callbackOnChange: this._updateState_ForChange_BindThis }),
            zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData: false,  //  DEFAULT false
            significance_metric_chart_type : ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE, // DEFAULT ZSCORE
            histogram_ChartType_Enum_Class : ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.DEFAULT,
            show_inverse_RangeDirection_Plot_2_WhenTwoPlots: true,  // Default to true
            display_Mean_StandardDeviation_Line_And_Number: false,   // Default to false
            show_DifferenceChart_WhenTwoPlots: false,   // Default to false
        }

        var z = 0
    }

    private _updateState_ForChange() {

        if ( this._centralPageStateManager && this._initialize_Completed ) {

            this._centralPageStateManager.setState( { component: this } );
        }
    }


    /**
     * Called by Central State Manager and maybe other code
     */
    getUniqueId() {
        return _COMPONENT_UNIQUE_ID;
    }

    get_projectSearchIds_OrderOverride_Deprecated() {

        return this._storedState.projectSearchIds_OrderOverride_Deprecated
    }

    clear_projectSearchIds_OrderOverride_Deprecated() {

        if ( this._storedState.projectSearchIds_OrderOverride_Deprecated !== undefined ) {

            this._storedState.projectSearchIds_OrderOverride_Deprecated = undefined

            this._updateState_ForChange()
        }
    }

    get_visualization_DisplayTab() {

        return this._storedState.visualization_DisplayTab
    }

    set_visualization_DisplayTab( visualization_DisplayTab : ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum ) {

        this._storedState.visualization_DisplayTab = visualization_DisplayTab

        this._updateState_ForChange()
    }

    get_displayTab() {

        return this._storedState.displayTab
    }

    set_displayTab( displayTab : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DISPLAY_TAB_Values_Enum ) {

        this._storedState.displayTab = displayTab

        this._updateState_ForChange()
    }

    get_quantType() {

        return this._storedState.quantType
    }

    set_quantType( quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum ) {

        this._storedState.quantType = quantType

        this._updateState_ForChange()
    }

    /**
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_psmQuant_WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.psmQuant_WhenDisplay_HEATMAP_ONLY
    }

    set_psmQuant_WhenDisplay_HEATMAP_ONLY( psmQuant_WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum ) {

        this._storedState.psmQuant_WhenDisplay_HEATMAP_ONLY = psmQuant_WhenDisplay_HEATMAP_ONLY

        this._updateState_ForChange()
    }

    /**
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() {

        return this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator
    }

    set_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator( psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: boolean ) {

        if ( psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator ) {
            this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator = true
        } else {
            this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator = undefined
        }

        this._updateState_ForChange()
    }

    /**
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY
    }

    set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( dataTransformation_For__WhenDisplay_HEATMAP_ONLY : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum ) {

        this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY = dataTransformation_For__WhenDisplay_HEATMAP_ONLY

        this._updateState_ForChange()
    }

    /**
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY
    }

    set_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number ) {

        this._storedState.colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY

        this._updateState_ForChange()
    }

    get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY
    }

    set_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number ) {

        this._storedState.colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY

        this._updateState_ForChange()
    }

    ////////////

    /**
     * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
     *
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY
    }

    /**
     * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
     */
    set_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( modMassCutoffMin_For_ROUNDED_ModMass : number ) {

        this._storedState.modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = modMassCutoffMin_For_ROUNDED_ModMass

        this._updateState_ForChange()
    }

    /**
     * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
     *
     * Ignore when visualization_DisplayTab is HISTOGRAM
     */
    get_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() {

        return this._storedState.modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY
    }

    /**
     * Cutoff based on ROUNDED Mod Mass:   const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( mod mass )
     */
    set_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY : number ) {

        this._storedState.modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY

        this._updateState_ForChange()
    }

    /**
     * Cutoff based on Actual Mod Mass:
     *
     * Ignore when visualization_DisplayTab is HEATMAP
     */
    get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() {

        return this._storedState.modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
    }

    /**
     * Cutoff based on Actual Mod Mass:
     */
    set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : number ) {

        this._storedState.modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY

        this._updateState_ForChange()
    }

    /**
     * Cutoff based on Actual Mod Mass:
     *
     * Ignore when visualization_DisplayTab is HEATMAP
     */
    get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() {

        return this._storedState.modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY
    }

    /**
     * Cutoff based on Actual Mod Mass:
     */
    set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY : number ) {

        this._storedState.modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY

        this._updateState_ForChange()
    }


    get_excludeUnlocalizedOpenMods() {

        return this._storedState.excludeUnlocalizedOpenMods
    }

    set_excludeUnlocalizedOpenMods( excludeUnlocalizedOpenMods : boolean ) {

        this._storedState.excludeUnlocalizedOpenMods = excludeUnlocalizedOpenMods

        this._updateState_ForChange()
    }


    get_modMasses_ProjectSearchIds_Visualization_Selections_Root() {

        return this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root
    }

    // set_modMasses_ProjectSearchIds_Visualization_Selections_Root( modMasses_ProjectSearchIds_Visualization_Selections_Root: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections ) {
    //
    //     this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root = modMasses_ProjectSearchIds_Visualization_Selections_Root
    //
    //     this._updateState_ForChange()
    // }

    get_searchGroups_For_ZScore_Selections() {

        return this._storedState.searchGroups_For_ZScore_Selections
    }

    // set_searchGroups_For_ZScore_Selections( searchGroups_For_ZScore_Selections: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections ) {
    //
    //     this._storedState.searchGroups_For_ZScore_Selections = ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections
    //
    //     this._updateState_ForChange()
    // }


    get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() {

        return this._storedState.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData
    }

    set_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData( zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData : boolean ) {

        this._storedState.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData = zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData

        this._updateState_ForChange()
    }

    get_significance_metric_chart_type() {

        return this._storedState.significance_metric_chart_type
    }

    set_significance_metric_chart_type( significance_metric_chart_type : ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum ) {

        this._storedState.significance_metric_chart_type = significance_metric_chart_type

        this._updateState_ForChange()
    }

    get_histogram_ChartType_Enum_Class() {

        return this._storedState.histogram_ChartType_Enum_Class
    }

    set_histogram_ChartType_Enum_Class( histogram_ChartType_Enum_Class : ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class ) {

        this._storedState.histogram_ChartType_Enum_Class = histogram_ChartType_Enum_Class

        this._updateState_ForChange()
    }

    get_show_inverse_RangeDirection_Plot_2_WhenTwoPlots() {

        return this._storedState.show_inverse_RangeDirection_Plot_2_WhenTwoPlots
    }

    set_show_inverse_RangeDirection_Plot_2_WhenTwoPlots( show_inverse_RangeDirection_Plot_2_WhenTwoPlots : boolean ) {

        this._storedState.show_inverse_RangeDirection_Plot_2_WhenTwoPlots = show_inverse_RangeDirection_Plot_2_WhenTwoPlots

        this._updateState_ForChange()
    }

    get_display_Mean_StandardDeviation_Line_And_Number() {

        return this._storedState.display_Mean_StandardDeviation_Line_And_Number
    }

    set_display_Mean_StandardDeviation_Line_And_Number( display_Mean_StandardDeviation_Line_And_Number : boolean ) {

        this._storedState.display_Mean_StandardDeviation_Line_And_Number = display_Mean_StandardDeviation_Line_And_Number

        this._updateState_ForChange()
    }

    get_show_DifferenceChart_WhenTwoPlots() {

        return this._storedState.show_DifferenceChart_WhenTwoPlots
    }

    set_show_DifferenceChart_WhenTwoPlots( show_DifferenceChart_WhenTwoPlots : boolean ) {

        this._storedState.show_DifferenceChart_WhenTwoPlots = show_DifferenceChart_WhenTwoPlots

        this._updateState_ForChange()
    }


    /**
     * take in deserialized json that represents an optimized view of the data and save it as a working view of the data
     *
     * @param initParams
     */
    initialize(

        initParams:
            {
                optional_encodedStateData?: any
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject: ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
                projectSearchIds_MainPage: Array<number>
            }) {

        if ( ( ! initParams ) || ( ! initParams.projectSearchIds_MainPage ) ) {
            const msg = "( ( ! initParams ) || ( ! initParams.projectSearchIds_MainPage ) )"
            console.warn(msg)
            throw Error(msg)
        }

        // console.log('called initialize()');

        let updateURL_WithUpdatedValues = false

        let encodedStateData: any = undefined;
        if ( initParams && initParams.optional_encodedStateData ) {
            encodedStateData = initParams.optional_encodedStateData;
        }
        if ( ! encodedStateData ) {
            encodedStateData = this._centralPageStateManager.getEncodedData({ component: this });
        }

        if ( encodedStateData ) {

            //   TODO  Commented out code is ONLY for TESTING (setting encodedStateData[ _SAVE_STATE_KEYS.PROJECT_SEARCH_IDS ])

            // var doSet = false
            //
            // var zz = 0
            //
            // if ( doSet ) {
            //     encodedStateData[ _SAVE_STATE_KEYS.PROJECT_SEARCH_IDS ] = Array.from( initParams.projectSearchIds_MainPage ).reverse()
            // }

            const encodedDataKeys = Object.keys(encodedStateData);

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS)) {
                const projectSearchIds_OrderOverride_Deprecated_LOCAL: Array<number> = encodedStateData[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS];

                if ( projectSearchIds_OrderOverride_Deprecated_LOCAL && initParams && initParams.projectSearchIds_MainPage ) {

                    let keep_projectSearchIds_OrderOverride_Deprecated = false

                    if ( initParams.projectSearchIds_MainPage.length !== projectSearchIds_OrderOverride_Deprecated_LOCAL.length ) {
                        keep_projectSearchIds_OrderOverride_Deprecated = false
                    } else {

                        let projectSearchIds_SameContents_SameOrder = true

                        //  Compare each array element for same order
                        for ( let index = 0; index < projectSearchIds_OrderOverride_Deprecated_LOCAL.length; index ++ ) {

                            if ( projectSearchIds_OrderOverride_Deprecated_LOCAL[ index ] != initParams.projectSearchIds_MainPage[ index ] ) {
                                projectSearchIds_SameContents_SameOrder = false
                                break
                            }
                        }

                        if ( ! projectSearchIds_SameContents_SameOrder ) {
                            // Validate is same Contents

                            let projectSearchIds_SameContents = true

                            const projectSearchIds_MainPage_Set = new Set( initParams.projectSearchIds_MainPage )
                            const projectSearchIds_OrderOverride_Deprecated_LOCAL_Set = new Set( projectSearchIds_OrderOverride_Deprecated_LOCAL )

                            for ( const projectSearchIds_MainPage_Entry of projectSearchIds_MainPage_Set ) {
                                if ( ! projectSearchIds_OrderOverride_Deprecated_LOCAL_Set.has( projectSearchIds_MainPage_Entry ) ) {
                                    projectSearchIds_SameContents = false
                                    break
                                }
                            }
                            if ( projectSearchIds_SameContents ) {
                                for ( const projectSearchIds_OrderOverride_Deprecated_LOCAL_Entry of projectSearchIds_OrderOverride_Deprecated_LOCAL_Set ) {
                                    if ( ! projectSearchIds_MainPage_Set.has( projectSearchIds_OrderOverride_Deprecated_LOCAL_Entry ) ) {
                                        projectSearchIds_SameContents = false
                                        break
                                    }
                                }
                            }

                            if ( projectSearchIds_SameContents ) {
                                keep_projectSearchIds_OrderOverride_Deprecated = true
                            }
                        }
                    }

                    if ( keep_projectSearchIds_OrderOverride_Deprecated ) {

                        this._storedState.projectSearchIds_OrderOverride_Deprecated = projectSearchIds_OrderOverride_Deprecated_LOCAL
                        this._projectSearchIds_WereLoadedFromStateInURL = true
                    } else {

                        //  'encodedStateData[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS]' compared to current page Project Search Ids:

                        //     NOT the same length so searches added or deleted
                        //     Are in the same order AND Have the same contents so NOT an Override

                        this._projectSearchIds_WereLoadedFromStateInURL = false

                        updateURL_WithUpdatedValues = true
                    }

                } else {
                    this._storedState.projectSearchIds_OrderOverride_Deprecated = projectSearchIds_OrderOverride_Deprecated_LOCAL
                    this._projectSearchIds_WereLoadedFromStateInURL = true
                }
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.VISUALIZATION_DISPLAY_TAB)) {
                this._storedState.visualization_DisplayTab = _VISUALIZATION_DISPLAY_TAB_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.VISUALIZATION_DISPLAY_TAB]];
            }
            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.DISPLAY_TAB)) {
                this._storedState.displayTab = _DISPLAY_TAB_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.DISPLAY_TAB]];
            }
            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.PSM_QUANT_METHOD)) {
                this._storedState.psmQuant_WhenDisplay_HEATMAP_ONLY = _PSM_QUANT_METHOD_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.PSM_QUANT_METHOD]];
            }

            if ( encodedStateData[ _SAVE_STATE_KEYS.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator ] ) {
                this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator = true
            } else {
                this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator = undefined
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.QUANT_TYPE)) {
                this._storedState.quantType = _QUANT_TYPE_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.QUANT_TYPE]];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.DATA_TRANSFORMATION)) {
                this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY = _DATA_TRANSFORMATION_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.DATA_TRANSFORMATION]];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT)) {
                this._storedState.colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO)) {
                this._storedState.colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ROUNDED_MASS_FOR_HEATMAP)) {
                this._storedState.modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ROUNDED_MASS_FOR_HEATMAP];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ROUNDED_MASS_FOR_HEATMAP)) {
                this._storedState.modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ROUNDED_MASS_FOR_HEATMAP];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM)) {
                this._storedState.modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM)) {
                this._storedState.modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS)) {
                this._storedState.excludeUnlocalizedOpenMods = encodedStateData[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] != 0;    // boolean trick, 0 == false, !0 == true
            }

            //  Selections in the <svg> graphic showing the Mods for the searches
            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.SELECTED_RECTS)) {
                this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root.INTERNAL_ONLY__decode_EncodedSelectedRects( encodedStateData[_SAVE_STATE_KEYS.SELECTED_RECTS] );
            }

            //  Selections in the <svg> graphic showing the Mods for the searches
            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.searchGroups_For_ZScore_Selections)) {
                const encodedStateData__searchGroups_For_ZScore_Selections = encodedStateData[_SAVE_STATE_KEYS.searchGroups_For_ZScore_Selections]
                this._storedState.searchGroups_For_ZScore_Selections.INTERNAL_ONLY__decode_EncodedSelection({ encodedStateData: encodedStateData__searchGroups_For_ZScore_Selections, projectSearchIds_MainPage: initParams.projectSearchIds_MainPage });
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData)) {
                this._storedState.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData = encodedStateData[_SAVE_STATE_KEYS.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData] != 0;    // boolean trick, 0 == false, !0 == true
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.SIGNIFICANCE_METRIC_CHART_TYPE)) {
                this._storedState.significance_metric_chart_type = _SIGNIFICANCE_METRIC_CHART_TYPE_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.SIGNIFICANCE_METRIC_CHART_TYPE]];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.histogram_ChartType_Enum_Class)) {

                const pageState_EncodingNumber__PageStateEncodingOnly = encodedStateData[ _SAVE_STATE_KEYS.histogram_ChartType_Enum_Class ]

                if ( pageState_EncodingNumber__PageStateEncodingOnly === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS.pageState_EncodingNumber__PageStateEncodingOnly ) {
                    this._storedState.histogram_ChartType_Enum_Class = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS
                } else if ( pageState_EncodingNumber__PageStateEncodingOnly === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART.pageState_EncodingNumber__PageStateEncodingOnly ) {
                    this._storedState.histogram_ChartType_Enum_Class = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART
                } else if ( pageState_EncodingNumber__PageStateEncodingOnly === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT.pageState_EncodingNumber__PageStateEncodingOnly ) {
                    this._storedState.histogram_ChartType_Enum_Class = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT
                } else {
                    const msg = "unknown value in encodedStateData[_SAVE_STATE_KEYS.histogram_ChartType_Enum_Class]: " + encodedStateData[ _SAVE_STATE_KEYS.histogram_ChartType_Enum_Class ]
                    console.warn( msg )
                    throw Error( msg )
                }
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.show_inverse_RangeDirection_Plot_2_WhenTwoPlots)) {
                this._storedState.show_inverse_RangeDirection_Plot_2_WhenTwoPlots = encodedStateData[_SAVE_STATE_KEYS.show_inverse_RangeDirection_Plot_2_WhenTwoPlots];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.display_Mean_StandardDeviation_Line_And_Number)) {
                this._storedState.display_Mean_StandardDeviation_Line_And_Number = encodedStateData[_SAVE_STATE_KEYS.display_Mean_StandardDeviation_Line_And_Number];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.show_DifferenceChart_WhenTwoPlots)) {
                this._storedState.show_DifferenceChart_WhenTwoPlots = encodedStateData[_SAVE_STATE_KEYS.show_DifferenceChart_WhenTwoPlots];
            }


            ///   WARNING:  This MUST be the LAST value taken from the encoded state in URL.  The URL will be updated for changes to proteinPosition_Of_Modification_Filter_UserSelections_StateObject

            if ( initParams && initParams.proteinPosition_Of_Modification_Filter_UserSelections_StateObject ) {
                this._move_encodedStateData_PROTEIN_POSITION_FILTER_TO__proteinPosition_Of_Modification_Filter_UserSelections_StateObject({
                    encodedStateData, proteinPosition_Of_Modification_Filter_UserSelections_StateObject: initParams.proteinPosition_Of_Modification_Filter_UserSelections_StateObject
                })
            } else if ( updateURL_WithUpdatedValues ) {

                this._updateState_ForChange()
            }

        }

        this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root.internal_USEONLY__Set_initializeComplete_StartCalling_SelectionChanged_Callback_TRUE()

        this._initialize_Completed = true
    }

    private _move_encodedStateData_PROTEIN_POSITION_FILTER_TO__proteinPosition_Of_Modification_Filter_UserSelections_StateObject(
        {
            encodedStateData, proteinPosition_Of_Modification_Filter_UserSelections_StateObject
        } : {
            encodedStateData: any
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        }
    ) {

        const encodedState_PROTEIN_POSITION_FILTER_Ranges:Array<number>  = encodedStateData[_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER]
        if ( ! encodedState_PROTEIN_POSITION_FILTER_Ranges ) {
            //  NO encodedState_PROTEIN_POSITION_FILTER
            return  // EARLY RETURN
        }

        if ( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {
            //  proteinPosition_Of_Modification_Filter_UserSelections_StateObject ALREADY HAS selections
            return  // EARLY RETURN
        }

        const entriesMap_Key_proteinSequenceVersionId : Map<number, ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId> = new Map();

        for ( let i = 0; i < encodedState_PROTEIN_POSITION_FILTER_Ranges.length; i += 3 ) {
            const proteinSequenceVersionId = encodedState_PROTEIN_POSITION_FILTER_Ranges[ i ];
            const start = encodedState_PROTEIN_POSITION_FILTER_Ranges[ i + 1 ];
            const end = encodedState_PROTEIN_POSITION_FILTER_Ranges[ i + 2 ];

            let result_SingleProtein = entriesMap_Key_proteinSequenceVersionId.get( proteinSequenceVersionId )
            if ( ! result_SingleProtein ) {
                result_SingleProtein = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId();
                result_SingleProtein.proteinSequenceVersionId = proteinSequenceVersionId;
                entriesMap_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, result_SingleProtein );
            }

            //   'start' and 'end' are populated with start and end of whole protein when the whole protein is selected.

            //   TODO  Best to detect this when copy this data to the other Protein Position filter so it is stored there correctly.
            //         What is currently coded is adequate.

            if ( start != undefined || end !== undefined && ( ! result_SingleProtein.rangeEntries ) ) {
                result_SingleProtein.rangeEntries = []
            }

            const resultRange = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange();
            result_SingleProtein.rangeEntries.push( resultRange );

            resultRange.proteinPosition_Start = start;
            resultRange.proteinPosition_End = end;
        }

        const new_PageState = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_Root();
        new_PageState.entriesMap_Key_proteinSequenceVersionId = entriesMap_Key_proteinSequenceVersionId;

        proteinPosition_Of_Modification_Filter_UserSelections_StateObject.setSelections_Ranges( new_PageState )
    }

    /**
     * Called by Central State Manager and maybe other code
     *
     */
    getDataForEncoding() {

        const dataForEncoding: { [key: string]: any } = {};

        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        //  ONLY store to URL IF were in URL when Page loaded, to preserve existing order stored in URL
        if ( this._projectSearchIds_WereLoadedFromStateInURL && this._storedState.projectSearchIds_OrderOverride_Deprecated !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS] = this._storedState.projectSearchIds_OrderOverride_Deprecated;
        }

        if ( this._storedState.visualization_DisplayTab !== undefined ) {
            dataForEncoding[ _SAVE_STATE_KEYS.VISUALIZATION_DISPLAY_TAB ] = _VISUALIZATION_DISPLAY_TAB_ENCODING_KEYS[ this._storedState.visualization_DisplayTab ]
        }
        if ( this._storedState.displayTab !== undefined ) {
            dataForEncoding[ _SAVE_STATE_KEYS.DISPLAY_TAB ] = _DISPLAY_TAB_ENCODING_KEYS[ this._storedState.displayTab ]
        }

        if ( this._storedState.psmQuant_WhenDisplay_HEATMAP_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.PSM_QUANT_METHOD] =  _PSM_QUANT_METHOD_ENCODING_KEYS[this._storedState.psmQuant_WhenDisplay_HEATMAP_ONLY];
        }
        if ( this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator !== undefined ) {
            dataForEncoding[ _SAVE_STATE_KEYS.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator ] = this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator
        }

        if ( this._storedState.quantType !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.QUANT_TYPE] =  _QUANT_TYPE_ENCODING_KEYS[this._storedState.quantType];
        }

        if ( this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY !== undefined && this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none) {
            dataForEncoding[_SAVE_STATE_KEYS.DATA_TRANSFORMATION] =  _DATA_TRANSFORMATION_ENCODING_KEYS[this._storedState.dataTransformation_For__WhenDisplay_HEATMAP_ONLY];
        }

        if ( this._storedState.colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] = this._storedState.colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY;
        }

        if ( this._storedState.colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] = this._storedState.colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY;
        }

        if ( this._storedState.modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ROUNDED_MASS_FOR_HEATMAP] = this._storedState.modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY;
        }

        if ( this._storedState.modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ROUNDED_MASS_FOR_HEATMAP] = this._storedState.modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY;
        }

        if ( this._storedState.modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM] = this._storedState.modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY;
        }

        if ( this._storedState.modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF__ACTUAL_MASS_FOR_HISTOGRAM] = this._storedState.modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY;
        }

        if ( this._storedState.excludeUnlocalizedOpenMods !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] = this._storedState.excludeUnlocalizedOpenMods ? 1 : 0;  // encode true as 1, false as 0
        }

        if ( this._storedState.significance_metric_chart_type !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.SIGNIFICANCE_METRIC_CHART_TYPE] =  _SIGNIFICANCE_METRIC_CHART_TYPE_ENCODING_KEYS[this._storedState.significance_metric_chart_type];
        }

        if ( this._storedState.histogram_ChartType_Enum_Class ) {

            let dataForEncoding_Value: any = undefined

            if ( this._storedState.histogram_ChartType_Enum_Class === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS ) {
                dataForEncoding_Value = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.SEPARATE_PLOTS.pageState_EncodingNumber__PageStateEncodingOnly
            } else if ( this._storedState.histogram_ChartType_Enum_Class === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART ) {
                dataForEncoding_Value = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.STACKED_BAR_CHART.pageState_EncodingNumber__PageStateEncodingOnly
            } else if ( this._storedState.histogram_ChartType_Enum_Class === ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT ) {
                dataForEncoding_Value = ModViewPage_DataVizOptions_VizSelections_PageStateManager__Histogram_ChartType_Enum_Class.ALL_DATA_MERGED_SINGLE_PLOT.pageState_EncodingNumber__PageStateEncodingOnly
            } else {

                const msg = "unknown value in this._storedState.histogram_ChartType_Enum_Class: "
                console.warn( msg, this._storedState.histogram_ChartType_Enum_Class )
                throw Error( msg )
            }

            dataForEncoding[ _SAVE_STATE_KEYS.histogram_ChartType_Enum_Class ] = dataForEncoding_Value
        }

        if ( this._storedState.show_inverse_RangeDirection_Plot_2_WhenTwoPlots !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.show_inverse_RangeDirection_Plot_2_WhenTwoPlots] =  this._storedState.show_inverse_RangeDirection_Plot_2_WhenTwoPlots
        }

        if ( this._storedState.display_Mean_StandardDeviation_Line_And_Number !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.display_Mean_StandardDeviation_Line_And_Number] =  this._storedState.display_Mean_StandardDeviation_Line_And_Number
        }

        if ( this._storedState.show_DifferenceChart_WhenTwoPlots !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.show_DifferenceChart_WhenTwoPlots] =  this._storedState.show_DifferenceChart_WhenTwoPlots
        }

        {
            const encodedData = this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root && this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root.INTERNAL_ONLY__getEncodedSelectedRects();

            if ( encodedData ) {
                dataForEncoding[ _SAVE_STATE_KEYS.SELECTED_RECTS ] = encodedData
            }
        }

        {
            const encodedData = this._storedState.searchGroups_For_ZScore_Selections && this._storedState.searchGroups_For_ZScore_Selections.INTERNAL_ONLY__getEncodedSelection();

            if ( encodedData ) {
                dataForEncoding[ _SAVE_STATE_KEYS.searchGroups_For_ZScore_Selections ] = encodedData
            }
        }

        if ( this._storedState.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData] = this._storedState.zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData ? 1 : 0;  // encode true as 1, false as 0
        }

        return dataForEncoding;
    }
}
