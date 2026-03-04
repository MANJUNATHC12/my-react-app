import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
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
      pointerEvents: "none",
    },
    glow: {
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(200,240,96,.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(61,255,208,.06) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    card: {
      position: "relative", zIndex: 1,
      background: "#141417",
      border: "1px solid #2a2a30",
      borderRadius: 20,
      padding: "48px 44px",
      width: 440,
      boxShadow: "0 40px 80px rgba(0,0,0,.6)",
    },
    badge: {
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
      textTransform: "uppercase", color: "#c8f060",
      background: "rgba(200,240,96,.1)",
      border: "1px solid rgba(200,240,96,.2)",
      borderRadius: 100, padding: "5px 12px", marginBottom: 20,
    },
    dot: {
      width: 6, height: 6, borderRadius: "50%", background: "#c8f060",
    },
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontSize: 28, fontWeight: 800, lineHeight: 1.15, marginBottom: 8,
    },
    accent: { color: "#c8f060" },
    sub: { fontSize: 14, color: "#6a6a72", marginBottom: 32 },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
    field: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 14 },
    label: { fontSize: 12, color: "#6a6a72", letterSpacing: "0.04em" },
    input: (hasError) => ({
      background: "rgba(255,255,255,.04)",
      border: `1px solid ${hasError ? "#ff6b6b" : "#2a2a30"}`,
      borderRadius: 10, padding: "12px 14px",
      fontSize: 14, fontFamily: "'DM Sans', sans-serif",
      color: "#f0f0ee", outline: "none", width: "100%",
      transition: "border-color .2s, box-shadow .2s",
    }),
    error: { fontSize: 11, color: "#ff6b6b", marginTop: -2 },
    btn: (loading, done) => ({
      width: "100%", padding: 14,
      background: done ? "#3dffd0" : loading ? "rgba(200,240,96,.6)" : "#c8f060",
      border: "none", borderRadius: 12,
      fontFamily: "'Syne', sans-serif",
      fontSize: 15, fontWeight: 700,
      color: "#0d0d0f", cursor: loading ? "not-allowed" : "pointer",
      letterSpacing: "0.02em",
      transition: "transform .15s, box-shadow .15s, background .3s",
      marginTop: 4,
    }),
    terms: { fontSize: 11.5, color: "#6a6a72", textAlign: "center", marginTop: 18, lineHeight: 1.6 },
    link: { color: "#6a6a72", textDecoration: "underline", cursor: "pointer" },
    footer: { textAlign: "center", marginTop: 22, fontSize: 13, color: "#6a6a72" },
    footerLink: { color: "#3dffd0", textDecoration: "none", fontWeight: 500, cursor: "pointer" },
    successWrap: { textAlign: "center", padding: "20px 0" },
    successIcon: {
      width: 64, height: 64, borderRadius: "50%",
      background: "rgba(200,240,96,.15)", border: "2px solid #c8f060",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 28, margin: "0 auto 20px",
    },
    successTitle: {
      fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8,
    },
    successSub: { fontSize: 14, color: "#6a6a72" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #3d3d45; }
        input:focus { border-color: #c8f060 !important; box-shadow: 0 0 0 3px rgba(200,240,96,.1); }
        .reg-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,240,96,.25); }
        .reg-btn:active { transform: translateY(0); }
      `}</style>

      <div style={styles.body}>
        <div style={styles.grid} />
        <div style={styles.glow} />

        <div style={styles.card}>
          {submitted ? (
            <div style={styles.successWrap}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={styles.successTitle}>You're <span style={styles.accent}>in!</span></h2>
              <p style={styles.successSub}>Account created successfully.<br />Welcome aboard.</p>
            </div>
          ) : (
            <>
              <div style={styles.badge}>
                <span style={styles.dot} />
                New Account
              </div>
              <h1 style={styles.h1}>Create your<br /><span style={styles.accent}>account.</span></h1>
              <p style={styles.sub}>Join thousands already using the platform.</p>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>First name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange}
                    placeholder="Jane" style={styles.input(errors.firstName)} />
                  {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Last name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange}
                    placeholder="Doe" style={styles.input(errors.lastName)} />
                  {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="jane@example.com" style={styles.input(errors.email)} />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange}
                  placeholder="At least 8 characters" style={styles.input(errors.password)} />
                {errors.password && <span style={styles.error}>{errors.password}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Confirm password</label>
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
                  placeholder="Repeat your password" style={styles.input(errors.confirm)} />
                {errors.confirm && <span style={styles.error}>{errors.confirm}</span>}
              </div>

              <button className="reg-btn" style={styles.btn(loading, submitted)}
                onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating account…" : "Create account →"}
              </button>

              <p style={styles.terms}>
                By registering you agree to our{" "}
                <span style={styles.link}>Terms of Service</span> and{" "}
                <span style={styles.link}>Privacy Policy</span>.
              </p>

              <div style={styles.footer}>
                Already have an account?{" "}
                <span style={styles.footerLink}>Sign in</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}