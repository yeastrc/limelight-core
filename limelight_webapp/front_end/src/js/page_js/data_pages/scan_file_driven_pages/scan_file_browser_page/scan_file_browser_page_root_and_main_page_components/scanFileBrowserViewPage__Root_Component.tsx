/**
 * scanFileBrowserViewPage__Root_Component.tsx
 *
 * Root of Scan File Browser - inserted into <div> with id 'main_view_loading_data_root_container' in
 *
 */


import React from 'react'
import {
    ScanFileBrowserViewPage__MainPage_Component,
    ScanFileBrowserViewPage__MainPage_Component_Props_Prop
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root_and_main_page_components/scanFileBrowserViewPage__MainPage_Component";

/////////////////////////

/**
 *
 */
export interface ScanFileBrowserViewPage__Root_Component_Props {

    propsValue : ScanFileBrowserViewPage__MainPage_Component_Props_Prop
}

/**
 *
 */
interface ScanFileBrowserViewPage__Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ScanFileBrowserViewPage__Root_Component extends React.Component< ScanFileBrowserViewPage__Root_Component_Props, ScanFileBrowserViewPage__Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ScanFileBrowserViewPage__Root_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ScanFileBrowserViewPage__Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ScanFileBrowserViewPage_DisplayData_ScanFileBrowserList_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    // componentWillUnmount() {
    //
    // }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : JSX.Element = undefined;

        let mainContent : JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else {

            mainContent = (
                <ScanFileBrowserViewPage__MainPage_Component
                    propsValue={ this.props.propsValue }
                />
            );
        }

        return (
            <div >
                { component_SubTree_ErrorMessage }
                { mainContent }
            </div>
        );
    }

}

