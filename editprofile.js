// Elements for switching modes
const editButton = document.getElementById("edit-button");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const viewMode = document.getElementById("view-mode");
const editMode = document.getElementById("edit-mode");

// On Page Load: Load profile data from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const storedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (storedProfile) {
        // Populate View Mode
        document.getElementById("name-view").textContent = storedProfile.name;
        document.getElementById("phone-view").textContent = storedProfile.phone;
        document.getElementById("address-view").textContent = storedProfile.address;

        // Pre-fill Edit Mode input fields
        document.getElementById("name-input").value = storedProfile.name;
        document.getElementById("phone-input").value = storedProfile.phone;
        document.getElementById("address-input").value = storedProfile.address;
    }
});

// Handle Edit Button Click
editButton.addEventListener("click", () => {
    // Show Edit Mode and its buttons, hide View Mode
    viewMode.style.display = "none";
    editMode.style.display = "block";
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
});

// Handle Cancel Button Click
cancelButton.addEventListener("click", () => {
    // Revert to View Mode without saving changes
    editMode.style.display = "none";
    viewMode.style.display = "block";
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
});

// Handle Save Button Click
saveButton.addEventListener("click", () => {
    // Get updated values from input fields
    const nameInput = document.getElementById("name-input").value;
    const phoneInput = document.getElementById("phone-input").value;
    const addressInput = document.getElementById("address-input").value;

    // Update View Mode content
    document.getElementById("name-view").textContent = nameInput;
    document.getElementById("phone-view").textContent = phoneInput;
    document.getElementById("address-view").textContent = addressInput;

    // Save updated data to localStorage
    const updatedProfile = {
        name: nameInput,
        phone: phoneInput,
        address: addressInput
    };
    localStorage.setItem("profileData", JSON.stringify(updatedProfile));

    // Switch back to View Mode
    editMode.style.display = "none";
    viewMode.style.display = "block";
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
});
