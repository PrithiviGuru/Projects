import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllfoodBySerchTerm(searchTerm:string):any{
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }
  getFoodById(foodid:string):any{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodid)
  }
}
