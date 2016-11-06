import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CaseComponent } from '../case/case.Component';
import { NotificationsService } from 'angular2-notifications/';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit 
{
  private grille: any[][];
  private tailleGrille: number = 9;
  private counter = Array<number>();
  private nbMines: number = 10;
  private revealedIndexes: any;
  private status : any;
  private reset : string;
  private counterReset: number=0;
  private options = {
      position : ["bottom","right"],
      clickToClose: true,
      animate: "fromLeft"
  };



  constructor( private service: NotificationsService ) 
  {
    this.startGame();
  }

  ngOnInit() 
  {
  }

  //Initialise le jeu
  startGame()
  {
    this.initCounter(this.tailleGrille);

    this.initGrille(this.tailleGrille);

    this.initMines(this.nbMines);

    this.initNumbers();

    this.printGrille();
  }

  //Initialise le compteur de la grille
  initCounter(size:number)
  {
    this.counter = [];

    for(let i=0; i<size; i++)
      this.counter.push(i);
  }

  //Initialise la grille
  initGrille(size:number)
  {
    this.grille = [];
    this.status = true;
    
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
          status: '',
          indexes : 
          {
            i : i,
            j : j
          }
        }
      }
    }
  }

  //Place les mines aléatoirement
  initMines(nbMines:number)
  {
    for(let i=0; i<nbMines; i++)
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

  //Place les numéros selon la position des mines
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

  //Événement de clique sur une case
  onNotify(indexes:any)
  {    
    if(this.status)
    {
      console.log("CLICKED:"+indexes.i+ " "+indexes.j);

      this.revealedIndexes = [];

      this.gameStatus(indexes);

      this.manageNeighbours(indexes);
      
      this.winCondition();
    }
  }

  //Vérification de la condition de défaite
  gameStatus(indexes:any)
  {
    if(this.grille[indexes.i][indexes.j].isMine === true)
      this.gameOver(indexes);
  }

  //Défaite
  gameOver(indexes:any)
  {
    this.status = false;
    this.grille[indexes.i][indexes.j].status = 'gameOver';

    for(let i=0; i<this.tailleGrille; i++)
    {
      for(let j=0; j<this.tailleGrille; j++)
      {
        if(this.grille[i][j].isMine === true)
        {
          this.grille[i][j].isRevealed = true;

          this.revealedIndexes.push(
            {
              i:i,
              j:j
            });
        }
      }
    }
    this.service.error("GAME OVER","Try again!");
  }

  //Victoire
  winCondition()
  {
    let counterNotRevealed = 0;

    for(let i=0; i<this.tailleGrille; i++)
    {
      for(let j=0; j<this.tailleGrille; j++)
      {
        if(this.grille[i][j].isRevealed === false)
          counterNotRevealed++;
      }
    }

    if(counterNotRevealed === this.nbMines)
    {
      this.status = false;

      this.service.success("YOU WIN","Well played!");
    }
  }

  //Rejouer --- non fonctionnel
  replay()
  {
    console.log("RESET CLICKED");
    this.startGame();
      this.reset = "reset";
  
    for(let i=0; i<this.tailleGrille; i++)
    {
      for(let j=0; j<this.tailleGrille; j++)
      {
          console.log(this.grille[i][j]);
      }
    }
  }

  //Récupération des voisins
  getNeighbours(indexes:any)
  {
    let neighbours:any[] = [];
    let k = 0;

    for(let i=this.minIndex(indexes.i); i<=this.maxIndex(indexes.i); i++)
      for(let j=this.minIndex(indexes.j); j<=this.maxIndex(indexes.j); j++)
        {
          if(!(indexes.i === i && indexes.j === j))
          {
            neighbours[k++] = 
            {
              i : i,
              j : j
            }
          }
        }

    return neighbours;
  }

  //Tri sur les voisins pour ne récupérer que les voisins vides
  testNeighbours(neighbours:any[])
  {
    let emptyNeighbours : any[] = [];
    let k=0;

    for(let n of neighbours)
    {
      if(this.grille[n.i][n.j].isMine === false && this.grille[n.i][n.j].isNumber === 0)
      {
        if(this.indexListContains(n) === false)
          emptyNeighbours[k++] = n;
      }
    }
      
    return emptyNeighbours;
  }

  //Afficher les voisins
  revealNeighbours(neighbours:any[])
  {
    for(let n of neighbours)
    {
      if(this.grille[n.i][n.j].isMine === false)
      {
        this.grille[n.i][n.j].isRevealed = true;

        this.revealedIndexes.push(
        {
          i : n.i,
          j : n.j
        });
      }
    }  
  }

  //Gestion de la propagation du clique
  manageNeighbours(indexes:any)
  { 
    this.grille[indexes.i][indexes.j].isRevealed = true;

    this.revealedIndexes.push( 
    {
      i : indexes.i,
      j : indexes.j
    });

    let neighbours = this.getNeighbours(indexes);

    let emptyNeighbours = this.testNeighbours(neighbours);

    this.revealNeighbours(neighbours);

    if(emptyNeighbours.length === 0)
      return;
    else
    {
      for(let n of emptyNeighbours)
        this.manageNeighbours(n);
    }
  }

  //Test sur la variable this.revealedIndexes
  indexListContains(indexes:any)
  {
    for(let ind of this.revealedIndexes)
    {
      if(ind.i === indexes.i && ind.j === indexes.j)
        return true;
    }

    return false;
  }

  //Borne minimale
  minIndex(index:number)
  {
    if(index > 0)
      return index-1;
    else
      return 0;
  }

  //Borne maximale
  maxIndex(index:number)
  {
    if(index < this.tailleGrille - 1 )
      return index+1;
    else
      return index;
  }

  //Index aléatoire
  getRandomIndex()
  {
    return Math.floor(Math.random() * (this.tailleGrille));
  }

  //Affichage de la grille sur la console
  printGrille()
  {
    let text : string =  "  0  1  2  3  4  5  6  7  8\n";

    for(let i=0; i<this.tailleGrille; i++)
    {
      text += i+" ";
      for(let j=0; j<this.tailleGrille; j++)
      {
        if(this.grille[i][j].isMine)
          text += " X ";
        else
          text += " . ";
      }

      text += "\n";
    }

    console.log(text);
  }
}
