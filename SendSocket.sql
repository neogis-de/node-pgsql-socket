-- comment out below to include creating the database --
-- CREATE DATABASE mydb;
CREATE EXTENSION hstore;
CREATE EXTENSION postgis;


-- Create new PostGIS table: nama_tabel.
-- Add or Edit as you like
CREATE TABLE "nama_tabel" (
    gid serial,
    "label" varchar(80)
 );
ALTER TABLE "nama_tabel" ADD PRIMARY KEY (gid);
SELECT AddGeometryColumn('poi','the_geom', '4326','POINT',2);


-- function SendSocket() to send fix data --
CREATE OR REPLACE FUNCTION SendSocket(prop character varying, geom character varying)
  RETURNS integer AS
$$
  import json
  from socketIO_client import SocketIO
  try:
    geo = json.JSONEncoder().encode(json.loads(geom))
    res = '{"geometry":%s, "properties":%s}' % (geo, prop)
    ws = SocketIO("localhost", 3000)
    ws.emit('pgsql', res)
    return 1
  except:
    raise
    return 0
$$
  LANGUAGE plpythonu VOLATILE;
-- function SendToSocket() - get updated data, prepare and parse to send --
CREATE OR REPLACE FUNCTION SendToSocket()
RETURNS trigger AS
$$
   import json
   try:
      del TD["new"]["gid"]
      geom = TD["new"]["the_geom"]
      del TD["new"]["the_geom"]
      qy = plpy.prepare("SELECT SendSocket( $1, (SELECT ST_AsGeoJSON($2) AS geometry) )", ["text", "geometry"])
      rv = plpy.execute(qy,[ json.dumps(TD["new"]), geom])
   except:
        raise
$$
LANGUAGE plpythonu VOLATILE;
-- trigger if there's new data --
DROP TRIGGER IF EXISTS sendmetosocket ON nama_tabel CASCADE;
CREATE TRIGGER sendmetosocket
  AFTER INSERT
  ON nama_tabel
  FOR EACH ROW
  EXECUTE PROCEDURE SendToSocket();