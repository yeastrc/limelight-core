/**
 * errorDisplay_WhenHave_Javascript_Typescript_Error.ts
 *
 * Display Message on Page when Javascript Error
 *
 *
 */

var hasUpdatedDOM = false; // So only update DOM once


export const errorDisplay_WhenHave_Javascript_Typescript_Error = function () {

    if ( ! hasUpdatedDOM ) {

        const html = '<div style="position: absolute; background-color: white; z-index: 10000; top:40px; left:40px; width:500px; padding: 10px; border-width: 5px; border-color: red; border-style: solid;" >'

            + '<h1 style="color: red;">Error in Page Code</h1>'

            + '<h3>Please reload the page and try again.</h3>'
            + '<h3>If this error continues to occur, please contact the person at the bottom of the page, if someone is listed there.</h3>'

            + '<br><br>'

            + '</div>';


        const addedDivElementDOM = document.createElement("div");

        const documentBody = document.querySelector('body');

        documentBody.appendChild( addedDivElementDOM );

        addedDivElementDOM.innerHTML = html

        // $("body").append(html);

        hasUpdatedDOM = true;
    }

    window.scroll(0, 0);  // scroll to top left, assuming message is in that corner
}
