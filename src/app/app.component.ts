import { Component, OnInit, ViewChild   } from '@angular/core';
import { DataService } from '../services/serviceApi';
import { CommonModule } from '@angular/common';
import Transacao  from '../models/Transacao';
import { ModalComponent } from './modal/modal.component';





@Component({
  selector: 'app-root',
  imports: [CommonModule, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  transacoes: Transacao[] = [];
  somaEntradas: number = 0;
  somaSaidas: number = 0;
  somaTotal: number = 0;

  constructor(private dataService: DataService, ) {}

  
  ngOnInit(): void {
    this.dataService.getData().subscribe(transacoes => { 
      this.transacoes = transacoes; 
      this.somaEntradas = this.transacoes.filter(transacao => transacao.valor > 0).reduce((total, transacao) => total + transacao.valor, 0)
      this.somaSaidas = this.transacoes.filter(transacao => transacao.valor < 0).reduce((total, transacao) => total + transacao.valor, 0)
      this.somaTotal = this.somaEntradas + this.somaSaidas;
    });

   
  
  }


  
}




