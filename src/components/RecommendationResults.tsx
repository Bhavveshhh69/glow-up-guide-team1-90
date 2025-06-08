
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RecommendationResultsProps {
  recommendations: string;
  onStartOver: () => void;
}

const RecommendationResults = ({ recommendations, onStartOver }: RecommendationResultsProps) => {
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
            <CardTitle className="text-2xl text-gray-800">
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
                      <div className="overflow-x-auto my-4">
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
                      <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 pb-2 border-b-2 border-green-200">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-gray-700">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-1">
                        {children}
                      </li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
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
                      <strong className="font-semibold text-gray-900">
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
                  {recommendations || "Processing your recommendations... Please wait a moment."}
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
