document.addEventListener("DOMContentLoaded", () => {
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const populateTable = () => {
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = ""; // Clear any existing rows

        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-button" data-id="${user.id}">Edit</button>
                    <button class="delete-button" data-id="${user.id}">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        attachEventListeners();
    };

    const attachEventListeners = () => {
        // Edit button logic
        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", (e) => {
                const userId = parseInt(e.target.getAttribute("data-id"));
                openEditModal(userId);
            });
        });

        // Delete button logic
        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", (e) => {
                const userId = parseInt(e.target.getAttribute("data-id"));
                deleteUser(userId);
            });
        });
    };

    const openEditModal = (userId) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        // Fill modal with user data
        document.getElementById("edit-name").value = user.name;
        document.getElementById("edit-email").value = user.email;
        document.getElementById("edit-user-id").value = user.id;

        // Show the modal
        document.querySelector(".edit-modal").style.display = "block";
    };

    const closeEditModal = () => {
        document.querySelector(".edit-modal").style.display = "none";
    };

    const saveUserEdits = () => {
        const userId = parseInt(document.getElementById("edit-user-id").value);
        const updatedName = document.getElementById("edit-name").value;
        const updatedEmail = document.getElementById("edit-email").value;

        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].name = updatedName;
            users[userIndex].email = updatedEmail;
            localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
            populateTable();
            closeEditModal();
        }
    };

    const deleteUser = (userId) => {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
            populateTable();
        }
    };

    document.querySelector(".add-button").addEventListener("click", () => {
        const newUser = {
            id: users.length + 1,
            name: "New User", // Placeholder
            email: "newuser@example.com" // Placeholder
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
        populateTable();
    });

    document.getElementById("save-edits").addEventListener("click", saveUserEdits);
    document.getElementById("cancel-edits").addEventListener("click", closeEditModal);

    populateTable();
});
