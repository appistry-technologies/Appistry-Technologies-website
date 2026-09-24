"use client";

import { useState } from "react";
import { reload, sendEmailVerification } from "firebase/auth";
import { useAdmin } from "./admin-provider";

export function AccessHelp() {
  const { user, signOut } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  if (!user) return null;

  const allowed = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",").map(email => email.trim().toLowerCase())
    .includes(user.email?.toLowerCase() || "");

  async function perform(action: () => Promise<void>) {
    setBusy(true);
    setMessage("");
    try { await action(); }
    catch { setMessage("Could not complete this request. Please try again shortly."); }
    finally { setBusy(false); }
  }

  return (
    <div className="admin-item admin-message">
      <p>Signed in as <strong>{user.email}</strong>.</p>
      <p>{allowed && !user.emailVerified
        ? "Your account is approved. Verify your email address to finish enabling admin access."
        : allowed
          ? "Your account is approved. Refresh your access to open the dashboard."
          : "This account is not approved for admin access. Sign out and use the approved owner account."}</p>
      {allowed && !user.emailVerified && (
        <button type="button" disabled={busy || sent} onClick={() => perform(async () => {
          await sendEmailVerification(user);
          setSent(true);
          setMessage("Verification email sent. Open the link in your inbox, then select Check access below.");
        })}>{sent ? "Verification email sent" : "Send verification email"}</button>
      )}
      {allowed && <button type="button" disabled={busy} onClick={() => perform(async () => {
        await reload(user);
        await user.getIdToken(true);
        if (!user.emailVerified) setMessage("Your email is not verified yet. Open the verification link in your inbox, then try again.");
        else window.location.reload();
      })}>{busy ? "Please wait..." : "Check access"}</button>}
      <button type="button" disabled={busy} onClick={() => perform(signOut)}>Sign out / switch account</button>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
