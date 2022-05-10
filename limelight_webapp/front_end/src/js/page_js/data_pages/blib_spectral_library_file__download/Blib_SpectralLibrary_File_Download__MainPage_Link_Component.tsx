/**
 * Blib_SpectralLibrary_File_Download__MainPage_Link_Component.tsx
 *
 * Javascript and React Component for Download Blib Spectral Library - Main Page Link
 *
 */

import React from "react";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 */
interface Blib_SpectralLibrary_File_Download__MainPage_Link_Component_Props {

    dataPageStateManager : DataPageStateManager

    download_Blib_Spectral_Library_Callback: () => void
}


/**
 *
 */
interface Blib_SpectralLibrary_File_Download__MainPage_Link_Component_State {

    _placeholder: any
}

/**
 *
 */
export class Blib_SpectralLibrary_File_Download__MainPage_Link_Component extends React.Component< Blib_SpectralLibrary_File_Download__MainPage_Link_Component_Props, Blib_SpectralLibrary_File_Download__MainPage_Link_Component_State > {

    private _renderComponent = true;

    private _disableLink = false;

    /**
     *
     */
    constructor(props: Blib_SpectralLibrary_File_Download__MainPage_Link_Component_Props) {
        super(props);

        {
            const blib_spectral_library_webservice_is_fully_configured_DOM = document.getElementById("blib_spectral_library_webservice_is_fully_configured");
            if ( ! blib_spectral_library_webservice_is_fully_configured_DOM ) {

                //  Blib Spectral Library Webservice URL IS NOT Configured so do NOT render

                this._renderComponent = false;

                return; // EARLY RETURN
            }
        }

        if ( ! this.props.dataPageStateManager.get_DataPage_common_Searches_Flags().is__All_Searches_Have_ScanData() ) {

            //  NOT all searches have Scan Data so Disable Link

            this._disableLink = true;

            return; // EARLY RETURN
        }
    }

    /**
     *
     */
    render() {

        if ( ! this._renderComponent ) {
            // NOT render component

            return null; // EARLY RETURN
        }

        const linkLabel = "Download Blib Spectral Library";

        if ( this._disableLink ) {
            // render Disabled Link

            return (  // EARLY RETURN
                <span
                    style={ { marginLeft: 10, whiteSpace: "nowrap" } } className=" gray-text "
                    title="Not enabled since not all searches have scan data"
                >
                    { linkLabel }
                </span>
            )
        }

        return (
            <span style={ { marginLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                  onClick={ this.props.download_Blib_Spectral_Library_Callback }
            >
                { linkLabel }
            </span>
        )
    }

}

