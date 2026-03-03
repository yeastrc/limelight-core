

--  Upgrade Limelight DB to version 8


--   In Future Updates, always update this before start with other SQL updates

INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 8)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 8;

--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  !!!!!!!   UPGRADE SQL START  !!!!!!!!



--  Updated Dev DB to here 

--  Updated YRC Main Server DB to here 



DROP TABLE search__rep_pept__psm_tgt_id_dcy_dcy_psm_bst_psm_vl_lkp_tbl;




--  !!!!!!!   UPGRADE SQL END    !!!!!!!!
    
--  !!!!!!!!!!!!!!!!!!!!!!!!!

--  Update aa_limelight_database_version_tbl  record 'DB Version Current' to version 5

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 8)
    ON DUPLICATE KEY UPDATE limelight_database_version_number = 8;


--   !!!!    All SQL should be added above the SQL statement direct above inserting or updating 'DB Version Current'  !!!

--   !!!!    NO SQL should be added below this point  !!!
