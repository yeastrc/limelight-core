
--   update_to_Limelight_V3__InsertIntoTables.sql

INSERT INTO aa_limelight_database_version_tbl (limelight_database_version_number) VALUES ('3');


--  !!!!!!!!!!!!!!!!!!!!!!!!!

--   No record already exist but this will be standard SQL statement going forward.

INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
	VALUES ('DB Version Current', 3)
	 ON DUPLICATE KEY UPDATE limelight_database_version_number = 3;
			 
