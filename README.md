# 🍽️ Restaurant Order System (Data & DevOps Extension)

A full-stack restaurant ordering system built with **React, Node.js, Express, Socket.IO, and MySQL**, extended with **Data Engineering** and **DevOps** practices.

This repository is a **personal fork** of an existing Restaurant Order System. My contribution focuses on improving the backend ecosystem by adding data processing capabilities and preparing the project for containerized deployment.

---

# 📌 Project Overview

The Restaurant Order System allows customers to place food orders digitally while enabling administrators to monitor and manage incoming orders in real time.

Beyond the original application, this fork aims to introduce:

* Data Engineering workflows for transaction processing
* Analytics-ready data export
* Containerized development with Docker
* Improved project organization for production-oriented development

---

# ✨ Features

## Existing Application

* Digital restaurant menu
* Customer ordering interface
* Administrative dashboard
* Real-time order synchronization using Socket.IO
* MySQL relational database

## My Contributions

* Python-based data cleaning pipeline *(in progress)*
* CSV export for transaction analysis *(planned)*
* Analytics endpoints for reporting *(planned)*
* Docker containerization *(in progress)*
* Backend architecture improvements

---

# 🏗️ System Architecture

```text
                  Customer
                      │
                      │ Place Order
                      ▼
        +-----------------------------+
        |     React Frontend (Vite)   |
        +-------------+---------------+
                      │
                HTTP / Socket.IO
                      │
                      ▼
        +-----------------------------+
        |   Express Backend (Node.js) |
        +-------------+---------------+
                      │
                CRUD Operations
                      │
                      ▼
        +-----------------------------+
        |        MySQL Database       |
        +-------------+---------------+
                      │
             Transaction Records
                      │
                      ▼
        +-----------------------------+
        | Python Analytics Pipeline   |
        | Data Cleaning & CSV Export  |
        +-----------------------------+
```

---

# 📁 Project Structure

```text
Restaurant-Order-System/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── schema.sql
│   └── ...
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── socket.js
│   │   └── components/
│   │       ├── CustomerMenu.jsx
│   │       └── AdminDashboard.jsx
│   └── ...
│
├── README.md
└── .gitignore
```

---

# 🛠️ Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React + Vite | Frontend UI                   |
| Tailwind CSS | Styling                       |
| Node.js      | Backend runtime               |
| Express.js   | REST API                      |
| Socket.IO    | Real-time communication       |
| MySQL        | Relational database           |
| Python       | Data processing and analytics |
| Docker       | Containerized development     |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Paoying5/Restaurant-Order-System.git
cd Restaurant-Order-System
```

---

## Backend

```bash
cd backend
npm install
node server.js
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Database

1. Create a MySQL database.

```sql
CREATE DATABASE restaurant_order_system;
```

2. Import the schema.

```bash
mysql -u root -p restaurant_order_system < schema.sql
```

3. Configure your database connection inside the backend.

---

# 🐳 Docker (Planned)

The project is being migrated toward a Docker-based workflow.

Future containers will include:

* React Frontend
* Express Backend
* MySQL Database
* Python Analytics Service

---

# 📊 Development Roadmap

* [x] Analyze original project architecture
* [x] Understand relational database design
* [x] Integrate Socket.IO communication
* [ ] Docker Compose configuration
* [ ] Python ETL pipeline
* [ ] CSV export service
* [ ] Analytics REST API
* [ ] Dashboard reporting
* [ ] CI/CD workflow

---

# 🤝 Contribution

This repository is maintained as a personal learning and portfolio project.

Suggestions, issues, and pull requests are welcome.

---

# 👤 Author

**Phạm Nguyễn Nhật Trường**

Final-year Information Technology Student

Focus Areas:

* Backend Development
* Data Engineering
* DevOps
* Database Systems

GitHub:

https://github.com/Paoying5

---

# 🙏 Acknowledgement

This project is based on an existing Restaurant Order System.

The original project provides the core ordering application, while this fork focuses on extending the system with Data Engineering and DevOps practices.

---

# 📄 License

This project is intended for educational and portfolio purposes.

Please refer to the original repository for its licensing information if applicable.

