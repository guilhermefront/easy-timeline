'use client';

export default function Sign() {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" />
        <input type="password" />
        <button type="submit">signsdsd</button>
      </form>
    </div>
  );
}
