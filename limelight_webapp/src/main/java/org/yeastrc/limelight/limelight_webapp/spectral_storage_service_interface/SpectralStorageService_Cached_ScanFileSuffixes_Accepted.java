package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Cache last returned values for ScanFileSuffixes Accepted
 *
 */
public class SpectralStorageService_Cached_ScanFileSuffixes_Accepted {

	private static volatile List<String> scanFileSuffixes_Accepted_List = null;
	
	/**
	 * @return
	 */
	public static List<String> get_ScanFileSuffixes_Accepted_List() {
		
		return scanFileSuffixes_Accepted_List;
	}
	
	/**
	 * @param scanFileSuffixes_Accepted_List_Param
	 */
	public static void set_ScanFileSuffixes_Accepted_List( List<String> scanFileSuffixes_Accepted_List_Param ) {
		
		List<String> scanFileSuffixes_Accepted_List_Local = new ArrayList<>( scanFileSuffixes_Accepted_List_Param.size() );
		
		for ( String scanFileSuffixes_Accepted_Param_Entry : scanFileSuffixes_Accepted_List_Param ) {
			
			scanFileSuffixes_Accepted_List_Local.add(scanFileSuffixes_Accepted_Param_Entry);
		}
		
		scanFileSuffixes_Accepted_List = Collections.unmodifiableList(scanFileSuffixes_Accepted_List_Local);
	}
}
