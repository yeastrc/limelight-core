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
package org.yeastrc.limelight.limelight_importer.importer_core_entry_point;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.List;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_importer.constants.Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearchDAO;
import org.yeastrc.limelight.limelight_importer.dao.SearchDAO;
import org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry.DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry;
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterLimelightXMLDeserializeFailException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats.SearchStatistics_General_SavedToDB;
import org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats.LogLimelightXML_Statistics;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.LimelightInputObjectContainer;
import org.yeastrc.limelight.limelight_importer.objects.LimelightXMLFile_FileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.objects.SearchTags_SearchTagCategories_Root_And_SubParts_InputData;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateAnnotationTypeRecords;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateMatchedProteinSection;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateModificationsOnReportedPeptides;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateModificationsOnReportedPeptidesAndPSMs;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateReportedPeptideMatchedProteins;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_FastaFilename_Matches_Submitted_FastaFile_Filename;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_PSMs_PrecursorRetentionTime_PrecursorMZ;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_ReporterIons_OnPSMs;
import org.yeastrc.limelight.limelight_importer.process_input.ProcessLimelightInput;
import org.yeastrc.limelight.limelight_importer.project_importable_validation.IsImportingAllowForProject;
import org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator.XMLInputFactory_XXE_Safe_Creator;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class ImporterCoreEntryPoint {

	private static final Logger log = LoggerFactory.getLogger( ImporterCoreEntryPoint.class );
	
	/**
	 * private constructor
	 */
	private ImporterCoreEntryPoint(){}
	public static ImporterCoreEntryPoint getInstance() {
		return new ImporterCoreEntryPoint();
	}
	
	private volatile boolean shutdownRequested = false;
	
	/**
	 * @param projectId
	 * @param userIdInsertingSearch
	 * @param searchNameOverrideValue
	 * @param searchShortName TODO
	 * @param importDirectoryOverrideValue
	 * @param mainXMLFileToImport
	 * @param limelightInputForImportParam
	 * @param scanFileFileContainer_AllEntries
	 * @param skipPopulatingPathOnSearchLineOptChosen
	 * @param searchStatistics_General_SavedToDB
	 * @return
	 * @throws Exception
	 * @throws LimelightImporterProjectNotAllowImportException
	 * @throws LimelightImporterLimelightXMLDeserializeFailException
	 */
	public int doImport( 
			int projectId,
			Integer userIdInsertingSearch,
			String searchNameOverrideValue,
			String searchShortName,
			SearchTags_SearchTagCategories_Root_And_SubParts_InputData searchTags_SearchTagCategories_Root_And_SubParts_InputData,
			String importDirectoryOverrideValue,
			LimelightXMLFile_FileContainer limelightXMLFile_FileContainer,
			LimelightInput limelightInputForImportParam,
			FileObjectStorage_FileContainer_AllEntries fileObjectStorage_FileContainer_AllEntries,
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			Boolean skipPopulatingPathOnSearchLineOptChosen, SearchStatistics_General_SavedToDB searchStatistics_General_SavedToDB
			) throws Exception, LimelightImporterProjectNotAllowImportException, LimelightImporterLimelightXMLDeserializeFailException {
		
		LimelightInput limelightInputForImport = null;
		if ( limelightInputForImportParam != null ) {
			limelightInputForImport = limelightInputForImportParam;
		}
		String importDirectory = null; 
		if ( StringUtils.isNotEmpty( importDirectoryOverrideValue ) ) {
			importDirectory = importDirectoryOverrideValue;
		} else if ( limelightXMLFile_FileContainer.getLimelightXMLFile() != null ) {
			try {
				File importFileCanonicalFile = limelightXMLFile_FileContainer.getLimelightXMLFile().getCanonicalFile();
				if ( importFileCanonicalFile != null ) {
					File importFileParent = importFileCanonicalFile.getParentFile();
					if ( importFileParent != null ) {
						importDirectory = importFileParent.getCanonicalPath();
					} else {
						importDirectory = importFileCanonicalFile.getCanonicalPath();
					}
				} else {
					importDirectory = limelightXMLFile_FileContainer.getLimelightXMLFile().getCanonicalPath();
				}
			} catch ( Exception e ) {
				String msg = "Error mainXMLFileToImport.getCanonicalPath() or importFileCanonicalFile.getParentFile() or importFileParent.getCanonicalPath()";
				log.error( msg, e );
				throw e;
			}
		}
		if ( limelightInputForImport == null ) {
			//  Limelight XML data not provided as an object so unmarshall the file
			
			limelightInputForImport = deserializeLimelightInputFrom_LimelightXMLFile_FileContainer(limelightXMLFile_FileContainer);
		}
		
		try {
			long limelightXMLFileToImport_Size = limelightXMLFile_FileContainer.getFileSize();

			searchStatistics_General_SavedToDB.set_limelightXMLFileToImport_Size(limelightXMLFileToImport_Size);
			
			 List<ScanFileFileContainer> scanFileFileContainer_List = scanFileFileContainer_AllEntries.get_ScanFileFileContainer_List();
			 
			 if ( scanFileFileContainer_List != null && ( ! scanFileFileContainer_List.isEmpty() ) ) {
				 
				 long scanFiles_TotalFilesSize_Bytes = 0;
				 
				 for ( ScanFileFileContainer scanFileFileContainer : scanFileFileContainer_List ) {
					 scanFiles_TotalFilesSize_Bytes += scanFileFileContainer.getScanFile().length();
				 }

				 searchStatistics_General_SavedToDB.setScanFiles_TotalFilesSize_Bytes(scanFiles_TotalFilesSize_Bytes);
			 }
			 
		} catch ( Exception e ) {
			// swallow exception
		}
		
		searchStatistics_General_SavedToDB.read_LimelightXMLFile_Done();
		
		//  If a searchName is provided, override the one in the Limelight XML file
		if ( StringUtils.isNotEmpty( searchNameOverrideValue ) ) {
			limelightInputForImport.setName( searchNameOverrideValue );
		}
		LimelightInputObjectContainer limelightInputObjectContainer = new LimelightInputObjectContainer();
		limelightInputObjectContainer.setLimelightInput( limelightInputForImport );
		limelightInputForImport = null; //  release this reference
		int insertedSearchId = doImportPassingDeserializedLimelightImportInputXML( 
				projectId, 
				userIdInsertingSearch,
				searchShortName,
				searchTags_SearchTagCategories_Root_And_SubParts_InputData,
				limelightInputObjectContainer, 
				fileObjectStorage_FileContainer_AllEntries,
				scanFileFileContainer_AllEntries, 
				importDirectory, 
				skipPopulatingPathOnSearchLineOptChosen,
				searchStatistics_General_SavedToDB );
		
		return insertedSearchId;
	}

	/**
	 * Utility method to get the LimelightInput from an LimelightXMLFile_FileContainer object
	 * 
	 * @param inputStream
	 * @return
	 * @throws Exception
	 */
	public LimelightInput deserializeLimelightInputFrom_LimelightXMLFile_FileContainer( 
			LimelightXMLFile_FileContainer limelightXMLFile_FileContainer
			) throws Exception, LimelightImporterLimelightXMLDeserializeFailException {

		if ( limelightXMLFile_FileContainer.getLimelightXMLFile() != null ) {

			try ( InputStream inputStream = new FileInputStream( limelightXMLFile_FileContainer.getLimelightXMLFile() ) ) {

				LimelightInput limelightInputForImport = deserializeLimelightInputFromInputStream( inputStream );

				return limelightInputForImport;  // EARLY RETURN

			} catch ( Exception e ) {
				System.out.println( "Exception in deserializing the primary input XML file" );
				System.err.println( "Exception in deserializing the primary input XML file" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				throw e;
			} finally {
			}
		}
		
		//  Not a local file.  Get from AWS S3

		S3Client amazonS3_Client = null;

		{  // Use Region from limelightXMLFile_FileContainer, otherwise Config, otherwise SDK use from Environment Variable

			String amazonS3_RegionName = limelightXMLFile_FileContainer.getAws_s3_region();

			if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
				amazonS3_RegionName = ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
			}

			if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
				
				Region aws_S3_Region = Region.of(amazonS3_RegionName);
				
				amazonS3_Client = 
						S3Client.builder()
						.region( aws_S3_Region )
						.httpClientBuilder(ApacheHttpClient.builder())
						.build();
				
			} else {
				//  SDK use Region from Environment Variable
				
				amazonS3_Client = 
						S3Client.builder()
						.httpClientBuilder(ApacheHttpClient.builder())
						.build(); 
			}
		}

		GetObjectRequest getObjectRequest = 
				GetObjectRequest
				.builder()
				.bucket(limelightXMLFile_FileContainer.getAws_s3_bucket_name())
				.key( limelightXMLFile_FileContainer.getAws_s3_object_key() )
				.build();
		
		try ( ResponseInputStream<GetObjectResponse> responseInputStream = amazonS3_Client.getObject(getObjectRequest) ) {
			
			InputStream inputStream = responseInputStream;

			LimelightInput limelightInputForImport = deserializeLimelightInputFromInputStream( inputStream );

			return limelightInputForImport;  // EARLY RETURN

		} catch ( NoSuchKeyException e ) {
			
			//  Throw Data Exception if externally passed in object key and bucket name
			
			System.err.println( "Could not find mainXMLFileToImport S3 Object.  ObjectKey: " 
					+ limelightXMLFile_FileContainer.getAws_s3_object_key() 
					+ ", Object Bucket: " 
					+ limelightXMLFile_FileContainer.getAws_s3_bucket_name() );
			throw new LimelightImporterErrorProcessingRunIdException(e);
		}
		
	}
	
	/**
	 * Utility method to get the LimelightInput from an input stream
	 * 
	 * @param inputStream
	 * @return
	 * @throws Exception
	 */
	public LimelightInput deserializeLimelightInputFromInputStream( 
			InputStream inputStream
			) throws Exception, LimelightImporterLimelightXMLDeserializeFailException {
		
		//  Unmarshall the main import file
		LimelightInput limelightInputForImport = null;
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance( LimelightInput.class );
			
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
			
			if ( Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant.Limelight_XSD_XML_SCHEMA_VALIDATION_ENABLED ) {
				URL xmlSchemaURL = null;
				try {
					xmlSchemaURL = this.getClass().getResource( Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant.Limelight_XSD_XML_SCHEMA_FILENAME_WITH_PATH );
				} catch ( Exception e ) {
					String msg = "Exception Creating URL for Local/Internal Limelight XSD Schema file: " + Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant.Limelight_XSD_XML_SCHEMA_FILENAME_WITH_PATH;
					log.error( msg, e );
					throw e;
				}
				if ( xmlSchemaURL == null ) {
					String msg = "Error Creating URL for Local/Internal Limelight XSD Schema file: " + Limelight_XSD_XML_Schema_Enabled_And_Filename_With_Path_Constant.Limelight_XSD_XML_SCHEMA_FILENAME_WITH_PATH;
					log.error( msg );
					throw new LimelightImporterInternalException( msg );
				}
				SchemaFactory sf = SchemaFactory.newInstance( XMLConstants.W3C_XML_SCHEMA_NS_URI ); 
				Schema schema = sf.newSchema( xmlSchemaURL );
				unmarshaller.setSchema(schema);
			}
			Object unmarshalledObject = null;
			try {
				XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
				XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( inputStream ) );
				unmarshalledObject = unmarshaller.unmarshal( xmlStreamReader );
			} catch ( Exception e ) {
				System.out.println( "Exception in deserializing the primary input XML file" );
				System.err.println( "Exception in deserializing the primary input XML file" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				throw new LimelightImporterLimelightXMLDeserializeFailException( e.toString() , e ); 
			}
			if ( ! ( unmarshalledObject instanceof LimelightInput ) ) {
				String msg = "Object unmarshalled "
						+ " cannot be cast to LimelightInput.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
				System.err.println( msg );
				System.out.println( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			limelightInputForImport = (LimelightInput) unmarshalledObject;
			
		} catch ( LimelightImporterLimelightXMLDeserializeFailException e ) {
			throw e;
		} catch ( Exception e ) {
			System.out.println( "Exception in deserializing the primary input XML file" );
			System.err.println( "Exception in deserializing the primary input XML file" );
			e.printStackTrace( System.out );
			e.printStackTrace( System.err );
			throw e;
		}
		return limelightInputForImport;
	}

	/**
	 * 
	 * @param projectId
	 * @param limelightInputObjectContainer
	 * @param scanFileFileContainerList
	 * @param importDirectory - displayed on website in the "Path:" field for logged in users
	 * @return insertedSearchId
	 * @throws LimelightImporterProjectNotAllowImportException
	 * @throws Exception
	 */
	public int doImportPassingDeserializedLimelightImportInputXML( 
			int projectId,
			Integer userIdInsertingSearch,
			String searchShortName,
			SearchTags_SearchTagCategories_Root_And_SubParts_InputData searchTags_SearchTagCategories_Root_And_SubParts_InputData,
			LimelightInputObjectContainer limelightInputObjectContainer,
			FileObjectStorage_FileContainer_AllEntries fileObjectStorage_FileContainer_AllEntries,
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			String importDirectory,
			Boolean skipPopulatingPathOnSearchLineOptChosen,
			SearchStatistics_General_SavedToDB searchStatistics_General_SavedToDB_ToDB
			) throws Exception, LimelightImporterProjectNotAllowImportException {
		
		
		LimelightInput limelightInputForImport = limelightInputObjectContainer.getLimelightInput();
		if ( limelightInputForImport.getMatchedProteins() == null ) {
			String msg = "<matched_proteins> is not populated in Limelight XML File.";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
		
		LogLimelightXML_Statistics.getInstance().logLimelightXML_Statistics( limelightInputForImport );

		try {
			//  isImportingAllowForProject(...) throws LimelightImporterProjectNotAllowImportException 
			//                                  when project not allows import
			//  isImportingAllowForProject(...) prints it's own error message
			IsImportingAllowForProject.getInstance().isImportingAllowForProject( projectId );
			
		} catch ( LimelightImporterProjectNotAllowImportException e ) {
			throw e;
		} catch( Exception e ) {
			System.err.println( "Error getting project" );
			System.err.println( "Error: " + e.getMessage() );
			throw e;
		}
		
		ProcessLimelightInput processLimelightInput = null; 
		try {
			//  TODO  Implement these as needed
			
			//   Throws LimelightImporterDataException if data error found
			Validate_FastaFilename_Matches_Submitted_FastaFile_Filename.getInstance()
			.validate_FastaFilename_Matches_Submitted_FastaFile_Filename( limelightInputForImport, fileObjectStorage_FileContainer_AllEntries );
			
			//   Throws LimelightImporterDataException if data error found
			ValidateAnnotationTypeRecords.getInstance().validateAnnotationTypeRecords( limelightInputForImport );
			
			//   Throws LimelightImporterDataException if data error found
			ValidateMatchedProteinSection.getInstance().validateMatchedProteinSection( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			ValidateReportedPeptideMatchedProteins.getInstance().validateReportedPeptideMatchedProteins( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			ValidateModificationsOnReportedPeptides.getInstance().validateModificationsOnReportedPeptides( limelightInputForImport );
			
			//   Throws LimelightImporterDataException if data error found
			ValidateModificationsOnReportedPeptidesAndPSMs.getInstance().validateModificationsOnReportedPeptidesAndPSMs( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs.getInstance().validateModificationsOnReportedPeptidesAndPSMs( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			Validate_ReporterIons_OnPSMs.getInstance().validate_ReporterIons_OnPSMs( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			Validate_PSMs_PrecursorRetentionTime_PrecursorMZ.getInstance().validate_PSMs_PrecursorRetentionTime_PrecursorMZ(limelightInputForImport);

			//   Throws LimelightImporterDataException if data error found
			Validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed.getInstance().validate_PSMs_PrecursorRetentionTime_PrecursorMZ__MaxValuesAllowed(limelightInputForImport);

			//   Throws LimelightImporterDataException if data error found
			Validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue.getInstance().validate_PSMs_IsDecoyTrue_IsIndependentDecoyTrue(limelightInputForImport);

			//   Throws LimelightImporterDataException if data error found
			Validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics.getInstance().validate_PSMs_IsIndependentDecoyTrue_SearchHas_FastaFileStatistics(limelightInputForImport);
			
			////////  End Validation
			
			
			
			//  Process Limelight Input
			processLimelightInput = ProcessLimelightInput.getInstance();
			processLimelightInput.processLimelightInput( 
					projectId, 
					userIdInsertingSearch,
					searchShortName,
					searchTags_SearchTagCategories_Root_And_SubParts_InputData, 
					limelightInputForImport,
					fileObjectStorage_FileContainer_AllEntries,
					scanFileFileContainer_AllEntries, 
					importDirectory,
					skipPopulatingPathOnSearchLineOptChosen, searchStatistics_General_SavedToDB_ToDB
					);
			
			SearchDTO_Importer searchDTOInserted = processLimelightInput.getSearchDTOInserted();
			ProjectSearchDTO projectSearchDTOInserted = processLimelightInput.getProjectSearchDTOInserted();
			
			
			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
			
			//  Save Search Statistics, including processing time
			
			searchStatistics_General_SavedToDB_ToDB.searchStatistics_General_SavedToDB(limelightInputForImport, searchDTOInserted);

			
			//  Set limelightInputForImport to null to release memory needed later, but right now no other code to run
			limelightInputForImport = null;
			limelightInputObjectContainer.setLimelightInput( null );
			
			
			//   Validate that in all DB Batch Insert Classes, the 'insert_LAST_Batch_ToDB()' method was called.  Throws an exception if there is an error
			DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.getSingletonInstance().validateAllCalled_InsertLastBatch_ToDB();
			
			
			try {
				SearchDAO.getInstance().updateStatus( searchDTOInserted.getId(), SearchRecordStatus.IMPORT_COMPLETE_VIEW );
			}  catch ( Exception e ) {
				String msg = "Failed to mark the Search as ImportComplete, search id: " + searchDTOInserted.getId() ;
				log.error( msg, e );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				System.err.println( msg );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				throw e;
		    }
			try {
				ProjectSearchDAO.getInstance().updateStatus( projectSearchDTOInserted.getId(),  SearchRecordStatus.IMPORT_COMPLETE_VIEW );
			}  catch ( Exception e ) {
				String msg = "Failed to mark the project_search as ImportComplete, search id: " + searchDTOInserted.getId() ;
				log.error( msg, e );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				System.err.println( msg );
				System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				throw e;
		    }
			if ( log.isInfoEnabled() ) {
				System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				System.out.println( "!!!!");
			}
			
			try {
				Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().delete_ForSearchId( searchDTOInserted.getId() );
				
			} catch ( Throwable t ) {
				String msg = "Failed to Delete Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter record, search id: " + searchDTOInserted.getId() ;
				log.error( msg, t );
				
				//  Eat Exception
			}
			
			System.out.println( );
			System.out.println( );
			System.out.println( );
			System.out.println( "Insert of search ID " + searchDTOInserted.getId() + " is complete and successful.");
			System.out.println( );
			System.out.println( );
			System.out.println( );
			if ( log.isInfoEnabled() ) {
				System.out.println( "!!!!");
				System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			}
			int insertedSearchId = searchDTOInserted.getId();
			return insertedSearchId;
			
		} catch ( Exception e ) {
			if ( ! shutdownRequested ) {
				System.out.println( "Exception in processing" );
				System.err.println( "Exception in processing" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				if ( processLimelightInput != null ) {
					//  processLimelightInput was instantiated to process the input so get data from it
					SearchDTO_Importer search = processLimelightInput.getSearchDTOInserted();
					if ( search != null ) {
						String msg = "search record inserted, but import not complete, search.id: " + search.getId()
								+ ", search.path: " + search.getPath();
						log.error( msg );
						System.out.println( "----------------------------------------");
						System.out.println( "----");
						System.out.println( msg );
						System.out.println( "----");
						System.out.println( "----------------------------------------");
						System.err.println( "----------------------------------------");
						System.err.println( "----");
						System.err.println( msg );
						System.err.println( "----");
						System.err.println( "----------------------------------------");
						try {
							//  First commit the last insert transaction if needed
							ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();
						}  catch ( Exception eUpd ) {
							//  Just ignore any exception
					    }
						try {
							SearchDAO.getInstance().updateStatus( search.getId(), SearchRecordStatus.IMPORT_FAIL );
						}  catch ( Exception eUpd ) {
							String msgeUpd = "Failed to mark the Search as ImportFail, search id: " + search.getId() ;
							log.error( msgeUpd, eUpd );
							System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							System.err.println( msgeUpd );
							System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

							//  Eat Exception
					    }

						try {
							Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter.getSingletonInstance().delete_ForSearchId( search.getId() );
							
						} catch ( Throwable t ) {
							String msgDelete = "Failed to Delete Importer_SearchImportInProgress_Tracking_DAO__Importer_RunImporter record, search id: " + search.getId() ;
							log.error( msgDelete, t );
							
							//  Eat Exception
						}
						
						ProjectSearchDTO projectSearchDTOInserted = processLimelightInput.getProjectSearchDTOInserted();
						try {
							ProjectSearchDAO.getInstance().updateStatus( projectSearchDTOInserted.getId(),  SearchRecordStatus.IMPORT_FAIL );
						}  catch ( Exception e2 ) {
							String msg_failUpd = "Failed to mark the project_search as IMPORT_FAIL, search id: " + search.getId() ;
							log.error( msg_failUpd, e2 );
							System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							System.err.println( msg );
							System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							throw e;
					    }						
					}
				}
			}
			throw e;
		}
	}
	
	
	public boolean isShutdownRequested() {
		return shutdownRequested;
	}
	public void setShutdownRequested(boolean shutdownRequested) {
		this.shutdownRequested = shutdownRequested;
	}
}
