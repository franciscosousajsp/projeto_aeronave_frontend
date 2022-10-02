import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeronave } from 'src/app/model/aeronave';
import { AeronaveService } from 'src/app/services/aeronave.service';

@Component({
  selector: 'app-update-aeronave',
  templateUrl: './update-aeronave.component.html',
  styleUrls: ['./update-aeronave.component.css']
})
export class UpdateAeronaveComponent implements OnInit {

   date: Date = new Date();

  aeronave : Aeronave = {
    nome: '',
    marca: '',
    ano: '',
    descricao: '',
    vendido: false,
    created: '',
    update: ''
    
  }

  constructor(private service: AeronaveService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    
    this.aeronave.id = this.route.snapshot.paramMap.get('id')
    this.findById()
    
  }

  findById(): void{
    this.service.findById(this.aeronave.id).subscribe((resposta) => {
     
      console.log(this.aeronave.update)

      this.aeronave.nome = resposta.nome
      this.aeronave.marca = resposta.marca
      this.aeronave.ano = resposta.ano
      this.aeronave.descricao = resposta.descricao
      this.aeronave.vendido = resposta.vendido
      
    })
  }

  update():void{
    this.service.update(this.aeronave).subscribe((resposta) => {
      this.router.navigate([''])
      this.service.message("Cadastro Atualizado com sucesso")
    }, err =>{
      if(err.error.error.match('A descrição não corresponde, a nenhuma marcas de Aeronaves')){
        this.service.message(err.error.error)
      }
     
  })
  }

  cancel(){
    this.router.navigate([''])
  }

  retornaStatus(vendido: any): string{
    if(vendido == true){
      return "Vendido"
    }
      return "Não Vendido"
    }
  
    retornaCorStatus(x: any): string{
      if(x === 'Vendido'){
        return "vendido"
      }
        return "nao_vendido"
      }
  
      

}
