

--  Upgrade Limelight DB to version 4


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 4)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 4;
    

--  Add search_short_name field 

ALTER TABLE project_search_tbl 
ADD COLUMN search_short_name VARCHAR(50) NULL AFTER search_name;

ALTER TABLE file_import_tracking_tbl 
ADD COLUMN search_short_name VARCHAR(50) NULL AFTER search_name;




--  Add last_used_in_search_import field for Database Cleanup code

ALTER TABLE peptide_tbl 
ADD COLUMN last_used_in_search_import DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER sequence;

ALTER TABLE reported_peptide_tbl
ADD COLUMN last_used_in_search_import DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER sequence;

ALTER TABLE protein_sequence_tbl
ADD COLUMN last_used_in_search_import DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER sequence;

ALTER TABLE protein_sequence_annotation_tbl
ADD COLUMN last_used_in_search_import DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER description;

--  Update folder_project_search_tbl for add same search to multiple folders

--  Update Primary Key to add field folder_id
ALTER TABLE folder_project_search_tbl
DROP PRIMARY KEY,
ADD PRIMARY KEY (project_search_id, folder_id);
--  Add field for order searches within a folder
ALTER TABLE folder_project_search_tbl 
ADD COLUMN search_display_order INT NOT NULL DEFAULT 0 AFTER folder_id;
--  Add field
ALTER TABLE folder_project_search_tbl 
ADD COLUMN dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER search_display_order;


-- !!!!   ADD new tables from DB install script   !!!!   


-- -----------------------------------------------------
-- Table feature_detection_root_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_root_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  scan_file_id INT UNSIGNED NOT NULL,
  entry_fully_inserted TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Set to 1 when all data inserted',
  entry_fully_inserted_date_time DATETIME NULL,
  feature_detection_type_label VARCHAR(255) NULL COMMENT 'A label for what type like hardklor',
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_root_tbl_2
    FOREIGN KEY (scan_file_id)
    REFERENCES scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_feature_detection_root_tbl_2_idx ON feature_detection_root_tbl (scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_singular_feature_uploaded_file_stats_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_singular_feature_uploaded_file_stats_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  file_fully_inserted TINYINT NOT NULL DEFAULT 0,
  file_fully_inserted_date_time DATETIME NULL,
  feature_detection_program_name VARCHAR(45) NULL,
  feature_detection_program_version VARCHAR(45) NULL,
  feature_detection_program_primary_version SMALLINT UNSIGNED NULL,
  uploaded_filename VARCHAR(255) NULL,
  uploaded_file_size INT UNSIGNED NOT NULL,
  uploaded_file_sha1_sum VARCHAR(45) NULL,
  uploaded_file_sha384_zero_in_second_digit VARCHAR(300) NULL COMMENT 'For each hex pair, if zero in second digit keep it.  This is maybe different from standard display of sha384.',
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_singular_feature_uploaded_file_stats_tbl_1
    FOREIGN KEY (feature_detection_root_id)
    REFERENCES feature_detection_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'hardklor etc';

CREATE INDEX fk_feature_detection_singular_feature_uploaded_file_stats_t_idx ON feature_detection_singular_feature_uploaded_file_stats_tbl (feature_detection_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_singular_feature_entry_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_singular_feature_entry_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  feature_detection_singular_feature_uploaded_file_stats_id INT UNSIGNED NOT NULL,
  ms_1_scan_number INT UNSIGNED NOT NULL,
  monoisotopic_mass DOUBLE NULL,
  charge TINYINT NULL,
  intensity DOUBLE NULL,
  base_isotope_peak DOUBLE NULL,
  analysis_window_start_m_z DOUBLE NULL,
  analysis_window_end_m_z DOUBLE NULL,
  correlation_score DOUBLE NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_singular_feature_entry_tbl_1
    FOREIGN KEY (feature_detection_singular_feature_uploaded_file_stats_id)
    REFERENCES feature_detection_singular_feature_uploaded_file_stats_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_feature_detection_singular_feature_entry_tbl_1_idx ON feature_detection_singular_feature_entry_tbl (feature_detection_singular_feature_uploaded_file_stats_id ASC) VISIBLE;

CREATE INDEX feature_detection_root_id_idx ON feature_detection_singular_feature_entry_tbl (feature_detection_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_other_uploaded_file_like_conf_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_other_uploaded_file_like_conf_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  file_fully_inserted TINYINT NOT NULL DEFAULT 0,
  file_fully_inserted_date_time DATETIME NULL,
  limelight_internal_filename VARCHAR(255) NOT NULL COMMENT 'name used to store file on disk',
  uploaded_filename VARCHAR(255) NULL,
  uploaded_file_size INT UNSIGNED NOT NULL,
  uploaded_file_sha1_sum VARCHAR(45) NULL,
  uploaded_file_sha384_zero_in_second_digit VARCHAR(300) NULL COMMENT 'For each hex pair, if zero in second digit keep it.  This is maybe different from standard display of sha384.',
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  file_contents LONGBLOB NULL,
  PRIMARY KEY (id),
  CONSTRAINT feature_detection_other_uploaded_file_like_conf_tbl_1
    FOREIGN KEY (feature_detection_root_id)
    REFERENCES feature_detection_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX feature_detection_other_uploaded_file_like_conf_tbl_1_idx ON feature_detection_other_uploaded_file_like_conf_tbl (feature_detection_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_singular_feature_entry_mods_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_singular_feature_entry_mods_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_singular_feature_entry_id INT UNSIGNED NOT NULL,
  modification_mass DOUBLE NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_singular_feature_entry_mods_tbl_1
    FOREIGN KEY (feature_detection_singular_feature_entry_id)
    REFERENCES feature_detection_singular_feature_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Modifications';

CREATE INDEX fk_feature_detection_singular_feature_entry_mods_tbl_1_idx ON feature_detection_singular_feature_entry_mods_tbl (feature_detection_singular_feature_entry_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_persistent_feature_uploaded_file_stats_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_feature_uploaded_file_stats_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  file_fully_inserted TINYINT NOT NULL DEFAULT 0,
  file_fully_inserted_date_time DATETIME NULL,
  feature_detection_program_name VARCHAR(45) NULL,
  feature_detection_program_version VARCHAR(45) NULL,
  feature_detection_program_primary_version SMALLINT UNSIGNED NULL,
  uploaded_filename VARCHAR(255) NULL,
  uploaded_file_size INT UNSIGNED NOT NULL,
  uploaded_file_sha1_sum VARCHAR(45) NULL,
  uploaded_file_sha384_zero_in_second_digit VARCHAR(300) NULL COMMENT 'For each hex pair, if zero in second digit keep it.  This is maybe different from standard display of sha384.',
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_main_uploaded_file_stats_tbl_10
    FOREIGN KEY (feature_detection_root_id)
    REFERENCES feature_detection_root_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'bullseye etc';

CREATE INDEX fk_feature_detection_main_uploaded_file_stats_tbl_1_idx ON feature_detection_persistent_feature_uploaded_file_stats_tbl (feature_detection_root_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_persistent_feature_entry_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_feature_entry_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  feature_detection_persistent_feature_uploaded_file_stats_id INT UNSIGNED NOT NULL,
  monoisotopic_mass DOUBLE NOT NULL,
  charge TINYINT NOT NULL,
  retention_time_range_start FLOAT NOT NULL,
  retention_time_range_end FLOAT NOT NULL,
  retention_time_range_apex FLOAT NOT NULL,
  abundance_retention_time_range_apex DOUBLE NOT NULL,
  abundance_total DOUBLE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_feature_detection_persistent_feature_entry_tbl_1
    FOREIGN KEY (feature_detection_persistent_feature_uploaded_file_stats_id)
    REFERENCES feature_detection_persistent_feature_uploaded_file_stats_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX feature_detection_root_id_idx ON feature_detection_persistent_feature_entry_tbl (feature_detection_root_id ASC) VISIBLE;

CREATE INDEX fk_feature_detection_persistent_feature_entry_tbl_1_idx ON feature_detection_persistent_feature_entry_tbl (feature_detection_persistent_feature_uploaded_file_stats_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_persistent_feature_entry_ms_2_scan_number_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_feature_entry_ms_2_scan_number_tbl (
  feature_detection_persistent_feature_entry_id INT UNSIGNED NOT NULL,
  ms_2_scan_number INT UNSIGNED NOT NULL,
  PRIMARY KEY (feature_detection_persistent_feature_entry_id, ms_2_scan_number),
  CONSTRAINT fk_ftr_dtn_prstnt_ftr_ntr_ms_2_scn_nbr
    FOREIGN KEY (feature_detection_persistent_feature_entry_id)
    REFERENCES feature_detection_persistent_feature_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table feature_detection_map_persistnt_to_snglr_feature_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_map_persistnt_to_snglr_feature_tbl (
  feature_detection_persistent_feature_entry_id INT UNSIGNED NOT NULL,
  feature_detection_singular_feature_entry_id INT UNSIGNED NOT NULL,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (feature_detection_persistent_feature_entry_id, feature_detection_singular_feature_entry_id),
  CONSTRAINT fk_ft_detn_pstnt_sngr_ftr_mapping1
    FOREIGN KEY (feature_detection_persistent_feature_entry_id)
    REFERENCES feature_detection_persistent_feature_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_ft_detn_pstnt_sngr_ftr_mapping2
    FOREIGN KEY (feature_detection_singular_feature_entry_id)
    REFERENCES feature_detection_singular_feature_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'many to many mapping table';

CREATE INDEX feature_detection_root_id_idx ON feature_detection_map_persistnt_to_snglr_feature_tbl (feature_detection_root_id ASC) VISIBLE;

CREATE INDEX fk_feature_detection_persistent_to_singular_feature_mapping_idx ON feature_detection_map_persistnt_to_snglr_feature_tbl (feature_detection_singular_feature_entry_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_featr_enty_ms_2_scn_nmbrs_json_tbl (
  feature_detection_persistent_feature_entry_id INT UNSIGNED NOT NULL,
  ms_2_scan_numbers_json_array MEDIUMTEXT NOT NULL,
  PRIMARY KEY (feature_detection_persistent_feature_entry_id),
  CONSTRAINT fk_ftr_dtn_prstnt_ftr_ntr_ms2_scnnbr_jn
    FOREIGN KEY (feature_detection_persistent_feature_entry_id)
    REFERENCES feature_detection_persistent_feature_entry_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table feature_detection_persistent_feature_file_header_contents_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_persistent_feature_file_header_contents_tbl (
  feature_detection_persistent_feature_uploaded_file_stats_id INT UNSIGNED NOT NULL,
  file_header_contents MEDIUMTEXT CHARACTER SET 'latin1' NOT NULL,
  PRIMARY KEY (feature_detection_persistent_feature_uploaded_file_stats_id),
  CONSTRAINT fk_ftr_dtn_prstnt_ftr_hdr_cts
    FOREIGN KEY (feature_detection_persistent_feature_uploaded_file_stats_id)
    REFERENCES feature_detection_persistent_feature_uploaded_file_stats_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table feature_detection_singular_feature_file_header_contents_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_singular_feature_file_header_contents_tbl (
  feature_detection_singular_feature_uploaded_file_stats_id INT UNSIGNED NOT NULL,
  file_header_contents MEDIUMTEXT CHARACTER SET 'latin1' NOT NULL,
  PRIMARY KEY (feature_detection_singular_feature_uploaded_file_stats_id),
  CONSTRAINT fk_ftr_dtn_snglr_ftr_hdr_cts
    FOREIGN KEY (feature_detection_singular_feature_uploaded_file_stats_id)
    REFERENCES feature_detection_singular_feature_uploaded_file_stats_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table project_scan_file_tbl
-- -----------------------------------------------------
CREATE TABLE  project_scan_file_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  scan_file_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT project_scan_filename_project_fk
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT project_scan_filename_scan_file_fk
    FOREIGN KEY (scan_file_id)
    REFERENCES scan_file_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Scan file in a project';

CREATE INDEX project_id_idx ON project_scan_file_tbl (project_id ASC) VISIBLE;

CREATE INDEX search_scan_filename_scan_file_fk_idx ON project_scan_file_tbl (scan_file_id ASC) VISIBLE;

CREATE UNIQUE INDEX unique_record ON project_scan_file_tbl (project_id ASC, scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table project_scan_file_importer_tbl
-- -----------------------------------------------------
CREATE TABLE  project_scan_file_importer_tbl (
  project_scan_file_id INT UNSIGNED NOT NULL,
  file_size BIGINT NOT NULL,
  sha1sum VARCHAR(255) NOT NULL,
  canonical_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  absolute_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  aws_s3_bucket_name VARCHAR(2000) NULL,
  aws_s3_object_key VARCHAR(2000) NULL,
  PRIMARY KEY (project_scan_file_id),
  CONSTRAINT prjct_scn_filenm_srch_scn_file_id
    FOREIGN KEY (project_scan_file_id)
    REFERENCES project_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
COMMENT = 'Tracks a scan file where imported from.  ';

CREATE INDEX prjct_scn_filenm_srch_scn_file_id_idx ON project_scan_file_importer_tbl (project_scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table project_scan_filename_tbl
-- -----------------------------------------------------
CREATE TABLE  project_scan_filename_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_scan_file_id INT UNSIGNED NOT NULL,
  scan_filename VARCHAR(700) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_project_scan_file_info_tbl_1
    FOREIGN KEY (project_scan_file_id)
    REFERENCES project_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Filename for Scan file in a project - Entry per scan filename';

CREATE UNIQUE INDEX unique_record ON project_scan_filename_tbl (project_scan_file_id ASC, scan_filename ASC) VISIBLE;


-- -----------------------------------------------------
-- Table project_scan_filename__search_scan_file__mapping_tbl
-- -----------------------------------------------------
CREATE TABLE  project_scan_filename__search_scan_file__mapping_tbl (
  project_scan_filename_id INT UNSIGNED NOT NULL,
  search_scan_file_id MEDIUMINT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL COMMENT 'field exists so auto delete on remove project_search_tbl record',
  PRIMARY KEY (project_scan_filename_id, search_scan_file_id, project_search_id),
  CONSTRAINT fk_prjscnfl_srchscnfl_mp_ssf_fk
    FOREIGN KEY (search_scan_file_id)
    REFERENCES search_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_prjscnfl_srchscnfl_mp_psfi_fk
    FOREIGN KEY (project_scan_filename_id)
    REFERENCES project_scan_filename_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_prjscnfl_srchscnfl_mp_ps_fk
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'map project_scan_filename_tbl to project_scan_filename_tbl';

CREATE INDEX search_scan_file_id ON project_scan_filename__search_scan_file__mapping_tbl (search_scan_file_id ASC) VISIBLE;

CREATE INDEX fk_prjscnfl_srchscnfl_mp_ps_fk_idx ON project_scan_filename__search_scan_file__mapping_tbl (project_search_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table feature_detection_root__project_scnfl_mapping_tbl
-- -----------------------------------------------------
CREATE TABLE  feature_detection_root__project_scnfl_mapping_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  feature_detection_root_id INT UNSIGNED NOT NULL,
  project_scan_file_id INT UNSIGNED NOT NULL,
  display_label VARCHAR(300) NOT NULL,
  description VARCHAR(5000) NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT UNSIGNED NOT NULL,
  updated_by_user_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_featdetctrt_prjtscnfl_mp_1
    FOREIGN KEY (feature_detection_root_id)
    REFERENCES feature_detection_root_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_featdetctrt_prjtscnfl_mp_2
    FOREIGN KEY (project_scan_file_id)
    REFERENCES project_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Map feature_detection_root_tbl record to project_scan_file_tbl record';

CREATE INDEX fk_featdetctrt_prjtscnfl_mp_1_idx ON feature_detection_root__project_scnfl_mapping_tbl (feature_detection_root_id ASC) VISIBLE;

CREATE INDEX fk_featdetctrt_prjtscnfl_mp_2_idx ON feature_detection_root__project_scnfl_mapping_tbl (project_scan_file_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table project_search_tag_strings_in_project_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search_tag_strings_in_project_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  tag_string VARCHAR(500) NOT NULL,
  created_by_user_id INT NULL,
  create_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_user_id INT NULL,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  tag_color_font VARCHAR(45) NULL,
  tag_color_background VARCHAR(45) NULL,
  tag_color_border VARCHAR(45) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_project_search_tag_strings_in_project_tbl_1
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_project_search_tag_strings_in_project_tbl_1_idx ON project_search_tag_strings_in_project_tbl (project_id ASC) VISIBLE;

CREATE UNIQUE INDEX unique_record ON project_search_tag_strings_in_project_tbl (project_id ASC, tag_string ASC) VISIBLE;


-- -----------------------------------------------------
-- Table project_search_tag_mapping_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search_tag_mapping_tbl (
  project_search_id INT UNSIGNED NOT NULL,
  project_search_tag_strings_in_project_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (project_search_id, project_search_tag_strings_in_project_id),
  CONSTRAINT project_search_tag_mapping_tbl_fk0
    FOREIGN KEY (project_search_tag_strings_in_project_id)
    REFERENCES project_search_tag_strings_in_project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT project_search_tag_mapping_tbl_fk1
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX project_search_tag_mapping_tbl_fk0_idx ON project_search_tag_mapping_tbl (project_search_tag_strings_in_project_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_import_tracking_data_json_blob_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_data_json_blob_tbl (
  file_import_tracking_id INT UNSIGNED NOT NULL,
  json_contents_format_version SMALLINT UNSIGNED NOT NULL,
  json_contents LONGTEXT NOT NULL,
  PRIMARY KEY (file_import_tracking_id),
  CONSTRAINT fk_file_import_tracking_data_json_blob_tbl_1
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_tbl (
  id INT UNSIGNED NOT NULL,
  request_type SMALLINT NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  priority TINYINT NOT NULL,
  marked_for_deletion TINYINT UNSIGNED NOT NULL DEFAULT 0,
  status_id TINYINT UNSIGNED NOT NULL,
  request_data_format_version_number INT UNSIGNED NOT NULL DEFAULT 0,
  request_data_contents_version_number INT UNSIGNED NOT NULL DEFAULT 0,
  request_data LONGTEXT NULL,
  request_data__label_value_pairs__json__format_version_number INT UNSIGNED NOT NULL DEFAULT 0,
  request_data__label_value_pairs__json__content_version_number INT UNSIGNED NOT NULL DEFAULT 0,
  request_data__label_value_pairs__json MEDIUMTEXT NULL,
  run_id_for_status_id INT UNSIGNED NULL COMMENT 'run id that the status id reflects',
  insert_request_url VARCHAR(255) NULL,
  record_insert_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  insert_request__remote_user_ip_address VARCHAR(45) NULL,
  insert_request_user_id INT UNSIGNED NULL,
  last_updated_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  run_start_date_time DATETIME NULL,
  run_end_date_time DATETIME NULL,
  deleted_by_user_id INT NULL,
  deleted_date_time DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT imprt_a_piplne_rn_trkg_user_id
    FOREIGN KEY (insert_request_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT imprt_a_piplne_rn_trkg_status_id
    FOREIGN KEY (status_id)
    REFERENCES file_import_tracking_status_values_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_insert_request_user_id_idx ON import_and_pipeline_run_tracking_tbl (insert_request_user_id ASC) VISIBLE;

CREATE INDEX project_id_status_id ON import_and_pipeline_run_tracking_tbl (project_id ASC, status_id ASC) VISIBLE;

CREATE INDEX fk_status_id_idx ON import_and_pipeline_run_tracking_tbl (status_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tkg_id_creator_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tkg_id_creator_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_run_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_run_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  import_and_pipeline_run_tracking_id INT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  sub_status_id TINYINT UNSIGNED NULL,
  record_insert_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  in_progress_end_user_display_message MEDIUMTEXT NULL,
  finished_sucess_end_user_display_message MEDIUMTEXT NULL,
  finished_success_pipeline_end_user_display_message MEDIUMTEXT NULL,
  finished_fail_end_user_display_message MEDIUMTEXT NULL,
  finished_fail_pipeline_end_user_display_message MEDIUMTEXT NULL,
  result_data_format_version_number INT NULL,
  result_data LONGTEXT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_imprt_a_ppln_rn_tkg_rn_pnt_id
    FOREIGN KEY (import_and_pipeline_run_tracking_id)
    REFERENCES import_and_pipeline_run_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_imprt_a_ppln_rn_tkg_rn_st_id
    FOREIGN KEY (status_id)
    REFERENCES file_import_tracking_status_values_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_imprt_a_ppln_rn_tkg_rn_pnt_id_idx ON import_and_pipeline_run_tracking_run_tbl (import_and_pipeline_run_tracking_id ASC) VISIBLE;

CREATE INDEX fk_imprt_a_ppln_rn_tkg_rn_st_id_idx ON import_and_pipeline_run_tracking_run_tbl (status_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tkg_run_id_creator_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tkg_run_id_creator_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_run_step_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_run_step_tbl (
  id INT UNSIGNED NOT NULL,
  import_and_pipeline_run_tracking_run_id INT UNSIGNED NOT NULL,
  step_number INT UNSIGNED NOT NULL,
  record_insert_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  step_initiate_remote_program_response_data_version_number INT NULL,
  step_initiate_remote_program_response_data LONGTEXT NULL COMMENT 'Store the initial response from external program',
  result_data_version_number INT NULL,
  result_data LONGTEXT NULL,
  last_updated_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_imprt_a_ppln_rn_tkg_rn_st_pnt_id
    FOREIGN KEY (import_and_pipeline_run_tracking_run_id)
    REFERENCES import_and_pipeline_run_tracking_run_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_imprt_a_ppln_rn_tkg_rn_st_pnt_id_idx ON import_and_pipeline_run_tracking_run_step_tbl (import_and_pipeline_run_tracking_run_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_run_step_run_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_run_step_run_tbl (
  id INT UNSIGNED NOT NULL,
  import_and_pipeline_run_tracking_run_step_id INT UNSIGNED NOT NULL,
  record_insert_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  step_initiate_remote_program_response_data_version_number INT NULL,
  step_initiate_remote_program_response_data LONGTEXT NULL COMMENT 'Store the initial response from external program',
  result_data_version_number INT NULL,
  result_data LONGTEXT NULL,
  last_updated_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_imprt_a_ppln_rn_tkg_rn_stp_rn_id_id
    FOREIGN KEY (import_and_pipeline_run_tracking_run_step_id)
    REFERENCES import_and_pipeline_run_tracking_run_step_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_imprt_a_ppln_rn_tkg_rn_stp_rn_id_idx ON import_and_pipeline_run_tracking_run_step_run_tbl (import_and_pipeline_run_tracking_run_step_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table import_and_pipeline_run_tracking_status_history_tbl
-- -----------------------------------------------------
CREATE TABLE  import_and_pipeline_run_tracking_status_history_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  import_and_pipeline_run_tracking_id INT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  status_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_import_and_pipeline_run_tracking_status_history_tbl_1
    FOREIGN KEY (import_and_pipeline_run_tracking_id)
    REFERENCES import_and_pipeline_run_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_import_and_pipeline_run_tracking_status_history_tbl_1_idx ON import_and_pipeline_run_tracking_status_history_tbl (import_and_pipeline_run_tracking_id ASC) VISIBLE;




--  !!!  Populate folder_project_search_tbl.search_display_order From project_search_tbl.search_display_order

UPDATE folder_project_search_tbl
  INNER JOIN project_search_tbl ON folder_project_search_tbl.project_search_id = project_search_tbl.id
  SET folder_project_search_tbl.search_display_order = project_search_tbl.search_display_order;
 
--  !!!  Clear (set to zero) project_search_tbl.search_display_order on records where copied the data to folder_project_search_tbl.search_display_order

UPDATE project_search_tbl
  INNER JOIN folder_project_search_tbl ON folder_project_search_tbl.project_search_id = project_search_tbl.id
  SET project_search_tbl.search_display_order = 0;

--  !!!  Populate new tables from existing tables


-- Populate project_scan_file_tbl

INSERT INTO project_scan_file_tbl (project_id, scan_file_id) 
SELECT DISTINCT project_search_tbl.project_id, search_scan_file_tbl.scan_file_id 
FROM
 search_scan_file_tbl
   INNER JOIN project_search_tbl ON search_scan_file_tbl.search_id = project_search_tbl.search_id
WHERE search_scan_file_tbl.scan_file_id IS NOT NULL;

-- Populate project_scan_filename_tbl

INSERT INTO project_scan_filename_tbl (project_scan_file_id, scan_filename) 
SELECT DISTINCT project_scan_file_tbl.id, search_scan_file_tbl.filename
FROM 
project_scan_file_tbl
  INNER JOIN project_search_tbl ON project_scan_file_tbl.project_id = project_search_tbl.project_id
  INNER JOIN search_scan_file_tbl ON project_search_tbl.search_id = search_scan_file_tbl.search_id and project_scan_file_tbl.scan_file_id = search_scan_file_tbl.scan_file_id
  where search_scan_file_tbl.scan_file_id IS NOT NULL 
  order by id, filename;
  
-- Populate project_scan_filename__search_scan_file__mapping_tbl

  INSERT INTO project_scan_filename__search_scan_file__mapping_tbl (project_scan_filename_id, search_scan_file_id, project_search_id)
  SELECT DISTINCT project_scan_filename_tbl.id, search_scan_file_tbl.id, project_search_tbl.id
FROM 
project_scan_filename_tbl
  INNER JOIN project_scan_file_tbl ON project_scan_filename_tbl.project_scan_file_id = project_scan_file_tbl.id
  INNER JOIN project_search_tbl ON project_scan_file_tbl.project_id = project_search_tbl.project_id
  INNER JOIN search_scan_file_tbl ON project_search_tbl.search_id = search_scan_file_tbl.search_id and project_scan_file_tbl.scan_file_id = search_scan_file_tbl.scan_file_id
  where search_scan_file_tbl.scan_file_id IS NOT NULL 
  order by project_scan_filename_tbl.id, search_scan_file_tbl.id;
  
  
--  Value for uncategorized_fake_record for the Uncategorized Fake Record  MUST be same as 
--    Java value: ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants.UNCATEGORIZED_FAKE_LABEL_TRUE
  
-- -----------------------------------------------------
-- Table project_search_tag_category_in_project_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search_tag_category_in_project_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NULL COMMENT 'Allow NULL for fake uncat record',
  category_label VARCHAR(500) NOT NULL,
  uncategorized_fake_record TINYINT UNSIGNED NULL COMMENT '1 if this a fake record for uncategorized tags to reference',
  dummy_on_duplicate_update TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'updated from on duplicate update sql',
  created_by_user_id INT NULL,
  create_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_user_id INT NULL,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  label_color_font VARCHAR(45) NULL,
  label_color_background VARCHAR(45) NULL,
  label_color_border VARCHAR(45) NULL COMMENT 'set to 1 for uncategorized fake record',
  PRIMARY KEY (id),
  CONSTRAINT fk_project_search_tag_strings_in_project_tbl_10
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_project_search_tag_strings_in_project_tbl_1_idx ON project_search_tag_category_in_project_tbl (project_id ASC) VISIBLE;

CREATE UNIQUE INDEX unique_record ON project_search_tag_category_in_project_tbl (project_id ASC, category_label ASC) VISIBLE;

CREATE UNIQUE INDEX uncategorized_fake_record_unique_idx ON project_search_tag_category_in_project_tbl (uncategorized_fake_record ASC) VISIBLE;


  

--  !!!!!!!!!!!!!!!!!!!!!!!!!


--  Value for uncategorized_fake_record for the Uncategorized Fake Record  MUST be same as 
--    Java value: ProjectSearch_TagCategoryInProject_UncategorizedFakeLabel_Values_Constants.UNCATEGORIZED_FAKE_LABEL_TRUE
  
--   Add record to table project_search_tag_category_in_project_tbl
--     for 'uncategorized' tag records

INSERT INTO project_search_tag_category_in_project_tbl 
(id, category_label, uncategorized_fake_record) VALUES ('1', 'uncategorized', '1');


--    UPDATE existing table  project_search_tag_strings_in_project_tbl

--   Initial default is 1 to match inserted uncategorized record in category table
ALTER TABLE project_search_tag_strings_in_project_tbl 
ADD COLUMN tag_category_id INT UNSIGNED NOT NULL DEFAULT 1 AFTER project_id,
ADD INDEX fk_project_search_tag_strings_in_project_tbl_2_idx (tag_category_id ASC) VISIBLE;

--  Remove default of 1
ALTER TABLE project_search_tag_strings_in_project_tbl 
CHANGE COLUMN tag_category_id tag_category_id INT UNSIGNED NOT NULL ;

--   Update UNIQUE index
ALTER TABLE project_search_tag_strings_in_project_tbl 
DROP INDEX unique_record ,
ADD UNIQUE INDEX unique_record (project_id ASC, tag_category_id ASC, tag_string ASC) VISIBLE;

--  Add Foreign Key
ALTER TABLE project_search_tag_strings_in_project_tbl 
ADD CONSTRAINT fk_project_search_tag_strings_in_project_tbl_2
  FOREIGN KEY (tag_category_id)
  REFERENCES project_search_tag_category_in_project_tbl (id)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;



--  Add 'File Object Storage' tables


-- -----------------------------------------------------
-- Table file_object_storage_main_entry_file_type_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  file_object_storage_main_entry_file_type_lookup_tbl (
  id INT UNSIGNED NOT NULL,
  description VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE UNIQUE INDEX file_object_storage_api_key_UNIQUE ON file_object_storage_main_entry_file_type_lookup_tbl (description ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_object_storage_main_entry_tbl
-- -----------------------------------------------------
CREATE TABLE  file_object_storage_main_entry_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_type_id INT UNSIGNED NOT NULL,
  file_object_storage_api_key VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_file_object_storage_main_entry_tbl_1
    FOREIGN KEY (file_type_id)
    REFERENCES file_object_storage_main_entry_file_type_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE UNIQUE INDEX file_object_storage_api_key_UNIQUE ON file_object_storage_main_entry_tbl (file_object_storage_api_key ASC) VISIBLE;

CREATE INDEX fk_file_object_storage_main_entry_tbl_1_idx ON file_object_storage_main_entry_tbl (file_type_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_object_storage_to_search_tbl
-- -----------------------------------------------------
CREATE TABLE  file_object_storage_to_search_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_object_storage_main_entry_id_fk INT UNSIGNED NOT NULL,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  filename_at_import VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_file_object_storage_to_search_tbl_1
    FOREIGN KEY (file_object_storage_main_entry_id_fk)
    REFERENCES file_object_storage_main_entry_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_object_storage_to_search_tbl_2
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_file_object_storage_to_search_tbl_1_idx ON file_object_storage_to_search_tbl (file_object_storage_main_entry_id_fk ASC) VISIBLE;

CREATE INDEX fk_file_object_storage_to_search_tbl_2_idx ON file_object_storage_to_search_tbl (search_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_object_storage_source_first_import_tbl
-- -----------------------------------------------------
CREATE TABLE  file_object_storage_source_first_import_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_object_storage_main_entry_id_fk INT UNSIGNED NOT NULL,
  search_id INT UNSIGNED NOT NULL,
  filename_at_import VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  file_size BIGINT NULL,
  sha1sum VARCHAR(255) NULL,
  canonical_filename_w_path_on_submit_machine MEDIUMTEXT NULL,
  absolute_filename_w_path_on_submit_machine MEDIUMTEXT NULL,
  aws_s3_bucket_name VARCHAR(2000) NULL,
  aws_s3_object_key VARCHAR(2000) NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_file_object_storage_to_search_tbl_10
    FOREIGN KEY (file_object_storage_main_entry_id_fk)
    REFERENCES file_object_storage_main_entry_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_file_object_storage_to_search_tbl_1_idx ON file_object_storage_source_first_import_tbl (file_object_storage_main_entry_id_fk ASC) VISIBLE;


-- -----------------------------------------------------
-- Table file_object_storage_to_project_search_tbl
-- -----------------------------------------------------
CREATE TABLE  file_object_storage_to_project_search_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_object_storage_to_search_id_fk INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  filename VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_file_object_storage_to_search_tbl_11
    FOREIGN KEY (file_object_storage_to_search_id_fk)
    REFERENCES file_object_storage_to_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_file_object_storage_to_search_tbl_20
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX file_object_storage_api_key_UNIQUE ON file_object_storage_to_project_search_tbl (filename ASC) VISIBLE;

CREATE INDEX fk_file_object_storage_to_search_tbl_20_idx ON file_object_storage_to_project_search_tbl (project_search_id ASC) VISIBLE;

CREATE INDEX fk_file_object_storage_to_search_tbl_11_idx ON file_object_storage_to_project_search_tbl (file_object_storage_to_search_id_fk ASC) VISIBLE;




--  Add to Lookup tables


INSERT INTO file_import_tracking_single_file_type_lookup_tbl (id, display_text) VALUES ( 3, 'FASTA File' );

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 4

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 4)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 4;

-- Add necessary records for docker-compose install for blib export function
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_feature_detection_service_run_hardklor_bullseye_web_service_base_url', 'http://feature-detection:3434');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('run_feature_detection_service_run_hardklor_bullseye_result_files_base_path', '/data/feature_detection/finaldir');
INSERT INTO config_system_tbl (config_key, config_value) VALUES ('yrc_file_object_storage_web_service_base_url', 'http://file-object-store:8080/file_object_storage');
