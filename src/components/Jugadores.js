import React, { Component } from 'react'
import axios from 'axios'
import Global from './../Global'


export default class Jugadores extends Component {
 url=Global.apiFutbol;

    state={
        jugadores:[],

    }

loadJugadoresporID=()=>{
let request="api/Jugadores/JugadoresEquipos/"+this.props.idEquipo
axios.get(this.url+request).then(response=>{
            console.log("Leyendo jugadores");
            this.setState({
                jugadores:response.data
            })
        })
}

loadJugadoresporNombre=()=>{
let request="api/Jugadores/BuscarJugadores/"+this.props.nombre
axios.get(this.url+request).then(response=>{
            console.log("Leyendo jugadores");
            this.setState({
                jugadores:response.data
            })
        })
}


componentDidMount = () => {
  if (this.props.idEquipo !== undefined && this.props.idEquipo !== null && this.props.idEquipo !== 0) {
    this.loadJugadoresporID();
  }
  if (this.props.nombre && this.props.nombre.trim().length > 0) {
    this.loadJugadoresporNombre();
  }
}

componentDidUpdate=(oldProps)=>{
    if(oldProps.idEquipo !=this.props.idEquipo){
        this.loadJugadoresporID();
    }else if(oldProps.nombre != this.props.nombre){
        this.loadJugadoresporNombre();
    }
}

  render() {
    return (
      <div>
        <h1 style={{color:"red"}}>Jugadores component {this.props.idEquipo}</h1>
        <table className='table table-info'> 
                <thead> 
                <tr> 
                <th>Imagen</th> 
                <th>Nombre</th> 

                <th>Posición</th> 
                <th>Pais</th> 

                </tr> 
                </thead> 

                <tbody> 
                    {
                        this.state.jugadores.map((jugador,index)=>{
                            return(<tr key={index}>
                                <td><img style={{width:"100px", height:"100px"}} src={jugador.imagen}/></td>
                                <td>{jugador.nombre}</td>
                                <td>{jugador.posicion}</td>
                                <td>{jugador.pais}</td>
                            </tr>)
                        })
                    }
                </tbody> 

        </table>
      </div>
    )
  }
}
