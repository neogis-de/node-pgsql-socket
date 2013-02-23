Real Time Connection PostgreSQL + NodeJS
========================================

Real Time Connection with Node - PostgreSQL using WebSocket socket.io.
While usually using polling connection between apps to database server, this method using PostgreSQL with PL/Python pushin new or modified data to the app otherwise through web socket via node.js.
So basically, it's a real real time connections. This one is from tutorial at my blog, lontongcorp.com

More info please visit [my blog](http://www.lontongcorp.com/2013/01/18/real-time-connection-dengan-postgresql-nodejs/)


Requirements
------------

### PostgreSQL

Because I am focus on GeoIT, so PostGIS and hStore extension are installed automatically beside the PL/Py language
Output to be in GeoJSON format. See SendSocket.sql for more info.

*   Python 2.6 or above
*   PostgreSQL 9.0 or above
*   PL/Python language
*   PostGIS 2.0
*   HStore Extension

Install SendSocket.sql:

    createdb -O username mydb
    psql -d mydb -U username -f SendSocket.sql


### Node

*   Express 3.x
*   Socket.io

    Since PostgreSQL will connect to App, we don't need node-pg or similar

Install dependencies:

    npm install


### Frontend (optional)

*   jQuery
*   Twitter Bootstrap


Testing
-------

    $ node server.js

Open http://localhost:3000 and try to insert data to PostgreSQL directly.
    
    INSERT INTO nama_tabel ("label", the_geom) VALUES ('test', ST_GeomFromText( 'POINT(107.623590 -6.894190)', 4326) );
    UPDATE nama_tabel SET the_geom = ST_GeomFromText( 'POINT(107.617247 -6.891333)', 4326) WHERE "label" = 'test';


Contributing
------------

1. Fork it.
2. Develop it
3. Enjoy a cup of coffee with me?
