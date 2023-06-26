package org.yeastrc.limelight.limelight_shared.run_importer.run_importer_alive_status.enum_classes;

/**
 * Enum for is this file_import__import_and_pipeline_run__run_importer_alive_tbl.id_fk 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import__import_and_pipeline_run__run_imptr_alv_type_tbl'
 * 
 */
public enum FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum {

	ALIVE(1)
//	,
//	BBB(2)
	;

    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum( int v) {
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
    public static FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum fromValue( int value_ ) {
        for (FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum c: FileImport_ImportAndPipelineRun_RunImporter_Alive_Type_ID_Enum.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImport_ImportAndPipelineRun_PauseProcessing_Status_Enum not valid for value: " + value_ );
    }
	
}
