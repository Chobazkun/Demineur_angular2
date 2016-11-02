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

    for(let i=0; i<this.tailleGrille; i++)
      for(let j=0; j<this.tailleGrille; j++)
        console.log(this.grille[i][j]);
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
    
    this.manageNeighbours(indexes, 0);
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
    let emptyNeighbours : any[] = [];
    let k=0;

    for(let n of neighbours)
    {
      if(this.grille[n.i][n.j].isMine === false && this.grille[n.i][n.j].isNumber === 0 )
        emptyNeighbours[k++] = n;
    }

    console.log("START");
    for(let n of emptyNeighbours)
      console.log(n);
    console.log("END");
      
    return emptyNeighbours;
  }

  revealNeighbours(neighbours:any[], sizeRevealedIndexes:number)
  {
    for(let n of neighbours)
    {
      if(n.isMine === false)
      {
        this.revealedIndexes[sizeRevealedIndexes++] +=
        {
          i : n.i,
          j : n.j
        }
      }
    }  
  }

  manageNeighbours(indexes:any, sizeRevealedIndexes:number)
  { 
    let neighbours = this.getNeighbours(indexes);

    this.revealNeighbours(neighbours, sizeRevealedIndexes);

    for(let n of this.testNeighbours(neighbours))
      this.manageNeighbours(n, sizeRevealedIndexes);

    /*for(let i=this.minIndex(indexes.i); i<=this.maxIndex(indexes.i); i++)
      for(let j=this.minIndex(indexes.j); j<=this.maxIndex(indexes.j); j++)
      {
        this.revealedIndexes[sizeRevealedIndexes++] = 
        {
          i : i,
          j : j
        }
      }

    if(testNeighbours.length === 0)
      return;
    else
    {
      let neighbours : any[] = this.getNeighbours(indexes);

      for(let n of neighbours)
        this.revealNeighbours(n, sizeRevealedIndexes, this.testNeighbours(n));
      
    }*/
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
