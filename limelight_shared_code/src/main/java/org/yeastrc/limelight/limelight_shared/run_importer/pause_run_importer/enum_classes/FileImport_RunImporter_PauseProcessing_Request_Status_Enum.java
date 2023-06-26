package org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes;

/**
 * Enum for is this file_import__import_and_pipeline_run__pause_processing_tbl.status_id 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import__import_and_pipeline_r__ps_pcng_status_vals_tbl'
 * 
 */
public enum FileImport_RunImporter_PauseProcessing_Request_Status_Enum {

	NOT_PAUSE(1),
	PAUSE_IMMEDIATELY(2),
	PAUSE_WHEN_COMPLETE(3);
	
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImport_RunImporter_PauseProcessing_Request_Status_Enum( int v) {
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
    public static FileImport_RunImporter_PauseProcessing_Request_Status_Enum fromValue( int value_ ) {
        for (FileImport_RunImporter_PauseProcessing_Request_Status_Enum c: FileImport_RunImporter_PauseProcessing_Request_Status_Enum.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImport_RunImporter_PauseProcessing_Request_Status_Enum not valid for value: " + value_ );
    }
	
}
