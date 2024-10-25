/**
 * projectPage_ProjectSection_AllUsersInclPublic_Interaction.ts
 */

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";

/**
 *
 */
export class ProjectPage_ProjectSection_AllUsersInclPublic_Interaction {

    private _block_CurrentlyShown = true  //  Default in JSP

    /**
     *
     */
    initialize() {
        {
            const DOMElement = document.getElementById( "project_page_project_info_block_hide_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_hide_link'" )
            }
            DOMElement.addEventListener("click", (eventObject) => { try {
                eventObject.stopPropagation()
                this._hideBlock()
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }})
        }
        {
            const DOMElement = document.getElementById( "project_page_project_info_block_show_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_show_link'" )
            }
            DOMElement.addEventListener("click", (eventObject) => { try {
                eventObject.stopPropagation()
                this._showBlock()
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }})
        }


        {
            const DOMElement = document.getElementById( "project_page_project_info_block_label_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_label_link'" )
            }
            DOMElement.addEventListener("click", (eventObject) => { try {
                eventObject.stopPropagation()
                this._blockLabel_Clicked()
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }})
        }
    }

    private _blockLabel_Clicked() {

        if ( this._block_CurrentlyShown ) {
            this._hideBlock()
        } else {
            this._showBlock()
        }
    }

    private _hideBlock() {

        this._block_CurrentlyShown = false

        {
            const DOMElement = document.getElementById( "project_page_project_info_block_hide_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_hide_link'" )
            }
            DOMElement.style.display = "none"
        }
        {
            const DOMElement = document.getElementById( "project_page_project_info_block_show_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_show_link'" )
            }
            DOMElement.style.display = ""
        }
        { // Block to Show/Hide
            const DOMElement = document.getElementById( "project_page_project_info_block_element_to_show_hide" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_element_to_show_hide'" )
            }
            DOMElement.style.display = "none"
        }

    }

    private _showBlock() {

        this._block_CurrentlyShown = true

        {
            const DOMElement = document.getElementById( "project_page_project_info_block_show_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_show_link'" )
            }
            DOMElement.style.display = "none"
        }
        {
            const DOMElement = document.getElementById( "project_page_project_info_block_hide_link" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_hide_link'" )
            }
            DOMElement.style.display = ""
        }
        { // Block to Show/Hide
            const DOMElement = document.getElementById( "project_page_project_info_block_element_to_show_hide" )
            if ( ! DOMElement ) {
                throw Error( "NO DOM element with id 'project_page_project_info_block_element_to_show_hide'" )
            }
            DOMElement.style.display = ""
        }

    }
}