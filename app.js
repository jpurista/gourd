$(document).ready(function () {
	const apiKey = "AIzaSyCcGmzXNzCRzGMsUXLtWUCALm0PKbrE-zA";
	const customSearchEngineId = "41b83de86f7ca428d";

	const queriesArray = [
		"burger king",
		"gourds",
		"capital one",
		"justworks",
		"carnegie mellon university",
		"university of pittsburgh",
        "university of massachusetts amherst",
	];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
    
    shuffleArray(queriesArray);
    const queries = new Set(queriesArray);

	function fetchResults(queries) {
		queries.forEach((query) => {
			$.ajax({
				url: `https://www.googleapis.com/customsearch/v1?cx=${customSearchEngineId}&q=${query}&searchType=image&imgSize=large&num=2&start=1&key=${apiKey}`,
				dataType: "json",
				success: function (data) {
					displayResults(data.items, query);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.error("Error fetching data:", errorThrown);
				},
			});
		});
	}

	function displayResults(items, query) {
		const content = $("#content");

		items.forEach((item) => {
			const card = `
                  <div class="col-md-4">
                    <div class="card">
                      <a href="${item.image.contextLink}" target="_blank">
                        <img src="${item.link}" class="card-img-top" alt="${item.title}">
                      </a>
                      <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${query}</p>
                      </div>
                    </div>
                  </div>`;
			content.append(card);
		});
	}

	fetchResults(queries);
});
