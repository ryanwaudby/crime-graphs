categories = {
};

function processEntry(entry) {
  (categories.hasOwnProperty(entry.category)) ? categories[entry.category]++ : categories[entry.category] = 1;
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(entry.location.latitude, entry.location.longitude),
      map: map,
      title: entry.location.street.name
  });

}

function createCharts() {
  data = {
    labels: [],
    datasets: [{
      label: "crimes",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: []
    }]
  };

  for (var key in categories) {
    if (categories.hasOwnProperty(key)) { data.labels.push(key); data.datasets[0].data.push(categories[key]); }
  }

  var ctx = $("#categoryChart").get(0).getContext("2d");
  ctx.canvas.width = 550;
  ctx.canvas.height = 500;
  new Chart(ctx).Bar(data);

}

function createMap() {
  var myLatlng = new google.maps.LatLng(53.393342,-2.061499);
  var mapOptions = {
    zoom: 15,
    center: myLatlng
  };
  map = new google.maps.Map(document.getElementById("locationMap"), mapOptions);
}

google.maps.event.addDomListener(window, 'load', createMap);

$.ajax({
  url: "http://data.police.uk/api/crimes-street/all-crime?lat=53.393342&lng=-2.061499",
  success: function(data) { data.forEach(function(entry) { processEntry(entry); }); createCharts(); }
});
