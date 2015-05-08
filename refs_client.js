function dawnOfTime()
{
    fillInTable()
}

function fillInTable()
{
    var value_req = new XMLHttpRequest();
    value_req.onload = tableReturned;
    value_req.open( "get", "get_table_contents" );
    value_req.send();
}

function tableReturned()
{
    var rows = JSON.parse( this.responseText );
    console.log( "alert3" );
    console.log(rows)
    var table_elem = document.getElementById( "the_table" );
    for( var i = 0; i < rows.length; i++ )
    {
        var row_elem = document.createElement( "tr" );
        var name_elem = document.createElement( "td" );
        var id_elem = document.createElement( "td" );
        var games_elem = document.createElement( "td" );
        var YPG_elem = document.createElement( "td" );
        var RPG_elem = document.createElement( "td" );
        var TY_elem = document.createElement( "td" );
        var TR_elem = document.createElement( "td" );
        var select_elem = document.createElement("td");

        name_elem.innerHTML = rows[i].Name;
        id_elem.innerHTML = rows[i].Id
        games_elem.innerHTML = rows[i].Games
        YPG_elem.innerHTML = rows[i].YellowsPG
        RPG_elem.innerHTML = rows[i].RedsPG
        TY_elem.innerHTML = rows[i].TotalYellows
        TR_elem.innerHTML = rows[i].TotalReds
        select_elem.innerHTML = '<input type="checkbox" name="selection" class="selection'+[i]+'"><br>'

        row_elem.appendChild(name_elem)
        row_elem.appendChild(id_elem)
        row_elem.appendChild(games_elem)
        row_elem.appendChild(YPG_elem)
        row_elem.appendChild(RPG_elem)
        row_elem.appendChild(TY_elem)
        row_elem.appendChild(TR_elem)
        row_elem.appendChild(select_elem)

        table_elem.appendChild(row_elem)



    }
}
