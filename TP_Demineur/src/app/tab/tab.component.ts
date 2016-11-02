import { Component, OnInit, Input } from '@angular/core';
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
  private numMines : number = 10;
  private revealedIndexes : any;


  constructor() 
  {
    this.initCounter(this.tailleGrille);

    this.initGrille(this.tailleGrille);

    this.initMines(this.numMines);

    this.initNumbers();
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
        this.grille[i][j] = 
        {
          isRevealed: false,
          isMine: false,
          isNumber: 0,
          indexes : 
          {
            i : i,
            j : j
          }
        }
      }
    }
  }

  initMines(numMines:number)
  {
    for(let i=0; i<numMines; i++)
    {
      let j = this.getRandomIndex();
      let k = this.getRandomIndex();

      do
      {
        if(this.grille[j][k].isMine != true)
        {
          this.grille[j][k].isMine = true;
          break;
        }
        
        j = this.getRandomIndex();
        k = this.getRandomIndex();
      }while(true);
      
    }
  }

  initNumbers()
  {
    for(let i=0; i<this.tailleGrille; i++)
    {
      for(let j=0; j<this.tailleGrille; j++)
      {
        if(this.grille[i][j].isMine)
        {
          for(let k=this.minIndex(i); k<=this.maxIndex(i); k++)
            for(let g=this.minIndex(j); g<=this.maxIndex(j); g++)
                this.grille[k][g].isNumber += 1;
        }
      }
    }
  }

  onNotify(indexes:any)
  {
    console.log("CLICKED:"+indexes.i+ " "+indexes.j);

    this.revealedIndexes = [];
    
    this.revealNeighbours(indexes, 0);

   
  }

  getNeighbours(indexes:any)
  {
    let neighbours:any[] = [];
    let k = 0;

    for(let i=this.minIndex(indexes.i); i<=this.maxIndex(indexes.i); i++)
      for(let j=this.minIndex(indexes.j); j<=this.maxIndex(indexes.j); j++)
        {
          neighbours[k++] = 
          {
            i : i,
            j : j
          }
        }

    return neighbours;
  }

  testNeighbours(neighbours:any[])
  {
    for(let n of neighbours)
    {
      if(this.grille[n.i][n.j].isMine === true || this.grille[n.i][n.j].isNumber !== 0 )
        return false;
    }

    return true;
  }

  manageNeighbours(indexes:any, sizeRevealedIndexes:number)
  {
    //this.revealNeighbours(indexes, sizeRevealedIndexes);

    

    for(let n of neighbours)
      this.revealNeighbours(n, sizeRevealedIndexes, true);
    
  }

  revealNeighbours(indexes:any, sizeRevealedIndexes:number, testNeighbours:boolean)
  {
    for(let i=this.minIndex(indexes.i); i<=this.maxIndex(indexes.i); i++)
      for(let j=this.minIndex(indexes.j); j<=this.maxIndex(indexes.j); j++)
        {
          this.revealedIndexes[sizeRevealedIndexes++] = 
          {
            i : i,
            j : j
          }
        }
      
    if(testNeighbours === true)
    {
      let neighbours : any[] = this.getNeighbours(indexes);
      
    }
  }

  minIndex(index:number)
  {
    if(index > 0)
      return index-1;
    else
      return 0;
  }

  maxIndex(index:number)
  {
    if(index < this.tailleGrille - 1 )
      return index+1;
    else
      return index;
  }

  getRandomIndex()
  {
    return Math.floor(Math.random() * (this.tailleGrille));
  }
}
