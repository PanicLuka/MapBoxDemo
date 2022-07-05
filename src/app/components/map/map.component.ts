import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker, NavigationControl } from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { Listing } from 'src/app/models/Listing';
import { MapElements } from 'src/app/models/MapElements';
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
  listings = new BehaviorSubject<Listing>({});
  markers: Marker[] = [];


  mapElements!: MapElements;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;




  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {

    this.listingService.getAllListings()
      .subscribe((res: Listing) => {

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


    this.map.addControl(new NavigationControl());
    this.geo = {
      type: 'FeatureCollection',
      features: []
    }

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
          description: flat.streetAddress
        }
      }
      this.geo.features.push(item)
    })
    for (const feature of this.geo.features) {
      const el = document.createElement('div');
      el.className = 'marker';

      var popup = new mapboxgl.Popup({ offset: 25 })
        .setText('Construction on the Washington Monument began in 1848.');

      var marker = new Marker({ color: 'red' }).
        setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]).
        addTo(this.map).setPopup(new mapboxgl.Popup({ offset: 25 })
          .setText(feature.properties.description));


      this.markers.push(marker);




      this.map!.on('click', (event) => {

        this.map?.flyTo({
          center: [event.lngLat.lng, event.lngLat.lat],
          zoom: 17
        })
      });



    }


  }

  ngOnDestroy() {
    this.map?.remove();
  }

}


