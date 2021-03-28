
/**
 * limelight__header_main_pages__logged_in_user_Setup.ts
 *
 * Code for set up  Main Pages Header - Logged In Users : for header_main_pages.jsp
 */

import {limelight__header_main_pages__LoggedInUser_PopulateProjects_After_Delay} from "page_js/header_main_pages/header_main_pages__logged_in_user/limelight__header_main_pages__logged_in_user_PopulateProjects";
import {limelight__header_main_pages__LoggedInUser_Setup_Show_Hide_Project_List_OverlayMenu} from "page_js/header_main_pages/header_main_pages__logged_in_user/limelight__header_main_pages__logged_in_user_Setup_Show_Hide_Project_List_OverlayMenu";

/**
 *
 */
const limelight__header_main_pages__LoggedInUser_Setup = function () {

    window.setTimeout( () => {
        try {
            set_ProjectsDiv_Position();

            {
                //  To ALWAYS show the Projects List overlay for formatting work:
                //
                //  UnComment the contents of this block
                //  Comment out call to   limelight__header_main_pages_Setup_Show_Hide_Project_List_OverlayMenu();

                // Get DOM element that will contain the Project Lists Overlay fake tooltip

                // const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                // if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                //     console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");
                //
                //     return; // EARLY RETURN
                // }
                // //  TODO  TEMP  Keep Project List overlay visible on page load
                // header_projects_list_dropdown_outer_containerDOM.style.display = "block";
            }

            //  TODO  TEMP Comment Out
            limelight__header_main_pages__LoggedInUser_Setup_Show_Hide_Project_List_OverlayMenu();

            limelight__header_main_pages__LoggedInUser_PopulateProjects_After_Delay();

        } catch (e) {
            console.warn( "Exception in limelight__header_main_pages logged in users js: ", e );
            //  swallow exceptions
        }
    }, 50 );
}

/**
 * Set Absolute position of <div> that will hold Project List to below the "Projects" label in the Header Section
 *
 * Required since cannot extend below a CSS grid using position absolute and z-index
 */
const set_ProjectsDiv_Position = function () {

    //  Get DOM element positioned below the "Projects" label
    const header_projects_list_position_reference_divDOM = document.getElementById("header_projects_list_position_reference_div")
    if ( ! header_projects_list_position_reference_divDOM ) {
        console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_position_reference_div");

        return; // EARLY RETURN
    }

    // Get DOM element that will be absolute at the position of the previous div
    const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
    if ( ! header_projects_list_dropdown_outer_containerDOM ) {
        console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

        return; // EARLY RETURN
    }

    const left_Shift = -4;
    const top_Shift = 2;

    const header_projects_list_position_reference_div_BoundingClientRect = header_projects_list_position_reference_divDOM.getBoundingClientRect();
    const header_projects_list_position_reference_div_LEFT = Math.round( header_projects_list_position_reference_div_BoundingClientRect.left ) + left_Shift;
    const header_projects_list_position_reference_div_TOP = Math.round( header_projects_list_position_reference_div_BoundingClientRect.top ) + top_Shift;

    header_projects_list_dropdown_outer_containerDOM.style.left = header_projects_list_position_reference_div_LEFT + "px";
    header_projects_list_dropdown_outer_containerDOM.style.top = header_projects_list_position_reference_div_TOP + "px";

}

limelight__header_main_pages__LoggedInUser_Setup()

export { limelight__header_main_pages__LoggedInUser_Setup }

