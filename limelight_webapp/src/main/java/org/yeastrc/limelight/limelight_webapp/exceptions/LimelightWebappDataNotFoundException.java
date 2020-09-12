package org.yeastrc.limelight.limelight_webapp.exceptions;


/**
 * Data not found from DB query.  
 * 
 * Required for Guava LoadingCache since not valid to return null to Guava Cache
 *
 */
public class LimelightWebappDataNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public LimelightWebappDataNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LimelightWebappDataNotFoundException(String arg0, Throwable arg1, boolean arg2, boolean arg3) {
		super(arg0, arg1, arg2, arg3);
		// TODO Auto-generated constructor stub
	}

	public LimelightWebappDataNotFoundException(String arg0, Throwable arg1) {
		super(arg0, arg1);
		// TODO Auto-generated constructor stub
	}

	public LimelightWebappDataNotFoundException(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	public LimelightWebappDataNotFoundException(Throwable arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

}
