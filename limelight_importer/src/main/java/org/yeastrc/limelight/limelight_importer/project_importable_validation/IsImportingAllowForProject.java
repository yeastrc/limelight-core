package org.yeastrc.limelight.limelight_importer.project_importable_validation;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterProjectNotAllowImportException;
import org.yeastrc.limelight.limelight_importer.searcher.ProjectStateSearcher;
import org.yeastrc.limelight.limelight_importer.searcher.ProjectStateSearcherResults;
import org.slf4j.Logger;

/**
 * Is importing allowed for the project.
 * Importing is not allowed if the project is locked or disabled or marked for deletion
 *
 */
public class IsImportingAllowForProject {

	private static final Logger log = LoggerFactory.getLogger( IsImportingAllowForProject.class );
	
	/**
	 * private constructor
	 */
	private IsImportingAllowForProject(){}
	public static IsImportingAllowForProject getInstance() {
		return new IsImportingAllowForProject();
	}
	
	/**
	 * Is importing allowed for the project.
	 * Importing is not allowed if the project is locked or disabled or marked for deletion
	 * 
	 * Throws LimelightImporterProjectNotAllowImportException if not allowed to impoort to project
	 * 
	 * @param projectId
	 * @throws LimelightImporterProjectNotAllowImportException if specific  
	 * @throws Exception if system error
	 */
	public void isImportingAllowForProject( int projectId ) 
			throws LimelightImporterProjectNotAllowImportException, Exception {
		
		ProjectStateSearcherResults projectStateSearcherResults = getProjectState( projectId );
		
		validateProjectState( projectId, projectStateSearcherResults );
	}
	
	/**
	 * @param projectId
	 * @throws Exception
	 */
	public ProjectStateSearcherResults getProjectState( int projectId ) throws Exception {
		
		ProjectStateSearcherResults projectStateSearcherResults = null;
		
		try {
			projectStateSearcherResults = ProjectStateSearcher.getInstance().getProjectState( projectId );
		} catch( Exception e ) {
			String msg = "Error getting data for project id: " + projectId;
			log.error( msg, e );
			System.err.println( msg );
			System.err.println( "Error: " + e.getMessage() );
			throw e;
		}
		
		return projectStateSearcherResults;
	}
	
	/**
	 * @param projectId
	 * @param projectStateSearcherResults
	 * @throws Exception
	 */
	public void validateProjectState( int projectId, ProjectStateSearcherResults projectStateSearcherResults ) throws Exception {

		if ( projectStateSearcherResults == null ) {
			String msg = "!!!!!!!!!!!     The Project Id specified (" + projectId + ") is not in the database" ;
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( "!!!!");
			System.err.println( msg );
			System.err.println( "!!!!");
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( " " );
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( "!!!!");
			System.out.println( msg );
			System.out.println( "!!!!");
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( " " );
			System.err.println( " " );
			LimelightImporterProjectNotAllowImportException limelightImporterProjectNotAllowImportException =
					new LimelightImporterProjectNotAllowImportException( msg );
			limelightImporterProjectNotAllowImportException.setNotAllowedReason(
					LimelightImporterProjectNotAllowImportException.NotAllowedReason.PROJECT_NOT_IN_DATABASE );
			throw limelightImporterProjectNotAllowImportException;
		} 

		if ( projectStateSearcherResults.isProjectLocked() ) {
			String msg = "!!!!!!!!!!!!!!      The Project Id specified (" + projectId + ") is locked so no data can be imported for it." ;
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( "!!!!");
			System.err.println( msg );
			System.err.println( "!!!!");
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( " " );
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( "!!!!");
			System.out.println( msg );
			System.out.println( "!!!!");
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( " " );
			System.err.println( " " );
			LimelightImporterProjectNotAllowImportException limelightImporterProjectNotAllowImportException =
					new LimelightImporterProjectNotAllowImportException( msg );
			limelightImporterProjectNotAllowImportException.setNotAllowedReason(
					LimelightImporterProjectNotAllowImportException.NotAllowedReason.PROJECT_LOCKED );
			throw limelightImporterProjectNotAllowImportException;
		}

		if ( ! projectStateSearcherResults.isProjectEnabled() ) {
			String msg = "!!!!!!!!!!!!!!      The Project Id specified (" + projectId + ") is disabled so no data can be imported for it." ;
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( "!!!!");
			System.err.println( msg );
			System.err.println( "!!!!");
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( " " );
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( "!!!!");
			System.out.println( msg );
			System.out.println( "!!!!");
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( " " );
			System.err.println( " " );
			LimelightImporterProjectNotAllowImportException limelightImporterProjectNotAllowImportException =
					new LimelightImporterProjectNotAllowImportException( msg );
			limelightImporterProjectNotAllowImportException.setNotAllowedReason(
					LimelightImporterProjectNotAllowImportException.NotAllowedReason.PROJECT_NOT_ENABLED );
			throw limelightImporterProjectNotAllowImportException;
		}

		if ( projectStateSearcherResults.isProjectMarkedForDeletion() ) {
			String msg = "!!!!!!!!!!!!!!      The Project Id specified (" + projectId + ") is marked for deletion so no data can be imported for it." ;
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( "!!!!");
			System.err.println( msg );
			System.err.println( "!!!!");
			System.err.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.err.println( " " );
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( "!!!!");
			System.out.println( msg );
			System.out.println( "!!!!");
			System.out.println( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println( " " );
			System.err.println( " " );
			LimelightImporterProjectNotAllowImportException limelightImporterProjectNotAllowImportException =
					new LimelightImporterProjectNotAllowImportException( msg );
			limelightImporterProjectNotAllowImportException.setNotAllowedReason(
					LimelightImporterProjectNotAllowImportException.NotAllowedReason.PROJECT_MARKED_FOR_DELETION );
			throw limelightImporterProjectNotAllowImportException;
		}

		//  Project has no reason for not importing so just return
	}
}
