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

        row_elem.id = "row" + [i];
        row_elem.name = rows[i].Name;
        row_elem.games = rows[i].Games;
        row_elem.YPG = rows[i].YellowsPG;
        row_elem.RPG = rows[i].RedsPG;
        row_elem.TY = rows[i].TotalYellows;
        row_elem.TR = rows[i].TotalReds;

        name_elem.innerHTML = rows[i].Name;
        id_elem.innerHTML = rows[i].Id
        games_elem.innerHTML = rows[i].Games
        YPG_elem.innerHTML = rows[i].YellowsPG
        RPG_elem.innerHTML = rows[i].RedsPG
        TY_elem.innerHTML = rows[i].TotalYellows
        TR_elem.innerHTML = rows[i].TotalReds
        select_elem.innerHTML = '<input type="checkbox" class="box" name="group1" id="cb'+[i]+'" value="rows'+[i]+'" checked="false"><br>'

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

function getCheckboxValues(form) {
  var values = [];
  //var list = form.select;
  var boxes = document.getElementsByClassName("box")
  console.log(boxes)

  for (var i=0; i<boxes.length; i++) {
    if (boxes.item(i).checked) {
      values.push(boxes.item(i).value);
      console.log(boxes)
    }
  }
  // Do something with values
  alert("Refs " + boxes.item(0));
  return values;
}

function getSelections()
{
  var g1 = document.getElementsByName( "group1" );
  var url = "selected_refs:" + g1[0].id + "=" + g1[0].checked;
  for( var i = 1; i < g1.length; i++ )
  {
    url += "&" + g1[i].id + "=" + g1[i].checked;
  }
  console.log( url );
  var xhr = new XMLHttpRequest();
  xhr.onload = displaySelections;
  xhr.open( "get", url );
  xhr.send();
}

function displaySelections()
{
  var display_checked = JSON.parse( this.responseText );
  var the_div = document.getElementById( "the_new_table" );
  var comp_table = document.createElement( "table" );
  the_div.appendChild( comp_table );
  for (var i = 0; i < display_checked.length; i++)
  {
    var split_eq2 = display_checked[i].split("=");
    console.log(split_eq2[0])/*id index*/
    console.log(split_eq2[1])
    var id_tracker = document.getElementById(split_eq2[0])
    console.log(id_tracker)
    var split_row_id = split_eq2[0].split("b")
    console.log(split_row_id)
    var row = document.getElementById("row" + split_row_id[1])
    console.log(row);

    var row_elem = document.createElement( "tr" );
    var name_elem = document.createElement( "td" );
    var id_elem = document.createElement( "td" );
    var games_elem = document.createElement( "td" );
    var YPG_elem = document.createElement( "td" );
    var RPG_elem = document.createElement( "td" );
    var TY_elem = document.createElement( "td" );
    var TR_elem = document.createElement( "td" );
    var select_elem = document.createElement("td");

    name_elem.innerHTML = row.name ;
    id_elem.innerHTML = row.id;
    games_elem.innerHTML = row.games;
    YPG_elem.innerHTML = row.YPG;
    RPG_elem.innerHTML = row.RPG;
    TY_elem.innerHTML = row.TY;
    TR_elem.innerHTML = row.TR;

    row_elem.appendChild(name_elem)
    row_elem.appendChild(id_elem)
    row_elem.appendChild(games_elem)
    row_elem.appendChild(YPG_elem)
    row_elem.appendChild(RPG_elem)
    row_elem.appendChild(TY_elem)
    row_elem.appendChild(TR_elem)
    row_elem.appendChild(select_elem)

    comp_table.appendChild(row_elem)
  }

}
