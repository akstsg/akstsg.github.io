<!DOCTYPE html>
<html>
<head>
  <title>Command Reference</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .search-box {
      display: flex;
      margin-bottom: 20px;
    }
    .search-box input[type="text"] {
      flex: 1;
      padding: 10px;
      font-size: 16px;
    }
    .search-box input[type="submit"] {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }
    .navigation {
      margin-bottom: 20px;
    }
    .navigation a {
      margin-right: 10px;
      color: #333;
      text-decoration: none;
    }
    h1 {
      color: #333;
    }
    p {
      line-height: 1.5;
    }
    .search-results {
      margin-top: 20px;
    }
    .search-results ul {
      list-style-type: none;
      padding: 0;
    }
    .search-results li {
      margin-bottom: 10px;
    }
    .search-results h3 {
      margin: 0;
      font-size: 18px;
    }
    .search-results p {
      margin: 0;
      font-size: 14px;
    }
  </style>
  <script>
    function searchContent(event) {
      if (event.keyCode === 13) { // Check if Enter key is pressed
        var input = document.getElementById("search-input").value.toLowerCase();
        var searchResults = document.getElementById("search-results");
        searchResults.innerHTML = "";

        // Search commands.json
        fetch('https://raw.githubusercontent.com/akstsg/akstsg.github.io/main/docs/commands.json')
          .then(response => response.json())
          .then(commands => {
            var filteredCommands = commands.filter(command =>
              command.title.toLowerCase().includes(input) ||
              command.description.toLowerCase().includes(input) ||
              command.command.toLowerCase().includes(input)
            );

            if (filteredCommands.length > 0) {
              var commandsList = document.createElement("ul");
              filteredCommands.forEach(command => {
                var commandItem = document.createElement("li");
                var commandTitle = document.createElement("h3");
                commandTitle.textContent = command.title;
                var commandDescription = document.createElement("p");
                commandDescription.textContent = command.description;

                commandItem.appendChild(commandTitle);
                commandItem.appendChild(commandDescription);
                commandsList.appendChild(commandItem);
              });
              searchResults.appendChild(commandsList);
            }
          });

        // Search issues.json
        fetch('https://raw.githubusercontent.com/akstsg/akstsg.github.io/main/docs/issues.json')
          .then(response => response.json())
          .then(issues => {
            var filteredIssues = issues.filter(issue =>
              issue.title.toLowerCase().includes(input) ||
              issue.description.toLowerCase().includes(input) ||
              issue.solution.toLowerCase().includes(input)
            );

            if (filteredIssues.length > 0) {
              var issuesList = document.createElement("ul");
              filteredIssues.forEach(issue => {
                var issueItem = document.createElement("li");
                var issueTitle = document.createElement("h3");
                issueTitle.textContent = issue.title;
                var issueDescription = document.createElement("p");
                issueDescription.textContent = issue.description;

                issueItem.appendChild(issueTitle);
                issueItem.appendChild(issueDescription);
                issuesList.appendChild(issueItem);
              });
              searchResults.appendChild(issuesList);
            }
          })
          .catch(error => console.error(error));
      }
    }
  </script>
</head>
<body>
  <div class="container">
    <h1>Command Reference</h1>
    <div class="search-box">
      <input type="text" id="search-input" placeholder="Search commands and issues..." onkeydown="searchContent(event)">
      <input type="submit" value="Search">
    </div>
    <div class="navigation">
      <a href="commands.html">Commands</a>
      <a href="issues.html">Common Issues</a>
    </div>
    <h2>Main Page Content</h2>
    <p>This is the main page content.</p>
    <div class="search-results" id="search-results"></div>
  </div>
</body>
</html>
