package org.yeastrc.limelight.limelight_importer.objects;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Container of ScanFileFileContainer which are the 'initial' holders of scan files from command line or file import table
 *
 */
public class ScanFileFileContainer_AllEntries {
	
	private static final Logger log = LoggerFactory.getLogger( ScanFileFileContainer_AllEntries.class );

	private List<ScanFileFileContainer> scanFileFileContainer_List = new ArrayList<>();

	/**
	 * @return true if any entries
	 */
	public boolean hasAnyEntries() {
		return ! scanFileFileContainer_List.isEmpty();
	}

	/**
	 * @return size
	 */
	public int getSize() {
		return scanFileFileContainer_List.size();
	}
	
	public List<ScanFileFileContainer> get_ScanFileFileContainer_List() {
		return Collections.unmodifiableList(this.scanFileFileContainer_List);
	}

	/**
	 * @param searchScanFileDTO
	 * @throws LimelightImporterDataException 
	 */
	public void addEntry( ScanFileFileContainer scanFileFileContainer_Param ) throws LimelightImporterDataException {
		
		//  Check existing entries for scanFilename

		for ( ScanFileFileContainer scanFileFileContainer_InList : scanFileFileContainer_List ) {
			
			if ( scanFileFileContainer_InList.getScanFilename().equals( scanFileFileContainer_Param.getScanFilename() ) ) {
				String msg = "Scan Filename Already processed: " + scanFileFileContainer_Param.getScanFilename();
				log.error(msg);
				throw new LimelightImporterDataException(msg);
			}
			if ( scanFileFileContainer_InList.getScanFilename_NoSuffix().equals( scanFileFileContainer_Param.getScanFilename_NoSuffix() ) ) {
				String msg = "Scan Filename without suffix Already processed: " + scanFileFileContainer_Param.getScanFilename_NoSuffix();
				log.error(msg);
				throw new LimelightImporterDataException(msg);
			}
		}
		
		scanFileFileContainer_List.add(scanFileFileContainer_Param);
	}
	
	/**
	 * @param scanFilename
	 * @return
	 */
	public ScanFileFileContainer get_From_ScanFilename( String scanFilename ) {
		

		for ( ScanFileFileContainer scanFileFileContainer_InList : scanFileFileContainer_List ) {
			
			if ( scanFileFileContainer_InList.getScanFilename().equals( scanFilename ) ) {
				return scanFileFileContainer_InList;
			}
		}
		return null;
	}

	/**
	 * @param scanFilename_NoSuffix
	 * @return
	 */
	public ScanFileFileContainer get_From_ScanFilename_NoSuffix( String scanFilename_NoSuffix ) {

		for ( ScanFileFileContainer scanFileFileContainer_InList : scanFileFileContainer_List ) {
			
			if ( scanFileFileContainer_InList.getScanFilename_NoSuffix().equals( scanFilename_NoSuffix ) ) {
				return scanFileFileContainer_InList;
			}
		}
		return null;
	}
	
	
	public void removeAllEntries_Except_These_ScanFilenames( Set<String> scanFilenamesLimelightXMLInputSet ) {
		
		Iterator<ScanFileFileContainer> iterator = scanFileFileContainer_List.iterator();
		
		while ( iterator.hasNext() ) {
			ScanFileFileContainer scanFileFileContainer = iterator.next();
			if ( scanFileFileContainer == null ) {
				break;
			}
			if ( ( ! scanFilenamesLimelightXMLInputSet.contains( scanFileFileContainer.getScanFilename() ) )
					&& ( ! scanFilenamesLimelightXMLInputSet.contains( scanFileFileContainer.getScanFilename_NoSuffix() ) ) ) {
				iterator.remove();
			}
		}
	}
	
	
}
