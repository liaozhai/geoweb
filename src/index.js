import './index.css';
import 'ol/ol.css';
import 'elm-pep';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import GeoTIFF from 'ol/source/GeoTIFF';
import TileLayer from 'ol/layer/WebGLTile';

window.addEventListener('load', async () => {    
    const response = await fetch('features.json');
    const fc = await response.json();
    
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(fc),
    });
    const styles = {
        /*'Point': new Style({
            image: image,
        }),*/
        'LineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1,
            }),
        }),
        'MultiLineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1,
            }),
        }),
        /*'MultiPoint': new Style({
            image: image,
        }),*/
        'MultiPolygon': new Style({
            stroke: new Stroke({
                color: 'yellow',
                width: 1,
            }),
            fill: new Fill({
                color: 'rgba(219,130,62,0.82)',
            }),
        }),
        'Polygon': new Style({
            stroke: new Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3,
            }),
            fill: new Fill({
                color: 'rgba(159,234,29,0.86)',
            }),
        }),
        'GeometryCollection': new Style({
            stroke: new Stroke({
                color: 'magenta',
                width: 2,
            }),
            fill: new Fill({
                color: 'magenta',
            }),
            image: new CircleStyle({
                radius: 10,
                fill: null,
                stroke: new Stroke({
                    color: 'magenta',
                }),
            }),
        }),
        'Circle': new Style({
            stroke: new Stroke({
                color: 'rgba(239,101,161,0.89)',
                width: 2,
            }),
            fill: new Fill({
                color: 'rgba(255,0,0,0.2)',
            }),
        }),
    };

    const styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
    };

    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
    });
    fetch('HH_angCorrected_db.tiff')
        .then((response) => response.blob())
        .then((blob) => {
            const src = new GeoTIFF({
                sources: [
                    {
                        blob: blob,
                    },
                ],
            });
            map.addLayer(new TileLayer({
                source: src,
            }));
            src.getView().then((viewConfig) => {
                viewConfig.showFullExtent = true;
                return viewConfig;
            })
        });
    const map = new Map({
        target: 'map',
        layers: [
            new Tile({
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
