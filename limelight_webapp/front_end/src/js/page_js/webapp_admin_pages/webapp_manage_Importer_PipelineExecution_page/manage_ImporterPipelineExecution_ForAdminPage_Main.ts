/**
 * manage_ImporterPipelineExecution_ForAdminPage_Main.ts
 *
 * Javascript for webappAdminManage_Importer_PipelineExecution.jsp page
 *
 */

import React from "react";
import { createRoot as createRoot_ReactDOM_Client } from "react-dom/client";

import {
    Manage_ImporterPipelineExecution_ForAdminPage_Root_Component,
    Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props
} from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Root_Component";

/**
 * Init
 *
 */
export const manage_ImporterPipelineExecution_ForAdminPage_Main_Init = function () {

    const containerDOMElement = document.getElementById("AdminPage_Root_Component");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'AdminPage_Root_Component'");
    }


    const manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props : Manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props = {

    }


    //  Create React component instance using React.createElement(...) so don't have to make this file .tsx
    const root_Component = (
        React.createElement(
            Manage_ImporterPipelineExecution_ForAdminPage_Root_Component,
            manage_ImporterPipelineExecution_ForAdminPage_Root_Component_Props,
            null
        )
    )

    const reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerDOMElement )

    reactRoot_InDOMElement.render( root_Component )
}

