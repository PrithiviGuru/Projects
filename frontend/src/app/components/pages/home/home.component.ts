import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  // foods:Food[]=[];
  foods:any

  constructor(private foodservice:FoodService,activateRoute:ActivatedRoute){
    let foodObservable: Observable<Food[]>
    activateRoute.params.subscribe((params)=>{
      if(params['searchTerm']){
        foodObservable =foodservice.getAllfoodBySerchTerm(params['searchTerm'])
      }
      else{
        foodObservable=foodservice.getAll()
      }
      foodObservable.subscribe((serverFoods)=>{
        this.foods=serverFoods
      })
    })
    
  }

  ngOnInit(): void {
  }

}
