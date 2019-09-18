import AbstractGeoJsonOverlay from './AbstractGeoJsonOverlay.js';

export default AbstractGeoJsonOverlay.extend({
  initialize: function() {
    AbstractGeoJsonOverlay.prototype.initialize.call(this, "protector");
  },

  getMaxDisplayedZoom: function(){
    return 11;
  },

  createFeature: function(protector){
    return {
      "type":"Feature",
      "geometry": {
        "type":"Polygon",
        "coordinates":[[
            [protector.x-5,protector.z-5],
            [protector.x-5,protector.z+6],
            [protector.x+6,protector.z+6],
            [protector.x+6,protector.z-5],
            [protector.x-5,protector.z-5]
        ]]
      },
      "properties":{
          "name": protector.attributes.owner,
          "popupContent": protector.attributes.owner
      }
    };
  }
});
