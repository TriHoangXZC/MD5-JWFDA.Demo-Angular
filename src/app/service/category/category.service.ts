import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {API_URL, CATEGORY} from '../../model/url-constant';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${API_URL}/${CATEGORY}`);
  }
}
