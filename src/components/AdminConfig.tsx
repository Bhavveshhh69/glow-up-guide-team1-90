
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminConfigProps {
  isOpen: boolean;
  onClose: () => void;
  webhookUrl: string;
  onWebhookUrlChange: (url: string) => void;
}

const AdminConfig = ({ isOpen, onClose, webhookUrl, onWebhookUrlChange }: AdminConfigProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Configuration Saved",
      description: "n8n webhook URL has been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800">
            <Settings className="w-5 h-5 text-purple-500" />
            Admin Configuration
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url" className="text-sm font-medium text-gray-700">
              n8n Webhook URL
            </Label>
            <Input
              id="webhook-url"
              type="url"
              value={webhookUrl}
              onChange={(e) => onWebhookUrlChange(e.target.value)}
              placeholder="https://your-n8n-instance.com/webhook/..."
              className="border-2 border-gray-200 focus:border-purple-400 transition-colors"
            />
            <p className="text-xs text-gray-500">
              Enter the complete webhook URL from your n8n workflow
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminConfig;
