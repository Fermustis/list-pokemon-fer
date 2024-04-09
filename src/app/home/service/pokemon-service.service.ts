import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

 interface ResponsePokemon {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

 interface Result {
  name: string;
  url:  string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  public url:string= "https://pokeapi.co/api/v2/";
    public limit:string="10";

    constructor(private http: HttpClient) { }

    getPokemons(): Observable<ResponsePokemon>{
        return this.http.get<ResponsePokemon>(`${this.url}pokemon?=${this.limit}&offset=0`)
    }
    getInfoPokemonByUrl(url:string):Observable<ResponsePokemonByUrl>{
      return this.http.get<ResponsePokemonByUrl>(`${url}`)

    }
    
    getImage(url:string){
      return this.http.get<ResponsePokemonByUrl>(`${url}`)
    }

}
