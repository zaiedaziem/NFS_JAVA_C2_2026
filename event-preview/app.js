const events = [
  {
    id: "EV001",
    title: "Tech Career Fair",
    date: "2026-08-10",
    venue: "Kuala Lumpur Convention Centre",
    availableSeats: 120
  },
  {
    id: "EV002",
    title: "Web Development Bootcamp",
    date: "2026-08-15",
    venue: "Digital Learning Hub",
    availableSeats: 35
  },
  {
    id: "EV003",
    title: "AI for Business Workshop",
    date: "2026-08-20",
    venue: "Innovation Centre",
    availableSeats: 50
  }
];

// Select the elements from the HTML
const eventList = document.getElementById("eventList");
const statusText = document.getElementById("statusText");

// Create a list item for each event and add it to the page
events.forEach((event) => {
    const listItem = document.createElement("li");

    let text = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;

    // Challenge Task: flag events with less than 50 available seats
    if (event.availableSeats < 50) {
        text += " - Limited seats";
    }

    listItem.textContent = text;
    eventList.appendChild(listItem);
});

// Update the status message after events are displayed
statusText.textContent = `${events.length} event(s) displayed.`;
