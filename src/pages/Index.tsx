import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Copy,
  Download,
  Rocket,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Toast = ({ toast, onClose }) => {
  const getStyles = () => {
    switch (toast.variant) {
      case "destructive":
        return "bg-red-500 text-white border-red-600";
      case "success":
        return "bg-green-500 text-white border-green-600";
      default:
        return "bg-slate-800 text-white border-slate-700";
    }
  };

  const getIcon = () => {
    switch (toast.variant) {
      case "destructive":
        return <AlertCircle className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        toast.show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`rounded-lg border shadow-lg p-4 ${getStyles()}`}>
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <div className="font-semibold text-sm">{toast.title}</div>
            <div className="text-sm opacity-90 mt-1">{toast.description}</div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [url, setUrl] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const [generated, setGenerated] = useState({ llmstxt: "", llmsfulltxt: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant, show: true, id: Date.now() });
  };

  const hideToast = () => setToast((prev) => prev && { ...prev, show: false });

  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => hideToast(), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (toast && !toast.show) {
      const timer = setTimeout(() => setToast(null), 300);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const generateLLMsTxt = async () => {
    if (!url.trim()) {
      showToast("URL Missing", "Please enter a valid URL", "destructive");
      return;
    }

    setIsGenerating(true);
    setGenerated({ llmstxt: "", llmsfulltxt: "" });

    try {
      const res = await fetch(
        "https://llms-backend-1.onrender.com/generate-llms-txt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, showFullText }),
        }
      );

      const json = await res.json();
      const response = json.data;

      if (response.success) {
        const llmsData = {
          llmstxt: response.data.llmstxt?.replace(/<br>/g, "\n") || "",
          llmsfulltxt: response.data.llmsfulltxt?.replace(/<br>/g, "\n") || "",
        };

        // Display only one based on toggle
        if (showFullText) {
          setGenerated({ llmstxt: "", llmsfulltxt: llmsData.llmsfulltxt });
        } else {
          setGenerated({ llmstxt: llmsData.llmstxt, llmsfulltxt: "" });
        }

        showToast("Success", "LLMs.txt generated successfully!", "success");
      } else {
        showToast(
          "Error",
          response.message || "Failed to generate",
          "destructive"
        );
      }
    } catch (err) {
      showToast("Server Error", err.message, "destructive");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text.replace(/<br>/g, "\n"));
      showToast("Copied!", "Text copied to clipboard", "success");
    } catch {
      showToast("Copy Failed", "Failed to copy text", "destructive");
    }
  };

  const downloadText = (text, filename) => {
    const blob = new Blob([text.replace(/<br>/g, "\n")], {
      type: "text/plain",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB100] via-[#FFB100] to-[#FFB100] px-4 py-20">
      {toast && <Toast toast={toast} onClose={hideToast} />}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent"></h1>
        <p className="text-xl text-slate-800 font-medium"></p>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/30">
          <Input
            type="url"
            placeholder="Enter your website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-white border-0 text-slate-800 placeholder:text-slate-500/70 h-14 text-lg"
          />
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex items-center space-x-2">
            <Label className="text-slate-800 font-medium">Full Text</Label>
            <Switch
              checked={showFullText}
              onCheckedChange={setShowFullText}
              className="data-[state=checked]:bg-slate-800"
            />
          </div>

          <Button
            onClick={generateLLMsTxt}
            disabled={isGenerating}
            className="h-12 px-6 text-lg bg-gradient-to-r from-slate-800 to-slate-600 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-5 w-5" /> Generate Now
              </>
            )}
          </Button>
        </div>

        {generated.llmstxt && (
          <Card className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">llms.txt</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-slate-800 whitespace-pre-wrap overflow-x-auto">
                {generated.llmstxt}
              </pre>
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => copyText(generated.llmstxt)}
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadText(generated.llmstxt, "llms.txt")}
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800"
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {generated.llmsfulltxt && (
          <Card className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">
                llms-full.txt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm text-slate-800 whitespace-pre-wrap overflow-x-auto">
                {generated.llmsfulltxt}
              </pre>
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => copyText(generated.llmsfulltxt)}
                  className="bg-white text-slate-800 border border-slate-300 hover:bg-slate-800"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    downloadText(generated.llmsfulltxt, "llms-full.txt")
                  }
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
