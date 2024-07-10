"use client";

import { useState } from "react";

import { Button } from "./ui/button";

const Copy = ({ title }: { title: string }) => {
    const [hasCopied, setHasCopied] = useState(false);

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(title);
    //     setHasCopied(true);

    //     setTimeout(() => {
    //     setHasCopied(false);
    //     }, 2000);
    // };
    // utils/copyToClipboard.js

    const copyToClipboard = () => {
        if (navigator.clipboard) {
        navigator.clipboard.writeText(title).then(
            () => {
            console.log('Text copied to clipboard');
            setHasCopied(true);
            setTimeout(()=>{
                setHasCopied(false);
            }, 2000)
            },
            (err) => {
            console.error('Failed to copy text: ', err);
            }
        );
        } else {
        const textArea = document.createElement('textarea');
        textArea.value = title;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setHasCopied(true);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
        }
    };
    

  return (
    <Button
      data-state="closed"
      className="mt-3 flex max-w-[320px] gap-4"
      variant="secondary"
      onClick={copyToClipboard}
    >
      <p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-2">
        {title}
      </p>

       {!hasCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mr-2 size-4"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mr-2 size-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </Button>
  );
};

export default Copy;