package org.yeastrc.limelight.limelight_shared.run_importer.run_importer_alive_status.enum_classes;

/**
 * Enum for is this file_import__import_and_pipeline_run__run_importer_alive_tbl.status_id 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import__import_and_pipeline_run__run_imptr_alive_status_tbl'
 * 
 */
public enum FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum {

	ALIVE(1),
	SHUTDOWN(2);
	
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum( int v) {
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
    public static FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum fromValue( int value_ ) {
        for (FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum c: FileImport_ImportAndPipelineRun_RunImporter_Alive_Status_Enum.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImport_ImportAndPipelineRun_PauseProcessing_Status_Enum not valid for value: " + value_ );
    }
	
}
