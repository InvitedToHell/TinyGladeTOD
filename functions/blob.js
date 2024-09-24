export async function onRequest(context) {
  const { cid } = context.request.url.searchParams;
  return fetch(`https://ryeland.pouncelight.games/v1/blob/${cid}`);
}
