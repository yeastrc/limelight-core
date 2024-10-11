/**
 * EveryPageCommon.ts
 * 
 * Javascript Common on every page   
 * 
 * 
 */

//  New module format with 'const' for constant
const _AJAX_POST_JSON_CONTENT_TYPE = "application/json; charset=utf-8";

//  Header for sending value from getWebserviceSyncTrackingCode()
const LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM = "limelight_webservice_sync_tracking_code"  //  Keep in sync with server side


let webservice_sync_tracking_code = undefined;

let getWebserviceSyncTrackingCode = function() {
	
	if ( ! webservice_sync_tracking_code ) {
		const domElement = document.getElementById( "webservice_sync_tracking_code" )
		if ( ! domElement ) {
			throw Error("No DOM element for id 'webservice_sync_tracking_code'")
		}
		webservice_sync_tracking_code = domElement.innerText;
	}
	return webservice_sync_tracking_code;
}

export { _AJAX_POST_JSON_CONTENT_TYPE, LIMELIGHT_WEBSERVICE_SYNC_TRACKING_CODE__HEADER_PARAM, getWebserviceSyncTrackingCode };
