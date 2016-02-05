var apiURL = 'http://' + document.location.host + '/api';
var api = {
  getTests: function(callback) {
    return $.get(apiURL + '/tests', callback);
  },

  getTest: function(id, callback) {
    return $.get(apiURL + '/tests/' + id, callback);
  },

  createTest: function(data, callback) {
    return $.post(apiURL + '/tests', data, callback);
  },
};

function createTest(input) {
  if (input.length < 3) return false;

  api.createTest({ data: input }, function(created) {
    api.getTest(created.id, appendTest);
  });
}

function clearTests() {
  $('#tests').html('');
}

function appendTest(test) {
  $('#tests').append($('<div />').text(test.id + ': ' + test.data));
}

$(document).ready(function() {
  api.getTests(function(data) {
    clearTests();
    for (var id in data) appendTest(data[id]);
  });

  $('#input').keypress(function(event) {
    if (event.which === 13) {
      createTest($('#input').val());
      $('#input').val('');
      return false;
    }
  });

  $('#submit').click(function() {
    createTest($('#input').val());
    $('#input').val('');
  });
});
