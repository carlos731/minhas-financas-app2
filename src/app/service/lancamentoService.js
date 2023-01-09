import ApiService from '../apiService';
import ErroValidacao from '../exception/erroValidacao';

export default class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses() {//lista com os meses para botar no array
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    obterListaTipos(){//lista com os status para botar no array
        return [
            { label: 'Selecione', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value:'RECEITA' }
        ]
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status });
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.ano){
            erros.push("Informe o Ano.");
        }

        if(!lancamento.mes){
            erros.push("Informe o Mês.");
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição.");
        }
        
        if(!lancamento.valor){
            erros.push("Informe a Valor.");
        }

        if(!lancamento.tipo){
            erros.push("Informe a Tipo.");
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    consultar(LancamentoFiltro) {
        let params = `?ano=${LancamentoFiltro.ano}`;

        if (LancamentoFiltro.mes) {
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }

        if (LancamentoFiltro.tipo) {
            params = `${params}&tipo=${LancamentoFiltro.tipo}`;
        }

        if (LancamentoFiltro.status) {
            params = `${params}&status=${LancamentoFiltro.status}`;
        }

        if (LancamentoFiltro.usuario) {
            params = `${params}&usuario=${LancamentoFiltro.usuario}`;
        }

        if(LancamentoFiltro.descricao){
            params = `${params}&descricao=${LancamentoFiltro.descricao}`;
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }
}
