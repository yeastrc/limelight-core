package org.yeastrc.limelight.limelight_webapp.constants;

public class WebServiceErrorMessageConstants {

	public static final String WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_TEXT = "webservice_sync_tracking_code_mismatch_text";
	public static final org.springframework.http.HttpStatus WEBSERVICE_SYNC_TRACKING_CODE_MISMATCH_STATUS_CODE = 
			org.springframework.http.HttpStatus.BAD_REQUEST;
	
	public static final String NO_SESSION_TEXT = "no_session";
	public static final org.springframework.http.HttpStatus NO_SESSION_STATUS_CODE = org.springframework.http.HttpStatus.UNAUTHORIZED;
	
	public static final String FORBIDDEN_TEXT = "forbidden";
	public static final org.springframework.http.HttpStatus FORBIDDEN_STATUS_CODE = org.springframework.http.HttpStatus.FORBIDDEN;
	
	public static final String INVALID_SEARCH_LIST_ACROSS_PROJECTS_TEXT = "invalid_search_list_across_projects_text";
	public static final org.springframework.http.HttpStatus INVALID_SEARCH_LIST_ACROSS_PROJECTS_STATUS_CODE = 
			org.springframework.http.HttpStatus.FORBIDDEN;

//	public static final String INVALID_SEARCH_LIST_NOT_IN_DB_TEXT = "invalid_search_list_not_in_db_text";
//	public static final org.springframework.http.HttpStatus INVALID_SEARCH_LIST_NOT_IN_DB_STATUS_CODE = 
//			org.springframework.http.HttpStatus.BAD_REQUEST;
	
	public static final String INVALID_PARAMETER_TEXT = "invalid_parameter";
	public static final org.springframework.http.HttpStatus INVALID_PARAMETER_STATUS_CODE = 
			org.springframework.http.HttpStatus.BAD_REQUEST;
	
	public static final String INTERNAL_SERVER_ERROR_TEXT = "INTERNAL_SERVER_ERROR";
	public static final org.springframework.http.HttpStatus INTERNAL_SERVER_ERROR_STATUS_CODE = 
			org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
	
}
