const statusText = document.getElementById("statusText");
const eventList = document.getElementById("eventList");
const eventIdInput = document.getElementById("eventIdInput");
const findButton = document.getElementById("findButton");
const foundEvent = document.getElementById("foundEvent");

// Loads all events from the API and displays them
async function loadEvents() {
    try {
        statusText.textContent = "Loading events...";

        const response = await fetch("http://localhost:8081/api/events");
        const events = await response.json();

        eventList.innerHTML = "";

        events.forEach((event) => {
            const item = document.createElement("p");
            item.textContent = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
            eventList.appendChild(item);
        });

        statusText.textContent = `${events.length} event(s) loaded successfully.`;
    } catch (error) {
        statusText.textContent = "Failed to load events.";
    }
}

// Challenge task - find one event by ID
async function findEventById() {
    const eventId = eventIdInput.value.trim();

    try {
        const response = await fetch(`http://localhost:8081/api/events/${eventId}`);

        if (!response.ok) {
            foundEvent.textContent = `Event ${eventId} was not found.`;
            return;
        }

        const event = await response.json();
        foundEvent.textContent = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
    } catch (error) {
        foundEvent.textContent = "Something went wrong while searching.";
    }
}

findButton.addEventListener("click", findEventById);

loadEvents();