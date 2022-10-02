import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aeronave } from 'src/app/model/aeronave';
import { AeronaveService } from 'src/app/services/aeronave.service';

@Component({
  selector: 'app-create-aeronave',
  templateUrl: './create-aeronave.component.html',
  styleUrls: ['./create-aeronave.component.css']
})
export class CreateAeronaveComponent implements OnInit {

  aeronave : Aeronave = {
    nome: '',
    marca: '',
    ano: '',
    descricao: '',
    vendido: '',
    created: new Date(),
    update: ''
  }
  constructor(private router: Router, private service : AeronaveService) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.aeronave).subscribe((resposta) => {
      this.router.navigate([''])
      this.service.message('Parabéns, cadastro salvo com sucesso')
    }, err =>{
      
        console.log(err)
        if(err.error.error.match('A descrição não corresponde, a nenhuma marcas de Aeronaves')){
          this.service.message(err.error.error)
        }
       
    })
    
  }

  cancel(){
    this.router.navigate([''])
  }


}
