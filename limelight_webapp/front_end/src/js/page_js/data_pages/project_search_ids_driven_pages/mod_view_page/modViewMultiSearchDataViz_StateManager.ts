/*
 * This class is responsible for being registered with the page central state manager and serializing and
 * deserializing the current state of the data visualization so that it may be saved/recovered from the
 * hash string in the URL
 */

import {MOD_VIEW_MULTI_SEARCH_DATA_VIZ__CENTRAL_STATE_MANAGER_KEY} from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
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

const _LOAD_STATE_KEYS = {
    'PROJECT_SEARCH_IDS': 'projectSearchIds',
    'PSM_QUANT_METHOD': 'psmQuant',
    'QUANT_TYPE': 'quantType',
    'COLOR_MAX_CUTOFF_COUNT': 'colorCutoffCount',
    'COLOR_MAX_CUTOFF_RATIO': 'colorCutoffRatio',
    'MOD_MASS_MAX_CUTOFF': 'modMassCutoffMax',
    'MOD_MASS_MIN_CUTOFF': 'modMassCutoffMin',
    'SELECTED_RECTS': 'selectedStateObject',
    'DATA_TRANSFORMATION' : 'dataTransformation',
    'PROTEIN_POSITION_FILTER' : 'proteinPositionFilter',
    'EXCLUDE_UNLOCALIZED_MODS' : 'excludeUnlocalizedOpenMods',
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
                this._vizOptionsData.data[_LOAD_STATE_KEYS.PROJECT_SEARCH_IDS] = encodedStateData[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.PSM_QUANT_METHOD)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.PSM_QUANT_METHOD] = _PSM_QUANT_METHOD_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.PSM_QUANT_METHOD]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.QUANT_TYPE)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.QUANT_TYPE] = _QUANT_TYPE_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.QUANT_TYPE]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.DATA_TRANSFORMATION)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.DATA_TRANSFORMATION] = _DATA_TRANSFORMATION_DECODING_KEYS[encodedStateData[_SAVE_STATE_KEYS.DATA_TRANSFORMATION]];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] = encodedStateData[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MAX_CUTOFF] = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MIN_CUTOFF] = encodedStateData[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF];
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.SELECTED_RECTS)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS] = { };
                this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS].data = this.getDecodedSelectedRects( encodedStateData[_SAVE_STATE_KEYS.SELECTED_RECTS] );
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.PROTEIN_POSITION_FILTER] = this.getDecodedProteinPositionFilter( encodedStateData[_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER] );
            }

            if(encodedDataKeys.includes(_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS)) {
                this._vizOptionsData.data[_LOAD_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] = encodedStateData[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] != 0;    // boolean trick, 0 == false, !0 == true
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

    getDecodedSelectedRects(encodedSelectedRects) {

        let decodedSelectedRects = { };

        for(const projectSearchId of Object.keys(encodedSelectedRects)) {

            let projectSearchIdModArray = [ ];

            for(const range of encodedSelectedRects[projectSearchId]) {
                for(let i = range[0]; i < range[1]; i++) {
                    projectSearchIdModArray.push(i);
                }
            }

            decodedSelectedRects[projectSearchId] = projectSearchIdModArray;
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
    getEncodedSelectedRects(selectedStateObject) {

        let encodedData = { };

        for(const projectSearchId of Object.keys(selectedStateObject.data)) {
            const ranges = this.getRanges(selectedStateObject.data[projectSearchId]);
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
    getRanges(intArray) {

        let ranges = [], rstart, rend;

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

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.PROJECT_SEARCH_IDS] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.PROJECT_SEARCH_IDS] = this._vizOptionsData.data[_LOAD_STATE_KEYS.PROJECT_SEARCH_IDS];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.PSM_QUANT_METHOD] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.PSM_QUANT_METHOD] =  _PSM_QUANT_METHOD_ENCODING_KEYS[this._vizOptionsData.data[_LOAD_STATE_KEYS.PSM_QUANT_METHOD]];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.QUANT_TYPE] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.QUANT_TYPE] =  _QUANT_TYPE_ENCODING_KEYS[this._vizOptionsData.data[_LOAD_STATE_KEYS.QUANT_TYPE]];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.DATA_TRANSFORMATION] !== undefined && this._vizOptionsData.data[_LOAD_STATE_KEYS.DATA_TRANSFORMATION] !== 'none') {
            dataForEncoding[_SAVE_STATE_KEYS.DATA_TRANSFORMATION] =  _DATA_TRANSFORMATION_ENCODING_KEYS[this._vizOptionsData.data[_LOAD_STATE_KEYS.DATA_TRANSFORMATION]];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT] = this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_COUNT];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO] = this._vizOptionsData.data[_LOAD_STATE_KEYS.COLOR_MAX_CUTOFF_RATIO];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MAX_CUTOFF] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MAX_CUTOFF] = this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MAX_CUTOFF];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MIN_CUTOFF] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.MOD_MASS_MIN_CUTOFF] = this._vizOptionsData.data[_LOAD_STATE_KEYS.MOD_MASS_MIN_CUTOFF];
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] = this._vizOptionsData.data[_LOAD_STATE_KEYS.EXCLUDE_UNLOCALIZED_MODS] ? 1 : 0;  // encode true as 1, false as 0
        }

        if( this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS] !== undefined
            && this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS].data !== undefined
            && Object.keys(this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS].data).length > 0) {


            dataForEncoding[_SAVE_STATE_KEYS.SELECTED_RECTS] = this.getEncodedSelectedRects(this._vizOptionsData.data[_LOAD_STATE_KEYS.SELECTED_RECTS]);
        }

        if(this._vizOptionsData.data[_LOAD_STATE_KEYS.PROTEIN_POSITION_FILTER] !== undefined) {
            dataForEncoding[_SAVE_STATE_KEYS.PROTEIN_POSITION_FILTER] = this.getEncodedProteinPositionFilter(this._vizOptionsData.data[_LOAD_STATE_KEYS.PROTEIN_POSITION_FILTER]);
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