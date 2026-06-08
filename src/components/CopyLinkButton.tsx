import React, { useState } from 'react';
import { Link, Check } from 'lucide-react';

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-all border ${
        copied
          ? 'bg-zinc-900 text-white border-zinc-900'
          : 'bg-white text-zinc-700 hover:bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}
