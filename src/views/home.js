import React from 'react';

//import axios from 'axios';
import UsuarioService from '../app/service/usuarioService';
//import LocalStorageService from '../app/service/localstorageService';

import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        //const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const usuarioLogado = this.context.usuarioAutenticado;
        
        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
        .then( response => {
            this.setState({ saldo: response.data});
        }).catch(error => {
            console.error(error.response);
        });
    }

    /*Metodo de busca do saldo fazendo requisição no componente
    componentDidMount(){
        const usuarioLogadoString = localStorage.getItem('_usuario_logado');
        const usuarioLogado = JSON.parse(usuarioLogadoString);
        //console.log('Usuairo logado do localStorage: ', usuarioLogado);

        axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`)
        .then( response => {
            this.setState({ saldo: response.data});
        }).catch(error => {
            console.error(error.response);
        });
    }
    */
    
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button">
                        <i className="pi pi-user"></i>  
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/cadastro-lancamentos" 
                        role="button">
                        <i className="pi pi-money-bill"></i>  
                        Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home;