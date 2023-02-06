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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.database_insert_with_transaction_services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingDataJSONBlob_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;

/**
 * Save the Import Tracking Record and it's children as single DB Transaction
 *
 */
@Component
public class ImportTrackingAndChildren_Save_SingleDBTransaction implements ImportTrackingAndChildren_Save_SingleDBTransactionIF {
	
	private static final Logger log = LoggerFactory.getLogger( ImportTrackingAndChildren_Save_SingleDBTransaction.class );
	
	@Autowired
	private FileImportTrackingDAO_IF fileImportTrackingDAO;
	
	@Autowired
	private FileImportTrackingDataJSONBlob_DAO_IF fileImportTrackingDataJSONBlob_DAO;
	
	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;

	/**
	 * @param trackingItem
	 * @param singleFileDTOList
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void saveImportTrackingAndChildrenInSingleDBTransaction( 
			
			FileImportTrackingDTO trackingItem,
			FileImportTrackingDataJSONBlob_DTO fileImportTrackingDataJSONBlob_DTO, 
			List<FileImportTrackingSingleFileDTO> singleFileDTOList
			)  {
		
		try {
			fileImportTrackingDAO.save( trackingItem );
			
			fileImportTrackingDataJSONBlob_DTO.setFileImportTrackingId( trackingItem.getId() );
			
			fileImportTrackingDataJSONBlob_DAO.save(fileImportTrackingDataJSONBlob_DTO);
		 	
			for ( FileImportTrackingSingleFileDTO singleFileItem : singleFileDTOList ) {
				
				singleFileItem.setFileImportTrackingId( trackingItem.getId() );
				
				fileImportTrackingSingleFileDAO.save( singleFileItem );
			}
		} catch ( Exception e ) {
			String msg = "Failed saveImportTrackingAndChildrenInSingleDBTransaction(...)";
			log.error( msg , e);
		}
	}
		
}
