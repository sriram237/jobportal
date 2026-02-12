import API_BASE from "./api";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Link, useParams } from "react-router-dom";

async function applyjobAction(_, formData) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(`${API_BASE}/apply/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      job: formData.get("job"),
      applicant: loggedUser?.id,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    return { message: data.message, success: true };
  } else {
    return { message: data.message || "Failed to apply", success: false };
  }
}

export default function ApplyJobPage() {
  const { jobId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  const [result, formAction, isPending] = useActionState(
    applyjobAction,
    null,
    { withPending: true }
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          <h1 className="text-xl font-bold text-blue-700">
            JobPortal
          </h1>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Hello, {user.username}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-white font-semibold">
                {user.username[0].toUpperCase()}
              </div>
            </div>
          )}

        </div>
      </header>

      {/* BACK LINK */}
      <Link
        to="/jobs"
        className="ml-10 mt-6 text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back to Jobs
      </Link>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold">
            Apply for this job
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your profile will be shared with the recruiter
          </p>

          <form action={formAction} className="mt-5 space-y-4">
            <input type="hidden" name="job" value={jobId} />

            <button
              type="submit"
              disabled={isPending || result?.success === false}
              className={`w-full rounded-lg py-2.5 font-semibold text-white
                ${
                  result?.success === false
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
            >
              {isPending ? "Applying..." : "Apply Now"}
            </button>

            {result && (
              <p
                className={`text-center text-sm ${
                  result.success
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {result.message}
              </p>
            )}
          </form>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
          © 2026 JobPortal.com | All rights reserved
        </div>
      </footer>

    </div>
  );
}
