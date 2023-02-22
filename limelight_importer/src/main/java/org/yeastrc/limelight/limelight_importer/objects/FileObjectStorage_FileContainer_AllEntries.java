package org.yeastrc.limelight.limelight_importer.objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Container of FileObjectStorage_FileContainer which are the 'initial' holders of files from command line or file import table
 *
 */
public class FileObjectStorage_FileContainer_AllEntries {
	
	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_FileContainer_AllEntries.class );

	private List<FileObjectStorage_FileContainer> fileObjectStorage_FileContainer_List = new ArrayList<>();

	/**
	 * @return true if any entries
	 */
	public boolean hasAnyEntries() {
		return ! fileObjectStorage_FileContainer_List.isEmpty();
	}

	/**
	 * @return size
	 */
	public int getSize() {
		return fileObjectStorage_FileContainer_List.size();
	}
	
	public List<FileObjectStorage_FileContainer> get_FileObjectStorage_FileContainer_List() {
		return Collections.unmodifiableList(this.fileObjectStorage_FileContainer_List);
	}

	/**
	 * @param searchScanFileDTO
	 * @throws LimelightImporterDataException 
	 */
	public void addEntry( FileObjectStorage_FileContainer fileObjectStorage_FileContainer_Param ) throws LimelightImporterDataException {
		
		//  Check existing entries for scanFilename

		for ( FileObjectStorage_FileContainer fileObjectStorage_FileContainer_InList : fileObjectStorage_FileContainer_List ) {
			
			if ( fileObjectStorage_FileContainer_InList.getFilename().equals( fileObjectStorage_FileContainer_Param.getFilename() ) ) {
				String msg = "Filename Already processed: " + fileObjectStorage_FileContainer_Param.getFilename();
				log.error(msg);
				throw new LimelightImporterDataException(msg);
			}
		}
		
		fileObjectStorage_FileContainer_List.add(fileObjectStorage_FileContainer_Param);
	}
	
	/**
	 * @param filename
	 * @return
	 */
	public FileObjectStorage_FileContainer get_From_Filename( String filename ) {
		

		for ( FileObjectStorage_FileContainer fileObjectStorage_FileContainer_InList : fileObjectStorage_FileContainer_List ) {
			
			if ( fileObjectStorage_FileContainer_InList.getFilename().equals( filename ) ) {
				return fileObjectStorage_FileContainer_InList;
			}
		}
		return null;
	}

	
}
