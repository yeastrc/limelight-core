
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


