const BASE_URL = "http://127.0.0.1:8000";

async function authFetch(endpoint, options = {}) {
    const token = localStorage.getItem("access_token");

    const headers = {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
        return;
    }

    return response;
}



export async function registerUser(name, email, password) {
    const response = await authFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
    return response.json();
}

export async function loginUser(email, password) {
    const response = await authFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

export async function refreshToken() {
    const refresh_token = localStorage.getItem("refresh_token");
    const response = await authFetch("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token }),
    });
    return response.json();
}

export async function getAllTodos() {
    const response = await authFetch("/get_all_todos");
    return response.json();
}

export async function createTodo(todoData) {
    const response = await authFetch("/todos", {
        method: "POST",
        body: JSON.stringify(todoData),
    });
    return response.json();
}

export async function updateTodo(id, todoData) {
    const response = await authFetch(`/update_todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify(todoData),
    });
    return response.json();
}

export async function deleteTodo(id) {
    const response = await authFetch(`/delete_todo/${id}`, {
        method: "DELETE",
    });
    return response.json();
}

export async function getAllCategories() {
    const response = await authFetch("/categories");
    return response.json();
}

export async function createCategory(categoryData) {
    const response = await authFetch("/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
    });
    return response.json();
}

export async function deleteCategory(id) {
    const response = await authFetch(`/categories/${id}`, {
        method: "DELETE",
    });
    return response.json();
}