// Get Parameters
function loadContentSearch() {
  console.log("Load: INDEXD");

  // Grab the query string
  const queryString = window.location.search;
  // console.log(queryString);

  // Parse the query string’s parameters
  const urlParams = new URLSearchParams(queryString);

  // Search any of its parameters
  const contentID = urlParams.get("id");
  const contentName = urlParams.get("d");
  const contentSlug = urlParams.get("s");
  console.log(contentID, contentName);

  // Load content to html
  $("#loadSource").append(`
  Nguồn: <a href="https://${contentName}/${contentSlug}" target="_blank">${contentName}</a> 
  `);

  // WordPress API Rule
  const wpApiPostRule = "/wp-json/wp/v2/posts?include=";

  // Fetch data
  showSpinner();
  $.ajax({
    method: "GET",
    url: `https://${contentName}${wpApiPostRule}${contentID}`,
    success: function (data) {
      console.log(data);
      var contentDisplays = "";
      data.forEach((c) => {
        contentDisplays = `<div class="content bg-body-tertiary border rounded-3 p-sm-2 p-md-3"><h1>${c.title.rendered}</h1><hr></br>${c.content.rendered}</div>`;
      });
      $("#contentDisplay").append(contentDisplays);
      hideSpinner();
    },
  });
}

// Spin before fetching
const spinner = document.getElementById("spinner");
function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 500);
}
function hideSpinner() {
  spinner.className = spinner.className.replace("show", "hidden");
}
