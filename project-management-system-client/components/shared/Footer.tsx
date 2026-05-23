import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="border-t border-gray-200 dark:border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            © {year},{" "}
            <span className="font-semibold">FedIQ</span>
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            AI-powered feedback classification using LLM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
