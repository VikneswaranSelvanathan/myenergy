// Handle Admin Login
document.getElementById("admin-login-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    // Placeholder admin credentials
    const adminUsername = "admin";
    const adminPassword = "admin123";

    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
        alert("Login successful! Redirecting to the Admin Dashboard...");
        
        // Save admin session data in localStorage
        localStorage.setItem("loggedInAdmin", username);
        
        // Redirect to Admin Dashboard
        window.location.href = "admindashboard.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
