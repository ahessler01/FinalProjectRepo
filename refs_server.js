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
  var id_check = []
  var checked = [];
  var unchecked = [];
  for( var i = 0; i < split_boxes.length; i++)
  {
    var split_eq = split_boxes[i].split("=");
    console.log(split_eq[0])
    console.log(split_eq[1]);
    checked_or_not.push(split_eq[1]);
    id_check.push(split_eq[0])
  }


  for (var i=0; i < checked_or_not.length; i++)
  {
    var id =[]
    var checkbox_info

    if(checked_or_not[i] == "true")
    {
      console.log("check check")
      checked.push( id_check[i] + "=" + checked_or_not[i] );
    }
    else if(checked_or_not[i] == "false"){
      console.log("nope");
      unchecked.push( id_check[i] + "=" + checked_or_not[i] );
    }
    else{
      console.log("somethings wrong")
    }
  }
  console.log(checked)
  //console.log(checked.getElementById())


res.writeHead( 200 );
res.end( JSON.stringify(checked) );
}

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
