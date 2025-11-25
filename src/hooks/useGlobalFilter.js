import { useEffect, useState } from "react";

export default function useGlobalFilter(delay = 300) {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilter(input);
    }, delay);

    return () => clearTimeout(handler);
  }, [input, delay]);

  return { input, setInput, filter };
}
