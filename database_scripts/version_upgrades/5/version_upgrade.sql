

--  Upgrade Limelight DB to version 5


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 5)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 5;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!



--   search_scan_file_importer_tbl

ALTER TABLE search_scan_file_importer_tbl 
ADD COLUMN aws_s3_region VARCHAR(200) NULL AFTER aws_s3_object_key;

--   scan_file_source_first_import_tbl

ALTER TABLE scan_file_source_first_import_tbl 
ADD COLUMN aws_s3_region VARCHAR(200) NULL AFTER aws_s3_object_key;

--   project_scan_file_importer_tbl

ALTER TABLE project_scan_file_importer_tbl 
ADD COLUMN aws_s3_region VARCHAR(200) NULL AFTER aws_s3_object_key;

--   File Import Tables

--   file_import_tracking_tbl

ALTER TABLE file_import_tracking_tbl 
ADD COLUMN remote_user_ip_address_init VARCHAR(45) NULL AFTER status_id,
ADD COLUMN init_request_url VARCHAR(255) NULL AFTER search_path,
ADD COLUMN record_init_date_time TIMESTAMP NULL AFTER submit_request_url,
CHANGE COLUMN remote_user_ip_address remote_user_ip_address_submit VARCHAR(45)  NULL ,
CHANGE COLUMN insert_request_url submit_request_url VARCHAR(255) NULL ,
CHANGE COLUMN record_insert_date_time record_submit_date_time TIMESTAMP NULL ;

--   file_import_tracking_single_file_tbl

ALTER TABLE file_import_tracking_single_file_tbl 
ADD COLUMN file_index INT NULL AFTER file_import_tracking_id,
ADD COLUMN aws_s3_bucket_name MEDIUMTEXT NULL AFTER absolute_filename_w_path_on_submit_machine,
ADD COLUMN aws_s3_object_key MEDIUMTEXT NULL AFTER aws_s3_bucket_name,
ADD COLUMN aws_s3_region VARCHAR(255) NULL AFTER aws_s3_object_key,
ADD COLUMN unique_request_identifier_from_submitter VARCHAR(255) NULL COMMENT 'tied to this file_import_tracking_id and file_index'
	AFTER aws_s3_region,
ADD COLUMN file_location_or_aws_s3_object_provided_from_external_system TINYINT NOT NULL DEFAULT 0  COMMENT 'NULL for old existing records'
	AFTER unique_request_identifier_from_submitter,
ADD COLUMN file_location_or_aws_s3_obj_prov_fm_ext_sys_delete_af_imprt TINYINT NOT NULL DEFAULT 0 
	COMMENT 'file_location_or_aws_s3_object_provided_from_external_system Delete after Import whether Import success or fail'
	AFTER file_location_or_aws_s3_object_provided_from_external_system,
CHANGE COLUMN filename_on_disk filename_on_disk VARCHAR(500) NULL ,
CHANGE COLUMN filename_on_disk_with_path_sub_same_machine filename_on_disk_with_path_sub_same_machine MEDIUMTEXT NULL DEFAULT NULL ,
CHANGE COLUMN canonical_filename_w_path_on_submit_machine canonical_filename_w_path_on_submit_machine MEDIUMTEXT NULL DEFAULT NULL ,
CHANGE COLUMN absolute_filename_w_path_on_submit_machine absolute_filename_w_path_on_submit_machine MEDIUMTEXT  NULL DEFAULT NULL ,
ADD UNIQUE INDEX file_import_tracking_id_file_index_unique (file_import_tracking_id ASC, file_index ASC) VISIBLE;

-- -----------------------------------------------------
-- Table file_import_tracking_data_from_init_json_blob_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_data_from_init_json_blob_tbl (
  file_import_tracking_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (file_import_tracking_id),
  CONSTRAINT file_import_tracking_data_from_init_json_blob_fk
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table file_import_tracking_single_file_init_json_blob_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_init_json_blob_tbl (
  file_import_tracking_single_file_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (file_import_tracking_single_file_id),
  CONSTRAINT fk_file_import_tracking_single_file_init_json_blob_fk
    FOREIGN KEY (file_import_tracking_single_file_id)
    REFERENCES file_import_tracking_single_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_single_file_complete_json_blob_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_complete_json_blob_tbl (
  file_import_tracking_single_file_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (file_import_tracking_single_file_id),
  CONSTRAINT fk_file_import_tracking_single_file_cplt_json_blob_fk
    FOREIGN KEY (file_import_tracking_single_file_id)
    REFERENCES file_import_tracking_single_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_single_file_s3_upload_part_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_s3_upload_part_tbl (
  file_import_tracking_single_file_id INT UNSIGNED NOT NULL,
  s3_upload_part_number SMALLINT UNSIGNED NOT NULL,
  s3_upload_part_start_byte_zero_based BIGINT UNSIGNED NOT NULL,
  s3_upload_part_end_byte_zero_based BIGINT UNSIGNED NOT NULL,
  s3_upload_part_etag VARCHAR(500) NOT NULL,
  PRIMARY KEY (file_import_tracking_single_file_id, s3_upload_part_number),
  CONSTRAINT fk_file_import_tracking_single_file_s3_upload_part_tbl_1
    FOREIGN KEY (file_import_tracking_single_file_id)
    REFERENCES file_import_tracking_single_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_single_file_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_single_file_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  import_and_pipeline_run_tracking_id INT UNSIGNED NOT NULL,
  file_index INT NULL,
  file_upload_status_id TINYINT UNSIGNED NOT NULL,
  file_type_id TINYINT UNSIGNED NOT NULL,
  filename_in_upload VARCHAR(500) NOT NULL,
  filename_on_disk VARCHAR(500) NULL,
  file_size BIGINT UNSIGNED NULL,
  sha1_sum VARCHAR(255) NULL,
  filename_on_disk_with_path_sub_same_machine MEDIUMTEXT NULL,
  canonical_filename_w_path_on_submit_machine MEDIUMTEXT NULL,
  absolute_filename_w_path_on_submit_machine MEDIUMTEXT NULL,
  aws_s3_bucket_name MEDIUMTEXT NULL,
  aws_s3_object_key MEDIUMTEXT NULL,
  aws_s3_region VARCHAR(255) NULL,
  unique_request_identifier_from_submitter VARCHAR(255) NULL COMMENT 'tied to this file_import_tracking_id and file_index',
  file_location_or_aws_s3_object_provided_from_external_system TINYINT NOT NULL DEFAULT 0 COMMENT 'NULL for old existing records',
  file_location_or_aws_s3_obj_prov_fm_ext_sys_delete_af_imprt TINYINT NOT NULL DEFAULT 0 COMMENT 'file_location_or_aws_s3_object_provided_from_external_system Delete after Import whether Import success or fail',
  PRIMARY KEY (id),
  CONSTRAINT imprt_ppl_rn_trkng_sngl_fl_up_st_id
    FOREIGN KEY (file_upload_status_id)
    REFERENCES file_import_tracking_single_file_upload_status_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT imprt_ppl_rn_trkng_sngl_fl_prnt_id
    FOREIGN KEY (import_and_pipeline_run_tracking_id)
    REFERENCES import_and_pipeline_run_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_imprt_trkng_sngl_fl_up_st_id_idx ON import_and_pipeline_run_tracking_single_file_tbl (file_upload_status_id ASC) VISIBLE;

CREATE UNIQUE INDEX file_import_tracking_id_file_index_unique ON import_and_pipeline_run_tracking_single_file_tbl (import_and_pipeline_run_tracking_id ASC, file_index ASC) VISIBLE;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_trckg_snglfl_complt_json_blb_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_trckg_snglfl_complt_json_blb_tbl (
  import_and_pipeline_run_trckng_single_file_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (import_and_pipeline_run_trckng_single_file_id),
  CONSTRAINT import_and_pplnrun_trckg_snglfl_cp_id_fk
    FOREIGN KEY (import_and_pipeline_run_trckng_single_file_id)
    REFERENCES import_and_pipeline_run_tracking_single_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_trckg_snglfl_init_json_blb_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_trckg_snglfl_init_json_blb_tbl (
  import_and_pipeline_run_trckng_single_file_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (import_and_pipeline_run_trckng_single_file_id),
  CONSTRAINT import_and_pplnrun_trckg_snglfl_in_blb_id_fk
    FOREIGN KEY (import_and_pipeline_run_trckng_single_file_id)
    REFERENCES import_and_pipeline_run_tracking_single_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- --------------------------

--    UPDATE NEW FIELDS

--   file_import_tracking_single_file_tbl

UPDATE file_import_tracking_single_file_tbl
  SET file_location_or_aws_s3_object_provided_from_external_system = 1
  WHERE filename_on_disk_with_path_sub_same_machine IS NOT NULL;
  

--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 5)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 5;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
