/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_FormatParseCodeString.SearchDataLookupParams_FormatParseCodeString_ParseResult;

/**
 * 
 *
 */
@Component
public class SearchDataLookupParams_GetProjectSearchIdsForCode implements SearchDataLookupParams_GetRecordForCodeIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_GetProjectSearchIdsForCode.class );

	@Autowired
	private SearchDataLookupParametersLookupDAO_IF searchDataLookupParametersLookupDAO;
	
	@Autowired
	private SearchDataLookupParams_FormatParseCodeString searchDataLookupParams_FormatParseCodeString;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetRecordForCodeIF#getSearchDataLookupParametersLookupDTO_RecordForCode(java.lang.String)
	 */
	@Override
	public SearchDataLookupParametersLookupDTO getSearchDataLookupParametersLookupDTO_RecordForCode( 
			String searchDataLookupParametersLookupCode ) throws SQLException {
		
		SearchDataLookupParams_FormatParseCodeString_ParseResult parseResult =
				searchDataLookupParams_FormatParseCodeString.parseCodeString( searchDataLookupParametersLookupCode );
		
		List<SearchDataLookupParametersLookupDTO> dbRecordList = 
				searchDataLookupParametersLookupDAO
				.getPartialFor_HashOfMainParams_HashCollisionIndex(
						parseResult.getHashOfParamsMD5Hex(), parseResult.getHashCollisionIndex() );
		
		if ( dbRecordList.isEmpty() ) {
			return null;  // EARLY EXIT
		}
		
		if ( dbRecordList.size() > 1 ) {
			String msg = "ERRROR: More than 1 record found for HashOfParamsMD5Hex: "
					+ parseResult.getHashOfParamsMD5Hex()
					+ ", HashCollisionIndex:" + parseResult.getHashCollisionIndex();
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		return dbRecordList.get( 0 );
	}
}
