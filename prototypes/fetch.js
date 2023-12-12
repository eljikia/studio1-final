// Define the URL of the GitHub API endpoint
const apiUrl = 'https://api.github.com/repos/NationalGalleryOfArt/opendata';

// Use the fetch API to make a GET request to the GitHub API
fetch(apiUrl)
  .then(response => {
    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response JSON
    return response.json();
  })
  .then(data => {
    // Data contains the JSON response from the API
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
// Function to fetch data from the API and update the DOM
// Function to fetch data from the API and update the DOM
async function fetchDataAndDisplay() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Log the fetched data to the console
    console.log('Fetched data:', data);

    const repoNameElement = document.getElementById('repo-name');
    const repoDescriptionElement = document.getElementById('repo-description');

    repoNameElement.textContent = data.name;
    repoDescriptionElement.textContent = data.description;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
