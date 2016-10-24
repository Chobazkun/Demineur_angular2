import { Component, OnInit } from '@angular/core';
import { CaseComponent } from '../case/case.Component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  public champMines : CaseComponent[][];

  constructor() 
  {
    this.verificationMines(10);
   }

  ngOnInit() {
  }

  range(num:number)
  {
    return Array(num);
  }


  //Vérifier le nombre de mines sur le champs
  verificationMines(num: number)
  {
    //if(CaseComponent.nbMines <10)

  }

}
