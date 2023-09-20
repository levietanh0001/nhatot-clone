// import { format } from 'date-fns';
import dayjs from "dayjs";


const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id' as const
  },
  {
    Header: 'First Name',
    accessor: 'first_name' as const
  },
  {
    Header: 'Last Name',
    accessor: 'last_name' as const
  },
  {
    Header: 'Email',
    accessor: 'email' as const
  },
  {
    Header: 'Date Of Birth',
    accessor: 'date_of_birth' as const,
    Cell: ({ value }) => dayjs(new Date(value)).format('dd/MM/yyyy') as any,
    // Cell: ({ value }) => format(new Date(value), 'dd/MM/yyyy') as any,
  },
  {
    Header: 'Age',
    accessor: 'age' as const
  },
  {
    Header: 'Country',
    accessor: 'country' as const
  },
  {
    Header: 'Phone',
    accessor: 'phone' as const
  },
]


export default COLUMNS;
