/**
 * keep_UserSession_AliveIfExists_OnServer_WebserviceCall.ts
 *
 * AJAX Call to server to keep User Session Alive if exists
 *
 *
 */

/**
 * JavaScript directive:   all variables have to be declared with "var", maybe other things
 */
"use strict";

export class Keep_UserSession_AliveIfExists_OnServer_Result {

	readonly userIsLoggedIn : boolean;
	readonly webserviceSyncTracking_Code_Invalid : boolean;
}

/**
 *
 */
export const keep_UserSession_AliveIfExists_OnServer_WebserviceCall = function() : Promise<Keep_UserSession_AliveIfExists_OnServer_Result> {

	return new Promise<Keep_UserSession_AliveIfExists_OnServer_Result>( ( resolve, reject ) => {
		try {
			var userAgent = "unknown";

			if ( window.navigator ) {

				if ( window.navigator.userAgent ) {

					userAgent = window.navigator.userAgent
				}
			}

			var browserURL = window.location.href;

			var requestObj = { fdajklweRWOIUOPOP : true,
				userAgent : userAgent,
				browserURL : browserURL
			};

			var requestData = JSON.stringify( requestObj );

			var _URL = "d/rws/for-page/user-session-keep-alive-if-exists";

			//   Not calling webserviceCallStandardPost since webservice does not support URL in format "/" + webserviceSyncTrackingCode

//				var request =
			// @ts-ignore
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: "application/json; charset=utf-8",
				dataType : "json",
				success : function(data) {

					let userIsLoggedIn = false;
					let webserviceSyncTracking_Code_Invalid = false;

					if ( data.userIsLoggedIn  ) {
						userIsLoggedIn = true;
					}
					if ( data.webserviceSyncTracking_Code_Invalid  ) {
						webserviceSyncTracking_Code_Invalid = true;
					}

					const result : Keep_UserSession_AliveIfExists_OnServer_Result = {

						userIsLoggedIn,
						webserviceSyncTracking_Code_Invalid
					}

					resolve( result );
				},
				failure: function(errMsg) {

					console.log("AJAX failure in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), errMsg: " + errMsg );

					reject();
				},
				error : function(jqXHR, textStatus, errorThrown) {

					console.log("AJAX error in keep_UserSession_AliveIfExists_OnServer_WebserviceCall(), textStatus: " + textStatus );

					reject();
				}
			});

		} catch( e ) {

			console.log("Exception in keep_UserSession_AliveIfExists_OnServer_WebserviceCall()");
		}
	});
}
