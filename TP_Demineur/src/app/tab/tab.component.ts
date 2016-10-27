import { Component, OnInit } from '@angular/core';
import { CaseComponent } from '../case/case.Component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit 
{
  private grille : any[][];
  private tailleGrille : number = 9;
  private counter = Array<number>();
  private numMines : number = 0;
  private verifNumMines : number = 5;

  constructor() 
  {
    this.initCounter(this.tailleGrille);

    this.initGrille(this.tailleGrille);

    this.verificationMines(this.verifNumMines, this.tailleGrille);

    console.log(this.numMines);
  }

  ngOnInit() 
  {
  }

  initCounter(size:number)
  {
    for(let i=0; i<size; i++)
      this.counter.push(i);
  }

  initGrille(size:number)
  {
    this.grille = [];

    for(let i=0; i<size; i++)
    {
      this.grille[i] = [];

      for(let j=0; j<size; j++)
      {
        let randomMine = (this.numMines < this.verifNumMines && Math.random() < 0.1? (true, this.numMines++):false);
        
        this.grille[i][j] = 
        {
          isRevealed: false,
          isMine: randomMine
        }
      }
    }
  }

  //Vérifier le nombre de mines sur le champ
  verificationMines(num: number, size:number)
  {
    while(this.numMines < this.verifNumMines)
    {
      for(let i=0; i<size; i++)
      {
        for(let j=0; j<size; j++)
        {
          if(this.grille[i][j].isMine == false)
            this.grille[i][j].isMine = (Math.random() < 0.1? (true, this.numMines++):false);

          if(this.numMines === this.verifNumMines)
            return;  
        }
      }
    }
  }

}
