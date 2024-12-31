export default class Transacao {
  readonly id: number;
  descricao: string;
  valor:number;
  categoria: string;
  data: string;
 

  constructor(id: number, descricao: string, valor: number, categoria: string, data: string) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.categoria = categoria;
    this.data = data;
    
  }
}

