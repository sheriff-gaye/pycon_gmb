"use client"
import { useState, useEffect } from 'react';
import { 
  Mic, 
  Users, 
  Award, 
  Star,
  MapPin,
  X,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Clock,
  Tag,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { getActiveSpeakers } from '@/app/actions/speakers';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  image: string;
  bio: string;
  expertise: string[];
  isKeynote: boolean;
  isActive: boolean;
  order: number;
  sessionTitle: string;
  sessionDescription: string;
  sessionDuration: string;
  sessionTrack: string;
  sessionLevel: string;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CallForSpeakersProps {
  initialSpeakers?: Speaker[];
}

const CallForSpeakers = ({ initialSpeakers = [] }: CallForSpeakersProps) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>(initialSpeakers);
  const [isLoading, setIsLoading] = useState(initialSpeakers.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSpeakers.length === 0) {
      fetchSpeakers();
    }
  }, [initialSpeakers.length]);

  const fetchSpeakers = async () => {
    try {
      setIsLoading(true);
      const result = await getActiveSpeakers();
      
      if (result.success) {
        setSpeakers(result.data);
      } else {
        setError(result.error || 'Failed to load speakers');
      }
    } catch (err) {
      console.error('Error fetching speakers:', err);
      setError('Failed to load speakers');
    } finally {
      setIsLoading(false);
    }
  };

  const SpeakerModal = ({ speaker, onClose }: { speaker: Speaker | null; onClose: () => void }) => {
    if (!speaker) return null;

    return (
      <Dialog open={!!speaker} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{speaker.name}</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-t-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                  {speaker.isKeynote && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2 shadow-lg">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                  )}
                </div>
                <div className="text-white text-center md:text-left flex-1">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h2 className="text-3xl font-bold">{speaker.name}</h2>
                    {speaker.isKeynote && (
                      <Badge className="bg-yellow-400 text-yellow-900 border-0 font-bold">
                        KEYNOTE
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-blue-100 mb-2 font-medium">{speaker.title}</p>
                  <p className="text-blue-200 mb-3 font-medium">{speaker.company}</p>
                  <div className="flex items-center justify-center md:justify-start text-blue-100">
                    <MapPin className="w-4 h-4 mr-1" />
                    {speaker.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 p-6">
              {/* Bio */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">{speaker.bio}</p>
              </div>

              {/* Expertise */}
              {speaker.expertise && speaker.expertise.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {speaker.expertise.map((skill, idx) => (
                      <Badge key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:shadow-lg transition-shadow">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Session Details */}
              <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center text-gray-900">
                      <Mic className="w-5 h-5 mr-2 text-blue-600" />
                      {speaker.isKeynote ? 'Keynote Session' : 'Session Details'}
                    </CardTitle>
                    {speaker.isKeynote && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-md">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        KEYNOTE
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-lg font-semibold text-gray-900 mt-2">
                    {speaker.sessionTitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {speaker.sessionDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center text-gray-700 bg-white/60 p-3 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm font-medium">{speaker.sessionDuration}</span>
                    </div>
                    <div className="flex items-center text-gray-700 bg-white/60 p-3 rounded-lg">
                      <Tag className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm font-medium">{speaker.sessionTrack}</span>
                    </div>
                    <div className="flex items-center text-gray-700 bg-white/60 p-3 rounded-lg">
                      <Award className="w-4 h-4 mr-2 text-pink-600" />
                      <span className="text-sm font-medium">{speaker.sessionLevel}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              {(speaker.linkedin || speaker.twitter || speaker.github) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                    Connect with {speaker.name.split(' ')[0]}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {speaker.linkedin && (
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                        <a
                          href={`${speaker.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {speaker.twitter && (
                      <Button asChild className="bg-sky-500 hover:bg-sky-600 shadow-md hover:shadow-lg transition-all">
                        <a
                          href={`${speaker.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    {speaker.github && (
                      <Button asChild className="bg-gray-800 hover:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                        <a
                          href={`${speaker.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Speakers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Meet our amazing lineup of industry leaders and experts who will be sharing their knowledge.
            </p>
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-56" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="border-t pt-3">
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Alert variant="destructive" className="max-w-md mb-4">
              <X className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={fetchSpeakers} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Speakers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Meet our amazing lineup of industry leaders and experts who will be sharing their knowledge and experience at the conference.
          </p>
        </div>

        {speakers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No speakers announced yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
             <Card
                key={speaker.id}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col ${
                  speaker.isKeynote ? 'ring-2 ring-yellow-400 shadow-lg' : ''
                }`}
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {speaker.isKeynote && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg animate-pulse">
                      <Star className="w-4 h-4 mr-1 fill-white" />
                      KEYNOTE
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {speaker.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">
                    {speaker.title}
                  </CardDescription>
                  <p className="text-gray-600 text-xs">{speaker.company}</p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-500 text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {speaker.location}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{speaker.bio}</p>

                  {speaker.expertise && speaker.expertise.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {speaker.expertise.slice(0, 2).map((skill, idx) => (
                        <Badge 
                          key={idx} 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {speaker.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{speaker.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <p className="text-xs font-semibold text-gray-900 mb-1 flex items-center">
                      <Mic className="w-3 h-3 mr-1 text-blue-600" />
                      {speaker.isKeynote ? 'Keynote:' : 'Talk:'}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 font-medium">
                      {speaker.sessionTitle}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      speaker.isKeynote 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md' 
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    } transition-all duration-300`}
                    variant={speaker.isKeynote ? 'default' : 'outline'}
                  >
                    View Full Profile
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
      )}
    </section>
  );
};

export default CallForSpeakers;