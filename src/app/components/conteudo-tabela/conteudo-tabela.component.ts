import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Aeronave } from 'src/app/model/aeronave';
import { AeronaveService } from 'src/app/services/aeronave.service';

@Component({
  selector: 'app-conteudo-tabela',
  templateUrl: './conteudo-tabela.component.html',
  styleUrls: ['./conteudo-tabela.component.css']
})
export class ConteudoTabelaComponent implements OnInit {
  
  aeroVendida = 0;
  aeroNaoVendida = 0;
  countAno = 0;

  airbus= 0;
  boeing= 0;
  bombardier= 0;
  embraer= 0;

  longText = `100`;

  ELEMENT_DATA: Aeronave[] = []

  displayedColumns: string[] = ['id', 'marca', 'descricao', 'ano','vendido','acoes'];
  dataSource = new MatTableDataSource<Aeronave>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: AeronaveService) { }

  ngOnInit(): void {
    this.findall();
  }


 findall(){
  this.service.findall().subscribe(resposta => {
    this.ELEMENT_DATA = resposta
    this.dataSource = new MatTableDataSource<Aeronave>(resposta);
    this.dataSource.paginator = this.paginator;
    this.countVenda()
    this.countFabricante()
  })
 }


 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

countVenda(): void{
  for(let aeronave of this.ELEMENT_DATA){
    if(aeronave.vendido==true){
      this.aeroVendida++
    }else{
      this.aeroNaoVendida++
    }
  }
}

countFabricante(): void{
  for(let aeronave of this.ELEMENT_DATA){

    if (aeronave.marca.toLowerCase() === 'airbus'.toLowerCase()) {
         this.airbus++
      }
 
      if (aeronave.marca.toLowerCase() === 'boeing'.toLowerCase()) {
        this.boeing++
     }
 
     if (aeronave.marca.toLowerCase() === 'bombardier'.toLowerCase()) {
      this.bombardier++
   }

   if (aeronave.marca.toLowerCase() === 'embraer'.toLowerCase()) {
    this.embraer++
    }
  }
}

countDecada(calcDecada : Aeronave){
  const d = new Date();
  let ano = d.getFullYear() - calcDecada.ano;
  this.countAno = 0;
  if(ano > 10){
    this.countAno++
    return calcDecada.marca +" - "+calcDecada.ano + ":  "+this.countAno
  }
 
    return null
  }

  countSemana(dataSemana : Aeronave){
    const now = new Date(); 
    const past = new Date(dataSemana.created); 
    const diff = Math.abs(now.getTime() - past.getTime()); 
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24)-1);
    if(days < 8){
      return dataSemana.marca;
    }
      return null
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

