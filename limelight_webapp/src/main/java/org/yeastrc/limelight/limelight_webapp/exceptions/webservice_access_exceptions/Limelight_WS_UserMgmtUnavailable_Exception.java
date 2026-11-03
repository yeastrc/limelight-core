package org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.yeastrc.limelight.limelight_webapp.constants.WebServiceErrorMessageConstants;

/**
 * Webservice Error Response
 * 
 * Thrown when a call to User Mgmt (the account service) failed, for a web service that has no message of its own for it.
 * 
 * The front end (handleServicesAJAXErrors.ts) shows a fixed message for this status and message.
 * 
 * Used by Spring to generate a HTTP response to the caller
 *
 */
@ResponseStatus( 
		value = org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE, 
		reason = WebServiceErrorMessageConstants.USER_MGMT_UNAVAILABLE_TEXT )

public class Limelight_WS_UserMgmtUnavailable_Exception extends Limelight_WS_ErrorResponse_Base_Exception {

	private static final long serialVersionUID = 1L;

}
