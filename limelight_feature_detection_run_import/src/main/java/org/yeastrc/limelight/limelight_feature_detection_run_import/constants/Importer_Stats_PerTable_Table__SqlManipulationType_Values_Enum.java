package org.yeastrc.limelight.limelight_feature_detection_run_import.constants;

/**
 * Values used in table 'importer_stats_per_table_tbl'  field 'table_manipulation_type'
 * 
 * SQL table definition:
 * 
 *   table_manipulation_type ENUM('insert', 'update', 'delete') NOT NULL,
 *
 */
public enum Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum {


	SELECT("select"),
	INSERT("insert"),
	UPDATE("update"),

	DELETE("delete");
   
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum(String v) {
   
        value = v;
    }

    public String value() {
        return value;
    }

}
