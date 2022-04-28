import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  getProductById(id): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  createProduct(product): Observable<Product> {
    return this.http.post(`${API_URL}/products`, product);
  }

  editProduct(id, product): Observable<Product> {
    return this.http.put(`${API_URL}/products/${id}`, product);
  }

  deleteProduct(id): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/products/${id}`);
  }
}
