/**
 * proteinView_LoadedDataPerProjectSearchIdHolder.ts
 * 
 * Javascript for proteinView.jsp page - Holds Loaded Data Per Project Search Id  
 * 
 */


 //   !!!!!!!!!!!    This File needs a lot of work for FULL Conversion to Typescript

 //          All properties in the sub classes and setters and getters should be typed.

 //   Probably consider splitting this into 2 classes, which should be easier once all code that uses this has been typed.



 

 //  Sub classes used are defined below the main class

/**
 * 
 */
export class ProteinViewPage_LoadedDataPerProjectSearchIdHolder {

	//  Properties and methods are default public.

	//  Private properties and methods are accessible from other plain Javascript code and browser tools.  
	//  No effort is made to hide them.
	//     private is a compile time enforced only.

	private _data__NOT__AtCurrentCutoffs_Or_DisplayData : Data__NOT__AtCurrentCutoffs_Or_DisplayData;
	private _data_AtCurrentCutoffs_Or_DisplayData : Data_AtCurrentCutoffs_Or_DisplayData;

	/**
	 * 
	 */
	constructor() {

		//  For NOT ( Current Cutoffs or Displayed Data )

		this._data__NOT__AtCurrentCutoffs_Or_DisplayData = new Data__NOT__AtCurrentCutoffs_Or_DisplayData();

		//  For Current Cutoffs or Displayed Data

		this._data_AtCurrentCutoffs_Or_DisplayData = new Data_AtCurrentCutoffs_Or_DisplayData();
	}


	/**
	 * Clear All values - Duplicate the contructor
	 */
	clearAllData() {

		//   Per: Project Search Id

		this._data__NOT__AtCurrentCutoffs_Or_DisplayData = new Data__NOT__AtCurrentCutoffs_Or_DisplayData();

		//  For Current Cutoffs or Displayed Data

		this._data_AtCurrentCutoffs_Or_DisplayData = new Data_AtCurrentCutoffs_Or_DisplayData();
	}


	/**
	 * Clear values when user enters new cutoffs or displayed data
	 */
	clearForNewCutoffsOrDisplayedData() {

		//  These need to be recomputed so clear them

		this._data_AtCurrentCutoffs_Or_DisplayData = new Data_AtCurrentCutoffs_Or_DisplayData();
	}

	/////////////

	//   In this._data__NOT__AtCurrentCutoffs_Or_DisplayData

	////////////

	//  _peptideIdForReportedPeptide_KeyReportedPeptideId

	// Map <integer,integer> <reportedPeptideId,peptideId>
	get_peptideIdForReportedPeptide_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId;
	}
	// Map <integer,integer> <reportedPeptideId,peptideId>
	set_peptideIdForReportedPeptide_KeyReportedPeptideId(peptideIdForReportedPeptide_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId = peptideIdForReportedPeptide_KeyReportedPeptideId;
	}
	add_peptideIdForReportedPeptide_KeyReportedPeptideId( { peptideId, reportedPeptideId } ) {
		if ( ! this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId = new Map();
		}
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId, peptideId );
	}
	get_peptideId_For_reportedPeptideId( { reportedPeptideId } ) {
		if ( ! this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			return undefined;
		}
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
	}
	
	////////////

	get_staticMods() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._staticMods;
	}
	set_staticMods(staticMods) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._staticMods = staticMods;
	}

	//  Reporter Ions - Unique Masses for this Search
	// _reporterIonMasses_ForSearch - Set<Reporter Ion Masses>

	get_reporterIonMasses_ForSearch() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reporterIonMasses_ForSearch;
	}
	set_reporterIonMasses_ForSearch(reporterIonMasses_ForSearch) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reporterIonMasses_ForSearch = reporterIonMasses_ForSearch;
	}

	get_ms2ScanCounts_ForSearch() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._ms2ScanCounts_ForSearch;
	}
	set_ms2ScanCounts_ForSearch(ms2ScanCounts_ForSearch) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._ms2ScanCounts_ForSearch = ms2ScanCounts_ForSearch;
	}

	get_proteinInfoMapKeyProteinSequenceVersionId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinInfoMapKeyProteinSequenceVersionId;
	}
	set_proteinInfoMapKeyProteinSequenceVersionId(proteinInfoMapKeyProteinSequenceVersionId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinInfoMapKeyProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionId;
	}

	get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}
	set_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId(dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}

	get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId(psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_proteinCoverage_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyReportedPeptideId;
	}
	set_proteinCoverage_KeyReportedPeptideId(proteinCoverage_KeyReportedPeptideId) {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyReportedPeptideId = proteinCoverage_KeyReportedPeptideId;
	}

	/////////////

		//  For Current Cutoffs or Displayed Data

	//   In this._data_AtCurrentCutoffs_Or_DisplayData

	get_reportedPeptideIds() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds;
	}
	set_reportedPeptideIds(reportedPeptideIds) {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds = reportedPeptideIds;
	}
	
	get_numPsmsForReportedPeptideIdMap() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._numPsmsForReportedPeptideIdMap;
	}
	set_numPsmsForReportedPeptideIdMap(numPsmsForReportedPeptideIdMap) {
		this._data_AtCurrentCutoffs_Or_DisplayData._numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap;
	}

	get_reportedPeptideIds_HasDynamicModifications() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_HasDynamicModifications;
	}
	set_reportedPeptideIds_HasDynamicModifications(reportedPeptideIds_HasDynamicModifications) {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_HasDynamicModifications = reportedPeptideIds_HasDynamicModifications;
	}

	get_reportedPeptideIds_AnyPsmHas_DynamicModifications() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_DynamicModifications;
	}
	set_reportedPeptideIds_AnyPsmHas_DynamicModifications(reportedPeptideIds_AnyPsmHas_DynamicModifications) {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_DynamicModifications = reportedPeptideIds_AnyPsmHas_DynamicModifications;
	}

	get_reportedPeptideIds_AnyPsmHas_ReporterIons() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_ReporterIons;
	}
	set_reportedPeptideIds_AnyPsmHas_ReporterIons(reportedPeptideIds_AnyPsmHas_ReporterIons) {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_ReporterIons = reportedPeptideIds_AnyPsmHas_ReporterIons;
	}

	get_psmIdsForReportedPeptideIdMap() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmIdsForReportedPeptideIdMap;
	}
	set_psmIdsForReportedPeptideIdMap(psmIdsForReportedPeptideIdMap) {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmIdsForReportedPeptideIdMap = psmIdsForReportedPeptideIdMap;
	}

	get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs(psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap) {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap;
	}

	get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs(psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs) {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}

	get_proteinSequenceVersionIdsKeyReportedPeptideId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsKeyReportedPeptideId;
	}
	set_proteinSequenceVersionIdsKeyReportedPeptideId(proteinSequenceVersionIdsKeyReportedPeptideId) {
		this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsKeyReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId;
	}

	get_reportedPeptideIdsKeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIdsKeyProteinSequenceVersionId;
	}
	set_reportedPeptideIdsKeyProteinSequenceVersionId(reportedPeptideIdsKeyProteinSequenceVersionId) {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIdsKeyProteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId;
	}

	get_proteinSequenceVersionIdsUnique() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsUnique;
	}
	set_proteinSequenceVersionIdsUnique(proteinSequenceVersionIdsUnique) {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique;
	}

	get_proteinSequenceVersionIdsArray() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsArray;
	}
	set_proteinSequenceVersionIdsArray(proteinSequenceVersionIdsArray) {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsArray = proteinSequenceVersionIdsArray;
	}

	get_proteinCoverage_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyProteinSequenceVersionId;
	}
	set_proteinCoverage_KeyProteinSequenceVersionId(proteinCoverage_KeyProteinSequenceVersionId) {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyProteinSequenceVersionId = proteinCoverage_KeyProteinSequenceVersionId;
	}

	get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_dynamicModificationsOnProtein_KeyProteinSequenceVersionId(dynamicModificationsOnProtein_KeyProteinSequenceVersionId) {
		return this._data_AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}

	get_staticModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._staticModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_staticModificationsOnProtein_KeyProteinSequenceVersionId(staticModificationsOnProtein_KeyProteinSequenceVersionId) {
		return this._data_AtCurrentCutoffs_Or_DisplayData._staticModificationsOnProtein_KeyProteinSequenceVersionId = staticModificationsOnProtein_KeyProteinSequenceVersionId;
	}
}


class Data__NOT__AtCurrentCutoffs_Or_DisplayData {


		//   Per: Project Search Id  

		//    on ojbect 'this._data__NOT__AtCurrentCutoffs_Or_DisplayData.'

		//  Static Mods for this search
		_staticMods; // - Array [{ String residue, BigDecimal mass }] : [Static Mods]

		//  Reporter Ions - Unique Masses for this Search
		_reporterIonMasses_ForSearch; // - Set<Reporter Ion Masses>

		// 		MS2 Scan counts for all scan files in the search - As returned from Webservice
		_ms2ScanCounts_ForSearch; // - { boolean searchHasScanData, integer ms2Count ) {

		//  	Peptide Id for Reported Peptide Id.   
		_peptideIdForReportedPeptide_KeyReportedPeptideId; // - Map <integer,integer> <reportedPeptideId,peptideId>

		// 		Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
		_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId // - Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>

		//  	Reported Peptide Level Filterable Annotation Data Per Reported Peptide Id
		_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId; // - Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  	Reported Peptide Level Descriptive Annotation Data Per Reported Peptide Id
		_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId; // - Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  	PSM Best Annotation Data at Reported Peptide Level Per Reported Peptide Id - Current Cutoffs/
		_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId; // - Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>

		//  	Protein Coverage Data Per Reported Peptide Id
		_proteinCoverage_KeyReportedPeptideId; // - Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>

		//  	Protein Info per Protein Sequence Version Id
		//  	Per proteinSequenceVersionId
		_proteinInfoMapKeyProteinSequenceVersionId; // - Map <integer,Object> : <ProteinSequenceVersionId,{proteinLength,annotations:[{name,description,taxonomy}]}>

}

class Data_AtCurrentCutoffs_Or_DisplayData {


	//  For Current Cutoffs or Displayed Data

	//        this._data_AtCurrentCutoffs_Or_DisplayData = undefined;

	//  	Reported Peptides for Current Cutoffs/Filters
	_reportedPeptideIds; // - Array [integer] : [ReportedPeptideIds]


	//  	Number of PSMS per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
	_numPsmsForReportedPeptideIdMap; // - Map<integer,integer> : Map<ReportedPeptideId,numPsms>

	//  	Reported Peptides for Current Cutoffs/Filters that contain Reported Peptide Level Dynamic Modifications
	_reportedPeptideIds_HasDynamicModifications; // - Set<integer> : Set<ReportedPeptideIds>

	//  	Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Dynamic Modifications
	_reportedPeptideIds_AnyPsmHas_DynamicModifications; // - Set<integer> : Set<ReportedPeptideIds>

	//  	Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Reporter Ions
	_reportedPeptideIds_AnyPsmHas_ReporterIons; // - Set<integer> : Set<ReportedPeptideIds>


	//  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
	_psmIdsForReportedPeptideIdMap; // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >

	//  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
	_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs; // - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, { reportedPeptideId, Map<PsmId, { psmId, reporterIonMasses (Set) > >

	//  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
	_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs; // - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >


	//  	Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
	//  	Per proteinSequenceVersionId
	_reportedPeptideIdsKeyProteinSequenceVersionId; // - Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>

	//           At Current Cutoffs/Filters - most of them since driven by which Reported Peptide Ids were selected

	//  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
	_proteinSequenceVersionIdsUnique; // - Set <integer> : <proteinSequenceVersionIds>

	//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
	_proteinSequenceVersionIdsArray; // - Array [integer] : [proteinSequenceVersionIds] - unique values, sorted

	_proteinSequenceVersionIdsKeyReportedPeptideId; // - Map<integer,[integer]> : Map <ReportedPeptideId,[proteinSequenceVersionIds]>

	//  Dynamic/Variable Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. Can have multiple entries with same position and mass with diff reportedPeptideId
	_dynamicModificationsOnProtein_KeyProteinSequenceVersionId; // - Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>

	//  Static Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. 
	_staticModificationsOnProtein_KeyProteinSequenceVersionId; // - Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>

	//  Protein Sequence Coverage Per proteinSequenceVersionId - Each entry is an object of a Class has data per Reported Peptide Id
	_proteinCoverage_KeyProteinSequenceVersionId; // - Map <integer,[Object]> <proteinSequenceVersionId, class ProteinSequenceCoverageData_For_ProteinSequenceVersionId>


}

