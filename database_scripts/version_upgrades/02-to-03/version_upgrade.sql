

-- First add this table and populate it


-- -----------------------------------------------------
-- Table aa_limelight_database_version_tbl
-- -----------------------------------------------------
CREATE TABLE  aa_limelight_database_version_tbl (
                                                    row_label ENUM('DB Version Current', 'DB Version In Progress') NOT NULL,
                                                    limelight_database_version_number INT NOT NULL,
                                                    PRIMARY KEY (row_label))
    ENGINE = InnoDB;


--  !!!!!!!!!!!!!!!!!!!!!!!!!

--   Special Insert do here.  No record already exist but this will be standard SQL statement going forward.

--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 3)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 3;




--  update_to_Limelight_V3__NewTables.sql


--  !!!!!!!!!!!!!!!!!!!!!!!!!


-- -----------------------------------------------------
-- Table aa_limelight_db_updates_in_webapp_thread_tbl
-- -----------------------------------------------------
CREATE TABLE  aa_limelight_db_updates_in_webapp_thread_tbl (
                                                               label VARCHAR(400) NOT NULL,
                                                               status ENUM('started', 'complete', 'error') NOT NULL COMMENT 'label assigned to specific update',
                                                               error_message VARCHAR(2000) NULL,
                                                               processing_heartbeat DATETIME NOT NULL COMMENT 'Used to detect concurrent updates to prevent multiple Webapp instances from executing same update',
                                                               created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                                                               last_modified DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                               PRIMARY KEY (label))
    ENGINE = InnoDB
COMMENT = 'Updates to DB run in Webapp Thread';


-- -----------------------------------------------------
-- Table project_level_default_fltr_ann_cutoffs__store_as_json__tbl
-- -----------------------------------------------------
CREATE TABLE  project_level_default_fltr_ann_cutoffs__store_as_json__tbl (
                                                                             project_id INT UNSIGNED NOT NULL,
                                                                             json MEDIUMTEXT NOT NULL,
                                                                             json_contents_format_version INT NOT NULL,
                                                                             table_record_version INT NOT NULL DEFAULT 1,
                                                                             created_user_id INT UNSIGNED NOT NULL,
                                                                             created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                             last_updated_user_id INT UNSIGNED NOT NULL,
                                                                             last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                                             PRIMARY KEY (project_id),
                                                                             CONSTRAINT fk_project_level_default_fltr_ann_cutoffs__store_as_json__tbl_fk
                                                                                 FOREIGN KEY (project_id)
                                                                                     REFERENCES project_tbl (id)
                                                                                     ON DELETE CASCADE
                                                                                     ON UPDATE NO ACTION)
    ENGINE = InnoDB
COMMENT = 'User Entered Annotation Cutoffs that apply to all searches in the project';


-- -----------------------------------------------------
-- Table project_level_default_fltr_ann_cutoffs__store_as_json__prev__tbl
-- -----------------------------------------------------
CREATE TABLE  project_level_default_fltr_ann_cutoffs__store_as_json__prev__tbl (
                                                                                   project_id INT UNSIGNED NOT NULL,
                                                                                   json MEDIUMTEXT NOT NULL,
                                                                                   json_contents_format_version INT NOT NULL,
                                                                                   table_record_version INT NOT NULL DEFAULT 1,
                                                                                   created_user_id INT UNSIGNED NOT NULL,
                                                                                   created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                   last_updated_user_id INT UNSIGNED NOT NULL,
                                                                                   last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                                                   id_prev_record INT NOT NULL,
                                                                                   copy_create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                                   PRIMARY KEY (id_prev_record),
                                                                                   CONSTRAINT fk_prjct_lvl_deflt_fltr_ann_cutffs__str_as_json__prev__tbl_1
                                                                                       FOREIGN KEY (project_id)
                                                                                           REFERENCES project_tbl (id)
                                                                                           ON DELETE CASCADE
                                                                                           ON UPDATE NO ACTION)
    ENGINE = InnoDB
COMMENT = 'User Entered Annotation Cutoffs that apply to all searches in the project';

CREATE INDEX fk_project_level_default_fltr_ann_cutoffs__store_as_json__p_idx ON project_level_default_fltr_ann_cutoffs__store_as_json__prev__tbl (project_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table fasta_file_statistics_tbl
-- -----------------------------------------------------
CREATE TABLE  fasta_file_statistics_tbl (
                                            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                            sha_384_sum VARBINARY(50) NOT NULL,
                                            num_targets INT NOT NULL,
                                            num_decoys INT NOT NULL,
                                            num_independent_decoys INT NOT NULL,
                                            PRIMARY KEY (id))
    ENGINE = InnoDB;

CREATE UNIQUE INDEX all_data_Fields ON fasta_file_statistics_tbl (sha_384_sum ASC, num_targets ASC, num_decoys ASC, num_independent_decoys ASC) VISIBLE;


-- -----------------------------------------------------
-- Table search_to_fasta_file_statistics_mapping_tbl
-- -----------------------------------------------------
CREATE TABLE  search_to_fasta_file_statistics_mapping_tbl (
                                                              search_id MEDIUMINT UNSIGNED NOT NULL,
                                                              fasta_file_statistics_mapping_id INT UNSIGNED NOT NULL,
                                                              PRIMARY KEY (search_id, fasta_file_statistics_mapping_id),
                                                              CONSTRAINT fk_search_to_fasta_file_statistics_mapping_tbl_1
                                                                  FOREIGN KEY (search_id)
                                                                      REFERENCES search_tbl (id)
                                                                      ON DELETE CASCADE
                                                                      ON UPDATE NO ACTION,
                                                              CONSTRAINT fk_search_to_fasta_file_statistics_mapping_tbl_2
                                                                  FOREIGN KEY (fasta_file_statistics_mapping_id)
                                                                      REFERENCES fasta_file_statistics_tbl (id)
                                                                      ON DELETE NO ACTION
                                                                      ON UPDATE NO ACTION)
    ENGINE = InnoDB;

CREATE INDEX fk_search_to_fasta_file_statistics_mapping_tbl_2_idx ON search_to_fasta_file_statistics_mapping_tbl (fasta_file_statistics_mapping_id ASC) VISIBLE;



-- -----------------------------------------------------
-- Table search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl (
                                                                                 search_id MEDIUMINT UNSIGNED NOT NULL,
                                                                                 reported_peptide_id INT UNSIGNED NOT NULL,
                                                                                 annotation_type_id INT UNSIGNED NOT NULL,
                                                                                 best_psm_value_for_ann_type_id DOUBLE NOT NULL,
                                                                                 psm_id_for_best_value__non_fk BIGINT UNSIGNED NOT NULL,
                                                                                 PRIMARY KEY (search_id, reported_peptide_id, annotation_type_id),
                                                                                 CONSTRAINT srch_rp_bst_psm_vl_t_id_rp_fk
                                                                                     FOREIGN KEY (reported_peptide_id)
                                                                                         REFERENCES reported_peptide_tbl (id)
                                                                                         ON DELETE CASCADE
                                                                                         ON UPDATE RESTRICT,
                                                                                 CONSTRAINT srch_rp_bst_psm_vl_t_id_sh_fk
                                                                                     FOREIGN KEY (search_id)
                                                                                         REFERENCES search_tbl (id)
                                                                                         ON DELETE CASCADE
                                                                                         ON UPDATE RESTRICT)
    ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'For PSMs that are Target or Independent Decoy ';

CREATE INDEX reported_peptide_id_f_idx ON search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl (reported_peptide_id ASC) VISIBLE;

CREATE INDEX search_id_for_fk___type_best_psm_val_idx ON search__rep_pept__psm_target_ind_decoy_psm_best_psm_vl_lkp_tbl (search_id ASC, best_psm_value_for_ann_type_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl (
                                                                              search_id MEDIUMINT UNSIGNED NOT NULL,
                                                                              reported_peptide_id INT UNSIGNED NOT NULL,
                                                                              annotation_type_id INT UNSIGNED NOT NULL,
                                                                              best_psm_value_for_ann_type_id DOUBLE NOT NULL,
                                                                              psm_id_for_best_value__non_fk BIGINT UNSIGNED NOT NULL,
                                                                              PRIMARY KEY (search_id, reported_peptide_id, annotation_type_id),
                                                                              CONSTRAINT srch_rp_bst_psm_vl_t_id_d_rp_fk
                                                                                  FOREIGN KEY (reported_peptide_id)
                                                                                      REFERENCES reported_peptide_tbl (id)
                                                                                      ON DELETE CASCADE
                                                                                      ON UPDATE RESTRICT,
                                                                              CONSTRAINT srch_rp_bst_psm_vl_t_id_d_sh_fk
                                                                                  FOREIGN KEY (search_id)
                                                                                      REFERENCES search_tbl (id)
                                                                                      ON DELETE CASCADE
                                                                                      ON UPDATE RESTRICT)
    ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COMMENT = 'For PSMs that are Target or Independent Decoy or Decoy';

CREATE INDEX reported_peptide_id_f_idx ON search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl (reported_peptide_id ASC) VISIBLE;

CREATE INDEX search_id_for_fk___type_best_psm_val_idx ON search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl (search_id ASC, best_psm_value_for_ann_type_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table search_details_tbl
-- -----------------------------------------------------
CREATE TABLE  search_details_tbl (
                                     search_id MEDIUMINT UNSIGNED NOT NULL,
                                     psm_count INT UNSIGNED NOT NULL,
                                     reported_peptide_count INT UNSIGNED NOT NULL,
                                     matched_proteins_count INT UNSIGNED NOT NULL,
                                     import_elapsed_time__milliseconds BIGINT UNSIGNED NOT NULL,
                                     importer_read_limelight_xml_file_elapsed_time__milliseconds BIGINT UNSIGNED NOT NULL,
                                     importer_protns_for_pptdes_ttal_procsng_elpsd_tm__milliscnds BIGINT UNSIGNED NOT NULL COMMENT 'importer_proteins_for_peptides_total_processing_elapsed_time__milliseconds',
                                     search_inserted__wait_for_spectr_time_milliscnds BIGINT UNSIGNED NULL COMMENT 'Wait time after the Search is inserted to DB until Spectr is complete',
                                     limelight_xml_file__file_size_bytes BIGINT UNSIGNED NULL,
                                     scan_files__total_files_size_bytes BIGINT UNSIGNED NULL,
                                     created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                                     last_modified DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                     PRIMARY KEY (search_id),
                                     CONSTRAINT search_details_fk
                                         FOREIGN KEY (search_id)
                                             REFERENCES search_tbl (id)
                                             ON DELETE CASCADE
                                             ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table importer_stats_general_data_tbl
-- -----------------------------------------------------
CREATE TABLE  importer_stats_general_data_tbl (
                                                  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                                  search_id MEDIUMINT UNSIGNED NOT NULL,
                                                  label VARCHAR(255) CHARACTER SET 'latin1' NOT NULL,
                                                  total_elapsed_time__milliseconds BIGINT UNSIGNED NOT NULL,
                                                  created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                                                  last_modified DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                                  PRIMARY KEY (id),
                                                  CONSTRAINT fk_importer_stats_general_data_tbl_1
                                                      FOREIGN KEY (search_id)
                                                          REFERENCES search_tbl (id)
                                                          ON DELETE CASCADE
                                                          ON UPDATE NO ACTION)
    ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX fk_importer_stats_general_data_tbl_1_idx ON importer_stats_general_data_tbl (search_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table importer_stats_per_table_tbl
-- -----------------------------------------------------
CREATE TABLE  importer_stats_per_table_tbl (
                                               id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                               search_id MEDIUMINT UNSIGNED NOT NULL,
                                               table_names VARCHAR(4000) CHARACTER SET 'latin1' NOT NULL COMMENT 'Plural tables since may be time for multiple tables',
                                               table_manipulation_type ENUM('insert', 'update', 'delete','select') NOT NULL,
                                               sql_calls_total_elapsed_time__milliseconds BIGINT UNSIGNED NOT NULL,
                                               sql_call_count INT UNSIGNED NOT NULL,
                                               total_records INT UNSIGNED NOT NULL,
                                               created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
                                               last_modified DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                               PRIMARY KEY (id),
                                               CONSTRAINT fk_importer_stats_per_table_tbl_1
                                                   FOREIGN KEY (search_id)
                                                       REFERENCES search_tbl (id)
                                                       ON DELETE CASCADE
                                                       ON UPDATE NO ACTION)
    ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX fk_importer_stats_per_table_tbl_1_idx ON importer_stats_per_table_tbl (search_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table search_psm_id_range_tbl
-- -----------------------------------------------------
CREATE TABLE  search_psm_id_range_tbl (
                                          search_id MEDIUMINT UNSIGNED NOT NULL,
                                          psm_id_range_start BIGINT UNSIGNED NOT NULL,
                                          psm_id_range_end BIGINT NOT NULL,
                                          PRIMARY KEY (search_id),
                                          CONSTRAINT search_psm_id_range_fk
                                              FOREIGN KEY (search_id)
                                                  REFERENCES search_tbl (id)
                                                  ON DELETE CASCADE
                                                  ON UPDATE NO ACTION)
    ENGINE = InnoDB
COMMENT = 'PSM Id range in psm_tbl. Only populated if PSM Ids for search are sequential.';


-- -----------------------------------------------------
-- Table importer__search_import_in_progress_tracking_tbl
-- -----------------------------------------------------
CREATE TABLE  importer__search_import_in_progress_tracking_tbl (
                                                                   search_id MEDIUMINT UNSIGNED NOT NULL,
                                                                   importer_running_heart_beat_last_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                                   PRIMARY KEY (search_id))
    ENGINE = InnoDB;

CREATE INDEX heart_beat_idx ON importer__search_import_in_progress_tracking_tbl (importer_running_heart_beat_last_update ASC) VISIBLE;


--  update_to_Limelight_V3__AlterTables.sql


--   Rename table first so existing webapp and importer start failing

-- -----------------------------------------------------
-- Table search__rep_pept__best_psm_value_lookup_tbl - rename to search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl
-- -----------------------------------------------------

ALTER TABLE search__rep_pept__best_psm_value_lookup_tbl
    RENAME TO  search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl ;


ALTER TABLE search__rep_pept__psm_target_psm_best_psm_value_lookup_tbl
    DROP COLUMN any_psm_has_reporter_ions,
    DROP COLUMN any_psm_has_open_modifictions,
    DROP COLUMN has_isotope_labels,
    DROP COLUMN has_dynamic_modifictions;


-- -----------------------------------------------------
-- Table search__rep_pept_sub_group_lookup_tbl
-- -----------------------------------------------------

ALTER TABLE search__rep_pept_sub_group_lookup_tbl
    DROP COLUMN psm_id_sequential_end,
    DROP COLUMN psm_id_sequential_start,
    DROP COLUMN any_psm_has_reporter_ions,
    DROP COLUMN any_psm_has_open_modifictions,
    DROP COLUMN any_psm_has_dynamic_modifications,
    CHANGE COLUMN psm_num_at_default_cutoff psm_num_targets_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only target PSMs',
    ADD COLUMN psm_num_indpendent_decoys_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only independent decoy PSMs' AFTER psm_num_targets_only_at_default_cutoff,
    ADD COLUMN psm_num_decoys_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only decoy PSMs' AFTER psm_num_indpendent_decoys_only_at_default_cutoff;

-- -----------------------------------------------------
-- Table search__rep_pept_sub_group__best_psm_value_lookup_tbl
-- -----------------------------------------------------

DROP TABLE search__rep_pept_sub_group__best_psm_value_lookup_tbl;


-- -----------------------------------------------------
-- Table search_tbl
-- -----------------------------------------------------

ALTER TABLE search_tbl
    ADD COLUMN any_psm_has__is_decoy_true TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER any_psm_has_reporter_ions,
    ADD COLUMN any_psm_has__is_independent_decoy_true TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER any_psm_has__is_decoy_true,
    ADD COLUMN all_psms_have_precursor_retention_time TINYINT UNSIGNED NULL AFTER any_psm_has__is_independent_decoy_true,
    ADD COLUMN all_psms_have_precursor_m_z TINYINT UNSIGNED NULL AFTER all_psms_have_precursor_retention_time,
    ADD COLUMN psm_ids_are_sequential TINYINT UNSIGNED NULL COMMENT 'All PSM Ids for the search are sequential - can use PSM Id ranges' AFTER all_psms_have_precursor_m_z;




ALTER TABLE protein_coverage_tbl
    ADD COLUMN protein_is_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER peptide_protein_match_not_exact_match,
    ADD COLUMN protein_is_independent_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER protein_is_decoy;


ALTER TABLE srch_rep_pept__prot_seq_v_id_tbl
    ADD COLUMN protein_is_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER protein_sequence_version_id,
    ADD COLUMN protein_is_independent_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER protein_is_decoy;


ALTER TABLE srch__prot_seq_v_id_tbl
    ADD COLUMN protein_is_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER protein_sequence_version_id,
    ADD COLUMN protein_is_independent_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER protein_is_decoy;




-- -----------------------------------------------------
-- Table search__rep_pept__lookup_tbl
-- -----------------------------------------------------

ALTER TABLE search__rep_pept__lookup_tbl
DROP COLUMN num_unique_psm_at_default_cutoff,
CHANGE COLUMN psm_id_sequential_start psm_id_sequential_start__start_target BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Not Zero if PSM IDs sequential for this search id/reported peptide id' ,
CHANGE COLUMN psm_num_at_default_cutoff psm_num_targets_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only target PSMs',
ADD COLUMN psm_num_indpendent_decoys_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only independent decoy PSMs' AFTER psm_num_targets_only_at_default_cutoff,
ADD COLUMN psm_num_decoys_only_at_default_cutoff INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'count only decoy PSMs' AFTER psm_num_indpendent_decoys_only_at_default_cutoff,
ADD COLUMN psm_id_sequential_start__start_independent_decoy BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Start of- Independent Decoys' AFTER psm_id_sequential_start__start_target,
ADD COLUMN psm_id_sequential_start__start_decoy BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Start of- Decoys' AFTER psm_id_sequential_start__start_independent_decoy;


-- -----------------------------------------------------
-- Table psm_tbl  -  This may take a long time
-- -----------------------------------------------------

ALTER TABLE psm_tbl
    ADD COLUMN is_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER precursor_m_z,
    ADD COLUMN is_independent_decoy TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER is_decoy;



--   update_to_Limelight_V3__InsertIntoTables.sql

INSERT INTO aa_limelight_database_version_tbl (limelight_database_version_number) VALUES ('3');


--  !!!!!!!!!!!!!!!!!!!!!!!!!

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 3)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 3;

