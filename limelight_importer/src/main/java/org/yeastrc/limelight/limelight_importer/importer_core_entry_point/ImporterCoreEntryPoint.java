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
import java.util.Map;

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
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterLimelightXMLDeserializeFailException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_importer.log_limelight_xml_stats.LogLimelightXML_Statistics;
import org.yeastrc.limelight.limelight_importer.objects.LimelightInputObjectContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateAnnotationTypeRecords;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateMatchedProteinSection;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateModificationsOnReportedPeptides;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateModificationsOnReportedPeptidesAndPSMs;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.ValidateReportedPeptideMatchedProteins;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_PSMs_PrecursorRetentionTime_PrecursorMZ;
import org.yeastrc.limelight.limelight_importer.pre_validate_xml.Validate_ReporterIons_OnPSMs;
import org.yeastrc.limelight.limelight_importer.process_input.ProcessLimelightInput;
import org.yeastrc.limelight.limelight_importer.project_importable_validation.IsImportingAllowForProject;
import org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator.XMLInputFactory_XXE_Safe_Creator;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchRecordStatus;
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
	
	public int doImport( 
			int projectId,
			Integer userIdInsertingSearch,
			String searchNameOverrideValue,
			String importDirectoryOverrideValue,
			File mainXMLFileToImport,
			LimelightInput limelightInputForImportParam,
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			Boolean skipPopulatingPathOnSearchLineOptChosen
			) throws Exception, LimelightImporterProjectNotAllowImportException, LimelightImporterLimelightXMLDeserializeFailException {
		
		LimelightInput limelightInputForImport = null;
		if ( limelightInputForImportParam != null ) {
			limelightInputForImport = limelightInputForImportParam;
		}
		String importDirectory = null; 
		if ( StringUtils.isNotEmpty( importDirectoryOverrideValue ) ) {
			importDirectory = importDirectoryOverrideValue;
		} else {
			try {
				File importFileCanonicalFile = mainXMLFileToImport.getCanonicalFile();
				if ( importFileCanonicalFile != null ) {
					File importFileParent = importFileCanonicalFile.getParentFile();
					if ( importFileParent != null ) {
						importDirectory = importFileParent.getCanonicalPath();
					} else {
						importDirectory = importFileCanonicalFile.getCanonicalPath();
					}
				} else {
					importDirectory = mainXMLFileToImport.getCanonicalPath();
				}
			} catch ( Exception e ) {
				String msg = "Error mainXMLFileToImport.getCanonicalPath() or importFileCanonicalFile.getParentFile() or importFileParent.getCanonicalPath()";
				log.error( msg, e );
				throw e;
			}
		}
		if ( limelightInputForImport == null ) {
			//  main import file not provided as an object so unmarshall the file
			try ( InputStream inputStream = new FileInputStream( mainXMLFileToImport ) ) {
				limelightInputForImport = deserializeLimelightInputFromInputStream( inputStream );
			} catch ( Exception e ) {
				System.out.println( "Exception in deserializing the primary input XML file" );
				System.err.println( "Exception in deserializing the primary input XML file" );
				e.printStackTrace( System.out );
				e.printStackTrace( System.err );
				throw e;
			} finally {
			}
		}
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
				limelightInputObjectContainer, 
				scanFileFileContainer_AllEntries, 
				importDirectory, 
				skipPopulatingPathOnSearchLineOptChosen );
		
		return insertedSearchId;
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
			LimelightInputObjectContainer limelightInputObjectContainer,
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries,
			String importDirectory,
			Boolean skipPopulatingPathOnSearchLineOptChosen
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
			Validate_ReporterIons_OnPSMs.getInstance().validate_ReporterIons_OnPSMs( limelightInputForImport );

			//   Throws LimelightImporterDataException if data error found
			Validate_PSMs_PrecursorRetentionTime_PrecursorMZ.getInstance().validate_PSMs_PrecursorRetentionTime_PrecursorMZ(limelightInputForImport);
			
			//  Process Limelight Input
			processLimelightInput = ProcessLimelightInput.getInstance();
			processLimelightInput.processLimelightInput( 
					projectId, 
					userIdInsertingSearch,
					limelightInputForImport, 
					scanFileFileContainer_AllEntries,
					importDirectory, 
					skipPopulatingPathOnSearchLineOptChosen
					);
			
			SearchDTO_Importer searchDTOInserted = processLimelightInput.getSearchDTOInserted();
			ProjectSearchDTO projectSearchDTOInserted = processLimelightInput.getProjectSearchDTOInserted();
			//  Set limelightInputForImport to null to release memory needed later, but right now no other code to run
			limelightInputForImport = null;
			limelightInputObjectContainer.setLimelightInput( null );
			
			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
			
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
							ImportRunImporterDBConnectionFactory.getInstance().commitInsertControlCommitConnection();
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
