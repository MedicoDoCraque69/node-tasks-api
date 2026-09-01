# 🚀 Task Management API

A RESTful API for managing tasks developed as a practical project for the Ignite course (Rocketseat). The core objective of this project was to build a backend application entirely from scratch using **only native Node.js modules**, without relying on frameworks like Express.

---

## 🛠️ Features

- **`POST /tasks`**: Creates a new task (`title`, `description`).
- **`GET /tasks`**: Lists all tasks and supports filtering by title or description.
- **`PUT /tasks/:id`**: Updates the title and/or description of a specific task.
- **`DELETE /tasks/:id`**: Removes a task by its ID.
- **`PATCH /tasks/:id/complete`**: Toggles a task's completion status (`completed_at`).
- **CSV Import**: A dedicated script (`import-csv.js`) for bulk task creation from a `.csv` file using Node.js Streams.

---

## 💻 Tech Stack

- **Node.js** (HTTP, Crypto, File System, Streams)
- **`csv-parse`** (For parsing the CSV file)
- **JSON** (Local data persistence via `db.json`)

---

## 🔧 Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/node-tasks-api.git][https://github.com/MedicoDoCraque69/node-tasks-api.git](https://github.com/MedicoDoCraque69/node-tasks-api.git)
