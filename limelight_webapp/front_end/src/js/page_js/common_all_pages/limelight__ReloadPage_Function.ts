/**
 * limelight__ReloadPage_Function.ts
 */

/**
 * calls window.location.reload(true);
 */
export const limelight__ReloadPage_Function = function () {
    try {

        // @ts-ignore
        window.location.reload(true);

        //  call with param 'true' successful so return

        return  // EARLY RETURN

    } catch( e ) {
        //  eat exception
    }

    //  call with param 'true' failed so now call with no param

    window.location.reload();
}