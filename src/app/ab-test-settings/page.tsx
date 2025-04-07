'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { generateIdeas } from './abTestService';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function ABTestSettings() {
  const [version, setVersion] = useState('A');
  const [showRating, setShowRating] = useState(false);
  const [freeShip, setFreeShip] = useState(false);
  const [newVersion, setNewVersion] = useState('');
  const [versions, setVersions] = useState(['A', 'B']);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [aiIdeas, setAiIdeas] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaignStyle, setCampaignStyle] = useState('default');

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = version === 'A' ? '/version-a' : '/version-b';
    }
  }, [version]);

  const handleApplyChanges = () => {
    if (!newVersion.trim()) {
      alert('Please enter a new version name.');
      return;
    }
    if (newVersion && !versions.includes(newVersion)) {
      setVersions([...versions, newVersion]);
      setVersion(newVersion);
      localStorage.setItem('abTestVersion', newVersion);
      setNewVersion('');
    } else {
      localStorage.setItem('abTestVersion', version);
    }
    localStorage.setItem('showRating', showRating.toString());
    localStorage.setItem('freeShip', freeShip.toString());
    localStorage.setItem('campaignStyle', campaignStyle);
    setIsDialogOpen(false);
  };

  const clearLocalStorage = () => {
    const hasSeenWelcomePopup = localStorage.getItem('hasSeenWelcomePopup');
    localStorage.clear();
    if (hasSeenWelcomePopup) {
      localStorage.setItem('hasSeenWelcomePopup', hasSeenWelcomePopup);
    }
    window.location.reload();
  };

  const handleGenerateIdeas = async () => {
    setLoading(true);
    try {
      const ideas = await generateIdeas();
      setAiIdeas(ideas);
      setShowResult(true);
    } catch (error: any) {
      if (error.message.includes('401')) {
        toast({
          title: 'Unauthorized',
          description: 'Failed to generate ideas. Please check and add your OpenAI API key in the .env file.',
          variant: 'destructive',
          duration: 5000
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
          duration: 5000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    const hasSeenWelcomePopup = localStorage.getItem('hasSeenWelcomePopup');
    localStorage.clear();
    if (hasSeenWelcomePopup) {
      localStorage.setItem('hasSeenWelcomePopup', hasSeenWelcomePopup);
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`text-3xl font-extrabold mb-6 text-center ${version === 'A' ? 'text-blue-600' : 'text-green-600'} dark:text-white`}>A/B Test Settings</h1>
      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
        {/* <Button
          onClick={() => localStorage.clear()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Clear Local Storage
        </Button> */}
        <label className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300">Select Version:</label>
        <Select value={version} onValueChange={(value) => {
          setVersion(value);
          localStorage.setItem('abTestVersion', value);
        }}>
          
          <SelectTrigger className="w-40 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm focus-visible:ring-offset-0 focus-visible:ring-0">
            <SelectValue placeholder="Select a version" />
          </SelectTrigger>
          <SelectContent>
            {versions.map((v) => (
              <SelectItem key={v} value={v}>Version {v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetTrigger asChild className='text-center'>
            <Button className="bg-primary text-white px-4 py-2 shadow-md transition duration-300 " onClick={handleOpenDialog}>Customize Options</Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-xl font-bold mb-4">Customize A/B Test Options</h2>
            <div className="flex items-center mb-4">
              <Label className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300"> Name:</Label>
              <Input
                type="text"
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <Label className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300">Show Rating:</Label>
              <Switch checked={showRating} onCheckedChange={setShowRating} />
            </div>
            <div className="flex items-center mb-4">
              <Label className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300">Free Ship:</Label>
              <Switch checked={freeShip} onCheckedChange={setFreeShip} />
            </div>
           
            <div className="flex items-center mb-4">
              <Label className="mr-4 text-lg font-medium text-gray-700 dark:text-gray-300">Campaign Style:</Label>
              <Select value={campaignStyle} onValueChange={setCampaignStyle}>
                <SelectTrigger className="w-40 border border-gray-300 dark:border-gray-600 p-2 rounded-lg shadow-sm focus-visible:ring-offset-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="blackfriday">Black Friday</SelectItem>
                  <SelectItem value="christmas">Christmas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleApplyChanges} className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition duration-300">Apply Changes</Button>
          </SheetContent>
        </Sheet>
        <Button
          onClick={handleGenerateIdeas}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          {loading ? <Spinner /> : 'Generate A/B Test Ideas with OPEN AI'}
        </Button>
        <Button onClick={clearLocalStorage} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
        Refresh local storage
      </Button>
      </div>

      {showResult && (
        <div className="max-w-xl mx-auto mt-4 p-4 border rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">AI-generated A/B Testing Ideas</h2>
          <div className="max-h-80 overflow-auto whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
            {aiIdeas}
          </div>
          <Button onClick={() => setShowResult(false)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg">
            Close
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="/"
          title="E-commerce Site Preview"
          className="w-full h-[500px] border-none"
        ></iframe>
      </div>
    </div>
  );
} 