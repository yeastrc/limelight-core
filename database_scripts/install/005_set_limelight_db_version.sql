
--   Set Limelight DB Version for initial install, BOTH records MUST have SAME value.

--      Current version is:  4

USE limelight ;


INSERT INTO aa_limelight_database_version_tbl
(row_label, limelight_database_version_number)
VALUES ('DB Version In Progress', 4 );


INSERT INTO aa_limelight_database_version_tbl (row_label, limelight_database_version_number)
VALUES ('DB Version Current', 4 );
