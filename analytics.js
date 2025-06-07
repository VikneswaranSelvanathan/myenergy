document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const totalUsers = users.length; // Total registered users

    // For now, use placeholder values for active users and downloads
    const activeUsers = Math.floor(Math.random() * totalUsers); // Random active users
    const downloads = Math.floor(Math.random() * 100); // Random download count

    // Update stats on the page
    document.getElementById("total-users").textContent = totalUsers;
    document.getElementById("active-users").textContent = activeUsers;
    document.getElementById("downloads").textContent = downloads;

    // Initialize the user activity chart
    renderUserActivityChart();
});

// Render Chart.js user activity chart
function renderUserActivityChart() {
    const ctx = document.getElementById("user-activity-chart").getContext("2d");

    // Example data for the chart (replace with real data later)
    const data = {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            label: "User Activity",
            data: [10, 20, 30, 25, 15, 50, 40], // Placeholder data
            backgroundColor: "rgba(76, 175, 80, 0.2)", // Light green
            borderColor: "#4CAF50", // Green border
            borderWidth: 2,
            tension: 0.4 // Smoothing curve
        }]
    };

    new Chart(ctx, {
        type: "line", // Line chart
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Days of the Week"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of Users"
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
