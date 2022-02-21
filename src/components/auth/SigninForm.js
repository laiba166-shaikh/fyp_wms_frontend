import React, {useState,useEffect} from 'react';
import { Grid, Typography,makeStyles,TextField, Checkbox, FormControlLabel, Button} from '@material-ui/core';
import { useNavigate } from 'react-router';
import LoginImage from "../../assets/login-1.png";
import {signin} from "../../redux/Auth/AuthActions";
import { connect,useSelector } from 'react-redux';
import Loader from '../Loader';

const useStyles=makeStyles((theme)=>({
    root:{
        maxWidth:620,
        borderRadius:'3px',
        boxShadow: "1px .5px 2px 3px rgba(0,0,0,.2)",
        position:"relative",
        "& .MuiTextField-root": {
            marginLeft:"6px",
            marginRight:"6px",
            width: "240px",
        },
        "& .MuiFormLabel-root":{
            color:"#fff"
        },
        '& .MuiOutlinedInput-root': {
            borderRadius:"0px",
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fff',
            },
        },
    },
    imgContainer:{
        backgroundColor:theme.palette.primary.dark
    },
    image:{
        width:"100%",
        height:"100%",
        overflow:"hidden",
        backgroundSize:"cover",
    },
    form:{
        backgroundColor:theme.palette.primary.light,
        padding: '64px 32px'
    },
    title:{
        textAlign:'center',
        color:"#fff",
        marginBottom:"8px",
    },
    textField:{
        borderRadius: '0px',
        borderColor:"#fff",
        color:"#fff",
        '&::placeholder': {
            color: 'white'
        },
        "&.Mui-focused": {
            color: "white"
        }
    },
    submitButton:{
        marginTop: 20,
        color:'#fff',
    }
}))

const SigninForm = ({signin}) => {
    const classes=useStyles();
    const navigate=useNavigate()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showError,setShowError]=useState(false)

    const {authLoading,error,user}=useSelector((state)=>({
        authLoading:state.auth.authLoading,
        error:state.auth.error,
        user:state.auth.userData
    }))

    useEffect(()=>{
        if(user?.id) {
            navigate("/main/admin/users")
        }
    },[user])

    useEffect(()=>{
        if(error) setShowError(true)
    },[error])

    const handleShow=()=>setShowPassword(!showPassword)
    const handleErrorClose = ()=>setShowError(false);

    const handleSubmit=()=>{
        signin(email,password)
        setEmail("")
        setPassword("")
    }
    return (
       <Grid item container className={classes.root}>
           {authLoading && <Loader/>}
           <Grid item md={6} xs={12} className={classes.imgContainer}>
               <img
                src={LoginImage}
                className={classes.image}
               />
           </Grid>
           <Grid item md={6} xs={12} className={classes.form}>
                <Typography variant='h4' className={classes.title}>
                        User Login
                </Typography>
                <Grid container>
                    <Grid item md={12} xs={12}> 
                        <TextField
                            id="outlined-basic-1"
                            variant="outlined"
                            label="email"
                            placeholder="username/email"
                            size="small"
                            // color="secondary"
                            margin="normal"
                            onFocus={handleErrorClose}
                            value={email}
                            autoComplete={"off"}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            inputProps={{className:classes.textField}}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="outlined-basic-2"
                            variant="outlined"
                            label="password"
                            placeholder="password"
                            size="small"
                            // color="secondary"
                            onFocus={handleErrorClose}
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword?"text":"password"}
                            fullWidth
                            inputProps={{className:classes.textField}}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} style={{marginLeft:"0px"}}>
                        <FormControlLabel  control={<Checkbox onClick={handleShow} />} style={{color:"rgba(255,255,255,0.5)"}} label="Show Password" />
                        <div style={{color:"#d32f2f"}}>{showError && error}</div>
                        <Button variant='contained' color="primary" className={classes.submitButton} onClick={handleSubmit}>
                                Sign in
                        </Button>
                    </Grid>
           </Grid>
           </Grid>
       </Grid>
    )
}
const actions = ({
    signin
})
export default connect(null,actions)(SigninForm)