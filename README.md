# DSCE Connect

## One Campus. One Connected Platform.

DSCE Connect is a campus communication and complaint management platform designed for **Dayananda Sagar College of Engineering (DSCE)**.

The platform connects **students, faculty, and administration** through a single web application where users can report campus issues, track complaints, and manage campus-related activities.

---

##  Project Overview

DSCE Connect aims to make communication within the campus simpler, faster, and more organized.

The application provides separate interfaces for different users:

-  Students
-  Faculty
-  Administration

Students can submit complaints and track their status, while faculty and administrators can manage and monitor campus-related issues.

---

##  Features

###  Home Page

The DSCE Connect landing page provides:

- DSCE branding and logo
- Introduction to DSCE Connect
- Navigation menu
- Login and Get Started buttons
- Complaint reporting shortcut
- Platform feature overview
- Student, Faculty and Admin information

---

###  Login

Users can access the platform through the login page.

The system supports different user roles:

- Student
- Faculty
- Admin

After successful login, users are directed to their respective dashboards.

---

###  Student Dashboard

The student dashboard allows students to:

- View their dashboard
- Submit complaints
- Track submitted complaints
- View complaint/ticket information
- Monitor complaint status
- Access campus-related information

---

###  Faculty Dashboard

The faculty dashboard provides faculty members with access to:

- Faculty dashboard
- Relevant complaints
- Ticket information
- Campus issue management
- Complaint status information

---

###  Admin Dashboard

The administration dashboard is intended to provide centralized control over the platform.

Administrators can:

- Monitor complaints
- View tickets
- Manage campus issues
- Track complaint status
- Monitor platform activity

---

###  Complaint System

Students can report campus problems through the complaint system.

A complaint can contain information such as:

- Complaint title
- Description
- Category
- Status
- Submitted information

Complaints can then be tracked through the ticket system.

---

###  Ticket System

The ticket system is used to organize and track complaints.

It helps users understand the current status of an issue and provides a centralized view of submitted complaints.

---

##  Project Structure

The project uses the Next.js App Router structure.

```text
dsce-connect/
│
├── app/
│   │
│   ├── page.tsx
│   │       └── DSCE Connect Home Page
│   │
│   ├── layout.tsx
│   │       └── Root Layout
│   │
│   ├── globals.css
│   │       └── Global Styles
│   │
│   ├── login/
│   │   └── page.tsx
│   │       └── Login Page
│   │
│   ├── student/
│   │   └── page.tsx
│   │       └── Student Dashboard
│   │
│   ├── faculty/
│   │   └── page.tsx
│   │       └── Faculty Dashboard
│   │
│   ├── admin/
│   │   └── page.tsx
│   │       └── Admin Dashboard
│   │
│   ├── complaint/
│   │   └── page.tsx
│   │       └── Complaint Page
│   │
│   └── tickets/
│       └── page.tsx
│           └── Ticket Management Page
│
├── public/
│   └── dsce-logo.png
│           └── DSCE Logo
│
├── node_modules/
│
├── package.json
├── package-lock.json
├── next.config.ts
├── next-env.d.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
└── README.md
