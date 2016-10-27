import { Component, OnInit } from '@angular/core';
import { CaseComponent } from '../case/case.Component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit 
{
  public tab : any[][];

  constructor() 
  {
    /*this.tab = [];

    for(var i=0; i<9; i++)
    {
        this.tab[i] = [];

        for(var j=0; j<9; j++)
          this.tab[i][j] = new CaseComponent();
    }*/

    this.tab = [
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}],
      [{isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}, {isRevealed: false, isMine: true}]
    ];

    this.verificationMines(10);
   }

  ngOnInit() 
  {
  }

  range(num:number)
  {
    return Array(num);
  }

  //Vérifier le nombre de mines sur le champs
  verificationMines(num: number)
  {
    if(CaseComponent.nbMines < num)
    {}
  }

}
