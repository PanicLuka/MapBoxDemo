import { ElementRef } from "@angular/core";
import { Map, Marker } from "mapbox-gl";
import { BehaviorSubject } from "rxjs";
import { Listing } from "./Listing";

export class MapElements {
    map?: Map | undefined;
    listing?: Listing;
    geo?: { type: string; features: any[] };
    listings = new BehaviorSubject<Listing>({});
    markers?: Marker[] = [];
    mapContainer?: ElementRef<HTMLElement>;

}