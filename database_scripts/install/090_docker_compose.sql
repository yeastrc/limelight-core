USE limelight ;

-- Some initial system config for running inside docker via official docker compose file

INSERT INTO config_system_tbl (config_key, config_value) VALUES ('spectral_storage_service_accept_import_base_url', 'http://spectr:8080/spectral_storage_accept_import');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('spectral_storage_service_get_data_base_url', 'http://spectr:8080/spectral_storage_get_data');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('email_from_address', '');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('email_smtp_server_host', 'smtp');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('footer_center_of_page_html', 'Limelight Docker created by Michael Riffle (<a href="mailto:mriffle@uw.edu" target="_top">mriffle@uw.edu</a>)');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('file_import_limelight_xml_scans_temp_dir', '/data/limelight_upload');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('scan_file_import_allowed_via_web_submit', 'true');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('import_delete_uploaded_files_after_import', 'true');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_import_extra_emails_to_send_to', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('admin_email_address', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_import_failed_status_extra_emails_to_send_to', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('submit_import_received_emails_to_send_to', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('blib_spectral_library_file_creation_web_service_base_url', 'http://blib-export:3434');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('blib_spectral_library_file_result_file_base_path', '/data/limelight_downloads/blib_exports');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_feature_detection_service_run_hardklor_bullseye_web_service_base_url', 'http://feature-detection:3434');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_feature_detection_service_run_hardklor_bullseye_result_files_base_path', '/data/feature_detection/finaldir');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('yrc_file_object_storage_web_service_base_url', 'http://file-object-store:8080');
