# 📝 Blog Editor App

A full-stack **Blog Editor Application** built with the MERN stack, featuring auto-save draft functionality, blog creation/editing, and tag-based organization. The app supports CRUD operations and includes inactivity detection to save drafts automatically.

---

## 🔧 Tech Stack

### 💻 Frontend
- **React.js** (with Hooks and React Router)
- **Tailwind CSS** (for UI styling)
- **Axios** (for HTTP requests)

### 🖥️ Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose** (Schema-based NoSQL)
- **RESTful APIs**

---

## 🚀 Features

- 📝 **Create, edit, and update blogs**
- 🧠 **Auto-save drafts** after **30 minutes of inactivity**
- 🔖 **Add tags** to blogs
- 💾 **Draft vs Published status** toggle
- ⏱️ **Inactivity timer** resets on typing or interaction
- 🗃️ **View list of blogs**
- 🧹 **Clean and responsive UI**

---

## 🧠 Auto-Save Draft Logic

The editor detects user inactivity (keyboard/mouse) and automatically saves the blog as a draft if:
- No activity is detected for **30 minutes**
- The blog has unsaved changes

```js
useEffect(() => {
  const inactivityLimit = 30 * 60 * 1000; // 30 minutes
  let timer = setTimeout(() => {
    saveDraft();
  }, inactivityLimit);

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(saveDraft, inactivityLimit);
  };

  window.addEventListener('keydown', resetTimer);
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('click', resetTimer);

  return () => {
    clearTimeout(timer);
    window.removeEventListener('keydown', resetTimer);
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('click', resetTimer);
  };
}, []);
```

---

## 🧪 API Routes

### Blog Routes (`/api/blogs`)
- `POST /create` → Create new blog
- `GET /:id` → Get a blog by ID
- `PUT /update/:id` → Update blog
- `DELETE /delete/:id` → Delete blog
- `GET /all` → Get all blogs

---

## 📁 Project Structure

```
blog-editor/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Pages like CreateBlog, UpdateBlog
│   │   └── App.jsx
├── server/                  # Node.js backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routers
│   └── index.js
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blog-editor.git
cd blog-editor
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Start the backend**
```bash
cd ../server
npm start
```

5. **Start the frontend**
```bash
cd ../client
npm run dev
```

6. **Visit** `http://localhost:3000` to use the app.

---

## 🔐 Environment Variables

Create a `.env` file in `server/` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 📸 Screenshots

| Create Blog Page | Update Blog Page |
|------------------|------------------|
| ![Create](https://via.placeholder.com/400x200.png?text=Create+Blog) | ![Edit](https://via.placeholder.com/400x200.png?text=Edit+Blog) |

---

## 🧑‍💻 Author

Built with ❤️ by [Rohit Ganguly]

---

## 📄 License

This project is licensed under the MIT License.
