package org.yeastrc.limelight.limelight_shared.enum_classes;

/**
 * Values in file_object_storage_main_entry_file_type_lookup_tbl.id
 * 
 * (Also in file_object_storage_main_entry_tbl.file_type_id)
 *
 */
public enum FileObjectStore_FileType_Enum {


    /**
     * Unknown file type.  Use in place where accept any generic file.  Hopefully Never use this
     */
    UNKNOWN_FILE_TYPE(1),
    
    /**
     * FASTA file
     */
    FASTA_FILE_TYPE(2),

    /**
     * Generic Other file
     */
    GENERIC_OTHER_FILE_TYPE(3),
    
    /**
     * Scan file - Submitted as Scan File to Limelight
     */
    SCAN_FILE_TYPE(4);

    
    private final int value;


    /**
     * @param enumValue
     * @return 'Description' String for table file_object_storage_main_entry_file_type_lookup_tbl as well as other uses
     */
    public static String fileObjectStore_FileType_GetDescriptionString_ForEnumValue( FileObjectStore_FileType_Enum enumValue ) {
    	
    	if ( enumValue == FileObjectStore_FileType_Enum.UNKNOWN_FILE_TYPE ) {
    		
    		return "UNKNOWN FILE TYPE";
    	}

    	if ( enumValue == FileObjectStore_FileType_Enum.FASTA_FILE_TYPE ) {
    		
    		return "FASTA FILE";
    	}

    	if ( enumValue == FileObjectStore_FileType_Enum.GENERIC_OTHER_FILE_TYPE) {
    		
    		return "Generic File";
    	}

    	if ( enumValue == FileObjectStore_FileType_Enum.SCAN_FILE_TYPE) {
    		
    		return "Scan File";
    	}    	
    	
    	throw new IllegalArgumentException( "fileObjectStore_FileType_GetDescriptionString_ForEnumValue(...): enumValue is unknown.  enumValue.value(): " + enumValue.value() );
    }
    
    /**
     * constructor:  Make private to hide 
     */
    private FileObjectStore_FileType_Enum(Integer v) {
    	if ( v == null ) {

            throw new IllegalArgumentException( "FileObjectStore_FileType_Enum not valid for value null");
    	}
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
    public static FileObjectStore_FileType_Enum fromValue( Integer value_ ) {
     	if ( value_ == null ) {

            throw new IllegalArgumentException( "FileObjectStore_FileType_Enum not valid for value null");
    	}
        for (FileObjectStore_FileType_Enum c: FileObjectStore_FileType_Enum.values()) {
            if (c.value ==  value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileObjectStore_FileType_Enum not valid for value: " + value_ );
    }

}
