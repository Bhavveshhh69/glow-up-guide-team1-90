
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Sparkles, Settings, Loader } from "lucide-react";
import AdminConfig from "@/components/AdminConfig";
import RecommendationResults from "@/components/RecommendationResults";

const Index = () => {
  const [email, setEmail] = useState('');
  const [concerns, setConcerns] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [recommendations, setRecommendations] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://randomnames.app.n8n.cloud/webhook-test/8ec5d0d9-8d1d-46d6-9fa5-3796a05f4060');
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      toast({
        title: "Too many images",
        description: "Please select up to 3 images only.",
        variant: "destructive",
      });
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !concerns || images.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl) {
      toast({
        title: "Configuration Required",
        description: "Please configure the webhook URL in admin settings.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Submitting data to n8n webhook:", { email, concerns, imageCount: images.length });

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('concerns', concerns);
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        setRecommendations(result);
        toast({
          title: "Analysis Complete!",
          description: "Your skincare recommendations are ready.",
        });
      } else {
        const errorText = await response.text();
        console.error("Webhook response error:", errorText);
        throw new Error(`Webhook responded with status ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please check your webhook configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setConcerns('');
    setImages([]);
    setRecommendations('');
  };

  if (recommendations) {
    return (
      <RecommendationResults 
        recommendations={recommendations} 
        onStartOver={resetForm}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 rounded-full">
                <Loader className="w-8 h-8 text-white animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Analyzing Your Skin
                </h3>
                <p className="text-gray-600">
                  Our AI is processing your photos and concerns. This may take a few moments...
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 w-full">
                <p className="text-sm text-gray-700">
                  Please wait while we generate your personalized skincare recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
                Skin Care Recommendation Model
              </h1>
              <p className="text-pink-100 mt-1">Developed by Team 1</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdmin(true)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10">
            <CardTitle className="text-2xl text-gray-800">
              Get Your Personalized Skincare Analysis
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Upload your photos and tell us about your skin concerns to receive customized recommendations
            </p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-2 border-purple-200 focus:border-purple-400 transition-colors"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="images" className="text-sm font-medium text-gray-700">
                  Upload Photos (Max 3)
                </Label>
                <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors bg-gradient-to-br from-pink-50/50 to-purple-50/50">
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-3 rounded-full">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 10MB each
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((image, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                      >
                        {image.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Concerns Textarea */}
              <div className="space-y-2">
                <Label htmlFor="concerns" className="text-sm font-medium text-gray-700">
                  Describe Your Skin Concerns
                </Label>
                <Textarea
                  id="concerns"
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  placeholder="Tell us about your skin type, specific concerns, current routine, or any issues you'd like to address..."
                  rows={4}
                  className="border-2 border-blue-200 focus:border-blue-400 transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Get My Recommendations</span>
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Admin Modal */}
      <AdminConfig 
        isOpen={showAdmin}
        onClose={() => setShowAdmin(false)}
        webhookUrl={webhookUrl}
        onWebhookUrlChange={setWebhookUrl}
      />
    </div>
  );
};

export default Index;
