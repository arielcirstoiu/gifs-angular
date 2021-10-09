import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'PhFqL48rG5sGYPY3cx9BlNUqBFqVJC0C';
  private servicioUrl = "https://api.giphy.com/v1/gifs";
  private _historial: string [] = [];
  // 
  public resultados: Gif [] = [];

  get historial(){
    return [...this._historial]; // los 3 puntos regresan un nuevo arreglo, si hay algun cambio es mejor
  }


  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!) ;  //confia en mi, no devolvera null
    // }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs( query:string = ''){
   
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){ // includes --  si en el array historial ya existe o incluye esa nueva busqueda no lo inserta
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10); // corta el array y solo coge del 0 al 10 elementos para que no sean infinitos

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    console.log(params.toString());


    // this.http.get<SearchGifsResponse>(`/search?api_key=PhFqL48rG5sGYPY3cx9BlNUqBFqVJC0C&q=${query}&limit=10`)
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( resp => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  
  }
}
