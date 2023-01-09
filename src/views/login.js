import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

//import axios from 'axios';
import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localstorageService';

import { mensagemErro } from '../components/toastr';

import { AuthContext } from '../main/provedorAutenticacao';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }
    
    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data);
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch( erro => {
            mensagemErro(erro.response.data);
            //this.setState({ mensagemErro: erro.response.data });
        });
    }
    
    /*Método entrar() no componente
    entrar = async () => {
        try{
        const response = await axios.post('http://localhost:8080/api/usuarios/autenticar', {
             email: this.state.email,
             senha: this.state.senha
         });
         console.log('responsta: ', response);
         console.log('requisidcao encerrada');
        }catch(erro){
            console.log(erro.response);
        }
    }
    */ 

    /*metodo Entrar() com consumo no componente
    entrar = async () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
            this.props.history.push('/home');
            //console.log(response);
        }).catch( erro => {
            this.setState({mensagemErro: erro.response.data});
        });
    }
    */

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }

    render() {
        return (
            //<div className="container">
                <div className="row">
                    <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup Label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        className="form-control mb-3"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite o Email"
                                                    />
                                                </FormGroup>
                                                <FormGroup Label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password"
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        className="form-control mb-3"
                                                        id="exampleInputPassword1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Password"
                                                    />
                                                </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success">
                                                    <i className="pi pi-sign-in"></i>Entrar
                                                </button>
                                                <button onClick={this.prepareCadastrar} className="btn btn-danger">
                                                    <i className="pi pi-plus"></i>Cadastrar
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            //</div>
        )
    }
}
/*
<div className="row">
    <span>{this.state.mensagemErro}</span>
</div>
*/

Login.contextType = AuthContext;

export default withRouter( Login );