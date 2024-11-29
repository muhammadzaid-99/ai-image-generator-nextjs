"use client";

import React, { useState } from "react";
import { MdLink } from "react-icons/md";
import { MdCheck } from "react-icons/md";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isCopying, setIsCopying] = useState(false)

  const generateImage = async () => {
    if (prompt.length < 20) return; // Ensure prompt is valid
    setIsLoading(true);

    const data = {
      prompt: prompt,
    };

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json(); // Parse the JSON response
        setImageUrl(result.public_url);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  async function copyImageUrlButtonClick() {
    setIsCopying(true)
    navigator.clipboard.writeText(imageUrl)

    setTimeout(() => {
      setIsCopying(false)
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r">
      <h1 className="text-3xl font-extrabold mb-4 text-center">AI Image Generator</h1>
      
      <input
        className="w-96 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 mb-4 text-gray-700"
        type="text"
        placeholder="Enter a descriptive prompt (at least 20 characters)..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      
      <button
        className={`w-96 py-3 text-white font-semibold rounded-md ${prompt.length < 20 || isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 transition duration-300"
        }`}
        onClick={generateImage}
        disabled={prompt.length < 20 || isLoading}
      >
        {isLoading ? "Generating..." : "Generate Image"}
      </button>

      <div className="mt-8 h-96 w-96 flex justify-center items-center border-4 border-blue-300 rounded-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="AI Generated"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        ) : (
          <p className="text-center text-gray-500">Generated image will appear here</p>
        )}
      </div>
      <button disabled={isCopying || !imageUrl} className="bg-green-500 py-1 px-4 rounded-lg mt-4 text-white" onClick={copyImageUrlButtonClick}>
        <span className="flex items-center justify-center gap-2"> <span className="text-lg">{isCopying ? (<MdCheck />): (<MdLink/>)}</span> Copy Image URL</span>
      </button>
      
    </div>
  );
};

export default Home;
