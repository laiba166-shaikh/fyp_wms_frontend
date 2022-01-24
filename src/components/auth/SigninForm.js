import React, {useState} from 'react';
import { Grid, Typography,makeStyles,TextField, Checkbox, FormControlLabel, Button} from '@material-ui/core';
import { useNavigate } from 'react-router';
import LoginImage from "../../assets/login-1.png"

const useStyles=makeStyles((theme)=>({
    root:{
        maxWidth:620,
        borderRadius:'3px',
        boxShadow: "1px .5px 2px 3px rgba(0,0,0,.2)",
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

const SigninForm = () => {
    const classes=useStyles();
    const navigate=useNavigate()

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);

    const handleShow=()=>setShowPassword(!showPassword)
    
    const handleSubmit=()=>{
        console.log(email,password)
        alert(email,password)
        navigate("/main/admin/users")
    }
    return (
       <Grid item container className={classes.root}>
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
                            value={email}
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
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword?"text":"password"}
                            fullWidth
                            inputProps={{className:classes.textField}}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} style={{marginLeft:"12px"}}>
                        <FormControlLabel  control={<Checkbox onClick={handleShow} />} style={{color:"rgba(255,255,255,0.5)"}} label="Show Password" />
                        <Button variant='contained' color="primary" className={classes.submitButton} onClick={handleSubmit}>
                                Sign in
                        </Button>
                    </Grid>
           </Grid>
           </Grid>
       </Grid>
    )
}

export default SigninForm
{/* <Grid item md={12} xs<Typography variant='h3' gutterBottom className={classes.title}>
                    Sign in
            </Typography>={12}>
            <Typography variant='h3' gutterBottom className={classes.title}>
                    Sign in
            </Typography>
           </Grid>
           <Grid container>
            <Grid item md={12} xs={12}> 
                <TextField
                    id="outlined-basic-1"
                    variant="outlined"
                    label="email"
                    placeholder="abc@gmail.com"
                    color="secondary"
                    margin='normal'
                    value={email}
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
                    color="secondary"
                    margin='normal'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword?"text":"password"}
                    fullWidth
                    inputProps={{className:classes.textField}}
                />
            </Grid>
           </Grid>
           <Grid item>
            <FormControlLabel  control={<Checkbox onClick={handleShow}/>} label="Show Password" />
           </Grid>
           <Grid item md={12} xs={12}>
               <Button fullWidth variant='contained' color="primary" className={classes.submitButton} onClick={handleSubmit}>
                   Sign in
               </Button>
           </Grid> */}