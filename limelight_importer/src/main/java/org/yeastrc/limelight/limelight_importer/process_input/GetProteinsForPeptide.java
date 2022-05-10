/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_importer.process_input;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinsForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_GeneralData_Table__Label_Values_Enum;
import org.yeastrc.limelight.limelight_importer.dao.Importer_Stats_GeneralData_DAO;
import org.yeastrc.limelight.limelight_importer.dto.Importer_Stats_GeneralData_DTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchDTO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.ProteinImporterContainer;
import org.yeastrc.limelight.limelight_importer.utils.PeptideProteinSequenceForProteinInference;
import org.yeastrc.limelight.limelight_shared.constants.IsotopeLabelsConstants;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoveragePeptideProteinProteinResidueDifferentDTO;

/**
 * Singleton instance
 *
 */
public class GetProteinsForPeptide {

	private static final Logger log = LoggerFactory.getLogger( GetProteinsForPeptide.class );
	
	private static final GetProteinsForPeptide instance = new GetProteinsForPeptide();
	private GetProteinsForPeptide() { }
	/**
	 * @return Singleton instance
	 */
	public static GetProteinsForPeptide getSingletonInstance() { return instance; }
	
	private long totalElapsedTimeInTheseMethodsInMilliSeconds = 0;
	
	private long getProteinsForPeptide_totalElapsedTimeInMilliSeconds = 0;
	
	//  Cached data is incorrect so just remove for now
	
	//  Cached list of proteins for peptide sequence for protein inference and isotope label id 
	//    (key is peptide sequence and isotope label id)
//	private Map<PeptideOrProteinSequence_IsotopeLabelId, List<ProteinImporterContainer>> peptideSequenceAndIsotopeLabelIdToListProteinImporterContainer_Map = new HashMap<>();
	

	/**
	 * Cached ProteinImporterContainer entries on protein sequence and isotope label id
	 */
	private Map<PeptideOrProteinSequence_IsotopeLabelId, ProteinImporterContainer> proteinSequenceToProteinImporterContainer_Map = new HashMap<>();
	
	//  From input Limelight XML file, matched proteins section
	private MatchedProteins matchedProteinsFromLimelightXML;

	//  Built from matchedProteinsFromLimelightXML
	private Map<Integer, List<InternalHolder_ProteinsFromMatchedProteins>> proteinsFromMatchedProteinsList_KeyedOn_IsotopeLabelId = new HashMap<>();

	//  Built from matchedProteinsFromLimelightXML
	private Map<Integer, Map<BigInteger, InternalHolder_ProteinsFromMatchedProteins>> proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId = new HashMap<>();
	
	
	/**
	 * @return
	 */
	public long getTotalElapsedTimeInTheseMethodsInMilliSeconds() {
		return totalElapsedTimeInTheseMethodsInMilliSeconds;
	}

	/**
	 * @return
	 */
	public long getGetProteinsForPeptide_totalElapsedTimeInMilliSeconds() {
		return getProteinsForPeptide_totalElapsedTimeInMilliSeconds;
	}

	
	/**
	 * @throws Exception 
	 * 
	 */
	public void logTotalElapsedTime_SaveToImporterStatsTable(
			
			SearchDTO_Importer search
			) throws Exception {
		
		
		{
			double elapsedTotalTimeSeconds = totalElapsedTimeInTheseMethodsInMilliSeconds / 1000.0;
			double elapsedTotalTimeMinutes = ( elapsedTotalTimeSeconds ) / 60.0;
			
			log.warn( "Total Elapsed Time: Peptides to Proteins: prep time and time looking up proteins: "
					+ elapsedTotalTimeSeconds + " seconds, or "
					+ elapsedTotalTimeMinutes + " minutes.");
			
			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			
			importer_Stats_GeneralData_DTO.setLabel( Importer_Stats_GeneralData_Table__Label_Values_Enum.PROTEIN_INFERENCE__PEPTIDES_TO_PROTEINS__PREP_TIME_AND_TIME_LOOKING_UP_PROTEINS );
			
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds(totalElapsedTimeInTheseMethodsInMilliSeconds);
			
			importer_Stats_GeneralData_DTO.setSearchId( search.getId() );
			
			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}

		{
			double elapsedGetProteinsTimeSeconds = getProteinsForPeptide_totalElapsedTimeInMilliSeconds / 1000.0;
			double elapsedGetProteinsTimeMinutes = ( elapsedGetProteinsTimeSeconds ) / 60.0;

			log.warn( "Get Proteins for Proteins Total Elapsed Time: Peptides to Proteins: time looking up proteins: "
					+ elapsedGetProteinsTimeSeconds + " seconds, or "
					+ elapsedGetProteinsTimeMinutes + " minutes.");
			
			Importer_Stats_GeneralData_DTO importer_Stats_GeneralData_DTO = new Importer_Stats_GeneralData_DTO();
			
			importer_Stats_GeneralData_DTO.setLabel( Importer_Stats_GeneralData_Table__Label_Values_Enum.PROTEIN_INFERENCE__PEPTIDES_TO_PROTEINS__TIME_LOOKING_UP_PROTEINS );
			
			importer_Stats_GeneralData_DTO.setTotal_elapsedTime_Milliseconds(getProteinsForPeptide_totalElapsedTimeInMilliSeconds);
			
			importer_Stats_GeneralData_DTO.setSearchId( search.getId() );
			
			Importer_Stats_GeneralData_DAO.getInstance().save(importer_Stats_GeneralData_DTO);
		}
					
	}
	
	/**
	 * Result from call to getProteinsForPeptide
	 *
	 */
	public static class GetProteinsForPeptideResult {
		
		private Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_EntryPerProtein;

		public Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> getProteins_EntryPerProtein() {
			return proteins_EntryPerProtein;
		}
	}
	
	/**
	 * Result from call to getProteinsForPeptide Entry for each Protein
	 *
	 */
	public static class GetProteinsForPeptideResult_EntryPerProtein {
		
		private List<Integer> peptidePositionInProteinList;
		private Map<Integer,Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> diffResidue_Map_Key_PeptidePosition;
		private Map<Integer,Set<String>> proteinResidueLetters_Map_Key_PeptidePosition;
		
		public List<Integer> getPeptidePositionInProteinList() {
			return peptidePositionInProteinList;
		}
		public Map<Integer, Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> getDiffResidue_Map_Key_PeptidePosition() {
			return diffResidue_Map_Key_PeptidePosition;
		}
		public Map<Integer, Set<String>> getProteinResidueLetters_Map_Key_PeptidePosition() {
			return proteinResidueLetters_Map_Key_PeptidePosition;
		} 
	}
	
	/**
	 * Return ProteinImporterContainer objects for the peptide
	 * 
	 * @return 
	 * @throws Exception
	 */
	public GetProteinsForPeptideResult getProteinsForPeptide(
			ReportedPeptide reportedPeptideFromLimelightXMLFile,
			Set<Integer> peptidePositionsToGetProteinResidueLettersFor
			) throws Exception {
		
		long startTimeNanoSeconds = System.nanoTime();
		
		if ( matchedProteinsFromLimelightXML == null ) {
			String msg = "matchedProteinsFromLimelightXML is null, it hasn't been set";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		
		//  Method result object
		GetProteinsForPeptideResult getProteinsForPeptideResult = new GetProteinsForPeptideResult();
		
		//  Method result Map
		Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_EntryPerProtein = new HashMap<>();
		getProteinsForPeptideResult.proteins_EntryPerProtein = proteins_EntryPerProtein;
		
		String peptideSequence_Original = reportedPeptideFromLimelightXMLFile.getSequence();
		char[] peptideSequence_Original_CharArray = peptideSequence_Original.toCharArray();
		
		// Create copy of peptide sequence for protein inference where I and L are replaced with J
		String peptideSequenceForProteinInference = 
				PeptideProteinSequenceForProteinInference.getSingletonInstance().
				convert_PeptideOrProtein_SequenceFor_I_L_Equivalence_ChangeTo_J( peptideSequence_Original );
		
		if ( reportedPeptideFromLimelightXMLFile.getPeptideIsotopeLabels() != null ) {
			String msg = "Peptide Isotope Labels not yet supported";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
		
//		GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile_Result result =
//				GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.getInstance()
//				.getIsotopeLabelIdFor_Peptide_FromLimelightXMLFile( reportedPeptideFromLimelightXMLFile );
//		
//		int peptide_IsotopeLabelId = result.getIsotopeLabelId();
//		String peptide_IsotopeLabelString = result.getIsotopeLabelString();
		
		//  Hard code peptide_IsotopeLabelId to no label
		int peptide_IsotopeLabelId = IsotopeLabelsConstants.ID_NONE;
		String peptide_IsotopeLabelString = null;

		PeptideOrProteinSequence_IsotopeLabelId peptideSequenceIsotopeLabelId = new PeptideOrProteinSequence_IsotopeLabelId();
		peptideSequenceIsotopeLabelId.peptideOrProteinSequence_ForProteinInference = peptideSequenceForProteinInference;
		
//		peptideSequenceIsotopeLabelId.isotopeLabelId = peptide_IsotopeLabelId;
		
//		List<ProteinImporterContainer> cachedproteinMatches = 
//				peptideSequenceAndIsotopeLabelIdToListProteinImporterContainer_Map.get( peptideSequenceIsotopeLabelId );
//		if ( cachedproteinMatches != null ) {
//			return cachedproteinMatches;
//		}
		
		{
			MatchedProteinsForPeptide matchedProteinsForPeptide = reportedPeptideFromLimelightXMLFile.getMatchedProteinsForPeptide();

			if ( matchedProteinsForPeptide!= null 
					&& matchedProteinsForPeptide.getMatchedProteinForPeptide() != null
					&& ( ! matchedProteinsForPeptide.getMatchedProteinForPeptide().isEmpty() ) ) {

				//  Have specific <matched_protein> ids for this reported peptide
				//  Only search <matched_protein> entries with those ids
				//  The reported peptide MUST be found in every one of the <matched_protein> entries

				Map<BigInteger, InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsMap_KeyedOnId =
						proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId.get( peptide_IsotopeLabelId );

				if ( proteinsFromMatchedProteinsMap_KeyedOnId == null ) {
					if ( peptide_IsotopeLabelString != null ) {
						String msg = "Processing <matched_protein_for_peptide> entries: No proteins were found in <matched_proteins> with isotope label '" + peptide_IsotopeLabelString + "'.  "
								+ "Processing Peptide with isotope label '" + peptide_IsotopeLabelString + "' and sequence: "
								+ reportedPeptideFromLimelightXMLFile.getSequence()
								+ ", reported peptide string: "
								+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					} else {
						String msg = "Processing <matched_protein_for_peptide> entries: No proteins were found in <matched_proteins> with no isotope label.  "
								+ "Processing Peptide with sequence: "
								+ reportedPeptideFromLimelightXMLFile.getSequence()
								+ ", reported peptide string: "
								+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
				
				// Get unique <matched_protein_for_peptide> 'id' for this Reported Peptide

				Set<BigInteger> matchedProteinForPeptide_IDs_This_ReportedPeptide = new HashSet<>();
				
				for ( MatchedProteinForPeptide matchedProteinForPeptide : matchedProteinsForPeptide.getMatchedProteinForPeptide() ) {
					
					BigInteger matchedProteinId = matchedProteinForPeptide.getId();
					matchedProteinForPeptide_IDs_This_ReportedPeptide.add( matchedProteinId );
				}
				
				for ( BigInteger matchedProteinId : matchedProteinForPeptide_IDs_This_ReportedPeptide ) {

					InternalHolder_ProteinsFromMatchedProteins holder = proteinsFromMatchedProteinsMap_KeyedOnId.get( matchedProteinId );
					if ( holder == null ) {
						if ( peptide_IsotopeLabelString != null ) {
							String msg = "Processing <matched_protein_for_peptide> 'id' not found in <matched_protein> entries:  " + matchedProteinId
									+ "Processing Peptide with isotope label '" + peptide_IsotopeLabelString + "' and sequence: "
									+ reportedPeptideFromLimelightXMLFile.getSequence()
									+ ", reported peptide string: "
									+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						} else {
							String msg = "Processing <matched_protein_for_peptide> 'id' not found in <matched_protein> entries:  " + matchedProteinId
									+ "Processing Peptide with no isotope label and sequence: "
									+ reportedPeptideFromLimelightXMLFile.getSequence()
									+ ", reported peptide string: "
									+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						
						}
					}
					
					if ( ! processOneProteinForPeptideToProteinMapping( 
							holder, peptide_IsotopeLabelId, 
							peptideSequenceForProteinInference, peptideSequence_Original, peptideSequence_Original_CharArray, 
							proteins_EntryPerProtein,
							peptidePositionsToGetProteinResidueLettersFor,
							reportedPeptideFromLimelightXMLFile /* For Error Logging */ ) ) {
						
						if ( peptide_IsotopeLabelString != null ) {
							
							String msg = "reported peptide not found in <matched_protein> entry specified by  <matched_protein_for_peptide> id: " + matchedProteinId
									+ ".  Processing Peptide with isotope label '" + peptide_IsotopeLabelString + "' and sequence: "
									+ reportedPeptideFromLimelightXMLFile.getSequence()
									+ ", reported peptide string: "
									+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString()
									+ ", Protein sequence: " + holder.matchedProteinFromLimelightXML.getSequence();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						} else {
							String msg = "reported peptide not found in <matched_protein> entry specified by  <matched_protein_for_peptide> id: " + matchedProteinId
									+ ".  Processing Peptide with no isotope label and sequence: "
									+ reportedPeptideFromLimelightXMLFile.getSequence()
									+ ", reported peptide string: "
									+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString()
									+ ", Protein sequence: " + holder.matchedProteinFromLimelightXML.getSequence();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						}
					}
				}

			} else {

				List<InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsList = 
						proteinsFromMatchedProteinsList_KeyedOn_IsotopeLabelId.get( peptide_IsotopeLabelId );

				if ( proteinsFromMatchedProteinsList == null ) {
					if ( peptide_IsotopeLabelString != null ) {
						String msg = "No proteins were found in <matched_proteins> with isotope label '" + peptide_IsotopeLabelString + "'.  "
								+ "Processing Peptide with isotope label '" + peptide_IsotopeLabelString + "' and sequence: "
								+ reportedPeptideFromLimelightXMLFile.getSequence()
								+ ", reported peptide string: "
								+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					} else {
						String msg = "No proteins were found in <matched_proteins> with no isotope label.  "
								+ "Processing Peptide with sequence: "
								+ reportedPeptideFromLimelightXMLFile.getSequence()
								+ ", reported peptide string: "
								+ reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}

				//  Process Matched Proteins list, returning proteins that match the peptide in the request 

				for ( InternalHolder_ProteinsFromMatchedProteins holder : proteinsFromMatchedProteinsList ) {
					
					processOneProteinForPeptideToProteinMapping( // method on this class
							holder, 
							peptide_IsotopeLabelId, 
							peptideSequenceForProteinInference,
							peptideSequence_Original, peptideSequence_Original_CharArray,
							proteins_EntryPerProtein,
							peptidePositionsToGetProteinResidueLettersFor,
							reportedPeptideFromLimelightXMLFile // For Error Logging 
							);
				}
			}
		}
		
//		peptideSequenceAndIsotopeLabelIdToListProteinImporterContainer_Map.put( peptideSequenceIsotopeLabelId, proteinMatches );
		
		long endTimeNanoSeconds = System.nanoTime();
		
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTimeInTheseMethodsInMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		
		getProteinsForPeptide_totalElapsedTimeInMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
		
		return getProteinsForPeptideResult;
	}
	
	/**
	 * @param holder
	 * @param peptide_IsotopeLabelId
	 * @param peptideSequenceForProteinInference
	 * @param proteins_PeptidePositionsInProteinResult
	 * @return - true if peptide found in protein
	 * @throws Exception
	 */
	private boolean processOneProteinForPeptideToProteinMapping( 
			InternalHolder_ProteinsFromMatchedProteins holder,
			int peptide_IsotopeLabelId,
			String peptideSequenceForProteinInference,
			String peptideSequence_Original,
			char[] peptideSequence_Original_CharArray,
			Map<ProteinImporterContainer, GetProteinsForPeptideResult_EntryPerProtein> proteins_EntryPerProtein,
			Set<Integer> peptidePositionsToGetProteinResidueLettersFor,
			ReportedPeptide reportedPeptideFromLimelightXMLFile // For Logging
			) throws Exception {

		MatchedProtein matchedProteinFromLimelightXMLFile = holder.matchedProteinFromLimelightXML;
		String proteinSequenceForProteinInference = holder.proteinSequenceForProteinInference;
		int protein_IsotopeLabelId = holder.protein_IsotopeLabelId;
		String proteinSequence_Original = holder.matchedProteinFromLimelightXML.getSequence();
		
		//  Redundant Isotope Label Id check 
		if ( peptide_IsotopeLabelId != protein_IsotopeLabelId ) {
			// Isotope labels don't match so skip.  There is a isotope label id for no label
			//  Internal error
			String msg = "peptide_IsotopeLabelId != protein_IsotopeLabelId. peptide_IsotopeLabelId: " 
					+ peptide_IsotopeLabelId 
					+ ", protein_IsotopeLabelId: " + protein_IsotopeLabelId
					+ ", peptideSequenceForProteinInference: " + peptideSequenceForProteinInference
					+ ", protein sequence: " + holder.matchedProteinFromLimelightXML.getSequence()
					+ ", reported Peptide String: " + reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException( msg );
			//  !!  Cannot return false since used for a different thing
			// return;  // EARLY EXIT
		}
		
		//  Search protein sequence that has been converted where I and L are replaced with J
		
		List<Integer> peptidePositionInProteinList = new ArrayList<>(); 
 
		Map<Integer,Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO>> diffResidue_Map_Key_PeptidePosition = new HashMap<>();
		Map<Integer,Set<String>> proteinResidueLetters_Map_Key_PeptidePosition = new HashMap<>();
		
		int fromIndex = 0;
		int peptideIndex = 0;
		while ( ( peptideIndex = proteinSequenceForProteinInference.indexOf( peptideSequenceForProteinInference, fromIndex ) ) >= 0 ) {
			fromIndex = peptideIndex + 1; // Advance fromIndex past peptideIndex
			
			int indexEnd = peptideIndex + peptideSequenceForProteinInference.length();
			String proteinSequence_Original_Subsequence = proteinSequence_Original.substring( peptideIndex, indexEnd );
			
			if ( proteinSequence_Original_Subsequence.length() != peptideSequence_Original.length() ) {
				String msg = "proteinSequence_Original_Subsequence.length() != peptideSequence_Original.length(). proteinSequence_Original_Subsequence.length(): "
						+  proteinSequence_Original_Subsequence.length()
						+ ", peptideSequence_Original.length(): " + peptideSequence_Original.length()
						+ ", peptideSequence_Original: " + peptideSequence_Original
						+ ", ReportedPeptideString: " + reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
				log.error(msg);
				throw new LimelightImporterInternalException( msg );
			}


			//  Compare The sub sequence found in the protein sequence to the peptide sequence 
			//  when using the original sequences for both.
			//  When not a match, this is most likely caused by the "I" "L" equivalent processing.
			//  This is an acceptable situation.

			//  When not a match, this will result in more data being stored to record this fact and which positions are different

			//  Also store protein residue letter for all positions as specified as in input Set

			char[] proteinSequence_Original_Subsequence_Chars = proteinSequence_Original_Subsequence.toCharArray();

			for ( int index = 0; index < proteinSequence_Original_Subsequence_Chars.length; index++ ) {

				int peptidePosition = index + 1; // 1 based
				int proteinPosition = peptideIndex + index + 1; // 1 based

				if ( peptideSequence_Original_CharArray[ index ] != proteinSequence_Original_Subsequence_Chars[ index ] ) {

					ProteinCoveragePeptideProteinProteinResidueDifferentDTO diff = new ProteinCoveragePeptideProteinProteinResidueDifferentDTO();
					diff.setPeptidePosition( peptidePosition );
					diff.setProteinPosition( proteinPosition );
					diff.setPeptideResidueLetter( String.valueOf( peptideSequence_Original_CharArray[ index ] ) );
					diff.setProteinResidueLetter( String.valueOf( proteinSequence_Original_Subsequence_Chars[ index ] ) );

					Set<ProteinCoveragePeptideProteinProteinResidueDifferentDTO> diff_AtPosition = 
							diffResidue_Map_Key_PeptidePosition.get( peptidePosition );

					if ( diff_AtPosition == null ) {

						diff_AtPosition = new HashSet<>();
						diffResidue_Map_Key_PeptidePosition.put( peptidePosition, diff_AtPosition );
					}

					diff_AtPosition.add( diff );
				}

				if ( peptidePositionsToGetProteinResidueLettersFor.contains( peptidePosition ) ) {

					Set<String> proteinResidueLetters = proteinResidueLetters_Map_Key_PeptidePosition.get( peptidePosition );
					if ( proteinResidueLetters == null ) {
						proteinResidueLetters = new HashSet<>();
						proteinResidueLetters_Map_Key_PeptidePosition.put( peptidePosition, proteinResidueLetters );
					}
					String proteinResidue = String.valueOf( proteinSequence_Original_Subsequence_Chars[ index ] );
					proteinResidueLetters.add( proteinResidue );
				}
			}

			int proteinStartPosition = peptideIndex + 1;  //  Positions are 1 based
			peptidePositionInProteinList.add( proteinStartPosition );
		}
		
		if ( peptidePositionInProteinList.isEmpty() ) {
			//  Peptide not found in protein
			return false;  //  EARLY EXIT
		}

		PeptideOrProteinSequence_IsotopeLabelId proteinSequence_IsotopeLabelId = new PeptideOrProteinSequence_IsotopeLabelId();
		proteinSequence_IsotopeLabelId.peptideOrProteinSequence_ForProteinInference =  matchedProteinFromLimelightXMLFile.getSequence();
		proteinSequence_IsotopeLabelId.isotopeLabelId = protein_IsotopeLabelId;
		
		ProteinImporterContainer proteinImporterContainer =
				proteinSequenceToProteinImporterContainer_Map.get( proteinSequence_IsotopeLabelId );
		if ( proteinImporterContainer == null ) {
			//  getIsotopeLabelIdFor_Protein_FromLimelightXMLFile also called in here.  May want to pass in protein_IsotopeLabelId instead 
			proteinImporterContainer = ProteinImporterContainer.getInstance( matchedProteinFromLimelightXMLFile );
			proteinSequenceToProteinImporterContainer_Map.put( proteinSequence_IsotopeLabelId, proteinImporterContainer );
		}
		
		GetProteinsForPeptideResult_EntryPerProtein getProteinsForPeptideResult_EntryPerProtein = new GetProteinsForPeptideResult_EntryPerProtein();
		getProteinsForPeptideResult_EntryPerProtein.peptidePositionInProteinList = peptidePositionInProteinList;
		getProteinsForPeptideResult_EntryPerProtein.diffResidue_Map_Key_PeptidePosition = diffResidue_Map_Key_PeptidePosition;
		getProteinsForPeptideResult_EntryPerProtein.proteinResidueLetters_Map_Key_PeptidePosition = proteinResidueLetters_Map_Key_PeptidePosition;
		

		Object proteinPositionListPrev =
				proteins_EntryPerProtein.put(proteinImporterContainer, getProteinsForPeptideResult_EntryPerProtein);
		if ( proteinPositionListPrev != null ) {
			String isotopeLabelIdText = ", No protein isotope label id available since not set yet.";
			if ( proteinImporterContainer.getProteinSequenceVersionDTO() != null ) {
				isotopeLabelIdText = ", protein isotope label id: " + proteinImporterContainer.getProteinSequenceVersionDTO().getIsotopeLabelId();
			}
			String msg = "proteinImporterContainer already in map. protein sequence: "
					+ proteinImporterContainer.getProteinSequenceDTO().getSequence()
					+ isotopeLabelIdText
					+ ".  reported Peptide String: " + reportedPeptideFromLimelightXMLFile.getReportedPeptideString();
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		return true; // found peptide to protein mapping
	}
	
	/**
	 * Add matchedProteins From LimelightXML
	 * @param matchedProteinsFromLimelightXML
	 * @throws Exception 
	 */
	public void setMatchedProteinsFromLimelightXML( MatchedProteins matchedProteinsFromLimelightXML ) throws Exception {
		
		long startTimeNanoSeconds = System.nanoTime();

		if ( matchedProteinsFromLimelightXML == null ) {
			throw new IllegalArgumentException( "setMatchedProteinsFromLimelightXML(...): matchedProteinsFromLimelightXML == null" );
		}
		this.matchedProteinsFromLimelightXML = matchedProteinsFromLimelightXML;
		
		populateList_InternalHolder_ProteinsFromMatchedProteins_from_matchedProteinsFromLimelightXML();

		long endTimeNanoSeconds = System.nanoTime();
		
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTimeInTheseMethodsInMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
	}
	
	/**
	 * Create holder list with protein sequences altered for protein inference, replacing I and L with J
	 * @throws Exception 
	 */
	private void populateList_InternalHolder_ProteinsFromMatchedProteins_from_matchedProteinsFromLimelightXML() throws Exception {

		long startTimeNanoSeconds = System.nanoTime();
		
		// Create holder list with protein sequences altered for protein inference, replacing I and L with J

		List<MatchedProtein> matchedProteinList = matchedProteinsFromLimelightXML.getMatchedProtein();
		
		//  Special instance of proteinsFromMatchedProteinsList for no labels
		List<InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsList_IsotopeLabelId_None = new ArrayList<>( matchedProteinList.size() );
		proteinsFromMatchedProteinsList_KeyedOn_IsotopeLabelId.put( IsotopeLabelsConstants.ID_NONE, proteinsFromMatchedProteinsList_IsotopeLabelId_None );
		
		//  Special instance of proteinsFromMatchedProteinsMap_KeyedOnId for no labels
		Map<BigInteger, InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId_None = new HashMap<>( matchedProteinList.size() );
		proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId.put( IsotopeLabelsConstants.ID_NONE, proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId_None );
		
		
		for ( MatchedProtein matchedProteinFromLimelightXMLFile : matchedProteinList ) {
			
			String proteinSequenceForProteinInference = 
					PeptideProteinSequenceForProteinInference.getSingletonInstance().
					convert_PeptideOrProtein_SequenceFor_I_L_Equivalence_ChangeTo_J( matchedProteinFromLimelightXMLFile.getSequence() );

//			GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile_Result result =
//					GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.getInstance()
//					.getIsotopeLabelIdFor_Protein_FromLimelightXMLFile( matchedProteinFromLimelightXMLFile );
//
//			int protein_IsotopeLabelId = result.getIsotopeLabelId();

			//  Hard code peptide_IsotopeLabelId to no label
			int protein_IsotopeLabelId = IsotopeLabelsConstants.ID_NONE;
			
			InternalHolder_ProteinsFromMatchedProteins holder = new InternalHolder_ProteinsFromMatchedProteins();
			holder.matchedProteinFromLimelightXML = matchedProteinFromLimelightXMLFile;
			holder.proteinSequenceForProteinInference = proteinSequenceForProteinInference;
			holder.protein_IsotopeLabelId = protein_IsotopeLabelId;

			if ( protein_IsotopeLabelId == IsotopeLabelsConstants.ID_NONE ) {
				// Optimize for no isotope label
				
				proteinsFromMatchedProteinsList_IsotopeLabelId_None.add( holder );
				
				if ( matchedProteinFromLimelightXMLFile.getId() != null ) {
					proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId_None
					.put( matchedProteinFromLimelightXMLFile.getId(), holder );
				}
				
			} else {

				{
					List<InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsList = 
							proteinsFromMatchedProteinsList_KeyedOn_IsotopeLabelId.get( protein_IsotopeLabelId );

					if ( proteinsFromMatchedProteinsList == null ) {
						proteinsFromMatchedProteinsList = new ArrayList<>();
						proteinsFromMatchedProteinsList_KeyedOn_IsotopeLabelId.put( protein_IsotopeLabelId, proteinsFromMatchedProteinsList);
					}
					proteinsFromMatchedProteinsList.add( holder );
				}
				{
					if ( matchedProteinFromLimelightXMLFile.getId() != null ) {
						
						Map<BigInteger, InternalHolder_ProteinsFromMatchedProteins> proteinsFromMatchedProteinsMap_KeyedOnId = 
								proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId.get( protein_IsotopeLabelId );
						
						if ( proteinsFromMatchedProteinsMap_KeyedOnId == null ) {
							proteinsFromMatchedProteinsMap_KeyedOnId = new HashMap<>();
							proteinsFromMatchedProteinsMap_KeyedOnId_KeyedOn_IsotopeLabelId.put( protein_IsotopeLabelId, proteinsFromMatchedProteinsMap_KeyedOnId);
						}
						proteinsFromMatchedProteinsMap_KeyedOnId
						.put( matchedProteinFromLimelightXMLFile.getId(), holder );
					}
				}
				
			}
		}

		long endTimeNanoSeconds = System.nanoTime();
		
		long elapsedTimeNanoSeconds = endTimeNanoSeconds - startTimeNanoSeconds;
		totalElapsedTimeInTheseMethodsInMilliSeconds += ( elapsedTimeNanoSeconds / 1000000 );
	}
	
	/**
	 * Key for Maps peptideSequenceToListProteinImporterContainer_Map and proteinSequenceToProteinImporterContainer_Map
	 *
	 */
	private static class PeptideOrProteinSequence_IsotopeLabelId {
		
		private String peptideOrProteinSequence_ForProteinInference;
		private int isotopeLabelId;
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + isotopeLabelId;
			result = prime * result + ((peptideOrProteinSequence_ForProteinInference == null) ? 0 : peptideOrProteinSequence_ForProteinInference.hashCode());
			return result;
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			PeptideOrProteinSequence_IsotopeLabelId other = (PeptideOrProteinSequence_IsotopeLabelId) obj;
			if (isotopeLabelId != other.isotopeLabelId)
				return false;
			if (peptideOrProteinSequence_ForProteinInference == null) {
				if (other.peptideOrProteinSequence_ForProteinInference != null)
					return false;
			} else if (!peptideOrProteinSequence_ForProteinInference.equals(other.peptideOrProteinSequence_ForProteinInference))
				return false;
			return true;
		}
	}
	
	/**
	 * Internal holder of:
	 * 
	 *  Protein from Limelight XML 
	 *  protein sequence altered for protein inference, replacing I and L with J 
	 *
	 */
	private static class InternalHolder_ProteinsFromMatchedProteins {
		
		MatchedProtein matchedProteinFromLimelightXML;
		String proteinSequenceForProteinInference;
		int protein_IsotopeLabelId; 
	}

}
