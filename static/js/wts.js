$(document).ready(function(){
  $.getJSON('https://spreadsheets.google.com/feeds/list/1it5BH_CAJth9NuC9s1xZXjgJWtXEjE15cm4uYt0-WjQ/od6/public/values?alt=json', function(data) {
    var template = `{{#events}}
    <p><a href="{{fbevent}}">{{datestring}} - <b>{{title}}</b></a></p>
    <p><small>at <a href="/venues/{{place}}/">{{place}}</a></small></p>
    <p>{{act1}} / {{act2}}</p>
    {{/events}}`
    // format entries
    var formated_entries = data.feed.entry.map(function(el){
      var m = moment(el["gsx$date"]["$t"], "DD-MM-YYYY")
      return {
        moment: m,
        datestring: m.format("dddd, MMMM Do YYYY"),
        title: el["gsx$title"]["$t"],
        place: el["gsx$place"]["$t"],
        act1: (el["gsx$act1"]["$t"] ? el["gsx$act1"]["$t"] : "JAM!"),
        act2: (el["gsx$act2"]["$t"]),
        fbevent: el["gsx$fbevent"]["$t"],
        type: el["gsx$type"]["$t"]
      }
    }).filter(function(el){
      // filter future dates and not null values
      return (moment() < el.moment) && (el.title !== "") && (el.place !== "")
    })
    // display the first N dates
    $('#next-jam-container').html(Mustache.render(template,{events: formated_entries.filter(function(el){return el.type === "JAM"}).slice(0,3)}))
    $('#next-sc-container').html(Mustache.render(template,{events: formated_entries.filter(function(el){return el.type === "SHOWCASE"}).slice(0,3)}))
    
  });
})