

--  Upgrade Limelight DB to version 7


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 7)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 7;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!

ALTER TABLE annotation_type_tbl 
CHANGE COLUMN psm_peptide_protein_type psm_peptide_protein_type ENUM('psm', 'peptide', 'matched_protein', 'modification_position', 'psm_peptide_position') NOT NULL COMMENT '\'peptide\' is actually reported peptide' ;


-- -----------------------------------------------------
-- Table psm_peptide_position_filterable_annotation_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_peptide_position_filterable_annotation_tbl (
  psm_id BIGINT UNSIGNED NOT NULL,
  annotation_type_id INT UNSIGNED NOT NULL,
  peptide_position MEDIUMINT UNSIGNED NOT NULL,
  value_double DOUBLE NOT NULL,
  value_string VARCHAR(50) NOT NULL COMMENT 'Length is also coded in Java class AnnotationValueStringLocalFieldLengthConstants',
  PRIMARY KEY (psm_id, annotation_type_id, peptide_position),
  CONSTRAINT psm_mod_pos_fltrbl_annttn__psm_id_fk0
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table psm_peptide_position_worst_filterable_annotation_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  psm_peptide_position_worst_filterable_annotation_lookup_tbl (
  psm_id BIGINT UNSIGNED NOT NULL,
  annotation_type_id INT UNSIGNED NOT NULL,
  worst_value_double DOUBLE NOT NULL,
  PRIMARY KEY (psm_id, annotation_type_id),
  CONSTRAINT psm_mod_pos_fltrbl_annttn__psm_id_fk00
    FOREIGN KEY (psm_id)
    REFERENCES psm_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


ALTER TABLE search_tbl
ADD COLUMN any_psm_has__psm_peptide_position_annotation TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER any_psm_has__is_independent_decoy_true;


-- -----------------------------------------------------
-- Table search_level_annotation_min_max_tbl
-- -----------------------------------------------------
CREATE TABLE  search_level_annotation_min_max_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  annotation_type_id INT UNSIGNED NOT NULL,
  min_value_double DOUBLE NOT NULL COMMENT 'value closest to negative infinity',
  max_value_double DOUBLE NOT NULL COMMENT 'value closest to positive infinity',
  best_value_double DOUBLE NOT NULL COMMENT 'best value per annotation type',
  worst_value_double DOUBLE NOT NULL COMMENT 'worst value per annotation type',
  set_1_on_insert_duplicate TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (search_id, annotation_type_id),
  CONSTRAINT search_level_annotation_min_max_tbl_srch_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = 'Annotation Min/Max Values for search and Annotation Type Id';



-- -----------------------------------------------------
-- Table search__flags_main_tbl
-- -----------------------------------------------------
CREATE TABLE  search__flags_main_tbl (
  search_id MEDIUMINT UNSIGNED NOT NULL,
  search_not_contain_proteins TINYINT NOT NULL DEFAULT 0 COMMENT 'limelight xml file not contain <matched_proteins>',
  PRIMARY KEY (search_id),
  CONSTRAINT search__flags_main_tbl__search_id_fk
    FOREIGN KEY (search_id)
    REFERENCES search_tbl (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
COLLATE = latin1_bin
COMMENT = '\"Main\" flags for a search.  All new flags go here instead of in \'search_tbl\'.';


--  Updated Dev DB to here 

--  Updated YRC Main Server DB to here 




--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 7)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 7;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
