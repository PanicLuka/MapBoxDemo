import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker, NavigationControl } from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Listing } from 'src/app/models/Listing';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  listing!: Listing
  geo!: { type: string; features: any[] }
  listings = new BehaviorSubject<Listing>({})

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {

    this.listingService.getAllListings()
      .subscribe((res: Listing) => {
        // this.listing = res;
        // console.log(res.records![1].geoCode)
        this.listings.next(res);

      })
  }
  ngAfterViewInit() {

    setTimeout(() => {
      this.loadListings();
    }, 2000
    )


  }

  loadListings() {
    const initialState = { lng: -97.42201, lat: 32.700878, zoom: 14 };
    this.map = new Map({
      accessToken: "pk.eyJ1IjoiaXRlcmF0ZS1haSIsImEiOiJja2s2eTk3N3kwNzkzMm9tb3Eyc3A5MjQyIn0.teb9zjm7V_HKvTzvBp10tw",
      container: this.mapContainer.nativeElement,
      style: `mapbox://styles/mapbox/light-v10`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    // const el = document.createElement('div');
    // el.className = 'flat-marker';

    this.map.addControl(new NavigationControl());
    this.geo = {
      type: 'FeatureCollection',
      features: []
    }
    // console.log(this.listings.getValue().records![0].geocode);

    this.listing = this.listings.getValue();

    this.listing.records!.map(flat => {
      let item: any = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [flat.geocode.Longitude, flat.geocode.Latitude]
        },
        properties: {
          title: 'Mapbox',
          description: flat.city
        }
      }
      this.geo.features.push(item)
    })
    console.log(this.geo)
    for (const feature of this.geo.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';


      // console.log(feature.geometry.coordinates[0])
      // make a marker for each feature and add to the map
      new Marker({ color: 'red' }).setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]).addTo(this.map);
    }
    // new Marker({ color: 'red' })
    //   .setLngLat([-97.42201, 32.700878])
    //   .addTo(this.map);

  }

  ngOnDestroy() {
    this.map?.remove();
  }

}