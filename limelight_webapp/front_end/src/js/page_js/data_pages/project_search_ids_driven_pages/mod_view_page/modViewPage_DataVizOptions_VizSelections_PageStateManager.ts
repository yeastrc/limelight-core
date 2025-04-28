/*
 * This class is responsible for being registered with the page central state manager and serializing and
 * deserializing the current state of the data visualization so that it may be saved/recovered from the
 * hash string in the URL
 */

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


export class ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch {

    selectionRanges: Array<ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections_SelectedModMassRanges_ForSingleSearch_RangeEntry>
}

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

            for ( const range of encodedSelectedRects[projectSearchId_String]) {

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

        let encodedData = { };

        for ( const projectSearchId of this._selected_ModMasses_Set_Map_Key_ProjectSearchId.keys() ) {
            const ranges = this._get_SelectedModMassRanges_ForSingleSearch_ForEncoding(projectSearchId);
            encodedData[projectSearchId] = ranges;
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
    'PROJECT_SEARCH_IDS': 'p',
    'PSM_QUANT_METHOD': 'q',
    'QUANT_TYPE': 'a',
    'COLOR_MAX_CUTOFF_COUNT': 'c',
    'COLOR_MAX_CUTOFF_RATIO': 'r',
    'MOD_MASS_MAX_CUTOFF': 'x',
    'MOD_MASS_MIN_CUTOFF': 'n',
    'SELECTED_RECTS': 's',
    'DATA_TRANSFORMATION' : 't',
    'PROTEIN_POSITION_FILTER' : 'pp',
    'EXCLUDE_UNLOCALIZED_MODS' : 'xu',
    psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: 'u'
} as const

const _PSM_QUANT_METHOD_ENCODING_KEYS: object = {}

_PSM_QUANT_METHOD_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ] = 0
_PSM_QUANT_METHOD_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ] = 1

const _PSM_QUANT_METHOD_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios
]

const _QUANT_TYPE_ENCODING_KEYS = {}

_QUANT_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ] = 0
_QUANT_TYPE_ENCODING_KEYS[ ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ] = 1

const _QUANT_TYPE_DECODING_KEYS = [
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans
]

const _DATA_TRANSFORMATION_ENCODING_KEYS = {}

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

//////////////////////
//////////////////////

//   MAIN CLASS  !!!!!

//////

export class ModViewPage_DataVizOptions_VizSelections_PageStateManager {

    private _updateState_ForChange_BindThis = this._updateState_ForChange.bind(this)

    private _centralPageStateManager : CentralPageStateManager

    private _storedState: {

        projectSearchIds_OrderOverride_Deprecated : Array<number>  //  Deprecated override of ProjectSearchId order where user changed search order in Mod Page graphic which is no longer supported

        quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
        psmQuant : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum
        psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: boolean  //  true means to use result of filters in 'Click to Show Filters and Options' for Denominator for Ratios calculations

        dataTransformation : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum
        colorCutoffRatio : number
        colorCutoffCount : number
        modMassCutoffMin : number
        modMassCutoffMax : number
        excludeUnlocalizedOpenMods : boolean

        modMasses_ProjectSearchIds_Visualization_Selections_Root: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections
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
            projectSearchIds_OrderOverride_Deprecated : undefined,  //  Deprecated override of ProjectSearchId order where user changed search order in Mod Page graphic which is no longer supported

            quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms,
            psmQuant : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts,
            psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator: undefined,
            dataTransformation : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none,
            colorCutoffRatio : undefined,
            colorCutoffCount : undefined,
            modMassCutoffMin : undefined,
            modMassCutoffMax : undefined,
            excludeUnlocalizedOpenMods : false,
            modMasses_ProjectSearchIds_Visualization_Selections_Root:
                new ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections({ callbackOnChange: this._updateState_ForChange_BindThis })
        }
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

    get_quantType() {

        return this._storedState.quantType
    }

    set_quantType( quantType : ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum ) {

        this._storedState.quantType = quantType

        this._updateState_ForChange()
    }

    get_psmQuant() {

        return this._storedState.psmQuant
    }

    set_psmQuant( psmQuant : ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum ) {

        this._storedState.psmQuant = psmQuant

        this._updateState_ForChange()
    }

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

    get_dataTransformation() {

        return this._storedState.dataTransformation
    }

    set_dataTransformation( dataTransformation : ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum ) {

        this._storedState.dataTransformation = dataTransformation

        this._updateState_ForChange()
    }

    get_colorCutoffRatio() {

        return this._storedState.colorCutoffRatio
    }

    set_colorCutoffRatio( colorCutoffRatio : number ) {

        this._storedState.colorCutoffRatio = colorCutoffRatio

        this._updateState_ForChange()
    }

    get_colorCutoffCount() {

        return this._storedState.colorCutoffCount
    }

    set_colorCutoffCount( colorCutoffCount : number ) {

        this._storedState.colorCutoffCount = colorCutoffCount

        this._updateState_ForChange()
    }

    get_modMassCutoffMin() {

        return this._storedState.modMassCutoffMin
    }

    set_modMassCutoffMin( modMassCutoffMin : number ) {

        this._storedState.modMassCutoffMin = modMassCutoffMin

        this._updateState_ForChange()
    }

    get_modMassCutoffMax() {

        return this._storedState.modMassCutoffMax
    }

    set_modMassCutoffMax( modMassCutoffMax : number ) {

        this._storedState.modMassCutoffMax = modMassCutoffMax

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

    set_modMasses_ProjectSearchIds_Visualization_Selections_Root( modMasses_ProjectSearchIds_Visualization_Selections_Root: ModViewPage_DataVizOptions_VizSelections_PageStateManager__ModMasses_ProjectSearchIds_Visualization_Selections ) {

        this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root = modMasses_ProjectSearchIds_Visualization_Selections_Root

        this._updateState_ForChange()
    }

    /**
     * take in deserialized json that represents an optimized view of the data and save it as a working view of the data
     *
     * @param initParams
     */
    initialize(

        initParams?:
            {
                optional_encodedStateData?: any
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject: ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
                projectSearchIds_MainPage: Array<number>
            }) {

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

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.PSM_QUANT_METHOD)) {
                this._storedState.psmQuant = _PSM_QUANT_METHOD_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.PSM_QUANT_METHOD]];
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
                this._storedState.dataTransformation = _DATA_TRANSFORMATION_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.DATA_TRANSFORMATION]];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT)) {
                this._storedState.colorCutoffCount = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO)) {
                this._storedState.colorCutoffRatio = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF)) {
                this._storedState.modMassCutoffMax = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF)) {
                this._storedState.modMassCutoffMin = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF];
            }

            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS)) {
                this._storedState.excludeUnlocalizedOpenMods = encodedStateData[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] != 0;    // boolean trick, 0 == false, !0 == true
            }

            //  Selections in the <svg> graphic showing the Mods for the searches
            if ( encodedDataKeys.includes(_SAVE_STATE_KEYS.SELECTED_RECTS)) {
                this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root.INTERNAL_ONLY__decode_EncodedSelectedRects( encodedStateData[_SAVE_STATE_KEYS.SELECTED_RECTS] );
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

        const dataForEncoding = {};
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        //  ONLY store to URL IF were in URL when Page loaded, to preserve existing order stored in URL
        if ( this._projectSearchIds_WereLoadedFromStateInURL && this._storedState.projectSearchIds_OrderOverride_Deprecated !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS] = this._storedState.projectSearchIds_OrderOverride_Deprecated;
        }

        if ( this._storedState.psmQuant !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.PSM_QUANT_METHOD] =  _PSM_QUANT_METHOD_ENCODING_KEYS[this._storedState.psmQuant];
        }
        if ( this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator !== undefined ) {
            dataForEncoding[ _SAVE_STATE_KEYS.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator ] = this._storedState.psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator
        }

        if ( this._storedState.quantType !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.QUANT_TYPE] =  _QUANT_TYPE_ENCODING_KEYS[this._storedState.quantType];
        }

        if ( this._storedState.dataTransformation !== undefined && this._storedState.dataTransformation !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none) {
            dataForEncoding[_SAVE_STATE_KEYS.DATA_TRANSFORMATION] =  _DATA_TRANSFORMATION_ENCODING_KEYS[this._storedState.dataTransformation];
        }

        if ( this._storedState.colorCutoffCount !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] = this._storedState.colorCutoffCount;
        }

        if ( this._storedState.colorCutoffRatio !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] = this._storedState.colorCutoffRatio;
        }

        if ( this._storedState.modMassCutoffMax !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF] = this._storedState.modMassCutoffMax;
        }

        if ( this._storedState.modMassCutoffMin !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF] = this._storedState.modMassCutoffMin;
        }

        if ( this._storedState.excludeUnlocalizedOpenMods !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] = this._storedState.excludeUnlocalizedOpenMods ? 1 : 0;  // encode true as 1, false as 0
        }

        {
            const encodedData = this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root && this._storedState.modMasses_ProjectSearchIds_Visualization_Selections_Root.INTERNAL_ONLY__getEncodedSelectedRects();

            if ( encodedData ) {
                dataForEncoding[ _SAVE_STATE_KEYS.SELECTED_RECTS ] = encodedData
            }
        }

        return dataForEncoding;
    }
}
