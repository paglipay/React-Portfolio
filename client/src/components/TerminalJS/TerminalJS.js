import React, { useEffect, useRef } from 'react';

const TerminalJSWrapper = () => {
  const termRef = useRef(null);
  const terminal = useRef(null);

  useEffect(() => {
    if (window.Terminal && !terminal.current) {
      // Initialize terminal
      terminal.current = new window.Terminal({
        x: 80,
        y: 24,
        termDiv: termRef.current,
      });

      terminal.current.write('Welcome to Terminal.js!\n');
      terminal.current.write('Type something and press Enter:\n\n');

      // Start the input loop
      promptInput();
    }

    function promptInput() {
      terminal.current.write('> ');
      terminal.current.input((input) => {
        terminal.current.write(`\nYou typed: ${input}\n\n`);
        promptInput(); // Loop again
      });
    }

    return () => {
      if (terminal.current) {
        terminal.current.cursorOff();
        terminal.current.clear();
        terminal.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={termRef}
      style={{
        width: '800px',
        height: '400px',
        border: '1px solid #333',
        backgroundColor: 'black',
        color: 'white',
        overflow: 'hidden',
      }}
    />
  );
};

export default TerminalJSWrapper;
