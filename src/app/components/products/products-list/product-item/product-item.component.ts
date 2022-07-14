import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, productActionsTypes} from "../../../../state/product.state";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product | null = null;
  @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type:productActionsTypes.SELECT_PRODUCT, payload:product});
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:productActionsTypes.DELETE_PRODUCT, payload:product});
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:productActionsTypes.EDIT_PRODUCT, payload:product});
  }
}
