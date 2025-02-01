import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Transacao from '../../models/Transacao';
import { DataService } from '../../services/serviceApi';

@Component({
  selector: 'app-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],

})
export class ModalComponent {
  form: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      categoria: ['', Validators.required],
      data: ['', Validators.required]
    })

  }


  onSubmit() {
    if (this.form.valid) {
      const transacao: Transacao = this.form.value;
      this.dataService.addTransacao(transacao).subscribe({
        next: (novaTransacao) => {
          console.log('Transação adicionada com sucesso', novaTransacao);
        },

        error: (err) => {
          console.error('Erro ao adicionar a transação', err);

        }
      });

      this.closeModal();
    }
  }

  isOpen: boolean = false;


  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }


}






