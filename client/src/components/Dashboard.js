import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import TokenContext from '../context/TokenContext.js';
import styled from '@mui/system/styled';
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const cards = [
  {
    img: 'image-url-1.png',
    title: 'Card 1',
  },
  {
    img: 'image-url-2.png',
    title: 'Card 2',
  },
  {
    img: 'image-url-3.png',
    title: 'Card 3',
  },
  {
    img: 'image-url-1.png',
    title: 'Card 1',
  },
  {
    img: 'image-url-2.png',
    title: 'Card 2',
  },
  {
    img: 'image-url-3.png',
    title: 'Card 3',
  },
];

function Dashboard() {
  const token = localStorage.getItem('authToken');
  const { user } = useContext(TokenContext);
  console.log('kiran', user);
  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {token ? (
          <>
            <Grid>
              <Item>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px',
                  }}
                >
                  <h3>Welcome Movie Dashboard</h3>
                  <button onClick={logout}>Logout</button>
                </div>
              </Item>
            </Grid>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={5}>
              {user?.data?.map((item, i) => {
                return (
                  <Grid xs={4} md={4} lg={4}>
                    <Item>
                      <Card>
                        <CardMedia sx={{ height: 240 }} image={item.image} />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.movieName}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <NavLink to={`/tableinfo/${item._id}`}>
                            <Button size="small">Learn More</Button>
                          </NavLink>
                        </CardActions>
                      </Card>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <ul className="flex justify-end gap-3 w-3/4 pr-6">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
