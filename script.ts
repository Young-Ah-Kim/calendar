// Create a 2025 calendar with minimal day display and a preset image
const calendarContainer = document.createElement("div") as HTMLDivElement;
calendarContainer.id = "calendar-container";
calendarContainer.style.maxWidth = "800px"; // Increase the max width for larger cells
calendarContainer.style.margin = "20px auto";
calendarContainer.style.display = "flex";
calendarContainer.style.flexDirection = "column";
document.body.appendChild(calendarContainer);

// CSS styling
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f9f9f9;
      cursor: auto; /* Use the default cursor */
    }
    #header {
      background-color: pink; /* Updated header background color to pink */
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
    }
    .header-input {
      font-family: 'Poppins', Arial, sans-serif;
      font-size: 2em;
      color: #fff; /* Set text color to white */
      background: transparent;
      border: none;
      text-align: center;
      width: 100%;
      outline: none;
    }
    .header-input::placeholder {
      color: #ccc; /* Set placeholder color to light gray */
    }
    .day-of-week, .day {
      width: 100px; /* Set a fixed width for all day and day-of-week cells */
      height: 100px; /* Set a fixed height for all day and day-of-week cells */
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .day-of-week {
      font-weight: bold;
      text-align: center;
      background-color: #f1f1f1;
      padding: 5px;
    }
    #preset-image {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid #ddd;
      cursor: pointer; /* Add cursor pointer for preset image */
    }
    button {
      background: none;
      color: blue;
      font-size: 1.2em;
      border: none;
      cursor: pointer;
      text-decoration: underline;
    }
    button:disabled {
      color: gray;
      cursor: not-allowed;
    }
    .day {
      padding: 10px;
      margin: 2px;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      border-radius: 50%; /* Keep this line to make the border round */
    }
    .today {
      color: #FF6961; /* Set TODAY text color to light red */
      font-weight: bold; /* Make the text bold */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  </style>
`
);

// Header
const header = document.createElement("div") as HTMLDivElement;
header.id = "header";
header.style.backgroundColor = "pink"; // Set the background color of the header to pink
header.style.display = "flex";
header.style.justifyContent = "center";
header.style.alignItems = "center";
header.style.height = "100px"; // Set a height for the header
header.style.flexDirection = "column"; // Ensure the header text and preset buttons are stacked vertically

const headerInput: HTMLInputElement = document.createElement("input");
headerInput.type = "text";
headerInput.className = "header-input";
headerInput.placeholder = "칭찬 달력";
headerInput.value = "칭찬 달력";
header.appendChild(headerInput);

document.body.insertBefore(header, document.body.firstChild);

// Month header container
const monthHeaderContainer = document.createElement("div");
monthHeaderContainer.style.display = "flex";
monthHeaderContainer.style.justifyContent = "center";
monthHeaderContainer.style.alignItems = "center";
monthHeaderContainer.style.marginBottom = "10px";
document.body.insertBefore(monthHeaderContainer, calendarContainer);

// Preset image container
const presetImage = document.createElement("img") as HTMLImageElement;
presetImage.id = "preset-image";
presetImage.src = "preset1.png"; // Initial preset image
presetImage.alt = "Preset Image";
document.body.appendChild(presetImage);
// Track selected preset image
let selectedPreset = "preset1.png";
let isPresetActive = false; // Track if preset is active
let storedData = JSON.parse(localStorage.getItem("calendarData") || "{}");

// Save header input to localStorag
headerInput.addEventListener("input", () => {
  localStorage.setItem("headerInput", headerInput.value);
});

// Load header input from localStorage
const savedHeaderInput = localStorage.getItem("headerInput");
if (savedHeaderInput) {
  headerInput.value = savedHeaderInput;
}

// Change mouse cursor to preset image
presetImage.addEventListener("click", () => {
  document.body.style.cursor = `url('cursor.cur'), auto`;
  isPresetActive = true;
});

// Reset cursor and set day image
calendarContainer.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("day")) {
    const dayKey = target.dataset.key;

    if (isPresetActive) {
      // Apply preset image
      target.style.backgroundImage = `url(${selectedPreset})`;
      target.style.backgroundSize = "cover";
      target.style.backgroundPosition = "center";
      target.textContent = ""; // Remove the day number

      // Save to localStorage
      storedData[dayKey] = selectedPreset;
      localStorage.setItem("calendarData", JSON.stringify(storedData));
    } else {
      // Remove preset image and restore day number
      target.style.backgroundImage = "none";
      target.textContent = dayKey.split("-")[2]; // Extract the day from the key

      // Remove from localStorage
      delete storedData[dayKey];
      localStorage.setItem("calendarData", JSON.stringify(storedData));
    }
  }
});

// Generate 2025 calendar
const year = 2025;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentMonthIndex = 0;

function renderCalendar(monthIndex: number): void {
  calendarContainer.innerHTML = "";
  monthHeaderContainer.innerHTML = "";

  // Month header with navigation
  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.style.marginRight = "10px";
  prevButton.disabled = monthIndex === 0;
  prevButton.addEventListener("click", () => {
    if (monthIndex > 0) {
      renderCalendar(monthIndex - 1);
    }
  });

  const monthHeader = document.createElement("h2");
  monthHeader.textContent = `${months[monthIndex]} ${year}`;
  monthHeader.style.textAlign = "center";

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.style.marginLeft = "10px";
  nextButton.disabled = monthIndex === months.length - 1;
  nextButton.addEventListener("click", () => {
    if (monthIndex < months.length - 1) {
      renderCalendar(monthIndex + 1);
    }
  });

  monthHeaderContainer.appendChild(prevButton);
  monthHeaderContainer.appendChild(monthHeader);
  monthHeaderContainer.appendChild(nextButton);

  // Render day headers
  const daysHeaderContainer = document.createElement("div");
  daysHeaderContainer.style.display = "grid";
  daysHeaderContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  daysOfWeek.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-of-week";
    dayHeader.textContent = day;
    daysHeaderContainer.appendChild(dayHeader);
  });
  calendarContainer.appendChild(daysHeaderContainer);

  // Get the first day of the month and total days
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Get today's date
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Days container
  const daysContainer = document.createElement("div");
  daysContainer.style.display = "grid";
  daysContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
  daysContainer.style.gap = "0";

  // Add empty cells for the first week
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "day";
    emptyCell.style.visibility = "hidden";
    daysContainer.appendChild(emptyCell);
  }

  // Render days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayKey = `${year}-${monthIndex}-${day}`;
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day.toString();
    dayElement.dataset.key = dayKey; // Add unique key for each day

    // Load from localStorage
    if (storedData[dayKey]) {
      dayElement.style.backgroundImage = `url(${storedData[dayKey]})`;
      dayElement.style.backgroundSize = "cover";
      dayElement.style.backgroundPosition = "center";
      dayElement.textContent = ""; // Remove the day number
    }

    // Highlight today's date
    if (day === todayDate && monthIndex === todayMonth && year === todayYear) {
      dayElement.classList.add("today");
      const todayText = document.createElement("div");
      todayText.textContent = "TODAY";
      dayElement.appendChild(todayText);
    }

    daysContainer.appendChild(dayElement);
  }

  calendarContainer.appendChild(daysContainer);
}

renderCalendar(currentMonthIndex);
