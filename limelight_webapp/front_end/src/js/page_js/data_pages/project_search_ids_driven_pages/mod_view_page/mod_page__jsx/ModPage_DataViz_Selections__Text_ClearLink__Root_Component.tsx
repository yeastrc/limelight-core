/**
 * ModPage_DataViz_Selections__Text_ClearLink__Root_Component.tsx
 * 
 * Display User selections IN the Graphic showing the Searches and the mods.
 * "Clear Selections" Link
 */

import React from "react";
import ReactDOM from "react-dom";

import {
    ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component,
    ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


/**
 *
 */
export const removeFrom_DOM__ModPage_DataViz_Selections__Text_ClearLink__Root_Component = function () : void {

    const data_viz_selections__text_and_clear_link__outer_container_DOM = document.getElementById("data_viz_selections__text_and_clear_link__outer_container")
    if ( ! data_viz_selections__text_and_clear_link__outer_container_DOM ) {
        const msg = "NO DOM element with id 'data_viz_selections__text_and_clear_link__outer_container'"
        console.warn(msg)

        return
    }

    ReactDOM.unmountComponentAtNode( data_viz_selections__text_and_clear_link__outer_container_DOM )
}

/**
 *
 * @param propsValue
 */
export const render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component = function (
    {
        propsValue
    } : {
        propsValue : ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop
    }
) : void {


    const container_DOM = document.getElementById("data_viz_selections__text_and_clear_link__outer_container")
    if ( ! container_DOM ) {
        const msg = "NO DOM element with id 'data_viz_selections__text_and_clear_link__outer_container'"
        console.warn(msg)

        return
    }


    const props: ModPage_DataViz_Selections__Text_ClearLink__Root_Component_Props = {
        propsValue: propsValue
    }

    const component =
        React.createElement(
            ModPage_DataViz_Selections__Text_ClearLink__Root_Component,
            props,
            null
        )

    ReactDOM.render(
        component,
        container_DOM,
        () => {  try {

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 *
 */
export interface ModPage_DataViz_Selections__Text_ClearLink__Root_Component_Props {

    propsValue : ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component_Props_Prop
}

/**
 *
 */
interface ModPage_DataViz_Selections__Text_ClearLink__Root_Component_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class ModPage_DataViz_Selections__Text_ClearLink__Root_Component extends React.Component< ModPage_DataViz_Selections__Text_ClearLink__Root_Component_Props, ModPage_DataViz_Selections__Text_ClearLink__Root_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ModPage_DataViz_Selections__Text_ClearLink__Root_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : ModPage_DataViz_Selections__Text_ClearLink__Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ModPage_DataViz_Selections__Text_ClearLink__Root_Component'. componentDidCatch: ", error, errorInfo );
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
                <ModPage_DataViz_Selections__Text_ClearLink__MainContent_Component
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

