import { FC, memo } from 'react';
import { Paper } from '@mui/material';

import styles from './DashboardContent.module.scss';
// import BasicTable from '~/components/ui/table/BasicTable';
// import DATA from '~/data/users.data.json';
// import COLUMNS from './UserColumns';
import MUIDataGrid from '~/components/ui/datagrid/MUIDatagrid';
import IDashboardContent from './Dashboard.interface';



const DashboardContent: FC<IDashboardContent> = (props) => {

  return <div className={styles['wrapper']}>

    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#202020', minHeight: '100%', borderRadius: '12px' }}>

      {props.children}
      
      <MUIDataGrid {...props} />

      {/* <BasicTable 
        data={DATA}
        cols={COLUMNS}
        tableWrapperClassName={styles['table-wrapper']}
        globalFilterClassName={styles['global-filter']}
        tableClassName={styles['table']}
        tableHeadClassName={styles['table-head']}
        paginationClassName={styles['pagination']}
        currentPageClassName={styles['current-page']}
        goToPageClassName={styles['go-to-page']}
        pageSizeClassName={styles['page-size']}
      /> */}

    </Paper>

  </div>;
};


export default memo(DashboardContent)