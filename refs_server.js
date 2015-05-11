var fs     = require( "fs" );
var http   = require( "http" );
var sqlite = require( "sqlite3" );

function giveBackFile( name, res )
{
    var contents = "";
    try {
    	contents = fs.readFileSync( name ).toString();
    }
    catch( e ) {
    	console.log(
    	    "Error: Something bad happened trying to open "+name );
        res.writeHead( 404 );
        res.end( "" );
        return;
    }

    res.writeHead( 200 );
    res.end( contents );
}

function sendBackTable( res )
{
    console.log( "sendBackTable" );
    var db = new sqlite.Database( "Ref_Database.sqlite" );
    var rows = null;
    db.all( "SELECT * FROM REFEREE",
        function( err, r ) {
            if( err === null )
            {
                rows = r;
                console.log("alert")
            }
            else
            {
                console.log( "Error in sendBackTable" );
                console.log( err );
            }
        } );
    db.close(
        function() {
            res.writeHead( 200 );
            if( rows !== null )
            {
                res.end( JSON.stringify( rows ) );
                console.log("alert2")
            }
            else
            {
                res.end( "Uh oh" );
            }
        }
    );
}

function checkboxVerification(req, res)
{
  console.log("verify start")
  var split_colon = req.url.split(":");
  var split_boxes = split_colon[1].split("&");
  console.log(split_boxes)
  var checked_or_not = [];
  var checked = [];
  var unchecked = [];
  for( var i = 0; i < split_boxes.length; i++)
  {
    var split_eq = split_boxes[i].split("=");
    console.log(split_eq[1]);
    checked_or_not.push(split_eq[1]);
  }


  for (var i=0; i < checked_or_not.length; i++)
  {
    var id
    var checkbox_info

    if(checked_or_not[i] == "true")
    {
      console.log("check check")
      checked.push( checked_or_not[i] );
    }
    else if(checked_or_not[i] == "false"){
      console.log("nope");
      unchecked.push( checked_or_not[i] );
    }
    else{
      console.log("somethings wrong")
    }
  }
res.writeHead( 200 );
res.end( "it worked" );
}

/*function add( req, res )
{
    var addr_and_nick = req.url.split( "?" )[1];
    var addr_and_nick_arr = addr_and_nick.split( "&" );
    var addr = addr_and_nick_arr[0].split( "=" )[1];
    var nick = addr_and_nick_arr[1].split( "=" )[1];
    var db = new sqlite.Database( "linkdb.sqlite" );

    db.run( "INSERT INTO Links ('Link','Nick') VALUES ('"+
            addr +"', '"+nick+"')",
        function( err ) {
            if( err !== null )
            {
                console.log( "Error in add" );
                console.log( err );
            }
        } );
    db.close(
        function() {
            res.writeHead( 200 );
            res.end( "" );
        } );
}
*/
function doTheServer( req, res )
{
    // console.log( "doTheServer " + req.url );
    if( req.url == "/get_table_contents" )
    {
        sendBackTable( res );
    }
    else if( req.url == "/refs_client.js" )
    {
        giveBackFile( "refs_client.js", res )
    }
    else if(req.url.substring(0,14) == "/selected_refs")
    {
      checkboxVerification(req, res)
    }
    else
    {
        giveBackFile( "refs.html", res )
    }
}

var server = http.createServer( doTheServer );
server.listen( 8080 );
