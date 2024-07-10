export function isAuthenticated() {
    const token = localStorage.getItem("id");

    if (!token) {
        window.location.href = "/login";
    }
}
