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
        games_elem.innerHTML = rows[i].Games
        YPG_elem.innerHTML = rows[i].YellowsPG
        RPG_elem.innerHTML = rows[i].RedsPG
        TY_elem.innerHTML = rows[i].TotalYellows
        TR_elem.innerHTML = rows[i].TotalReds
        select_elem.innerHTML = '<input type="checkbox" class="box" name="group1" id="cb'+[i]+'" value="rows'+[i]+'" autocomplete="off"><br>'
        row_elem.appendChild(name_elem)
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

function clearSelectionTable(the_new_table)
{
  var table_to_be_cleared = document.getElementById("the_new_table").innerHTML = ""
}

function displaySelections()
{
  clearSelectionTable(the_new_table)
  var display_checked = JSON.parse( this.responseText );
  var the_div = document.getElementById( "the_new_table" );
  var comp_table = document.createElement("table")
  var comp_head = comp_table.createTHead();
  var comp_tbody = document.createElement("tbody")

  the_div.appendChild(comp_table)
  comp_table.appendChild(comp_head)
  comp_table.appendChild(comp_tbody)

  comp_table.border="1"
  comp_table.style="width:100%"

  var name_head = document.createElement( "th");
  name_head.innerHTML = "Name"
  comp_head.appendChild(name_head)
  var id_head = document.createElement("th");
  id_head.innerHTML = "Id"
  comp_head.appendChild(id_head)
  var game_head = document.createElement("th");
  game_head.innerHTML = "Games"
  comp_head.appendChild(game_head)
  var YPG_head = document.createElement("th");
  YPG_head.innerHTML = "Average yellows per game";
  comp_head.appendChild(YPG_head);
  var RPG_head = document.createElement("th");
  RPG_head.innerHTML = "Average reds per game";
  comp_head.appendChild(RPG_head);
  var TY_head = document.createElement("th");
  TY_head.innerHTML = "Total yellows in season"
  comp_head.appendChild(TY_head);
  var TR_head = document.createElement("th");
  TR_head.innerHTML = "Total reds in season";
  comp_head.appendChild(TR_head);

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
