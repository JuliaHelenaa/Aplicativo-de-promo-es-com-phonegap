function Dao(_nomeTabela){
    this.nomeTabela = _nomeTabela;
    try {
        if(window.localStorage){
            this.db = window.localStorage;
        }
    } catch (e) {
        console.log("ERRO");
        return undefined;
    }

    this.listar = function(){
        this.dados = JSON.parse(this.db.getItem(this.nomeTabela));
        if(this.dados == null){
            this.dados = [];
        }
        return this.dados;
    };
    
    this.inserir = function(objeto){
        if(this.dados==null){
            this.dados = [];
        }
        this.dados.push(objeto);
        this.db.setItem(this.nomeTabela, JSON.stringify(this.dados));
    };

    this.alterar = function(index, objeto){
        this.dados[index] = objeto;
        this.db.setItem(this.nomeTabela, JSON.stringify(this.dados));
    };

    this.excluir = function(index){
        this.dados.splice(index, 1);
        this.db.setItem(this.nomeTabela, JSON.stringify(this.dados));
    };
}