
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Copy, Rocket, ArrowDown, CircleCheck, MessageSquare, FileText } from 'lucide-react';

const Index = () => {
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('2');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const { toast } = useToast();

  const generateLLMsTxt = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to generate llms.txt",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const sampleContent = `# LLMs.txt for ${url}

This website provides ${tone === 'professional' ? 'professional services and expertise' : tone === 'friendly' ? 'friendly solutions and support' : 'compelling offerings'} in various domains.

${length === '3' ? 'Our comprehensive platform delivers exceptional value through innovative approaches, cutting-edge technology, and dedicated customer service. We maintain the highest standards of quality while ensuring accessibility and user satisfaction.\n\n' : ''}Our content is designed to be informative, accurate, and valuable to both human visitors and AI systems seeking to understand our offerings.

${length !== '1' ? '\nPlease respect our content and use it responsibly. For AI training purposes, ensure proper attribution and compliance with our terms of service.' : ''}`;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
      toast({
        title: "Generated Successfully!",
        description: "Your llms.txt file has been created",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "✅ Copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ We'll contact you within 24 hours.",
      description: "Thank you for your interest in our AI SEO services!",
    });
    setContactForm({ name: '', email: '', website: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,177,0,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Generate Your LLMs.txt Instantly
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Protect your content. Help AI understand your site.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="glow-border rounded-lg p-1">
              <Input
                type="url"
                placeholder="Enter your website URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-slate-800 border-0 text-white placeholder-gray-400 h-14 text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="1">1 Paragraph</SelectItem>
                    <SelectItem value="2">2 Paragraphs</SelectItem>
                    <SelectItem value="3">3 Paragraphs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={generateLLMsTxt}
              disabled={isGenerating}
              className="w-full h-14 text-lg golden-gradient hover:scale-105 transition-all duration-300 golden-glow"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900" />
                  Generating...
                </div>
              ) : (
                <>
                  <Rocket className="mr-2 h-5 w-5" />
                  Generate Now
                </>
              )}
            </Button>

            {generatedContent && (
              <div className="glassmorphism rounded-lg p-6 space-y-4 animate-slide-in-right">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-yellow-400">Your LLMs.txt File</h3>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
                <pre className="bg-slate-900 p-4 rounded-lg text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                  {generatedContent}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Our Generator?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The most advanced LLMs.txt generator with intelligent features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glassmorphism card-hover border-slate-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleCheck className="h-8 w-8 text-slate-900" />
                </div>
                <CardTitle className="text-xl text-white">Granular AI Control</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Fine-tune how AI systems interact with your content through precise controls and customizable parameters.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glassmorphism card-hover border-slate-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-slate-900" />
                </div>
                <CardTitle className="text-xl text-white">Instant File Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Generate production-ready llms.txt files in seconds with intelligent content analysis and optimization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glassmorphism card-hover border-slate-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-slate-900" />
                </div>
                <CardTitle className="text-xl text-white">Future-Ready SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 text-center">
                  Stay ahead of AI-driven search evolution with files optimized for next-generation search algorithms.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is LLMs.txt Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">What is LLMs.txt?</h2>
          <div className="glassmorphism rounded-xl p-8 text-left">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              LLMs.txt is a standardized file format that helps AI language models understand and respect your website's content guidelines. Similar to robots.txt for web crawlers, llms.txt provides instructions specifically for AI systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              By implementing an llms.txt file, you can control how AI models access, interpret, and potentially use your content, ensuring better protection and more accurate AI interactions with your site.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your URL",
                description: "Simply paste your website URL and select your preferred tone and content length.",
                icon: <FileText className="h-8 w-8" />
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our system analyzes your site and generates optimized content guidelines.",
                icon: <MessageSquare className="h-8 w-8" />
              },
              {
                step: "3",
                title: "Deploy & Protect",
                description: "Download your llms.txt file and upload it to your website's root directory.",
                icon: <CircleCheck className="h-8 w-8" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto text-slate-900">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-yellow-400 font-semibold">STEP {item.step}</div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="glassmorphism rounded-lg px-6 border-slate-700">
              <AccordionTrigger className="text-white hover:text-yellow-400">
                What exactly does an llms.txt file do?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                An llms.txt file provides instructions to AI language models about how they should interact with your website's content. It can specify usage permissions, content guidelines, and attribution requirements.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="glassmorphism rounded-lg px-6 border-slate-700">
              <AccordionTrigger className="text-white hover:text-yellow-400">
                Where should I place the llms.txt file?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Place the llms.txt file in your website's root directory, just like robots.txt. It should be accessible at yoursite.com/llms.txt.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="glassmorphism rounded-lg px-6 border-slate-700">
              <AccordionTrigger className="text-white hover:text-yellow-400">
                Is llms.txt supported by all AI models?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                While llms.txt is an emerging standard, major AI companies are increasingly recognizing and implementing support for these guidelines. It's a proactive step for future AI interactions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            LLMs.txt is just the beginning. Let's talk strategy.
          </h2>
          <p className="text-xl text-gray-300">
            Ready to future-proof your content for the AI era?
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="golden-gradient hover:scale-105 transition-all duration-300 h-14 px-8 text-lg golden-glow">
                <Rocket className="mr-2 h-5 w-5" />
                Request Free AI SEO Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism border-slate-700 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Get Your Free Consultation</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Let's discuss how to optimize your content for AI-driven search
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label className="text-gray-300">Name</Label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Website</Label>
                  <Input
                    type="url"
                    value={contactForm.website}
                    onChange={(e) => setContactForm({...contactForm, website: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Message</Label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                    rows={3}
                  />
                </div>
                
                <Button type="submit" className="w-full golden-gradient hover:scale-105 transition-all duration-300">
                  Book My Free Call
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 LLMs.txt Generator. Empowering the future of AI-content interaction.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
