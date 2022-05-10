

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


