export default function decodeJwt(jwt: string) {
  const parts = jwt.split(".");
  const payload = JSON.parse(atob(parts[1]));

  return payload;
}
