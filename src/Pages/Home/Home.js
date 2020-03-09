import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import Header from '../../Components/Header/Header';
import './Home.css';
import ApiService from '../../utils/ApiService';
import PopUp from "../../utils/PopUp";


class App extends Component {

  state = {
    autores: [
      {
        nome: 'Bruno',
        livro: 'QA Testes',
        preco: '100'
      }
    ],
  };

  removeAutor = id =>{
    const { autores } = this.state;
  
    const autoresAtualizado = autores.filter(autor =>{
      return autor.id !== id
    });
  
    ApiService.RemoveAutor(id)
      .then(res => {
          if(res.message === 'deleted') {
            this.setState({autores: [...autoresAtualizado]});
            PopUp.exibeMensagem('error', "Autor removido com sucesso");
          }
      })
      .catch(err => PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar remover o autor"))
  } 

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
              .then(res => {
                if(res.message === 'success'){
                  this.setState({ autores:[...this.state.autores, autor]});
                  PopUp.exibeMensagem('success', "Autor adicionado com sucesso");
                }
              })
              .catch(err =>PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar criar o autor"));
  }

  componentDidMount(){
    ApiService.ListaAutores()
      .then(res => {
        if(res.message === 'success'){
          this.setState({autores: [...this.state.autores, ...res.data]})
        } 
      })
      .catch(err =>PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os autores"));
  }
   
   render() {

     ApiService.ListaAutores()
         .then(res=> console.log(res.data));

    return (
      <Fragment>
         <Header/>
        <div className="container mb-10">
        <Tabela autores = { this.state.autores } removeAutor = { this.removeAutor } />
        <Form escutadorDeSubmit={this.escutadorDeSubmit}/>
        </div>
      </Fragment>
     
    );
  } 
}



export default App;

