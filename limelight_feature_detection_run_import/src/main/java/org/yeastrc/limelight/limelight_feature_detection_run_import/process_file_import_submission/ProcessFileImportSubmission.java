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
package org.yeastrc.limelight.limelight_feature_detection_run_import.process_file_import_submission;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDataNotFoundException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterErrorProcessingRunIdException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_and_import__import__core_entry_points.Import_CoreEntryPoint;
import org.yeastrc.limelight.limelight_feature_detection_run_import.run_and_import__import__core_entry_points.Run_And_Import_CoreEntryPoint;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingRun_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.objects.FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair;

/**
 * Process fileImportTrackingDTO
 *
 */
public class ProcessFileImportSubmission {

	private static final Logger log = LoggerFactory.getLogger( ProcessFileImportSubmission.class );

	/**
	 * private constructor
	 */
	private ProcessFileImportSubmission(){}
	public static ProcessFileImportSubmission getInstance() {
		return new ProcessFileImportSubmission();
	}

	/**
	 * @param fileImportRunIdToProcess
	 * @param trackingDTOTrackingRunDTOPair
	 * @param importerCoreEntryPoint
	 * @param importResults
	 * @return
	 * @throws Exception
	 */
	public void processFileImportSubmission( 
			int fileImportRunIdToProcess, 
			FileImport_AndPipelineRun_TrackingDTOTrackingRunDTOPair trackingDTOTrackingRunDTOPair,
			Import_CoreEntryPoint import_CoreEntryPoint,
			Run_And_Import_CoreEntryPoint run_And_Import_CoreEntryPoint
			) throws Exception {
		
		
		FileImportAndPipelineRunTrackingRunDTO fileImportAndPipelineRunTrackingRunDTO =
				FileImportAndPipelineRunTrackingRun_Shared_Get_DAO.getInstance()
				.getItem( fileImportRunIdToProcess );
				

		if ( fileImportAndPipelineRunTrackingRunDTO == null ) {
			final String msg = "No FileImportAndPipelineRunTrackingRunDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess;
			System.err.println( msg );
			throw new LimelightImporterDataNotFoundException(msg);
		}

		trackingDTOTrackingRunDTOPair.setFileImportAndPipelineRunTrackingRunDTO(fileImportAndPipelineRunTrackingRunDTO);

		FileImportAndPipelineRunTrackingDTO fileImportAndPipelineRunTrackingDTO =
				FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance()
				.getItem( fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id() );

		if ( fileImportAndPipelineRunTrackingDTO == null ) {
			final String msg = "No FileImportAndPipelineRunTrackingDTO Record found for fileImportRunIdToProcess: " + fileImportRunIdToProcess
					+ ", FileImportAndPipelineRunTrackingDTO record id: " + fileImportAndPipelineRunTrackingRunDTO.getFileImportAndPipelineRunTracking_Id();
			System.err.println( msg );
			throw new LimelightImporterDataNotFoundException(msg);
		}

		trackingDTOTrackingRunDTOPair.setFileImportAndPipelineRunTrackingDTO(fileImportAndPipelineRunTrackingDTO);

		
		if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT ) {
		
			run_And_Import_CoreEntryPoint.process(
					fileImportAndPipelineRunTrackingDTO, 
					fileImportAndPipelineRunTrackingRunDTO
					);
		
		} else if ( fileImportAndPipelineRunTrackingDTO.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT ) {

			import_CoreEntryPoint.process(
					fileImportAndPipelineRunTrackingDTO, 
					fileImportAndPipelineRunTrackingRunDTO
					);
		
			
		} else {
			
			String msg = "Unexepcted value for fileImportAndPipelineRunTrackingDTO.getRequestType(): " + fileImportAndPipelineRunTrackingDTO.getRequestType();
			log.error(msg);
			throw new LimelightImporterErrorProcessingRunIdException(msg);
			
		}
	}
	
}