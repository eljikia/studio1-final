// const artistData; // Variable to store CSV data for artists
// import compromise from 'compromise';

// Step 1: Load the CSV data for artists
let artistData;
console.log(compromise);

// Step 1: Load the CSV data for artists
d3.csv("final_table.csv").then(function (data) {
    artistData = data;
    populateArtistDropdown(artistData);
    analyzeThemes(artistData);  // Call analyzeThemes with the loaded data
    displayArtworks(artist)

});
// Step 2: Function to populate the artist dropdown with unique names
function populateArtistDropdown(data) {
    const uniqueArtists = getUniqueArtists(data);

    $(".artist-select").select2({
        data: uniqueArtists,
        placeholder: "Select or type an artist",
        allowClear: true,
    });

    // Event listener to update input field and display artworks
    $(".artist-select").on("select2:select", function (e) {
        const selectedArtist = e.params.data.id;
        const artist = artistData.find(function (d) {
            return d.attribution === selectedArtist;

        });

        if (artist) {
            displayArtworks(artist);
            console.log("Selected Artist:", artist);


        } else {
            clearArtworks();
            console.log("Artist not found in artistData:");
        }

        // if (artist) {
        //     console.log("Selected Artist:", artist);
        //     // Log the room associated with the selected artist
        //     console.log("Room Associated with the Artist:", artist.room);
        //     // Additional functions can be called here as needed
        // } else {
        //     console.log("Artist not found in artistData:", selectedArtist);
        //     clearArtworks();
        // }
    });

    // Event listener for clearing selection
    $(".artist-select").on("select2:unselect", function (e) {
        clearArtworks();
    });
}

// Step 3: Function to get unique artist names
function getUniqueArtists(data) {
    const artistSet = new Set();
    data.forEach(function (d) {
        artistSet.add(d.attribution);
    });
    return Array.from(artistSet);

}

// Step 4: Event listener to update input field and display artworks
d3.select("#artistInput").on("input", function () {
    const inputText = this.value.toLowerCase();
    const selectedArtist = artistData.find(function (d) {
        return d.attribution.toLowerCase().includes(inputText);
    });

    if (selectedArtist) {
        displayArtworks(selectedArtist);
        console.log("Selected Artist:", artist);

    } else {
        clearArtworks();
    }

});



// ... (your existing code)

function displayArtworks(artist) {
    console.log("Displaying artworks for artist:", artist);

    const artworksContainer = d3.select("#artworksContainer");
    artworksContainer.html(""); // Clear previous content

    const artworks = artistData.filter(function (d) {
        return d.attribution === artist.attribution;
    });

    const div = artworksContainer
        .append("div")
        .style("display", "flex"); // Add a flex container for images

    const images = div
        .selectAll("img")
        .data(artworks)
        .enter()
        .append("img")
        .attr("src", function (d) {
            return d.iiifthumburl;
        })
        .attr("alt", function (d) {
            return d.title;
        })
        .on("click", function (d) {
            alert("Image URL: " + d.iiifthumburl);
        });

    // Apply the 'no-location' class with reduced opacity
    images.classed("no-location", function (d) {
        return d.locationid === "NA";
    });

    // Event listener for images with 'no-location' class
    images.filter(".no-location")
        .style("opacity", 0.3);

    // Highlight the corresponding rectangle based on the selected room
    artworks.forEach(function (artwork) {
        const selectedRoom = artwork.room;
        if (selectedRoom) {
            // Remove existing classes
            d3.selectAll(".selected-room").classed("selected-room", false);

            // Add class to highlight the selected room
            d3.select(`#${selectedRoom} rect`).classed("selected-room", true);
        }
        console.log("Selected Room:", selectedRoom);
    });
}


// // Step 8: Function to clear the displayed artworks
// function clearArtworks() {
//     const artworksContainer = d3.select("#artworksContainer");
//     artworksContainer.html(""); // Clear the container

//     // Reset the fill color of all rectangles to the default color
//     d3.selectAll("rect").attr("fill", "black");
// }

function analyzeThemes(data) {
    // Check if data is available
    if (!data || data.length === 0) {
        console.log('No data or empty dataset.');
        return;
    }

    // Extract text from the 'title' column
    const titleText = data.map(d => d.title ? d.title.toLowerCase() : '').join(' ');

    // Check if titleText is empty
    if (!titleText.trim()) {
        console.log('No titles found or titles are empty.');
        return;
    }

    // Use 'compromise' to analyze the text and identify themes
    const doc = compromise(titleText);
    const themes = doc.nouns().out('array');

    // Log the raw list of identified nouns
    console.log('Themes:', themes);

    // Display the top 10 themes
    const topThemes = themes.slice(0, 10);
    console.log('Top 10 Themes:', topThemes);
}


