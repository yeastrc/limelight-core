
--  INSERT INITIAL VALUES USED BY WEBAPP TO HANDLE PERMISSIONS,  Must match Java class AuthAccessLevelConstants

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 0, 'admin', 'application wide, admin' );
	
INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 25, 'create new project', 'application wide, can create new project' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 30, 'project owner', 'control all aspects of project' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 38, 'assistant project owner', 'change most aspects of project except add/remove other assistant project owners' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 40, 'update project and delete runs', 'update project and delete runs' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 50, 'update project but not delete runs', 'update project but not delete runs' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 99, 'read project', 'not able to make changes to project' );

INSERT INTO user_access_level_label_description_tbl (user_access_level_numeric_value, label, description) 
	VALUES ( 9999, 'no access', 'at project level, no access to that project, at application wide level, no access to any project' );

	
	


--  Search table status values (in field status_id)	

	--  These values must be kept in sync with the values in the Java class SearchRecordStatus
	
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 1, 'importing' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 2, 'importing/waiting for Scan File Import(s)' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 3, 'import complete/view' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 4, 'import fail' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 5, 'import canceled/incomplete' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 6, 'marked for deletion' );
INSERT INTO search_record_status_lookup_tbl (id, display_text) VALUES ( 7, 'deletion in progress' );


--   Search Data Lookup Parameters Lookup Types

	--  These values must be kept in sync with the values in the Java class SearchDataLookupParametersLookupTypes

INSERT INTO search_data_lookup_parameters_type_id (id, type_label) VALUES ( 1, 'project search ids' );



--  Import via web app lookup values	

	--  These values must be kept in sync with the values in the Java class FileImportFileType
	
INSERT INTO file_import_tracking_single_file_type_lookup_tbl (id, display_text) VALUES ( 1, 'Limelight XML File' );
INSERT INTO file_import_tracking_single_file_type_lookup_tbl (id, display_text) VALUES ( 2, 'Scan File' );

	--  These values must be kept in sync with the values in the Java class FileImportFileUploadStatus
	
INSERT INTO file_import_tracking_single_file_upload_status_lookup_tbl (id, display_text) VALUES ( 1, 'Record Inserted' );
INSERT INTO file_import_tracking_single_file_upload_status_lookup_tbl (id, display_text) VALUES ( 2, 'File Upload Started' );
INSERT INTO file_import_tracking_single_file_upload_status_lookup_tbl (id, display_text) VALUES ( 3, 'File Upload Complete' );




	--  These values must be kept in sync with the values in the Java class FileImportStatus
    
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 1, 'init_insert_pre_queued' );
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 2, 'queued' );
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 3, 're-queued' );
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 4, 'started' );
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 5, 'complete' );
INSERT INTO file_import_tracking_status_values_lookup_tbl (id, display_text) VALUES ( 6, 'failed' );


	--  These values must be kept in sync with the values in the Java class FileImportRunSubStatus
    
INSERT INTO file_import_tracking_run_sub_status_values_lookup_tbl (id, display_text) VALUES ( 1, 'system error' );
INSERT INTO file_import_tracking_run_sub_status_values_lookup_tbl (id, display_text) VALUES ( 2, 'data error' );
INSERT INTO file_import_tracking_run_sub_status_values_lookup_tbl (id, display_text) VALUES ( 3, 'project not allow import' );

	
--  Insert entries into isotope_label_tbl

--     Do NOT add new entries without adding support in the Limelight code (and probably libraries that Limelight code uses)

--  id for 'none' is hard coded in Java in class IsotopeLabelsConstants
INSERT INTO isotope_label_tbl (id, name) VALUES ( 1, "none" );

--  The rest of records use auto increment for id
INSERT INTO isotope_label_tbl (name) VALUES ( "13C" );
INSERT INTO isotope_label_tbl (name) VALUES ( "15N" );
INSERT INTO isotope_label_tbl (name) VALUES ( "18O" ); -- (this is the letter O not zero)
INSERT INTO isotope_label_tbl (name) VALUES ( "2H" );

--  INSERT to config_system_tbl to connect to YRC services for protein listing and protein annotation (paws)

INSERT INTO config_system_tbl (config_key, config_value) VALUES ('protein_annotation_webservice_url', 'http://yeastrc.org/paws/services/');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('protein_listing_from_sequence_taxonomy_webservice_url', 'http://yeastrc.org/pdr/services/');

