import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, productActionsTypes} from "../../../state/product.state";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$:Observable<AppDataState<Product[]>> | null=null;
  //@Output() productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }
/*
  onSelect(p: Product) {
    this.productsEventEmitter.emit({type: productActionsTypes.SELECT_PRODUCT, payload: p});

  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({type: productActionsTypes.DELETE_PRODUCT, payload: p});

  }

  onEdit(p: Product) {
    this.productsEventEmitter.emit({type: productActionsTypes.EDIT_PRODUCT, payload: p});

  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
 */
}
