import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";   // to get value from the page that call this one
import { Location, isEnabled, getCurrentLocation, enableLocationRequest, watchLocation } from "nativescript-geolocation";

import geolocation = require("nativescript-geolocation");


// import the mapbox plugin
var mapbox = require("nativescript-mapbox");
let ACCESS_TOKEN = 
  "sk.eyJ1IjoibXVsdGlwcm90ZXhpb24iLCJhIjoiY2l4OHZjY2o4MDAybjJ0cGJzNzBjbXYxaCJ9.ofc9cLa8FffvgHejs7EkCg"


@Component({
    moduleId: module.id,
    selector: "map",
    templateUrl: 'map.component.html',
    styleUrls: ["map-common.css", "map.component.css"],
})
export class MapComponent implements OnInit {

    public fullName: string;
    
    currLongitude: number = 0;
    currLatitude: number = 0;

    //latitude: number = 0;
    //longitude: number = 0;
    watchId: number = 0;
    private map: any;

    locationFound: boolean = false;
    mapCompStart: boolean = false;
    mapReady: boolean = false;

    public constructor(private route: ActivatedRoute) 
    {
      this.route.params.subscribe((params) => {
        this.fullName = params["name"]; // key from app.routing
        console.log("********** Parameter passed value --> " + params["name"]);
      });      


      if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
      }

    }


    ngOnInit(){
      this.watchLocation();
    }


    showMapOnPage(){
      
      let isEnabledProperty = isEnabled();

      let message = "--- Location services are not available";

      if (isEnabledProperty) {
        //console.log("****************** Location services are available");
        
        if(this.currLatitude != 0 && this.currLongitude != 0){
          this.loadMap();
        } else {
          console.log('NO VALID VALUE FOR LAT/LON!!!');
        }
      } 
    }


    loadMap(){

      mapbox.hasFineLocationPermission().then(
          function(granted) {
            // if this is 'false' you probably want to call 'requestFineLocationPermission' now
            //console.log("Has Location Permission? --> " + granted);
          }
      );

      // if no permission was granted previously this wil open a user consent screen
      mapbox.requestFineLocationPermission().then(
          function() {
            //console.log("Location permission requested");
          }
      );

      // bozen pos. lat. --> 46,4951665 | lon --> 11,3541034

      mapbox.show({
        accessToken: ACCESS_TOKEN, // see 'Prerequisites' above
        style: mapbox.MapStyle.OUTDOORS, // mapbox.MapStyle enum in the source for other options, default mapbox.MapStyle.STREETS
        margins: {
          left: 20, // default 0
          right: 20, // default 0
          top: 100, // default 0
          bottom: 20 // default 0
        },
        center: { // optional without a default
          lat: this.currLatitude,  // 46.555
          lng: this.currLongitude  // 11.367
        },
        zoomLevel: 9.25, // 0-20, default 0
        showUserLocation: true, // default false - requires location permissions on Android which you can remove from AndroidManifest.xml if you don't need them
        hideAttribution: true, // default false, Mapbox requires this default if you're on a free plan
        hideLogo: true, // default false, Mapbox requires this default if you're on a free plan
        hideCompass: false, // default false
        disableRotation: false, // default false
        disableScroll: false, // default false
        disableZoom: false, // default false
        markers: [ // optional without a default
          {
            lat: 46.5551665, // mandatory
            lng: 11.3741034, // mandatory
            title: 'Nice location', // recommended to pass in
            subtitle: 'Really really nice location', // one line is available on iOS, multiple on Android
            //iconPath: 'res/markers/green_pin_marker.png', // anywhere in your app folder
            onTap: function(marker) { console.log("This marker was tapped"); },
            onCalloutTap: function(marker) { console.log("The callout of this marker was tapped"); }
          }
        ]
      }).then(
          function(result) {
            console.log("Mapbox show done");
          },
          function(error) {
            console.log("mapbox show error: " + error);
          }
      )
    }


    watchLocation(){

      if (this.watchId != 0) {
        console.log('Stop Monitoring ...');
        geolocation.clearWatch(this.watchId);
        this.watchId = 0;

      } else {
        console.log('Start Monitoring ...');
        
        this.watchId = geolocation.watchLocation(
          (loc) => {
                if (loc) {
                    this.currLatitude = loc.latitude;
                    this.currLongitude = loc.longitude;
                    console.log( new Date().toLocaleTimeString() + ` | Lat -> ${this.currLatitude} | Lon -> ${this.currLongitude} | watchId -> ${this.watchId}`);  
                    
                    this.locationFound = true;
                    this.initMapComponents();
                    
                }
            },
            (e) => {
                console.log('ERROR MSG WATCH-LOC: ', e.message);
            },
            {desiredAccuracy: 3, updateDistance: 10, minimumUpdateTime: 1000 * 3}); // Should update every X seconds
        
      }
    }


    public onMapReady(args){
      console.log("************** Map ready bitch!");

      // set the object map, so from now on the reference of the object is to this.map
      this.map = args.map;
      
      this.mapReady = true;  
      this.initMapComponents();  

    }

  initMapComponents(){
    
    if(this.mapReady && this.locationFound && !this.mapCompStart){
      this.mapCompStart = true;

      this.mapSetCenter();

      this.addMarker();
    }
  }

  mapSetCenter(){
    this.map.setCenter(
    {
      lat: this.currLatitude, // 46.4951665    this.currLatitude
      lng: this.currLongitude, // 11.3541034    this.currLongitude
      animated: true // default true
    });
  }


  addMarker(){
    this.map.addMarkers([
    {
      id: 1, // can be user in 'removeMarkers()'
      lat: 46.4901665, // mandatory
      lng: 11.3201034, // mandatory
      title: 'One-line title here', // no popup unless set
      subtitle: 'Infamous subtitle!',
//      icon: 'res://poi_green',
//      iconPath: 'res/poi_green.png',
      onTap: this.onTap,
    }]);
  }

  onTap(){
    console.log("****************** tapped the poi/marker!!!");
  }


}