
import React, { useState, useRef } from 'react';
import Section from './Section';
import { GoogleGenAI } from "@google/genai";
import { UploadIcon, ImageIcon, MagicIcon, XIcon } from './icons/Icons';

interface AnalysisResult {
  colors: string[];
  layout: string;
  components: string;
}

const AIUiInspector: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
            setResult(null);
        };
        reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Extract base64 data without the prefix
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a Senior Frontend Engineer and UI/UX Designer. Analyze this UI screenshot.
        Return a JSON object with strictly these 3 fields:
        1. "colors": An array of the top 5 dominant hex color codes.
        2. "layout": A concise string describing the layout structure (e.g., "Two-column grid with sticky sidebar").
        3. "components": A concise string listing the likely React components used (e.g., "HeroSection, NavBar, CardGrid").
        
        Do not include markdown formatting like \`\`\`json. Just return the raw JSON string.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { inlineData: { mimeType: mimeType, data: base64Data } },
                { text: prompt }
            ]
        }
      });

      const text = response.text || "{}";
      // Clean up if model adds markdown
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanText);
      
      setResult({
        colors: data.colors || [],
        layout: data.layout || "Could not analyze layout.",
        components: data.components || "Could not identify components."
      });

    } catch (error) {
      console.error("Analysis failed:", error);
      setResult({
        colors: [],
        layout: "Error analyzing image. Please try again.",
        components: ""
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Section id="ai-playground" title="AI UI Inspector">
        <div className="max-w-5xl mx-auto">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                Experience the power of Multimodal AI. Upload a screenshot of any website or UI design, and I'll use Gemini Vision to reverse-engineer its color palette, layout structure, and component hierarchy.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Upload Area */}
                <div 
                    className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] transition-all duration-300 ${selectedImage ? 'border-accent bg-accent/5' : 'border-gray-300 dark:border-gray-700 hover:border-accent hover:bg-gray-50 dark:hover:bg-white/5'}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    {selectedImage ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img src={selectedImage} alt="Uploaded UI" className="max-h-[350px] w-auto object-contain rounded-lg shadow-lg" />
                            <button 
                                onClick={clearImage}
                                className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4 pointer-events-none">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
                                <ImageIcon className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary dark:text-light">Drop your UI screenshot here</h3>
                                <p className="text-sm text-gray-500 mt-2">or click to browse files</p>
                            </div>
                        </div>
                    )}
                    
                    {!selectedImage && (
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    )}
                </div>

                {/* Analysis Control & Results */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-secondary/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm h-full flex flex-col">
                        <h3 className="text-xl font-bold text-primary dark:text-light mb-6 flex items-center gap-2">
                            <MagicIcon className="w-6 h-6 text-accent" />
                            Analysis Results
                        </h3>

                        {!result && !isAnalyzing && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 space-y-4 py-10 opacity-60">
                                <UploadIcon className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                                <p>Upload an image to see the breakdown here.</p>
                            </div>
                        )}

                        {isAnalyzing && (
                             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-10">
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <p className="text-accent animate-pulse font-medium">Analyzing UI Patterns...</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Colors */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-3">Color Palette</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {result.colors.map((color, i) => (
                                            <div key={i} className="group flex flex-col items-center gap-1">
                                                <div 
                                                    className="w-12 h-12 rounded-lg shadow-sm border border-black/10 transition-transform hover:scale-110"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <span className="text-[10px] font-mono text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">{color}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Layout */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">Layout Structure</h4>
                                    <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-lg border-l-4 border-blue-400">
                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{result.layout}</p>
                                    </div>
                                </div>

                                {/* Components */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 mb-2">React Components</h4>
                                    <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-lg border-l-4 border-purple-400 font-mono text-xs text-gray-700 dark:text-gray-300">
                                        {result.components}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-6">
                            <button
                                onClick={analyzeImage}
                                disabled={!selectedImage || isAnalyzing}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                                    !selectedImage || isAnalyzing 
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-accent text-primary hover:shadow-accent/30 hover:-translate-y-1'
                                }`}
                            >
                                {isAnalyzing ? 'Processing...' : 'Analyze Design'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
  );
};

export default AIUiInspector;
