export function onRequest(context) {
  return fetch("https://ryeland.pouncelight.games/v1/events");
}
