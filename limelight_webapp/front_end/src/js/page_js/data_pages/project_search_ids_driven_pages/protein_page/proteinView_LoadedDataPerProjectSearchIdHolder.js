/**
 * proteinView_LoadedDataPerProjectSearchIdHolder.js
 * 
 * Javascript for proteinView.jsp page - Holds Loaded Data Per Project Search Id  
 * 
 */

/**
 * 
 */
export class ProteinViewPage_LoadedDataPerProjectSearchIdHolder {

	/**
	 * 
	 */
	constructor() {

		//   Per: Project Search Id

		//  Static Mods for this search
		this._staticMods = undefined; // Array [{ String residue, BigDecimal mass }] : [Static Mods]

		//   Per: Reported Peptide Id

		//  Reported Peptides for Current Cutoffs/Filters
		this._reportedPeptideIds = undefined; // Array [integer] : [ReportedPeptideIds]

		//  Peptide Id for Reported Peptide Id.   
		this._peptideIdForReportedPeptide_KeyReportedPeptideId = undefined; // Map <integer,integer> <reportedPeptideId,peptideId>

		//  Modifications Per Reported Peptide Id.   position is int, mass is double
		this._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = undefined; // Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per Reported Peptide Id.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,[Object,...] <reportedPeptideId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
		this._modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = undefined;

		//  Reported Peptide Level Filterable Annotation Data Per Reported Peptide Id
		this._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  Reported Peptide Level Descriptive Annotation Data Per Reported Peptide Id
		this._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  PSM Best Annotation Data at Reported Peptide Level Per Reported Peptide Id - Current Cutoffs/
		this._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  Protein Coverage Data Per Reported Peptide Id
		this._proteinCoverage_KeyReportedPeptideId = undefined; // Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>

		//           At Current Cutoffs/Filters

		//  Number of PSMS per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
		this._numPsmsForReportedPeptideIdMap = undefined; // Map<integer,integer> : Map<ReportedPeptideId,numPsms>

		/////////////////////////

		//   Per: Protein Sequence Version Id

		//  Protein Info per Protein Sequence Version Id
		//  Per proteinSequenceVersionId
		this._proteinInfoMapKeyProteinSequenceVersionId = undefined; // Map <integer,Object> : <ProteinSequenceVersionId,{proteinLength,annotations:[{name,description,taxonomy}]}>

		//           At Current Cutoffs/Filters - most of them since driven by which Reported Peptide Ids were selected

		//  Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
		//  Per proteinSequenceVersionId
		this._reportedPeptideIdsKeyProteinSequenceVersionId = undefined; // Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>

		//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
		this._proteinSequenceVersionIdsUnique = undefined; // Set <integer> : <proteinSequenceVersionIds>

		//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
		this._proteinSequenceVersionIdsArray = undefined; // Array [integer] : [proteinSequenceVersionIds] - unique values, sorted

		//  Dynamic Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. Can have multiple entries with same position and mass with diff reportedPeptideId
		this._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = undefined; // Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per ProteinSequenceVersion.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,Map<integer,Object> <ProteinSequenceVersionId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
		this._modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = undefined;

		//  Protein Sequence Coverage Per proteinSequenceVersionId - Each entry is an object of a Class has data per Reported Peptide Id
		this._proteinCoverage_KeyProteinSequenceVersionId = undefined; // Map <integer,[Object]> <proteinSequenceVersionId, class ProteinSequenceCoverageData_For_ProteinSequenceVersionId>
	}


	/**
	 * Clear All values - Duplicate the contructor
	 */
	clearAllData() {

		//   Per: Project Search Id

		//  Static Mods for this search
		this._staticMods = undefined; // Array [{ String residue, BigDecimal mass }] : [Static Mods]

		//   Per: Reported Peptide Id

		//  Reported Peptides for Current Cutoffs/Filters
		this._reportedPeptideIds = undefined; // Array [integer] : [ReportedPeptideIds]

		//  Peptide Id for Reported Peptide Id.   
		this._peptideIdForReportedPeptide_KeyReportedPeptideId = undefined; // Map <integer,integer> <reportedPeptideId,peptideId>

		//  Modifications Per Reported Peptide Id.   position is int, mass is double
		this._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = undefined; // Map <integer,Object> <reportedPeptideId,<{ reportedPeptideId, position, mass }>>

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per Reported Peptide Id.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,[Object,...] <reportedPeptideId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
		this._modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = undefined;


		//  Reported Peptide Level Filterable Annotation Data Per Reported Peptide Id
		this._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  Reported Peptide Level Descriptive Annotation Data Per Reported Peptide Id
		this._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  PSM Best Annotation Data at Reported Peptide Level Per Reported Peptide Id - Current Cutoffs/
		this._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = undefined; // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  Protein Coverage Data Per Reported Peptide Id
		this._proteinCoverage_KeyReportedPeptideId = undefined; // Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>

		//           At Current Cutoffs/Filters

		//  Number of PSMS per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
		this._numPsmsForReportedPeptideIdMap = undefined; // Map<integer,integer> : Map<ReportedPeptideId,numPsms>

		/////////////////////////

		//   Per: Protein Sequence Version Id

		//  Protein Info per Protein Sequence Version Id
		//  Per proteinSequenceVersionId
		this._proteinInfoMapKeyProteinSequenceVersionId = undefined; // Map <integer,Object> : <ProteinSequenceVersionId,{proteinLength,annotations:[{name,description,taxonomy}]}>

		//           At Current Cutoffs/Filters - most of them since driven by which Reported Peptide Ids were selected

		//  Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
		//  Per proteinSequenceVersionId
		this._reportedPeptideIdsKeyProteinSequenceVersionId = undefined; // Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>

		//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
		this._proteinSequenceVersionIdsUnique = undefined; // Set <integer> : <proteinSequenceVersionIds>

		//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
		this._proteinSequenceVersionIdsArray = undefined; // Array [integer] : [proteinSequenceVersionIds] - unique values, sorted

		//  Modifications Per ProteinSequenceersion Id.   position is int, mass is double
		this._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = undefined; // Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per ProteinSequenceVersion.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,Map<integer,Object> <ProteinSequenceVersionId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
		this._modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = undefined;

		//  Protein Sequence Coverage Per proteinSequenceVersionId - Each entry is an object of a Class has data per Reported Peptide Id
		this._proteinCoverage_KeyProteinSequenceVersionId = undefined; // Map <integer,[Object]> <proteinSequenceVersionId, class ProteinSequenceCoverageData_For_ProteinSequenceVersionId>
	}


	/**
	 * Clear values when user enters new cutoffs or displayed data
	 */
	clearForNewCutoffsOrDisplayedData() {

		//  These need to be recomputed so clear them

		this._reportedPeptideIds = undefined; // Array [integer] : [ReportedPeptideIds]
		this._numPsmsForReportedPeptideIdMap = undefined; // Map<integer,integer> : Map<ReportedPeptideId,numPsms>

		this._proteinSequenceVersionIdsArray = undefined; // Array [integer] : [proteinSequenceVersionIds] - unique values, sorted
		this._proteinSequenceVersionIdsKeyReportedPeptideId = undefined; // Map<integer,[integer]> : Map <ReportedPeptideId,[proteinSequenceVersionIds]>

		//  Modifications Per ProteinSequenceersion Id.   position is int, mass is double
		this._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = undefined; // Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per ProteinSequenceVersion.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,Map<integer,Object> <ProteinSequenceVersionId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
		this._modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = undefined;

		this._proteinCoverage_KeyProteinSequenceVersionId = undefined; // Map <integer,[Object]> <proteinSequenceVersionId, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
	}


	get_staticMods() {
		return this._staticMods;
	}
	set_staticMods(staticMods) {
		this._staticMods = staticMods;
	}
	

	get_reportedPeptideIds() {
		return this._reportedPeptideIds;
	}
	set_reportedPeptideIds(reportedPeptideIds) {
		this._reportedPeptideIds = reportedPeptideIds;
	}

	get_numPsmsForReportedPeptideIdMap() {
		return this._numPsmsForReportedPeptideIdMap;
	}
	set_numPsmsForReportedPeptideIdMap(numPsmsForReportedPeptideIdMap) {
		this._numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap;
	}

	get_proteinSequenceVersionIdsKeyReportedPeptideId() {
		return this._proteinSequenceVersionIdsKeyReportedPeptideId;
	}
	set_proteinSequenceVersionIdsKeyReportedPeptideId(proteinSequenceVersionIdsKeyReportedPeptideId) {
		this._proteinSequenceVersionIdsKeyReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId;
	}

	get_reportedPeptideIdsKeyProteinSequenceVersionId() {
		return this._reportedPeptideIdsKeyProteinSequenceVersionId;
	}
	set_reportedPeptideIdsKeyProteinSequenceVersionId(reportedPeptideIdsKeyProteinSequenceVersionId) {
		this._reportedPeptideIdsKeyProteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId;
	}

	get_proteinSequenceVersionIdsUnique() {
		return this._proteinSequenceVersionIdsUnique;
	}
	set_proteinSequenceVersionIdsUnique(proteinSequenceVersionIdsUnique) {
		return this._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique;
	}

	get_proteinSequenceVersionIdsArray() {
		return this._proteinSequenceVersionIdsArray;
	}
	set_proteinSequenceVersionIdsArray(proteinSequenceVersionIdsArray) {
		this._proteinSequenceVersionIdsArray = proteinSequenceVersionIdsArray;
	}

	get_proteinInfoMapKeyProteinSequenceVersionId() {
		return this._proteinInfoMapKeyProteinSequenceVersionId;
	}
	set_proteinInfoMapKeyProteinSequenceVersionId(proteinInfoMapKeyProteinSequenceVersionId) {
		this._proteinInfoMapKeyProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionId;
	}

	////////////

	//  _peptideIdForReportedPeptide_KeyReportedPeptideId

	// Map <integer,integer> <reportedPeptideId,peptideId>
	get_peptideIdForReportedPeptide_KeyReportedPeptideId() {
		return this._peptideIdForReportedPeptide_KeyReportedPeptideId;
	}
	// Map <integer,integer> <reportedPeptideId,peptideId>
	set_peptideIdForReportedPeptide_KeyReportedPeptideId(peptideIdForReportedPeptide_KeyReportedPeptideId) {
		this._peptideIdForReportedPeptide_KeyReportedPeptideId = peptideIdForReportedPeptide_KeyReportedPeptideId;
	}
	add_peptideIdForReportedPeptide_KeyReportedPeptideId( { peptideId, reportedPeptideId } ) {
		if ( ! this._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			this._peptideIdForReportedPeptide_KeyReportedPeptideId = new Map();
		}
		this._peptideIdForReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId, peptideId );
	}
	get_peptideId_For_reportedPeptideId( { reportedPeptideId } ) {
		if ( ! this._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			return undefined;
		}
		return this._peptideIdForReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
	}
	////////////

	get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() {
		return this._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}
	set_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId(dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) {
		this._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}

		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per Reported Peptide Id.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,Map<integer,Object> <reportedPeptideId,Map<position, {position, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }>>
	get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId() {
		return this._modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId;
	}
	set_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId(modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId) {
		this._modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId;
	}


	get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId(psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_proteinCoverage_KeyReportedPeptideId() {
		return this._proteinCoverage_KeyReportedPeptideId;
	}
	set_proteinCoverage_KeyReportedPeptideId(proteinCoverage_KeyReportedPeptideId) {
		this._proteinCoverage_KeyReportedPeptideId = proteinCoverage_KeyReportedPeptideId;
	}

	get_proteinCoverage_KeyProteinSequenceVersionId() {
		return this._proteinCoverage_KeyProteinSequenceVersionId;
	}
	set_proteinCoverage_KeyProteinSequenceVersionId(proteinCoverage_KeyProteinSequenceVersionId) {
		this._proteinCoverage_KeyProteinSequenceVersionId = proteinCoverage_KeyProteinSequenceVersionId;
	}

	get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_dynamicModificationsOnProtein_KeyProteinSequenceVersionId(dynamicModificationsOnProtein_KeyProteinSequenceVersionId) {
		this._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}


		//  !!!  Only populated for Multiple Search display.  Populated after loading Peptide Sequences
		//  Modifications Combined and Rounded Per ProteinSequenceVersion.   position is int, mass is double
		//             The Mass is all the Dynamic and Static Modifications for the position added together and then rounded for dipslay (rounded using modification_dynamic_static_combined_DisplayUtilities.js)
		// Map <integer,Map<integer,Object> <ProteinSequenceVersionId,[{position, mass, totalDynamicStaticMass, totalDynamicStaticMassRounded, totalDynamicStaticMassRoundedString} }]>
	get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId() {
		return this._modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId;
	}
	set_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId( modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId ) {
		this._modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId;
	}

}