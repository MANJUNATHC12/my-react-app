import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "At least 8 characters";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);

    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1400);
  };

  const styles = {
    body: {
      minHeight: "100vh",
      background: "#0d0d0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      color: "#f0f0ee",
      position: "relative",
      overflow: "hidden",
    },
    grid: {
      position: "fixed", inset: 0,
      backgroundImage: "linear-gradient(#2a2a30 1px, transparent 1px), linear-gradient(90deg, #2a2a30 1px, transparent 1px)",
      backgroundSize: "40px 40px",
      opacity: 0.15,
    },
    glow: {
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(200,240,96,.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(61,255,208,.06) 0%, transparent 70%)",
    },
    card: {
      position: "relative",
      background: "#141417",
      border: "1px solid #2a2a30",
      borderRadius: 20,
      padding: "48px 44px",
      width: 420,
      boxShadow: "0 40px 80px rgba(0,0,0,.6)",
      zIndex: 1,
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      color: "#c8f060",
      background: "rgba(200,240,96,.1)",
      border: "1px solid rgba(200,240,96,.2)",
      borderRadius: 100,
      padding: "5px 12px",
      marginBottom: 20,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#c8f060",
    },
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontSize: 28,
      fontWeight: 800,
      marginBottom: 8,
    },
    accent: { color: "#c8f060" },
    sub: { fontSize: 14, color: "#6a6a72", marginBottom: 32 },
    field: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 },
    label: { fontSize: 12, color: "#6a6a72" },
    input: (hasError) => ({
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${hasError ? "#ff6b6b" : "#2a2a30"}`,
      borderRadius: 10,
      padding: "12px 14px",
      color: "#fff",
      outline: "none",
    }),
    error: { fontSize: 11, color: "#ff6b6b" },
    btn: (loading) => ({
      width: "100%",
      padding: 14,
      background: loading ? "rgba(200,240,96,.6)" : "#c8f060",
      border: "none",
      borderRadius: 12,
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      cursor: loading ? "not-allowed" : "pointer",
    }),
    footer: { textAlign: "center", marginTop: 20, fontSize: 13, color: "#6a6a72" },
    link: { color: "#3dffd0", cursor: "pointer" },
    successWrap: { textAlign: "center" },
    successIcon: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "rgba(200,240,96,.15)",
      border: "2px solid #c8f060",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      margin: "0 auto 20px",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        input:focus { border-color: #c8f060 !important; }
        .btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={styles.body}>
        <div style={styles.grid} />
        <div style={styles.glow} />

        <div style={styles.card}>
          {success ? (
            <div style={styles.successWrap}>
              <div style={styles.successIcon}>✓</div>
              <h2>Welcome <span style={styles.accent}>Back!</span></h2>
              <p style={styles.sub}>You have successfully signed in.</p>
            </div>
          ) : (
            <>
              <div style={styles.badge}>
                <span style={styles.dot} />
                Welcome Back
              </div>

              <h1 style={styles.h1}>
                Sign in to your <br />
                <span style={styles.accent}>account.</span>
              </h1>

              <p style={styles.sub}>
                Enter your credentials to continue.
              </p>

              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  style={styles.input(errors.email)}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  style={styles.input(errors.password)}
                />
                {errors.password && <span style={styles.error}>{errors.password}</span>}
              </div>

              <button
                className="btn"
                style={styles.btn(loading)}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign in →"}
              </button>

              <div style={styles.footer}>
                Don’t have an account?{" "}
                <span style={styles.link}>Register</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}