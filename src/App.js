import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Increased to 25 for better coverage across the full screen
  const fireflies = Array.from({ length: 25 });

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1PtSzao_LpY1vshNjp4mKqyxpApN_b_cBnvB7B6pDjk8/Sheet1")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const categories = ["All", "Self-help", "Novel", "Finance", "Education", "Motivation"];

  const filteredBooks = books.filter((book) => {
    return (
      (book.name?.toLowerCase().includes(search.toLowerCase()) || 
       book.author?.toLowerCase().includes(search.toLowerCase())) &&
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
      {/* 1. Firefly Background - Moved outside nav to cover full screen */}
      <div style={styles.fireflyContainer}>
        {fireflies.map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.firefly,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 15}s`, // Slower, more graceful movement
            }}
          />
        ))}
      </div>

      <div style={styles.topGradient}></div>

      <div style={styles.navWrapper}>
        <nav style={styles.islandNav}>
          <div style={styles.logoGroup}>
            <h1 style={styles.logo}>OpenPage<span style={styles.dot}></span></h1>
          </div>
          
          <div style={styles.categoryGroup}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.catBtn,
                  color: category === cat ? "#fff" : "#94a3b8",
                  backgroundColor: category === cat ? "#f97316" : "transparent",
                  boxShadow: category === cat ? "0 4px 12px rgba(249, 115, 22, 0.2)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />
          </div>
        </nav>
      </div>

      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={styles.title}>{category === 'All' ? 'The Library' : category}</h2>
        </header>

        <div style={styles.grid}>
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(249, 115, 22, 1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.03)";
              }}
            >
              <div style={styles.tag}>{book.category || "General"}</div>
              <h3 style={styles.bookTitle}>{book.name}</h3>
              <p style={styles.author}>{book.author}</p>
              
              <a href={book.link} target="_blank" rel="noreferrer" style={styles.cta}>
                <span>Access Material</span>
                <div style={styles.ctaIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;800&display=swap');
        body { margin: 0; background: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
        
        /* 2. Added Firefly Animations */
        @keyframes fireflyFloat {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          50% { transform: translate(50px, -60px) scale(1.2); opacity: 0.4; }
          80% { opacity: 0.8; }
          100% { transform: translate(-20px, -120px) scale(1); opacity: 0; }
        }

        * { transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1); box-sizing: border-box; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", position: "relative" },
  fireflyContainer: {
    position: 'fixed', // Fixed so they stay in view while scrolling
    top: 0, left: 0, width: '100%', height: '100%',
    pointerEvents: 'none', // Critical so you can still click buttons
    zIndex: 1,
  },
  firefly: {
    position: 'absolute',
    width: '4px', height: '4px',
    backgroundColor: '#f97316',
    borderRadius: '50%',
    boxShadow: '0 0 10px 2px rgba(249, 115, 22, 0.4)',
    animationName: 'fireflyFloat',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    opacity: 0,
  },
  topGradient: {
    position: 'absolute', top: 0, left: 0, right: 0, height: '800px',
    background: 'linear-gradient(180deg, rgba(249, 115, 22, 0.08) 0%, rgba(255,255,255,0) 100%)',
    zIndex: -1
  },
  navWrapper: {
    position: "sticky", top: "20px", zIndex: 1000, display: "flex", justifyContent: "center", padding: "0 20px"
  },
  islandNav: {
    display: "flex", alignItems: "center", gap: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
    padding: "8px 12px", borderRadius: "20px",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 15px 35px -5px rgba(0,0,0,0.05)",
    maxWidth: "1000px", width: "100%"
  },
  logo: { fontSize: "0.75rem", fontWeight: "800", letterSpacing: "0.5em", margin: "0 20px", color: '#000' },
  dot: { width: '4px', height: '4px', backgroundColor: '#f97316', display: 'inline-block', marginLeft: '4px', borderRadius: '50%' },
  categoryGroup: { display: "flex", gap: "4px", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "14px", flex: 1 },
  catBtn: {
    border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "0.75rem",
    fontWeight: "600", letterSpacing: "0.1em", cursor: "pointer", whiteSpace: "nowrap"
  },
  searchGroup: { position: "relative", marginLeft: "10px" },
  search: {
    padding: "10px 16px", borderRadius: "12px", border: "1px solid #f1f5f9",
    backgroundColor: "#fff", fontSize: "0.8rem", outline: "none", width: "180px",
  },
  main: { maxWidth: "1200px", margin: "0 auto", padding: "80px 6%", position: 'relative', zIndex: 2 },
  header: { marginBottom: "50px" },
  title: { fontSize: "2.5rem", fontWeight: "500", margin: 0, letterSpacing: "0.2em", color: "#000" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "30px" },
  card: {
    padding: "40px", borderRadius: "28px", backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 4px 20px rgba(0,0,0,0.01)",
    display: "flex", flexDirection: "column", cursor: 'default'
  },
  tag: { fontSize: "0.65rem", fontWeight: "650", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "20px" },
  bookTitle: { fontSize: "1.5rem", fontWeight: "600", letterSpacing: "0.1em", margin: "0 0 10px 0", lineHeight: 1.2, color: "#111" },
  author: { color: "#4d5765", fontSize: "0.95rem", letterSpacing: "0.1em", marginBottom: "40px", flex: 1 },
  cta: { display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#000", fontSize: "0.85rem", fontWeight: "600" },
  ctaIcon: { width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" },
  loaderContainer: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff" },
  spinner: { width: "30px", height: "30px", border: "3px solid #f1f5f9", borderTopColor: "#f97316", borderRadius: "50%", animation: "spin 0.8s ease-in-out infinite" }
};

export default App;
