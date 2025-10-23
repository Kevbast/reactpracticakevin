import React, { Component } from 'react'
import axios from 'axios'
import Global from './../Global'
import Jugadores from './Jugadores';

export default class BuscarJugadores extends Component {
    url=Global.apiFutbol;
    selectEquipo=React.createRef(); 
    cajaNombre=React.createRef(); 

    state={
        equipos:[],
        idEquipo:0,
        nombre:""
    }

    loadEquipos=()=>{
        let request ="api/equipos"
        axios.get(this.url+request).then(response=>{
            console.log("Leyendo equipos");
            this.setState({
                equipos:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadEquipos();
    }

    buscarJugadoresPorId=(event)=>{
        event.preventDefault();
        // Obtenemos el valor del curso seleccionado desde la referencia
        let idEquipo = this.selectEquipo.current.value;
        console.log(idEquipo)
        this.setState({
            idEquipo:idEquipo,
            nombre:""
        })
    }

    buscarJugadoresPorNombre=(event)=>{
        event.preventDefault();
        // Obtenemos el valor del curso seleccionado desde la referencia
        let nombre = this.cajaNombre.current.value;
        console.log(nombre)
        this.setState({
            nombre:nombre,
            idEquipo: 0//DARSE CUENTA DEL PROBLEMA DEL STATE
        })
    }
    

  render() {
    return (
      <div>
        <h1 style={{color:"blue"}}>Buscador jugadores</h1>
        <form >
            <label>Nombre del jugador: </label>
            <input type='text' ref={this.cajaNombre}/>
            <button onClick={this.buscarJugadoresPorNombre}>Buscar equipo</button>
            <br></br>
            <label>Equipos: </label>
            <select ref={this.selectEquipo}>
            {// Renderizamos dinámicamente las opciones del select con los cursos
                this.state.equipos.map((equipo,index)=>{
                    return(<option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>)
                })
            }
            </select>
            <button onClick={this.buscarJugadoresPorId}>Buscar equipo</button>
        </form>
        {
            this.state.idEquipo != 0 &&
            <Jugadores idEquipo={this.state.idEquipo} />
        }
        {
            this.state.nombre.length !=0 &&
            <Jugadores nombre={this.state.nombre} />
        }

      </div>

    )
  }
}
