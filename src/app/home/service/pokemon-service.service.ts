import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { PokemonResponse } from '../interfaces/PokemonResponse';
import { PokemonByUrlResponse } from '../interfaces/pokemones';

@Injectable({
    providedIn: 'root',
})
export class PokemonServiceService {
    public url: string = 'https://pokeapi.co/api/v2/';
    public limit: string = '300';

    constructor(private http: HttpClient) {}

    getPokemons(): Observable<PokemonResponse | null> {
        return this.http.get<PokemonResponse>(`${this.url}pokemon?limit=${this.limit}&offset=0`).pipe(
            //regresar solo el resul del response

            catchError(() => of(null))
        );
    }
    getInfoPokemonByUrl(url: string): Observable<PokemonByUrlResponse> {
        return this.http.get<PokemonByUrlResponse>(`${url}`).pipe(
            catchError(err => {
                throw err;
            })
        );
    }
    getPokemonByName(name: string) {
        return this.http.get<PokemonByUrlResponse>(`${this.url}pokemon/${name}`).pipe(
            catchError(err => {
                throw err;
            })
        );
    }
}
