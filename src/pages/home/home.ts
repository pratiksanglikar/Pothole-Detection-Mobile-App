import {Component, Input, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import {HeatmapLayer} from '@ngui/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    @Input("center") private center: string = "37.782551, -122.445368";
    @Input("potholes") private potholes: any[] = [];

    @ViewChild(HeatmapLayer) heatmapLayer: HeatmapLayer;
    heatmap: google.maps.visualization.HeatmapLayer;
    map: google.maps.Map;
    points = [];

    private initialized: boolean = false;

    ngOnInit() {
        this.heatmapLayer['initialized$'].subscribe(heatmap => {
            this.points = [
                new google.maps.LatLng(37.782551, -122.445368),
                new google.maps.LatLng(37.782745, -122.444586),
                new google.maps.LatLng(37.782842, -122.443688)
            ];
            this.heatmap = heatmap;
            this.map = this.heatmap.getMap();
        });
        this.initialized = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.initialized === true) {
            this.center = changes.center ? changes.center.currentValue : this.center;
            let points = [];
            if (changes.potholes && changes.potholes.currentValue) {
                for (let i = 0; i < changes.potholes.currentValue.length; i++) {
                    points.push(new google.maps.LatLng(changes.potholes.currentValue[i].lat, changes.potholes.currentValue[i].lng));
                }
            }
            console.log(this.potholes);
            this.points = [...points];
            google.maps.event.trigger(this.map, 'resize');
        }
    }

    /*toggleHeatmap() {
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    }*/

    /*changeGradient() {
        let gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ];
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
    }*/

    /*changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
    }*/

    /*changeOpacity() {
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
    }

    loadRandomPoints() {
        this.points = [];

        for (let i = 0 ; i < 9; i++) {
            this.addPoint();
        }
    }*/

    /*addPoint() {
        let randomLat = Math.random() * 0.0099 + 37.782551;
        let randomLng = Math.random() * 0.0099 + -122.445368;
        let latlng = new google.maps.LatLng(randomLat, randomLng);
        this.points.push(latlng);
    }*/


}
