
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft } from "lucide-react";

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
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {recommendations || "Processing your recommendations... Please wait a moment."}
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
