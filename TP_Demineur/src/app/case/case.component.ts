import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit, OnChanges {

  static urlCovered : string = "img/covered.png";
  static urlEmpty : string = "img/empty.png";
  static urlMine: string = "img/mine.png";
  static urlNumber1: string = "img/number-1.png";
  static urlNumber2: string = "img/number-2.png";
  static urlNumber3: string = "img/number-3.png";
  static urlNumber4: string = "img/number-4.png";
  static urlNumber5: string = "img/number-5.png";
  static urlNumber6: string = "img/number-6.png";
  static urlNumber7: string = "img/number-7.png";
  static urlNumber8: string = "img/number-8.png";


  private urlImage : string;
  
  @Input()
  proprietes = null;

  @Output()
  notify: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  revealedIndexes = null;


  constructor() 
  {
    this.urlImage = CaseComponent.urlCovered;
  }

  ngOnInit() 
  {
  }

  ngOnChanges(changes:SimpleChanges)
  {
    console.log("Foobar");
  }

  onClick()
  {
    this.proprietes.isRevealed = !this.proprietes.isRevealed;
    this.majUrl();

    this.notify.emit(this.proprietes.indexes);
  }



  majUrl()
  {
    if(this.proprietes.isMine == false)
    {
      if(this.proprietes.isRevealed == true)
      {
        switch(this.proprietes.isNumber)
        {
          case 0:
            this.urlImage = CaseComponent.urlEmpty;
            break;

          case 1:
            this.urlImage = CaseComponent.urlNumber1;
            break;
          
          case 2:
            this.urlImage = CaseComponent.urlNumber2;
            break;

          case 3:
            this.urlImage = CaseComponent.urlNumber3;
            break;

          case 4:
            this.urlImage = CaseComponent.urlNumber4;
            break;

          case 5:
            this.urlImage = CaseComponent.urlNumber5;
            break;

          case 6:
            this.urlImage = CaseComponent.urlNumber6;
            break;

          case 7:
            this.urlImage = CaseComponent.urlNumber7;
            break;

          case 8:
            this.urlImage = CaseComponent.urlNumber8;
            break;
        } 
          
      }
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
