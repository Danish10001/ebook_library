import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1PtSzao_LpY1vshNjp4mKqyxpApN_b_cBnvB7B6pDjk8/Sheet1")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const categories = ["All", "Self-help", "Novel", "Finance", "Education", "Motivation"];

  const filteredBooks = books.filter((book) => {
    return (
      book.name?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || book.category === category)
    );
  });

  if (books.length === 0) return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
    </div>
  );

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.logo}>LIBRE<span style={{color: '#3b82f6'}}>.</span></h1>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search titles or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.categoryBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.categoryButton,
                color: category === cat ? "#fff" : "#a1a1aa",
                backgroundColor: category === cat ? "#27272a" : "transparent",
                borderColor: category === cat ? "#3f3f46" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.backgroundColor = "#111113";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#27272a";
                e.currentTarget.style.backgroundColor = "#09090b";
              }}
            >
              <div style={styles.cardHeader}>
                <span style={styles.tag}>{book.category || "General"}</span>
                <div style={styles.dot}></div>
              </div>
              <h3 style={styles.bookTitle}>{book.name}</h3>
              <p style={styles.author}>by {book.author}</p>

              <a href={book.link} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                <button style={styles.button}>
                  Access Material
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000000",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    paddingBottom: "100px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px 5%",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "800",
    letterSpacing: "-0.02em",
  },
  searchWrapper: {
    flex: "0 1 400px",
  },
  search: {
    width: "100%",
    backgroundColor: "#09090b",
    border: "1px solid #27272a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "12px",
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease",
  },
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 5%",
  },
  categoryBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "48px",
    overflowX: "auto",
    padding: "4px",
  },
  categoryButton: {
    padding: "8px 20px",
    borderRadius: "100px",
    border: "1px solid transparent",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#09090b",
    border: "1px solid #27272a",
    borderRadius: "16px",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.25s ease",
    cursor: "default",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  tag: {
    fontSize: "0.75rem",
    color: "#3b82f6",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: "700",
  },
  dot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)",
  },
  bookTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    margin: "0 0 8px 0",
    lineHeight: "1.2",
    color: "#fff",
  },
  author: {
    color: "#71717a",
    fontSize: "1rem",
    marginBottom: "40px",
    flexGrow: 1,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  loaderContainer: {
    backgroundColor: "#000",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #18181b",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  }
};

export default App;