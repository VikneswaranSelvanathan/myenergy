document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas context
    const ctx = document.getElementById("iotChart").getContext("2d");

    // Create the chart
    const iotChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [], // X-axis (Time)
            datasets: [{
                label: "Power Consumption (Watts)",
                data: [], // Y-axis (Fake power readings)
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
                tension: 0.4, // ✅ Makes the line smoother (connects dots)
                pointRadius: 4 // ✅ Makes points more visible
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // ✅ Prevents stretching across the full page
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    // Function to Generate Fake Power Data
    function generateFakeData() {
        const fakePower = Math.floor(Math.random() * 100); // Simulate power between 0W - 100W
        iotChart.data.labels.push(new Date().toLocaleTimeString()); // Add timestamp
        iotChart.data.datasets[0].data.push(fakePower); // Add fake power value

        // ✅ Keep only the last 10 readings (prevents excessive data points)
        if (iotChart.data.labels.length > 10) {
            iotChart.data.labels.shift();
            iotChart.data.datasets[0].data.shift();
        }

        iotChart.update();
    }

    // Auto-update graph every 30 seconds
    setInterval(generateFakeData, 30000);
    generateFakeData(); // Run once on page load
});

