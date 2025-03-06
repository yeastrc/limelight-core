/*
 * This class is responsible for being registered with the page central state manager and serializing and
 * deserializing the current state of the data visualization so that it may be saved/recovered from the
 * hash string in the URL
 */

import {MOD_VIEW_MULTI_SEARCH_DATA_VIZ__CENTRAL_STATE_MANAGER_KEY} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {
    ModView_VizOptionsData, ModView_VizOptionsData_SubPart_selectedStateObject,
    ModView_VizOptionsData_SubPart_selectedStateObject__ModMass_Array_Map_Key_ProjectSearchId_Type
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";

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
    'EXCLUDE_UNLOCALIZED_MODS' : 'xu'
};

const _PSM_QUANT_METHOD_ENCODING_KEYS = {
    'counts': 0,
    'ratios': 1
};

const _PSM_QUANT_METHOD_DECODING_KEYS = [
  'counts',
  'ratios'
];

const _QUANT_TYPE_ENCODING_KEYS = {
    'psms': 0,
    'scans': 1
};

const _QUANT_TYPE_DECODING_KEYS = [
    'psms',
    'scans'
];

const _DATA_TRANSFORMATION_ENCODING_KEYS = {
    'scaled-mean-diff': 0,
    'per-mod-zscore': 1,
    'global-zscore': 2,
    'global-pvalue-bonf': 3,
    'global-qvalue-bh': 4,
};

const _DATA_TRANSFORMATION_DECODING_KEYS = [
    'scaled-mean-diff',
    'per-mod-zscore',
    'global-zscore',
    'global-pvalue-bonf',
    'global-qvalue-bh',
];

export class ModMultiSearch_DataVizPageStateManager {

    private _centralPageStateManager : CentralPageStateManager
    private _vizOptionsData: ModView_VizOptionsData

    private _projectSearchIds_WereLoadedFromStateInURL = false

    constructor({centralPageStateManager, vizOptionsData} : {

        centralPageStateManager : CentralPageStateManager
        vizOptionsData: ModView_VizOptionsData
    }) {
        if (centralPageStateManager) {
            this._centralPageStateManager = centralPageStateManager;
            this._centralPageStateManager.unregister({componentUniqueId: this.getUniqueId()});
            this._centralPageStateManager.register({component: this});
        }

        this._vizOptionsData = vizOptionsData;
    }

    /**** STATE MANAGER ITEMS *****/

    // take in deserialized json that represents an optimized view of the data and save it as a working view of the data
    initialize() {

        console.log('called initialize()');

        let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );

        if ( encodedStateData ) {


            const encodedDataKeys = Object.keys(encodedStateData);

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS)) {
                this._vizOptionsData.data.projectSearchIds = encodedStateData[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS];

                this._projectSearchIds_WereLoadedFromStateInURL = true
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.PSM_QUANT_METHOD)) {
                this._vizOptionsData.data.psmQuant = _PSM_QUANT_METHOD_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.PSM_QUANT_METHOD]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.QUANT_TYPE)) {
                this._vizOptionsData.data.quantType = _QUANT_TYPE_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.QUANT_TYPE]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.DATA_TRANSFORMATION)) {
                this._vizOptionsData.data.dataTransformation = _DATA_TRANSFORMATION_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.DATA_TRANSFORMATION]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT)) {
                this._vizOptionsData.data.colorCutoffCount = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO)) {
                this._vizOptionsData.data.colorCutoffRatio = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF)) {
                this._vizOptionsData.data.modMassCutoffMax = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF)) {
                this._vizOptionsData.data.modMassCutoffMin = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.SELECTED_RECTS)) {
                this._vizOptionsData.data.selectedStateObject = { data__ModMass_Array_Map_Key_ProjectSearchId: this.getDecodedSelectedRects( encodedStateData[_SAVE_STATE_KEYS.SELECTED_RECTS] ) };
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER)) {
                this._vizOptionsData.data.proteinPositionFilter = this.getDecodedProteinPositionFilter( encodedStateData[_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER] );
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS)) {
                this._vizOptionsData.data.excludeUnlocalizedOpenMods = encodedStateData[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] != 0;    // boolean trick, 0 == false, !0 == true
            }

        }
    }

    getDecodedProteinPositionFilter(encodedProteinRanges:Array<number>):ProteinPositionFilterDataManager {

        const proteinPositionFilter = new ProteinPositionFilterDataManager();

        for(let i = 0; i < encodedProteinRanges.length; i+=3) {
            const proteinId = encodedProteinRanges[i];
            const start = encodedProteinRanges[i+1];
            const end = encodedProteinRanges[i+2];

            proteinPositionFilter.addProteinRange({proteinId, start, end});
        }

        return proteinPositionFilter;
    }

    getEncodedProteinPositionFilter(proteinPositionFilter:ProteinPositionFilterDataManager):Array<number> {

        const encodedArray = new Array<number>();

        for (const range of proteinPositionFilter.getProteinRanges()) {
            encodedArray.push(range.proteinId);
            encodedArray.push(range.start);
            encodedArray.push(range.end);
        }

        return encodedArray;
    }

    private getDecodedSelectedRects(encodedSelectedRects: any) {

        let decodedSelectedRects: ModView_VizOptionsData_SubPart_selectedStateObject__ModMass_Array_Map_Key_ProjectSearchId_Type = new Map();

        for(const projectSearchId_String of Object.keys(encodedSelectedRects)) {

            const projectSearchIdModArray = [ ];

            for(const range of encodedSelectedRects[projectSearchId_String]) {
                for(let i = range[0]; i < range[1]; i++) {
                    projectSearchIdModArray.push(i);
                }
            }

            const projectSearchId_Number = Number.parseInt( projectSearchId_String )

            decodedSelectedRects.set(projectSearchId_Number, projectSearchIdModArray)
        }

        return decodedSelectedRects;
    }

    /**
     * Return the ranges of selected mods for each project search id, where for each project search id the
     * ranges are stored as:
     * project search id=> [
     *                      [start, end], [start, end], ...
     *                     ]
     * where start is included and end is excluded
     * @param selectedStateObject
     */
    private getEncodedSelectedRects( selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject ) {

        if ( ( ! selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId )
            || selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size === 0 ) {
            return undefined
        }

        let encodedData = { };

        for( const mapEntry of selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.entries() ) {
            const projectSearchId = mapEntry[ 0 ]
            const selectedValues = mapEntry[ 1 ]
            const ranges = this.getRanges(selectedValues);
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
    private getRanges(intArray: Array<number>) {

        let ranges: Array<Array<number>> = [], rstart: number, rend: number;

        // make sure it's actually an int array
        intArray = intArray.map(Number);

        for (let i = 0; i < intArray.length; i++) {
            rstart = intArray[i];
            rend = rstart;
            while (intArray[i + 1] - intArray[i] === 1) {
                rend = intArray[i + 1]; // increment the index if the numbers sequential
                i++;
            }

            const range = [rstart, rend + 1];
            ranges.push(range)
        }

        return ranges;
    }

    /**
     * Called by Central State Manager and maybe other code
     *
     */
    getDataForEncoding() {
        const dataForEncoding = {};
        dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

        //  ONLY store to URL IF were in URL when Page loaded, to preserve existing order stored in URL
        if ( this._projectSearchIds_WereLoadedFromStateInURL && this._vizOptionsData.data.projectSearchIds !== undefined ) {
            dataForEncoding[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS] = this._vizOptionsData.data.projectSearchIds;
        }

        if(this._vizOptionsData.data.psmQuant !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.PSM_QUANT_METHOD] =  _PSM_QUANT_METHOD_ENCODING_KEYS[this._vizOptionsData.data.psmQuant];
        }

        if(this._vizOptionsData.data.quantType !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.QUANT_TYPE] =  _QUANT_TYPE_ENCODING_KEYS[this._vizOptionsData.data.quantType];
        }

        if(this._vizOptionsData.data.dataTransformation !== undefined && this._vizOptionsData.data.dataTransformation !== 'none') {
            dataForEncoding[_SAVE_STATE_KEYS.DATA_TRANSFORMATION] =  _DATA_TRANSFORMATION_ENCODING_KEYS[this._vizOptionsData.data.dataTransformation];
        }

        if(this._vizOptionsData.data.colorCutoffCount !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] = this._vizOptionsData.data.colorCutoffCount;
        }

        if(this._vizOptionsData.data.colorCutoffRatio !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] = this._vizOptionsData.data.colorCutoffRatio;
        }

        if(this._vizOptionsData.data.modMassCutoffMax !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF] = this._vizOptionsData.data.modMassCutoffMax;
        }

        if(this._vizOptionsData.data.modMassCutoffMin !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF] = this._vizOptionsData.data.modMassCutoffMin;
        }

        if(this._vizOptionsData.data.excludeUnlocalizedOpenMods !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] = this._vizOptionsData.data.excludeUnlocalizedOpenMods ? 1 : 0;  // encode true as 1, false as 0
        }

        if( this._vizOptionsData.data.selectedStateObject !== undefined
            && this._vizOptionsData.data.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId !== undefined
            && this._vizOptionsData.data.selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size > 0) {

            dataForEncoding[_SAVE_STATE_KEYS.SELECTED_RECTS] = this.getEncodedSelectedRects(this._vizOptionsData.data.selectedStateObject);
        }

        if(this._vizOptionsData.data.proteinPositionFilter !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER] = this.getEncodedProteinPositionFilter(this._vizOptionsData.data.proteinPositionFilter);
        }

        return dataForEncoding;
    }

    updateState() {
        this._centralPageStateManager.setState({ component: this });
    }


    /**
     * Called by Central State Manager and maybe other code
     */
    getUniqueId() {
        return _COMPONENT_UNIQUE_ID;
    }

}