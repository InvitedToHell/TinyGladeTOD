export async function onRequest(context) {
  try {
    const { cid } = context.request.url.searchParams;
    const resp = await fetch(
      `https://ryeland.pouncelight.games/v1/blob/${cid}`
    );
    return new Response(await resp.blob());
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
