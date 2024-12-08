export function ErrorMessage({ message }) {
  console.log(message);

  return <p className="error">{message}</p>;
}
