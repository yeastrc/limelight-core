/**
 * project_OrganizeSearches_ROOT.ts
 *
 * Javascript Root launch for project-organize-searches-view.jsp page
 *
 * Organize Searches Page
 *
 * Root Code
 *
 */


import React from "react";

import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";

import {
    Project_OrganizeSearches_ROOT_Component,
    Project_OrganizeSearches_ROOT_Component_Props
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_ROOT_Component";
import {Project_OrganizeSearches_Main_Component_Props_Prop} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_Main_Component";

{
    //  Create Root React component and put in the DOM

    let windowPath = window.location.pathname;

    let lastIndexOfSlash = windowPath.lastIndexOf( "/" );

    if ( lastIndexOfSlash === -1 ) {
        throw Error("No Project Identifier in URL. windowPath: " + windowPath );
    }

    let projectIdentifier = windowPath.substring( lastIndexOfSlash + 1 );

    let controller_path_ThisPage: string
    {
        const controller_pathDOM = document.getElementById("controller_path");
        if ( ! controller_pathDOM ) {
            throw Error("No DOM element with id 'controller_path'")
        }
        controller_path_ThisPage = controller_pathDOM.innerText;
    }

    let controller_path_project_page: string
    {
        const controller_path_project_pageDOM = document.getElementById("controller_path_project_page");
        if ( ! controller_path_project_pageDOM ) {
            throw Error("No DOM element with id 'controller_path_project_page'")
        }
        controller_path_project_page = controller_path_project_pageDOM.innerText;
    }

    const propsValue : Project_OrganizeSearches_Main_Component_Props_Prop = {
        projectIdentifier, controller_path_ThisPage, controller_path_project_page
    }

    const props : Project_OrganizeSearches_ROOT_Component_Props = {
        propsValue
    }

    const projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component = (
        React.createElement(
            Project_OrganizeSearches_ROOT_Component,
            props,
            null
        )
    );

    const containerDOMElement = document.getElementById("page_main_component_root_component_container");

    if ( ! containerDOMElement ) {
        const msg = "No DOM element with id 'page_main_component_root_component_container'";
        console.warn(msg);
        throw Error(msg);
    }

    const reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerDOMElement )

    reactRoot_InDOMElement.render( projectPage_ScanFiles_View_Section_AllUsers_InclPublicUser_Interaction_ROOT_Component )
}
