import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-brand-dark text-gray-400 text-center border-t border-gray-800">
      <p className="text-sm">
        © {currentYear} Automation Ally. All rights reserved.
      </p>
    </footer>
  );
};