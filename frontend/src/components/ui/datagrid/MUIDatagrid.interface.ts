import { GridCallbackDetails, GridRowSelectionModel } from "@mui/x-data-grid";

export default interface IMUIDatagrid {
  data: any;
  columns: any;
  rows: any;
  idField: string;
  editMode?: string;
  onRowSelectionModelChange?: ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => void) | undefined
  processRowUpdate?: ((newRow: any, oldRow: any) => any) | undefined;
  onProcessRowUpdateError?: ((error: any) => void) | undefined;
}