//import { ResponsePokemon } from '../../interfaces/responsePokemon';
import { PokemonResponse, Result } from '../../interfaces/PokemonResponse';
import { PokemonByUrlResponse } from '../../interfaces/pokemones';
import { PokemonServiceService } from '../../service/pokemon-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
    public responsePokemons: PokemonResponse | null = null;
    public cardsOfPokemons: Result[] | null = [];
    public infoPokemones: PokemonByUrlResponse[] = [];
    
    public hasLoaded: boolean = false;

    constructor(private pkservice: PokemonServiceService) {}

    ngOnInit(): void {
        this.getData();
    }
    getData() {
        this.infoPokemones = [];

        this.pkservice.getPokemons().subscribe(res => {
            this.responsePokemons = res;

            //console.log(this.responsePokemons);
            //verificar si la respuesta es nula
            if (this.responsePokemons && this.responsePokemons.results) {
                this.cardsOfPokemons = this.responsePokemons?.results || [];
                if (this.cardsOfPokemons.length > 0) {
                    this.cardsOfPokemons.forEach(e => {
                        if (e.url !== '') {
                            this.pkservice.getInfoPokemonByUrl(e.url).subscribe(res => {
                                this.infoPokemones.push(res);
                            });
                        }
                    });
                }
            }
        });
    }
    getDataByName(name: string) {
        if (name === '') {
            this.getData();
            return;
        }
        this.pkservice.getPokemonByName(name).subscribe(res => {
            this.infoPokemones = [];
            this.infoPokemones.push(res);
        });
    }
    getType1(i: number) {
        if (
            this.infoPokemones[i] != undefined &&
            this.infoPokemones[i].types != undefined &&
            this.infoPokemones[i].types[0] &&
            this.infoPokemones[i].types[0].type
        ) {
            return this.infoPokemones[i].types[0].type.name;
        }

        return '';
    }
    getType2(i: number) {
        if (
            this.infoPokemones[i] != undefined &&
            this.infoPokemones[i].types != undefined &&
            this.infoPokemones[i].types[1] &&
            this.infoPokemones[i].types[1].type
        ) {
            return this.infoPokemones[i].types[1].type.name;
        }
        return '';
    }
    getImage(i: number) {
        if (
            this.infoPokemones[i] != undefined &&
            this.infoPokemones[i].sprites != undefined &&
            this.infoPokemones[i].sprites.other != undefined &&
            this.infoPokemones[i].sprites.other?.['official-artwork'] != undefined &&
            this.infoPokemones[i].sprites.other?.['official-artwork'].front_default != undefined
        ) {
            return this.infoPokemones[i].sprites.other?.['official-artwork'].front_default;
        }
        return '';
    }
    getStyleByType(i: number) {
        let typeName = '';
        this.getType1(i) != '' ? (typeName = this.getType1(i)) : (typeName = this.getType2(i));

        switch (typeName) {
            case 'normal':
                return 'type-normal';
            case 'fighting':
                return 'type-fighting';
            case 'flying':
                return 'type-flying';
            case 'poison':
                return 'type-poison';
            case 'ground':
                return 'type-ground';
            case 'rock':
                return 'type-rock';
            case 'bug':
                return 'type-bug';
            case 'ghost':
                return 'type-ghost';
            case 'steel':
                return 'type-steel';
            case 'fire':
                return 'type-fire';
            case 'water':
                return 'type-water';
            case 'grass':
                return 'type-grass';
            case 'electric':
                return 'type-electric';
            case 'psychic':
                return 'type-psychic';
            case 'ice':
                return 'type-ice';
            case 'dragon':
                return 'type-dragon';
            case 'dark':
                return 'type-dark';
            case 'fairy':
                return 'type-fairy';
            case 'unknown':
                return 'type-unknown';
            case 'shadow':
                return 'type-shadow';
            default:
                return 'type-unknown';
        }
    }
    onLoad() {
        this.hasLoaded = true;
    }
}
