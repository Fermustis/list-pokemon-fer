//import { ResponsePokemon } from '../../interfaces/responsePokemon';
import { PokemonServiceService } from '../../service/pokemon-service.service';

import { Component, OnInit } from '@angular/core';

export interface ResponsePokemonByUrl {
  abilities:              Ability[];
  baseExperience:         number;
  cries:                  Cries;
  forms:                  Species[];
  gameIndices:            GameIndex[];
  height:                 number;
  heldItems:              any[];
  id:                     number;
  isDefault:              boolean;
  locationAreaEncounters: string;
  moves:                  Move[];
  name:                   string;
  order:                  number;
  pastAbilities:          any[];
  pastTypes:              any[];
  species:                Species;
  sprites:                Sprites;
  stats:                  Stat[];
  types:                  Type[];
  weight:                 number;
}

export interface Ability {
  ability:  Species;
  isHidden: boolean;
  slot:     number;
}

export interface Species {
  name: string;
  url:  string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  gameIndex: number;
  version:   Species;
}

export interface Move {
  move:                Species;
  versionGroupDetails: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  levelLearnedAt:  number;
  moveLearnMethod: Species;
  versionGroup:    Species;
}

export interface GenerationV {
  blackWhite: Sprites;
}

export interface GenerationIv {
  diamondPearl:        Sprites;
  heartgoldSoulsilver: Sprites;
  platinum:            Sprites;
}

export interface Versions {
  generationI:    GenerationI;
  generationIi:   GenerationIi;
  generationIii:  GenerationIii;
  generationIv:   GenerationIv;
  generationV:    GenerationV;
  generationVi:   { [key: string]: Home };
  generationVii:  GenerationVii;
  generationViii: GenerationViii;
}

export interface Other {
  dreamWorld:      DreamWorld;
  home:            Home;
  officialArtwork: OfficialArtwork;
  showdown:        Sprites;
}

export interface Sprites {
  backDefault:      string;
  backFemale:       null;
  backShiny:        string;
  backShinyFemale:  null;
  frontDefault:     string;
  frontFemale:      null;
  frontShiny:       string;
  frontShinyFemale: null;
  other?:           Other;
  versions?:        Versions;
  animated?:        Sprites;
}

export interface GenerationI {
  redBlue: RedBlue;
  yellow:  RedBlue;
}

export interface RedBlue {
  backDefault:      string;
  backGray:         string;
  backTransparent:  string;
  frontDefault:     string;
  frontGray:        string;
  frontTransparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold:    Gold;
  silver:  Gold;
}

export interface Crystal {
  backDefault:           string;
  backShiny:             string;
  backShinyTransparent:  string;
  backTransparent:       string;
  frontDefault:          string;
  frontShiny:            string;
  frontShinyTransparent: string;
  frontTransparent:      string;
}

export interface Gold {
  backDefault:       string;
  backShiny:         string;
  frontDefault:      string;
  frontShiny:        string;
  frontTransparent?: string;
}

export interface GenerationIii {
  emerald:          OfficialArtwork;
  fireredLeafgreen: Gold;
  rubySapphire:     Gold;
}

export interface OfficialArtwork {
  frontDefault: string;
  frontShiny:   string;
}

export interface Home {
  frontDefault:     string;
  frontFemale:      null;
  frontShiny:       string;
  frontShinyFemale: null;
}

export interface GenerationVii {
  icons:             DreamWorld;
  ultraSunUltraMoon: Home;
}

export interface DreamWorld {
  frontDefault: string;
  frontFemale:  null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  baseStat: number;
  effort:   number;
  stat:     Species;
}

export interface Type {
  slot: number;
  type: Species;
}
////////+++++++primera endponit


export interface ResponsePokemon {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  public responsePokemons: ResponsePokemon  | null = null; 
  public cardsOfPokemons: Result[] = [];
  public infoPokemones: ResponsePokemonByUrl[]=[];  
  constructor( private pkservice: PokemonServiceService  ){

  }

  ngOnInit(): void {
     this.pkservice.getPokemons().subscribe(
      res =>{
        this.responsePokemons=res;
        this.cardsOfPokemons=this.responsePokemons.results;
        if(this.cardsOfPokemons.length>0){
           this.cardsOfPokemons.forEach( e =>{
            if(e.url){
              this.pkservice.getInfoPokemonByUrl(e.url).subscribe(
                res=>{
                  this.infoPokemones.push(res)

                },e =>{

                }
              )
            }
           })
        }

        console.log(this.responsePokemons);
        console.log(this.cardsOfPokemons);
      },
      e=> {
        console.log(e)
      }
     )
  }

  getType1(i:number){
    
    return this.infoPokemones[i].types[0] &&  this.infoPokemones[i].types[0].type?  this.infoPokemones[i].types[0].type.name: '' ;
  }
  getType2(i:number){
    return this.infoPokemones[i].types[1] &&  this.infoPokemones[i].types[1].type? this.infoPokemones[i].types[1].type.name: '' ;
  }
  getImage(i:number){
    //return this.pkservice.getImage(this.infoPokemones[i].sprites.other?.officialArtwork.frontDefault || " " )
   return this.infoPokemones[i].sprites.other?.officialArtwork.frontDefault || " " 
  }
  
}
