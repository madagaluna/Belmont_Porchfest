document.addEventListener('DOMContentLoaded', function () {

    const photoInput = document.getElementById('photo');

    if (photoInput) {
        photoInput.addEventListener('change', function () {
            const allowedExtensions = /(\.jpg)$/i;
            const errorElement = document.getElementById('photoError');

            if (!allowedExtensions.test(photoInput.value)) {
                errorElement.textContent = 'Please upload a valid JPG file.';
                photoInput.value = ''; // Clear the input to prevent submitting invalid data
            } else {
                errorElement.textContent = '';
            }
        });
    }

    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Extract form data
            const formData = {
                coordinator: document.getElementById('coordinator').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                email: document.getElementById('email').value,
                performanceType: document.getElementById('performanceType').value,
                performingName: document.getElementById('performingName').value,
                description: document.getElementById('description').value,
                socialMedia: document.getElementById('socialMedia').value,
                otherMedia: document.getElementById('otherMedia').value,
                additionalLinks: document.getElementById('additionalLinks').value,
                loudness: document.getElementById('loudness').value,
                performanceAddress: document.getElementById('performanceAddress').value + ', Belmont Porchfest 02478',
                startTime: document.getElementById('startTime').value,
                performanceLength: document.getElementById('performanceLength').value,
                // no photo, not sure how to handle this - server??
            };

            // upload separately?
            const photoInput = document.getElementById('photo');
            const photoFile = photoInput.files[0]; // <- This is the actual file object

            // Fetch and display performers again to reflect the updated data
            fetchAndDisplayPerformers();

            // Redirect to performers page after successful submission
            window.location.href = 'performers.html';
        });
    }

    // Function to fetch and display performers
    function fetchAndDisplayPerformers() {
        // Fetch the updated registration data
        fetch('registration.json')
            .then(response => response.json())
            .then(data => {
                // Get all performer containers
                const performerContainers = document.querySelectorAll('.performer-container');

                // Loop through the data and create performer cards for each container
                performerContainers.forEach((container, index) => {
                    // Assuming each container has a corresponding entry in the data array - this may not work cuz some fields are blank??? nvrmind, cleaned json.
                    const performer = data[index];

                    // Create a performer card element
                    const performerCard = document.createElement('div');
                    performerCard.classList.add('performer-card');

                    // Create an image element
                    const img = document.createElement('img');
                    img.src = `images/${performer.Image}`;
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
                    container.appendChild(performerCard);
                });
            })
            .catch(error => console.error('Error fetching registration data:', error));
    }

    // Fetch and display performers initially
    fetchAndDisplayPerformers();
});

