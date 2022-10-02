import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeronave } from 'src/app/model/aeronave';
import { AeronaveService } from 'src/app/services/aeronave.service';

@Component({
  selector: 'app-delete-aeronave',
  templateUrl: './delete-aeronave.component.html',
  styleUrls: ['./delete-aeronave.component.css']
})
export class DeleteAeronaveComponent implements OnInit {

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
      this.aeronave.nome = resposta.nome
      this.aeronave.marca = resposta.marca
      this.aeronave.ano = resposta.ano
      this.aeronave.descricao = resposta.descricao
      this.aeronave.vendido = resposta.vendido
      this.aeronave.created = resposta.created
      this.aeronave.update = resposta.update
    })
  }

  delete(): void{
    this.service.delete(this.aeronave.id).subscribe((resposta) => {
      console.log(resposta)
      this.router.navigate([''])
      this.service.message("Cadastro deletado com sucesso")
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
