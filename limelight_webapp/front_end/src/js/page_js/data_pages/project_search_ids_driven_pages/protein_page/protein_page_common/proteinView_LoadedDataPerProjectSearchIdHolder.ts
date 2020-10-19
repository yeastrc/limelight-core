/**
/**
 * proteinView_LoadedDataPerProjectSearchIdHolder.ts
 * 
 * Javascript for proteinView.jsp page - Holds Loaded Data Per Project Search Id  
 * 
 */


 //   !!!!!!!!!!!    This File needs a lot of work for FULL Conversion to Typescript

 //          All properties in the sub classes and setters and getters should be typed.

 //   Probably consider splitting this into 2 classes, which should be easier once all code that uses this has been typed.



 import { ProteinSequenceCoverageData_For_ProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinSequenceCoverageData_For_ProteinSequenceVersionId';

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

	//   Not Used get/set
	// Map <integer,integer> <reportedPeptideId,peptideId>
	// get_peptideIdForReportedPeptide_KeyReportedPeptideId() {
	// 	return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId;
	// }
	// Map <integer,integer> <reportedPeptideId,peptideId>
	// set_peptideIdForReportedPeptide_KeyReportedPeptideId(peptideIdForReportedPeptide_KeyReportedPeptideId) : void {
	// 	this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId = peptideIdForReportedPeptide_KeyReportedPeptideId;
	// }
	add_peptideIdForReportedPeptide_KeyReportedPeptideId( { peptideId, reportedPeptideId } : { peptideId : number, reportedPeptideId : number } ) {
		if ( ! this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId = new Map();
		}
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId, peptideId );
	}
	get_peptideId_For_reportedPeptideId( { reportedPeptideId } : { reportedPeptideId : number } ) : number {
		if ( ! this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId ) {
			return undefined;
		}
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._peptideIdForReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
	}
	
	////////////

	get_staticMods() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._staticMods;
	}
	set_staticMods(staticMods) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._staticMods = staticMods;
	}

	//  Reporter Ions - Unique Masses for this Search
	// _reporterIonMasses_ForSearch - Set<Reporter Ion Masses>

	get_reporterIonMasses_ForSearch() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reporterIonMasses_ForSearch;
	}
	set_reporterIonMasses_ForSearch(reporterIonMasses_ForSearch) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reporterIonMasses_ForSearch = reporterIonMasses_ForSearch;
	}

	get_ms2ScanCounts_ForSearch() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._ms2ScanCounts_ForSearch;
	}
	set_ms2ScanCounts_ForSearch(ms2ScanCounts_ForSearch) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._ms2ScanCounts_ForSearch = ms2ScanCounts_ForSearch;
	}

	get_proteinInfoMapKeyProteinSequenceVersionId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinInfoMapKeyProteinSequenceVersionId;
	}
	set_proteinInfoMapKeyProteinSequenceVersionId(proteinInfoMapKeyProteinSequenceVersionId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinInfoMapKeyProteinSequenceVersionId = proteinInfoMapKeyProteinSequenceVersionId;
	}

	get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}
	set_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId(dynamicModificationsOnReportedPeptide_KeyReportedPeptideId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId;
	}

	get_openModificationsOnReportedPeptide_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._openModificationsOnReportedPeptide_KeyReportedPeptideId;
	}
	set_openModificationsOnReportedPeptide_KeyReportedPeptideId(openModificationsOnReportedPeptide_KeyReportedPeptideId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._openModificationsOnReportedPeptide_KeyReportedPeptideId = openModificationsOnReportedPeptide_KeyReportedPeptideId;
	}

	get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}

	get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}
	set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId(reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId;
	}


	get_proteinCoverage_KeyReportedPeptideId() {
		return this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyReportedPeptideId;
	}
	set_proteinCoverage_KeyReportedPeptideId(proteinCoverage_KeyReportedPeptideId) : void {
		this._data__NOT__AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyReportedPeptideId = proteinCoverage_KeyReportedPeptideId;
	}

	/////////////

		//  For Current Cutoffs or Displayed Data

	//   In this._data_AtCurrentCutoffs_Or_DisplayData

	get_reportedPeptideIds() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds;
	}
	set_reportedPeptideIds(reportedPeptideIds) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds = reportedPeptideIds;
	}
	
	get_numPsmsForReportedPeptideIdMap() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._numPsmsForReportedPeptideIdMap;
	}
	set_numPsmsForReportedPeptideIdMap(numPsmsForReportedPeptideIdMap) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap;
	}

	get_reportedPeptideIds_HasDynamicModifications() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_HasDynamicModifications;
	}
	set_reportedPeptideIds_HasDynamicModifications(reportedPeptideIds_HasDynamicModifications) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_HasDynamicModifications = reportedPeptideIds_HasDynamicModifications;
	}

	get_reportedPeptideIds_AnyPsmHas_DynamicModifications() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_DynamicModifications;
	}
	set_reportedPeptideIds_AnyPsmHas_DynamicModifications(reportedPeptideIds_AnyPsmHas_DynamicModifications) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_DynamicModifications = reportedPeptideIds_AnyPsmHas_DynamicModifications;
	}

	get_reportedPeptideIds_AnyPsmHas_OpenModifications() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_OpenModifications;
	}
	set_reportedPeptideIds_AnyPsmHas_OpenModifications(reportedPeptideIds_AnyPsmHas_OpenModifications) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_OpenModifications = reportedPeptideIds_AnyPsmHas_OpenModifications;
	}

	get_reportedPeptideIds_AnyPsmHas_ReporterIons() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_ReporterIons;
	}
	set_reportedPeptideIds_AnyPsmHas_ReporterIons(reportedPeptideIds_AnyPsmHas_ReporterIons) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIds_AnyPsmHas_ReporterIons = reportedPeptideIds_AnyPsmHas_ReporterIons;
	}

	get_psmIdsForReportedPeptideIdMap() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmIdsForReportedPeptideIdMap;
	}
	set_psmIdsForReportedPeptideIdMap(psmIdsForReportedPeptideIdMap) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmIdsForReportedPeptideIdMap = psmIdsForReportedPeptideIdMap;
	}

	get_psmFilterableAnnotationValuesForReportedPeptideIdMap() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmFilterableAnnotationValuesForReportedPeptideIdMap
	}
	set_psmFilterableAnnotationValuesForReportedPeptideIdMap( psmFilterableAnnotationValuesForReportedPeptideIdMap ) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmFilterableAnnotationValuesForReportedPeptideIdMap = psmFilterableAnnotationValuesForReportedPeptideIdMap
	}

	///

	get_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs(psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap;
	}

	get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs(psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs;
	}

	get_psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs(psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}

	///

	get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs(psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap;
	}

	get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}
	set_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs(psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs;
	}

	get_proteinSequenceVersionIdsKeyReportedPeptideId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsKeyReportedPeptideId;
	}
	set_proteinSequenceVersionIdsKeyReportedPeptideId(proteinSequenceVersionIdsKeyReportedPeptideId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsKeyReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId;
	}

	get_reportedPeptideIdsKeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIdsKeyProteinSequenceVersionId;
	}
	set_reportedPeptideIdsKeyProteinSequenceVersionId(reportedPeptideIdsKeyProteinSequenceVersionId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._reportedPeptideIdsKeyProteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId;
	}

	get_proteinSequenceVersionIdsUnique() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsUnique;
	}
	set_proteinSequenceVersionIdsUnique(proteinSequenceVersionIdsUnique) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsUnique = proteinSequenceVersionIdsUnique;
	}

	get_proteinSequenceVersionIdsArray() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsArray;
	}
	set_proteinSequenceVersionIdsArray(proteinSequenceVersionIdsArray) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._proteinSequenceVersionIdsArray = proteinSequenceVersionIdsArray;
	}

	get_proteinCoverage_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyProteinSequenceVersionId;
	}
	set_proteinCoverage_KeyProteinSequenceVersionId(proteinCoverage_KeyProteinSequenceVersionId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._proteinCoverage_KeyProteinSequenceVersionId = proteinCoverage_KeyProteinSequenceVersionId;
	}

	get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_dynamicModificationsOnProtein_KeyProteinSequenceVersionId(dynamicModificationsOnProtein_KeyProteinSequenceVersionId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._dynamicModificationsOnProtein_KeyProteinSequenceVersionId = dynamicModificationsOnProtein_KeyProteinSequenceVersionId;
	}

	get_openModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._openModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_openModificationsOnProtein_KeyProteinSequenceVersionId(openModificationsOnProtein_KeyProteinSequenceVersionId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._openModificationsOnProtein_KeyProteinSequenceVersionId = openModificationsOnProtein_KeyProteinSequenceVersionId;
	}

	get_staticModificationsOnProtein_KeyProteinSequenceVersionId() {
		return this._data_AtCurrentCutoffs_Or_DisplayData._staticModificationsOnProtein_KeyProteinSequenceVersionId;
	}
	set_staticModificationsOnProtein_KeyProteinSequenceVersionId(staticModificationsOnProtein_KeyProteinSequenceVersionId) : void {
		this._data_AtCurrentCutoffs_Or_DisplayData._staticModificationsOnProtein_KeyProteinSequenceVersionId = staticModificationsOnProtein_KeyProteinSequenceVersionId;
	}
}

class Data__NOT__AtCurrentCutoffs_Or_DisplayData {


		//   Per: Project Search Id  

		//    on ojbect 'this._data__NOT__AtCurrentCutoffs_Or_DisplayData.'

		//  Static Mods for this search
		_staticMods : Array<{ residue: string, mass : number }>; // - Array [{ String residue, BigDecimal mass }] : [Static Mods]

		//  Reporter Ions - Unique Masses for this Search
		_reporterIonMasses_ForSearch : Set<number>; // - Set<Reporter Ion Masses>

		// 		MS2 Scan counts for all scan files in the search - As returned from Webservice
		_ms2ScanCounts_ForSearch : { searchHasScanData : boolean, ms2Count : number }; // - { boolean searchHasScanData, integer ms2Count }

		//  	Peptide Id for Reported Peptide Id.   
		_peptideIdForReportedPeptide_KeyReportedPeptideId : Map<number, number>; // - Map <integer,integer> <reportedPeptideId,peptideId>

		// 		Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
		// 					- Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass, is_N_Terminal : boolean, is_C_Terminal : boolean }]>>
		_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, position : number, mass : number, is_N_Terminal : boolean, is_C_Terminal : boolean}>>

		// 		Open Modifications Per Reported Peptide Id.   mass is double
		// 					- Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, mass }]>>
		_openModificationsOnReportedPeptide_KeyReportedPeptideId : Map<number, Array<{reportedPeptideId : number, mass : number}>>

		//  	Reported Peptide Level Filterable Annotation Data Per Reported Peptide Id
		// 					- Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId : Map<number,Map<number,{valueDouble : number, valueString : string}>>;

		//  	Reported Peptide Level Descriptive Annotation Data Per Reported Peptide Id
		// 					- Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
		_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId : Map<number,Map<number,{valueDouble: number, valueString : string}>>;

		//  	Protein Coverage Data Per Reported Peptide Id
		// 					- Map <integer,[Object]> <Reported Peptide Id, [{reportedPeptideId, proteinSequenceVersionId, proteinStartPosition, proteinEndPosition}]>
		_proteinCoverage_KeyReportedPeptideId : Map<number, Array<{ reportedPeptideId : number, proteinSequenceVersionId : number, proteinStartPosition : number, proteinEndPosition : number }>>; 

		//  	Protein Info per Protein Sequence Version Id
		//  	Per proteinSequenceVersionId
		// 				- Map <integer,Object> : <ProteinSequenceVersionId,{proteinLength,annotations:[{name,description,taxonomy}]}>
		_proteinInfoMapKeyProteinSequenceVersionId : Map<number,{ proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }>}>; 

}

class Data_AtCurrentCutoffs_Or_DisplayData {


	//  For Current Cutoffs or Displayed Data

	//        this._data_AtCurrentCutoffs_Or_DisplayData = undefined;

	//  	Reported Peptides for Current Cutoffs/Filters
	_reportedPeptideIds : Array<number>; // - Array [integer] : [ReportedPeptideIds]


	//  	Number of PSMS per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
	_numPsmsForReportedPeptideIdMap : Map<number,number>; // - Map<integer,integer> : Map<ReportedPeptideId,numPsms>

	//  	Reported Peptides for Current Cutoffs/Filters that contain Reported Peptide Level Dynamic Modifications
	_reportedPeptideIds_HasDynamicModifications : Set<number>; // - Set<integer> : Set<ReportedPeptideIds>

	//  	Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Dynamic Modifications
	_reportedPeptideIds_AnyPsmHas_DynamicModifications : Set<number>; // - Set<integer> : Set<ReportedPeptideIds>

	//  	Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Open Modifications
	_reportedPeptideIds_AnyPsmHas_OpenModifications : Set<number>; // - Set<integer> : Set<ReportedPeptideIds>

	//  	Reported Peptides for Current Cutoffs/Filters that for each Reported Peptide Id it contains at least 1 PSM that has Reporter Ions
	_reportedPeptideIds_AnyPsmHas_ReporterIons : Set<number>; // - Set<integer> : Set<ReportedPeptideIds>


	//  	PSM Ids per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
	_psmIdsForReportedPeptideIdMap : Map<number, Array<number>>; // - Map<integer, Array [ integer ] > : Map<ReportedPeptideId, [ Psm Id ] >

	//  	PSM Filterable Annotation Values per Reported Peptide for Reported Peptides for Current Cutoffs/Filters
	_psmFilterableAnnotationValuesForReportedPeptideIdMap : Map<number, Map<number,Map<number,number>>>; // Map<ReportedPeptideId, Map< Psm Id, Map< Annotation Type id, Annotation Value > > >

	//  	PSM: Open Modification Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
	// 				- Map<Reported Peptide Id, { reportedPeptideId, Map<PsmId, { psmId, Map<openModificationMass_Rounded, [{ openModificationMass : number, positions: Map<position, {...} >] >
	_psmOpenModificationMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
		Map<number, { reportedPeptideId : number, psmOpenModificationMassesPerPSM_ForPsmIdMap :
				Map<number,{ psmId : number, openModificationEntries_ForMassMap : Map<number, Array<{ openModificationMass : number, openModificationMass_Rounded : number, positions: Map<number, { position : number, isNTerminal : boolean, isCTerminal : boolean}> }>> }> }>;

	//  	PSM: Open Modification: Psm Ids per Rounded Mass for current cutoffs per Reported Peptide Id
	// 				- Map<Reported Peptide Id, { reportedPeptideId, Set<psm id has any open Mod mass>, Map<openModificationMass_Rounded, { openModificationMass_Rounded, Set<psmId> } > } >
	_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs :
		Map<number, { reportedPeptideId : number, psmIds_ContainAnyOpenModificationMass : Set<number>, openModificationMass_RoundedMap : Map<number,{ openModificationMass_Rounded : number, psmIds_Set : Set<number> }> }>;

	//  	Open Modification Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
	// 				- Map<integer, { integer, Map<integer, { integer, Set<double> } > } > : Map<Reported Peptide Id, openModificationMasses (Set) >
	_psmOpenModificationMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs :
		Map<number, { reportedPeptideId : number, openModificationMasses : Set<number> }> ;

	//  	PSM: Reporter Ion Mass Values for each PSM for current cutoffs per PSM Id per Reported Peptide Id
	// 				- Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, { reportedPeptideId, Map<PsmId, { psmId, reporterIonMasses (Set) > >
	_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :
		Map<number, { reportedPeptideId : number, psmReporterIonMassesPerPSM_ForPsmIdMap : Map<number,{ psmId : number, reporterIonMasses : Set<number> }> }>;

	//  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
	// 				- Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >
	_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs : 
		Map<number, { reportedPeptideId : number, reporterIonMasses : Set<number> }> ;


	//  	Reported Peptide Ids per Protein Sequence Version Id for Current Cutoffs/Filters
	//  	Per proteinSequenceVersionId
	_reportedPeptideIdsKeyProteinSequenceVersionId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ProteinSequenceVersionId,[ReportedPeptideIds]>

	//           At Current Cutoffs/Filters - most of them since driven by which Reported Peptide Ids were selected

	//  	Protein Sequence Version Ids for Current Cutoffs/Filters - in Set Unique
	_proteinSequenceVersionIdsUnique : Set<number>; // - Set <integer> : <proteinSequenceVersionIds>

	//  Protein Sequence Version Ids for Current Cutoffs/Filters - in Array, sorted
	_proteinSequenceVersionIdsArray : Array<number>; // - Array [integer] : [proteinSequenceVersionIds] - unique values, sorted

	_proteinSequenceVersionIdsKeyReportedPeptideId : Map<number, Array<number>>; // - Map<integer,[integer]> : Map <ReportedPeptideId,[proteinSequenceVersionIds]>

	//  Dynamic/Variable Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. Can have multiple entries with same position and mass with diff reportedPeptideId
	_dynamicModificationsOnProtein_KeyProteinSequenceVersionId: Map<number, Array<{ mass : number, position : number, reportedPeptideId : number }>>; // - Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, position, mass }>>

	//  Open Modifications Per ProteinSequenceVersion Id.   mass is double. Can have multiple entries with same mass with diff reportedPeptideId
	_openModificationsOnProtein_KeyProteinSequenceVersionId: Map<number, Array<{ mass : number, reportedPeptideId : number }>>; // - Map <integer,Object> <proteinSequenceVersionId,<{ reportedPeptideId, mass }>>

	//  Static Modifications Per ProteinSequenceVersion Id.   position is int, mass is double. 
	// 		- Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), massesSet: Set< mass (number) > } >>
	_staticModificationsOnProtein_KeyProteinSequenceVersionId : Map<number, Map<number, { residue : string, massesSet : Set<number> }>>;

	//  Protein Sequence Coverage Per proteinSequenceVersionId - Each entry is an object of a Class has data per Reported Peptide Id
	_proteinCoverage_KeyProteinSequenceVersionId : Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId>; // - Map <integer,[Object]> <proteinSequenceVersionId, class ProteinSequenceCoverageData_For_ProteinSequenceVersionId>


}

