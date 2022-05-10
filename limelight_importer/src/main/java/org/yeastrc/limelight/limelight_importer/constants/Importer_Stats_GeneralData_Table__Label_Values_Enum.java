package org.yeastrc.limelight.limelight_importer.constants;

import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_GeneralData_DAO;

/**
 * Values used in table 'importer_stats_general_data_tbl'  field 'label'
 * 
 * SQL table definition:
 * 
 *   label VARCHAR(255) CHARACTER SET 'latin1' NOT NULL,
 *
 */
public enum Importer_Stats_GeneralData_Table__Label_Values_Enum {

	TOTAL_IMPORT_TIME("Total Import Time"),

	READ_LIMELIGHT_XML_FILE_TIME("Read Limelight XML File Time"),
	
	PROCESS_REPORTEDPEPTIDESANDPSMS_MINUS_PSM_FILTERABLE_INSERTS("ProcessReportedPeptidesAndPSMs_Minus_PSM_Filterable_Inserts"),
	
	IMPORTER_SEARCH_INSERTED_WAIT_TIME_FOR_SPECTR_COMPLETE("Search Inserted: Wait Time For Spectr Complete"),

	PROTEIN_INFERENCE__PEPTIDES_TO_PROTEINS__PREP_TIME_AND_TIME_LOOKING_UP_PROTEINS("Protein Inference: Peptides to Proteins: prep time and time looking up proteins"),

	PROTEIN_INFERENCE__PEPTIDES_TO_PROTEINS__TIME_LOOKING_UP_PROTEINS("Protein Inference: Peptides to Proteins: time looking up proteins");
   
	
	
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private Importer_Stats_GeneralData_Table__Label_Values_Enum(String v) {
    	if ( v.length() > Importer_Stats_GeneralData_DAO.LABEL_FIELD_MAX_LENGTH__Importer_Stats_GeneralData_DAO ) {
    		
    		throw new RuntimeException("Importer_Stats_GeneralData_Table__Label_Values_Enum constructor: value is > Importer_Stats_GeneralData_DAO.LABEL_FIELD_MAX_LENGTH.  value: " + v );
    	}
        value = v;
    }

    public String value() {
        return value;
    }

}
