
/**
 * limelight__header_main_pages_PopulateProjects.ts
 *
 * Code for Main Pages Header: for header_main_pages.jsp
 *
 * Populate the Projects drop down
 */

let timeoutId = undefined

/**
 *
 */
const limelight__header_main_pages_PopulateProjects_After_Delay = function () {

    timeoutId = window.setTimeout( () => {
        try {
            timeoutId = null

            const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
            if ( ! header_projects_list_dropdown_outer_containerDOM ) {
                console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                return; // EARLY RETURN
            }
            limelight__header_main_pages_PopulateProjects()

        } catch (e) {
            console.warn( "Exception in limelight__header_main_pages_js: ", e );
            //  swallow exceptions
        }
    }, 10 );
}

/**
 *
 */
const limelight__header_main_pages_PopulateProjects = function () {
    try {
        if ( timeoutId ) {
            window.clearTimeout( timeoutId )
        }
        timeoutId = null

        const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
        if (!header_projects_list_dropdown_outer_containerDOM) {
            console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

            return; // EARLY RETURN
        }

        const promise_fetch = fetch('d/pgf/project-list-for-main-page-header-drop-down')

        promise_fetch.catch( reason => {
            console.warn("fetch reject. reason: ", reason)
        })
        promise_fetch.then( response => {
            try {
                console.log("fetch response.ok: ", response.ok)
                console.log("fetch response.status: ", response.status)

                if ( ! response.ok ) {

                    console.warn("fetch response.ok is not true. response.ok : ", response.ok)

                    const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                    if (header_projects_list_dropdown_outer_containerDOM) {
                        console.warn("fetch response.ok is not true. Removing DOM element with id 'header_projects_list_dropdown_outer_container'");

                        header_projects_list_dropdown_outer_containerDOM.remove();
                    }

                    return; // EARLY RETURN
                }

                const response_text = response.text()

                if ( ! response_text ) {
                    console.warn("response.text() returned nothing")
                }

                response_text.catch( reason => {
                    console.warn("response.text() reject: ", reason)
                })
                response_text.then( value => {

                    const header_projects_list_dropdown_outer_containerDOM = document.getElementById("header_projects_list_dropdown_outer_container")
                    if (!header_projects_list_dropdown_outer_containerDOM) {
                        console.log("limelight__header_main_pages_PopulateProjects: Exit populate. No DOM element with id 'header_projects_list_dropdown_outer_container'");

                        return; // EARLY RETURN
                    }

                    header_projects_list_dropdown_outer_containerDOM.innerHTML = value

                })


            } catch (e) {
                console.warn("Exception in limelight__header_main_pages_js: ", e);
                //  swallow exceptions
            }
        })

    } catch (e) {
        console.warn("Exception in limelight__header_main_pages_js: ", e);
        //  swallow exceptions
    }
}

export { limelight__header_main_pages_PopulateProjects_After_Delay }

