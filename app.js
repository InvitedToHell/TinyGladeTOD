const EVENTS_API_URL = "https://ryeland.pouncelight.games/v1/events";
const BLOB_API_URL = "http://ryeland.pouncelight.games/v1/blob/"; // We will append the CID to this URL
const outputElement = document.getElementById("langs-output");

// Function to fetch events, get the CID, fetch the corresponding zip, and extract langs.json
async function fetchAndDisplayLangs() {
  try {
    // Step 1: Fetch the events JSON
    const eventsResponse = await fetch(EVENTS_API_URL);
    const eventsData = await eventsResponse.json();

    // Step 2: Extract the CID from the events JSON
    const { cid } = eventsData;
    if (!cid) {
      throw new Error("CID not found in events data.");
    }

    // Step 3: Construct the URL to fetch the zip file
    const blobUrl = `${BLOB_API_URL}${cid}`;

    // Step 4: Fetch the zip file from the blob URL
    const blobResponse = await fetch(blobUrl);
    const blob = await blobResponse.blob();

    // Step 5: Use JSZip to unzip the file
    const zip = await JSZip.loadAsync(blob);

    // Step 6: Extract the langs.json file from the zip
    const langsJson = await zip.file("langs.json").async("string");

    // Step 7: Parse and display the langs.json content
    const langsData = JSON.parse(langsJson);
    outputElement.textContent = JSON.stringify(langsData, null, 2); // Pretty-print the JSON
  } catch (error) {
    console.error("Error fetching or processing the file:", error);
    outputElement.textContent = "Failed to load data";
  }
}

// Fetch and display data when the page loads
fetchAndDisplayLangs();
