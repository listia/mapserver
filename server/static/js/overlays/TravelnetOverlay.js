'use strict';

var TravelnetIcon = L.icon({
  iconUrl: 'pics/travelnet_inv.png',

  iconSize:     [64, 64],
  iconAnchor:   [32, 32],
  popupAnchor:  [0, -32]
});

var TravelnetOverlay = L.LayerGroup.extend({
  initialize: function(wsChannel, layerMgr) {
    this.layerMgr = layerMgr;
    this.wsChannel = wsChannel;

    this.onLayerChange = this.onLayerChange.bind(this);
  },

  onLayerChange: function(layer){
    //TODO
  },

  onAdd: function(map) {
    this.layerMgr.addListener(this.onLayerChange);

    console.log("TravelnetOverlay.onAdd", map);

    map.on('baselayerchange', function (e) {
        console.log("baselayerchange", e.layer);
    });

    api.getMapObjects(-10,-10,-10,10,10,10,"travelnet")
    .then(function(list){
      console.log(list);
    })
  },

  onRemove: function(map) {
    this.layerMgr.removeListener(this.onLayerChange);

    console.log("TravelnetOverlay.onRemove");
  }
});
