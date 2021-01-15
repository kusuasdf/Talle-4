import React, { useState,useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Grid } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);





const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Listar() {
  const classes = useStyles();
  const [libros, setLibros] = useState([])

  useEffect(()=>{
    cargarLibros();
  })
  
  const cargarLibros = async () => {
    const { data } = await axios.get("http://localhost:9000/api/libro");
    setLibros(data.libroConAutor);
    console.log(libros);
  };
  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
    <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Código</StyledTableCell>
            <StyledTableCell align="center">Autor</StyledTableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {libros.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.nombre}
              </StyledTableCell>
              <StyledTableCell align="center">{row.codigo}</StyledTableCell>
              <StyledTableCell align="center">{row.autor.nombre}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> 
      </Table>
    </TableContainer>
    
  );
}