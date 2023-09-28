

--  Upgrade Limelight DB to version 5


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 5)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 5;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!



--   protein_coverage_tbl

ALTER TABLE protein_coverage_tbl 
ADD COLUMN protein_pre_residue CHAR(1) CHARACTER SET 'latin1' NULL COMMENT 'protein residue before peptide or \'n\' if peptide at start of protein.  null until computed' AFTER protein_is_independent_decoy,
ADD COLUMN protein_post_residue CHAR(1) CHARACTER SET 'latin1' NULL COMMENT 'protein residue after peptide or \'c\' if peptide at end of protein.  null until computed' AFTER protein_pre_residue,
ADD COLUMN peptide_at_protein_start_flag TINYINT UNSIGNED NULL COMMENT 'peptide is at start of protein sequence.   null until computed' AFTER protein_post_residue,
ADD COLUMN peptide_at_protein_end_flag TINYINT UNSIGNED NULL COMMENT 'peptide is at end of protein sequence.   null until computed' AFTER peptide_at_protein_start_flag;



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

-- -----------------------------------------------------
-- Table aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl
-- -----------------------------------------------------
CREATE TABLE  aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  label_short_key VARCHAR(60) NOT NULL,
  label VARCHAR(400) NOT NULL COMMENT '\'key\' for the record. unique index.',
  updates_complete TINYINT UNSIGNED NOT NULL COMMENT '1 when complete.',
  updates_complete_date_time DATETIME NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii
COMMENT = 'Track DB Updates - Root Table';

CREATE UNIQUE INDEX label_short_key_unique ON aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl (label_short_key ASC) VISIBLE;


-- -----------------------------------------------------
-- Table aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl
-- -----------------------------------------------------
CREATE TABLE  aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl (
  root_table_id_fk INT UNSIGNED NOT NULL,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (root_table_id_fk, search_id),
  CONSTRAINT fk_aa_limelight_db_updates_in_runiproridpm_cmpltfrsrchidtbl_1
    FOREIGN KEY (root_table_id_fk)
    REFERENCES aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_aa_limelight_db_updates_in_runiproridpm_cmpltfrsrchidtbl_2
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii
COMMENT = 'Track DB Updates - Table tracking Completion for a search id';

CREATE INDEX fk_aa_limelight_db_updates_in_runiproridpm_cmpltfrsrchidtbl_idx ON aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl (search_id ASC) VISIBLE;







-- -----------------------------------------------------

--    Pause Run Importer June 2023


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_cur_status_tp_vl_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_cur_status_tp_vl_tbl (
  type_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (type_id))
ENGINE = InnoDB
COMMENT = 'Type Values';


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_cur_status_st_vl_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_cur_status_st_vl_tbl (
  status_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (status_id))
ENGINE = InnoDB
COMMENT = 'Status Values';


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_cur_st_trigg_vl_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_cur_st_trigg_vl_tbl (
  trigger_type_id SMALLINT UNSIGNED NOT NULL COMMENT 'Current Status Trigger Type: request, schedule',
  label_text VARCHAR(400) NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (trigger_type_id))
ENGINE = InnoDB
COMMENT = 'Current Status Trigger Type Values: request, schedule';


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_current_status_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_current_status_tbl (
  type_id_fk SMALLINT UNSIGNED NOT NULL COMMENT 'Current Status - All of Run Importer Processing - Import and Import and Pipeline Run',
  status_id_fk SMALLINT UNSIGNED NOT NULL COMMENT 'The Requested Status to change to.  Input to the Run Importer process the next time this table is checked.',
  status_id_last_updated_date_time DATETIME NOT NULL,
  current_status_trigger_type_id_fk SMALLINT UNSIGNED NULL COMMENT 'trigger of current status: request, schedule.  null for not paused.',
  time_in_seconds_until_next_check_for_pause INT UNSIGNED NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (type_id_fk),
  CONSTRAINT fk_file_import__run_importer__pause_pcsg_cur_stats_tbl_1
    FOREIGN KEY (type_id_fk)
    REFERENCES file_import__run_importer__pause_processing_cur_status_tp_vl_tbl (type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_import__run_importer__pause_pcsg_cur_stats_tbl_2
    FOREIGN KEY (status_id_fk)
    REFERENCES file_import__run_importer__pause_processing_cur_status_st_vl_tbl (status_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_import__run_importer__pause_pcsg_cur_stats_tbl_3
    FOREIGN KEY (current_status_trigger_type_id_fk)
    REFERENCES file_import__run_importer__pause_processing_cur_st_trigg_vl_tbl (trigger_type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_file_import__import_and_pipeline_run__pause_processing_t_idx ON file_import__run_importer__pause_processing_current_status_tbl (status_id_fk ASC) VISIBLE;

CREATE INDEX fk_file_import__run_importer__pause_processing_current_stat_idx ON file_import__run_importer__pause_processing_current_status_tbl (current_status_trigger_type_id_fk ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_import__run_importer_alive__type_values_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer_alive__type_values_tbl (
  type_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (type_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import__run_importer_alive__status_values_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer_alive__status_values_tbl (
  status_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (status_id))
ENGINE = InnoDB
COMMENT = 'values for status_id';


-- -----------------------------------------------------
-- Table file_import__run_importer_alive_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer_alive_tbl (
  type_id_fk SMALLINT UNSIGNED NOT NULL,
  status_id_fk SMALLINT UNSIGNED NOT NULL,
  last_status_applied_date_time DATETIME NULL,
  time_in_seconds_until_next_alive_status_update INT UNSIGNED NOT NULL,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'NOW() of when record last had \"UPDATE\" applied since status_id may not change',
  PRIMARY KEY (type_id_fk),
  CONSTRAINT fk_file_import__run_importer_alive_tbl_1
    FOREIGN KEY (type_id_fk)
    REFERENCES file_import__run_importer_alive__type_values_tbl (type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_import__run_importer_alive_tbl_2
    FOREIGN KEY (status_id_fk)
    REFERENCES file_import__run_importer_alive__status_values_tbl (status_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'All of Run Importer Processing - Import and Import and Pipeline Run';

CREATE INDEX fk_file_import__import_and_pipeline_run__run_importer_alive_idx ON file_import__run_importer_alive_tbl (status_id_fk ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_prcssng_reqst_type_values_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_prcssng_reqst_type_values_tbl (
  type_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (type_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_prcssng_reqst_status_vals_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_prcssng_reqst_status_vals_tbl (
  status_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (status_id))
ENGINE = InnoDB
COMMENT = 'Status Values';


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_request_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_request_tbl (
  type_id_fk SMALLINT UNSIGNED NOT NULL COMMENT 'All of Run Importer Processing - Import and Import and Pipeline Run',
  status_id_requested_fk SMALLINT UNSIGNED NOT NULL COMMENT 'The Requested Status to change to.  Input to the Run Importer process the next time this table is checked.',
  status_id_requested_last_updated_date_time DATETIME NOT NULL,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (type_id_fk),
  CONSTRAINT fk_file_import__run_importer__ps_prcg_request_tbl_1
    FOREIGN KEY (type_id_fk)
    REFERENCES file_import__run_importer__pause_prcssng_reqst_type_values_tbl (type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_import__run_importer__ps_prcg_request_tbl_2
    FOREIGN KEY (status_id_requested_fk)
    REFERENCES file_import__run_importer__pause_prcssng_reqst_status_vals_tbl (status_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_file_import__run_importer__ps_prcg_request_tbl_2_idx ON file_import__run_importer__pause_processing_request_tbl (status_id_requested_fk ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_prcssng_sched_type_values_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_prcssng_sched_type_values_tbl (
  type_id SMALLINT UNSIGNED NOT NULL,
  label_text VARCHAR(400) NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (type_id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import__run_importer__pause_processing_schedule_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import__run_importer__pause_processing_schedule_tbl (
  type_id_fk SMALLINT UNSIGNED NOT NULL COMMENT 'All of Run Importer Processing - Import and Import and Pipeline Run',
  schedule_json MEDIUMTEXT NOT NULL,
  schedule_json_version INT UNSIGNED NOT NULL,
  schedule_last_updated_date_time DATETIME NOT NULL,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (type_id_fk),
  CONSTRAINT fk_file_import__run_importer__pause_processing_schedule_tbl_1
    FOREIGN KEY (type_id_fk)
    REFERENCES file_import__run_importer__pause_prcssng_sched_type_values_tbl (type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;






INSERT INTO file_import__run_importer__pause_processing_cur_status_tp_vl_tbl (type_id, label_text) VALUES (1, 'Pause All');

INSERT INTO file_import__run_importer__pause_processing_cur_status_st_vl_tbl (status_id, label_text) VALUES (1, 'NOT Paused');
INSERT INTO file_import__run_importer__pause_processing_cur_status_st_vl_tbl (status_id, label_text) VALUES (2, 'YES Paused');
INSERT INTO file_import__run_importer__pause_processing_cur_status_st_vl_tbl (status_id, label_text) VALUES (3, 'Paused Pending Completion');

INSERT INTO file_import__run_importer__pause_processing_cur_st_trigg_vl_tbl (trigger_type_id, label_text) VALUES (1, 'Paused for Request');
INSERT INTO file_import__run_importer__pause_processing_cur_st_trigg_vl_tbl (trigger_type_id, label_text) VALUES (2, 'Paused for Schedule');

INSERT INTO file_import__run_importer_alive__type_values_tbl (type_id, label_text) VALUES (1, 'Alive All');

INSERT INTO file_import__run_importer_alive__status_values_tbl (status_id, label_text) VALUES (1, 'Alive');
INSERT INTO file_import__run_importer_alive__status_values_tbl (status_id, label_text) VALUES (2, 'Shutdown');


INSERT INTO file_import__run_importer__pause_prcssng_reqst_type_values_tbl (type_id, label_text) VALUES (1, 'Pause All');

INSERT INTO file_import__run_importer__pause_prcssng_reqst_status_vals_tbl (status_id, label_text) VALUES (1, 'NOT Pause');
INSERT INTO file_import__run_importer__pause_prcssng_reqst_status_vals_tbl (status_id, label_text) VALUES (2, 'Pause Immediately');
INSERT INTO file_import__run_importer__pause_prcssng_reqst_status_vals_tbl (status_id, label_text) VALUES (3, 'Pause when complete');

INSERT INTO file_import__run_importer__pause_prcssng_sched_type_values_tbl (type_id, label_text) VALUES (1, 'Pause All');




-- -----------------------------------------------------

--    Gold Standard August 2023


-- -----------------------------------------------------
-- Table gold_standard_for_scan_file_root_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_for_scan_file_root_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  scan_file_id INT UNSIGNED NOT NULL,
  entry_fully_inserted TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Set to 1 when all data inserted',
  entry_fully_inserted_date_time DATETIME NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_root_tbl_20
    FOREIGN KEY (scan_file_id)
    REFERENCES scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_feature_detection_root_tbl_2_idx ON gold_standard_for_scan_file_root_tbl (scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table gold_standard_for_scan_file_root__project_scnfl_mapping_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_for_scan_file_root__project_scnfl_mapping_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  gold_standard_for_scan_file_root_id INT UNSIGNED NOT NULL,
  project_scan_file_id INT UNSIGNED NOT NULL,
  display_label VARCHAR(300) NOT NULL,
  description VARCHAR(5000) NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_gdstd_frscnfl_rt_prjtscnfl_mpg_10
    FOREIGN KEY (gold_standard_for_scan_file_root_id)
    REFERENCES gold_standard_for_scan_file_root_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_gdstd_frscnfl_rt_prjtscnfl_mpg_2
    FOREIGN KEY (project_scan_file_id)
    REFERENCES project_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Map gold_standard_for_scan_file_root record to project_scan_file_tbl record';

CREATE INDEX fk_gdstd_frscnfl_rt_prjtscnfl_mpg_10_idx ON gold_standard_for_scan_file_root__project_scnfl_mapping_tbl (gold_standard_for_scan_file_root_id ASC) VISIBLE;

CREATE INDEX fk_gdstd_frscnfl_rt_prjtscnfl_mpg_2_idx ON gold_standard_for_scan_file_root__project_scnfl_mapping_tbl (project_scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table gold_standard_uploaded_file_stats_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_uploaded_file_stats_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  gold_standard_for_scan_file_root_id INT UNSIGNED NOT NULL,
  uploaded_filename VARCHAR(255) NULL,
  uploaded_file_size INT UNSIGNED NOT NULL,
  uploaded_file_sha1_sum VARCHAR(45) NULL,
  uploaded_file_sha384_zero_in_second_digit VARCHAR(300) NULL COMMENT 'For each hex pair, if zero in second digit keep it.  This is maybe different from standard display of sha384.',
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_gold_standard_uploaded_file_stats_tbl_1
    FOREIGN KEY (gold_standard_for_scan_file_root_id)
    REFERENCES gold_standard_for_scan_file_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_gold_standard_uploaded_file_stats_tbl_1_idx ON gold_standard_uploaded_file_stats_tbl (gold_standard_for_scan_file_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table gold_standard_uploaded_file_contents_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_uploaded_file_contents_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  gold_standard_for_scan_file_root_id INT UNSIGNED NOT NULL,
  gold_standard_file_contents_json_gzip MEDIUMBLOB NOT NULL COMMENT 'JSON for Java class GoldStandard_Data_Root_Data_JSON_V001 or later version',
  gold_standard_file_contents_json_version_number SMALLINT UNSIGNED NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_gold_standard_uploaded_file_stats_tbl_10
    FOREIGN KEY (gold_standard_for_scan_file_root_id)
    REFERENCES gold_standard_for_scan_file_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_gold_standard_uploaded_file_stats_tbl_10_idx ON gold_standard_uploaded_file_contents_tbl (gold_standard_for_scan_file_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table gold_standard_single_entry_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_single_entry_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  gold_standard_for_scan_file_root_id INT UNSIGNED NOT NULL,
  scan_number INT UNSIGNED NOT NULL,
  peptide_sequence VARCHAR(2000) CHARACTER SET 'ascii' NOT NULL COMMENT 'Plain Peptide Sequence',
  scan_number_peptide_sequence_mods_json MEDIUMTEXT CHARACTER SET 'ascii' COLLATE 'ascii_bin' NOT NULL,
  scan_number_peptide_sequence_mods_json_version_number SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_gold_standard_single_entry_tbl_1
    FOREIGN KEY (gold_standard_for_scan_file_root_id)
    REFERENCES gold_standard_for_scan_file_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX gold_standard_for_scan_file_root_id_idx ON gold_standard_single_entry_tbl (gold_standard_for_scan_file_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table gold_standard_single_entry_unique_mod_mass_tbl
-- -----------------------------------------------------
CREATE TABLE  gold_standard_single_entry_unique_mod_mass_tbl (
  gold_standard_single_entry_id INT UNSIGNED NOT NULL,
  modification_mass_unique DOUBLE NOT NULL,
  PRIMARY KEY (gold_standard_single_entry_id, modification_mass_unique),
  CONSTRAINT fk_gold_std_sgle_entry_ms_uq
    FOREIGN KEY (gold_standard_single_entry_id)
    REFERENCES gold_standard_single_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------

--   Feature Detection Changes  2023 08


ALTER TABLE feature_detection_singular_feature_entry_mods_tbl 
CHANGE COLUMN modification_mass modification_field VARCHAR(2000) NULL DEFAULT NULL ;


-- -----------------------------------------------------
-- Table feature_detection_singular_feature_entry__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_singular_feature_entry__insert_id_tbl (
  id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get block of id values to insert to feature_detection_singular_feature_entry_tbl';

-- Populate Table feature_detection_singular_feature_entry__insert_id_tbl
INSERT INTO feature_detection_singular_feature_entry__insert_id_tbl
SELECT If( Max(id), Max(id), 0) FROM feature_detection_singular_feature_entry_tbl;


-- -----------------------------------------------------
-- Table feature_detection_persistent_feature_entry__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_feature_entry__insert_id_tbl (
  id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get block of id values to insert to feature_detection_persistent_feature_entry_tbl';

-- Populate Table feature_detection_persistent_feature_entry__insert_id_tbl
INSERT INTO feature_detection_persistent_feature_entry__insert_id_tbl
SELECT If( Max(id), Max(id), 0) FROM feature_detection_persistent_feature_entry_tbl;



-- -----------------------------------------------------

--   Importer Batch Insert Changes  2023 08

-- -----------------------------------------------------
-- Table psm_open_modification__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_open_modification__insert_id_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table psm_open_modification_tbl';


-- Populate Table psm_open_modification__insert_id_tbl
INSERT INTO psm_open_modification__insert_id_tbl
SELECT If( Max(id), Max(id), 0) FROM psm_open_modification_tbl;


-- -----------------------------------------------------
-- Table psm_descriptive_annotation__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_descriptive_annotation__insert_id_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table psm_descriptive_annotation_tbl';


-- Populate Table psm_descriptive_annotation__insert_id_tbl
INSERT INTO psm_descriptive_annotation__insert_id_tbl
SELECT If( Max(id), Max(id), 0) FROM psm_descriptive_annotation_tbl;


-- -----------------------------------------------------
-- Table srch__rep_pept_descriptive_annotation__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__rep_pept_descriptive_annotation__insert_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- Populate Table srch__rep_pept_descriptive_annotation__insert_id_tbl
INSERT INTO srch__rep_pept_descriptive_annotation__insert_id_tbl
SELECT If( Max(id), Max(id), 0) FROM srch__rep_pept_descriptive_annotation_tbl;




-- -----------------------------------------------------


-- --------------------------

--    UPDATE NEW FIELDS

--   file_import_tracking_single_file_tbl

UPDATE file_import_tracking_single_file_tbl
  SET file_location_or_aws_s3_object_provided_from_external_system = 1
  WHERE filename_on_disk_with_path_sub_same_machine IS NOT NULL;
  
  
  
INSERT INTO file_import_tracking_single_file_type_lookup_tbl (id, display_text) VALUES ( 4, 'Generic Other File' );


--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 5)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 5;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
