package org.yeastrc.limelight.limelight_shared.enum_classes;

/**
 * Values in structure_file_like_pdb_file_type_lookup_tbl.id
 * 
 * (Also in file_object_storage_main_entry_tbl.file_type_id)
 *
 */
public enum StructureFile_Like_PDB_File_FileType_Enum {

    /**
     * PDB file
     */
    PDB_FILE_TYPE(1),

    /**
     * mmCIF file type
     */
    MMCIF_FILE_TYPE(2);

    private final int value;
    
    //  Strings for "short_name".  Passed to/from Webapp Front End.
    private static final String PDB_SHORT_NAME_STRING = "pdb";
    private static final String MMCIF_SHORT_NAME_STRING = "mmcif";


    /**
     * @param enumValue
     * @return 'Description' String for table file_object_storage_main_entry_file_type_lookup_tbl as well as other uses
     */
    public static String structureFile_Like_PDB_File_FileType_Get_ShortName_String_ForEnumValue( StructureFile_Like_PDB_File_FileType_Enum enumValue ) {
    	
    	if ( enumValue == StructureFile_Like_PDB_File_FileType_Enum.PDB_FILE_TYPE) {
    		
    		return PDB_SHORT_NAME_STRING;
    	}

    	if ( enumValue == StructureFile_Like_PDB_File_FileType_Enum.MMCIF_FILE_TYPE ) {
    		
    		return MMCIF_SHORT_NAME_STRING;
    	}

    	throw new IllegalArgumentException( "StructureFile_Like_PDB_File_FileType_Enum(...): enumValue is unknown.  enumValue.value(): " + enumValue.value() );
    }
    
    /**
     * @param enumValue
     * @return 'Description' String for table file_object_storage_main_entry_file_type_lookup_tbl as well as other uses
     */
    public static String structureFile_Like_PDB_File_FileType_Get_Description_String_ForEnumValue( StructureFile_Like_PDB_File_FileType_Enum enumValue ) {
    	
    	if ( enumValue == StructureFile_Like_PDB_File_FileType_Enum.MMCIF_FILE_TYPE ) {
    		
    		return "mmCIF File Type";
    	}

    	if ( enumValue == StructureFile_Like_PDB_File_FileType_Enum.PDB_FILE_TYPE) {
    		
    		return "PDB File Type";
    	}
    	
    	throw new IllegalArgumentException( "StructureFile_Like_PDB_File_FileType_Enum(...): enumValue is unknown.  enumValue.value(): " + enumValue.value() );
    }
    
    /**
     * constructor:  Make private to hide 
     */
    private StructureFile_Like_PDB_File_FileType_Enum(Integer v) {
    	if ( v == null ) {

            throw new IllegalArgumentException( "FileObjectStore_FileType_Enum not valid for value null");
    	}
        value = v;
    }

    public int value() {
        return value;
    }

    /**
     * Get the enum from the Integer value
     * 
     * @param value_
     * @return
     */
    public static StructureFile_Like_PDB_File_FileType_Enum fromValue( Integer value_ ) {
     	if ( value_ == null ) {

            throw new IllegalArgumentException( "StructureFile_Like_PDB_File_FileType_Enum not valid for value null");
    	}
        for (StructureFile_Like_PDB_File_FileType_Enum c: StructureFile_Like_PDB_File_FileType_Enum.values()) {
            if (c.value ==  value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "StructureFile_Like_PDB_File_FileType_Enum not valid for value: " + value_ );
    }

    /**
     * @param enumValue
     * @return 'Description' String for table file_object_storage_main_entry_file_type_lookup_tbl as well as other uses
     */
    public static StructureFile_Like_PDB_File_FileType_Enum from_ShortName( String shortName ) {
    	
    	if ( MMCIF_SHORT_NAME_STRING.equals( shortName ) ) {
    		
    		return StructureFile_Like_PDB_File_FileType_Enum.MMCIF_FILE_TYPE;
    	}

    	if ( PDB_SHORT_NAME_STRING.equals( shortName ) ) {
    		
    		return StructureFile_Like_PDB_File_FileType_Enum.PDB_FILE_TYPE;
    	}
    	
    	throw new IllegalArgumentException( "from_ShortName(...): shortName is unknown.  shortName: " + shortName );
    }
    
}
