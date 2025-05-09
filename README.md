# 🧩 Kanban Board App

A lightweight, Trello-style Kanban board built with **React + TypeScript + Redux + Tailwind CSS**.
Supports drag-and-drop tasks, multiple boards, local storage persistence, route-based modals, and theme customization.

---

## 🚀 Features

* ✅ Create, edit, and delete boards
* ✅ Drag and drop tasks and columns
* ✅ Edit tasks via modals with route-based URLs
* ✅ Customize board background color
* ✅ Data stored in `localStorage` (no backend)
* ✅ Responsive and clean UI

---

## 🛠 Tech Stack

* ⚛️ React 19 + TypeScript
* 🧠 Redux Toolkit
* 🎨 Tailwind CSS
* 📦 Vite
* 🔄 `@hello-pangea/dnd` (drag and drop)
* 🧪 React Router v6
* 🧰 LocalStorageManager class for persistence

---

## 🧑‍💻 Getting Started

```bash
# 1. Install
npm install

# 2. Start dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for production

```bash
npm run build
```

---

## 🔧 Project Structure

```txt
src/
├── components/         // Reusable UI components
├── store/              // Redux setup
├── types/              // TypeScript interfaces
├── utils/              // LocalStorageManager
├── App.tsx             // Routing setup
```
