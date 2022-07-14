import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {ActionEvent, AppDataState, DataStateEnum, productActionsTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDriverService} from "../../state/event.driver.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(
    private productsService:ProductsService, private router:Router,
    private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
        map(data=> {
          console.log(data);
          return ({dataState: DataStateEnum.LOADED, data: data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=> {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getSAvailableProducts().pipe(
      map(data=> {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }

  onSearch(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=> {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );

  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })

  }

  onDelete(p: Product) {
    let v=confirm("Etes vous sûr?" );
    if (v==true)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case productActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case productActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case productActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case productActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case productActionsTypes.NEW_PRODUCT: this.onNewProducts();break;
      case productActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
      case productActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
      case productActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;

    }
  }
}
