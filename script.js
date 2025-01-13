// Create a 2025 calendar with minimal day display and a preset image
var calendarContainer = document.createElement("div");
calendarContainer.id = "calendar-container";
calendarContainer.style.maxWidth = "800px"; // Increase the max width for larger cells
calendarContainer.style.margin = "20px auto";
calendarContainer.style.display = "flex";
calendarContainer.style.flexDirection = "column";
document.body.appendChild(calendarContainer);
// CSS styling
document.head.insertAdjacentHTML("beforeend", "\n  <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <link href=\"https://fonts.googleapis.com/earlyaccess/notosanskr.css\" rel=\"stylesheet\">\n  <style>\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: 'Noto Sans', 'Noto Sans KR', Arial, sans-serif;\n      background-color: #f9f9f9;\n      cursor: auto; /* Use the default cursor */\n    }\n    #header {\n      background-color: pink; /* Updated header background color to pink */\n      padding: 20px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      height: 100px;\n      position: relative;\n    }\n    .header-input {\n      font-family: 'Noto Sans', 'Noto Sans KR', Arial, sans-serif;\n      font-size: 2em;\n      color: #fff; /* Set text color to white */\n      background: transparent;\n      border: none;\n      text-align: center;\n      width: 100%;\n      outline: none;\n    }\n    .header-input::placeholder {\n      color: #ccc; /* Set placeholder color to light gray */\n    }\n    .hamburger-menu {\n      position: absolute;\n      left: 20px;\n      top: 20px;\n      width: 30px;\n      height: 30px;\n      cursor: pointer;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n    .hamburger-menu span {\n      display: block;\n      width: 100%;\n      height: 4px;\n      background-color: #fff;\n    }\n    .day-of-week, .day {\n      width: 100px; /* Set a fixed width for all day and day-of-week cells */\n      height: 100px; /* Set a fixed height for all day and day-of-week cells */\n      box-sizing: border-box;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    .day-of-week {\n      font-weight: bold;\n      text-align: center;\n      background-color: #f1f1f1;\n      padding: 5px;\n    }\n    #preset-image {\n      position: absolute;\n      top: 20px;\n      right: 20px;\n      width: 100px;\n      height: 100px;\n      border-radius: 50%;\n      border: 2px solid #ddd;\n      cursor: pointer; /* Add cursor pointer for preset image */\n    }\n    button {\n      background: none;\n      color: blue;\n      font-size: 1.2em;\n      border: none;\n      cursor: pointer;\n      text-decoration: underline;\n    }\n    button:disabled {\n      color: gray;\n      cursor: not-allowed;\n    }\n    .day {\n      padding: 10px;\n      margin: 2px;\n      cursor: pointer;\n      text-align: center;\n      box-sizing: border-box;\n      border-radius: 50%; /* Keep this line to make the border round */\n    }\n    .today {\n      color: #FF6961; /* Set TODAY text color to light red */\n      font-weight: bold; /* Make the text bold */\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n    }\n  </style>\n  ");
// Header
var header = document.createElement("div");
header.id = "header";
header.style.backgroundColor = "pink"; // Set the background color of the header to pink
header.style.display = "flex";
header.style.justifyContent = "center";
header.style.alignItems = "center";
header.style.height = "100px"; // Set a height for the header
header.style.flexDirection = "column"; // Ensure the header text and preset buttons are stacked vertically
var hamburgerMenu = document.createElement("div");
hamburgerMenu.className = "hamburger-menu";
hamburgerMenu.innerHTML = "\n  <span></span>\n  <span></span>\n  <span></span>\n";
header.appendChild(hamburgerMenu);
var headerInput = document.createElement("input");
headerInput.type = "text";
headerInput.className = "header-input";
headerInput.placeholder = "칭찬 달력";
headerInput.value = "칭찬 달력";
header.appendChild(headerInput);
document.body.insertBefore(header, document.body.firstChild);
// Month header container
var monthHeaderContainer = document.createElement("div");
monthHeaderContainer.style.display = "flex";
monthHeaderContainer.style.justifyContent = "center";
monthHeaderContainer.style.alignItems = "center";
monthHeaderContainer.style.marginBottom = "10px";
document.body.insertBefore(monthHeaderContainer, calendarContainer);
// Preset image container
var presetImage = document.createElement("img");
presetImage.id = "preset-image";
presetImage.src = "preset1.png"; // Initial preset image
presetImage.alt = "Preset Image";
document.body.appendChild(presetImage);
// Track selected preset image
var selectedPreset = "preset1.png";
var isPresetActive = false; // Track if preset is active
var storedData = JSON.parse(localStorage.getItem("calendarData") || "{}");
// Save header input to localStorage
headerInput.addEventListener("input", function () {
    localStorage.setItem("headerInput", headerInput.value);
});
// Load header input from localStorage
var savedHeaderInput = localStorage.getItem("headerInput");
if (savedHeaderInput) {
    headerInput.value = savedHeaderInput;
}
// Change mouse cursor to preset image
presetImage.addEventListener("click", function () {
    isPresetActive = !isPresetActive;
    document.body.style.cursor = isPresetActive ? "url('cursor.cur'), auto" : 'auto';
});
// Reset cursor and set day image
calendarContainer.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("day")) {
        var dayKey = target.dataset.key;
        if (isPresetActive) {
            // Apply preset image
            target.style.backgroundImage = "url(".concat(selectedPreset, ")");
            target.style.backgroundSize = "cover";
            target.style.backgroundPosition = "center";
            target.textContent = ""; // Remove the day number
            // Save to localStorage
            storedData[dayKey] = selectedPreset;
            localStorage.setItem("calendarData", JSON.stringify(storedData));
            // Reset cursor and deactivate preset
            document.body.style.cursor = "auto";
            isPresetActive = false;
        }
        else if (storedData[dayKey]) {
            // Remove preset image
            target.style.backgroundImage = "none";
            target.textContent = dayKey.split("-")[2]; // Restore the day number
            // Remove from localStorage
            delete storedData[dayKey];
            localStorage.setItem("calendarData", JSON.stringify(storedData));
        }
    }
});
// Generate 2025 calendar
var year = 2025;
var months = [
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
var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var currentMonthIndex = 0;
function renderCalendar(monthIndex) {
    calendarContainer.innerHTML = "";
    monthHeaderContainer.innerHTML = "";
    // Month header with navigation
    var prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.style.marginRight = "10px";
    prevButton.disabled = monthIndex === 0;
    prevButton.addEventListener("click", function () {
        if (monthIndex > 0) {
            renderCalendar(monthIndex - 1);
        }
    });
    var monthHeader = document.createElement("h2");
    monthHeader.textContent = "".concat(months[monthIndex], " ").concat(year);
    monthHeader.style.textAlign = "center";
    var nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.style.marginLeft = "10px";
    nextButton.disabled = monthIndex === months.length - 1;
    nextButton.addEventListener("click", function () {
        if (monthIndex < months.length - 1) {
            renderCalendar(monthIndex + 1);
        }
    });
    monthHeaderContainer.appendChild(prevButton);
    monthHeaderContainer.appendChild(monthHeader);
    monthHeaderContainer.appendChild(nextButton);
    // Render day headers
    var daysHeaderContainer = document.createElement("div");
    daysHeaderContainer.style.display = "grid";
    daysHeaderContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
    daysOfWeek.forEach(function (day) {
        var dayHeader = document.createElement("div");
        dayHeader.className = "day-of-week";
        dayHeader.textContent = day;
        daysHeaderContainer.appendChild(dayHeader);
    });
    calendarContainer.appendChild(daysHeaderContainer);
    // Get the first day of the month and total days
    var firstDay = new Date(year, monthIndex, 1).getDay();
    var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    // Get today's date
    var today = new Date();
    var todayDate = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();
    // Days container
    var daysContainer = document.createElement("div");
    daysContainer.style.display = "grid";
    daysContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
    daysContainer.style.gap = "0";
    // Add empty cells for the first week
    for (var i = 0; i < firstDay; i++) {
        var emptyCell = document.createElement("div");
        emptyCell.className = "day";
        emptyCell.style.visibility = "hidden";
        daysContainer.appendChild(emptyCell);
    }
    var _loop_1 = function (day) {
        var dayKey = "".concat(year, "-").concat(monthIndex, "-").concat(day);
        var dayElement = document.createElement("div");
        dayElement.className = "day";
        dayElement.textContent = day.toString();
        dayElement.dataset.key = dayKey; // Add unique key for each day
        // Load from localStorage
        if (storedData[dayKey]) {
            dayElement.style.backgroundImage = "url(".concat(storedData[dayKey], ")");
            dayElement.style.backgroundSize = "cover";
            dayElement.style.backgroundPosition = "center";
            dayElement.textContent = ""; // Remove the day number
        }
        // Highlight today's date
        if (day === todayDate && monthIndex === todayMonth && year === todayYear) {
            dayElement.classList.add("today");
            var todayText = document.createElement("div");
            todayText.className = "today";
            todayText.textContent = "TODAY";
            dayElement.appendChild(todayText);
        }
        // Add click event to add preset image
        dayElement.addEventListener("click", function () {
            if (isPresetActive) {
                var presetImg = document.createElement("img");
                presetImg.src = selectedPreset;
                presetImg.className = "preset";
                dayElement.appendChild(presetImg);
            }
        });
        daysContainer.appendChild(dayElement);
    };
    // Render days of the month
    for (var day = 1; day <= daysInMonth; day++) {
        _loop_1(day);
    }
    calendarContainer.appendChild(daysContainer);
}
renderCalendar(currentMonthIndex);
