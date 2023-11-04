import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { doLogin } from '../../Services/loginServices';
import axios from '../../Axios/axios.js';
import TokenContext from '../../context/TokenContext.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/v1/auth/login', formData);
      console.log('result :>> ', result?.data.tokens?.access?.token );
      tokenDispatch({ type: 'SET_TOKEN', payload: result?.data.tokens?.access?.token });
      // userDispatch({ type: 'SET_USER', payload: result.data.user });
      localStorage.setItem('authToken', JSON.stringify(result?.data.tokens?.access?.token));
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
      // setError({ message: error.response.data.message })
    }
  };

  return (
    <>
      <div className="">
        <div className="row mt-5">
          <div className=" col-md-6 offset-md-3">
            <div className="card shadow">
              <div className="row text-center p-5">
                <div className="col-12">
                  <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput id="email" type="text" label="Email" name="email" onChange={handleChange} />
                  </FormControl>
                </div>
                <div className="col-12">
                  <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      // value={password}
                      onChange={handleChange}
                      name="password"
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </div>
                <div className="col-12">
                  <Button variant="contained" onClick={handelSubmit}>
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
