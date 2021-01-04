import React, { useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MaterialDatatable from "material-datatable";
import imagen from './external-content.duckduckgo.com.png';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    
    },
    delete : {
      backgroundColor:"red"
    }
  
  }));

export default function NuevoUsuario(){
    const classes = useStyles();

    const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
      {defaultValues:{mail:"",pass:""}});

    const [accion,setAccion]= useState("Registrarse")
    const onSubmit = data => {

        if(accion=="Registrarse"){
          axios
          .post("http://localhost:9000/api/usuario", data)
          .then(
            (response) => {
              if (response.status == 200) {
                alert("Registro ok")
                //cargarAutor();
                reset();
              }
              else{
                  alert("algo salio mal1");
              }
            },
            (error) => {
                alert("algo salio mal2", error);
            }
          )
          .catch((error) => {
            // Swal.fire(
            //   "Error",
            //   "No cuenta con los permisos suficientes para realizar esta acción",
            //   "error"
            // );
            console.log(error);
          });
        };
       
    
      }

    return(
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
          </Typography>
          <img width='15%'  src={imagen}/>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fmail"
                  name="mail"
                  variant="outlined"
                  required
                  fullWidth
                  id="mail"
                  label="Mail"
                  autoFocus
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="pass"
                  label="Contraseña"
                  name="pass"
                  inputRef={register}
                />
              </Grid>
              
  
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {accion}
            </Button>
           
            
    
          
          </form>
  
  
        </div>
  
      </Container>
        );
};