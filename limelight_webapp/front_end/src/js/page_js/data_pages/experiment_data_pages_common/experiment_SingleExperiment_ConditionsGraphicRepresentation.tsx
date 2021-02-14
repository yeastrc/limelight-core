/**
 * experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx
 * 
 * Display a Graphical Representation of the Conditions for the Experiment
 * 
 * 
 */


 //  Glossary:

 //   Condition Cell:  a cell that contains a condition label.  
 //                     These will be on the top and on the left and the combination shows the user what each main cell is composed of for conditions

 //   Main Cell:  The main block of cells bounded on the top and left by condition cells.
 //                     These cells contain the main data the user is interested in.
 //                         One item these cells contain is the searches (projectSearchIds) that is associated with the set of conditions for that cell.

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes condition groups or conditions in the experiment builder, the data in for the main cells ('conditionGroupsDataContainer') is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



import React, {CSSProperties} from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip } from 'page_js/common_all_pages/tooltip_LimelightLocal_ReactBased';

import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';

import { ExperimentConditions_GraphicRepresentation_MainCell_Identifier, ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers';

import { ExperimentConditions_GraphicRepresentation_SelectedCells } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections';


// const tableStyle_Default = { borderCollapse : "collapse", borderSpacing: "0px", padding: "0px", width: "100%" }; // borderCollapse : "collapse", 

// const tableStyleRootTable_Default = { borderCollapse : "collapse", borderSpacing: "0px", padding: "0px" }; // borderCollapse : "collapse", 

// const standardBorderWidth = "2px";
// const noBorderWidth = "0px";

// const conditionLabelMaxWidth = "200px";


//  Class in this file TableCell is a single <td> in the table but not in the first row. 

//  Other classes at bottom for managing the tooltips

/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params {
    conditionIdPath : Array<number>
}

/**
 * 
 */
export type ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = ( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) => void


/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler_Params {
    event : React.MouseEvent<HTMLElement, MouseEvent>
    condition_Id : number
    conditionGroup_Id : number
    entryCell_onMouseLeaveHandler : ({ event } : { event : React.MouseEvent<HTMLElement, MouseEvent> }) => void
}

/**
 * 
 */
export type ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler = ( params : ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler_Params ) => void



/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_MainCellClickHandler_Params {
    event : React.MouseEvent<HTMLElement, MouseEvent>
    mainCellIdentifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier
    entryCell_onMouseLeaveHandler : ({ event } : { event : React.MouseEvent<HTMLElement, MouseEvent> }) => void
}

/**
 * 
 */
export type ExperimentConditions_GraphicRepresentation_MainCellClickHandler = ( params : ExperimentConditions_GraphicRepresentation_MainCellClickHandler_Params ) => void


/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell {

    conditionLabelCell? : boolean
    mainDataCell? : boolean
    label : string 
    styleOverrides : React.CSSProperties
    tableRowIndex? : number
    rowSpan? : number
    conditionId? : number 
    conditionIdPath? : Array<number>
    condition? : Experiment_Condition
    conditionGroup? : Experiment_ConditionGroup 
    conditionGroupIndex? : number // index in conditionGroup array so have relative position within condition groups
    experimentConditions_GraphicRepresentation_ConditionCell_Identifier : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier
}

/**
 * 
 */
export class ExperimentConditions_GraphicRepresentation_PropsData {

    displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>>

    experiment_ConditionGroupsContainer : Experiment_ConditionGroupsContainer

    constructor({ displayTableCells, experiment_ConditionGroupsContainer } : {

        displayTableCells : Array<Array<ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell>>

        experiment_ConditionGroupsContainer : Experiment_ConditionGroupsContainer

    }) {
        this.displayTableCells = displayTableCells;
        this.experiment_ConditionGroupsContainer = experiment_ConditionGroupsContainer;
    }
}

/////////////////////////////////////////////////////////////////////////////

/**
 * 
 */
export interface Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props {

    data : ExperimentConditions_GraphicRepresentation_PropsData;
    selectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    manage_SelectedCells_ConditionCell_Selection_UserClick_Updates? : boolean
    conditionCellClickHandler? : ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler
    mainCellClickHandler? : ExperimentConditions_GraphicRepresentation_MainCellClickHandler
    mainCell_getHoverContents?: any
}

interface Experiment_SingleExperiment_ConditionsGraphicRepresentation_State {

    placeholder: any
}

/**
 * 
 */
export class Experiment_SingleExperiment_ConditionsGraphicRepresentation extends React.Component< Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props, Experiment_SingleExperiment_ConditionsGraphicRepresentation_State > {

    private _mainCellTooltipDisplayManager : MainCellTooltipDisplayManager;

    private  _clearSelectionClickHandler_BindThis = this._clearSelectionClickHandler.bind(this);

    /**
     * 
     */
    constructor(props : Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props) {
        super(props);

        this._mainCellTooltipDisplayManager = new MainCellTooltipDisplayManager();

        // this.state = { };
        // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: constructor()");
    }

    // componentDidMount() {
    //     // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: componentDidMount()");
    // }

    // componentWillUnmount() {
    //     // console.log("class Experiment_SingleExperiment_ConditionsGraphicRepresentation: componentWillUnmount()");
    // }

    private _clearSelectionClickHandler( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            this.props.selectedCells.clear_All_ConditionSelection_Entries();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */
    render () {

        const data = this.props.data;

        const displayTableCells = data.displayTableCells;
        const experiment_ConditionGroupsContainer = data.experiment_ConditionGroupsContainer;

        if ( ( ! displayTableCells ) || displayTableCells.length === 0 ) {
            return null;
        }

        const rowsDisplay = [];

        {
            // const conditionGroups = experiment_ConditionGroupsContainer.conditionGroups
            // const conditionGroups_Length = conditionGroups.length;

            const leftSide_AnyConditionsSelected_ForConditionGroupIndex = []; // Index is conditionGroupIndex

            const leftSide_CurrentConditionSelected_ForConditionGroupIndex = []; // Index is conditionGroupIndex

            let counter_Row = 0;
            for ( const row of displayTableCells ) {

                const cellsDisplay = [];
                {
                    let counter_Cell = 0;
                    for ( const cell of row ) {

    
                        const cellDisplay = (
                            <TableCell key={ counter_Cell }
                                cell={ cell }
                                experiment_SingleExperiment_ConditionsGraphicRepresentation_Props={ this.props }
                                mainCellTooltipDisplayManager={ this._mainCellTooltipDisplayManager }
                            />
                        );
                        cellsDisplay.push( cellDisplay );
                        counter_Cell++;
                    }
                }

                const rowDisplay = (
                    <tr key={ counter_Row }>
                        { cellsDisplay }
                    </tr>
                );
                rowsDisplay.push( rowDisplay );
                counter_Row++;
            }
       
        }

        let clearSelectionLinkClickHandler = undefined;

        if ( this.props.manage_SelectedCells_ConditionCell_Selection_UserClick_Updates ) {

            clearSelectionLinkClickHandler = this._clearSelectionClickHandler_BindThis;
        }

        return (
            <div className=" experiment-display-container ">
                <table className=" root-table ">
                    <tbody>
                        { rowsDisplay }
                    </tbody>
                </table>
                { ( clearSelectionLinkClickHandler ? (

                    <div >
                        <span className=" fake-link " onClick={ clearSelectionLinkClickHandler }>Clear selection</span>
                    </div>
                ) : undefined )}
            </div>
        );
    }
}

//////////////////

interface TableCell_Props {

    cell : ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell
    experiment_SingleExperiment_ConditionsGraphicRepresentation_Props : Experiment_SingleExperiment_ConditionsGraphicRepresentation_Props
    mainCellTooltipDisplayManager: any
}

interface TableCell_State {

    _placeholder: any
}

/**
 * a single <td> in the table but not in the first row. 
 */
class TableCell extends React.Component< TableCell_Props, TableCell_State > {

    private _cellClickHandler_BindThis = this._cellClickHandler.bind(this);
    private _cell_onMouseEnterHandler_BindThis = this._cell_onMouseEnterHandler.bind(this);
    private _cell_onMouseLeaveHandler_BindThis = this._cell_onMouseLeaveHandler.bind(this);

    private paddingTop_Set: boolean
    private readonly td_Ref: React.RefObject<HTMLTableCellElement>
    
    
    /**
     * a single <td> in the table but not in the first row. 
     */
    constructor( props : TableCell_Props ) {
        super(props);

        this.paddingTop_Set = undefined;
        this.td_Ref = React.createRef();

        // this.state = { };
        // console.log("class TableCell: constructor()");
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //  Return new state (like return from setState(callback)) or null

    //     // return { setIn_getDerivedStateFromProps : true };
    //     return null;
    // }


    componentDidMount() {
        // console.log("class TableCell: componentDidMount()");
        if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
            this.paddingTop_Set = true;
            const node = this.td_Ref.current;
            window.setTimeout( () => {
                //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                //    (First row is labels of first Condition Group)
                //  It's weird but it works.
                node.style.paddingTop = "1px"; // A hack to change the DOM this way.
            }, 100 );
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var z = 0;
    // }

    // getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. 
    // It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. 
    // Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

    // If your component implements the getSnapshotBeforeUpdate(prevProps, prevState) lifecycle (which is rare), 
    // the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate(). 
    // Otherwise this parameter will be undefined.

    componentDidUpdate(prevProps: TableCell_Props, prevState: TableCell_State, snapshot: any) {

        // console.log("class TableCell: componentDidUpdate()");
        if ( ! this.paddingTop_Set ) {
            if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
                this.paddingTop_Set = true;
                const node = this.td_Ref.current;
                window.setTimeout( () => {
                    //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                    //    (First row is labels of first Condition Group)
                    //  It's weird but it works.
                    node.style.paddingTop = "1px"; // A hack to change the DOM this way.
                }, 100 );
            }
        } else {
            if ( this.props.cell.rowSpan > 1 && this.props.cell.tableRowIndex === 1 ) {
                var empty = true;
            } else {
                if ( this.paddingTop_Set ) {
                    this.paddingTop_Set = false;
                    const node = this.td_Ref.current;
                    //  Clear paddingTop since should no longer be set
                    window.setTimeout( () => {
                        //  When add this inside a setTimeout, then Google Chrome properly aligns the top border of the cells in the second row.
                        //    (First row is labels of first Condition Group)
                        //  It's weird but it works.
                        node.style.paddingTop = "0px"; // A hack to change the DOM this way.
                    }, 100 );
                }
            }
        }
    }


    // componentWillUnmount() {
    //     // console.log("class TableCell: componentWillUnmount()");
    // }

    _cellClickHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            // event.preventDefault();
            // event.stopPropagation(); //

            if ( this.props.cell.conditionLabelCell ) {

                let entryCell_onMouseLeaveHandler = undefined;

                //  Update this when add Mouse Tooltip to Condition Label Cell

                // if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props. ) {
                //     entryCell_onMouseLeaveHandler = this._cell_onMouseLeaveHandler_BindThis;
                // }

                if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler ) {
                    const conditionGroup = this.props.cell.conditionGroup;
                    const conditionGroup_Id = conditionGroup.id;
                    const condition = this.props.cell.condition;
                    const condition_Id = condition.id;
                    this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler({ event, conditionGroup_Id,  condition_Id, entryCell_onMouseLeaveHandler });
                }

                if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.manage_SelectedCells_ConditionCell_Selection_UserClick_Updates ) {
                    //  Select/Deselect Condition Cells Here

                    //  Different rules/code for condition labels at top vs on the left

                    if ( this.props.cell.conditionGroupIndex === 0 ) {

                        // condition labels at top / First Condition Group

                        const condition = this.props.cell.condition;
                        const condition_Id = condition.id;

                        if ( event.ctrlKey || event.metaKey ) {
                            //  CTRL key or Meta key (Command on Mac) so Toggle
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.
                            get_selected_ConditionCells_First_ConditionGroup().toggle_ConditionCell_Entry( condition_Id );
                        } else {
                            //  Clear all then add clicked
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.clear_All_ConditionSelection_Entries();
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.
                            get_selected_ConditionCells_First_ConditionGroup().add_ConditionCell_Entry( condition_Id );
                        }
                    } else {

                        // condition labels on left / Second and After Condition Groups

                        if ( event.ctrlKey || event.metaKey ) {
                            //  CTRL key or Meta key (Command on Mac) so Toggle
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.
                            get_selected_ConditionCells_OtherThanFirst_ConditionGroup().toggle_ConditionCell_Entry( this.props.cell.experimentConditions_GraphicRepresentation_ConditionCell_Identifier );
                        } else {
                            //  Clear all then add clicked
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.clear_All_ConditionSelection_Entries();
                            this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.
                            get_selected_ConditionCells_OtherThanFirst_ConditionGroup().add_ConditionCell_Entry( this.props.cell.experimentConditions_GraphicRepresentation_ConditionCell_Identifier );
                        }
                    }
                }
            }

            if ( this.props.cell.mainDataCell ) {

                if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {

                    // console.warn( "Ignoring value for this.props.mainCellClickHandler")

                    let entryCell_onMouseLeaveHandler = undefined;

                    if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents ) {
                        entryCell_onMouseLeaveHandler = this._cell_onMouseLeaveHandler_BindThis;
                    }

                    const conditionIdPath = this.props.cell.conditionIdPath;
                    if ( ! conditionIdPath ) {
                        const msg = "No value for cell.conditionIdPath:  In if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {"
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const conditionIdPath_Set = new Set( conditionIdPath );

                    const experimentConditions_GraphicRepresentation_MainCell_Identifier = (
                        new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set : conditionIdPath_Set })
                    );
                    this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler({
                        event,
                        mainCellIdentifier : experimentConditions_GraphicRepresentation_MainCell_Identifier,
                        entryCell_onMouseLeaveHandler
                    });
                }
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    _cell_onMouseEnterHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) { 

        const conditionIdPath = this.props.cell.conditionIdPath;

        const hoverContents = this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents({ conditionIdPath });

        const tooltipContents = hoverContents.hoverContent;
        
        this.props.mainCellTooltipDisplayManager.mainCellMouseEnter({ event, tooltipContents });
    }

    _cell_onMouseLeaveHandler( event : React.MouseEvent<HTMLElement, MouseEvent> ) { 
        // console.log("TableCell: onMouseLeave: entryCell_onMouseLeaveHandler");

        this.props.mainCellTooltipDisplayManager.mainCellMouseLeave({ event });
    }

    /////////////////////////////////////////////
    /////////////////////////////////////////////

    /**
     * 
     */
    render() {

        let entryCell_ClickHandler = undefined;
        let entryCell_onMouseEnterHandler = undefined;
        let entryCell_onMouseLeaveHandler = undefined;

        if ( this.props.cell.conditionLabelCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.conditionCellClickHandler ||
                this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.manage_SelectedCells_ConditionCell_Selection_UserClick_Updates ) {

                entryCell_ClickHandler = this._cellClickHandler_BindThis;
            }
        }

        if ( this.props.cell.mainDataCell ) {

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCell_getHoverContents ) {

                entryCell_onMouseEnterHandler = this._cell_onMouseEnterHandler_BindThis;
                entryCell_onMouseLeaveHandler = this._cell_onMouseLeaveHandler_BindThis
            }

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.mainCellClickHandler ) {

                entryCell_ClickHandler = this._cellClickHandler_BindThis;
            }
        }
        
        let classNames_Clickable = "";
        if ( entryCell_ClickHandler ) {

            classNames_Clickable = " clickable "
        }
        
        let classNames_ConditionLabelCell = "";
        let classNames_ConditionLabelCell_Selected = "";

        let classNames_MainDataCell = "";
        let classNames_MainDataCell_Selected = "";

        

        if ( this.props.cell.conditionLabelCell ) {
            
            classNames_ConditionLabelCell = " condition-label-cell ";

            //  Determine if current cell is a selected cell.  If selected cell, variable 'found' is true and CSS class name is added

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells ) {
                
                //  Different rules/code for condition labels at top vs on the left

                if ( this.props.cell.conditionGroupIndex === 0 ) {

                    // condition labels at top

                    const condition = this.props.cell.condition;
                    const condition_Id = condition.id;

                    if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.get_selected_ConditionCells_First_ConditionGroup().contains_ConditionCell_Entry( condition_Id ) ) {

                        classNames_ConditionLabelCell_Selected = " selected ";
                    }

                } else {

                    // condition labels on left

                    if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.get_selected_ConditionCells_OtherThanFirst_ConditionGroup().
                        contains_ConditionCell_Entry( this.props.cell.experimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) {

                        classNames_ConditionLabelCell_Selected = " selected ";
                    }
                }
            }
        }

        if ( this.props.cell.mainDataCell ) {

            classNames_MainDataCell = " main-condition-cell ";

            //  Determine if current cell is a selected cell.  If selected cell, variable 'found' is true and CSS class name is added

            if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells ) {

                const conditionIdPath_AsSet = new Set( this.props.cell.conditionIdPath );
                const selected_MainCell_Entry_ForLookup = new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set : conditionIdPath_AsSet });

                const found = this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.contains_MainCell_Entry( selected_MainCell_Entry_ForLookup );
                if ( found ) {
                    classNames_MainDataCell_Selected = " selected-directly ";
                }

                if ( ! found ) {

                    //  Main Cell NOT Selected Directly

                    let mainCellSelected = false;

                    if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells ) {

                        //  Check if Main Cell is selected from Selected Condition Label Cells

                        const conditionIdPath = this.props.cell.conditionIdPath;
                        const cell_ConditionIds_Set = new Set( conditionIdPath );
                        const mainCell_Identifier: ExperimentConditions_GraphicRepresentation_MainCell_Identifier = new ExperimentConditions_GraphicRepresentation_MainCell_Identifier({ cell_ConditionIds_Set });

                        if ( this.props.experiment_SingleExperiment_ConditionsGraphicRepresentation_Props.selectedCells.mainCell_Selected_FromConditionLabelSelections_ContainsEntry( mainCell_Identifier ) ) {
                            mainCellSelected = true;
                        }

                    }

                    if ( mainCellSelected ) {
                        classNames_MainDataCell_Selected = " selected-indirectly ";
                    }
                }
            } 
        } 

        const className = " cell " + classNames_Clickable + classNames_ConditionLabelCell + classNames_ConditionLabelCell_Selected + classNames_MainDataCell + classNames_MainDataCell_Selected;
        
        let style = getDefaultCellStyle();

        if ( this.props.cell.mainDataCell ) {
            style.textAlign = "center";
        }
        if ( this.props.cell.styleOverrides ) {
            style = Object.assign( style, this.props.cell.styleOverrides ); // overlay with properties from cell.styleOverrides
        }
            
        return (
            <td ref={ this.td_Ref }
                onClick={ entryCell_ClickHandler }
                onMouseEnter={ entryCell_onMouseEnterHandler }
                onMouseLeave={ entryCell_onMouseLeaveHandler }
                className={ className }
                style={ style }
                rowSpan={ this.props.cell.rowSpan }
                data-component="TableCell" >
                <div className=" cell-contents-container ">
                    { this.props.cell.label }
                </div>
            </td>
        );
    }
}


/**
 * Object with default cell style
 */
const getDefaultCellStyle = function() : CSSProperties {
    
    return {
        borderTopWidth : 0, 
        borderBottomWidth : 0, 
        borderLeftWidth : 0, 
        borderRightWidth : 0,
        textAlign : undefined
    };
}


/**
 * Class to manage tooltip for Main Cell
 */
class MainCellTooltipDisplayManager {

    private _tooltip_CurrentTooltip : Tooltip_Limelight_Created_Tooltip

	/**
	 * Called when onMouseEnter of main cell
	 */
	mainCellMouseEnter(
	    {
            event, tooltipContents
	    }: {
	        event : React.MouseEvent<HTMLElement, MouseEvent>
            tooltipContents: any
        }) {

        const mouseEnter_target_DOM_Element = event.target as any;
        
        if ( this._tooltip_CurrentTooltip ) {

            //  Already have tooltip so remove it

            this._tooltip_CurrentTooltip.removeTooltip();

            this._tooltip_CurrentTooltip = undefined;
        }

        const tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element : mouseEnter_target_DOM_Element, tooltipContents });

        this._tooltip_CurrentTooltip = tooltip_Limelight_Created_Tooltip;
	}

	/**
	 * Called when onMouseLeave of main cell
	 */
	mainCellMouseLeave({ event }: { event: any }) {

        // console.log("mainCellMouseLeave(...)");

        if ( ! this._tooltip_CurrentTooltip ) {

            //  No <div> to hold tooltip exists so exit

            return; // EARLY EXIT
        }

        //  Hack hack to leave tooltip shown after number of mouse leave events
        // if ( this._leaveCount >= 2 ) {
        //     return;
        // }

        // if ( ! this._leaveCount ) {
        //     this._leaveCount = 0;
        // }
        // this._leaveCount++;

        this._tooltip_CurrentTooltip.removeTooltip();

        this._tooltip_CurrentTooltip = undefined;
	}

}
