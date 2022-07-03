import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing } from '../models/Listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {


  URL = environment.URL;
  constructor(private httplient: HttpClient) { }


  public getAllListings(): Observable<Listing> {
    return this.httplient.get<Listing>(`${this.URL}`);
  }


}
