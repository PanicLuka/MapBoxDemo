import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/Listing';
import { ListingService } from 'src/app/services/listing.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private listingService: ListingService) { }

  listing!: Listing

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {

    this.listingService.getAllListings()
      .subscribe(res => {
        this.listing = res;
        // console.log(this.listing.records)
      })
  }



}
