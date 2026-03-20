

--  Upgrade Limelight DB to version 8


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 8)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 8;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!


--    Delete large unused table

--  Drop since NOT used in webapp.  Importer only inserts.
DROP TABLE search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl;

--  -------------------------

--   Alter file object storage table so unique is the file type id and the API key instead of just the API key

ALTER TABLE file_object_storage_main_entry_tbl 
DROP INDEX file_object_storage_api_key_UNIQUE ;

ALTER TABLE file_object_storage_main_entry_tbl 
ADD UNIQUE INDEX file_type_id_file_object_storage_api_key_UNIQUE (file_type_id ASC, file_object_storage_api_key ASC) VISIBLE;

--  -------------------------

--   Add support for Structure File like PDB files.  Initially on Single Protein.

--  Prep lookup table for insert new value
ALTER TABLE file_object_storage_main_entry_file_type_lookup_tbl 
ADD COLUMN fake_on_update_field_when_already_exists TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER create_date;

--  Insert into lookup table.  better than 'INSERT IGNORE' since that also ignores foreign keys and other things
INSERT INTO file_object_storage_main_entry_file_type_lookup_tbl (id, description)
VALUES ('5', 'Structure File like PDB')
ON DUPLICATE KEY UPDATE fake_on_update_field_when_already_exists = 1;


--   NEW tables


-- -----------------------------------------------------
-- Table structure_file_like_pdb_file_type_lookup_tbl
-- -----------------------------------------------------
CREATE TABLE  structure_file_like_pdb_file_type_lookup_tbl (
  id INT UNSIGNED NOT NULL COMMENT 'id must match Java enum StructureFile_Like_PDB_File_FileType_Enum',
  short_name VARCHAR(45) NOT NULL COMMENT 'String for type passed to from web front end.  Required to be unique.  and short_name must match Java enum StructureFile_Like_PDB_File_FileType_Enum',
  description VARCHAR(300) NOT NULL,
  create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fake_on_update_field_when_already_exists TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE UNIQUE INDEX file_object_storage_api_key_UNIQUE ON structure_file_like_pdb_file_type_lookup_tbl (description ASC) VISIBLE;

CREATE UNIQUE INDEX short_name_UNIQUE ON structure_file_like_pdb_file_type_lookup_tbl (short_name ASC) VISIBLE;


-- -----------------------------------------------------
-- Table structure_file_like_pdb_tbl
-- -----------------------------------------------------
CREATE TABLE  structure_file_like_pdb_tbl (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  project_id INT UNSIGNED NOT NULL,
  file_object_storage_main_entry_id_fk INT UNSIGNED NOT NULL,
  name VARCHAR(400) NOT NULL COMMENT 'Most likely filename',
  file_type_id INT UNSIGNED NOT NULL,
  file_size BIGINT NOT NULL,
  description VARCHAR(2000) NULL,
  structure_file_chains_id_label_auth_json_blob TEXT NOT NULL COMMENT 'JSON blob with info on all chains in structure file.  See code for contents of blob',
  create_date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  user_id_created INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT structure_file_like_pdb_user_id
    FOREIGN KEY (user_id_created)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT structure_file_like_pdb_projct_id
    FOREIGN KEY (project_id)
    REFERENCES project_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT structure_file_like_pdb_f_o_s_id
    FOREIGN KEY (file_object_storage_main_entry_id_fk)
    REFERENCES file_object_storage_main_entry_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT structure_file_like_pdb_fl_tp_id
    FOREIGN KEY (file_type_id)
    REFERENCES structure_file_like_pdb_file_type_lookup_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_import_tracking_user_id_idx ON structure_file_like_pdb_tbl (user_id_created ASC) VISIBLE;

CREATE INDEX project_id_status_id ON structure_file_like_pdb_tbl (project_id ASC) VISIBLE;

CREATE INDEX structure_file_like_pdb_f_o_s_id_idx ON structure_file_like_pdb_tbl (file_object_storage_main_entry_id_fk ASC) VISIBLE;

CREATE INDEX structure_file_like_pdb_fl_tp_id_idx ON structure_file_like_pdb_tbl (file_type_id ASC) VISIBLE;


-- -----------------------------------------------------
-- Table structure_file_like_pdb_alignment_tbl
-- -----------------------------------------------------
CREATE TABLE  structure_file_like_pdb_alignment_tbl (
  structure_file_like_pdb_id_fk INT UNSIGNED NOT NULL,
  limelight_chain_id INT UNSIGNED NOT NULL COMMENT 'Limelight Assigned Chain Id for a given chain in the structure file',
  protein_sequence_version_id INT UNSIGNED NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  aligned_structure_file_sequence TEXT NOT NULL,
  aligned_limelight_protein_sequence TEXT NOT NULL,
  search_ids_when_alignment_created_comma_delim TEXT NOT NULL,
  create_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id_created INT UNSIGNED NOT NULL,
  update_date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id_updated INT UNSIGNED NOT NULL,
  PRIMARY KEY (structure_file_like_pdb_id_fk, limelight_chain_id, protein_sequence_version_id),
  CONSTRAINT strtr_fl_lk_pdb_algmt_user_id_c
    FOREIGN KEY (user_id_created)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT strtr_fl_lk_pdb_algmt_parent_id
    FOREIGN KEY (structure_file_like_pdb_id_fk)
    REFERENCES structure_file_like_pdb_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT strtr_fl_lk_pdb_algmt_user_id_u
    FOREIGN KEY (user_id_updated)
    REFERENCES user_tbl (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX file_import_tracking_user_id_idx ON structure_file_like_pdb_alignment_tbl (user_id_created ASC) VISIBLE;

CREATE INDEX project_id_status_id ON structure_file_like_pdb_alignment_tbl (project_id ASC) VISIBLE;

CREATE INDEX strtr_fl_lk_pdb_algmt_parent_id_idx ON structure_file_like_pdb_alignment_tbl (structure_file_like_pdb_id_fk ASC) VISIBLE;

CREATE INDEX strtr_fl_lk_pdb_algmt_user_id_u_idx ON structure_file_like_pdb_alignment_tbl (user_id_updated ASC) VISIBLE;

CREATE UNIQUE INDEX unique_prot_seq_id_str_file_id_chn_id_psvid ON structure_file_like_pdb_alignment_tbl (structure_file_like_pdb_id_fk ASC, protein_sequence_version_id ASC, limelight_chain_id ASC) VISIBLE;

CREATE INDEX prj_id_prot_seq_id_str_file_id ON structure_file_like_pdb_alignment_tbl (project_id ASC, protein_sequence_version_id ASC, structure_file_like_pdb_id_fk ASC) VISIBLE;


-- -----------------------------------------------------
-- Table structure_file_like_pdb_chain_entry_tbl
-- -----------------------------------------------------
CREATE TABLE  structure_file_like_pdb_chain_entry_tbl (
  structure_file_like_pdb_id_fk INT UNSIGNED NOT NULL,
  limelight_chain_id INT UNSIGNED NOT NULL COMMENT 'Limelight Assigned Chain Id for a given chain in the structure file',
  PRIMARY KEY (structure_file_like_pdb_id_fk, limelight_chain_id),
  CONSTRAINT strtr_fl_lk_pdb_chain_parent_id
    FOREIGN KEY (structure_file_like_pdb_id_fk)
    REFERENCES structure_file_like_pdb_tbl (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'Parent Structure File table.  One entry per chain with only limelight chain id to allow join with alignments to determine which chains NOT have alignments.';





INSERT INTO structure_file_like_pdb_file_type_lookup_tbl 
(id, short_name, description) 
VALUES (1, 'pdb', 'pdb format')
ON DUPLICATE KEY UPDATE fake_on_update_field_when_already_exists = 1;

INSERT INTO structure_file_like_pdb_file_type_lookup_tbl 
(id, short_name, description) 
VALUES (2, 'mmcif', 'mmcif format')
ON DUPLICATE KEY UPDATE fake_on_update_field_when_already_exists = 1;




--  Updated Dev DB to here 

--  Updated YRC Main Server DB to here 


--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 8)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 8;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
