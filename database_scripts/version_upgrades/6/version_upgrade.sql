

--  Upgrade Limelight DB to version 6


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 6)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 6;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!

-- -----------------------------------------------------
-- Table srch__protein_filterable_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__protein_filterable_annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  protein_sequence_version_id INT(10) UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  value_double DOUBLE NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (id),
  CONSTRAINT srch_protn_filann_antp_id_fk
    FOREIGN KEY (annotation_type_id)
    REFERENCES annotation_type_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_protn_filann_psvid_id_fk
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE UNIQUE INDEX srch__protein_search_id_protseqvid_ann__type_id_fk_idx ON srch__protein_filterable_annotation_tbl (search_id ASC, protein_sequence_version_id ASC, annotation_type_id ASC) VISIBLE;

CREATE INDEX srch_protn_filann_antp_id_fk_idx ON srch__protein_filterable_annotation_tbl (annotation_type_id ASC) VISIBLE;

CREATE INDEX srch_protn_filann_psvid_id_fk_idx ON srch__protein_filterable_annotation_tbl (protein_sequence_version_id ASC) VISIBLE;

-- -----------------------------------------------------
-- Table srch__protein_descriptive_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__protein_descriptive_annotation_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  search_id MEDIUMINT UNSIGNED NOT NULL,
  protein_sequence_version_id INT(10) UNSIGNED NOT NULL,
  annotation_type_id INT(10) UNSIGNED NOT NULL,
  value_location ENUM('local','large_value_table') NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (id),
  CONSTRAINT srch_protn_desann_antp_id_fk
    FOREIGN KEY (annotation_type_id)
    REFERENCES annotation_type_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT srch_protn_desann_psvid_id_fk
    FOREIGN KEY (protein_sequence_version_id)
    REFERENCES protein_sequence_version_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE INDEX srch__rep_pept__ann__rep_pept_id_fk_idx ON srch__protein_descriptive_annotation_tbl (protein_sequence_version_id ASC) VISIBLE;

CREATE UNIQUE INDEX srch__rep_pept_search_id_reppeptid_ann__type_id_fk_idx ON srch__protein_descriptive_annotation_tbl (search_id ASC, protein_sequence_version_id ASC, annotation_type_id ASC) VISIBLE;

CREATE INDEX srch__rep_pept_srch_id_reppeptid_ann_tp__idx ON srch__protein_descriptive_annotation_tbl (search_id ASC, protein_sequence_version_id ASC) VISIBLE;

CREATE INDEX srch_protn_desann_antp_id_fk_idx ON srch__protein_descriptive_annotation_tbl (annotation_type_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table srch__protein_desc_ann_large_value_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__protein_desc_ann_large_value_tbl (
  srch__protein_descriptive_annotation_id INT UNSIGNED NOT NULL,
  value_string LONGTEXT NULL,
  PRIMARY KEY (srch__protein_descriptive_annotation_id),
  CONSTRAINT srch__protein_desc_ann_lrg_val_primary_id_fk
    FOREIGN KEY (srch__protein_descriptive_annotation_id)
    REFERENCES srch__protein_descriptive_annotation_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table srch__protein_descriptive_annotation__insert_id_tbl
-- -----------------------------------------------------
CREATE TABLE  srch__protein_descriptive_annotation__insert_id_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id))
ENGINE = InnoDB;


--  Alter existing tables

ALTER TABLE srch__prot_seq_v_id_tbl 
ADD COLUMN protein_meets_default_filters TINYINT UNSIGNED NOT NULL DEFAULT 1 AFTER protein_is_independent_decoy;


ALTER TABLE srch_rep_pept__prot_seq_v_id_tbl 
ADD COLUMN protein_meets_default_filters TINYINT UNSIGNED NOT NULL DEFAULT 1 AFTER protein_is_independent_decoy;



--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 6)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 6;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
