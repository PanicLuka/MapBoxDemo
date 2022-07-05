import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { StoreModule } from '@ngrx/store';
import { mapReducer } from './components/map-state-store/map.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StoreModule.forRoot({ mapEntries: mapReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
