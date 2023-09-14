import IMUIDatagrid from "~/components/ui/datagrid/MUIDatagrid.interface";

export default interface IDashboardContent extends IMUIDatagrid {
  children?: React.ReactNode;
};