/**
 * limelight__header_main_pages__all_users_Setup.ts
 *
 * Code for set up  Main Pages Header - ALL Users  : for header_main_pages.jsp
 */

const signIn_URL = "user/login?useDefaultURL=yes"

/**
 *
 */
const limelight__header_main_pages__AllUsers_Setup = function () {

    window.setTimeout( () => {
        try {
            const signin_header_linkDOM = document.getElementById("signin_header_link");
            if ( signin_header_linkDOM ) {
                //  signin_header_linkDOM is not set if DOM element is not on page which occurs when user is logged in

                signin_header_linkDOM.addEventListener( "click", (event) =>{
                    event.preventDefault();
                    event.stopPropagation();

                    if ( event.metaKey || event.ctrlKey ) {

                        window.open( signIn_URL, "_blank" );

                    } else {
                        window.location.href = signIn_URL;
                    }
                })
            }



        } catch (e) {
            console.warn( "Exception in limelight__header_main_pages all users js: ", e );
            //  swallow exceptions
        }
    }, 50 );
}

limelight__header_main_pages__AllUsers_Setup();
