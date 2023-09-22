import IMUIDatagrid from '@/components/datagrid/MUIDatagrid.interface';

export default interface IDashboardContent extends IMUIDatagrid {
  children?: React.ReactNode;
};