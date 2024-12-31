$(document).ready(() => {
    const userState = State.GlobalGet("loginhtml");
    if (!userState) {
        // If no user is logged in, redirect to login page
        window.location.hash = "#/login";
    }

    $("#loadData").on("click", () => {
        API.get(
            `${API_BASE_URL}/posts`,
            (data) => {
                const tableBody = $("#dataTable tbody");
                tableBody.empty(); // Clear existing rows

                data.slice(0, 10).forEach((item) => {
                    const row = `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.body}</td>
                        </tr>
                    `;
                    tableBody.append(row);
                });
                $("#dataResponse").text("Data loaded successfully!").addClass("success");
            },
            (xhr, status, error) => {
                $("#dataResponse").text("Failed to load data!").addClass("error");
                console.error("Error:", status, error);
            },
            () => {
                console.log("Data request completed.");
            }
        );
    });
});
