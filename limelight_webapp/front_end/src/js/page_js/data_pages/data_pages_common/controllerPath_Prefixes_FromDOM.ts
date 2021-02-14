/**
 * controllerPath_Prefixes_FromDOM.ts
 * 
 * Javascript:   Controller Path Prefixes, placed on DOM by server code
 * 
 * Controller Path Prefixes for Project Search Id Based AND Experiment Id Based
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

let controller_path_prefix_ProjectSearchId_Based_Cached: string = undefined;
let controller_path_prefix_ExperimentId_Based_Cached: string = undefined;

/**
 * Controller Path Prefix for ProjectSearchId Based, placed on DOM by server code
 */
const controller_path_prefix_ProjectSearchId_Based_FromDOM = function(): string {
    
    if ( controller_path_prefix_ProjectSearchId_Based_Cached ) {
        return controller_path_prefix_ProjectSearchId_Based_Cached;
    }

    const main_page_project_search_id_based_controller_path_prefix_DOM = document.getElementById("main_page_project_search_id_based_controller_path_prefix");
    if ( ! main_page_project_search_id_based_controller_path_prefix_DOM ) {
        throw Error( "No page element with id 'main_page_project_search_id_based_controller_path_prefix'.  main_page_project_search_id_based_controller_path_prefix is set on the JSP. " );
    }
    const main_page_project_search_id_based_controller_path_prefix  = main_page_project_search_id_based_controller_path_prefix_DOM.textContent;

    if ( main_page_project_search_id_based_controller_path_prefix === undefined || main_page_project_search_id_based_controller_path_prefix === null || main_page_project_search_id_based_controller_path_prefix === "" ) {
        throw Error( "Page element with id 'main_page_project_search_id_based_controller_path_prefix' not populated.  main_page_project_search_id_based_controller_path_prefix is set on the JSP." );
    }
    
    controller_path_prefix_ProjectSearchId_Based_Cached = main_page_project_search_id_based_controller_path_prefix;
    
    return controller_path_prefix_ProjectSearchId_Based_Cached;
}

/**
 * Controller Path Prefix for Experiment Id Based, placed on DOM by server code
 */
const controller_path_prefix_ExperimentId_Based_FromDOM = function() {
    
    if ( controller_path_prefix_ExperimentId_Based_Cached ) {
        return controller_path_prefix_ExperimentId_Based_Cached;
    }

    const main_page_experiment_id_based_controller_path_prefix_DOM = document.getElementById("main_page_experiment_id_based_controller_path_prefix");
    if ( ! main_page_experiment_id_based_controller_path_prefix_DOM ) {
        throw Error( "No page element with id 'main_page_experiment_id_based_controller_path_prefix'.  main_page_experiment_id_based_controller_path_prefix is set on the JSP. " );
    }
    const main_page_experiment_id_based_controller_path_prefix  = main_page_experiment_id_based_controller_path_prefix_DOM.textContent;
    
    controller_path_prefix_ExperimentId_Based_Cached = main_page_experiment_id_based_controller_path_prefix;
    
    return controller_path_prefix_ExperimentId_Based_Cached;
}


export { controller_path_prefix_ProjectSearchId_Based_FromDOM, controller_path_prefix_ExperimentId_Based_FromDOM }
