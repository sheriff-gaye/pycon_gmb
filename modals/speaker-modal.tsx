
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

  Clock,
  Tag,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Speaker } from '@/app/[locale]/(website)/components/call_for_speakers';

  
  export const SpeakerModal = ({ speaker, onClose }: { speaker: Speaker | null; onClose: () => void }) => {
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