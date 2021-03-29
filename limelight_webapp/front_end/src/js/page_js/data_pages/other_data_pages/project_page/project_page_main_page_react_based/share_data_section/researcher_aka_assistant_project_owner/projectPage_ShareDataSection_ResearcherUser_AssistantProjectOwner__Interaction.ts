/**
 * project_page__share_data_section__researcher_user__assistant_project_owner___interaction.ts
 *
 * Javascript for projectView.jsp page
 *
 * Share Data Section - Provide interaction for Researcher (Assistant Project Owner)
 *
 *
 */




/**
 *
 */
export class ProjectPage_ShareDataSection_ResearcherUser_AssistantProjectOwner__Interaction {

    private _initializeCalled = false;

    constructor() {
    }

    initialize() {

        //  Get Controller Path for page

        const $controller_path = $("#controller_path");
        if ($controller_path.length === 0) {
            throw Error("No element with id: 'controller_path'");
        }
        const controller_path = $controller_path.text();

        //  Set URL Path before controller to span on page

        const pageURL = window.location.href

        const controllerStartIndex = pageURL.indexOf( controller_path );
        if ( controllerStartIndex === -1 ) {
            throw Error("Controller Path is not in Page URL.  Controller Path: " + controller_path + ", pageURL: " + pageURL );
        }
        const pageURL_BeforeControllerPath = pageURL.substring( 0, controllerStartIndex );

        const $share_data_project_label_page_controller_path_separator = $("#share_data_project_label_page_controller_path_separator");
        if ( $share_data_project_label_page_controller_path_separator.length === 0 ) {
            throw Error("No element with id: 'share_data_project_label_page_controller_path_separator'");
        }
        const share_data_project_label_page_controller_path_separator = $share_data_project_label_page_controller_path_separator.text();
        if ( share_data_project_label_page_controller_path_separator === undefined ||
            share_data_project_label_page_controller_path_separator === null ||
            share_data_project_label_page_controller_path_separator === "" ) {
            throw Error("element with id: 'share_data_project_label_page_controller_path_separator' contains empty string or returned null or undefined");
        }

        const $share_data_project_label_page_controller_path = $("#share_data_project_label_page_controller_path");
        if ( $share_data_project_label_page_controller_path.length === 0 ) {
            throw Error("No element with id: 'share_data_project_label_page_controller_path'");
        }
        const share_data_project_label_page_controller_path = $share_data_project_label_page_controller_path.text();
        if ( share_data_project_label_page_controller_path === undefined ||
            share_data_project_label_page_controller_path === null ||
            share_data_project_label_page_controller_path === "" ) {
            throw Error("element with id: 'share_data_project_label_page_controller_path' contains empty string or returned null or undefined");
        }
        const urlBase = pageURL_BeforeControllerPath + share_data_project_label_page_controller_path + share_data_project_label_page_controller_path_separator;

        const share_data_project_label_project_short_labelDOM = document.getElementById("share_data_project_label_project_short_label");
        if ( ! share_data_project_label_project_short_labelDOM ) {
            throw Error("No DOM element with id 'share_data_project_label_project_short_label'");
        }

        let share_data_project_label_project_short_label_Inside_HTML_BODY_Tags : string = null;

        {
            const innerText = share_data_project_label_project_short_labelDOM.innerText

            const domparser = new DOMParser()

            try {
                const doc = domparser.parseFromString(innerText, "text/html")

                const body = doc.body;

                share_data_project_label_project_short_label_Inside_HTML_BODY_Tags = body.innerText;

            } catch (e) {
                // Not parsable Value so exit
                return null; // EARLY EXIT
            }
        }
        try {
            share_data_project_label_project_short_labelDOM.remove();
        } catch (e) {
            // swallow any exception
        }

        let currentProjectURL : string = undefined;

        if ( share_data_project_label_project_short_label_Inside_HTML_BODY_Tags === "" ) {
            currentProjectURL = window.location.href;
        } else {
            currentProjectURL = urlBase + share_data_project_label_project_short_label_Inside_HTML_BODY_Tags;
        }

        const share_data_project_url_value_spanDOM = document.getElementById("share_data_project_url_value_span");
        if ( ! share_data_project_url_value_spanDOM ) {
            throw Error("No DOM element with id 'share_data_project_url_value_span'")
        }
        share_data_project_url_value_spanDOM.innerText = currentProjectURL;

        const share_data_project_url_container_divDOM = document.getElementById("share_data_project_url_container_div");
        if ( ! share_data_project_url_container_divDOM ) {
            throw Error("No DOM element with id 'share_data_project_url_container_div'")
        }
        share_data_project_url_container_divDOM.style.display = "";  // change from "none"

    }
}