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

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.constants.SearchDataLookupParams_VersionNumber;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.internal_objects_for_json.RootIdsObj;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

/**
 * Main Processing:
 * 
 *  create the "code" to return to represent this set of params
 *  
 *  Call SearchDataLookupParams_Save to save until successful for duplicate hash value
 *
 */
@Component
public class SearchDataLookupParams_MainProcessing implements SearchDataLookupParams_MainProcessingIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_MainProcessing.class );
	
	private static final String MESSAGE_DIGEST_TYPE_MD5 = "MD5";
	
	@Autowired
	private SearchDataLookupParams_Save_IF searchDataLookupParams_Save;

	@Autowired
	private SearchDataLookupParametersLookupDAO_IF searchDataLookupParametersLookupDAO;
	
	@Autowired
	private SearchDataLookupParams_FormatParseCodeString searchDataLookupParams_FormatCodeString;
	
	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessingIF#searchDataLookupParams_Save_Create_Code(org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot, org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes, java.lang.Integer, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo)
	 */
	@Override
	public String searchDataLookupParams_Save_Create_Code( SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			SearchDataLookupParametersLookupRootIdTypes searchDataLookupParametersLookupType,
			Integer singleProjectSearchIdCreatedDefaultsFor,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo ) throws SQLException {
		
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO =
				searchDataLookupParams_Save_ReturnObject( searchDataLookupParamsRoot, searchDataLookupParametersLookupType, singleProjectSearchIdCreatedDefaultsFor, searchDataLookupParams_CreatedByInfo );
		
		searchDataLookupParametersLookupDAO.updateLastAccessed( searchDataLookupParametersLookupDTO.getId() );
		
		String searchDataLookupParamsCode = 
				searchDataLookupParams_FormatCodeString.formatCodeString( 
						searchDataLookupParametersLookupDTO.getHashOfMainParams(),
						searchDataLookupParametersLookupDTO.getHashCollisionIndex() );
		
		return searchDataLookupParamsCode;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessingIF#searchDataLookupParams_Save_Create_Code(org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.input_params_from_web_app.SearchDataLookupParamsRoot, org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes, java.lang.Integer, org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo)
	 */
	
	@Override
	public SearchDataLookupParametersLookupDTO searchDataLookupParams_Save_ReturnObject( 
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			SearchDataLookupParametersLookupRootIdTypes searchDataLookupParametersLookupType,
			Integer singleProjectSearchIdCreatedDefaultsFor,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo ) throws SQLException {
		
		sortFilterAnnotationTypeEntries( searchDataLookupParamsRoot );
		
		RootIdsObj rootIdsObj = createRootIdsObj( searchDataLookupParamsRoot );
		
		String rootIdsObj_JSON = null;
		String searchDataLookupParamsRoot_JSON = null;
		String messageDigestHexString = null;
				
		try {
			rootIdsObj_JSON = marshalObjectToJSON.getJSONString( rootIdsObj );
			searchDataLookupParamsRoot_JSON = marshalObjectToJSON.getJSONString( searchDataLookupParamsRoot );

			messageDigestHexString = getMessageDigestHexStringForString( searchDataLookupParamsRoot_JSON );
		} catch ( Exception e ) {
			//  Wrap in unchecked exception
			throw new LimelightInternalErrorException( e );
		}
		
		Integer versionNumber = searchDataLookupParamsRoot.getVersionNumber();
		
		if ( versionNumber == null ) {
			throw new LimelightErrorDataInWebRequestException( "No Version Number" );
		}
		if ( versionNumber < SearchDataLookupParams_VersionNumber.MINIMUM_VERSION_NUMBER ) {
			throw new LimelightErrorDataInWebRequestException( "Version Number < minimum. versionNumber: " 
					+ versionNumber + ", minimum: " + SearchDataLookupParams_VersionNumber.MINIMUM_VERSION_NUMBER );
		}
		
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO =
				create_SearchDataLookupParametersLookupDTO( 
						rootIdsObj, 
						rootIdsObj_JSON, 
						searchDataLookupParamsRoot_JSON, 
						versionNumber,
						messageDigestHexString, 
						singleProjectSearchIdCreatedDefaultsFor,
						searchDataLookupParams_CreatedByInfo );
		
		save_IfNeeded_SearchDataLookupParametersLookupDTO_AndChildren__HandleDuplicateHashCodes( searchDataLookupParametersLookupDTO, rootIdsObj );

		searchDataLookupParametersLookupDAO.updateLastAccessed( searchDataLookupParametersLookupDTO.getId() );
		
		return searchDataLookupParametersLookupDTO;
	}
	
	/**
	 * @param searchDataLookupParamsRoot
	 */
	private void sortFilterAnnotationTypeEntries( SearchDataLookupParamsRoot searchDataLookupParamsRoot ) {
		
		SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
		if ( paramsForProjectSearchIds != null ) {
			 List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = paramsForProjectSearchIds.getParamsForProjectSearchIdsList();
			 if ( paramsForProjectSearchIdsList != null ) {
				 for ( SearchDataLookupParams_For_Single_ProjectSearchId paramsForProjectSearchId : paramsForProjectSearchIdsList ) {
					 if ( paramsForProjectSearchId.getPsmFilters() != null ) {
						 Collections.sort( paramsForProjectSearchId.getPsmFilters() ); // Sort on ann type id
					 }
					 if ( paramsForProjectSearchId.getReportedPeptideFilters() != null ) {
						 Collections.sort( paramsForProjectSearchId.getReportedPeptideFilters() ); // Sort on ann type id
					 }
					 if ( paramsForProjectSearchId.getMatchedProteinFilters() != null ) {
						 Collections.sort( paramsForProjectSearchId.getMatchedProteinFilters() ); // Sort on ann type id
					 }
				 }
			 }
		}
	}
	
	/**
	 * @param searchDataLookupParametersLookupDTO
	 * @param rootIdsObj
	 * @throws SQLException 
	 */
	private void save_IfNeeded_SearchDataLookupParametersLookupDTO_AndChildren__HandleDuplicateHashCodes( 
			SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO, 
			RootIdsObj rootIdsObj ) throws SQLException {
		
		RuntimeException savedRuntimeException = null;
		
		for ( int retryCounter = 0; retryCounter < 20; retryCounter++ ) {

			//  repeat until find a hashCollisionIndex that allows a successful save or retryCounter exceeds max
			
			//  Process records in DB with same hash string: 
			//     looking for matching lookupParametersJSONMainData
			//     getting max value of HashCollisionIndex

			List<SearchDataLookupParametersLookupDTO> searchDataLookupParametersLookupDTO_For_hashOfParamsMD5Hex_List =
					searchDataLookupParametersLookupDAO.getPartialForHashOfMainParams( searchDataLookupParametersLookupDTO.getHashOfMainParams() );

			int maxPrevHashCollisionIndex = 0;
			for ( SearchDataLookupParametersLookupDTO dbItem : searchDataLookupParametersLookupDTO_For_hashOfParamsMD5Hex_List ) {

				if ( searchDataLookupParametersLookupDTO.getLookupParametersJSONMainData().equals( dbItem.getLookupParametersJSONMainData() ) ) {
					
					if ( searchDataLookupParametersLookupDTO.getSingleProjectSearchIdDefaultValues() != null ) {
						
						if ( dbItem.getSingleProjectSearchIdDefaultValues() != null ) {
							
							if ( searchDataLookupParametersLookupDTO.getSingleProjectSearchIdDefaultValues() 
									!= dbItem.getSingleProjectSearchIdDefaultValues() ) {
								//  ERROR: The value of SingleProjectSearchIdDefaultValues is already set in the
								//         db but is different from the request.
								String msg = "The value of SingleProjectSearchIdDefaultValues is already set in the db but is different from the request.  dbItem value: "
										+ dbItem.getSingleProjectSearchIdDefaultValues()
										+ ", incoming value: "
										+ searchDataLookupParametersLookupDTO.getSingleProjectSearchIdDefaultValues();
								log.error( msg );
								throw new LimelightInternalErrorException(msg);
							}
						} else {
							//  DB not have value so update with SingleProjectSearchIdDefaultValues from incoming
							searchDataLookupParametersLookupDAO.updateSingleProjecSearchIdDefaultValues( 
									searchDataLookupParametersLookupDTO.getSingleProjectSearchIdDefaultValues(), 
									dbItem.getId() );
						}
						
					}
					
					//  Already in DB with same lookupParametersJSONMainData:
					//     Update local entry.HashCollisionIndex and return
					searchDataLookupParametersLookupDTO.setHashCollisionIndex( dbItem.getHashCollisionIndex() );
					searchDataLookupParametersLookupDAO.updateLastAccessed( searchDataLookupParametersLookupDTO.getId() );
					return; // EARLY EXIT
				}

				if ( dbItem.getHashCollisionIndex() > maxPrevHashCollisionIndex ) {
					maxPrevHashCollisionIndex = dbItem.getHashCollisionIndex();
				}
			}
			
			//  Set HashCollisionIndex on item to save to maxPrevHashCollisionIndex + 1;
			
			searchDataLookupParametersLookupDTO.setHashCollisionIndex( maxPrevHashCollisionIndex + 1 );

			//  Try to save it.
			
			try {
				searchDataLookupParams_Save.saveSearchDataLookupParametersLookupDTO_AndChildren( searchDataLookupParametersLookupDTO, rootIdsObj );
				
				//  Successful Save so return
				
				return;  //  EARLY EXIT
				
			} catch ( org.springframework.dao.DuplicateKeyException e ) {
				
				savedRuntimeException = e;
				
			} catch ( Exception e ) {
//				if ( e.toString() != null && ( ! e.toString().contains( "Duplicate" ) ) ) {

					// Other than Duplicate insert so rethrow the exception
					String msg = "Failed to save SearchDataLookupParametersLookupDTO and children.";
					log.error( msg, e );
					throw e;
//				}
			}
		}
		
		///  Prev return for found or saved
		
		String msg = "Failed to save SearchDataLookupParametersLookupDTO and children after retries.";
		log.error( msg, savedRuntimeException );
		throw savedRuntimeException;

	}
	
	/**
	 * @param rootIdsObj
	 * @param rootIdsObj_JSON
	 * @param searchDataLookupParamsRoot_JSON
	 * @param messageDigestHexString
	 * @param singleProjectSearchIdCreatedDefaultsFor
	 * @param searchDataLookupParams_CreatedByInfo
	 * @return
	 */
	private SearchDataLookupParametersLookupDTO create_SearchDataLookupParametersLookupDTO( 
			RootIdsObj rootIdsObj,
			String rootIdsObj_JSON,
			String searchDataLookupParamsRoot_JSON,
			int versionNumber,
			String messageDigestHexString,
			Integer singleProjectSearchIdCreatedDefaultsFor,
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo ) {
		
		SearchDataLookupParametersLookupRootIdTypes rootIdType = null;
		
		if ( rootIdsObj.getProjectSearchIds() != null ) {
			rootIdType = SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS;
		} else {
			String msg = "Unable to determine a value for SearchDataLookupParametersLookupRootIdTypes rootIdType.";
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO = new SearchDataLookupParametersLookupDTO();
		
		searchDataLookupParametersLookupDTO.setHashOfMainParams(messageDigestHexString );
		searchDataLookupParametersLookupDTO.setHashCollisionIndex( 1 );
		searchDataLookupParametersLookupDTO.setSingleProjectSearchIdDefaultValues( singleProjectSearchIdCreatedDefaultsFor );
		searchDataLookupParametersLookupDTO.setRootIdType( rootIdType );
		searchDataLookupParametersLookupDTO.setRootIdsOnlyJSON( rootIdsObj_JSON );
		searchDataLookupParametersLookupDTO.setLookupParametersJSONMainData( searchDataLookupParamsRoot_JSON );
		searchDataLookupParametersLookupDTO.setVersionNumber( versionNumber );
		searchDataLookupParametersLookupDTO.setCreatedByUserId( searchDataLookupParams_CreatedByInfo.getCreatedByUserId() );
		searchDataLookupParametersLookupDTO.setCreatedByUserType( searchDataLookupParams_CreatedByInfo.getCreatedByUserType() );
		searchDataLookupParametersLookupDTO.setCreatedByRemoteIP( searchDataLookupParams_CreatedByInfo.getCreatedByRemoteIP() );
		
		return searchDataLookupParametersLookupDTO;
	}

	
	/**
	 * @param searchDataLookupParamsRoot
	 * @return
	 */
	private RootIdsObj createRootIdsObj( SearchDataLookupParamsRoot searchDataLookupParamsRoot ) {
		
		RootIdsObj rootIdsObjJSON = new RootIdsObj();
		
		SearchDataLookupParams_For_ProjectSearchIds paramsForProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
		if ( paramsForProjectSearchIds != null ) {
			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = paramsForProjectSearchIds.getParamsForProjectSearchIdsList();
			if ( paramsForProjectSearchIdsList != null ) {
				List<Integer> projectSearchIds = new ArrayList<>( paramsForProjectSearchIdsList.size() );
				rootIdsObjJSON.setProjectSearchIds( projectSearchIds );
				for ( SearchDataLookupParams_For_Single_ProjectSearchId item : paramsForProjectSearchIdsList ) {
					projectSearchIds.add( item.getProjectSearchId() );
				}
			}
		}
		
		return rootIdsObjJSON;
	}
	
	
	/**
	 * @param string
	 * @return
	 */
	private String getMessageDigestHexStringForString( String string ) {
		
		byte[] stringAsBytes = string.getBytes( StandardCharsets.UTF_8 );

		MessageDigest messageDigest = null;
		try {
			messageDigest = MessageDigest.getInstance( MESSAGE_DIGEST_TYPE_MD5 );
		} catch (NoSuchAlgorithmException e) {
			String msg = "MessageDigest.getInstance(...) failed for type " + MESSAGE_DIGEST_TYPE_MD5;
			log.error( msg );
			throw new LimelightInternalErrorException( msg );
		}
		
		messageDigest.update( stringAsBytes );
		
		byte[] messageDigestResult = messageDigest.digest();
		
		//  Convert to Hex String.  if high hex char is '0', preserve it.
		
		String messageDigestResultHexString = hashBytesToHexString( messageDigestResult );
		
		return messageDigestResultHexString;
	}
	

	/**
	 * @param hashBytes
	 * @return
	 */
	private String hashBytesToHexString( byte[] hashBytes ) {

		StringBuilder hashBytesAsHexSB = new StringBuilder( hashBytes.length * 2 + 2 );

		for ( int i = 0; i < hashBytes.length; i++ ) {
			String byteAsHex = Integer.toHexString( Byte.toUnsignedInt( hashBytes[ i ] ) );
			if ( byteAsHex.length() == 1 ) {
				hashBytesAsHexSB.append( "0" ); //  Leading zero dropped by 'toHexString' so add here
			}
			hashBytesAsHexSB.append( byteAsHex );
		}

		String result = hashBytesAsHexSB.toString();

		return result;
		
		//  WAS - which is equivalent, except for the added "0" when a hex pair starts with "0"
		
		//convert the byte to hex format
//		StringBuffer sb = new StringBuffer("");
//		for (int i = 0; i < hashBytes.length; i++) {
//			sb.append(Integer.toString((hashBytes[i] & 0xff) + 0x100, 16).substring(1));
//		}
//		
//		String result = sb.toString();
//		
//		return result;
	}
	
	
}
