// Handle form submission for reservations
const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(reservationForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const partySize = formData.get('party-size');
    const date = formData.get('date');
    const time = formData.get('time');

    // Make an API call to submit the reservation
    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            partySize,
            date,
            time
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display a success message
                const successMessage = document.getElementById('reservation-success-message');
                successMessage.style.display = 'block';
            } else {
                // Display an error message
                const errorMessage = document.getElementById('reservation-error-message');
                errorMessage.style.display = 'block';
            }
        });
});

// Check availability for reservations
const checkAvailabilityButton = document.getElementById('check-availability-button');
checkAvailabilityButton.addEventListener('click', () => {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Make an API call to check availability
    fetch(`/api/reservations/availability?date=${date}&time=${time}`)
        .then(response => response.json())
        .then(data => {
            if (data.available) {
                // Display a message indicating availability
                const availabilityMessage = document.getElementById('availability-message');
                availabilityMessage.textContent = `The selected date and time are available.`;
                availabilityMessage.style.color = 'green';
            } else {
                // Display a message indicating unavailability
                const availabilityMessage = document.getElementById('availability-message');
                availabilityMessage.textContent = `The selected date and time are not available.`;
                availabilityMessage.style.color = 'red';
            }
        });
});
