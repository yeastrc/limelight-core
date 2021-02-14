/**
 * lorikeetSpectrumViewer_CreateURL.ts
 *
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 *
 * Used on data pages and also used on Lorikeet page when switch PSM to display
 *
 */
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";

let main_page_lorikeet_page_controller_path: string = undefined;

/**
 * 
 */
const lorikeetSpectrumViewer_CreateURL = function({ projectSearchId, psmId, openModPosition } : {projectSearchId:number, psmId:number, openModPosition:OpenModPosition_DataType}) {

    if ( ! main_page_lorikeet_page_controller_path ) {
        const main_page_lorikeet_page_controller_pathDOMElement = document.getElementById("main_page_lorikeet_page_controller_path");
        if ( ! main_page_lorikeet_page_controller_pathDOMElement ) {
            throw Error("No DOM element with id 'main_page_lorikeet_page_controller_path'");
        }
        main_page_lorikeet_page_controller_path = main_page_lorikeet_page_controller_pathDOMElement.innerText;
    }

    let url = main_page_lorikeet_page_controller_path + "/ps/" + projectSearchId + "/psm/" + psmId;
    if(openModPosition !== undefined && openModPosition !== null) {
        url += '?openmod-position=' + openModPosition;
    }

    return url;
}


export { lorikeetSpectrumViewer_CreateURL }
