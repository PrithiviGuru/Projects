import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food:any;
  constructor(activateRoute:ActivatedRoute,private foodservice:FoodService,
    private cartService:CartService,private router:Router){
    activateRoute.params.subscribe((params)=>{
      if(params['id']){
        foodservice.getFoodById(params['id']).subscribe((serverFoods: any)=>{
          this.food= serverFoods
        })
      }
    })
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
