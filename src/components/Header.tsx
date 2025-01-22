import React, { useEffect } from 'react';

export function Header() {
  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Roboto',
        'url(https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2)'
      );
      try {
        await font.load();
        document.fonts.add(font);
        console.log('Roboto font loaded successfully');
      } catch (error) {
        console.error('Error loading Roboto font:', error);
      }
    };
    loadFont();
  }, []);

  return (
    <header className="flex items-center gap-4 p-4 bg-brand-dark">
      <img
        src="/lovable-uploads/14a03776-0d27-4279-a29f-a0e210b38519.png"
        alt="Automation Ally Logo"
        className="w-10 h-10"
      />
      <h1 className="font-roboto text-2xl font-bold text-black">
        Automation Ally
      </h1>
    </header>
  );
}