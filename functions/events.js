export async function onRequest(context) {
  const resp = await fetch("https://ryeland.pouncelight.games/v1/events");
  return new Response(await resp.text());
}
