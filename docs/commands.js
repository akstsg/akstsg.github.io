function loadExamples() {
  fetch('examples.json')
    .then(response => response.json())
    .then(data => {
      displayExamples(data);
    })
    .catch(error => {
      console.error('Error loading examples:', error);
    });
}

function displayExamples(examples) {
  var commandList = document.getElementById('command-list');
  commandList.innerHTML = '';

  examples.forEach(function(example) {
    var li = document.createElement('li');
    li.className = 'searchable';

    var h3 = document.createElement('h3');
    h3.textContent = example.title;
    li.appendChild(h3);

    var p = document.createElement('p');
    p.textContent = example.description;
    li.appendChild(p);

    var code = document.createElement('code');
    code.textContent = example.command;
    var pre = document.createElement('pre');
    pre.appendChild(code);
    li.appendChild(pre);

    commandList.appendChild(li);
  });
}

function searchContent() {
  var input = document.getElementById('search-input').value.toLowerCase();
  var commands = document.querySelectorAll('.searchable');

  for (var i = 0; i < commands.length; i++) {
    var command = commands[i].textContent.toLowerCase();
    if (command.indexOf(input) > -1) {
      commands[i].style.display = '';
    } else {
      commands[i].style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadExamples();
});
