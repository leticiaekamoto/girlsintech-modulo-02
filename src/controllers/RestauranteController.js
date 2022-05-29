const dados = require('fs').readFileSync('informacoesRestaurantes.json', 'utf-8');
let infos = JSON.parse(dados)

class Restaurante{
    constructor({id, nome, endereco, horarioFuncionamento, tiposDeServiços, categoriaDeProdutos, localizacaoGeografica, ticketMedio, numeroDeFuncionarios, status= "fechado", mensagem, id_matriz}){
        this.id = id,
        this.nome = nome,
        this.endereco = endereco,
        this.horarioFuncionamento = horarioFuncionamento,
        this.tiposDeServiços = tiposDeServiços,
        this.categoriaDeProdutos = categoriaDeProdutos,
        this.localizacaoGeografica = localizacaoGeografica, 
        this.ticketMedio = ticketMedio,
        this.numeroDeFuncionarios = numeroDeFuncionarios,
        this.status = status,
        this.mensagem = mensagem,
        this.id_matriz = id_matriz
    }

    static buscarRestaurante(id){
        return infos.findIndex(rest =>
            rest.id == id
        )
    }
    
    static listarRestaurantes = (req, res) =>{
        res.status(200).send(infos)
    }
    
    static listarRestaurantesPorId = (req, res) =>{
        const index = this.buscarRestaurante(req.params.id)
        if(index === -1){
            res.status(404).send('Id inválido!')
        }
        res.status(200).json(infos[index])
    }

    static criarFilial = (req, res)=>{
        const dadosRecebidos = req.body
        this.validar(dadosRecebidos)
        const novoRestaurante = new Restaurante(dadosRecebidos)
        infos.push(novoRestaurante)
        res.status(201).json(infos)
    }

    static atualizarRestaurante = (req, res) =>{
        const index = this.buscarRestaurante(req.params.id)
        const restauranteParaAtualizar = infos[index]
        const dadosInformados = req.body
        if(index === -1){
            res.status(404).send('Id inválido!')
        }
        if(Object.keys(dadosInformados).length === 0){
            res.status(404).send("Não foram fornecidos dados para atualização!")
        }
        Object.keys(dadosInformados).forEach(campo =>{
            restauranteParaAtualizar[campo] = dadosInformados[campo]
        })
        res.status(200).json(restauranteParaAtualizar)
    }

    static deletarRestaurante = (req, res) =>{
        const index = this.buscarRestaurante(req.params.id)
        if(index === -1){
            res.status(404).send('Id inválido!')
        }
        infos.splice(index, 1)
        res.status(200).send('Restaurante excluído com sucesso!')

    }

    static validar(novoRestaurante){
        
        if(Object.keys(novoRestaurante).length ===0){
            throw new Error("Não foram fornecidos dados para cadastro")
        }
        if( typeof novoRestaurante.id !== "number" || novoRestaurante.id.length ===0) {
            throw new Error (`Campo id inválido`);
        }    
        if( typeof novoRestaurante.nome !== "string" || novoRestaurante.nome.length ===0) {
            throw new Error (`Campo nome inválido`);
        }   
        if( typeof novoRestaurante.endereco !== "string" || novoRestaurante.endereco.length ===0) {
            throw new Error (`Campo endereço inválido`);
        }   
        if( typeof novoRestaurante.horarioFuncionamento !== "string" || novoRestaurante.horarioFuncionamento.length ===0) {
            throw new Error (`Campo horárioFuncionamento inválido`);
        }    
        if( typeof novoRestaurante.localizacaoGeografica !== "object" || novoRestaurante.localizacaoGeografica.length ===0) {
            throw new Error (`Campo localizacaoGeografica inválido`);
        }   
        if( typeof novoRestaurante.ticketMedio !== "number" || novoRestaurante.ticketMedio.length ===0) {
            throw new Error (`Campo ticketMedio inválido`);
        }   
        if(novoRestaurante.status !== "aberto" && novoRestaurante.status !== "fechado") {
            throw new Error (`Campo status inválido`);
        } 
    }
    static controlarStatus = (req, res) =>{
        const index = this.buscarRestaurante(req.params.id)
        if(req.body.status === "aberto"){
            infos[index].status = "aberto"
            res.status(200).send("Loja aberta")
        }
        if(req.body.status === "fechado"){
            infos[index].status = "fechado"
            res.status(200).send("Loja fechada")
        }       
    }

    static listarPorStatus = (req, res) =>{
        const status = req.query.status
        let lista = []
        infos.forEach(rest =>{
            if (rest.status === status){
                lista.push(rest)
            }
        })
        res.status(200).send(lista)
    }   

    static enviarMensagem = (req, res) =>{
        const dadosMensagem = req.body
        const index = this.buscarRestaurante(req.params.id)
        infos[index].mensagem = {"data": new Date(), "messageMatriz": dadosMensagem}
        res.status(200).send(infos[index])
    }
   
}


module.exports = Restaurante