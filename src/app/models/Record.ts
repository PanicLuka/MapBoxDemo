import { FloorPlans } from "./FloorPlans";
import { GeoCode } from "./GeoCode";

export class Record {
    listID!: number
    order!: number;
    propertyID!: number;
    name!: string;
    streetAddress!: string;
    city!: string;
    state!: string;
    pets!: boolean;
    washerDry!: string;
    photo!: string
    favorite!: boolean;
    highestSentCommissions!: number;
    onsiteManager!: null;
    management!: null;
    proximity!: number;
    section8!: boolean;
    seniorHousing!: boolean;
    studentHousting!: boolean;
    floorplans!: FloorPlans[];
    highValueAmenities!: [string];
    paidUtillities!: [string];
    geocode!: GeoCode;
}