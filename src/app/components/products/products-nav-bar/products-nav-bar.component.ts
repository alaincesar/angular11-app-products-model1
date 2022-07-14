import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, productActionsTypes} from "../../../state/product.state";
import {EventDriverService} from "../../../state/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  //@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    //this.productEventEmitter.emit({type:productActionsTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({type:productActionsTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    //this.productEventEmitter.emit({type:productActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({type:productActionsTypes.GET_SELECTED_PRODUCTS});

  }

  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type:productActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({type:productActionsTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProducts() {
    //this.productEventEmitter.emit({type:productActionsTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent({type:productActionsTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    //this.productEventEmitter.emit({type:productActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
    this.eventDrivenService.publishEvent({type:productActionsTypes.SEARCH_PRODUCTS, payload:dataForm});
  }
}
