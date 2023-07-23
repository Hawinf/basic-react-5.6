import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import './pages.css'
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SearchCar = () => {
    const [carData, setCarData] = useState([]);
    const [fName, setFname] = useState('');
    const [fCategory, setFcategory] = useState('')


    useEffect(() => {
        axios
            .get('https://api-car-rental.binaracademy.org/customer/v2/car')
            .then((res) => {
                setCarData(res.data.cars)
                console.log(res.data.cars)
            })
            .catch((err) => console.log(err.message))
    },[])

    const handleChangeName = (e) => {
        // console.log('e', e.target.value)
        setFname(e.target.value)
    }
    
    const handleFilterName = (e) => {
        axios
            .get(`https://api-car-rental.binaracademy.org/customer/v2/car?name=${fName}&category=${fCategory}`)
            .then((res) => {
                setCarData(res.data.cars)
                console.log(res.data.cars)
            })
            .catch((err) => console.log(err.message))
    }

    const handleChangeCatgory = (e) => {
        setFcategory(e.target.value)
    }

    return (
        <div>
            <Navbar />
            <h1>SearchCar</h1>
            <label>Nama Mobil</label>
            <input onChange={handleChangeName} />
            <button onClick={handleFilterName}>edit</button>
            <div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
                        <Select
                        value={fCategory}
                        onChange={handleChangeCatgory}
                        autoWidth
                        label="Age"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'small'}>small</MenuItem>
                        <MenuItem value={'medium'}>medium</MenuItem>
                        <MenuItem value={'large'}>large</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {
                !!carData.length ? carData.map((item) => {
                    return (
                        <div>
                            <div className="car-card">
                                <img src={item.image} />
                            </div>
                            <h1>{item.name}</h1>
                            <p>{item.price}</p>
                            <p>Lorem ipsum</p>
                            <Link to={`/detailcar/${item.id}`}>
                                <button>Pilih Mobil</button>
                            </Link>
                        </div>
                    )
                }) : null
            }
        </div>
    )
}

export default SearchCar