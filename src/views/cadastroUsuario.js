import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    /*Validar dentro do componente, implementado no usuarioService.js
    validar(){
        const msgs = [];

        if(!this.state.nome){
            msgs.push('O campo Nome é obrigatório.');
        }

        if(!this.state.email){
            msgs.push('O campo email é obrigatório');
        }else if(!this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um Email válido.');
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.');
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem.');
        }

        return msgs;
    }
    */

    cadastrar = () => {
        /*Usado quando o validar estava implementado nesse componente la em cima.
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }
        */
       
        const { nome, email, senha, senhaRepeticao } = this.state;

        const usuario = {nome, email, senha, senhaRepeticao};

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
                this.props.history.push('/login');
            }).catch(error => {
                mensagemErro(error.response.data);
            });
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            //<div className="container">
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup Label="Nome: *" htmlFor="inputNome">
                                    <input type="text"
                                        id="inputNome"
                                        className="form-control mb-3"
                                        name="nome"
                                        onChange={e => this.setState({ nome: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup Label="Email: *" htmlFor="inputEmail">
                                    <input type="email"
                                        id="inputEmail"
                                        className="form-control mb-3"
                                        name="email"
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup Label="Senha: *" htmlFor="inputSenha">
                                    <input type="password"
                                        id="inputSenha"
                                        className="form-control mb-3"
                                        name="senha"
                                        onChange={e => this.setState({ senha: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup Label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password"
                                        id="inputRepitaSenha"
                                        className="form-control mb-3"
                                        name="senhaRepeticao"
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                    />
                                </FormGroup>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                    <i className="pi pi-save"></i>Salvar
                                </button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                    <i className="pi pi-times"></i>Cancelar
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
            //</div>
        )
    }
}

export default withRouter(CadastroUsuario);