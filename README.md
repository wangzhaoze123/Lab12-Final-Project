# Lab12 Final Project - Docker & CI/CD Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

## 📋 Project Overview

This project demonstrates containerized web application deployment using **Docker**, **Docker Compose**, and **GitHub Actions CI/CD**. It deploys two applications simultaneously on a single server:

1. **Personal Website** - Portfolio site with personal information
2. **Todo Application** - Interactive task management app

---

## 👤 Student Information

| Field | Details |
|-------|---------|
| **Name & Surname** | 汪兆泽 |
| **Student ID** | 20242203 |
| **University** | North Minzu University (北方民族大学) |
| **Major** | Software Engineering |
| **Email** | wangzhaozhe@nmu.edu.cn |

### Team Members & Contribution

| Name | Student ID | Contribution % |
|------|-----------|----------------|
| 汪兆泽 | 20242203 | 100% |

---

## 🖼️ My Photo

![Profile Photo](personal-website/images/profile.jpg)

---

## 🌐 Application URLs

| Application | URL |
|-------------|-----|
| **Personal Website** | `http://[YOUR_SERVER_IP]:8080` |
| **Todo Application** | `http://[YOUR_SERVER_IP]:8081` |

> Replace `[YOUR_SERVER_IP]` with your actual server IP address or domain name.

---

## 🏗️ Project Structure

```
Lab12-Final-Project/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD workflow
├── personal-website/
│   ├── Dockerfile                  # Dockerfile for personal website
│   ├── nginx.conf                  # Nginx configuration
│   ├── index.html                  # Personal website HTML
│   ├── style.css                   # Website styles
│   └── images/
│       └── profile.jpg             # Your profile picture
├── todo-app/
│   ├── Dockerfile                  # Dockerfile for todo app
│   ├── nginx.conf                  # Nginx configuration
│   ├── index.html                  # Todo app HTML
│   ├── style.css                   # Todo app styles
│   └── app.js                      # Todo app logic (localStorage)
├── docker-compose.yml              # Multi-container orchestration
└── README.md                       # Project documentation
```

---

## 🚀 How to Deploy

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Git](https://git-scm.com/) installed

### Local Deployment

```bash
# 1. Clone the repository
git clone https://github.com/[YOUR_USERNAME]/[REPO_NAME].git
cd [REPO_NAME]

# 2. Add your profile photo
# Place your photo at: personal-website/images/profile.jpg

# 3. Build and start both containers
docker compose up -d

# 4. Check running containers
docker compose ps

# 5. Access the applications
# Personal Website: http://localhost:8080
# Todo App:        http://localhost:8081
```

### Stop the Applications

```bash
docker compose down
```

### Rebuild After Changes

```bash
docker compose up -d --build
```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

This project uses **GitHub Actions** for automated build and deployment:

- **Trigger**: Push to `main`/`master` branch, Pull Requests, or Manual dispatch
- **Process**:
  1. Checkout repository
  2. Set up Docker Buildx
  3. Build personal website Docker image
  4. Build todo app Docker image
  5. Run both containers via Docker Compose
  6. Perform health checks on both services

---

## 🐳 Docker Details

### Personal Website (Port 8080)
- Base image: `nginx:alpine`
- Serves static HTML/CSS content
- Custom nginx configuration with security headers

### Todo Application (Port 8081)
- Base image: `nginx:alpine`
- Interactive JavaScript-based todo app
- Data persisted in browser localStorage
- **Open-source pattern**: Based on the TodoMVC architecture

---

## 📝 Features

### Personal Website
- ✅ Responsive design (mobile-friendly)
- ✅ Smooth scrolling navigation
- ✅ Skills showcase section
- ✅ Education timeline
- ✅ Contact information

### Todo Application
- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete individual tasks
- ✅ Filter: All / Active / Completed
- ✅ Clear all completed tasks
- ✅ Persistent storage (localStorage)
- ✅ Responsive design

---

## 🔧 Technologies Used

- **Docker** - Container platform
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD automation
- **Nginx** - Web server (Alpine Linux)
- **HTML5 / CSS3 / JavaScript** - Frontend development

---

## 📹 Demo Video

[Watch the demo video]([YOUR_VIDEO_URL])

---

## 📄 License

This project is created for educational purposes as part of the Lab12 Final Project.

---

*Academic cooperation between School of Computer Science and Engineering, North Minzu University, and Software Engineering, College of Arts, Media and Technology, Chiang Mai University | Academic Year 2024*
