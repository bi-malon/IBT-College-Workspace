export default function ErrorMessage({ message }) {
  return (
    <div className="state-message state-message--error" role="alert">
      {message || "Something went wrong. Please try again."}
    </div>
  );
}
