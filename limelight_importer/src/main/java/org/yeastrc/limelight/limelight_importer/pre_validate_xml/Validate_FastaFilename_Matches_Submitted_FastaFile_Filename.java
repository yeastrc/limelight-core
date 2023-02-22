package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer;
import org.yeastrc.limelight.limelight_importer.objects.FileObjectStorage_FileContainer_AllEntries;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;

/**
 * Validate that the Fasta Filename in the Limelight XML file
 * is the same filename as the FASTA file filename for the submitted FASTA file if a FASTA file was submitted.
 * 
 */
public class Validate_FastaFilename_Matches_Submitted_FastaFile_Filename {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_FastaFilename_Matches_Submitted_FastaFile_Filename.class );
	
	private Validate_FastaFilename_Matches_Submitted_FastaFile_Filename() { }
	public static Validate_FastaFilename_Matches_Submitted_FastaFile_Filename getInstance() {
		return new Validate_FastaFilename_Matches_Submitted_FastaFile_Filename();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_FastaFilename_Matches_Submitted_FastaFile_Filename( 
			
			LimelightInput limelightInput, 
			FileObjectStorage_FileContainer_AllEntries fileObjectStorage_FileContainer_AllEntries
			
			) throws LimelightImporterDataException {
		
		 // Validate that the Fasta Filename in the Limelight XML file
		 // is the same filename as the FASTA file filename for the submitted FASTA file if a FASTA file was submitted.

		List<FileObjectStorage_FileContainer> fasta_File_AllEntries = new ArrayList<>( fileObjectStorage_FileContainer_AllEntries.getSize() );
		
		for ( FileObjectStorage_FileContainer entry : fileObjectStorage_FileContainer_AllEntries.get_FileObjectStorage_FileContainer_List() ) {
			
			if ( entry.getFileType_FileObjectStore_FileType() == FileObjectStore_FileType_Enum.FASTA_FILE_TYPE ) {
				fasta_File_AllEntries.add(entry);
			}
		}
		
		if ( fasta_File_AllEntries.isEmpty() ) {
			//  No FASTA file so exit
			
			return; // EARLY RETURN
		}
		
		if ( fasta_File_AllEntries.size() > 1 ) {
			String msg = "More than 1 FASTA file submitted for search.";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}

		FileObjectStorage_FileContainer  fasta_File_Entry = fasta_File_AllEntries.get(0);
		
		if ( ! fasta_File_Entry.getFilename().equals( limelightInput.getFastaFilename() ) ) {
			String msg = "FASTA file in Limelight XML file MUST MATCH filename of FASTA file submitted for search.  FASTA file in Limelight XML file '"
					+ limelightInput.getFastaFilename()
					+ "'.  Filename of FASTA file submitted for search '"
					+  fasta_File_Entry.getFilename()
					+ "'.";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
		
	}
			
}
