const endpoint = "https://backend.thinger.io/v3/users/Vikneswaran/devices/ESP32/resources/energy_dashboard";
const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfMTIzNCIsInN2ciI6ImFwLXNvdXRoZWFzdC5hd3MudGhpbmdlci5pbyIsInVzciI6IlZpa25lc3dhcmFuIn0.a2X__m_M4tUcJfNj6kTeI8Wi4qJZG2L0riKuGxuU-os"

async function fetchData() {
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": apiKey,
            },
        });
        const data = await response.json();
        console.log(data); // Replace this with your logic to handle the data
        updateDashboard(data);
    } catch (error) {
        console.error("Error fetching data:", error);

        setLoading(false); // Stop "loading..." if fetch fails
        document.getElementById("runningTime").textContent = "Error!";
        document.getElementById("power").textContent = "Error!";
    } finally {
        setLoading(false);
    }
}

// Set loading state for dashboard
function setLoading(isLoading) {
    if (isLoading) {
        document.getElementById("runningTime").textContent = "Loading...";
        document.getElementById("power").textContent = "Loading...";
    }
}

// Update Dashboard with Running Time and Power Consumption
function updateDashboard(data) {

    // Calculate Power (if current is known)
    const voltage = data.voltage;
    const current = 1; // Example fixed current in amps, replace with actual value if available
    const power = voltage * current; // Power = Voltage × Current
    document.getElementById("power").textContent = `${power.toFixed(2)} W`; // Format to 2 decimals

    // Calculate and update running time
    const startTime = data.startTime; // Retrieve 'startTime' from the API response
    if (startTime) {
        document.getElementById("runningTime").textContent = calculateRunningTime(startTime);
    } else {
        document.getElementById("runningTime").textContent = "N/A"; // Handle missing startTime
    }

}

// Calculate Running Time
function calculateRunningTime(startTime) {
    const now = Date.now(); // Current time in milliseconds
    const elapsed = now - new Date(startTime).getTime(); // Difference in milliseconds
    const hours = Math.floor(elapsed / (1000 * 60 * 60)); // Convert to hours
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes
    return `${hours}h ${minutes}m`;
}

// Auto-Refresh Data Every 10 Seconds
setInterval(fetchData, 10000); // Fetch new data every 10 seconds

fetchData();
