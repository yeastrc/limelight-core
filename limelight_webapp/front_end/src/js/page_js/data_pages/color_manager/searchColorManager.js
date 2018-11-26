//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import {ColorThemePretty} from './colorTheme_Pretty.js';
import { CENTRAL_STATE_MANAGER_OBJECT_CLASS__SEARCH_COLOR_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys.js';

// definitions used for saving state to URL
const _COMPONENT_UNIQUE_ID = CENTRAL_STATE_MANAGER_OBJECT_CLASS__SEARCH_COLOR_STATE_MANAGER_KEY; // Key for use in Central State Manager

const _ENCODED_DATA_SEARCH_COLORS_KEY = 'a';    // key to use for encoding th _searchColors variable for this object in the state manager
const _ENCODED_DATA_THEME_KEY = 'c';    // key to use for encoding th _searchColors variable for this object in the state manager
const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'b';    // key to encode data format version
const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

const _ENCODED_DATA_LOOKUP_THEME_BY_CODE = {
    'a':ColorThemePretty,
};

const _ENCODED_DATA_LOOKUP_CODE_BY_THEME = {
    'ColorThemePretty':'a',
};

/**
 * 
 */
export class SearchColorManager {

    constructor( { centralPageStateManager } ) {

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			this._centralPageStateManager.register( { component : this } );
		}
    }

    set theme( theme ) {
        this._theme = theme;
        this.regenerateColors();
    }

    get theme( ) {
        return this._theme;
    }

    set searchIds( searchIds ) {
        this._searchIds = searchIds;
        this.regenerateColors();
    }

    get searchIds() {
        return this._searchIds;
    }

    get searchColors() {
        return this._searchColors;
    }


    regenerateColors() {

        if( this._theme === undefined ) {
            this._theme = ColorThemePretty;
        }

        if( this._searchIds === undefined || this._searchIds.length < 1 ) {
            return;
        }

        let colors = this._theme.getColors( this._searchIds.length );

        this._searchColors = { }

        for( let i = 0; i < this._searchIds.length; i++ ) {
            let searchId = this._searchIds[ i ];
            let color = colors[ i ];

            this._searchColors[ searchId ] = color;
        }

        // save state to URL
        this._centralPageStateManager.setState( { component : this } );
    }


    /**** STATE MANAGER ITEMS *****/

	initialize() {
        let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
        
		if ( encodedStateData ) {

            if( encodedStateData[ _ENCODED_DATA_THEME_KEY ] !== undefined ) {
                this._theme = this.getThemeForCode( encodedStateData[ _ENCODED_DATA_THEME_KEY ] );
            }

            if( encodedStateData[ _ENCODED_DATA_SEARCH_COLORS_KEY ] !== undefined ) {
                this._searchColors = {
                    'r' : encodedStateData[ _ENCODED_DATA_SEARCH_COLORS_KEY ][ 0 ],
                    'g' : encodedStateData[ _ENCODED_DATA_SEARCH_COLORS_KEY ][ 1 ],
                    'b' : encodedStateData[ _ENCODED_DATA_SEARCH_COLORS_KEY ][ 2 ]
                };
            }
		}
	}

    /**
     * Called by Central State Manager and maybe other code
     * 
     * Encode data as:
     *      { version_code : 1,
     *        search_color code : { search id : [r,g,b], }
     *        theme_code : local theme id string (e.g., 'a' )
     *      }
	 */
	getDataForEncoding() {
		const dataForEncoding = {}
		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		if ( this._searchColors !== undefined ) {
			dataForEncoding[ _ENCODED_DATA_SEARCH_COLORS_KEY ] = this.encodeSearchColorsAsArrays();
		}
		if ( this._theme !== undefined ) {
			dataForEncoding[ _ENCODED_DATA_THEME_KEY ] = this.getCodeForTheme();
		}
		return dataForEncoding;
    }

    getCodeForTheme() {
        return _ENCODED_DATA_LOOKUP_CODE_BY_THEME[ this._theme.getThemeName() ];
    }

    getThemeForCode( code ) {
        return _ENCODED_DATA_LOOKUP_THEME_BY_CODE[ code ];
    }

    
    encodeSearchColorsAsArrays() {

        let arrayifiedData = { };

        for (let searchId of Object.keys(this._searchColors)) {
            arrayifiedData[ searchId ] = [ this._searchColors[ searchId ][ 'r' ], this._searchColors[ searchId ][ 'g' ], this._searchColors[ searchId ][ 'b' ] ];
        }

        return arrayifiedData;
    }


    /**
     * Called by Central State Manager and maybe other code
	 */
	getUniqueId() {
		return _COMPONENT_UNIQUE_ID;
    }
    


}
