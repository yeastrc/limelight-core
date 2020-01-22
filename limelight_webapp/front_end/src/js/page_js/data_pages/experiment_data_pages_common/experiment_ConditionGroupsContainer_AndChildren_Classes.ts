/**
 * experiment_ConditionGroupsContainer_AndChildren_Classes.ts
 * 
 * Classes for conditionGroupsContainer and it children.
 * 
 * conditionGroupsContainer is also passed to the Java Server side code and is deserialized using Java class Experiment_ConditionGroupsContainer
 * 
*/


import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';


const _VERSION = 1;  // default

class Experiment_ConditionGroupsContainer {
    
	conditionGroups : Array<Experiment_ConditionGroup>;

	version : number = _VERSION;
	conditionGroupId_MaxAssignedValue : number = undefined;
	conditionId_MaxAssignedValue : number = undefined;

	constructor({ conditionGroups, version, conditionGroupId_MaxAssignedValue, conditionId_MaxAssignedValue } : {
		version? : number;
		conditionGroupId_MaxAssignedValue? : number;
		conditionId_MaxAssignedValue? : number;
		conditionGroups : Array<Experiment_ConditionGroup>;
	}) {
		if ( conditionGroups ) {
			for ( const conditionGroup of conditionGroups ) {
				if ( ! ( conditionGroup instanceof Experiment_ConditionGroup ) ) {
					const msg = "ERROR: Experiment_ConditionGroupsContainer:constructor: conditionGroups:Entry is not instanceof Experiment_ConditionGroup";
					console.warn( msg );
					throw Error( msg );
				}
				if ( conditionGroup.id === undefined || conditionGroup.id === null ) {
					const msg = "ERROR: Experiment_ConditionGroupsContainer:constructor: if ( conditionGroup.id === undefined || conditionGroup.id === null )";
					console.warn( msg );
					throw Error( msg );
				}
			}
		}
		this.conditionGroups = conditionGroups;
		this.version = version;
		this.conditionGroupId_MaxAssignedValue = conditionGroupId_MaxAssignedValue;
		this.conditionId_MaxAssignedValue = conditionId_MaxAssignedValue;

		if ( this.version === undefined || this.version === null ) {
			this.version = _VERSION;
		}
	 }
	 
	 cloneShallow() : Experiment_ConditionGroupsContainer {

		const clone = new Experiment_ConditionGroupsContainer({ 
			conditionGroups : this.conditionGroups,
			conditionGroupId_MaxAssignedValue : this.conditionGroupId_MaxAssignedValue,
			conditionId_MaxAssignedValue : this.conditionId_MaxAssignedValue,
			version : this.version
		})
		return clone;
	 }
	
	conditionGroupId_GetNextValue() : number {
		if ( this.conditionGroupId_MaxAssignedValue === undefined || this.conditionGroupId_MaxAssignedValue === null ) {
			this.conditionGroupId_MaxAssignedValue = 0;
		} else {
			this.conditionGroupId_MaxAssignedValue++;
		}
		return this.conditionGroupId_MaxAssignedValue;
	}
	conditionId_GetNextValue() : number {
		if ( this.conditionId_MaxAssignedValue === undefined || this.conditionId_MaxAssignedValue === null ) {
			this.conditionId_MaxAssignedValue = 0;
		} else {
			this.conditionId_MaxAssignedValue++;
		}
		return this.conditionId_MaxAssignedValue;
	}
}

/**
 * Single Condition Group
 */
class Experiment_ConditionGroup {
	
	id : number;
    
	label : string;
	
	conditions : Array<Experiment_Condition>;  //  Conditions for this Group
	
    typeContinuous : boolean;
    typeDiscrete : boolean;
    typeBiologicalReplicate : boolean;
    typeTechnicalReplicate : boolean;
    typeTimePoint : boolean;
    specialConditionGroup : boolean;  //  Set if typeBiologicalReplicate, typeTechnicalReplicate, or typeTimePoint
    
	constructor({ id, label, conditions, typeContinuous, typeDiscrete, typeBiologicalReplicate, typeTechnicalReplicate, typeTimePoint, specialConditionGroup } : {

		id? : number;
    
		label? : string;
		
		conditions? : Array<Experiment_Condition>;
		
		typeContinuous? : boolean;
		typeDiscrete? : boolean;
		typeBiologicalReplicate? : boolean;
		typeTechnicalReplicate? : boolean;
		typeTimePoint? : boolean;
		specialConditionGroup? : boolean;  //  Set if typeBiologicalReplicate, typeTechnicalReplicate, or typeTimePoint
	}) {
		this.id = id;
		this.label = label;
		this.conditions = conditions;
		this.typeContinuous = typeContinuous;
		this.typeDiscrete = typeDiscrete
		this.typeBiologicalReplicate = typeBiologicalReplicate;
		this.typeTechnicalReplicate = typeTechnicalReplicate;
		this.typeTimePoint = typeTimePoint
		this.specialConditionGroup = specialConditionGroup;
	}
}

/**
 * Single Condition
 */
class Experiment_Condition {
    label : string;
	id : number;
	labelSuffixInitiallyAssigned : number;  // Added when Condition initially created
	
	constructor({ id, label, labelSuffixInitiallyAssigned } : { label : string, id? : number, labelSuffixInitiallyAssigned : number }) {
		this.id = id
		this.label = label;
		this.labelSuffixInitiallyAssigned = labelSuffixInitiallyAssigned;
	}
}

/**
 * Create Experiment_ConditionGroupsContainer and children from the server side JSON Parsed from Java class  Experiment_ConditionGroupsContainer
 */
const create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON = function( serverSideParsedJSON : any ) : Experiment_ConditionGroupsContainer {

	if ( ! variable_is_type_number_Check( serverSideParsedJSON.version ) ) {
		const msg = "serverSideParsedJSON.version is not a number: " + serverSideParsedJSON.version;
		console.warn( msg );
		throw Error( msg );
	}
	if ( 
		serverSideParsedJSON.conditionGroupId_MaxAssignedValue !== undefined 
		&& serverSideParsedJSON.conditionGroupId_MaxAssignedValue !== null 
		&& ( ! variable_is_type_number_Check( serverSideParsedJSON.conditionGroupId_MaxAssignedValue ) ) 
	) {
		const msg = "serverSideParsedJSON.conditionGroupId_MaxAssignedValue is not a number: " + serverSideParsedJSON.conditionGroupId_MaxAssignedValue;
		console.warn( msg );
		throw Error( msg );
	}
	if ( 
		serverSideParsedJSON.conditionId_MaxAssignedValue !== undefined 
		&& serverSideParsedJSON.conditionId_MaxAssignedValue !== null 
		&& ( ! variable_is_type_number_Check( serverSideParsedJSON.conditionId_MaxAssignedValue ) ) 
	) {
		const msg = "serverSideParsedJSON.conditionId_MaxAssignedValue is not a number: " + serverSideParsedJSON.conditionId_MaxAssignedValue;
		console.warn( msg );
		throw Error( msg );
	}

	const experiment_ConditionGroupsContainer = new Experiment_ConditionGroupsContainer({ conditionGroups: [] });

	experiment_ConditionGroupsContainer.version = serverSideParsedJSON.version;
	experiment_ConditionGroupsContainer.conditionGroupId_MaxAssignedValue = serverSideParsedJSON.conditionGroupId_MaxAssignedValue;
	experiment_ConditionGroupsContainer.conditionId_MaxAssignedValue = serverSideParsedJSON.conditionId_MaxAssignedValue;

	if ( serverSideParsedJSON.conditionGroups && serverSideParsedJSON.conditionGroups.length ) {

		experiment_ConditionGroupsContainer.conditionGroups = [];

		for ( const serverSideParsedJSON_conditionGroup of serverSideParsedJSON.conditionGroups ) {

			const experiment_ConditionGroup : Experiment_ConditionGroup = create_Experiment_ConditionGroup_AndChildren_From_ServerSideParsedJSON( serverSideParsedJSON_conditionGroup );
			experiment_ConditionGroupsContainer.conditionGroups.push( experiment_ConditionGroup );
		}
	}

	return experiment_ConditionGroupsContainer;
}


/**
 * Create Experiment_ConditionGroup and children from the server side JSON Parsed from Java class  Experiment_ConditionGroup
 */
const create_Experiment_ConditionGroup_AndChildren_From_ServerSideParsedJSON = function( serverSideParsedJSON_conditionGroup : any ) : Experiment_ConditionGroup {
	
	if ( ! serverSideParsedJSON_conditionGroup.label ) {
		const msg = "serverSideParsedJSON_conditionGroup.label is not populated";
		console.warn( msg );
		throw Error( msg );
	}
	if ( ! variable_is_type_number_Check( serverSideParsedJSON_conditionGroup.id ) ) {
		const msg = "serverSideParsedJSON_conditionGroup.id is not a number: " + serverSideParsedJSON_conditionGroup.id;
		console.warn( msg );
		throw Error( msg );
	}
	if ( ! serverSideParsedJSON_conditionGroup.conditions ) {
		const msg = "serverSideParsedJSON_conditionGroup.conditions is not populated";
		console.warn( msg );
		throw Error( msg );
	}

	const experiment_ConditionGroup = new Experiment_ConditionGroup({ 
		
		id : serverSideParsedJSON_conditionGroup.id,
		label  :  serverSideParsedJSON_conditionGroup.label,

		conditions : undefined,

		typeContinuous  :  serverSideParsedJSON_conditionGroup.typeContinuous,
		typeDiscrete  :  serverSideParsedJSON_conditionGroup.typeDiscrete,
		typeBiologicalReplicate  :  serverSideParsedJSON_conditionGroup.typeBiologicalReplicate,
		typeTechnicalReplicate  :  serverSideParsedJSON_conditionGroup.typeTechnicalReplicate,
		typeTimePoint  :  serverSideParsedJSON_conditionGroup.typeTimePoint,
		specialConditionGroup  :  serverSideParsedJSON_conditionGroup.specialConditionGroup,
	});

	if ( serverSideParsedJSON_conditionGroup.conditions && serverSideParsedJSON_conditionGroup.conditions.length ) {

		experiment_ConditionGroup.conditions = [];

		for ( const serverSideParsedJSON_condition of serverSideParsedJSON_conditionGroup.conditions ) {

			const experiment_Condition : Experiment_Condition = create_Experiment_Condition_From_ServerSideParsedJSON( serverSideParsedJSON_condition );
			experiment_ConditionGroup.conditions.push( experiment_Condition );
		}
	}

	return experiment_ConditionGroup;
}


/**
 * Create Experiment_Condition and children from the server side JSON Parsed from Java class  Experiment_Condition
 */
const create_Experiment_Condition_From_ServerSideParsedJSON = function( serverSideParsedJSON_condition : any ) : Experiment_Condition {
	
	if ( ! serverSideParsedJSON_condition.label ) {
		const msg = "serverSideParsedJSON_condition.label is not populated";
		console.warn( msg );
		throw Error( msg );
	}
	if ( ! variable_is_type_number_Check( serverSideParsedJSON_condition.id ) ) {
		const msg = "serverSideParsedJSON_condition.id is not a number: " + serverSideParsedJSON_condition.id;
		console.warn( msg );
		throw Error( msg );
	}
	if ( ! variable_is_type_number_Check( serverSideParsedJSON_condition.labelSuffixInitiallyAssigned ) ) {
		const msg = "serverSideParsedJSON_condition.labelSuffixInitiallyAssigned is not a number: " + serverSideParsedJSON_condition.labelSuffixInitiallyAssigned;
		console.warn( msg );
		throw Error( msg );
	}

	const experiment_Condition = new Experiment_Condition({ id : serverSideParsedJSON_condition.id, label : serverSideParsedJSON_condition.label, labelSuffixInitiallyAssigned : serverSideParsedJSON_condition.labelSuffixInitiallyAssigned });

	return experiment_Condition;
}


export { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition, create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON }



			//  contents of variable experiment_main_data_at_page_load_json is the serialized JSON representation of Java classes (Server side code):

			//    Experiment_A_Root and it's children

		   	// Experiment_A_Root


			// Experiment_ConditionGroupsContainer:

			//	Experiment_ConditionGroup:

			//   Experiment_Condition:


					