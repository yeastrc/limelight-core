/**
 * lorikeetSpectrumViewer_CreateURL_ParseURL.ts
 *
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 *
 * Used on data pages and also used on Lorikeet page when switch PSM to display
 *
 */

import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    LorikeetSpectrumViewer_Constants
} from "page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_Constants";


const _QUERY_STRING_START = "?"
const _QUERY_STRING_SEPARATOR = "&"

const _SELECTED_IONS_MZ_URL_QUERY_STRING_PROPERTY_NAME = "sionsmz"
const _OPEN_MOD_POSITION_URL_QUERY_STRING_PROPERTY_NAME = 'openmod-position'

const _SELECTED_IONS_MZ_SEPARATOR = "A"

let main_page_lorikeet_page_controller_path: string = undefined;

/**
 * 
 */
export const lorikeetSpectrumViewer_CreateURL = function(
    {
        projectSearchId, psmId, openModPosition, scanPeaks_MZ_That_PassFilters_Array__For_PsmId
    } : {
        projectSearchId: number
        psmId: number
        openModPosition: OpenModPosition_DataType
        // Maybe null or undefined
        scanPeaks_MZ_That_PassFilters_Array__For_PsmId: Array<number>
    }) {

    _populateFromPageDOM__main_page_lorikeet_page_controller_path()


    let queryString_Addition = ""

    {
        const queryStringParts: Array<string> = []

        if ( scanPeaks_MZ_That_PassFilters_Array__For_PsmId && scanPeaks_MZ_That_PassFilters_Array__For_PsmId.length > 0 ) {

            const urlParamValue = scanPeaks_MZ_That_PassFilters_Array__For_PsmId.join( _SELECTED_IONS_MZ_SEPARATOR )

            queryStringParts.push( _SELECTED_IONS_MZ_URL_QUERY_STRING_PROPERTY_NAME + "=" + urlParamValue )
        }


        if ( openModPosition !== undefined && openModPosition !== null ) {
            queryStringParts.push( _OPEN_MOD_POSITION_URL_QUERY_STRING_PROPERTY_NAME + "=" + openModPosition )
        }

        if ( queryStringParts.length > 0 ) {

            queryString_Addition = _QUERY_STRING_START + queryStringParts.join( _QUERY_STRING_SEPARATOR )
        }
    }

    let url = main_page_lorikeet_page_controller_path + "/ps/" + projectSearchId + "/psm/" + psmId + queryString_Addition;

    return url;
}

/**
 *  ONLY Query String for now
 */
export const lorikeetSpectrumViewer_ParseURL = function() :
    {
        //  ONLY Query String for now
        // projectSearchId: number
        // psmId: number
        openmodPosition_QueryParam_Value: string | number
        // Maybe null or undefined
        scanPeaks_MZ_That_PassFilters_Array__For_PsmId: Array<number>
    } {

    _populateFromPageDOM__main_page_lorikeet_page_controller_path()

    // let projectSearchId: number = undefined
    // let psmId: number = undefined
    let openmodPosition_QueryParam_Value: string | number = undefined
    // Maybe null or undefined
    let scanPeaks_MZ_That_PassFilters_Array__For_PsmId: Array<number> = undefined

    console.log( "window.location.search: ", window.location.search );

    const urlSearchParams = new URLSearchParams( window.location.search )

    {
        openmodPosition_QueryParam_Value = urlSearchParams.get( _OPEN_MOD_POSITION_URL_QUERY_STRING_PROPERTY_NAME ); //  null if not found

        if ( openmodPosition_QueryParam_Value === undefined || openmodPosition_QueryParam_Value === null ) {

            //  Set to LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED for consistency

            openmodPosition_QueryParam_Value = LorikeetSpectrumViewer_Constants.OPENMOD_POSITION__NO_POSITION_SELECTED
        }
    }


    { // scanPeaks_MZ_That_PassFilters_Array__For_PsmId

        let queryParam_Value: string = urlSearchParams.get( _SELECTED_IONS_MZ_URL_QUERY_STRING_PROPERTY_NAME ); //  null if not found

        if ( queryParam_Value !== undefined && queryParam_Value !== null && queryParam_Value !== "" ) {

            const valueSplit = queryParam_Value.split( _SELECTED_IONS_MZ_SEPARATOR )

            scanPeaks_MZ_That_PassFilters_Array__For_PsmId = []

            for ( const value of valueSplit ) {
                if ( value !== "" ) {
                    const valueNumber = Number.parseFloat( value )
                    if ( ! Number.isNaN( valueNumber ) ) {
                        scanPeaks_MZ_That_PassFilters_Array__For_PsmId.push( valueNumber )
                    }
                }
            }
            if ( scanPeaks_MZ_That_PassFilters_Array__For_PsmId.length === 0 ) {
                scanPeaks_MZ_That_PassFilters_Array__For_PsmId = undefined
            }
        }
    }

    return {
        // projectSearchId, psmId,
        openmodPosition_QueryParam_Value, scanPeaks_MZ_That_PassFilters_Array__For_PsmId
    };
}


const _populateFromPageDOM__main_page_lorikeet_page_controller_path = function() {

    if ( ! main_page_lorikeet_page_controller_path ) {
        const main_page_lorikeet_page_controller_pathDOMElement = document.getElementById("main_page_lorikeet_page_controller_path");
        if ( ! main_page_lorikeet_page_controller_pathDOMElement ) {
            throw Error("No DOM element with id 'main_page_lorikeet_page_controller_path'");
        }
        main_page_lorikeet_page_controller_path = main_page_lorikeet_page_controller_pathDOMElement.innerText;
    }

}

