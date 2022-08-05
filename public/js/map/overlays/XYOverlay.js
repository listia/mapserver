import AbstractGeoJsonOverlay from './AbstractGeoJsonOverlay.js';

var xygrid_features = []
var areasGeoJsonLayer = null;

export default AbstractGeoJsonOverlay.extend({
  initialize: function() {
    AbstractGeoJsonOverlay.prototype.initialize.call(this, "xygrid");

    // hardcoded specifically for X,Y World map
    // loading from areas is too slow, as it creates 16k squares
    for(var y = 0; y <= 128; y++) {
      var feature = {
        "type":"Feature",
        "geometry": {
          "type":"Polygon",
          "coordinates":[[
              [-8192, 8192 - (y * 128) + (4 * 128)],
              [8192, 8192 - (y * 128) + (4 * 128)]
          ]]
        },
        "properties": {}
      };
      xygrid_features.push(feature);
    }
    for(var x = 0; x <= 128; x++) {
      var feature = {
        "type":"Feature",
        "geometry": {
          "type":"Polygon",
          "coordinates":[[
              [(x * 128) - 8192, 8192 + (4 * 128)],
              [(x * 128) - 8192, -8192 + (4 * 128)]
          ]]
        },
        "properties": {}
      };
      xygrid_features.push(feature);
    }
  },

  getMaxDisplayedZoom: function(){
    return 6;
  },

  getMinDisplayedZoom: function(){
    return 13;
  },

  reDraw: function(){
    var self = this;
    var zoom = this.map.getZoom();

    if (zoom < this.getMaxDisplayedZoom() || zoom > this.getMinDisplayedZoom()) {
      this.clearLayers();
      return;
    }

    if (areasGeoJsonLayer == null) {
      areasGeoJsonLayer = L.geoJSON([], {
          onEachFeature: function(feature, layer){
              if (feature.properties && feature.properties.popupContent) {
                  layer.bindPopup(feature.properties.popupContent);
              }
          },
          style: self.createStyle.bind(self)
      });

      xygrid_features.forEach(function(feature){
        areasGeoJsonLayer.addData(feature);
      });
    }

    self.clearLayers();
    areasGeoJsonLayer.addTo(self);
  },
});
