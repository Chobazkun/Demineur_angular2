import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  private urlCovered : string = "img/covered.png";
  private urlEmpty : string = "img/empty.png";
  private urlMine: string = "img/mine.png";
  static nbMines : number = 0;

  public urlImage : string;
  public value : boolean = false;
  public mine : boolean = false;

  constructor() 
  {
    this.placerMine();

    this.urlImage = this.urlCovered;
  }

  ngOnInit() 
  {
  }

  cliqueCase()
  {
    this.value = !this.value;
    this.majUrl();  
  }

  majUrl()
  {
    if(this.mine == false)
    {
      if(this.value == true)
        this.urlImage = this.urlEmpty;
      else
        this.urlImage = this.urlCovered;
    }
    else
    {
      if(this.value == true)
        this.urlImage = this.urlMine;
      else
        this.urlImage = this.urlCovered;
    }
  }

  //Ajouter condition sur le nombre de mines à poser
  placerMine()
  {
    if(Math.random() < 0.1)
    {
      this.mine = true;
      CaseComponent.nbMines++;
    }
  }
  

}
