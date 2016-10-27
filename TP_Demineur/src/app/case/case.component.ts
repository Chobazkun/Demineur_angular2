import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  static urlCovered : string = "img/covered.png";
  static urlEmpty : string = "img/empty.png";
  static urlMine: string = "img/mine.png";
  static nbMines : number = 0;

  private urlImage : string;
  
  @Input()
  public isRevealed : boolean = false;
  
  @Input()
  public isMine : boolean = false;


  constructor() 
  {
    this.placerMine();

    this.urlImage = CaseComponent.urlCovered;
  }

  ngOnInit() 
  {
  }

  cliqueCase()
  {
    this.isRevealed = !this.isRevealed;
    this.majUrl();  
  }

  majUrl()
  {
    if(this.isMine == false)
    {
      if(this.isRevealed == true)
        this.urlImage = CaseComponent.urlEmpty;
      else
        this.urlImage = CaseComponent.urlCovered;
    }
    else
    {
      if(this.isRevealed == true)
        this.urlImage = CaseComponent.urlMine;
      else
        this.urlImage = CaseComponent.urlCovered;
    }
  }

  placerMine()
  {
    if( CaseComponent.nbMines < 10 && Math.random() < 0.1)
    {
      this.isMine = true;
      CaseComponent.nbMines++;
    }
  }

}
