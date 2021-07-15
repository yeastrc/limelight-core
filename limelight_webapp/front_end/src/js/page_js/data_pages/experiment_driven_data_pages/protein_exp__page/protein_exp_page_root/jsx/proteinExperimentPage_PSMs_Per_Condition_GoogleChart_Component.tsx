/**
 * proteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component.tsx
 * 
 * React Component that holds the Google Chart
 *
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// import React from 'react'
//
// export const get_ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component = function (
//     {
//         cellMgmt_External_Data, columnWidth, columnHeightInitial,proteinExperiment__CreateProteinDataTable_ChartColumn_Class
//     } : {
//         cellMgmt_External_Data : any
//         columnWidth : number
//         columnHeightInitial : number
//         proteinExperiment__CreateProteinDataTable_ChartColumn_Class : ProteinExperiment__CreateProteinDataTable_ChartColumn_Class
//
//     }) : JSX.Element {
//
//     return (
//         <ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component
//             cellMgmt_External_Data={cellMgmt_External_Data}
//             columnWidth={columnWidth}
//             columnHeightInitial={columnHeightInitial}
//             proteinExperiment__CreateProteinDataTable_ChartColumn_Class={ proteinExperiment__CreateProteinDataTable_ChartColumn_Class }
//         />
//     )
// }
//
//
// /**
//  *
//  */
// interface ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_Props {
//
//     cellMgmt_External_Data : any
//     columnWidth : number
//     columnHeightInitial : number
//     proteinExperiment__CreateProteinDataTable_ChartColumn_Class : ProteinExperiment__CreateProteinDataTable_ChartColumn_Class
// }
//
//
// /**
//  *
//  */
// interface ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_State {
//
//     _placeholder? : any
// }
//
// /**
//  *
//  */
// class ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component extends React.Component< ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_Props, ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_State > {
//
//     private _displayTimeout: number;
//
//     private _containerDiv_ForChart :  React.RefObject<HTMLDivElement>
//
//     /**
//      *
//      */
//     constructor(props : ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_Props ) {
//         super(props);
//
//         this._containerDiv_ForChart = React.createRef();
//
//         this.state = {  };
//     }
//
//
//     /**
//      * After render()
//      */
//     componentWillUnmount() {
//
//         if ( this._displayTimeout ) {
//             window.clearTimeout( this._displayTimeout );
//         } else {
//             this.props.proteinExperiment__CreateProteinDataTable_ChartColumn_Class.domObjectInCell_RemoveContents_Callback({ domObjectInCell: this._containerDiv_ForChart.current})
//         }
//     }
//
//     /**
//      * @returns true if should update, false otherwise
//      */
//     // shouldComponentUpdate(nextProps : ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_Props, nextState : ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_State) : boolean {
//     //
//     //     // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: shouldComponentUpdate")
//     //
//     //     //  Only update if changed:
//     //     //      props: XXX
//     //     //      state: displayChart
//     //
//     //     // if ( this.props.XXX !== nextProps.XXX ) {
//     //     //     return true;
//     //     // }
//     //
//     //     // return false;  //  !!!  NEVER UPDATE
//     //
//     //     //  If Comment out prev code, uncomment this:
//     //
//     //     // return true;
//     // }
//
//     /**
//      * After render()
//      */
//     componentDidMount() {
//
//         // console.log("ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component: componentDidMount");
//
//         this._displayTimeout = window.setTimeout( () => {
//             this.props.proteinExperiment__CreateProteinDataTable_ChartColumn_Class.
//             PSMs_per_Condition_populateCellDOMObject_Initial(
//                 {
//                     cellMgmt_External_Data: this.props.cellMgmt_External_Data,
//                     domObjectInCell: this._containerDiv_ForChart.current,
//                     columnWidth : this.props.columnWidth,
//                     columnHeightInitial : this.props.columnHeightInitial
//                 });
//         }, 10 );
//     }
//
//     componentDidUpdate(prevProps: Readonly<ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_Props>, prevState: Readonly<ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component_State>, snapshot?: any) {
//
//         this.props.proteinExperiment__CreateProteinDataTable_ChartColumn_Class.domObjectInCell_RemoveContents_Callback({domObjectInCell: this._containerDiv_ForChart.current})
//         this.props.proteinExperiment__CreateProteinDataTable_ChartColumn_Class.
//         PSMs_per_Condition_populateCellDOMObject_Initial(
//             {
//                 cellMgmt_External_Data: this.props.cellMgmt_External_Data,
//                 domObjectInCell: this._containerDiv_ForChart.current,
//                 columnWidth : this.props.columnWidth,
//                 columnHeightInitial : this.props.columnHeightInitial
//             });
//     }
//
//     /**
//      *
//      */
//     render() {
//
//         // console.log("ProteinExperimentPage_PSMs_Per_Condition_GoogleChart_Component")
//
//             return (
//                 <div ref={ this._containerDiv_ForChart }></div>
//             );
//         }
//
// }
