
export default L.Control.extend({
    onAdd: function(map) {
      var div = L.DomUtil.create('div', 'leaflet-bar leaflet-custom-display');

      var hoverCoord, clickCoord;

      function updateHover(ev){
        hoverCoord = ev.latlng;
        update();
      }

      function updateClick(ev){
        clickCoord = ev.latlng;
        update();
      }

      function update(){
        var html = "";
        if (hoverCoord) {
          var xy_x = parseInt((parseInt(hoverCoord.lng) + 8192) / 128);
          var xy_y = parseInt((parseInt(hoverCoord.lat) - (4 * 128) - 8192) / -128);
          if (xy_x >= 0 && xy_x < 128 && xy_y >= 0 && xy_y < 128) {
            html = html + "<b>X,Y Coordinates (" + xy_x + "," + xy_y + ")</b> or ";
          }
          html = html + "Game Coordinates [X:" + parseInt(hoverCoord.lng) + " Z:" + parseInt(hoverCoord.lat) + "]";
        }

        //if (clickCoord)
        //  html = html + " (clicked: X=" + parseInt(clickCoord.lng) + " Z=" + parseInt(clickCoord.lat) + ")";

        div.innerHTML = html;
      }

      map.on('mousemove', updateHover);
      map.on('click', updateClick);
      map.on('touch', updateClick);

      return div;
    }
});
