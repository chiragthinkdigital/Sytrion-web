"use client";

import { useCallback, useEffect, useState } from "react";

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/admin/contact-messages");
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadMessages();
      setLoading(false);
    })();
  }, [loadMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setUsername("");
        setPassword("");
        await loadMessages();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Login failed.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setMessages([]);
    setAuthenticated(false);
  };

  return (
    <>
      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #f4f5f2;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }
        .admin-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: clamp(20px, 4vw, 36px) clamp(20px, 5vw, 64px);
          background: #0c1b30;
        }
        .admin-bar h1 {
          margin: 0;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 700;
          color: #ffffff;
        }
        .admin-bar p {
          margin: 4px 0 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }
        .admin-logout {
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          border-radius: 999px;
          padding: 10px 22px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .admin-logout:hover {
          border-color: #C6E84A;
          color: #C6E84A;
        }
        .admin-main {
          padding: clamp(24px, 5vw, 56px);
          max-width: 1200px;
          margin: 0 auto;
        }
        .admin-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 16px -6px rgba(12, 27, 48, 0.12);
          overflow: hidden;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #5a5d66;
          background: #fafbf8;
          padding: 14px 20px;
          border-bottom: 1px solid #ecece8;
          white-space: nowrap;
        }
        .admin-table td {
          padding: 16px 20px;
          font-size: 14px;
          color: #0f0f0f;
          vertical-align: top;
          border-bottom: 1px solid #f0f0ec;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .admin-table td.admin-msg {
          line-height: 1.6;
          color: #5a5d66;
          max-width: 340px;
        }
        .admin-table td.admin-date {
          color: #8a8e96;
          font-size: 13px;
          white-space: nowrap;
        }
        .admin-empty {
          padding: 48px 24px;
          text-align: center;
          color: #8a8e96;
          font-size: 15px;
        }
        .admin-login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #f4f5f2;
        }
        .admin-login-card {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 16px -6px rgba(12, 27, 48, 0.12);
          padding: 40px 32px;
        }
        .admin-login-card h1 {
          margin: 0 0 8px;
          font-family: var(--font-syne), Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #0f0f0f;
        }
        .admin-login-card p {
          margin: 0 0 28px;
          font-size: 14px;
          color: #8a8e96;
        }
        .admin-login-card input {
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 14px;
          padding: 14px 18px;
          font-size: 15px;
          font-family: inherit;
          color: #0f0f0f;
          outline: none;
          margin-bottom: 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-login-card input:focus {
          border-color: #C6E84A;
          box-shadow: 0 0 0 3px rgba(198, 232, 74, 0.12);
        }
        .admin-login-card button {
          width: 100%;
          background: #C6E84A;
          color: #0f0f0f;
          border: none;
          border-radius: 999px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .admin-login-card button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(198, 232, 74, 0.35);
        }
        .admin-login-error {
          color: #e53e3e;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .admin-loader {
          padding: 56px 24px;
          text-align: center;
          color: #8a8e96;
          font-size: 14px;
        }
        @media (max-width: 720px) {
          .admin-table th, .admin-table td {
            padding: 12px 14px;
          }
          .admin-table td.admin-msg {
            max-width: 220px;
          }
        }
      `}</style>

      {loading ? (
        <div className="admin-login-wrap">
          <div className="admin-loader">Loading...</div>
        </div>
      ) : !authenticated ? (
        <div className="admin-login-wrap">
          <div className="admin-login-card">
            <h1>Admin Login</h1>
            <p>Enter your admin credentials to view contact submissions.</p>
            {loginError && <div className="admin-login-error">{loginError}</div>}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Username"
                autoComplete="username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
              />
              <button type="submit" disabled={loggingIn} style={{ opacity: loggingIn ? 0.7 : 1 }}>
                {loggingIn ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-page">
          <header className="admin-bar">
            <div>
              <h1>Contact Submissions</h1>
              <p>{messages.length} message{messages.length === 1 ? "" : "s"} received</p>
            </div>
            <button className="admin-logout" onClick={handleLogout}>
              Logout
            </button>
          </header>

          <main className="admin-main">
            <div className="admin-card">
              {messages.length === 0 ? (
                <div className="admin-empty">No contact messages yet.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((m) => (
                        <tr key={m.id}>
                          <td style={{ fontWeight: 600 }}>{m.full_name}</td>
                          <td>
                            <a href={`mailto:${m.email}`} style={{ color: "#618300", textDecoration: "none" }}>
                              {m.email}
                            </a>
                          </td>
                          <td>{m.phone ?? "—"}</td>
                          <td className="admin-msg">{m.message}</td>
                          <td className="admin-date">
                            {new Date(m.created_at).toLocaleString(undefined, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
}