import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL, PRODUCT} from '../../model/url-constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/${PRODUCT}`);
  }

  getProductById(id): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${PRODUCT}/${id}`);
  }

  createProduct(product): Observable<Product> {
    return this.http.post(`${API_URL}/${PRODUCT}`, product);
  }

  editProduct(id, product): Observable<Product> {
    return this.http.put(`${API_URL}/${PRODUCT}/${id}`, product);
  }

  deleteProduct(id): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/${PRODUCT}/${id}`);
  }
}
