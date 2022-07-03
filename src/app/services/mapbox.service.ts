import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor() {
    mapboxgl.accessToken = "pk.eyJ1IjoiaXRlcmF0ZS1haSIsImEiOiJja2s2eTk3N3kwNzkzMm9tb3Eyc3A5MjQyIn0.teb9zjm7V_HKvTzvBp10tw";
  }

  // getMarkers() {
  //   const geoJson = [{
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'Point',
  //       'coordinates': ['80.20929129999999', '13.0569951']
  //     },
  //     'properties': {
  //       'message': 'Chennai'
  //     }
  //   }, {
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'Point',
  //       'coordinates': ['77.350048', '12.953847']
  //     },
  //     'properties': {
  //       'message': 'bangulare'
  //     }
  //   }];
  //   return geoJson;
  // }
}
