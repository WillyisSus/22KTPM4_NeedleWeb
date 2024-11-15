fetch("header.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("#mobile-header").innerHTML = data;
  });
