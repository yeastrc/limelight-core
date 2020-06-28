/**
 * lorikeetSpectrumViewer_CreateURL.ts
 * 
 * Javascript for Creating the URL to open Lorikeet Viewer in it's own window
 * 
 * Used on data pages and also used on Lorikeet page when switch PSM to display
 * 
 */

 let main_page_lorikeet_page_controller_path = undefined;

/**
 * 
 */
const lorikeetSpectrumViewer_CreateURL = function({ projectSearchId, psmId }) {

    if ( ! main_page_lorikeet_page_controller_path ) {
        const main_page_lorikeet_page_controller_pathDOMElement = document.getElementById("main_page_lorikeet_page_controller_path");
        if ( ! main_page_lorikeet_page_controller_pathDOMElement ) {
            throw Error("No DOM element with id 'main_page_lorikeet_page_controller_path'");
        }
        main_page_lorikeet_page_controller_path = main_page_lorikeet_page_controller_pathDOMElement.innerText;
    }

    const url = main_page_lorikeet_page_controller_path + "/ps/" + projectSearchId + "/psm/" + psmId;

    return url;
}


export { lorikeetSpectrumViewer_CreateURL }
