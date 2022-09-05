import './index.css';
import 'ol/ol.css';
import 'elm-pep';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


window.addEventListener('load', async () => {    
    const response = await fetch('features.json');
    const fc = await response.json();
    
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(fc),
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            vectorLayer,
        ],
        view: new View({
            center: [0, 0],
            zoom: 2
        })
    });   
});
