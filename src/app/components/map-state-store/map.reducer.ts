import { createReducer, on } from "@ngrx/store";
import * as mapboxgl from "mapbox-gl";
import { Map, Marker, NavigationControl } from "mapbox-gl";
import { BehaviorSubject, map } from "rxjs";
import { GeoCode } from "src/app/models/GeoCode";
import { Listing } from "src/app/models/Listing";
import { MapElements } from "src/app/models/MapElements";
import { loadMap } from "./map.actions";



export const initialMapState: MapElements = {
    listings: new BehaviorSubject<Listing>({})

};




export const mapReducer = createReducer(
    initialMapState,
    on(loadMap, (mapElements) => {
        const initialState = { lng: -97.42201, lat: 32.700878, zoom: 14 };
        mapElements.map = new Map({
            accessToken: "pk.eyJ1IjoiaXRlcmF0ZS1haSIsImEiOiJja2s2eTk3N3kwNzkzMm9tb3Eyc3A5MjQyIn0.teb9zjm7V_HKvTzvBp10tw",
            container: mapElements.mapContainer!.nativeElement,
            style: `mapbox://styles/mapbox/light-v10`,
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom
        });
        // const el = document.createElement('div');
        // el.className = 'flat-marker';

        mapElements.map.addControl(new NavigationControl());
        mapElements.geo = {
            type: 'FeatureCollection',
            features: []
        }
        // console.log(this.listings.getValue().records![0].geocode);

        mapElements.listing = mapElements.listings.getValue();

        mapElements.listing.records!.map(flat => {
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
            mapElements.geo!.features.push(item)
        })
        // console.log(this.geo)
        for (const feature of mapElements.geo.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';

            var popup = new mapboxgl.Popup({ offset: 25 })
                .setText('Construction on the Washington Monument began in 1848.');

            // console.log(feature.geometry.coordinates[0])
            // make a marker for each feature and add to the map
            var marker = new Marker({ color: 'red' }).
                setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]).
                addTo(mapElements.map).setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setText(feature.properties.description));

            // console.log(marker);

            mapElements.markers!.push(marker);

            // console.log(this.markers);



            mapElements.map!.on('click', (event) => {

                mapElements.map?.flyTo({
                    center: [event.lngLat.lng, event.lngLat.lat],
                    zoom: 17
                })
            });
        }

        return mapElements;

    })


)
