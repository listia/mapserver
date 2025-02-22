package mapobject

import (
	"mapserver/coords"
	"mapserver/mapobjectdb"

	"github.com/minetest-go/mapparser"
)

type BorderBlock struct{}

func (this *BorderBlock) onMapObject(mbpos *coords.MapBlockCoords, x, y, z int, block *mapparser.MapBlock) *mapobjectdb.MapObject {
	md := block.Metadata.GetMetadata(x, y, z)

	o := mapobjectdb.NewMapObject(mbpos, x, y, z, "border")
	o.Attributes["name"] = md["name"]
	o.Attributes["index"] = md["index"]
	o.Attributes["owner"] = md["owner"]
	o.Attributes["color"] = md["color"]

	return o
}
