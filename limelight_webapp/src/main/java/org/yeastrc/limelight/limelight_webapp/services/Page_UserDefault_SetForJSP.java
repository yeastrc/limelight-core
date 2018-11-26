package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;

/**
 * For Data Pages
 * 
 * User can set a default for a specific 
 *
 */
@Component
public class Page_UserDefault_SetForJSP implements Page_UserDefault_SetForJSP_IF {

	private static final Logger log = LoggerFactory.getLogger( Page_UserDefault_SetForJSP.class );
	
	@Autowired
	private DataPageSavedViewDAO_IF dataPageSavedViewDAO;
	
	/**
	 * @param controllerPath
	 * @param httpServletRequest
	 * @throws SQLException 
	 */
	@Override
	public void page_UserDefault_SetForJSP( String controllerPath, HttpServletRequest httpServletRequest ) throws SQLException {
		
		Object searchDataLookupParametersLookupJSONObject = httpServletRequest.getAttribute( WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON );
		if ( searchDataLookupParametersLookupJSONObject == null ) {
			String msg = "Request Attribute '" + WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON 
					+ "' does not contain object.";
			throw new LimelightInternalErrorException(msg);
		}
		if ( searchDataLookupParametersLookupJSONObject instanceof String )  {
		} else {
			String msg = "Request Attribute '" + WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON 
					+ "' contain object other than of type 'String'";
			throw new LimelightInternalErrorException(msg);
		}
		String searchDataLookupParametersLookupJSON = (String)searchDataLookupParametersLookupJSONObject;
	
		//  Set in DataPage_ProjectSearchIdBased_ControllersAccessControl_SpringHandlerInterceptor
		Object searchDataLookupParamsRootObject = httpServletRequest.getAttribute( WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS );
		if ( searchDataLookupParamsRootObject == null ) {
			String msg = "Request Attribute '" + WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS 
					+ "' does not contain object.";
			throw new LimelightInternalErrorException(msg);
		}
		if ( searchDataLookupParamsRootObject instanceof SearchDataLookupParamsRoot )  {
		} else {
			String msg = "Request Attribute '" + WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS 
					+ "' contain object other than of type 'SearchDataLookupParamsRoot'."
					+ "  searchDataLookupParametersLookupJSON: " + searchDataLookupParametersLookupJSON;
			throw new LimelightInternalErrorException(msg);
		}
		SearchDataLookupParamsRoot searchDataLookupParamsRoot = (SearchDataLookupParamsRoot) searchDataLookupParamsRootObject;
		
		SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
		List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();

		if ( paramsForProjectSearchIdsList.isEmpty() ) {
			
			String msg = "Request Attribute '" + WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS 
					+ "' contain object other than of type 'SearchDataLookupParamsRoot'."
					+ "  searchDataLookupParametersLookupJSON: " + searchDataLookupParametersLookupJSON;;
			throw new LimelightInternalErrorException(msg);
		}
		
		if ( paramsForProjectSearchIdsList.size() > 1 ) {
			
			//  > 1 project search id so cannot be default
			return;  //  EARLY EXIT
		}
		
		Integer projectSearchId = paramsForProjectSearchIdsList.get( 0 ).getProjectSearchId();
		
		String defaultURL = dataPageSavedViewDAO.getURL_ByProjectSearchIdControllerPath( projectSearchId, controllerPath );
		
		if ( StringUtils.isEmpty( defaultURL ) ) {

			//  No Default URL found
			return;  //  EARLY EXIT
		}
		
		httpServletRequest.setAttribute( WebConstants.REQUEST_DEFAULT_URL, defaultURL );
	}
}
