USE limelight ;

-- Some initial system config for running inside docker via official docker compose file

INSERT INTO config_system_tbl (config_key, config_value) VALUES ('spectral_storage_service_accept_import_base_url', 'http://spectr:8080/spectral_storage_accept_import');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('spectral_storage_service_get_data_base_url', 'http://spectr:8080/spectral_storage_get_data');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('email_from_address', 'no_reply@limelight-ms.org');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('email_smtp_server_host', '127.0.0.1 ');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('footer_center_of_page_html', 'Limelight Docker created by Michael Riffle (<a href="mailto:mriffle@uw.edu" target="_top">mriffle@uw.edu</a>)');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('file_import_limelight_xml_scans_temp_dir', '/data/mass_spec/Limelight_Importer_from_Webapp_Base');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('scan_file_import_allowed_via_web_submit', 'true');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('import_delete_uploaded_files_after_import', 'true');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_import_extra_emails_to_send_to', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('admin_email_address', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_import_failed_status_extra_emails_to_send_to', 'root@localhost');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('submit_import_received_emails_to_send_to', 'root@localhost');
