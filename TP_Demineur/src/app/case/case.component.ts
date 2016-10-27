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

  private urlImage : string;
  
  @Input()
  proprietes = null;


  constructor() 
  {
    this.urlImage = CaseComponent.urlCovered;
  }

  ngOnInit() 
  {
  }

  cliqueCase()
  {
    this.proprietes.isRevealed = !this.proprietes.isRevealed;
    this.majUrl();  
  }

  majUrl()
  {
    if(this.proprietes.isMine == false)
    {
      if(this.proprietes.isRevealed == true)
        this.urlImage = CaseComponent.urlEmpty;
      else
        this.urlImage = CaseComponent.urlCovered;
    }
    else
    {
      if(this.proprietes.isRevealed == true)
        this.urlImage = CaseComponent.urlMine;
      else
        this.urlImage = CaseComponent.urlCovered;
    }
  }
}
