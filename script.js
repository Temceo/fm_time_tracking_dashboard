const buttons = document.querySelectorAll("button");

fetch("/data.json")
  .then((request) => {
    if (!request.ok) {
      console.log("Data not available!");
      return null;
    }

    return request.json();
  })
  .then((data) => {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        // target = daily / weekly / monthly
        const target = e.target.textContent.toLowerCase();
        data.forEach((item) => {
          // get activity - eg work, social etc
          const activity =
            item.title.split(" ").length === 1
              ? item.title.toLowerCase()
              : item.title.split(" ").join("-").toLowerCase();
          // get heading for each activity in the DOM
          const heading = document.querySelector(`.${activity}`);
          // insert current / previous time taken for chosen activity into the relevant element
          heading.querySelector(
            ".current"
          ).textContent = `${item.timeframes[target].current}hrs`;
          heading.querySelector(
            ".previous"
          ).textContent = `Last ${target} - ${item.timeframes[target].previous}hrs`;
        });
      });
    });
  });
