import { createAction, props } from "@ngrx/store";
import { MapElements } from "src/app/models/MapElements";

export const loadMap = createAction('loadMap', props<MapElements>());