NojeJS + PostgreSQL + Socket.io
===============================

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


### Node.js

*   Express 3.x
*   Socket.io

    Since PostgreSQL will connect to App, we don't need node-pg or similar


### Frontend (optional)

*   jQuery
*   Twitter Bootstrap


Installation
------------

### Github

    $ git clone git://github.com/lontongcorp/node-pgsql-socket.git

### NPM

    $ npm install node-pgsql-socket [-g]


Testing
-------

    $ node server.js

Open http://localhost:3000 and try to insert data to PostgreSQL directly.
    
    INSERT INTO nama_tabel ("label", the_geom) VALUES ('test', ST_GeomFromText( 'POINT(107.623590 -6.894190)', 4326) );

    UPDATE nama_tabel SET the_geom = ST_GeomFromText( 'POINT(107.617247 -6.891333)', 4326) WHERE "label" = 'test';


License
-------
The MIT License

Copyright (c)2012 Erick Tampubolon (lontongcorp@gmail.com). All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
