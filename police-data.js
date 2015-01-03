categories = {
};

function processEntry(entry) {
  (categories.hasOwnProperty(entry.category)) ? categories[entry.category]++ : categories[entry.category] = 0;
}

$.ajax({
  url: "http://data.police.uk/api/crimes-street/all-crime?lat=53.393342&lng=-2.061499",
  success: function(data) { data.forEach(function(entry) { processEntry(entry); }); }
});
