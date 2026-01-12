# Art Institute of Chicago Artworks Explorer

Live Demo: **https://artic-article.netlify.app/**

A React + TypeScript application that displays paginated artwork data from the **Art Institute of Chicago API**. Built with **PrimeReact UI components** and featuring **server-side pagination**, **persistent selection**, and **custom row selection** functionality.

---

## 🚀 Features

✔ Server-side pagination  
✔ Displays artwork data:  
- Title  
- Place of Origin  
- Artist  
- Inscriptions  
- Start Date  
- End Date  

✔ Row selection with checkboxes  
✔ Persistent selection across pages  
✔ “Select N Rows” custom selection overlay  
✔ No prefetching of extra pages (memory safe, high performance)  
✔ Fully typed with TypeScript

---

## 🛠 Technologies

- **Vite** – fast React development tooling  
- **React + TypeScript**  
- **PrimeReact** – DataTable + UI Components  
- **Fetch API** – server-side pagination  
- **Netlify** – deployed live

---

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/<your-username>/artic-artworks-table.git
cd artic-artworks-table
````

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

---

## 🧠 How It Works

### Server-side Pagination

The app fetches only the currently visible page from the Art Institute of Chicago:

```
https://api.artic.edu/api/v1/artworks?page=<page>&limit=12
```

No pre-fetching — efficient for large datasets.

### Persistent Selection

Selection state is stored externally and will persist:

* when navigating between pages,
* when selecting/deselecting rows,
* and when using custom “Select N Rows” mode.

This is done without fetching or storing records from other pages.

---

## 📌 Project Structure

```
src/
├─ api.ts              # API functions
├─ types.ts            # TypeScript types
├─ components/
│   └─ ArtworksTable.tsx
├─ App.tsx
└─ main.tsx
```

---

## 👀 Try It Yourself

👉 Live app: [https://artic-article.netlify.app](https://artic-article.netlify.app)

---

## 💬 Feedback

If you find any issues or want to suggest improvements, feel free to open an issue or submit a pull request!

---



If you want, I can also generate a **GitHub repo template** version or enhance it with **badges (CI/CD, coverage, size, etc.)**!
```
