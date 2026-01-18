export default function TextInput({ text, setText }) {
  return (
    <textarea
      className="
        w-full 
        h-36 
        p-4 
        border 
        border-gray-300 
        rounded-lg 
        resize-none 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500
      "
      placeholder="Paste clinical notes here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
