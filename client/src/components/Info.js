import React, { useState, useEffect, useReducer } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import userReducer from '../reducer/userReducer';
import axios from '../Axios/axios.js';
import tokenReducer from '../reducer/tokenReducer';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Info() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem('authToken'));
  const [userToken, tokenDispatch] = useReducer(tokenReducer, token);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        console.log('fetchUser');
        const response = await axios.get(`/v1/movie/getMovie/${id}`);
        console.log('helllllooo :>> ', response?.data);
        // Assuming 'res.data' contains the movie data
        setValue(response);
      } catch (error) {
        console.log('Error fetching movie data:', error);
      }
    };

    if (userToken) {
      fetchMovieList();
    }
  }, [userToken,id]); // Include 'id' in the dependency array if it's a dependency

  return (
    <div className="container mt-5">
      <div className="text-center p-5">
        <h4>{'Title'}</h4>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: 'grey' }}>
              <TableRow>
                <TableCell>Territory</TableCell>
                <TableCell align="right">Cinemas</TableCell>
                <TableCell align="right">Shows</TableCell>
                <TableCell align="right">Admits</TableCell>
                <TableCell align="right">Gross</TableCell>
                <TableCell align="right">Occupancy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {value?.data?.data?.map((row) => (
                <>
                  {row.streamingAt.map((item) => {
                    return (
                      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {item.place}
                        </TableCell>
                        <TableCell align="right">{item.numberOfTheaters}</TableCell>
                        <TableCell align="right">{item.numberOfShows}</TableCell>
                        <TableCell align="right">{item.admits}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Info;
