/**
 * proteinViewPage_DisplayData_SingleProtein_ReporterIonMasses_DisplayAndSelect.js
 * 
 * Javascript for proteinView.jsp page - Display and Select Reporter Ion Masses for a protein.
 * 
 * Companion file to proteinViewPage_DisplayData_SingleProtein_SingleSearch.js and proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 */

let Handlebars = require('handlebars/runtime');

let _protein_table_template_bundle = require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Variable Modification Masses are separated into Integer and non-Integer values
//    The Integer values are sorted ascending first and encoded in the following string
// '<first mod mass, base 35 encoded number>Z<Offset from first mod mass, base 35 encoded number>Z<Offset from second mod mass, base 35 encoded number>'
//  The non-Integer mod masses are sorted and stored in an Array

//  Selected Static Modification Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__REPORTER_ION_MASSES_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'b';

///////

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_ReporterIonMasses_DisplayAndSelect {

	/**
	 * 
	 */
	constructor({ 
        reporterIonMassTransformer,  //  Used in multiple searches to round the Reporter Ion mass
        rootDisplayJquerySelector, 
        projectSearchIds, 
        proteinSequenceVersionId, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
        callbackMethodForSelectedChange } ) {

        this._initializeCalled = false;

        this._reporterIonMassTransformer = reporterIonMassTransformer;
        this._rootDisplayJquerySelector = rootDisplayJquerySelector;
        this._projectSearchIds = projectSearchIds;
        this._proteinSequenceVersionId = proteinSequenceVersionId;
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this._callbackMethodForSelectedChange = callbackMethodForSelectedChange;



		if (!_protein_table_template_bundle.protein_reporter_ions_selection_block) {
			throw Error("Nothing in _protein_table_template_bundle.protein_reporter_ions_selection_block");
		}
        this._protein_reporter_ions_selection_block_Template = _protein_table_template_bundle.protein_reporter_ions_selection_block;

		if (!_protein_table_template_bundle.protein_reporter_ions_selection_entry) {
			throw Error("Nothing in _protein_table_template_bundle.protein_reporter_ions_selection_entry");
		}
        this._protein_reporter_ions_selection_entry_Template = _protein_table_template_bundle.protein_reporter_ions_selection_entry;

        ////

        //  Instance variables

        //  Set of Selected Reporter Ion Masses
        this.reporterIonMassesSelected = new Set();  // call .clear() to reset the selected


        ///  

        const reporterIonMasses_For_AllSearches_Set = new Set();

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const reporterIonMasses_ForSearch_Set = loadedDataPerProjectSearchIdHolder.get_reporterIonMasses_ForSearch();

            if ( ( ! reporterIonMasses_ForSearch_Set ) || reporterIonMasses_ForSearch_Set.size === 0 ) {

                //  No data
    
                continue;  //  EARLY CONTINUE
            }
            if ( reporterIonMasses_ForSearch_Set.size === undefined ) {
                const msg = "reporterIonMasses_ForSearch_Set.size === undefined so not a Set";
                console.warn( msg );
                throw Error( msg );
            }
    
            for ( const reporterIonMass of reporterIonMasses_ForSearch_Set ) {

                let reporterIonMassLocal = reporterIonMass;

                if ( this._reporterIonMassTransformer ) {  //  Transform Reporter Ion masses before using
        
                    //  Used in multiple searches to round the reporter ion mass
                    reporterIonMassLocal = this._reporterIonMassTransformer.transformMass_ReturnNumber({ mass : reporterIonMassLocal });
                }

                reporterIonMasses_For_AllSearches_Set.add( reporterIonMassLocal );
            }
        }

        this._reporterIonMasses_For_AllSearches_Set = reporterIonMasses_For_AllSearches_Set;

    }

	/**
	 * 
	 */
    any_ReporterIonMasses_ForAllSearches() {

        if ( ( ! this._reporterIonMasses_For_AllSearches_Set ) || this._reporterIonMasses_For_AllSearches_Set.size === 0 ) {

            //  No 

            return false;  //  EARLY RETURN
        }

        return true;
    }

	/**
	 * @param initial_reporterIonMassesSelected 
	 */
	initialize({ encodedStateData, initial_reporterIonMassesSelected }) {

		if ( encodedStateData ) {
			this._updateWithEncodedStateData({ encodedStateData });
        }
        
		if ( initial_reporterIonMassesSelected ) {
            if ( ! ( initial_reporterIonMassesSelected instanceof Set ) ) {
                console.log("initialize(...): Provided initial_reporterIonMassesSelected param must be type Set");
                throw Error("Provided initial_reporterIonMassesSelected param must be type Set");
            }
            this.reporterIonMassesSelected = initial_reporterIonMassesSelected;
            this._initialreporterIonMassesSelectedCleanup();
		} else if ( ! encodedStateData ) {
			this.reporterIonMassesSelected.clear(); // Reset to None
        }
        
        this._initializeCalled = true;
    }

	/**
	 * 
     * 
     * 
	 */
    clear_selected_ReporterIonMasses() {

        this.reporterIonMassesSelected.clear(); // Reset to None

        this._reporterIon_Display_Internal();
    }

    //////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() {

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this.reporterIonMassesSelected && this.reporterIonMassesSelected.size !== 0) {

            const reporterIonMassesSelected_Array = Array.from( this.reporterIonMassesSelected );

            result[ _ENCODED_DATA__REPORTER_ION_MASSES_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] = reporterIonMassesSelected_Array;
		}

		return result;
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	_updateWithEncodedStateData({ encodedStateData }) {

		if ( ! ( encodedStateData ) ) {
			const msg = "_updateWithEncodedStateData(...): No value in encodedStateData";
			console.log( msg );
			throw Error( msg );
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "_updateWithEncodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.log( msg );
			throw Error( msg );
        }
        
        if ( encodedStateData[ _ENCODED_DATA__REPORTER_ION_MASSES_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] ) {

            this.reporterIonMassesSelected = new Set( encodedStateData[ _ENCODED_DATA__REPORTER_ION_MASSES_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] );
        } else {
            this.reporterIonMassesSelected = new Set();
        }
	}

    //////////////////////////////////

	/**
	 * 
	 */
    isAnyReporterIonMassSelected() {
        return this.reporterIonMassesSelected.size !== 0;
    }

	/**
	 * 
	 */
    isReporterIonMassSelected( mass ) {
        return this.reporterIonMassesSelected.has( mass );
    }

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses
	 */
    getReporterIonMassesSelected() {
        const selectionCopy = new Set( this.reporterIonMassesSelected );
        
        return selectionCopy;
    }

    /////////////////

	/**
	 * Display Reporter Ions for Search
	 */
	reporterIon_Display() {

        this._reporterIon_Display_Internal();
    }

	/**
     * Internal function
	 * Display mods for Search
	 */
	_reporterIon_Display_Internal() {

        // console.log("_reporterIon_Display_Internal()")

        const objectThis = this;

        const $rootDisplayElement = $( this._rootDisplayJquerySelector );
		if ( $rootDisplayElement.length === 0 ) {
			throw Error("No DOM element found with selector '" + this._rootDisplayJquerySelector + "'.");
        }
        $rootDisplayElement.empty();

        if ( ( ! this._reporterIonMasses_For_AllSearches_Set ) || this._reporterIonMasses_For_AllSearches_Set.size === 0 ) {

            //  No data to display

            return;  //  EARLY RETURN
        }
 
        const reporterIonMasses_ForSearch_Array = Array.from( this._reporterIonMasses_For_AllSearches_Set );
        reporterIonMasses_ForSearch_Array.sort();

        const blockHTML = this._protein_reporter_ions_selection_block_Template({});
        const $blockDOM = $( blockHTML );

        $blockDOM.appendTo( $rootDisplayElement );

		const $selector_protein_reporter_ion_list = $blockDOM.find(".selector_protein_reporter_ion_list");
		if ( $selector_protein_reporter_ion_list.length === 0 ) {
			throw Error("No DOM element found with class 'selector_protein_reporter_ion_list'");
        }

        for ( const reporterIonMass of reporterIonMasses_ForSearch_Array ) {

            const entryContext = { reporterIonMass };

            entryContext.isSelected = this.reporterIonMassesSelected.has( reporterIonMass );

            const entryHTML = this._protein_reporter_ions_selection_entry_Template(entryContext);
            const $modEntryDOM = $( entryHTML );
            $modEntryDOM.appendTo( $selector_protein_reporter_ion_list );

            const $selector_reporter_ion_entry_checkbox = $modEntryDOM.find(".selector_reporter_ion_entry_checkbox");
            if ( $selector_reporter_ion_entry_checkbox.length === 0 ) {
                throw Error("No DOM element found with class 'selector_reporter_ion_entry_checkbox'");
            }
            $selector_reporter_ion_entry_checkbox.change( function(eventObject) {
                try {
                    eventObject.preventDefault();
                    const clickThis = this;
                    window.setTimeout( function() { //  Use setTimeout to run update later so checkbox shows or clears check immediately
                        try {
                            objectThis._reporterIonMassOnPageCheckboxChanged({ clickThis, eventObject, reporterIonMass });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10);
                    return false;
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });	
        }
    }

	/**
	 * Mass displayed on page clicked
	 */
    _reporterIonMassOnPageCheckboxChanged({ clickThis, eventObject, reporterIonMass }) {

        // check 'checked' property on DOM element checkbox
        // if ( clickThis.checked ) {

        const $clickThis = $( clickThis );
        if ( $clickThis.prop('checked') ) {

            this.reporterIonMassesSelected.add( reporterIonMass );

        } else {
            this.reporterIonMassesSelected.delete( reporterIonMass );
        }

        this._selectionsChanged();
    }

    ///////////////////////////////////////////

	/**
	 * 
	 */
    _selectionsChanged() {

        if ( this._callbackMethodForSelectedChange ) {
			this._callbackMethodForSelectedChange();
		}
    }
}

