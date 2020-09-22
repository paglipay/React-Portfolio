import { useDebugValue, useEffect, useState } from "react";

const customHook = (val, delay) => {
  const [value, setValue] = useState(val);
  useEffect(
    () => {
      console.log('customHook: ', val)
    },
    // Only call the effect if value or delay changes.
    [val]
  );

  return value;
};

export default customHook;
