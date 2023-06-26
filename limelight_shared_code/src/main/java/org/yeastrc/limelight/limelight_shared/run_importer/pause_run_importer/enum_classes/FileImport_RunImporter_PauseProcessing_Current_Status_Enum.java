package org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes;

/**
 * Enum for is this file_import__run_importer__pause_processing_current_status_tbl.status_id_fk 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import__run_importer__pause_processing_cur_status_st_vl_tbl'
 * 
 */
public enum FileImport_RunImporter_PauseProcessing_Current_Status_Enum {

	NOT_PAUSED(1),
	YES_PAUSED(2),
	PAUSED_PENDING_COMPLETION(3);
	
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImport_RunImporter_PauseProcessing_Current_Status_Enum( int v) {
        value = v;
    }

    public int value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static FileImport_RunImporter_PauseProcessing_Current_Status_Enum fromValue( int value_ ) {
        for (FileImport_RunImporter_PauseProcessing_Current_Status_Enum c: FileImport_RunImporter_PauseProcessing_Current_Status_Enum.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImport_RunImporter_PauseProcessing_Current_Status_Enum not valid for value: " + value_ );
    }
	
}
