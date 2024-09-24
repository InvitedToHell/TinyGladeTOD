async function fetchAndDisplayLangs() {
  try {
    // Fetch langs.json
    const langsJson = `[
    "Castle on a Cliff",
    "Burg an der Klippe",
    "Castillo en acantilado",
    "Château sur une falaise",
    "Castello sul dirupo",
    "崖に立つ城",
    "절벽 위의 성",
    "Zamek na urwisku",
    "Castelo no Penhasco",
    "Замок на утесе",
    "Slott på klippa",
    "Uçurumdaki Kale",
    "Замок на кручі",
    "高崖城堡"
]`;
    const langsArray = JSON.parse(langsJson);

    // Fetch meta.json
    const metaJson = `{"state":{"glade":"Autumn"},"version":1}`;
    const metaData = JSON.parse(metaJson);

    // Set background based on the state.glade value
    setBackground(metaData.state.glade);

    // Initialize the language dropdown and display
    setupLanguageSelector(langsArray);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

function setBackground(gladeState) {
  const body = document.body;
  let backgroundImage = "";

  // Set the background image based on the glade state
  switch (gladeState) {
    case "Summer":
      backgroundImage = 'url("assets/summer.jpg")';
      break;
    case "Winter":
      backgroundImage = 'url("assets/winter.jpg")';
      break;
    case "Flowery":
      backgroundImage = 'url("assets/flowery.jpg")';
      break;
    case "Autumn":
      backgroundImage = 'url("assets/autumn.jpg")';
      break;
    case "Olden":
      backgroundImage = 'url("assets/olden.jpg")';
      break;
    default:
      backgroundImage = 'url("assets/default.jpg")'; // Fallback image
  }

  // Apply the background image to the body
  body.style.backgroundImage = backgroundImage;
  body.style.height = "100%";
}

function setupLanguageSelector(langsArray) {
  const selectElement = document.getElementById("lang-select");
  const outputElement = document.getElementById("langs-output");

  // List of language options (you can adjust these names as needed)
  const languageOptions = [
    "English",
    "German",
    "Spanish",
    "French",
    "Italian",
    "Japanese",
    "Korean",
    "Polish",
    "Portuguese",
    "Russian",
    "Swedish",
    "Turkish",
    "Ukrainian",
    "Chinese",
  ];

  // Populate the dropdown with language options
  languageOptions.forEach((language, index) => {
    const option = document.createElement("option");
    option.value = index; // Use the index to reference the language in the array
    option.textContent = language;
    selectElement.appendChild(option);
  });

  // Display the default language (English, first item in array)
  outputElement.textContent = langsArray[0];

  // Add event listener to update the text when language changes
  selectElement.addEventListener("change", function () {
    const selectedLangIndex = selectElement.value;
    outputElement.textContent = langsArray[selectedLangIndex];
  });
}

// Call the function to fetch data and initialize the page
fetchAndDisplayLangs();
