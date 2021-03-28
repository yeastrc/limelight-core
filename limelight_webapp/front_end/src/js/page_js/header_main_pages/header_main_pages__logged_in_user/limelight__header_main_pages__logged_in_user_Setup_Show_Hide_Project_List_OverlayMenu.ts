
/**
 * limelight__header_main_pages__logged_in_user_Setup_Show_Hide_Project_List_OverlayMenu.ts
 *
 * Code for Main Pages Header: for header_main_pages.jsp
 *
 * Show/Hide the Project List Overlay Menu
 */

/**
 *
 */
const limelight__header_main_pages__LoggedInUser_Setup_Show_Hide_Project_List_OverlayMenu = function () {

    window.setTimeout( () => {
        try {
            {
                const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                if (!header_projects_list_dropdown_outer_containerDOM) {
                    // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                    return; // EARLY RETURN
                }
                header_projects_list_dropdown_outer_containerDOM.addEventListener( 'mouseenter', event => {

                    const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                    if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                        // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                        return; // EARLY RETURN
                    }

                    // console.log("header_projects_outer_containerDOM: mouseenter")

                    header_projects_list_dropdown_outer_containerDOM.style.display = "block";
                } );

                header_projects_list_dropdown_outer_containerDOM.addEventListener( 'mouseleave', event => {

                    const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                    if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                        // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                        return; // EARLY RETURN
                    }

                    // console.log("header_projects_outer_containerDOM: mouseenter")

                    header_projects_list_dropdown_outer_containerDOM.style.display = "none";
                } );
            }
            const header_projects_outer_containerDOM = document.getElementById("header_projects_outer_container")
            if ( ! header_projects_outer_containerDOM ) {
                // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_outer_container'");

                return; // EARLY RETURN
            }
            const header_projects_linkDOM = document.getElementById("header_projects_link")
            if ( ! header_projects_linkDOM ) {
                // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_link'");

                return; // EARLY RETURN
            }

            header_projects_outer_containerDOM.addEventListener( 'mouseenter', event => {

                const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                    // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                    return; // EARLY RETURN
                }

                // console.log("header_projects_outer_containerDOM: mouseenter")

                header_projects_list_dropdown_outer_containerDOM.style.display = "block";
            } );
            header_projects_outer_containerDOM.addEventListener( 'mouseleave', event => {

                const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                    // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                    return; // EARLY RETURN
                }

                // console.log("header_projects_outer_containerDOM: mouseleave")

                header_projects_list_dropdown_outer_containerDOM.style.display = "none";
            } );

            {
                // Eat Inner mouseleave events

                const header_projects_inner_containerDOM = document.getElementById("header_projects_inner_container")
                if ( ! header_projects_inner_containerDOM ) {
                    // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_inner_container'");

                    return; // EARLY RETURN
                }

                header_projects_inner_containerDOM.addEventListener( 'mouseleave', event => {

                    // console.log("header_projects_inner_containerDOM: mouseleave")
                } );

                const header_projects_list_position_reference_divDOM = document.getElementById("header_projects_list_position_reference_div")
                if ( ! header_projects_list_position_reference_divDOM ) {
                    // console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_position_reference_div'");

                    return; // EARLY RETURN
                }

                header_projects_list_position_reference_divDOM.addEventListener( 'mouseleave', event => {

                    // console.log("header_projects_list_position_reference_divDOM: mouseleave")
                } );

            }
        } catch (e) {
            console.warn( "Exception in limelight__header_main_pages_js: ", e );
            //  swallow exceptions
        }
    }, 10 );
}

export { limelight__header_main_pages__LoggedInUser_Setup_Show_Hide_Project_List_OverlayMenu }

