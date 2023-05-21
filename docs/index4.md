---
layout: default
title: Search
---

<h1>Search</h1>

<input type="text" id="searchInput" placeholder="Search...">
<ul id="searchResults"></ul>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script>
  // Define your search index
  var index = lunr(function () {
    this.field('title', { boost: 10 })
    this.field('content')
    this.ref('permalink')
  });

  // Add your Markdown content to the search index
### [Browser](#tab/browser)

### [Command Line](#tab/command-line)
  {% for post in site.posts %}
    index.add({
      title: {{ post.title | jsonify }},
      content: {{ post.content | strip_html | jsonify }},
      permalink: {{ post.url | jsonify }}
    });
  {% endfor %}

  // Perform search using Lunr.js
  function performSearch(query) {
    return index.search(query).map(function(result) {
      return {
        title: result.doc.title,
        url: result.doc.permalink
      };
    });
  }

  // Update search results on input change
  document.getElementById('searchInput').addEventListener('input', function() {
    var query = this.value;
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (query.length > 0) {
      var results = performSearch(query);
      results.forEach(function(result) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = result.url;
        a.textContent = result.title;
        li.appendChild(a);
        resultsContainer.appendChild(li);
      });
    }
  });
</script>
