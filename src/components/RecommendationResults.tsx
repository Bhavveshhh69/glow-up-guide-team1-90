import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, User, Eye, Droplets, Sun } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RecommendationResultsProps {
  recommendations: string;
  onStartOver: () => void;
}

const RecommendationResults = ({ recommendations, onStartOver }: RecommendationResultsProps) => {
  // Function to parse and format the plain text recommendations
  const formatRecommendations = (text: string) => {
    if (!text) return "Processing your recommendations... Please wait a moment.";
    
    // Check if it's already markdown formatted
    if (text.includes('##') || text.includes('|') || text.includes('**')) {
      return text;
    }
    
    // Clean up the text and split into lines
    const lines = text.split(/[\n\r]+/).filter(line => line.trim());
    let formattedText = '';
    let currentSection = '';
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) return;
      
      // Check for main section headers
      if (trimmedLine === 'Skin Analysis' || trimmedLine.includes('Skin Analysis')) {
        formattedText += `## 📊 **Skin Analysis**\n\n`;
        currentSection = 'analysis';
      } else if (trimmedLine === 'Recommended Skincare Products' || trimmedLine.includes('Recommended Skincare Products')) {
        formattedText += `\n## 🧴 **Recommended Skincare Products**\n\n`;
        currentSection = 'products';
      } else if (trimmedLine.startsWith('- ')) {
        // Handle bullet points in analysis section
        if (currentSection === 'analysis') {
          const content = trimmedLine.substring(2).trim();
          if (content.includes(':')) {
            formattedText += `**${content}**\n\n`;
          } else {
            formattedText += `- ${content}\n`;
          }
        } else {
          formattedText += `${trimmedLine}\n`;
        }
      } else if (trimmedLine.includes('Skin Age:') || trimmedLine.includes('Estimated Real Age:') || 
                 trimmedLine.includes('Skin Type:') || trimmedLine.includes('Skin Concerns:')) {
        formattedText += `**${trimmedLine}**\n\n`;
      } else if (currentSection === 'products' && trimmedLine && !trimmedLine.includes(':')) {
        // Product names - format as list items
        formattedText += `- **${trimmedLine}**\n`;
      } else if (trimmedLine.includes(':')) {
        // Any other field with colon
        formattedText += `**${trimmedLine}**\n\n`;
      } else if (trimmedLine) {
        // Regular text or product names
        if (currentSection === 'products') {
          formattedText += `- **${trimmedLine}**\n`;
        } else {
          formattedText += `${trimmedLine}\n\n`;
        }
      }
    });
    
    return formattedText;
  };

  const formattedRecommendations = formatRecommendations(recommendations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
                Your Skincare Recommendations
              </h1>
              <p className="text-green-100 mt-1">Personalized analysis by Team 1</p>
            </div>
            <Button
              onClick={onStartOver}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <User className="w-6 h-6" />
              Your Personalized Skincare Plan
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Based on your uploaded photos and concerns, here are our recommendations
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-400">
              <div className="prose prose-lg max-w-none text-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gradient-to-r from-green-100 to-blue-100">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">
                        {children}
                      </td>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 pb-2 border-b-2 border-green-200 flex items-center gap-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6 flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg border-l-4 border-green-400">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-5 flex items-center gap-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-gray-700 text-base">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none mb-6 space-y-2 text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-2 flex items-start gap-3 bg-white/60 p-3 rounded-lg border-l-2 border-blue-300 shadow-sm">
                        <span className="text-blue-500 mt-1 flex-shrink-0">
                          <Droplets className="w-4 h-4" />
                        </span>
                        <span className="flex-1 leading-relaxed">{children}</span>
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-300 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className?.includes('language-');
                      if (isInline) {
                        return (
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono text-gray-800 overflow-x-auto">
                          {children}
                        </code>
                      );
                    },
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900 bg-yellow-100/50 px-1 rounded">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-700">
                        {children}
                      </em>
                    ),
                  }}
                >
                  {formattedRecommendations}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button
                onClick={onStartOver}
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Get Another Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationResults;
