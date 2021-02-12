
-- This is generated from Limelight_Database_MySQL_Workbench_Model.mwb

-- Limelight_Database_MySQL_Workbench_Model.mwb is considered the master.  Check update dates and refer to the mwb file for differences


--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

--  WARNING:  When regenerate this content:

	--  If SQL contains either of these, change choices in "Forward Engineer" under "Code Generation" in Workbench to not create them:
	--    DROP SCHEMA IF EXISTS
	--    DROP TABLE IF EXISTS 

    --  Copy this block to a text editor first so it can be put back since "replace all" will change this block as well

	-- remove '`' with search all
	-- remove 'IF NOT EXISTS' with search all

	-- remove 'USE limelight;' before TRIGGER
	-- remove 'USE limelight$$' around 'TRIGGER'
	-- remove 'limelight.' in 'TRIGGER'


--  SQL from MySQL Workbench Forward Engineering

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema limelight
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema limelight
-- -----------------------------------------------------
CREATE SCHEMA  limelight DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE limelight ;

-- -----------------------------------------------------
-- Table user_tbl
-- -----------------------------------------------------
CREATE TABLE  user_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_mgmt_user_id INT UNSIGNED NOT NULL,
  user_access_level SMALLINT NULL,
  enabled_app_specific TINYINT NOT NULL DEFAULT 1,
  send_email_on_import_finish TINYINT NOT NULL DEFAULT 1,
  last_login DATETIME NULL,
  last_login_ip VARCHAR(255) NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX user_mgmt_user_id_UNIQUE ON user_tbl (user_mgmt_user_id ASC);


-- -----------------------------------------------------
-- Table project_tbl
-- -----------------------------------------------------
CREATE TABLE  project_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NULL,
  short_name VARCHAR(255) NULL,
  abstract TEXT NULL,
  enabled TINYINT UNSIGNED NOT NULL DEFAULT 1,
  marked_for_deletion TINYINT UNSIGNED NOT NULL DEFAULT 0,
  project_locked TINYINT NOT NULL DEFAULT 0,
  public_access_code_enabled TINYINT NOT NULL DEFAULT 0,
  public_access_code VARCHAR(255) NULL,
  public_access_level SMALLINT NULL,
  public_access_locked TINYINT NULL DEFAULT 0,
  marked_for_deletion_timestamp TIMESTAMP NULL,
  marked_for_deletion_user_id INT UNSIGNED NULL,
  created_by_user_id INT UNSIGNED NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_user_id INT UNSIGNED NULL,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE UNIQUE INDEX short_name ON project_tbl (short_name ASC);


-- -----------------------------------------------------
-- Table reported_peptide_tbl
-- -----------------------------------------------------
CREATE TABLE  reported_peptide_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  sequence VARCHAR(2000) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX sequence ON reported_peptide_tbl (sequence(20) ASC);


-- -----------------------------------------------------
-- Table peptide_tbl
-- -----------------------------------------------------
CREATE TABLE  peptide_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  sequence VARCHAR(2000) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX sequence ON peptide_tbl (sequence(20) ASC);


-- -----------------------------------------------------
-- Table search_record_status_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search_record_status_lookup_tbl (
  id TINYINT UNSIGNED NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table search_tbl
-- -----------------------------------------------------
CREATE TABLE  search_tbl (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  status_id TINYINT UNSIGNED NOT NULL DEFAULT 1,
  path VARCHAR(2000) NULL,
  fasta_filename VARCHAR(2000) NOT NULL,
  directory_name VARCHAR(255) NULL,
  has_scan_filenames TINYINT NOT NULL DEFAULT 0,
  has_scan_data TINYINT UNSIGNED NOT NULL DEFAULT 0,
  has_isotope_label TINYINT NOT NULL DEFAULT 0,
  has_search_sub_groups TINYINT UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_dynamic_modifications TINYINT NOT NULL DEFAULT 0,
  any_psm_has_open_modificaton_masses TINYINT UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  reported_peptide_matched_protein_mapping_provided TINYINT NOT NULL DEFAULT 0,
  import_end_timestamp TIMESTAMP NULL,
  created_by_user_id INT UNSIGNED NULL,
  created_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT search_tbl_status_id_fk
    FOREIGN KEY (status_id)
    REFERENCES search_record_status_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_status_id_fk_idx ON search_tbl (status_id ASC);


-- -----------------------------------------------------
-- Table project_search_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL DEFAULT 1,
  search_name VARCHAR(2000) NULL,
  search_display_order INT NOT NULL DEFAULT 0,
  marked_for_deletion_user_id INT UNSIGNED NULL,
  marked_for_deletion_timestamp DATETIME NULL,
  created_by_user_id INT UNSIGNED NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_user_id INT NULL,
  updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_project_search__project_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_project_search__search_id
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_project_search__status_id
    FOREIGN KEY (status_id)
    REFERENCES search_record_status_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_project_search__del_user_id
    FOREIGN KEY (marked_for_deletion_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_project_search_project_id_idx ON project_search_tbl (project_id ASC);

CREATE INDEX fk_project_search__search_id_idx ON project_search_tbl (search_id ASC);

CREATE INDEX fk_project_search__status_id_idx ON project_search_tbl (status_id ASC);

CREATE INDEX fk_project_search__del_user_id_idx ON project_search_tbl (marked_for_deletion_user_id ASC);

CREATE UNIQUE INDEX project_id_search_id_unique_idx ON project_search_tbl (project_id ASC, search_id ASC);


-- -----------------------------------------------------
-- Table project_search__comment_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search__comment_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  project_search_id INT(10) UNSIGNED NOT NULL,
  comment VARCHAR(2000) NOT NULL,
  created_date_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  created_user_id INT NULL,
  last_updated_user_id INT UNSIGNED NULL,
  last_updated_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT search_comment_project_search_fk
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT search_comment_user_fk
    FOREIGN KEY (last_updated_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX project_search_id ON project_search__comment_tbl (project_search_id ASC, last_updated_date_time ASC);

CREATE INDEX search_comment_user_fk_idx ON project_search__comment_tbl (last_updated_user_id ASC);


-- -----------------------------------------------------
-- Table search_reported_peptide_tbl
-- -----------------------------------------------------
CREATE TABLE  search_reported_peptide_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  peptide_id INT(10) UNSIGNED NOT NULL,
  any_psm_has_dynamic_modifications TINYINT UNSIGNED NOT NULL,
  any_psm_has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (search_id, reported_peptide_id),
  CONSTRAINT srch_rep_pept_search_id
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_rep_pept_peptide_id_fk
    FOREIGN KEY (peptide_id)
    REFERENCES peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX reported_peptide_id ON search_reported_peptide_tbl (reported_peptide_id ASC);

CREATE INDEX peptide_id ON search_reported_peptide_tbl (peptide_id ASC);


-- -----------------------------------------------------
-- Table psm_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT UNSIGNED NOT NULL,
  charge TINYINT NOT NULL,
  scan_number MEDIUMINT UNSIGNED NOT NULL,
  search_scan_file_id MEDIUMINT UNSIGNED NULL,
  has_modifications TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Has PSM Dynamic Modifications',
  has_open_modifications TINYINT UNSIGNED NOT NULL DEFAULT 0,
  has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  precursor_retention_time DECIMAL(9,4) NULL,
  precursor_m_z DECIMAL(10,4) NULL,
  PRIMARY KEY (id),
  CONSTRAINT psm_tbl_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT psm_tbl_rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX psm_tbl_reported_peptide_id ON psm_tbl (reported_peptide_id ASC);

CREATE INDEX psm__search_id_rep_pep_id ON psm_tbl (search_id ASC, reported_peptide_id ASC)  COMMENT 'This index covers the \nsearch_id foreign key since\nsearch_id is listed first';

CREATE INDEX scan_number_search_scan_file_id ON psm_tbl (scan_number ASC, search_scan_file_id ASC);


-- -----------------------------------------------------
-- Table taxonomy_tbl
-- -----------------------------------------------------
CREATE TABLE  taxonomy_tbl (
  id INT(10) UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE INDEX name ON taxonomy_tbl (name ASC);


-- -----------------------------------------------------
-- Table note_tbl
-- -----------------------------------------------------
CREATE TABLE  note_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  user_id_created INT UNSIGNED NOT NULL,
  created_date_time DATETIME NOT NULL,
  user_id_last_updated INT UNSIGNED NOT NULL,
  last_updated_date_time DATETIME NOT NULL,
  note_text TEXT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_note_user_id
    FOREIGN KEY (user_id_created)
    REFERENCES user_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT fk_note_project_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_project_id_idx ON note_tbl (project_id ASC);

CREATE INDEX fk_user_id_idx ON note_tbl (user_id_created ASC);


-- -----------------------------------------------------
-- Table user_forgot_password_tracking_tbl
-- -----------------------------------------------------
CREATE TABLE  user_forgot_password_tracking_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  create_date DATETIME NOT NULL,
  used_date DATETIME NULL,
  forgot_password_tracking_code VARCHAR(255) NOT NULL,
  submit_ip VARCHAR(255) NOT NULL,
  use_ip VARCHAR(255) NULL,
  code_replaced_by_newer TINYINT(1) NULL,
  PRIMARY KEY (id),
  CONSTRAINT user_fgot_pwd_trk_user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE UNIQUE INDEX forgot_password_tracking_code_UNIQUE ON user_forgot_password_tracking_tbl (forgot_password_tracking_code ASC);

CREATE INDEX forgot_pwd_trk_user_id_fk_idx ON user_forgot_password_tracking_tbl (user_id ASC);


-- -----------------------------------------------------
-- Table project_user_tbl
-- -----------------------------------------------------
CREATE TABLE  project_user_tbl (
  project_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  access_level SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (project_id, user_id),
  CONSTRAINT fk_project_user__user_id
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_project_user__project_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX idx_shared_objects_user_id ON project_user_tbl (user_id ASC);


-- -----------------------------------------------------
-- Table user_invite_tracking_tbl
-- -----------------------------------------------------
CREATE TABLE  user_invite_tracking_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  submitting_user_id INT UNSIGNED NOT NULL,
  submit_ip VARCHAR(255) NOT NULL,
  invite_tracking_code VARCHAR(255) NOT NULL,
  invited_user_email VARCHAR(255) NOT NULL,
  invited_user_access_level SMALLINT NOT NULL,
  invited_project_id INT UNSIGNED NULL,
  invite_create_date DATETIME NOT NULL,
  invite_used TINYINT NULL,
  invite_used_date DATETIME NULL,
  invite_used_user_id INT UNSIGNED NULL,
  use_ip VARCHAR(255) NULL,
  code_replaced_by_newer TINYINT NULL,
  invite_revoked TINYINT NULL,
  revoking_user_id INT UNSIGNED NULL,
  revoked_date DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT user_invite_trk_user_id_fk
    FOREIGN KEY (submitting_user_id)
    REFERENCES user_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT user_invite_trk_revoking_user_id
    FOREIGN KEY (revoking_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_invite_trk_project_id_fk
    FOREIGN KEY (invited_project_id)
    REFERENCES project_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_invite_trk_submitting_user_id_fk
    FOREIGN KEY (submitting_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT user_invite_trk_used_user_id_fk
    FOREIGN KEY (invite_used_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX invite_tracking_code_UNIQUE ON user_invite_tracking_tbl (invite_tracking_code ASC);

CREATE INDEX forgot_pwd_trk_user_id_fk_idx ON user_invite_tracking_tbl (submitting_user_id ASC);

CREATE INDEX user_invite_trk_revoking_user_id_idx ON user_invite_tracking_tbl (revoking_user_id ASC);

CREATE INDEX user_invite_trk_used_user_id_fk_idx ON user_invite_tracking_tbl (invite_used_user_id ASC);

CREATE INDEX user_invite_trk_project_id_fk_idx ON user_invite_tracking_tbl (invited_project_id ASC);


-- -----------------------------------------------------
-- Table user_access_level_label_description_tbl
-- -----------------------------------------------------
CREATE TABLE  user_access_level_label_description_tbl (
  user_access_level_numeric_value INT UNSIGNED NOT NULL,
  label VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  PRIMARY KEY (user_access_level_numeric_value))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table scan_file_tbl
-- -----------------------------------------------------
CREATE TABLE  scan_file_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  spectral_storage_api_key VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE UNIQUE INDEX spectral_storage_api_key_UNIQUE ON scan_file_tbl (spectral_storage_api_key ASC);


-- -----------------------------------------------------
-- Table search_programs_per_search_tbl
-- -----------------------------------------------------
CREATE TABLE  search_programs_per_search_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  version VARCHAR(200) NOT NULL,
  description VARCHAR(4000) NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_prgrms_per_srch_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE UNIQUE INDEX search_program__search_id__name__unique_idx ON search_programs_per_search_tbl (search_id ASC, name ASC);

CREATE INDEX search_program__search_id_fk_idx ON search_programs_per_search_tbl (search_id ASC);


-- -----------------------------------------------------
-- Table search_file_tbl
-- -----------------------------------------------------
CREATE TABLE  search_file_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  search_programs_per_search_id INT UNSIGNED NOT NULL COMMENT 'id in search_programs_per_search_tbl',
  filename VARCHAR(255) NOT NULL,
  display_filename VARCHAR(255) NULL,
  path VARCHAR(2000) NULL,
  filesize INT NOT NULL,
  mime_type VARCHAR(500) NULL,
  description VARCHAR(2500) NULL,
  upload_date DATETIME NOT NULL,
  file_contents LONGBLOB NULL,
  PRIMARY KEY (id),
  CONSTRAINT search_file_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_file_srch_pgm_p_sch_id
    FOREIGN KEY (search_programs_per_search_id)
    REFERENCES search_programs_per_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_file_search_id_fk_idx ON search_file_tbl (search_id ASC);

CREATE INDEX srch_file_srch_pgm_p_sch_id_idx ON search_file_tbl (search_programs_per_search_id ASC);


-- -----------------------------------------------------
-- Table static_mod_tbl
-- -----------------------------------------------------
CREATE TABLE  static_mod_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  residue VARCHAR(45) NOT NULL,
  mass DECIMAL(18,9) NULL,
  mass_string VARCHAR(45) NULL,
  PRIMARY KEY (id),
  CONSTRAINT static_mod_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE)
ENGINE = InnoDB;

CREATE INDEX static_mod_search_id_fk_idx ON static_mod_tbl (search_id ASC);


-- -----------------------------------------------------
-- Table config_system_tbl
-- -----------------------------------------------------
CREATE TABLE  config_system_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  config_key VARCHAR(255) NOT NULL,
  config_value VARCHAR(4000) NULL,
  comment VARCHAR(4000) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE UNIQUE INDEX config_system_config_key_idx ON config_system_tbl (config_key ASC);


-- -----------------------------------------------------
-- Table project_search__web_links_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search__web_links_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_search_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NULL,
  link_url VARCHAR(600) NOT NULL,
  link_label VARCHAR(400) NOT NULL,
  link_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT search_links_user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE SET NULL
    ON UPDATE RESTRICT,
  CONSTRAINT search_links_project_search_id_fk
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE)
ENGINE = InnoDB;

CREATE INDEX search_links_search_id_fk_idx ON project_search__web_links_tbl (project_search_id ASC);

CREATE INDEX search_links_user_id_fk_idx ON project_search__web_links_tbl (user_id ASC);


-- -----------------------------------------------------
-- Table search__dynamic_mod_mass_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__dynamic_mod_mass_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  dynamic_mod_mass DOUBLE NOT NULL,
  PRIMARY KEY (search_id, dynamic_mod_mass),
  CONSTRAINT search__dynamic_mod_mass__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table annotation_type_tbl
-- -----------------------------------------------------
CREATE TABLE  annotation_type_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  search_programs_per_search_id INT(10) UNSIGNED NOT NULL,
  psm_peptide_protein_type ENUM('psm', 'peptide', 'matched_protein') NOT NULL COMMENT '\'peptide\' is actually reported peptide',
  filterable_descriptive_type ENUM('filterable','descriptive') NOT NULL,
  name VARCHAR(255) NOT NULL,
  default_visible INT(1) NOT NULL,
  display_order INT NULL,
  description VARCHAR(4000) NULL,
  PRIMARY KEY (id),
  CONSTRAINT ann_tp_srch_pgm_id_fk
    FOREIGN KEY (search_programs_per_search_id)
    REFERENCES search_programs_per_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX ann_tp_srch_pgm_id_fk_idx ON annotation_type_tbl (search_programs_per_search_id ASC);

CREATE UNIQUE INDEX annotation_type_Unique_idx ON annotation_type_tbl (search_id ASC, search_programs_per_search_id ASC, psm_peptide_protein_type ASC, filterable_descriptive_type ASC, name ASC);


-- -----------------------------------------------------
-- Table annotation_type_filterable_tbl
-- -----------------------------------------------------
CREATE TABLE  annotation_type_filterable_tbl (
  annotation_type_id INT UNSIGNED NOT NULL,
  filter_direction ENUM('above','below') NOT NULL,
  default_filter INT(1) NOT NULL,
  default_filter_value DOUBLE NULL,
  default_filter_value_string VARCHAR(45) NULL,
  sort_order INT UNSIGNED NULL,
  default_filter_at_database_load INT(1) NOT NULL DEFAULT 0,
  default_filter_value_at_database_load DOUBLE NULL,
  default_filter_value_string_at_database_load VARCHAR(45) NULL,
  PRIMARY KEY (annotation_type_id),
  CONSTRAINT ann_type_fltrbl__annotation_type_id_fk
    FOREIGN KEY (annotation_type_id)
    REFERENCES annotation_type_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table psm_descriptive_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_descriptive_annotation_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  psm_id BIGINT UNSIGNED NOT NULL,
  annotation_type_id INT UNSIGNED NOT NULL,
  value_location ENUM('local','large_value_table') NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (id),
  CONSTRAINT psm_filterable_annotation__psm_id_fk
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE UNIQUE INDEX psm_annotation_psm_id_ann_typ_id_idx ON psm_descriptive_annotation_tbl (psm_id ASC, annotation_type_id ASC);


-- -----------------------------------------------------
-- Table srch__rep_pept_filterable_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__rep_pept_filterable_annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  value_double DOUBLE NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (id),
  CONSTRAINT srch__rep_pept__ann__rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch__rep_pept__ann__type_id_fk
    FOREIGN KEY (annotation_type_id)
    REFERENCES annotation_type_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX srch__rep_pept__ann__rep_pept_id_fk_idx ON srch__rep_pept_filterable_annotation_tbl (reported_peptide_id ASC);

CREATE UNIQUE INDEX srch__rep_pept_search_id_reppeptid_ann__type_id_fk_idx ON srch__rep_pept_filterable_annotation_tbl (search_id ASC, reported_peptide_id ASC, annotation_type_id ASC);

CREATE INDEX srch__rep_pept__ann__type_id_fk_idx ON srch__rep_pept_filterable_annotation_tbl (annotation_type_id ASC);

CREATE INDEX srch__rep_pept_srch_id_reppeptid_ann_tp__idx ON srch__rep_pept_filterable_annotation_tbl (search_id ASC, reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table srch__rep_pept_descriptive_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__rep_pept_descriptive_annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  value_location ENUM('local','large_value_table') NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (id),
  CONSTRAINT srch__rep_pept_desc_ann__rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch__rep_pept_desc_ann__type_id_fk
    FOREIGN KEY (annotation_type_id)
    REFERENCES annotation_type_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX srch__rep_pept__ann__rep_pept_id_fk_idx ON srch__rep_pept_descriptive_annotation_tbl (reported_peptide_id ASC);

CREATE UNIQUE INDEX srch__rep_pept_search_id_reppeptid_ann__type_id_fk_idx ON srch__rep_pept_descriptive_annotation_tbl (search_id ASC, reported_peptide_id ASC, annotation_type_id ASC);

CREATE INDEX srch__rep_pept__ann__type_id_fk_idx ON srch__rep_pept_descriptive_annotation_tbl (annotation_type_id ASC);

CREATE INDEX srch__rep_pept_srch_id_reppeptid_ann_tp__idx ON srch__rep_pept_descriptive_annotation_tbl (search_id ASC, reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table srch__rep_pept_desc_ann_large_value_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__rep_pept_desc_ann_large_value_tbl (
  srch__rep_pept_descriptive_annotation_id INT UNSIGNED NOT NULL,
  value_string LONGTEXT NULL,
  PRIMARY KEY (srch__rep_pept_descriptive_annotation_id),
  CONSTRAINT srch__rep_pept_desc_ann_lrg_val_primary_id_fk
    FOREIGN KEY (srch__rep_pept_descriptive_annotation_id)
    REFERENCES srch__rep_pept_descriptive_annotation_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table psm_descriptive_annotation_large_value_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_descriptive_annotation_large_value_tbl (
  psm_descriptive_annotation_id BIGINT UNSIGNED NOT NULL,
  value_string LONGTEXT NOT NULL,
  CONSTRAINT psm_annotation_large_value_primary_id_fk
    FOREIGN KEY (psm_descriptive_annotation_id)
    REFERENCES psm_descriptive_annotation_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX psm_annotation_large_value_primary_id_fk_idx ON psm_descriptive_annotation_large_value_tbl (psm_descriptive_annotation_id ASC);


-- -----------------------------------------------------
-- Table srch_rep_pept__dynamic_mod_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__dynamic_mod_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  position MEDIUMINT UNSIGNED NOT NULL,
  mass DOUBLE NOT NULL,
  is_n_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  is_c_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  peptide_residue_letter CHAR(1) NOT NULL DEFAULT ' ',
  protein_residue_letter_if_all_same CHAR(1) NULL DEFAULT ' ' COMMENT 'Only populated if all same value',
  PRIMARY KEY (id),
  CONSTRAINT srch_rp_ppt__dn_md_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rp_ppt__dn_md_rprtd_pd_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX srch_rep_pept_idx ON srch_rep_pept__dynamic_mod_tbl (search_id ASC, reported_peptide_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__dynamic_mod_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table search__rep_pept__lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept__lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  has_dynamic_modifictions TINYINT(3) UNSIGNED NOT NULL,
  has_isotope_labels TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_dynamic_modifications TINYINT UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_open_modifictions TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  psm_num_at_default_cutoff INT(10) UNSIGNED NOT NULL,
  peptide_meets_default_cutoffs ENUM('yes','no','not_applicable') NOT NULL,
  related_peptide_unique_for_search TINYINT(1) NOT NULL DEFAULT 0,
  psm_id_sequential_start BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Not Zero if PSM IDs sequential for this search id/reported peptide id',
  psm_id_sequential_end BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Not Zero if PSM IDs sequential for this search id/reported peptide id',
  num_unique_psm_at_default_cutoff INT(10) UNSIGNED NULL COMMENT 'Allow num_unique_psm_at_default_cutoff since do not have value at record insert.',
  PRIMARY KEY (search_id, reported_peptide_id),
  CONSTRAINT search__rep_pept__gnrc_lkp_reported_peptide_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT search__rep_pept__gnrc_lkp_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX search__rep_pept__generic_lookup__reported_peptide_id_f_idx ON search__rep_pept__lookup_tbl (reported_peptide_id ASC);

CREATE INDEX search__rep_pept__generic_lookup__search_id_fk_idx ON search__rep_pept__lookup_tbl (search_id ASC);

CREATE INDEX search__rep_pept__generic_lookup_search__srch_type_mts_dflt_idx ON search__rep_pept__lookup_tbl (search_id ASC, peptide_meets_default_cutoffs ASC);


-- -----------------------------------------------------
-- Table search__rep_pept__best_psm_value_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept__best_psm_value_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  has_dynamic_modifictions TINYINT(3) UNSIGNED NOT NULL,
  has_isotope_labels TINYINT(3) NOT NULL DEFAULT 0,
  any_psm_has_open_modifictions TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  best_psm_value_for_ann_type_id DOUBLE NOT NULL,
  psm_id_for_best_value__non_fk BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, reported_peptide_id, annotation_type_id),
  CONSTRAINT srch_rp_ppt_bst_psm_vl_gnrc_lkp_rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_rp_ppt_bst_psm_vl_gnrc_lkp_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX reported_peptide_id_f_idx ON search__rep_pept__best_psm_value_lookup_tbl (reported_peptide_id ASC);

CREATE INDEX search_id_for_fk___type_best_psm_val_idx ON search__rep_pept__best_psm_value_lookup_tbl (search_id ASC, best_psm_value_for_ann_type_id ASC);


-- -----------------------------------------------------
-- Table protein_sequence_tbl
-- -----------------------------------------------------
CREATE TABLE  protein_sequence_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  sequence MEDIUMTEXT NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX sequence ON protein_sequence_tbl (sequence(500) ASC);


-- -----------------------------------------------------
-- Table protein_sequence_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  protein_sequence_annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  taxonomy INT(10) UNSIGNED NULL,
  name VARCHAR(2000) NOT NULL,
  description VARCHAR(2500) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX name ON protein_sequence_annotation_tbl (name(100) ASC);

CREATE INDEX tax_name_desc ON protein_sequence_annotation_tbl (taxonomy ASC, name(100) ASC, description(100) ASC);


-- -----------------------------------------------------
-- Table isotope_label_tbl
-- -----------------------------------------------------
CREATE TABLE  isotope_label_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE UNIQUE INDEX name ON isotope_label_tbl (name ASC);


-- -----------------------------------------------------
-- Table protein_sequence_version_tbl
-- -----------------------------------------------------
CREATE TABLE  protein_sequence_version_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  protein_sequence_id INT UNSIGNED NOT NULL,
  isotope_label_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_protein_sequence_version__prot_seq_id
    FOREIGN KEY (protein_sequence_id)
    REFERENCES protein_sequence_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT fk_protein_sequence_version__isotope_label_id
    FOREIGN KEY (isotope_label_id)
    REFERENCES isotope_label_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = 'This table is the FK on many other tables';

CREATE UNIQUE INDEX prot_seq_id_isotope_label_id ON protein_sequence_version_tbl (protein_sequence_id ASC, isotope_label_id ASC);

CREATE INDEX srch_prt_sqnc_annttn_prot_seq_id_idx ON protein_sequence_version_tbl (protein_sequence_id ASC);

CREATE INDEX fk_protein__isotope_label_id_idx ON protein_sequence_version_tbl (isotope_label_id ASC);


-- -----------------------------------------------------
-- Table search__protein_sequence_version__annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  search__protein_sequence_version__annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  annotation_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_prt_sqnc_annttn__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_prt_sqnc_annttn_annotation_id
    FOREIGN KEY (annotation_id)
    REFERENCES protein_sequence_annotation_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT srch_prt_sqnc_annttn_prot_seq_v_id_fk
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE UNIQUE INDEX search_id_prot_seq_v_id_ann_id ON search__protein_sequence_version__annotation_tbl (search_id ASC, protein_sequence_version_id ASC, annotation_id ASC);

CREATE INDEX srch_prt_sqnc_annttn_annotation_id_idx ON search__protein_sequence_version__annotation_tbl (annotation_id ASC);

CREATE INDEX srch_prt_sqnc_annttn_prot_seq_v_id_fk_idx ON search__protein_sequence_version__annotation_tbl (protein_sequence_version_id ASC);


-- -----------------------------------------------------
-- Table file_import_tracking_id_creator_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_id_creator_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_status_values_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_status_values_lookup_tbl (
  id TINYINT UNSIGNED NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  priority TINYINT NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  remote_user_ip_address VARCHAR(45) NOT NULL,
  marked_for_deletion TINYINT UNSIGNED NOT NULL DEFAULT 0,
  search_name VARCHAR(2000) NULL,
  search_path VARCHAR(2000) NULL,
  insert_request_url VARCHAR(255) NOT NULL,
  record_insert_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time TIMESTAMP NULL,
  import_start_date_time DATETIME NULL,
  import_end_date_time DATETIME NULL,
  deleted_by_user_id INT NULL,
  deleted_date_time DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_import_tracking_user_id
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT file_import_tracking_status_id
    FOREIGN KEY (status_id)
    REFERENCES file_import_tracking_status_values_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_import_tracking_user_id_idx ON file_import_tracking_tbl (user_id ASC);

CREATE INDEX project_id_status_id ON file_import_tracking_tbl (project_id ASC, status_id ASC);

CREATE INDEX file_import_tracking_status_id_idx ON file_import_tracking_tbl (status_id ASC);


-- -----------------------------------------------------
-- Table file_import_tracking_run_sub_status_values_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_run_sub_status_values_lookup_tbl (
  id TINYINT UNSIGNED NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_run_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_run_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_import_tracking_id INT UNSIGNED NOT NULL,
  current_run TINYINT UNSIGNED NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  importer_sub_status_id TINYINT UNSIGNED NULL,
  importer_percent_psms_processed TINYINT NULL,
  inserted_search_id MEDIUMINT UNSIGNED NULL,
  import_result_text MEDIUMTEXT NULL,
  data_error_text MEDIUMTEXT NULL,
  start_date_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time TIMESTAMP NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_imprt_trkng_run_id
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_run_status_id
    FOREIGN KEY (status_id)
    REFERENCES file_import_tracking_status_values_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_run_sub_status
    FOREIGN KEY (importer_sub_status_id)
    REFERENCES file_import_tracking_run_sub_status_values_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_imprt_trkng_stats_hist_id_idx ON file_import_tracking_run_tbl (file_import_tracking_id ASC);

CREATE INDEX file_imprt_trkng_run_status_id_idx ON file_import_tracking_run_tbl (status_id ASC);

CREATE INDEX file_imprt_trkng_run_sub_status_idx ON file_import_tracking_run_tbl (importer_sub_status_id ASC);


-- -----------------------------------------------------
-- Table file_import_tracking_status_history_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_status_history_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_import_tracking_id INT UNSIGNED NOT NULL,
  status_id TINYINT UNSIGNED NOT NULL,
  status_timestamp TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_imprt_trkng_stats_hist_id
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fl_imprt_trkng_stats_hist_id_idx ON file_import_tracking_status_history_tbl (file_import_tracking_id ASC);


-- -----------------------------------------------------
-- Table file_import_tracking_single_file_type_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_type_lookup_tbl (
  id TINYINT UNSIGNED NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_single_file_upload_status_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_upload_status_lookup_tbl (
  id TINYINT UNSIGNED NOT NULL,
  display_text VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table file_import_tracking_single_file_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_single_file_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  file_import_tracking_id INT UNSIGNED NOT NULL,
  file_type_id TINYINT UNSIGNED NOT NULL,
  file_upload_status_id TINYINT UNSIGNED NOT NULL,
  filename_in_upload VARCHAR(500) NOT NULL,
  filename_on_disk VARCHAR(500) NOT NULL,
  file_size BIGINT(20) UNSIGNED NULL,
  sha1_sum VARCHAR(255) NULL,
  filename_on_disk_with_path_sub_same_machine VARCHAR(4000) NULL,
  canonical_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  absolute_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_imprt_trkng_sngl_fl_id
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_sngl_fl_type_id
    FOREIGN KEY (file_type_id)
    REFERENCES file_import_tracking_single_file_type_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_sngl_fl_up_st_id
    FOREIGN KEY (file_upload_status_id)
    REFERENCES file_import_tracking_single_file_upload_status_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_imprt_trkng_stats_hist_id_idx ON file_import_tracking_single_file_tbl (file_import_tracking_id ASC);

CREATE INDEX file_imprt_trkng_sngl_fl_type_id_idx ON file_import_tracking_single_file_tbl (file_type_id ASC);

CREATE INDEX file_imprt_trkng_sngl_fl_up_st_id_idx ON file_import_tracking_single_file_tbl (file_upload_status_id ASC);


-- -----------------------------------------------------
-- Table file_import_tracking_sngl_fl_del_web_user_tbl
-- -----------------------------------------------------
CREATE TABLE  file_import_tracking_sngl_fl_del_web_user_tbl (
  id INT UNSIGNED NOT NULL,
  file_import_tracking_id INT UNSIGNED NOT NULL,
  file_type_id TINYINT UNSIGNED NOT NULL,
  file_upload_status_id TINYINT UNSIGNED NOT NULL,
  filename_in_upload VARCHAR(500) NOT NULL,
  filename_on_disk VARCHAR(500) NOT NULL,
  sha1_sum VARCHAR(255) NULL,
  file_size INT(20) NULL,
  PRIMARY KEY (id),
  CONSTRAINT file_imprt_trkng_sngl_dw_fl_id
    FOREIGN KEY (file_import_tracking_id)
    REFERENCES file_import_tracking_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_sngl_dw_fl_type_id
    FOREIGN KEY (file_type_id)
    REFERENCES file_import_tracking_single_file_type_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT file_imprt_trkng_sngl_dw_fl_up_st_id
    FOREIGN KEY (file_upload_status_id)
    REFERENCES file_import_tracking_single_file_upload_status_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_imprt_trkng_stats_hist_id_idx ON file_import_tracking_sngl_fl_del_web_user_tbl (file_import_tracking_id ASC);

CREATE INDEX file_imprt_trkng_sngl_fl_type_id_idx ON file_import_tracking_sngl_fl_del_web_user_tbl (file_type_id ASC);

CREATE INDEX file_imprt_trkng_sngl_fl_up_st_id_idx ON file_import_tracking_sngl_fl_del_web_user_tbl (file_upload_status_id ASC);


-- -----------------------------------------------------
-- Table protein_coverage_tbl
-- -----------------------------------------------------
CREATE TABLE  protein_coverage_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT UNSIGNED NOT NULL,
  peptide_id_info_only INT UNSIGNED NOT NULL COMMENT 'Do Not use peptide_id_info_only to map peptides to  proteins',
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  protein_start_position INT UNSIGNED NOT NULL,
  protein_end_position INT UNSIGNED NOT NULL,
  peptide_protein_match_not_exact_match TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Caused by I L equiv and other',
  PRIMARY KEY (id),
  CONSTRAINT protein_coverage__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT protein_coverage__reportd_peptid_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_id_protein_seq_version_id ON protein_coverage_tbl (search_id ASC, protein_sequence_version_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON protein_coverage_tbl (reported_peptide_id ASC);

CREATE INDEX search_id_reportedpeptide_id ON protein_coverage_tbl (search_id ASC, reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table search_scan_file_tbl
-- -----------------------------------------------------
CREATE TABLE  search_scan_file_tbl (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  filename VARCHAR(255) NOT NULL,
  scan_file_id INT UNSIGNED NULL,
  PRIMARY KEY (id),
  CONSTRAINT search_scan_filename_search_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT search_scan_filename_scan_file_fk
    FOREIGN KEY (scan_file_id)
    REFERENCES scan_file_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Scan file in a search.  May only be the filename. May be actual scan file uploaded.';

CREATE UNIQUE INDEX unique_search_id_filename ON search_scan_file_tbl (search_id ASC, filename ASC);

CREATE INDEX search_scan_filename_scan_file_fk_idx ON search_scan_file_tbl (scan_file_id ASC);


-- -----------------------------------------------------
-- Table terms_of_service_text_versions_tbl
-- -----------------------------------------------------
CREATE TABLE  terms_of_service_text_versions_tbl (
  version_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_string VARCHAR(55) NOT NULL,
  terms_of_service_text LONGTEXT NOT NULL,
  created_user_id INT UNSIGNED NOT NULL,
  created_date_time DATETIME NOT NULL,
  PRIMARY KEY (version_id),
  CONSTRAINT terms_of_service_text_versions_user_id
    FOREIGN KEY (created_user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX id_string_UNIQUE ON terms_of_service_text_versions_tbl (id_string ASC);

CREATE INDEX terms_of_service_text_versions_user_id_idx ON terms_of_service_text_versions_tbl (created_user_id ASC);


-- -----------------------------------------------------
-- Table terms_of_service_user_accepted_version_history_tbl
-- -----------------------------------------------------
CREATE TABLE  terms_of_service_user_accepted_version_history_tbl (
  user_id INT UNSIGNED NOT NULL,
  terms_of_service_version_id INT UNSIGNED NOT NULL,
  accepted__date_time DATETIME NOT NULL,
  PRIMARY KEY (user_id, terms_of_service_version_id),
  CONSTRAINT tos_usr_a_v_hist_user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT tos_usr_a_v_hist_tos_text_v_id_fk
    FOREIGN KEY (terms_of_service_version_id)
    REFERENCES terms_of_service_text_versions_tbl (version_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX tos_usr_a_v_hist_tos_text_v_id_fk_idx ON terms_of_service_user_accepted_version_history_tbl (terms_of_service_version_id ASC);


-- -----------------------------------------------------
-- Table url_shortener_tbl
-- -----------------------------------------------------
CREATE TABLE  url_shortener_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  shortened_url_key VARCHAR(12) NOT NULL,
  user_id INT UNSIGNED NULL,
  url_start_at_page_controller_path VARCHAR(6000) NOT NULL,
  page_controller_path VARCHAR(80) NOT NULL,
  srch_data_lkp_params_string VARCHAR(300) NULL,
  remote_user_ip_address VARCHAR(45) NULL,
  date_record_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id, shortened_url_key))
ENGINE = InnoDB;

CREATE UNIQUE INDEX shortened_url_key_unique ON url_shortener_tbl (shortened_url_key ASC);

CREATE INDEX url ON url_shortener_tbl (url_start_at_page_controller_path(500) ASC);


-- -----------------------------------------------------
-- Table url_shortener_associated_project_search_id_tbl
-- -----------------------------------------------------
CREATE TABLE  url_shortener_associated_project_search_id_tbl (
  url_shortener_id INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (url_shortener_id, project_search_id),
  CONSTRAINT url_shortener_associated_search_id_main_id
    FOREIGN KEY (url_shortener_id)
    REFERENCES url_shortener_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX default_page_view_search_id_fk_idx ON url_shortener_associated_project_search_id_tbl (url_shortener_id ASC);


-- -----------------------------------------------------
-- Table search_file__project_search_tbl
-- -----------------------------------------------------
CREATE TABLE  search_file__project_search_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_file_id INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  display_filename VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT search_file__project_search_srch_fl_id
    FOREIGN KEY (search_file_id)
    REFERENCES search_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT search_file__project_search_proj_srch_id
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_file__project_search_srch_fl_id_idx ON search_file__project_search_tbl (search_file_id ASC);

CREATE INDEX search_file__project_search_proj_srch_id_idx ON search_file__project_search_tbl (project_search_id ASC);


-- -----------------------------------------------------
-- Table aa_updates_applied_tbl
-- -----------------------------------------------------
CREATE TABLE  aa_updates_applied_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  label VARCHAR(255) NOT NULL,
  date_applied TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table folder_for_project_tbl
-- -----------------------------------------------------
CREATE TABLE  folder_for_project_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  name VARCHAR(600) NOT NULL,
  created_by_user_id INT(10) UNSIGNED NULL,
  created_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by_user_id INT(10) UNSIGNED NULL,
  updated_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT folder_for_project_proj_id_fk
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX folder_for_project_proj_id_fk_idx ON folder_for_project_tbl (project_id ASC);


-- -----------------------------------------------------
-- Table folder_project_search_tbl
-- -----------------------------------------------------
CREATE TABLE  folder_project_search_tbl (
  project_search_id INT UNSIGNED NOT NULL,
  folder_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (project_search_id),
  CONSTRAINT folder_project_search_folder_id
    FOREIGN KEY (folder_id)
    REFERENCES folder_for_project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT folder_project_search_proj_srch_id
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX folder_project_search_folder_id_idx ON folder_project_search_tbl (folder_id ASC);


-- -----------------------------------------------------
-- Table zz_user_data_mirror_tbl
-- -----------------------------------------------------
CREATE TABLE  zz_user_data_mirror_tbl (
  user_id INT UNSIGNED NOT NULL,
  username VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  first_name VARCHAR(255) NULL,
  last_name VARCHAR(255) NULL,
  organization VARCHAR(2000) NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT zz_user_data_mirror__user_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table srch_rep_pept__prot_seq_v_id_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__prot_seq_v_id_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT UNSIGNED NOT NULL,
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, reported_peptide_id, protein_sequence_version_id),
  CONSTRAINT srch_rppt_prtsqv_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rppt_prtsqv_rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rppt_prtsqv_prt_sq_v_id_fk
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Each entry is a mapping of a search and reported peptide  pair\nto a protein.\n';

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__prot_seq_v_id_tbl (reported_peptide_id ASC);

CREATE INDEX prot_seq_ver_id_fk_idx ON srch_rep_pept__prot_seq_v_id_tbl (protein_sequence_version_id ASC);


-- -----------------------------------------------------
-- Table scan_file_source_first_import_tbl
-- -----------------------------------------------------
CREATE TABLE  scan_file_source_first_import_tbl (
  scan_file_id INT UNSIGNED NOT NULL,
  search_scan_file_id INT UNSIGNED NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_size BIGINT NOT NULL,
  sha1sum VARCHAR(255) NOT NULL,
  canonical_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  absolute_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  aws_s3_bucket_name VARCHAR(2000) NULL,
  aws_s3_object_key VARCHAR(2000) NULL,
  PRIMARY KEY (scan_file_id),
  CONSTRAINT scan_file_source_pk_fk
    FOREIGN KEY (scan_file_id)
    REFERENCES scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table srch_rep_pept__isotope_label_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__isotope_label_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  isotope_label_id INT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, reported_peptide_id),
  CONSTRAINT fk_srch_rpppt_pptd_istplbl_istplbl_id
    FOREIGN KEY (isotope_label_id)
    REFERENCES isotope_label_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_srch_rpppt_pptd_istplbl_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_srch_rpppt_pptd_istplb_reppepid_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_srch_rpppt_pptd_istplbl_istplbl_id_idx ON srch_rep_pept__isotope_label_tbl (isotope_label_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__isotope_label_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table search__isotope_label_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__isotope_label_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  isotope_label_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, isotope_label_id),
  CONSTRAINT search__isotope_label_lookup__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT search__isotope_label_lookup__isotope_label_id_fk
    FOREIGN KEY (isotope_label_id)
    REFERENCES isotope_label_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search__isotope_label_lookup__isotope_label_id_fk_idx ON search__isotope_label_lookup_tbl (isotope_label_id ASC);


-- -----------------------------------------------------
-- Table psm_filterable_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_filterable_annotation_tbl (
  psm_id BIGINT UNSIGNED NOT NULL,
  annotation_type_id INT UNSIGNED NOT NULL,
  value_double DOUBLE NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (psm_id, annotation_type_id),
  CONSTRAINT psm_filterable_annotation__psm_id_fk0
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table search_scan_file_importer_tbl
-- -----------------------------------------------------
CREATE TABLE  search_scan_file_importer_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_scan_file_id MEDIUMINT UNSIGNED NOT NULL,
  file_size BIGINT NOT NULL,
  sha1sum VARCHAR(255) NOT NULL,
  canonical_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  absolute_filename_w_path_on_submit_machine VARCHAR(4000) NULL,
  aws_s3_bucket_name VARCHAR(2000) NULL,
  aws_s3_object_key VARCHAR(2000) NULL,
  spectral_storage_process_key VARCHAR(300) NOT NULL COMMENT 'Key while scan file is importing into Spectral Storage Service.',
  spectral_storage_api_key VARCHAR(300) NULL,
  scan_file_id INT UNSIGNED NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_scn_filenm_srch_scn_file_id
    FOREIGN KEY (search_scan_file_id)
    REFERENCES search_scan_file_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Tracks a scan file while importing.  ';


-- -----------------------------------------------------
-- Table srch_protein_group_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_protein_group_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  group_id MEDIUMINT UNSIGNED NOT NULL,
  is_parsimonious TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (search_id, group_id),
  CONSTRAINT srch_protn_grp_tbl_search_id
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table srch_protein_group__protein_version_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_protein_group__protein_version_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  group_id MEDIUMINT UNSIGNED NOT NULL,
  protein_sequence_version_id INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (search_id, group_id, protein_sequence_version_id),
  CONSTRAINT srch_protn_grp_protn_v_tbl_search_id
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_protn_grp_protn_v_tbl_protn_v_id
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX srch_protn_grp_protn_v_tbl_protn_v_id_idx ON srch_protein_group__protein_version_tbl (protein_sequence_version_id ASC);


-- -----------------------------------------------------
-- Table search_data_lookup_parameters_type_id
-- -----------------------------------------------------
CREATE TABLE  search_data_lookup_parameters_type_id (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type_label VARCHAR(255) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table search_data_lookup_parameters
-- -----------------------------------------------------
CREATE TABLE  search_data_lookup_parameters (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  hash_of_main_params VARCHAR(200) CHARACTER SET 'latin1' NOT NULL,
  hash_collision_index INT NOT NULL COMMENT 'Increment for hash collisions',
  single_project_search_id__default_values INT NULL COMMENT 'Set to project_search_id if this record is for the defaults \nfor that project_search_id and defaults computed by server.\nIMPORTANT:  Assumes default cutoffs \nand default ann type display do NOT change.',
  root_id_type_id SMALLINT UNSIGNED NOT NULL COMMENT 'Project_search_ids, etc',
  root_ids_only_json MEDIUMTEXT NOT NULL COMMENT 'Just Root ids, in ARRAY JSON',
  lookup_parameters_json__main_data MEDIUMTEXT NOT NULL COMMENT 'Main Data - JSON',
  version_number_main_json INT UNSIGNED NOT NULL COMMENT 'Version number in JSON in field: lookup_parameters_json__main_data',
  created_by_user_id INT UNSIGNED NULL,
  created_by_user_type ENUM('web-user', 'web-non-user', 'importer-user', 'importer-no-user') NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_remote_ip VARCHAR(45) NULL,
  last_accessed DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT search_data_lookup_parameters_type_id_fk
    FOREIGN KEY (root_id_type_id)
    REFERENCES search_data_lookup_parameters_type_id (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_data_lookup_parameters_type_id_fk_idx ON search_data_lookup_parameters (root_id_type_id ASC);

CREATE UNIQUE INDEX hash_hash_index ON search_data_lookup_parameters (hash_of_main_params ASC, hash_collision_index ASC);

CREATE INDEX single_project_search_id__default_values ON search_data_lookup_parameters (single_project_search_id__default_values ASC);


-- -----------------------------------------------------
-- Table search_data_lookup_parameters_assoc_project_search_id
-- -----------------------------------------------------
CREATE TABLE  search_data_lookup_parameters_assoc_project_search_id (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assoc_main_id INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_dt_lkp_params_assoc_prjct_srch_id_fk
    FOREIGN KEY (assoc_main_id)
    REFERENCES search_data_lookup_parameters (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX search_data_lookup_parameters_assoc_project_search_id_fk_idx ON search_data_lookup_parameters_assoc_project_search_id (assoc_main_id ASC);


-- -----------------------------------------------------
-- Table srch__prot_seq_v_id_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__prot_seq_v_id_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, protein_sequence_version_id),
  CONSTRAINT srch_rppt_prtsqv_srch_id_fk0
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rppt_prtsqv_prt_sq_v_id_fk0
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Each entry is a mapping of a search to a protein.\n';

CREATE INDEX prot_seq_ver_id_fk_idx ON srch__prot_seq_v_id_tbl (protein_sequence_version_id ASC);


-- -----------------------------------------------------
-- Table project_user_deleted_tbl
-- -----------------------------------------------------
CREATE TABLE  project_user_deleted_tbl (
  deleted_record_pk_id INT NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  access_level SMALLINT UNSIGNED NOT NULL,
  deleted_by_user_id INT UNSIGNED NOT NULL,
  deleted_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (deleted_record_pk_id),
  CONSTRAINT fk_project_user_deleted__user_id
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_project_user_deleted__project_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'records deleted from project_user_tbl';

CREATE INDEX idx_shared_objects_user_id ON project_user_deleted_tbl (user_id ASC);


-- -----------------------------------------------------
-- Table psm_dynamic_modification_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_dynamic_modification_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  psm_id BIGINT UNSIGNED NOT NULL,
  position MEDIUMINT UNSIGNED NOT NULL,
  mass DOUBLE NOT NULL,
  is_n_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  is_c_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT psm_dynmc_modfctn__psm_id_fk
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX psm_dynmc_modfctn__psm_id_fk_idx ON psm_dynamic_modification_tbl (psm_id ASC);


-- -----------------------------------------------------
-- Table file_import_submit_import_program_key_per_user
-- -----------------------------------------------------
CREATE TABLE  file_import_submit_import_program_key_per_user (
  user_id INT UNSIGNED NOT NULL,
  submit_import_program_key VARCHAR(300) NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  CONSTRAINT file_impt_sbmtimptprgm_key_pusr_usr_id_fk
    FOREIGN KEY (user_id)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX submit_import_program_key ON file_import_submit_import_program_key_per_user (submit_import_program_key ASC);


-- -----------------------------------------------------
-- Table file_import_submit_import_program_key_per_user_history
-- -----------------------------------------------------
CREATE TABLE  file_import_submit_import_program_key_per_user_history (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  submit_import_program_key VARCHAR(300) NOT NULL,
  original_table_created_date_time DATETIME NOT NULL,
  original_table_last_updated_date_time DATETIME NOT NULL,
  inserted_to_history_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table experiment_tbl
-- -----------------------------------------------------
CREATE TABLE  experiment_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  draft_flag TINYINT NOT NULL DEFAULT 0,
  assoc_search_data_lookup_parameters_id INT UNSIGNED NULL COMMENT 'id of record in search_data_lookup_parameters',
  name VARCHAR(200) NOT NULL,
  project_search_ids_only_json MEDIUMTEXT NULL COMMENT 'Just Project Search Ids, in ARRAY JSON',
  experiment_json__main_data MEDIUMTEXT NULL COMMENT 'Main Data - JSON',
  version_number_main_json INT UNSIGNED NOT NULL COMMENT 'Version number in JSON',
  experiment_revision_number INT NOT NULL DEFAULT 0 COMMENT 'Incremented for each save when not draft',
  created_by_user_id INT UNSIGNED NULL,
  created_by_user_type ENUM('web-user', 'web-non-user', 'importer-user', 'importer-no-user') NOT NULL,
  created_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by_remote_ip VARCHAR(45) NULL,
  experiment_last_updated_by_user_id INT NULL,
  experiment_last_updated_by_user_type ENUM('web-user', 'web-non-user', 'importer-user', 'importer-no-user') NOT NULL,
  experiment_last_updated_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_accessed DATETIME NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_experiment_tbl_sdlp_id
    FOREIGN KEY (assoc_search_data_lookup_parameters_id)
    REFERENCES search_data_lookup_parameters (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_experiment_tbl_prjct_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_experiment_tbl_sdlp_id_idx ON experiment_tbl (assoc_search_data_lookup_parameters_id ASC);

CREATE INDEX fk_experiment_tbl_prjct_id_idx ON experiment_tbl (project_id ASC);


-- -----------------------------------------------------
-- Table data_page_saved_view_tbl
-- -----------------------------------------------------
CREATE TABLE  data_page_saved_view_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  page_controller_path VARCHAR(80) NOT NULL,
  experiment_id INT UNSIGNED NULL COMMENT 'Only populated for Experiment',
  label VARCHAR(500) NULL,
  url_start_at_page_controller_path VARCHAR(6000) NOT NULL,
  srch_data_lkp_params_string VARCHAR(300) NOT NULL COMMENT '\'searchDataLookupParametersCode\'',
  user_id_created_record INT UNSIGNED NOT NULL,
  user_id_last_updated_record INT UNSIGNED NOT NULL,
  date_record_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_record_last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT data_page_saved_view_project_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT data_page_saved_view_experiment_id
    FOREIGN KEY (experiment_id)
    REFERENCES experiment_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX data_page_saved_view_project_id_idx ON data_page_saved_view_tbl (project_id ASC);

CREATE INDEX data_page_saved_view_experiment_id_idx ON data_page_saved_view_tbl (experiment_id ASC);


-- -----------------------------------------------------
-- Table data_page_saved_view_assoc_project_search_id_tbl
-- -----------------------------------------------------
CREATE TABLE  data_page_saved_view_assoc_project_search_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assoc_main_id INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT dt_pg_svd_vw_assc_prj_srch_id_assc_mn_id
    FOREIGN KEY (assoc_main_id)
    REFERENCES data_page_saved_view_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX dt_pg_svd_vw_assc_prj_srch_id_assc_mn_id_idx ON data_page_saved_view_assoc_project_search_id_tbl (assoc_main_id ASC);


-- -----------------------------------------------------
-- Table conversion_program_tbl
-- -----------------------------------------------------
CREATE TABLE  conversion_program_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  name VARCHAR(4000) NOT NULL,
  version VARCHAR(4000) NOT NULL,
  conversion_date DATETIME NOT NULL,
  pgm_arguments MEDIUMTEXT NOT NULL,
  pgm_uri VARCHAR(4000) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT conv_pgm_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX conv_pgm_search_id_fk_idx ON conversion_program_tbl (search_id ASC);


-- -----------------------------------------------------
-- Table experiment_assoc_project_search_id_tbl
-- -----------------------------------------------------
CREATE TABLE  experiment_assoc_project_search_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assoc_main_id INT UNSIGNED NOT NULL,
  project_search_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT experiment_assoc_prjct_srch_id_fk
    FOREIGN KEY (assoc_main_id)
    REFERENCES experiment_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX experiment_assoc_prjct_srch_id_fk_idx ON experiment_assoc_project_search_id_tbl (assoc_main_id ASC);


-- -----------------------------------------------------
-- Table search__reporter_ion_mass_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__reporter_ion_mass_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reporter_ion_mass DECIMAL(11,6) NOT NULL,
  PRIMARY KEY (search_id, reporter_ion_mass),
  CONSTRAINT search__reporter_ion__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table srch_rep_pept__reporter_ion_mass_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__reporter_ion_mass_lookup_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  reporter_ion_mass DECIMAL(11,6) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_rp_ppt__repion_lkp_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rp_ppt__repion_lkp_rprtd_pd_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX srch_rep_pept_idx ON srch_rep_pept__reporter_ion_mass_lookup_tbl (search_id ASC, reported_peptide_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__reporter_ion_mass_lookup_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table psm_reporter_ion_mass_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_reporter_ion_mass_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  psm_id BIGINT UNSIGNED NOT NULL,
  reporter_ion_mass DECIMAL(11,6) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT psm_rep_ion_mas_psm_id_fk
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX psm_dynmc_modfctn__psm_id_fk_idx ON psm_reporter_ion_mass_tbl (psm_id ASC);


-- -----------------------------------------------------
-- Table data_page_saved_view_assoc_experiment_id_tbl
-- -----------------------------------------------------
CREATE TABLE  data_page_saved_view_assoc_experiment_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assoc_main_id INT UNSIGNED NOT NULL,
  experiment_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT dt_pg_svd_vw_assc_exp_id_assc_mn_id
    FOREIGN KEY (assoc_main_id)
    REFERENCES data_page_saved_view_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX dt_pg_svd_vw_assc_exp_id_assc_mn_id_idx ON data_page_saved_view_assoc_experiment_id_tbl (assoc_main_id ASC);


-- -----------------------------------------------------
-- Table url_shortener_associated_experiment_id_tbl
-- -----------------------------------------------------
CREATE TABLE  url_shortener_associated_experiment_id_tbl (
  url_shortener_id INT UNSIGNED NOT NULL,
  experiment_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (url_shortener_id, experiment_id),
  CONSTRAINT url_shortener_associated_search_id_main_id0
    FOREIGN KEY (url_shortener_id)
    REFERENCES url_shortener_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX default_page_view_experiment_id_fk_idx ON url_shortener_associated_experiment_id_tbl (url_shortener_id ASC);


-- -----------------------------------------------------
-- Table psm_open_modification_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_open_modification_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  psm_id BIGINT UNSIGNED NOT NULL,
  mass DOUBLE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT psm_open_modfctn__psm_id_fk
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX psm_dynmc_modfctn__psm_id_fk_idx ON psm_open_modification_tbl (psm_id ASC);


-- -----------------------------------------------------
-- Table psm_open_modification_position_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_open_modification_position_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  psm_open_modification_id BIGINT UNSIGNED NOT NULL,
  position MEDIUMINT UNSIGNED NOT NULL,
  is_n_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  is_c_terminal TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  CONSTRAINT psm_open_modfctn_pos_parent_id_fk
    FOREIGN KEY (psm_open_modification_id)
    REFERENCES psm_open_modification_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

CREATE INDEX psm_dynmc_modfctn__psm_id_fk_idx ON psm_open_modification_position_tbl (psm_open_modification_id ASC);


-- -----------------------------------------------------
-- Table srch_rep_pept__psm_open_mod_rounded_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__psm_open_mod_rounded_lookup_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  psm_open_mod_mass_rounded_unique INT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT srch_rp_ppt__opn_md_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rp_ppt__opn_md_rprtd_pd_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = 'Unique open mod mass values at the psm level';

CREATE INDEX srch_rep_pept_idx ON srch_rep_pept__psm_open_mod_rounded_lookup_tbl (search_id ASC, reported_peptide_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__psm_open_mod_rounded_lookup_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  position_unique MEDIUMINT UNSIGNED NOT NULL,
  is_n_terminal TINYINT(1) UNSIGNED NOT NULL,
  is_c_terminal TINYINT(1) UNSIGNED NOT NULL,
  peptide_residue_letter CHAR(1) NOT NULL,
  protein_residue_letter_if_all_same CHAR(1) NULL COMMENT 'Only populated if all same value',
  PRIMARY KEY (id),
  CONSTRAINT srch_rp_ppt__opn_md_pud_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rp_ppt__opn_md_pud_rprtd_pd_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX srch_rep_pept_idx ON srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl (search_id ASC, reported_peptide_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON srch_rep_pept__open_mod_psm_unique_positions__lookup_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table search__open_mod_mass__psm_rounded_unique__lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__open_mod_mass__psm_rounded_unique__lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  open_mod_mass_unique_of_psm_level_rounded INT NOT NULL,
  PRIMARY KEY (search_id, open_mod_mass_unique_of_psm_level_rounded),
  CONSTRAINT search__open_mod_mass__search_id_fk0
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
COMMENT = 'Unique open mod mass values at the psm level';


-- -----------------------------------------------------
-- Table data_page_default_view_project_search_pages_tbl
-- -----------------------------------------------------
CREATE TABLE  data_page_default_view_project_search_pages_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_search_id INT UNSIGNED NOT NULL,
  page_controller_path VARCHAR(80) NOT NULL,
  url_start_at_page_controller_path VARCHAR(6000) NOT NULL,
  srch_data_lkp_params_string VARCHAR(300) NOT NULL COMMENT '\'searchDataLookupParametersCode\'',
  user_id_created_record INT UNSIGNED NOT NULL,
  user_id_last_updated_record INT UNSIGNED NOT NULL,
  date_record_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_record_last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_data_pg_dt_vw_prj_srch_pgs_ps_id
    FOREIGN KEY (project_search_id)
    REFERENCES project_search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_data_pg_dt_vw_prj_srch_pgs_ps_id_idx ON data_page_default_view_project_search_pages_tbl (project_search_id ASC);

CREATE UNIQUE INDEX proj_srch_id_bs_cntrllr_unique ON data_page_default_view_project_search_pages_tbl (project_search_id ASC, page_controller_path ASC);


-- -----------------------------------------------------
-- Table data_page_default_view_experiment_pages_tbl
-- -----------------------------------------------------
CREATE TABLE  data_page_default_view_experiment_pages_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  experiment_id INT UNSIGNED NOT NULL,
  page_controller_path VARCHAR(80) NOT NULL,
  url_start_at_page_controller_path VARCHAR(6000) NOT NULL,
  srch_data_lkp_params_string VARCHAR(300) NOT NULL COMMENT '\'searchDataLookupParametersCode\'',
  user_id_created_record INT UNSIGNED NOT NULL,
  user_id_last_updated_record INT UNSIGNED NOT NULL,
  date_record_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_record_last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_data_page_dflt_vw_exp_pgs_tbl_exp_id
    FOREIGN KEY (experiment_id)
    REFERENCES experiment_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX fk_data_page_dflt_vw_exp_pgs_tbl_exp_id_idx ON data_page_default_view_experiment_pages_tbl (experiment_id ASC);

CREATE UNIQUE INDEX exp_id_bs_cntrllr_unique ON data_page_default_view_experiment_pages_tbl (experiment_id ASC, page_controller_path ASC);


-- -----------------------------------------------------
-- Table project__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  project__insert_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table project_tbl';


-- -----------------------------------------------------
-- Table project_search__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search__insert_id_tbl (
  id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table project_search_tbl';


-- -----------------------------------------------------
-- Table search__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  search__insert_id_tbl (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table search_tbl';


-- -----------------------------------------------------
-- Table psm__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  psm__insert_id_tbl (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = 'Get next id value for insert table psm_tbl';


-- -----------------------------------------------------
-- Table annotation_type__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  annotation_type__insert_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id value for insert table annotation_type_tbl';


-- -----------------------------------------------------
-- Table search_programs_per_search__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  search_programs_per_search__insert_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB
COMMENT = 'Get next id val for insrt tbl search_programs_per_search_tbl';


-- -----------------------------------------------------
-- Table protein_coverage_peptide_protein_residue_different_tbl
-- -----------------------------------------------------
CREATE TABLE  protein_coverage_peptide_protein_residue_different_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT UNSIGNED NOT NULL,
  peptide_id_info_only INT UNSIGNED NOT NULL COMMENT 'Do Not use peptide_id_info_only to map peptides to  proteins',
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  peptide_position MEDIUMINT UNSIGNED NOT NULL,
  protein_position MEDIUMINT UNSIGNED NOT NULL,
  peptide_residue_letter CHAR(1) NOT NULL,
  protein_residue_letter CHAR(1) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT prot_cov_pptd_prtn_rsidu_df_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT prot_cov_pptd_prtn_rsidu_df__reportd_peptid_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX search_id_protein_seq_version_id ON protein_coverage_peptide_protein_residue_different_tbl (search_id ASC, protein_sequence_version_id ASC);

CREATE INDEX reported_peptide_id_fk_idx ON protein_coverage_peptide_protein_residue_different_tbl (reported_peptide_id ASC);

CREATE INDEX search_id_reppeptide_id_pept_pos ON protein_coverage_peptide_protein_residue_different_tbl (search_id ASC, reported_peptide_id ASC, peptide_position ASC);


-- -----------------------------------------------------
-- Table search_sub_group_tbl
-- -----------------------------------------------------
CREATE TABLE  search_sub_group_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  display_order SMALLINT UNSIGNED NULL,
  subgroup_name_from_import_file VARCHAR(500) NOT NULL,
  subgroup_name_display VARCHAR(75) NULL COMMENT 'User entered value or null',
  PRIMARY KEY (search_id, search_sub_group_id),
  CONSTRAINT search_sub_group_search_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Search Sub Group';


-- -----------------------------------------------------
-- Table search_rep_pept_sub_group_tbl
-- -----------------------------------------------------
CREATE TABLE  search_rep_pept_sub_group_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, reported_peptide_id, search_sub_group_id),
  CONSTRAINT srch_rep_pept_sub_grp_search_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_rep_pept_sub_grp_rp_p_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'search sub groups per reported peptide id';

CREATE INDEX srch_rep_pept_sub_grp_rp_p_fk_idx ON search_rep_pept_sub_group_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table psm_search_sub_group_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_search_sub_group_tbl (
  psm_id BIGINT UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (psm_id, search_sub_group_id),
  CONSTRAINT psm_sub_grp_psm_fk
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'search sub group for psm id';


-- -----------------------------------------------------
-- Table search__rep_pept_sub_group_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept_sub_group_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  any_psm_has_dynamic_modifications TINYINT UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_open_modifictions TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
  any_psm_has_reporter_ions TINYINT UNSIGNED NOT NULL DEFAULT 0,
  psm_num_at_default_cutoff INT(10) UNSIGNED NOT NULL,
  psm_id_sequential_start BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Not Zero if PSM IDs sequential for this search id/reported peptide id',
  psm_id_sequential_end BIGINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Not Zero if PSM IDs sequential for this search id/reported peptide id',
  PRIMARY KEY (search_id, reported_peptide_id, search_sub_group_id),
  CONSTRAINT search__rep_pept_sg__gnrc_lkp_reported_peptide_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT search__rep_pept_sg__gnrc_lkp_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin;

CREATE INDEX search__rep_pept_sg__generic_lookup__reported_peptide_id_f_idx ON search__rep_pept_sub_group_lookup_tbl (reported_peptide_id ASC);


-- -----------------------------------------------------
-- Table search__rep_pept_sub_group__best_psm_value_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  search__rep_pept_sub_group__best_psm_value_lookup_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  reported_peptide_id INT(10) UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  best_psm_value_for_ann_type_id DOUBLE NOT NULL,
  psm_id_for_best_value__non_fk BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (search_id, reported_peptide_id, search_sub_group_id, annotation_type_id),
  CONSTRAINT srch_rp_ppt_sg_bst_psm_vl_gnrc_lkp_rep_pept_id_fk
    FOREIGN KEY (reported_peptide_id)
    REFERENCES reported_peptide_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT srch_rp_ppt_sg_bst_psm_vl_gnrc_lkp_search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX reported_peptide_id_f_idx ON search__rep_pept_sub_group__best_psm_value_lookup_tbl (reported_peptide_id ASC);

CREATE INDEX search_id_for_fk___type_best_psm_val_idx ON search__rep_pept_sub_group__best_psm_value_lookup_tbl (search_id ASC, best_psm_value_for_ann_type_id ASC);


-- -----------------------------------------------------
-- Table project_search_sub_group_tbl
-- -----------------------------------------------------
CREATE TABLE  project_search_sub_group_tbl (
  project_search_id INT UNSIGNED NOT NULL,
  search_sub_group_id SMALLINT UNSIGNED NOT NULL,
  search_id MEDIUMINT UNSIGNED NULL,
  display_order SMALLINT UNSIGNED NULL,
  subgroup_name_display VARCHAR(75) NULL COMMENT 'User entered value or null',
  PRIMARY KEY (project_search_id, search_sub_group_id),
  CONSTRAINT project_search_sub_group_prj_search_fk
    FOREIGN KEY (search_id)
    REFERENCES project_search_tbl (search_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT project_search_sub_group_search_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Sub Group User Editable Data';

CREATE INDEX project_search_sub_group_prj_search_fk_idx ON project_search_sub_group_tbl (search_id ASC);


-- -----------------------------------------------------
-- Table search__flags_other_tbl
-- -----------------------------------------------------
CREATE TABLE  search__flags_other_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  psm_rt_mz_from_scan_file TINYINT NOT NULL DEFAULT 0 COMMENT 'rt mz fields from scan file, not limelight xml file',
  PRIMARY KEY (search_id),
  CONSTRAINT search__flags_other__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = '\"Other\" flags for a search';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

