/**
 * navigation_dataPages_Maint_Component.tsx
 *
 * Component of Data Page Navigation links at top of data pages
 *
 */

import React from 'react'

export class Navigation_dataPages_Maint_Entry {
    label : string
    href : string
    constructor({ label, href } : {
        label : string
        href : string
    }) {
        this.label = label
        this.href = href
    }
}

/**
 *
 */
export class Navigation_dataPages_Maint_Root_Component_Props_PropsValue {

    navEntries : Array<Navigation_dataPages_Maint_Entry>

    constructor({ navEntries } : {
        navEntries : Array<Navigation_dataPages_Maint_Entry>
    }) {
        this.navEntries = navEntries
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

    /**
     *
     */
    constructor(props: Navigation_dataPages_Maint_Root_Component_Props) {
        super(props);

        this.state = {};
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

            for ( const navEntryObj of this.props.propsValue.navEntries ) {
                const navEntry = (
                    <Navigation_dataPages_SingleNavItem
                        key={ navEntryObj.label }
                        navEntry={ navEntryObj }
                    />
                )
                navEntries.push( navEntry )
            }

            mainContent = (

                <span >{ navEntries }</span>
            )
        }

        return (
            ( component_SubTree_ErrorMessage ) ? (
                    component_SubTree_ErrorMessage
                ) : (
                    mainContent
                )
        )

    }

}


/**
 *
 */
interface Navigation_dataPages_SingleNavItem_Props {

    navEntry : Navigation_dataPages_Maint_Entry
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
    render() {

        return (
            <React.Fragment>
                <span >
                    [
                    <a href={ this.props.navEntry.href }>
                        { this.props.navEntry.label }
                    </a>
                    ]
                </span>
                <span > </span>
            </React.Fragment>
        )

    }

}
