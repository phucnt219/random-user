import React from 'react';
import {
  selectUsers,
  selectPageNumber,
  changePageNumber,
  selectTotalPage,
  sortByFullName, sortByUserName
} from "./features/user/userSlice";
import {useAppDispatch, useAppSelector} from "./app/hooks";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Pagination, Paper, TableSortLabel} from "@mui/material";

function App() {
  const users = useAppSelector(selectUsers);
  const pageNumber = useAppSelector(selectPageNumber);
  const totalPage = useAppSelector(selectTotalPage);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{
      height: '100vh',
      background: "#F0F8FF",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <TableContainer component={Paper} sx={{maxWidth: 900}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel onClick={() => dispatch(sortByFullName())}>
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel onClick={() => dispatch(sortByUserName())}>
                  User Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Thumbnail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user =>
                <TableRow
                  key={user.login.username}
                >
                  <TableCell>
                    {user.name.first} {user.name.last}
                  </TableCell>
                  <TableCell>
                    {user.login.username}
                  </TableCell>
                  <TableCell>
                    <img src={user.picture.thumbnail}/>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>

      </TableContainer>
      <Pagination
        sx={{pt: 4}}
        count={totalPage}
        page={pageNumber}
        onChange={(event, pageNumber) => dispatch(changePageNumber(pageNumber)) }
        />
    </Box>
  );
}

export default App;
