export function createGoogleMapsLink(from, to, places = []) {
  const waypoints = places.join("|");

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    from
  )}&destination=${encodeURIComponent(
    to
  )}&waypoints=${encodeURIComponent(waypoints)}`;
}
