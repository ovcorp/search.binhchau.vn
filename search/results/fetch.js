/**
 * Name: Fetching function
 * Version: 1.0
 * Author: GACO.vn
 * =====================================*/

// Get Data v2 Form URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url = urlParams.get("furl");
const number = urlParams.get("fnumber");
// WordPress API
const wpUrlApiPluginVersion = "/wp-json/wp/v2/posts?_embed";
const wpUrlApiPluginFields = "&per_page=";
// Print resource for user policy
$("#p1").append("Tìm kiếm trên: ", url);
$("#p2").append(number, " kết quả");
/**
 * Get Blog Posts
 */
getBlogPosts(url, number);
function getBlogPosts(url, number) {
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
  showSpinner();
  // Put Placeholder before fetching
  function putPlaceholders() {}
  // Ajax Fetching
  $.ajax({
    method: "GET",
    url: `https://${url}${wpUrlApiPluginVersion}${wpUrlApiPluginFields}${number}`,
    success: function (data) {
      console.log(data);
      var result = "";
      data.forEach((post) => {
        const { id, link, title, date, slug, status } = post;
        result += `
        <tr>
        <td><a href="/search/queries/?d=${url}&id=${id}&s=${slug}">${title.rendered}</a></a></td>     
        <td>${id}</td>    
        <td>${date}</td>    
        </tr>
        `;
      });
      // Return data
      $("#data").append(result);
      // Hide Spin
      hideSpinner();
    },
  });
}
/**
 * END
 * =====================================*/
