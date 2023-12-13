document.addEventListener('DOMContentLoaded', function () {
    // Fetch the registration data and display performers
    fetchAndDisplayPerformers();

    // Add event listener for form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract form data
        const formData = {
            // Retrieve form fields and their values
        };

        // Send the form data to the server or process it as needed
        // Update data storage (e.g., registration.json or database)

        // Optionally, redirect to performers page after successful submission
        window.location.href = 'performers.html';
    });

    // Function to fetch and display performers
    function fetchAndDisplayPerformers() {
        // Fetch the registration data
        fetch('registration.json')
            .then(response => response.json())
            .then(data => {
                // Get the performer container
                const performerContainer = document.querySelector('.performer-container');

                // Loop through the data and create performer cards
                data.forEach(performer => {
                    // Create a performer card element
                    const performerCard = document.createElement('div');
                    performerCard.classList.add('performer-card');

                    // Create an image element
                    const img = document.createElement('img');
                    img.src = `images/${performer.PerformingName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                    img.alt = performer.PerformingName;
                    performerCard.appendChild(img);

                    // Add other performer information
                    const h2 = document.createElement('h2');
                    h2.textContent = performer.PerformingName;
                    performerCard.appendChild(h2);

                    const h3 = document.createElement('h3');
                    h3.textContent = performer.Description;
                    performerCard.appendChild(h3);

                    const h4 = document.createElement('h4');
                    h4.textContent = performer.SocialMedia;
                    performerCard.appendChild(h4);

                    // Append the performer card to the container
                    performerContainer.appendChild(performerCard);
                });
            })
            .catch(error => console.error('Error fetching registration data:', error));
    }
});



