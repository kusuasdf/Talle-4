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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Libro from './listarLibros';


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
  

export default function NuevoLibro(){
    const classes = useStyles();
    const { register, handleSubmit, errors,getValues,setValue,reset } = useForm(
      {defaultValues:{codigo:"",nombre:"",idautor:""}});
    const [autorSeleccionado, setAutorSeleccionado] = useState(0);
    const [autores,setAutores] = useState([])
    const [accion,setAccion]= useState("Registrar libro")

    useEffect(() => {
      console.log("useeffecto aaa")
      cargarAutores()
    },[]);

  const cargarAutores= async () => {
    const { data } = await axios.get("http://localhost:9000/api/autor");
    setAutores(data.data);
  }


    const ModificaAutorSeleccionado = (event) => {
      setAutorSeleccionado(event.target.value);
    };

    
    const onSubmit = data => {
        if(accion=="Registrar libro"){
          data.idautor=autorSeleccionado;
          console.log(data.autor);
          axios
          .post("http://localhost:9000/api/Libro", data)
          .then(
            (response) => {
              if (response.status == 200) {
                alert("Registro ok")
                reset();
                setAutorSeleccionado(0)
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fCod"
                  name="codigo"
                  variant="outlined"
                  required
                  fullWidth
                  id="codigo"
                  label="Codigo"
                  autoFocus
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  inputRef={register}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
              <Select
                onChange={ModificaAutorSeleccionado}
                value={autorSeleccionado}
                labelWidth={"Autor"}
                margin="dense"
                placeholder={"Horarios"}
              >
                <MenuItem selected={true} key={0} value={0}>
                  Seleccione Autor
                </MenuItem>
                {autores != null ? (
                  autores.map((item, index) => {
                   return( 
                      <MenuItem key={index} value={item._id}>
                        <em>{item.nombre}</em>
                      </MenuItem>
                  );
                  })
                ) : (
                    <MenuItem key={-1} value={0}>
                      <em>''</em>
                    </MenuItem>
                  )}
               </Select>
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
        <div>
          <Libro/>
        </div>
        
      </Container>
      
        );
};