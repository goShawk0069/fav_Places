const GOOGLE_API_KEY = "AIzaSyAFtCeCUYm6K1QXujT_m17aRvbC9hRxr2k";

export default function getUserLocation(lat, lon) {
  const location =
    `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${GOOGLE_API_KEY}`;

  return location;
}



export async function formattedAddress(lat, lng){
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  const response =  await fetch(url)
  if(!response.ok){
    throw new Error('Failed to fetch address');
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}