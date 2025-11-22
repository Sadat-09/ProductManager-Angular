import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: ''
  };
  isEditing: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        
        this.isEditing = true;
        this.loadProduct(Number(id));
      }
    });
  }
   loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.error('Error loading product for edit:', err);
      }
    });
  }

   onSubmit(): void {
    if (this.isEditing) {
      this.productService.updateProduct(this.product).subscribe({
        next: () => {
          console.log('Product updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    } else {
      this.productService.addProduct(this.product).subscribe({
        next: (newProduct) => {
          console.log('Product added successfully!', newProduct);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    }
  }
}