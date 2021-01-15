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
      {defaultValues:{libro:"",idpersona:"",fecha:""}});
    const [libroSeleccionado, setlibroSeleccionado] = useState(0);
    const [libro,setLibro] = useState([])
    const [persona,setPersona] = useState([])
    const [personaSeleccionada, setpersonaSeleccionada] = useState(0);
    const [accion,setAccion]= useState("Registrar Prestamo")

    useEffect(() => {
      console.log("useeffecto aaa")
      cargarLibro()
      cargarPersona()
    },[]);

  const cargarLibro= async () => {
    const { data } = await axios.get("http://localhost:9000/api/libro");
    setLibro(data.libroConAutor);
  }
  const cargarPersona= async () => {
    const { data } = await axios.get("http://localhost:9000/api/personas");
    setPersona(data.persona);
  }


    const ModificalibroSeleccionado = (event) => {
      setlibroSeleccionado(event.target.value);
    };

    const ModificapersonaSeleccionada = (event) => {
        setpersonaSeleccionada(event.target.value);
      };

    
    const onSubmit = data => {
        if(accion=="Registrar Prestamo"){
          data.libro=libroSeleccionado;
          data.idpersona=personaSeleccionada;
          data.fecha= new Date().toJSON().slice(0,10).replace(/-/g,'/');
          console.log(data.libro);
          axios
          .post("http://localhost:9000/api/prestamo", data)
          .then(
            (response) => {
              if (response.status == 200) {
                alert("Registro ok")
                reset();
                setlibroSeleccionado(0)
                setpersonaSeleccionada(0)
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
              <Grid item xs={12} sm={6}>
              <Select
                onChange={ModificalibroSeleccionado}
                value={libroSeleccionado}
                labelWidth={"libro"}
                margin="dense"
                placeholder={"Horarios"}
              >
                <MenuItem selected={true} key={0} value={0}>
                  Seleccione Libro
                </MenuItem>
                {libro != null ? (
                  libro.map((item, index) => {
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
              <Grid item xs={12} sm={6}>
              <Select
                onChange={ModificapersonaSeleccionada}
                value={personaSeleccionada}
                labelWidth={"persona"}
                margin="dense"
                
              >
                <MenuItem selected={true} key={0} value={0}>
                  Seleccione Persona
                </MenuItem>
                {persona != null ? (
                 persona .map((item, index) => {
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
        
      </Container>
      
        );
};