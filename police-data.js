categories = {
};

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function processEntry(entry) {
  (categories.hasOwnProperty(entry.category)) ? categories[entry.category]++ : categories[entry.category] = 1;
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
  console.log(data);

  var ctx = $("#categoryChart").get(0).getContext("2d");
  ctx.canvas.width = 500;
  ctx.canvas.height = 500;
  new Chart(ctx).Bar(data);

}

$.ajax({
  url: "http://data.police.uk/api/crimes-street/all-crime?lat=53.393342&lng=-2.061499",
  success: function(data) { data.forEach(function(entry) { processEntry(entry); }); createCharts(); }
});
