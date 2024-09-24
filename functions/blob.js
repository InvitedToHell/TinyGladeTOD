export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);

    // Get the URLSearchParams
    const params = url.searchParams;
    const cid = params.get("cid");
    const resp = await fetch(
      `https://ryeland.pouncelight.games/v1/blob/${cid}`
    );
    return new Response(await resp.blob());
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
