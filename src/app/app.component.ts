import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/serviceApi';
import { CommonModule } from '@angular/common';
import Transacao from '../models/Transacao';
import { ModalComponent } from './modal/modal.component';



@Component({
  selector: 'app-root',
  imports: [CommonModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  transacoes: Transacao[] = [];
  totalEntradas: number = 0;
  totalSaidas: number = 0
  total: number = 0;

  constructor(private transacaoService: DataService,) { }


  ngOnInit(): void {
    this.loadTransacoes();


  }

  loadTransacoes() {
    this.transacaoService.getTransacoes().subscribe(transacoes => {
      this.transacoes = transacoes;
      this.calcularTotais();
    })
  }

  calcularTotais(): void {
    this.totalEntradas = this.transacoes
      .filter(t => t.valor > 0)
      .reduceRight((acc, t) => acc + t.valor, 0);

    this.totalSaidas = this.transacoes
      .filter(t => t.valor < 0)
      .reduce((acc, t) => acc + t.valor, 0);

    this.total = this.totalEntradas + this.totalSaidas;
  }

  addNovaTransacao(transacao: Transacao) {
    this.transacaoService.addTransacao(transacao).subscribe(novaTransacao => {
      console.log("Transação adicionada:", novaTransacao);
      this.loadTransacoes();
      this.calcularTotais();
    })
  }



  deleteTransacao(id: number): void {
    this.transacaoService.deleteTransacao(id).subscribe({
      next: () => {
        console.log(`Transação com ID ${id} deletada com sucesso.`);
        this.loadTransacoes(); // Recarrega as transações após deletar
      },
      error: (error) => {
        console.error("Erro ao deletar transação:", error);
        alert("Ocorreu um erro ao deletar a transação. Tente novamente mais tarde.");
      }

    });
  }
}




