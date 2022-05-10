/**
 * navigation_dataPages_Maint_Component.tsx
 *
 * Component of Data Page Navigation links at top of data pages
 *
 */

import React from 'react'
import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {_REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR} from "page_js/data_pages/data_pages_common/a_dataPagesCommonConstants";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

export enum Navigation_dataPages_Maint__NavigationType_Enum {
    SINGLE_SEARCH = "SINGLE_SEARCH",
    MULTIPLE_SEARCHES = "MULTIPLE_SEARCHES",
    EXPERIMENT = "EXPERIMENT"
}
/**
 *
 */
export class Navigation_dataPages_Maint_Root_Component_Props_PropsValue {

    navigationType: Navigation_dataPages_Maint__NavigationType_Enum

    constructor({ navigationType } : {
        navigationType: Navigation_dataPages_Maint__NavigationType_Enum
    }) {
        this.navigationType = navigationType
    }
}

/**
 *
 */
export interface Navigation_dataPages_Maint_Root_Component_Props {

    propsValue : Navigation_dataPages_Maint_Root_Component_Props_PropsValue
}

/**
 *
 */
interface Navigation_dataPages_Maint_Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class Navigation_dataPages_Maint_Root_Component extends React.Component< Navigation_dataPages_Maint_Root_Component_Props, Navigation_dataPages_Maint_Root_Component_State > {

    private _navigation_Entries_From_DOM: any //  Load in Constructor
    private _controllerPath_forCurrentPage: string //  Load in Constructor

    /**
     *
     */
    constructor(props: Navigation_dataPages_Maint_Root_Component_Props) {
        super(props);

        try {
            let page_navigation_links_data: any;
            {
                const page_navigation_links_data_jsonDOM = document.getElementById("page_navigation_links_data_json")
                if ( ! page_navigation_links_data_jsonDOM ) {
                    const msg = "No DOM element with id 'page_navigation_links_data_json'"
                    console.warn( msg )
                    throw Error( msg )
                }
                const page_navigation_links_data_jsonText = page_navigation_links_data_jsonDOM.innerText;
                try {
                    page_navigation_links_data = JSON.parse( page_navigation_links_data_jsonText );
                } catch (e) {
                    const msg = "Failed to parse JSON in DOM element with id 'page_navigation_links_data_json'.  JSON: " +
                        page_navigation_links_data_jsonText +
                        ".  Error msg: " + e;
                    console.warn( msg, e );
                    throw Error( msg )
                }
            }

            this._controllerPath_forCurrentPage = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

            let perSearchExperimentType; // per single search, multiple search, or experiment type

            if ( props.propsValue.navigationType == Navigation_dataPages_Maint__NavigationType_Enum.SINGLE_SEARCH
                || props.propsValue.navigationType === Navigation_dataPages_Maint__NavigationType_Enum.MULTIPLE_SEARCHES ) {

                perSearchExperimentType = page_navigation_links_data.single_search

            } else if ( props.propsValue.navigationType === Navigation_dataPages_Maint__NavigationType_Enum.EXPERIMENT ) {

                perSearchExperimentType = page_navigation_links_data.experiment

            } else {
                const msg = "NOT Single Search or Multiple Searches or Experiment. Should NOT get here.";
                console.warn( msg );
                throw Error( msg )
            }

            this._navigation_Entries_From_DOM = perSearchExperimentType.nav_entries; // entries per single search, multiple search, or experiment

        this.state = {};

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    static getDerivedStateFromError(error: any): Navigation_dataPages_Maint_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return {component_SubTree_Has_Error: true};
    }

    /**
     *
     */
    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'Navigation_dataPages_Maint_Root_Component'. componentDidCatch: ", error, errorInfo);
        // logErrorToMyService(error, errorInfo);
    }

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

            const navEntries : Array<JSX.Element> = [];

            for ( const navEntryObj of this._navigation_Entries_From_DOM ) {
                const navEntry = (
                    <Navigation_dataPages_SingleNavItem
                        key={ navEntryObj.label }
                        navigation_Entry_From_DOM={ navEntryObj }
                        controllerPath_forCurrentPage={ this._controllerPath_forCurrentPage }
                    />
                )
                navEntries.push( navEntry )
            }

            mainContent = (

                <span >
                    { navEntries }
                </span>
            )
        }

        return (
            <div style={ { marginTop: 16 } } >
                {( component_SubTree_ErrorMessage ) ? (
                    component_SubTree_ErrorMessage
                ) : (
                    mainContent
                )}
            </div>
        )
    }

}


/**
 *
 */
interface Navigation_dataPages_SingleNavItem_Props {

    navigation_Entry_From_DOM: any
    controllerPath_forCurrentPage: string
}

/**
 *
 */
interface Navigation_dataPages_SingleNavItem_State {

    _placeholder? : any
}

/**
 *
 */
class Navigation_dataPages_SingleNavItem extends React.Component< Navigation_dataPages_SingleNavItem_Props, Navigation_dataPages_SingleNavItem_State > {

    private _navLinkClicked_BindThis = this._navLinkClicked.bind(this);

    /**
     *
     */
    constructor(props: Navigation_dataPages_SingleNavItem_Props) {
        super(props);

        this.state = {};
    }

    ////////////////////////////////////////

    /**
     *
     */
    private _navLinkClicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        event.stopPropagation();
        event.preventDefault();

        //  Create URL Path to append to base page controller paths for links

        const windowPath = window.location.pathname;

        const windowPath_controllerPathIndex = windowPath.indexOf( this.props.controllerPath_forCurrentPage );
        const windowPath_after_controllerPathIndex = windowPath_controllerPathIndex + this.props.controllerPath_forCurrentPage.length;

        const windowPathAfterControllerPath = windowPath.substring( windowPath_after_controllerPathIndex );

        let pathAddition = windowPathAfterControllerPath;

        if ( ! windowPath.endsWith( _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR ) ) {

            pathAddition += _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR;
        }

        const nav_link_base_url = this.props.navigation_Entry_From_DOM.nav_link_base_url;

        const href = nav_link_base_url + pathAddition;

        if ( event.metaKey || event.ctrlKey ) {

            window.open( href, "_blank", "noopener" )
        } else {
            window.location.href = href;
        }
    }

    /**
     *
     */
    render() {

        if ( this.props.navigation_Entry_From_DOM.nav_link_base_url !== this.props.controllerPath_forCurrentPage ) {

            //  Not current page so render as link

            return (
                <React.Fragment>
                    <span>
                        [
                        <span className=" fake-link "
                            onClick={ this._navLinkClicked_BindThis }
                        >
                            {this.props.navigation_Entry_From_DOM.label}
                        </span>
                        ]
                    </span>
                    <span> </span>
                </React.Fragment>
            )
        }

        //  NOT have href so render as greyed out disabled

        return (
            <React.Fragment>
                    <span title="Current page" className=" gray-text ">
                        [
                        <span>
                            { this.props.navigation_Entry_From_DOM.label }
                        </span>
                        ]
                    </span>
                <span > </span>
            </React.Fragment>
        )

    }

}
