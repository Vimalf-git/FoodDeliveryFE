import React, { useContext, useEffect, useState } from 'react'
import './EditMenu.css'
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Formik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ApiService from '../../Common/ApiService';
import { cardConData } from '../../Context/CardContext';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
const EditMenu = () => {
const [initialValues,setInitialvalue]=useState({})
const [postimageUpload, setPostImageUpload] = useState({});
const navigate=useNavigate();
const { email,getData } = useContext(cardConData)
let params=useParams()

    const obj = {
        category: initialValues.category,
        foodName: initialValues.foodName,
        foodDesc: initialValues.foodDesc,
        price: initialValues.price,
        quantity: initialValues.quantity
    }
    const submitData = async (value) => {
        try {
            let formData = new FormData();
            formData.append('id',params.id)
            formData.append('email', email);
            formData.append('foodName', value.foodName);
            formData.append('foodDesc', value.foodDesc);
            formData.append('price', value.price);
            formData.append('quantity', value.quantity);
            // formData.append('veg', value.veg);
            formData.append('category', value.category)
            formData.append('file', postimageUpload);

            const res = await ApiService.put('/updatedata', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            if (res.status == 200) {
                getData()
                navigate('/mymenulist')
                toast.success('food added')
            } else {
                toast.error('failed..!')
            }
        } catch (error) {

        }
    }
    const getAdminEditData=async(id)=>{
        try {
           let res=await ApiService.get(`/editData/${id}`)

           setInitialvalue(res.data.editData)
        } catch (error) {
            
        }
    }
    useEffect(()=>{getAdminEditData(params.id)},[])
    const scheme = Yup.object().shape({
        // ProductCode: Yup.string().required("please enter valid productCode"),
        price: Yup.string().required("please enter valid price").test((value) => value >= 0),
        quantity: Yup.string().required("please enter valid quantity").test((value) => value >= 0),
    })
    return (
        <div className='addFood'>
            <div className='addFood-l'>
                <div className='addfoodCon' onClick={() => document.querySelector(".imgUpload").click()}>
                    <input className='imgUpload'
                        onChange={(e) => { setPostImageUpload(e.target.files[0]) }}
                        accept='.jpeg, .png, .jpg' type='file' hidden />
                    {/* <IoMdImages className='faImg' /> */}
                    <AddPhotoAlternateIcon className='imgIconaddfood' />
                    <img src='' />
                </div>
                <div>
                    <Button variant='outlined'>Change</Button>
                </div>
            </div >
            <div className='addFood-r'>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(value) => {
                        submitData(value)
                    }}

                validationSchema={scheme}
                >{({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                    <  form onSubmit={handleSubmit} className='addproForm' >
                        <div className='addproForm-left'>

                            <FormControl required sx={{ m: 1, width: '30ch' }}
                            error={errors.category && touched.category}
                            >
                                <InputLabel id="demo-simple-select-required-label"
                                error={errors.category && touched.category}
                                >Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    value={values.category}
                                    name='category'
                                    label="Category"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                error={errors.category && touched.category}
                                >
                                    <MenuItem value={values.category}>
                                        {values.category}
                                    </MenuItem>
                                    <MenuItem value="SouthIndia">South India</MenuItem>
                                    <MenuItem value="NorthIndia">North India</MenuItem>
                                    <MenuItem value="Chicken">Chicken</MenuItem>
                                    <MenuItem value="Mutton">Mutton</MenuItem>
                                    <MenuItem value="Panner">Panner</MenuItem>
                                    <MenuItem value="mushroom">mushroom</MenuItem>
                                    {/* {
                                        categories.map((e) => {
                                            return <MenuItem value={e}>
                                                {e}
                                            </MenuItem>
                                        })
                                    } */}
                                </Select>
                                {/* {errors.category && touched.category ?
                                    <FormHelperText>{errors.category}</FormHelperText>
                                    : ""} */}
                            </FormControl>
                            <TextField sx={{ m: 1, width: '30ch' }}
                                required id="outlined-basic" label="" variant="outlined"
                                value={values.foodName} name='foodName' onChange={handleChange}
                                onBlur={handleBlur}
                            error={errors.foodName && touched.foodName}
                            helperText={errors.foodName && touched.foodName ? errors.foodName : ""}
                            />
                            <TextField sx={{ m: 1, width: '30ch' }}
                                required id="outlined-basic" label="" variant="outlined"
                                value={values.foodDesc} name='foodDesc' onChange={handleChange}
                                onBlur={handleBlur}
                            error={errors.foodDesc && touched.foodDesc}
                            helperText={errors.foodDesc && touched.foodDesc ? errors.foodDesc : ""}
                            />
                        </div>
                        <div className='addproForm-right'>
                            <TextField sx={{ m: 1, width: '30ch' }}
                                required id="outlined-basic" label="" variant="outlined"
                                value={values.price} name='price' onChange={handleChange}
                                onBlur={handleBlur}
                             error={errors.price && touched.price}
                            helperText={errors.price && touched.price ? errors.price : ""}
                            />

                            <TextField sx={{ m: 1, width: '30ch' }}
                                required id="outlined-basic" label="" variant="outlined"
                                value={values.quantity} name='quantity' onChange={handleChange}
                                onBlur={handleBlur}
                            error={errors.quantity && touched.quantity}
                            helperText={errors.quantity && touched.quantity ? errors.quantity : ""}
                            />
                        </div>
                        <FormControlLabel control={<Checkbox value={true} name='veg' onChange={handleChange} />} label="non-veg" />
                        <div className='addproForm-left'>
                            <Button sx={{ m: 1, display: 'flex', gap: '1rem', bgcolor: "#2a2185" }}
                                variant='contained' color='primary' type='submit'  >
                                {/* <AddShoppingCartIcon /> */}
                                <span >Add</span>
                            </Button>
                        </div>
                    </ form>
                )}
                </Formik>
            </div>
        </div >
    )
}

export default EditMenu