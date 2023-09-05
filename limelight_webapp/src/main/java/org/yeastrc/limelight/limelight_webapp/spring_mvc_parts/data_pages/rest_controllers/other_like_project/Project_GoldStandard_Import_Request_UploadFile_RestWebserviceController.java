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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.input.CountingInputStream;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_DTO;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_SingleEntry_DTO;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_SingleEntry_Unique_ModMass_DTO;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileContents_DTO;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileStats_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json.GoldStandard_Data_Root_Data_JSON_V001;
import org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json.GoldStandard_Data_Root_Data_JSON_V001.GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001;
import org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json.GoldStandard_Data_Root_Data_JSON_V001.GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001;
import org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json.GoldStandard_Data_Root_Data_JSON_V001.GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001;
import org.yeastrc.limelight.limelight_shared.gold_standard_data.db_json_fields_json.GoldStandard_Data_Root_Data_JSON_V001.GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_ForScanFile_Root_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_SingleEntry_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_SingleEntry_Unique_ModMass_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_UploadedFileContents_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_UploadedFileStats_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 *  Gold Standard -  Import Gold Standard for the selected scan file given the uploaded file.
 *  
 */
@RestController
public class Project_GoldStandard_Import_Request_UploadFile_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_GoldStandard_Import_Request_UploadFile_RestWebserviceController.class );

	private static final int BUFFER_SIZE = 1 * 1024; // * 1024 * 1024; //  1MB

	private static final String SHA_384_ALGORITHM = "SHA-384";
	private static final String SHA_1_ALGORITHM = "SHA1";
		
	//  Keep all these Strings in sync with the Javascript AJAX Send:

	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON = "limelight_upload_file_params_json";

	//  Keep all these Strings in sync with the Submit Program Send:
	
//	private static final String UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;

	@Autowired
	private ProjectDAO_IF projectDAO;
	
	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;
	
	@Autowired
	private GoldStandard_ForScanFile_Root_DAO_IF goldStandard_ForScanFile_Root_DAO;
	
	@Autowired
	private GoldStandard_UploadedFileStats_DAO_IF goldStandard_UploadedFileStats_DAO;
	
	@Autowired
	private GoldStandard_SingleEntry_DAO_IF goldStandard_SingleEntry_DAO;
	
	@Autowired
	private GoldStandard_SingleEntry_Unique_ModMass_DAO_IF goldStandard_SingleEntry_Unique_ModMass_DAO;
			
	@Autowired
	private GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF goldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO;
	
	@Autowired
	private GoldStandard_UploadedFileContents_DAO_IF goldStandard_UploadedFileContents_DAO;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
	/////////////////////////////////////////////////////

	//   Separate called methods for From Web App and From Submit Program since local code is managing the parsing the request and serializing the response 
	
	//  Convert result object graph to JSON or XML in byte[] in the controller body so can cache it

	//     From Web App JSON
	
	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = { 
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PROJECT__GOLD_STANDARD_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_OCTET_STREAM_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod_JSON(

//			//  No @RequestBody since the POST body will be read in this method and copied to a local file
//			//  @RequestBody byte[] postBody,
//
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    
		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs


		//    			String requestURL = httpServletRequest.getRequestURL().toString();

		String uploadFileParamsJSON = httpServletRequest.getHeader( UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON );

		if ( StringUtils.isEmpty( uploadFileParamsJSON ) ) {
			log.warn( "'" + UPLOAD_FILE_HEADER_PARAMETER_PARAMS_WEB_JSON + "' header parameter is not sent or is empty" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		WebserviceRequestDataInHeader webserviceRequestHeaderContents = 
				unmarshalJSON_ToObject.getObjectFromJSONString( uploadFileParamsJSON, WebserviceRequestDataInHeader.class );
		

		if ( StringUtils.isEmpty( webserviceRequestHeaderContents.projectIdentifier ) ) {
			log.warn( "webserviceRequestHeaderContents.projectIdentifier is empty or not assigned" );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		int projectId = 0;
		try {
			projectId = Integer.parseInt( webserviceRequestHeaderContents.projectIdentifier );

		} catch ( RuntimeException e ) {
			log.warn( "Project Identifier not parsable to int: " + webserviceRequestHeaderContents.projectIdentifier );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}

		List<Integer> projectIds = new ArrayList<>( 1 );
		projectIds.add( projectId );

		//  Restrict access to Project owners or above (admin), if project was not locked
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
				validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
				.validateProjectOwnerAllowed( projectIds, httpServletRequest );

		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result.getUserSession();
		if ( userSession == null ) {
			throw new LimelightInternalErrorException( "userSession should not be null" );
		}
		Integer userId = userSession.getUserId();
		if ( userId == null ) {
			throw new LimelightInternalErrorException( "userId should not be null" );
		}
		
		WebserviceResponse webserviceResponse = 
				webserviceMethod_Internal( webserviceRequestHeaderContents, projectId, userId, httpServletRequest );
    	
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResponse );

		return ResponseEntity.ok().contentType( MediaType.APPLICATION_JSON ).body( responseAsJSON );
    }
    
	/**
	 *  
	 * 
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceResponse webserviceMethod_Internal( 
			
			WebserviceRequestDataInHeader webserviceRequestHeaderContents, 
			int projectId,
			int userId,
			HttpServletRequest httpServletRequest ) throws Exception {
		
		
		//  allData is a generated JSON of all the data
		
		boolean allData_OutputStream__AddFirstEntry = true;
		
		ByteArrayOutputStream allData_ByteArrayOutputStream = new ByteArrayOutputStream( httpServletRequest.getContentLength() );
		
		GZIPOutputStream allData_OutputStream_GZIP = new GZIPOutputStream( allData_ByteArrayOutputStream );
		
		{
			//  Making JSON manually so can GZIP it as create it
			
			final String allData_JSONContents_Start_String = 
					"{"  
					// Property 'versionNumber':
					+ "\""	+ GoldStandard_Data_Root_Data_JSON_V001.ROOT_PROPERTY__versionNumber + "\":" 
					+ GoldStandard_Data_Root_Data_JSON_V001.VERSION_NUMBER
					+ ","
					
					// Property 'singleEntry_List' Start:
					+ "\""	+ GoldStandard_Data_Root_Data_JSON_V001.ROOT_PROPERTY__singleEntry_List + "\":[";
			
			byte[] allData_JSONContents_Start_ByteArray = allData_JSONContents_Start_String.getBytes( StandardCharsets.US_ASCII );
			
			allData_OutputStream_GZIP.write( allData_JSONContents_Start_ByteArray );
		}
		
		WebserviceResponse webserviceResponse = new WebserviceResponse();


		//  Confirm projectId is in database
		ProjectDTO projectDTO =	projectDAO.getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( projectId );
		if ( projectDTO == null ) {
			// should never happen
			String msg = "Project id is not in database " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		if ( ( ! projectDTO.isEnabled() ) || ( projectDTO.isMarkedForDeletion() ) ) {
			String msg = "Project id is disabled or marked for deletion: " + projectId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		if ( ( projectDTO.isProjectLocked() ) ) {
			String msg = "Project id is locked: " + projectId;
			log.warn( msg );
			webserviceResponse.statusSuccess = false;
			webserviceResponse.projectLocked = true;
			// webserviceResponse.setStatusFail_ErrorMessage( "Unable to upload to this project as it is Locked." );
			return webserviceResponse;  //  EARLY EXIT
		}
		
		Project_ScanFile_DTO project_ScanFile_DTO = projectScanFileDAO.getById( webserviceRequestHeaderContents.projectScanFileId );
		if ( project_ScanFile_DTO == null ) {
			String msg = "projectScanFileId is not in database " + webserviceRequestHeaderContents.projectScanFileId;
			log.warn( msg );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		///////////
		

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		
		jacksonJSON_Mapper.setSerializationInclusion(Include.NON_NULL); //  NOT output properties with value: null
		
		
		///////////
		
		GoldStandard_ForScanFile_Root_DTO goldStandard_ForScanFile_Root_DTO = new GoldStandard_ForScanFile_Root_DTO();
		goldStandard_ForScanFile_Root_DTO.setScanFileId( project_ScanFile_DTO.getScanFileId() );
		goldStandard_ForScanFile_Root_DTO.setEntryFullyInserted(false);
		goldStandard_ForScanFile_Root_DTO.setCreatedBy_UserId(userId);
		goldStandard_ForScanFile_Root_DTO.setUpdatedBy_UserId(userId);
		
		goldStandard_ForScanFile_Root_DAO.save( goldStandard_ForScanFile_Root_DTO );
		
		List<GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001> singleEntry_GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001_List = new ArrayList<>();
		

		long httpRequest_ContentLengthInHeader = httpServletRequest.getContentLengthLong();

		//  Read InputStream containing POST body 
		{
			long totalBytesCopied = 0;
			boolean fileTooLarge = false;
			
			MessageDigest messageDigest_SHA_1_Of_StreamContents = MessageDigest.getInstance(SHA_1_ALGORITHM);
			MessageDigest messageDigest_SHA_384_Of_StreamContents = MessageDigest.getInstance(SHA_384_ALGORITHM);
			
			try ( InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream() ) {

				BufferedInputStream bis = new BufferedInputStream( inputStreamFromPOSTLocal, BUFFER_SIZE );
			
				CountingInputStream countingInputStream = new CountingInputStream(bis);
				
				
				DigestInputStream digestInputStream_SHA_1 = new DigestInputStream( countingInputStream, messageDigest_SHA_1_Of_StreamContents );
				DigestInputStream digestInputStream_SHA_384 = new DigestInputStream( digestInputStream_SHA_1, messageDigest_SHA_384_Of_StreamContents );

				InputStreamReader inputStreamReader_ASCII = new InputStreamReader(digestInputStream_SHA_384, StandardCharsets.US_ASCII );
				
				try ( BufferedReader bufferedReader = new BufferedReader(inputStreamReader_ASCII) ) {
	
					
					Set<Integer> scanNumbers_Processed = new HashSet<>();
	
					int lineNumber = 0;
					
					String line = null;
	
					//  Process Lines before Main Content Lines
	
					while ( ( line = bufferedReader.readLine() ) != null ) {
						
						lineNumber++;
						
	//					if ( countingInputStream.getByteCount() > XXX ) {
	//						//  Uploaded file too large
	//						
	//						ssss;
	//					}
						
						if ( line.startsWith( "#" ) ) {
						
							//  Comment so skip line
							continue; // EARLY CONTINUE
						}
	
						if ( line.length() == 0 ) {
						
							//  Empty line so skip line
							continue; // EARLY CONTINUE
						}
	
						int scanNumber = -1;
						String peptideSequence_String = null;
						String modifications_Overall = null;
	
						{
							String[] lineSplitOnComma = line.split( "," );
	
							if ( lineSplitOnComma.length < 3 ) {
								String msg = "Line split on comma ',' does not contain 3 parts.  Line Number: " + lineNumber + ", line contents: " + line;
								log.warn(msg);
								webserviceResponse.statusSuccess = false;
								webserviceResponse.errorMessage = msg;
								
								return webserviceResponse;  // EARLY RETURN
							}
	
							String scanNumber_String = lineSplitOnComma[ 0 ];
	
							peptideSequence_String = lineSplitOnComma[ 1 ];
							modifications_Overall = lineSplitOnComma[ 2 ];
							
							try {
								scanNumber = Integer.parseInt( scanNumber_String );
							} catch ( NumberFormatException e ) {
								String msg = "Scan Number is not parsable as integer.  Line Number: " + lineNumber + ", scan number: " + scanNumber_String + ", line contents: " + line;
								log.warn(msg);
								webserviceResponse.statusSuccess = false;
								webserviceResponse.errorMessage = msg;
								
								return webserviceResponse;  // EARLY RETURN
	
							} catch ( Throwable t ) {
								String msg = "Scan Number is not parsable as integer.  Line Number: " + lineNumber + ", scan number: " + scanNumber_String + ", line contents: " + line;
								log.warn(msg);
								webserviceResponse.statusSuccess = false;
								webserviceResponse.errorMessage = msg;
								
								return webserviceResponse;  // EARLY RETURN
							}
							
							if ( ! scanNumbers_Processed.add( scanNumber ) ) {
								
								String msg = "Scan Number is on more than one line.  Line Number: " + lineNumber + ", scan number: " + scanNumber + ", line contents: " + line;
								log.warn(msg);
								webserviceResponse.statusSuccess = false;
								webserviceResponse.errorMessage = msg;
								
								return webserviceResponse;  // EARLY RETURN
							}

							GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 variable_AND_Open_Modification_Root_Data_JSON_Data = null;

							{  //  Modifications

								INTERNAL__Parse_Variable_AND_Open_Modifications_Overall_Result parse_Variable_Modifications_Overall_Result = 
										parse_Variable_AND_Open_Modifications_Overall( modifications_Overall, peptideSequence_String.length(), lineNumber );

								if ( parse_Variable_Modifications_Overall_Result.errorMessage != null ) {
									webserviceResponse.statusSuccess = false;
									webserviceResponse.errorMessage = parse_Variable_Modifications_Overall_Result.errorMessage;

									return webserviceResponse;  // EARLY RETURN
								}
								variable_AND_Open_Modification_Root_Data_JSON_Data = parse_Variable_Modifications_Overall_Result.result;
							}

							GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001 goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001 = new GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001();

							singleEntry_GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001_List.add(goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001);
							
							goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001.setSn(scanNumber);
							goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001.setPs(peptideSequence_String);
							goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001.setM(variable_AND_Open_Modification_Root_Data_JSON_Data);
							
							String goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001_JSON_String = jacksonJSON_Mapper.writeValueAsString( goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001 );

							if ( allData_OutputStream__AddFirstEntry ) {
								allData_OutputStream__AddFirstEntry = false;
							} else {
								allData_OutputStream_GZIP.write( ",".getBytes( StandardCharsets.US_ASCII ) ); // Add comma separator
							}

							allData_OutputStream_GZIP.write( goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001_JSON_String.getBytes( StandardCharsets.US_ASCII ) );
							
							
							////////
														
							GoldStandard_SingleEntry_DTO goldStandard_SingleEntry_DTO = new GoldStandard_SingleEntry_DTO();
							goldStandard_SingleEntry_DTO.setGoldStandard_ForScanFile_Root_Id( goldStandard_ForScanFile_Root_DTO.getId() );
							goldStandard_SingleEntry_DTO.setScanNumber(scanNumber);
							goldStandard_SingleEntry_DTO.setPeptideSequence(peptideSequence_String);
							goldStandard_SingleEntry_DTO.setScanNumber_PeptideSequence_Mods_JSON( goldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001_JSON_String );
							goldStandard_SingleEntry_DTO.setScanNumber_PeptideSequence_Mods_JSON_VersionNumber( GoldStandard_Data_Root_Data_JSON_V001.VERSION_NUMBER );
							
							goldStandard_SingleEntry_DAO.save( goldStandard_SingleEntry_DTO );
							
							//   Mods Unique
							
							if ( variable_AND_Open_Modification_Root_Data_JSON_Data != null && variable_AND_Open_Modification_Root_Data_JSON_Data.getE() != null && ( ! variable_AND_Open_Modification_Root_Data_JSON_Data.getE().isEmpty() ) ) {
								
								Set<Double> modMasses_UniqueSet = new HashSet<>( variable_AND_Open_Modification_Root_Data_JSON_Data.getE().size() + 5 );
								
								for ( GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 singleModificationAndPositions : variable_AND_Open_Modification_Root_Data_JSON_Data.getE() ) {
									
									modMasses_UniqueSet.add( singleModificationAndPositions.getM() );
								}
								
								for ( Double modMass : modMasses_UniqueSet ) {
									
									GoldStandard_SingleEntry_Unique_ModMass_DTO item = new GoldStandard_SingleEntry_Unique_ModMass_DTO();
									item.setGoldStandard_SingleEntry_Id( goldStandard_SingleEntry_DTO.getId() );
									item.setModificationMass_Unique(modMass);
									
									goldStandard_SingleEntry_Unique_ModMass_DAO.save(item);
								}
							}
						}
					}

				}


				String sha1_Of_PostBody = null;
				String sha384_Of_PostBody = null;

				{  // sha1_Of_PostBody
					byte[] mdbytes = digestInputStream_SHA_1.getMessageDigest().digest();

					//convert the byte to hex format
					StringBuffer sb = new StringBuffer("");
					for (int i = 0; i < mdbytes.length; i++) {
						sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
					}

					sha1_Of_PostBody = sb.toString();
				}

				{  // sha384_Of_PostBody
					byte[] hashBytes = digestInputStream_SHA_384.getMessageDigest().digest();

					StringBuilder hashBytesAsHexSB = new StringBuilder( hashBytes.length * 2 + 2 );

					for ( int i = 0; i < hashBytes.length; i++ ) {
						String byteAsHex = Integer.toHexString( Byte.toUnsignedInt( hashBytes[ i ] ) );
						if ( byteAsHex.length() == 1 ) {
							hashBytesAsHexSB.append( "0" ); //  Leading zero dropped by 'toHexString' so add here
						}
						hashBytesAsHexSB.append( byteAsHex );
					}

					sha384_Of_PostBody = hashBytesAsHexSB.toString();
					

					GoldStandard_UploadedFileStats_DTO goldStandard_UploadedFileStats_DTO = new GoldStandard_UploadedFileStats_DTO();
					goldStandard_UploadedFileStats_DTO.setGoldStandard_ForScanFile_Root_Id( goldStandard_ForScanFile_Root_DTO.getId() );
					goldStandard_UploadedFileStats_DTO.setUploadedFile_Sha1_Sum(sha1_Of_PostBody);
					goldStandard_UploadedFileStats_DTO.setUploadedFile_Sha384_zero_in_second_digit(sha384_Of_PostBody);
					goldStandard_UploadedFileStats_DTO.setUploadedFilename( webserviceRequestHeaderContents.filename );
					goldStandard_UploadedFileStats_DTO.setUploadedFileSize( httpServletRequest.getContentLength() );
					goldStandard_UploadedFileStats_DTO.setCreatedBy_UserId(userId);
					goldStandard_UploadedFileStats_DTO.setUpdatedBy_UserId(userId);
					
					goldStandard_UploadedFileStats_DAO.save( goldStandard_UploadedFileStats_DTO );
				}
			
			}
//			if ( fileTooLarge ) {
//				
//				//  Return Error -  Status Code 400
//				webserviceResult.setStatusSuccess(false);
//				webserviceResult.setFileSizeLimitExceeded( true );
//				webserviceResult.setMaxSize( webserviceMethod_Internal_Params.maxFileSize );
//				webserviceResult.setMaxSizeFormatted( webserviceMethod_Internal_Params.maxFileSizeFormatted );
//
//				methodResults.returnBadRequestStatusCode = true;
//
//				//  EARLY RETURN
//				return methodResults;
//			}
			
			

			allData_OutputStream_GZIP.write( "]}".getBytes( StandardCharsets.US_ASCII ) );
			
			allData_OutputStream_GZIP.close();
			
			byte[] generatedJSON_TEMP_GZIP_ByteArray = allData_ByteArrayOutputStream.toByteArray();
			
			GoldStandard_UploadedFileContents_DTO goldStandard_UploadedFileContents_DTO = new GoldStandard_UploadedFileContents_DTO();
			goldStandard_UploadedFileContents_DTO.setGoldStandard_ForScanFile_Root_Id( goldStandard_ForScanFile_Root_DTO.getId() );
			goldStandard_UploadedFileContents_DTO.setFileContents_GZIP(generatedJSON_TEMP_GZIP_ByteArray);
			goldStandard_UploadedFileContents_DTO.setCreatedBy_UserId(userId);
			goldStandard_UploadedFileContents_DTO.setUpdatedBy_UserId(userId);
			
			goldStandard_UploadedFileContents_DAO.save( goldStandard_UploadedFileContents_DTO );
			
			//  ONLY for validation of generated JSON
			
			ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream( generatedJSON_TEMP_GZIP_ByteArray );
			
			GZIPInputStream allData_InputStream_UnGZIP = new GZIPInputStream(byteArrayInputStream);
			
			String generatedJSON_TEMP_String = new String( generatedJSON_TEMP_GZIP_ByteArray, StandardCharsets.US_ASCII );
			
			GoldStandard_Data_Root_Data_JSON_V001 goldStandard_Data_Root_Data_JSON_V001 = jacksonJSON_Mapper.readValue( allData_InputStream_UnGZIP, GoldStandard_Data_Root_Data_JSON_V001.class );
			
			int z = 0;
			
		}
				
		goldStandard_ForScanFile_Root_DAO.set_True_EntryFullyInserted( goldStandard_ForScanFile_Root_DTO.getId(), userId );
		
		{
			GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO mappingItem = new GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DTO();
			mappingItem.setGoldStandard_ForScanFile_Root_Id( goldStandard_ForScanFile_Root_DTO.getId() );
			mappingItem.setProjectScanFileId( webserviceRequestHeaderContents.projectScanFileId );
			mappingItem.setDisplayLabel( webserviceRequestHeaderContents.displayLabel );
			mappingItem.setDescription( webserviceRequestHeaderContents.description );
			mappingItem.setCreatedBy_UserId( userId );
			mappingItem.setUpdatedBy_UserId( userId );
			
			goldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO.save( mappingItem );
		}

				
		webserviceResponse.statusSuccess = true;
		
				
		return webserviceResponse;
	}
	
	/**
	 * @param variable_OR_Open_Modifications_Overall
	 * @return
	 */
	private INTERNAL__Parse_Variable_AND_Open_Modifications_Overall_Result parse_Variable_AND_Open_Modifications_Overall( 
			
			String variable_OR_Open_Modifications_Overall, 
			int peptideLength,
			int lineNumber
			) {
		
		INTERNAL__Parse_Variable_AND_Open_Modifications_Overall_Result methodResult = new INTERNAL__Parse_Variable_AND_Open_Modifications_Overall_Result();
		

		GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 goldStandard_Variable_Open_Modification_Root_Data_JSON_V001 = new GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001();
		
		if ( StringUtils.isNotEmpty( variable_OR_Open_Modifications_Overall ) ) {

			String[] variable_OR_Open_Modifications_Overall_Split = variable_OR_Open_Modifications_Overall.split( ";" );

			List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List = new ArrayList<>( variable_OR_Open_Modifications_Overall_Split.length );
			
			Map<Double, List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001>> 
			goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List__Map_Key_ModificatonMass = 
			new HashMap<>( variable_OR_Open_Modifications_Overall_Split.length );


			for ( String massEntry : variable_OR_Open_Modifications_Overall_Split ) {


				String massEntry_Trimmed = massEntry.trim();
				
				if ( StringUtils.isNotEmpty( massEntry_Trimmed ) ) {
					
					GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 = new GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001();

					String modmass_String = null;
					String mod_Positions_Trimmed = null;
					
					int leftBracePosition = massEntry_Trimmed.indexOf( "{" );
					if ( leftBracePosition == -1 ) {
						//  NO left brace so only mod mass
						modmass_String = massEntry_Trimmed;
					} else {
						
						if ( ! massEntry_Trimmed.endsWith( "}" ) ) {
							
							String msg = "modification mass contains '{' but not ends with '}'. modification mass entry '" + massEntry_Trimmed + "'.  Line Number: " + lineNumber;
							methodResult.errorMessage = msg;
							
							return methodResult; // EARLY RETURN
						}
						
						modmass_String = massEntry_Trimmed.substring(0, leftBracePosition);
						
						mod_Positions_Trimmed = massEntry_Trimmed.substring( leftBracePosition + 1, massEntry_Trimmed.length() -1 ).trim();
					}
					
					double modMass = 0;
					
					try {
						modMass = Double.parseDouble(modmass_String);
					} catch (Throwable t ) {
						String msg = "Failed to parse modification mass '" + modmass_String + "'.  Line Number: " + lineNumber;
						methodResult.errorMessage = msg;
						
						return methodResult; // EARLY RETURN
					}

					goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001.setM( modMass );
					
					Set<Integer> positionList_OfNumbers_FirstAsSet = new HashSet<>();  //  Position List (First Set) of Numbers.  For positions that are a single number (No Range or 'n' or 'c')
					List<GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001> positionList = new ArrayList<>();
					
					if ( mod_Positions_Trimmed != null && ( ! "N/A".equals( mod_Positions_Trimmed ) ) && ( ! "n/a".equals( mod_Positions_Trimmed ) ) ) {
						
						//  Have a value for Mod Positions that is NOT "N/A" or "n/a"
				
						String[] mod_Positions_Split_Colon_ForEntries = mod_Positions_Trimmed.split( ":" );
						
						for ( String mod_Positions_Split_Colon_Entry : mod_Positions_Split_Colon_ForEntries ) {
							
							String mod_Positions_Split_Colon_Entry_Trimmed = mod_Positions_Split_Colon_Entry.trim();
							
							String[] mod_Positions_Split_Hyphen_ForRange = mod_Positions_Split_Colon_Entry_Trimmed.split( "-" );
							if ( mod_Positions_Split_Hyphen_ForRange.length > 1 ) {
								//  Position Range
	
								if ( mod_Positions_Split_Hyphen_ForRange.length > 2 ) {	
	
									String msg = "modification positions cannot have more than one '-'.  Mod Positions: '" + mod_Positions_Trimmed + "'.  Line Number: " + lineNumber;
									methodResult.errorMessage = msg;
	
									return methodResult; // EARLY RETURN
								}
	
								String positionRange_Start_String = mod_Positions_Split_Hyphen_ForRange[ 0 ].trim();
								String positionRange_End_String = mod_Positions_Split_Hyphen_ForRange[ 1 ].trim();
	
	
								int positionRange_Start = 0;
								int positionRange_End = 0;
	
								try {
									positionRange_Start = Integer.parseInt(positionRange_Start_String);
								} catch (Throwable t ) {
									String msg = "Failed to parse modification position range start '" + positionRange_Start_String + "'.  Line Number: " + lineNumber;
									methodResult.errorMessage = msg;
	
									return methodResult; // EARLY RETURN
								}
								try {
									positionRange_End = Integer.parseInt(positionRange_End_String);
								} catch (Throwable t ) {
									String msg = "Failed to parse modification position range end '" + mod_Positions_Split_Colon_Entry_Trimmed + "'.  Line Number: " + lineNumber;
									methodResult.errorMessage = msg;
	
									return methodResult; // EARLY RETURN
								}
								
								if ( positionRange_Start > positionRange_End ) {
									String msg = "Modification position range start cannot be larger than range end '" + mod_Positions_Split_Colon_Entry_Trimmed + "'.  Line Number: " + lineNumber;
									methodResult.errorMessage = msg;
	
									return methodResult; // EARLY RETURN
								}

								GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 positionEntry = new GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001();
								positionList.add(positionEntry);
						
								positionEntry.setPs( positionRange_Start );
								positionEntry.setPe( positionRange_End ); 
	
							} else {
								//  One Position
								
								if ( "n".equals( mod_Positions_Split_Colon_Entry_Trimmed ) ) {

									GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 positionEntry = new GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001();
									positionList.add(positionEntry);
							
									positionEntry.setPn( true );
									positionEntry.setP( 1 );
									
								 } else if ( "c".equals( mod_Positions_Split_Colon_Entry_Trimmed ) ) {

									 GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 positionEntry = new GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001();
									 positionList.add(positionEntry);

									 positionEntry.setPc( true );
									 positionEntry.setP( peptideLength );
									
								 } else {
									 
									 int position = 0;
	
									 try {
										 position = Integer.parseInt(mod_Positions_Split_Colon_Entry_Trimmed);
									 } catch (Throwable t ) {
										 String msg = "Failed to parse modification position '" + mod_Positions_Split_Colon_Entry_Trimmed + "'.  Line Number: " + lineNumber;
										 methodResult.errorMessage = msg;
	
										 return methodResult; // EARLY RETURN
									 }
									 
									 if ( ! positionList_OfNumbers_FirstAsSet.add( position ) ) {
										 String msg = "Duplicate modification position '" + mod_Positions_Split_Colon_Entry_Trimmed + "'.  Line Number: " + lineNumber;
										 methodResult.errorMessage = msg;
	
										 return methodResult; // EARLY RETURN
									 }
								 }
							}
						}
					}
					
					if ( ! positionList_OfNumbers_FirstAsSet.isEmpty() ) {
						List<Integer> positionList_OfNumbers = new ArrayList<>( positionList_OfNumbers_FirstAsSet );
						Collections.sort( positionList_OfNumbers );
						goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001.setPln(positionList_OfNumbers);
					}
					if ( ! positionList.isEmpty() ) {
						goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001.setPl(positionList);
					}
					
					//  Compare to itself for overlapping positions
					if ( this._has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001(
							goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001,
							goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 ) ) {

						String msg = "A modification mass entry or entries with the same modification mass cannot contain overlapping positions. One of modification mass entry(s) '" + massEntry_Trimmed + "'.  Line Number: " + lineNumber;
						methodResult.errorMessage = msg;

						return methodResult; // EARLY RETURN
					}
					
					//  Add new entry to main List
					goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List.add(goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001);

					
					{  //  Cross validation with other entries with same modification mass
						List<GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap = 
								goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List__Map_Key_ModificatonMass.get( goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001.getM() );
						if ( goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap == null ) {
							goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap = new ArrayList<>();
							goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List__Map_Key_ModificatonMass.put(
									goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001.getM(), goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap );
						}
						
						for ( GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_ListEntry_InMap : goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap ) {

							if ( this._has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001(
									goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_ListEntry_InMap,
									goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 ) ) {

								String msg = "A modification mass entry or entries with the same modification mass cannot contain overlapping positions. One of modification mass entry(s) '" + massEntry_Trimmed + "'.  Line Number: " + lineNumber;
								methodResult.errorMessage = msg;
								
								return methodResult; // EARLY RETURN
							}
						}
						
						//  Add new Entry to List in Map
						goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List_InMap.add( goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 );
					}
				}
			}
			
			if ( ! goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List.isEmpty() ) {
				goldStandard_Variable_Open_Modification_Root_Data_JSON_V001.setE(goldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001_List);
			}

		}
		
		if ( goldStandard_Variable_Open_Modification_Root_Data_JSON_V001.getE() != null 
				&& ( ! goldStandard_Variable_Open_Modification_Root_Data_JSON_V001.getE().isEmpty() ) ) {
		
			methodResult.result = goldStandard_Variable_Open_Modification_Root_Data_JSON_V001;
		}
		
		return methodResult;
	}

	/**
	 * 
	 * @param entry_A
	 * @param entry_B
	 * @return true if overlapping positions
	 */
	private boolean _has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001(
			
			GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 entry_A,
			GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 entry_B
			) {
		
		if ( this._has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001__SubCompare( entry_A, entry_B ) 
				|| this._has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001__SubCompare( entry_B, entry_A ) ) {
			
			return true;
		}
		
		return false;
	}
	
	/**
	 * Called from method _compare_ForOverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001(...)
	 * 
	 * Will be called with A,B then B,A so no need to fully cross compare here
	 * 
	 * 
	 * @param entry_A
	 * @param entry_B
	 * @return true if overlapping positions
	 */
	private boolean _has_OverlappingPositions_GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001__SubCompare(
			
			GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 entry_A,
			GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 entry_B
			) {
		
		if ( entry_A.getPl() != null ) {
			for ( GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 entry_A_PositionEntry : entry_A.getPl() ) {
				
				if ( entry_B.getPl() != null ) {
					for ( GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 entry_B_PositionEntry : entry_B.getPl() ) {
						
						if ( entry_A_PositionEntry == entry_B_PositionEntry ) {
							//  Same entry so skip
							continue; // EARLY CONTINUE
						}
						
						if ( this._compare__PositionEntry_TO_PositionEntry( entry_A_PositionEntry, entry_B_PositionEntry ) ) {
							//  Have Overlap so return true
							return true; // EARLY RETURN
						}
					}
				}
				
				if ( entry_B.getPln() != null ) {
					//  Have Position List Numbers on Entry B so compare to Position List on Entry A
					
					for ( Integer entry_B_PositionNumber :  entry_B.getPln() ) {
						if ( this._compare__PositionEntry_TO_PositionEntryNumer( entry_A_PositionEntry, entry_B_PositionNumber ) ) {
							//  Have Overlap so return true
							return true; // EARLY RETURN
						}
					}
				}
			}
		}
		
		//  Compare Position List Numbers on Entry A and Entry B

		if ( entry_A != entry_B ) {
			//  Only execute when NOT same entry
			
			if ( entry_A.getPln() != null ) {
				//  Have Position List Numbers on Entry A
				
				//  Skip test entry_A.getPln() and  entry_B.getPl()  since will compare when swap the Entry_A and Entry_B in above method
				
				if ( entry_B.getPln() != null ) {
					//  Have Position List Numbers on Entry B
					
					for ( Integer entry_A_PositionNumber : entry_A.getPln() ) {
					
						for ( Integer entry_B_PositionNumber : entry_B.getPln() ) {
							
							if ( entry_A_PositionNumber.intValue() == entry_B_PositionNumber.intValue() ) {
								//  Have Overlap so return true
								return true;
							}
						}
					}
				}
			}
		}
		
		return false;
	}
	
	/**
	 * @param entry_A_PositionEntry
	 * @param entry_B_PositionEntry
	 * @return
	 */
	private boolean _compare__PositionEntry_TO_PositionEntry(
			
			GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 entry_A_PositionEntry,
			GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 entry_B_PositionEntry
			) {

		if ( entry_A_PositionEntry.getPs() != null && entry_A_PositionEntry.getPe() != null ) {
			// Entry A Has a range
			
			if ( entry_B_PositionEntry.getPs() != null && entry_B_PositionEntry.getPe() != null ) {
				// Entry B Has a range
				
				
				if ( entry_A_PositionEntry.getPs().intValue() <= entry_B_PositionEntry.getPe().intValue()
						&& entry_B_PositionEntry.getPs() <= entry_A_PositionEntry.getPe() ) {
					
					//  x.start <= y.stop and y.start <= x.stop
					
					return true; // EARLY RETURN
				}
			} else {
				//  NOT Entry B Range
				
				if ( entry_B_PositionEntry.getPn() != null && entry_B_PositionEntry.getPn().booleanValue() ) {
					//  Entry B position is 'n' which is never in a range
					
				} else if ( entry_B_PositionEntry.getPc() != null && entry_B_PositionEntry.getPc().booleanValue() ) {
					//  Entry B position is 'c' which is never in a range
					
				} else {
				
					if ( entry_B_PositionEntry.getP() == null ) {
						//  Position is null which is invalid
						String msg = "( entry_B_PositionEntry.getP() == null ) when 'else' of ( entry_B_PositionEntry.getPs() != null && entry_B_PositionEntry.getPe() != null )";
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
					
					if ( entry_A_PositionEntry.getPs().intValue() >= entry_B_PositionEntry.getP().intValue()
							&& entry_A_PositionEntry.getPe().intValue() <= entry_B_PositionEntry.getP().intValue() ) {
						
						//  Entry B position IS IN Entry A range so overlap

						return true; // EARLY RETURN
					}
				}
			}
		} else {
			//  Entry A is NOT a range
			
			if ( entry_B_PositionEntry.getPs() != null && entry_B_PositionEntry.getPe() != null ) {
				// Entry B Has a range

				if ( entry_A_PositionEntry.getPn() != null && entry_A_PositionEntry.getPn().booleanValue() ) {
					//  Entry A position is 'n' which is never in a range
					
				} else if ( entry_A_PositionEntry.getPc() != null && entry_A_PositionEntry.getPc().booleanValue() ) {
					//  Entry A position is 'c' which is never in a range
					
				} else {
				
					if ( entry_A_PositionEntry.getP() == null ) {
						//  Position is null which is invalid
						String msg = "( entry_A_PositionEntry.getP() == null ) when 'else' of ( entry_A_PositionEntry.getPs() != null && entry_A_PositionEntry.getPe() != null )";
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
					
					if ( entry_B_PositionEntry.getPs().intValue() >= entry_A_PositionEntry.getP().intValue()
							&& entry_B_PositionEntry.getPe().intValue() <= entry_A_PositionEntry.getP().intValue() ) {
						
						//  Entry A position IS IN Entry B range so overlap

						return true; // EARLY RETURN
					}
				}
				
			} else {

				//  Entry B is NOT a range
				
				//  Compare Single Positions
				
				if ( entry_A_PositionEntry.getPn() != null && entry_A_PositionEntry.getPn().booleanValue()
						&&  entry_B_PositionEntry.getPn() != null && entry_B_PositionEntry.getPn().booleanValue() ) {
					
					//  Entry A position and Entry B position are both 'n' so overlap
					
					return true; // EARLY RETURN
				}
				if ( entry_A_PositionEntry.getPc() != null && entry_A_PositionEntry.getPc().booleanValue()
						&&  entry_B_PositionEntry.getPc() != null && entry_B_PositionEntry.getPc().booleanValue() ) {
					
					//  Entry A position and Entry B position are both 'c' so overlap
					
					return true; // EARLY RETURN
				}

				if ( entry_A_PositionEntry.getP() == null ) {
					//  Position is null which is invalid
					String msg = "( entry_A_PositionEntry.getP() == null ) when 'else' of ( entry_A_PositionEntry.getPs() != null && entry_A_PositionEntry.getPe() != null )";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				if ( entry_B_PositionEntry.getP() == null ) {
					//  Position is null which is invalid
					String msg = "( entry_B_PositionEntry.getP() == null ) when 'else' of ( entry_B_PositionEntry.getPs() != null && entry_B_PositionEntry.getPe() != null )";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				if ( entry_A_PositionEntry.getP().intValue() == entry_B_PositionEntry.getP().intValue() ) {
					
					//  Entry A position and Entry B position are the same number so overlap

					return true; // EARLY RETURN
				}
			}
		}
		
		return false;
		
	}
	

	/**
	 * @param entry_PositionEntry
	 * @param positionEntry_Number
	 * @return
	 */
	private boolean _compare__PositionEntry_TO_PositionEntryNumer(
			
			GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 entry_PositionEntry,
			Integer positionEntry_Number
			) {

		if ( entry_PositionEntry.getPs() != null && entry_PositionEntry.getPe() != null ) {
			// Entry A Has a range

			if ( entry_PositionEntry.getPs().intValue() <= positionEntry_Number.intValue()
					&& entry_PositionEntry.getPe().intValue() >= positionEntry_Number.intValue() ) {

				//  Entry B position IS IN Entry A range so overlap

				return true; // EARLY RETURN
			}
		

		} else {
			//  Entry A is NOT a range
			
			//  Compare Single Positions

			if ( entry_PositionEntry.getPn() != null && entry_PositionEntry.getPn().booleanValue() ) {

				//  Entry A position 'n' so NO overlap


			} else if ( entry_PositionEntry.getPc() != null && entry_PositionEntry.getPc().booleanValue() ) {

				//  Entry A position 'c' so NO overlap

			} else if ( entry_PositionEntry.getP().intValue() == positionEntry_Number.intValue() ) {

				//  Entry A position and positionEntry_Number are the same number so overlap

				return true; // EARLY RETURN
			}
		}
		
		return false;
		
	}
	
	
	
	/////
	
	private static class INTERNAL__Parse_Variable_AND_Open_Modifications_Overall_Result {
	
		GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 result;
		String errorMessage;
	}


	//////   WebserviceRequest and WebserviceResult classes

	public static class WebserviceRequestDataInHeader {
		
		private String projectIdentifier;
		
		private String filename;
		private Integer projectScanFileId;
		
		private String displayLabel;
		private String description;
		
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public void setFilename(String filename) {
			this.filename = filename;
		}
		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
		public void setDisplayLabel(String displayLabel) {
			this.displayLabel = displayLabel;
		}
		public void setDescription(String description) {
			this.description = description;
		}
	}

	public static class WebserviceResponse {

		private boolean statusSuccess;
		private boolean projectLocked;
		private String errorMessage;

		public boolean isStatusSuccess() {
			return statusSuccess;
		}
		public boolean isProjectLocked() {
			return projectLocked;
		}
		public String getErrorMessage() {
			return errorMessage;
		}
	}
}
