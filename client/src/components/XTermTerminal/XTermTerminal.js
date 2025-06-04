import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XTermTerminal = () => {
  const terminalRef = useRef(null);
  const xterm = useRef(null);
  const fitAddon = useRef(null);

  useEffect(() => {
    // Initialize terminal
    xterm.current = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
      },
    });

    fitAddon.current = new FitAddon();
    xterm.current.loadAddon(fitAddon.current);

    // Attach terminal to DOM
    xterm.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Example output
    xterm.current.writeln('Welcome to xterm.js in React!');

    // Optional: Handle input
    xterm.current.onData(data => {
      xterm.current.write(data); // echo input
    });

    // Resize on window resize
    const handleResize = () => fitAddon.current.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      xterm.current.dispose();
    };
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default XTermTerminal;
