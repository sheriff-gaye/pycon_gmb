// import React, { useState } from 'react';
// import { Calendar, Clock, MapPin, Users, Zap, Coffee, Utensils, Star, Globe, ChevronRight, Sparkles } from 'lucide-react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// const ConferenceSchedule = () => {
//   const [selectedTrack, setSelectedTrack] = useState('all');

//   const morningSchedule = [
//     {
//       time: '8:30 - 9:00 AM',
//       title: 'Registration & Welcome',
//       description: 'Check-in & Morning Refreshments',
//       location: 'Main Hall',
//       type: 'registration',
//       icon: Users
//     },
//     {
//       time: '9:00 - 9:15 AM',
//       title: 'Opening Ceremony',
//       description: 'Welcome Address',
//       location: 'Main Hall',
//       type: 'ceremony',
//       icon: Star
//     },
//     {
//       time: '9:15 - 10:00 AM',
//       title: 'KEYNOTE: Documenting Python Code',
//       speaker: 'Christian Heitzmann',
//       country: 'Switzerland',
//       duration: '45 min',
//       location: 'Main Hall',
//       type: 'keynote',
//       icon: Sparkles
//     }
//   ];

//   const block1Sessions = [
//     {
//       time: '11:25 AM - 12:00 PM',
//       trackA: {
//         title: 'Your Database, Now Fluent in Human Language',
//         speaker: 'Ibrahima Khalilou Lahi Samb',
//         country: 'Senegal',
//         language: 'French',
//         type: 'Technical',
//         duration: '35 min'
//       },
//       trackB: {
//         title: 'Breaking Barriers for Learners with Dyslexia in Africa',
//         speaker: 'Olukemi Jacobs',
//         country: 'Nigeria',
//         language: 'English',
//         type: 'Non-Technical',
//         duration: '20 min + Q&A'
//       }
//     },
//     {
//       time: '12:00 - 12:35 PM',
//       trackA: {
//         title: 'Security in Financial Applications',
//         speaker: 'Fatou M Gaye',
//         country: 'Gambia',
//         language: 'English',
//         type: 'Non-Technical',
//         duration: '20 min + Q&A'
//       },
//       trackB: {
//         title: 'Les serializers dans Django REST Framework',
//         speaker: 'Mahmoud Barry',
//         country: 'Senegal',
//         language: 'French',
//         type: 'Technical',
//         duration: '35 min'
//       }
//     },
//     {
//       time: '12:35 - 1:10 PM',
//       trackA: {
//         title: 'Beyond the Basics: Using Python for Deep Learning',
//         speaker: 'Cherno Basiru Jallow',
//         country: 'Gambia',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       },
//       trackB: {
//         title: 'From Dataset to Deployment: Serving ML Models with Vertex AI',
//         speaker: 'Buchi Michelle Okonicha',
//         country: 'Nigeria',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       }
//     },
//     {
//       time: '1:10 - 1:45 PM',
//       trackA: {
//         title: 'Content Based Recommendation Engines',
//         speaker: 'Babacar Ndao',
//         country: 'Senegal',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       },
//       trackB: {
//         title: 'Python & AI for Healthcare in Africa',
//         speaker: 'Niek Mereu',
//         country: 'Netherlands',
//         language: 'English/French',
//         type: 'Non-Technical',
//         duration: '20 min + Q&A'
//       }
//     }
//   ];

//   const block2Sessions = [
//     {
//       time: '2:35 - 3:10 PM',
//       trackA: {
//         title: 'Ask Me Anything with Google Expert',
//         speaker: 'Google Speaker',
//         language: 'English',
//         type: 'Live Q&A',
//         duration: '35 min',
//         special: 'ONLINE'
//       },
//       trackB: {
//         title: 'Detecting Agent Network Fraud with Python and Neo4j',
//         speaker: 'Alieu Ndimbalane',
//         country: 'Gambia',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       }
//     },
//     {
//       time: '3:10 - 3:45 PM',
//       trackA: {
//         title: 'Enhancing other Languages with Python',
//         speaker: 'Michael Jalloh',
//         country: 'Gambia',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       },
//       trackB: {
//         title: 'Network Security: Mitigating IP Spoofing with Python',
//         speaker: 'Mamudou Bojang',
//         country: 'Gambia',
//         language: 'English',
//         type: 'Technical',
//         duration: '35 min'
//       }
//     }
//   ];

//   const closingSchedule = [
//     {
//       time: '3:45 - 4:00 PM',
//       title: 'Lightning Talks',
//       description: 'Quick 3-5 minute community presentations',
//       location: 'Main Hall',
//       type: 'lightning',
//       icon: Zap
//     },
//     {
//       time: '4:00 - 4:15 PM',
//       title: 'Trivia & Fun Activities',
//       description: 'Interactive games with prizes',
//       location: 'Main Hall',
//       type: 'fun',
//       icon: Star
//     },
//     {
//       time: '4:15 - 4:30 PM',
//       title: 'Closing Ceremony',
//       description: 'Thank you, announcements & group photo',
//       location: 'Main Hall',
//       type: 'ceremony',
//       icon: Users
//     }
//   ];

//   const SessionCard = ({ session, track }) => (
//     <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-400 h-full">
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between mb-2">
//           <Badge variant={session.type === 'Technical' ? 'default' : 'secondary'} className="mb-2">
//             {session.type}
//           </Badge>
//           {session.special && (
//             <Badge className="bg-red-500 text-white">{session.special}</Badge>
//           )}
//         </div>
//         <CardTitle className="text-lg leading-tight group-hover:text-yellow-600 transition-colors">
//           {session.title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-2 text-sm text-slate-600">
//           <div className="flex items-center">
//             <Users className="w-4 h-4 mr-2 text-slate-400" />
//             <span className="font-medium">{session.speaker}</span>
//             {session.country && <span className="ml-2 text-slate-400">({session.country})</span>}
//           </div>
//           <div className="flex items-center">
//             <Globe className="w-4 h-4 mr-2 text-slate-400" />
//             <span>{session.language}</span>
//           </div>
//           <div className="flex items-center">
//             <Clock className="w-4 h-4 mr-2 text-slate-400" />
//             <span>{session.duration}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <section className="relative py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-800/5 rounded-full filter blur-3xl"></div>
//       </div>

//       {/* Geometric pattern overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="h-full w-full"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD34D' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
//             <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
//             <span className="text-sm font-semibold text-yellow-800">
//               29 November 2025 | QCity, Banjul
//             </span>
//           </div>

//           <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//             <span className="text-slate-800">Conference</span>
//             <br />
//             <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
//               Schedule
//             </span>
//           </h2>
//           <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
//             A full day of inspiring talks, hands-on workshops, and networking opportunities
//           </p>
//         </div>

//         {/* Morning Programme */}
//         <div className="mb-16">
//           <div className="flex items-center mb-8">
//             <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-3 mr-4">
//               <Star className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-slate-800">Morning Programme</h3>
//           </div>

//           <div className="grid gap-6 mb-8">
//             {morningSchedule.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <Card key={idx} className="border-2 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl">
//                   <CardContent className="p-6">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                       <div className="flex items-start mb-4 md:mb-0">
//                         <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-3 mr-4 flex-shrink-0">
//                           <Icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <div className="flex items-center mb-2">
//                             <Clock className="w-4 h-4 text-slate-400 mr-2" />
//                             <span className="text-sm font-semibold text-slate-600">{item.time}</span>
//                             {item.duration && (
//                               <Badge variant="outline" className="ml-3">{item.duration}</Badge>
//                             )}
//                           </div>
//                           <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
//                           {item.speaker && (
//                             <p className="text-slate-600 mb-1">
//                               <span className="font-medium">{item.speaker}</span>
//                               {item.country && <span className="text-slate-400"> ({item.country})</span>}
//                             </p>
//                           )}
//                           {item.description && (
//                             <p className="text-slate-500">{item.description}</p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex items-center text-slate-600">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         <span className="font-medium">{item.location}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Panel Discussion */}
//           <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-white hover:shadow-2xl transition-all duration-300">
//             <CardContent className="p-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between">
//                 <div className="flex items-start mb-4 md:mb-0">
//                   <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-3 mr-4 flex-shrink-0">
//                     <Users className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="flex items-center mb-2">
//                       <Clock className="w-4 h-4 text-yellow-600 mr-2" />
//                       <span className="text-sm font-semibold text-yellow-700">10:25 - 11:25 AM</span>
//                       <Badge className="ml-3 bg-yellow-600">1 hour</Badge>
//                     </div>
//                     <h4 className="text-xl font-bold text-slate-800 mb-1">
//                       PANEL: Bridging the Digital Divide - Python, Technical Inclusion & ICT Accessibility in Africa
//                     </h4>
//                     <p className="text-slate-600">
//                       <span className="font-medium">Moderator: Abdou Karim Badjie</span>
//                       <span className="text-slate-400"> (Gambia)</span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-slate-600">
//                   <MapPin className="w-4 h-4 mr-2" />
//                   <span className="font-medium">Main Hall</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Coffee Break */}
//         <div className="flex items-center justify-center mb-16">
//           <div className="bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-300 rounded-2xl px-8 py-4 flex items-center">
//             <Coffee className="w-6 h-6 text-amber-700 mr-3" />
//             <div>
//               <div className="font-bold text-amber-900">Coffee Break</div>
//               <div className="text-sm text-amber-700">10:00 - 10:25 AM (25 minutes)</div>
//             </div>
//           </div>
//         </div>

//         {/* Parallel Sessions Block 1 */}
//         <div className="mb-16">
//           <div className="flex items-center mb-8">
//             <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-3 mr-4">
//               <Zap className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-slate-800">Parallel Sessions - Block 1</h3>
//           </div>

//           {block1Sessions.map((session, idx) => (
//             <div key={idx} className="mb-8">
//               <div className="flex items-center mb-4">
//                 <Clock className="w-5 h-5 text-slate-400 mr-2" />
//                 <h4 className="text-lg font-bold text-slate-700">{session.time}</h4>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <Badge variant="outline" className="bg-slate-100">Track A</Badge>
//                   </div>
//                   <SessionCard session={session.trackA} track="A" />
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <Badge variant="outline" className="bg-yellow-100">Track B</Badge>
//                   </div>
//                   <SessionCard session={session.trackB} track="B" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Lunch Break */}
//         <div className="flex items-center justify-center mb-16">
//           <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-2xl px-8 py-4 flex items-center">
//             <Utensils className="w-6 h-6 text-green-700 mr-3" />
//             <div>
//               <div className="font-bold text-green-900">Lunch & Prayer Break</div>
//               <div className="text-sm text-green-700">1:45 - 2:35 PM (50 minutes total)</div>
//             </div>
//           </div>
//         </div>

//         {/* Parallel Sessions Block 2 */}
//         <div className="mb-16">
//           <div className="flex items-center mb-8">
//             <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-3 mr-4">
//               <Zap className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-slate-800">Parallel Sessions - Block 2</h3>
//           </div>

//           {block2Sessions.map((session, idx) => (
//             <div key={idx} className="mb-8">
//               <div className="flex items-center mb-4">
//                 <Clock className="w-5 h-5 text-slate-400 mr-2" />
//                 <h4 className="text-lg font-bold text-slate-700">{session.time}</h4>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <Badge variant="outline" className="bg-slate-100">Track A</Badge>
//                   </div>
//                   <SessionCard session={session.trackA} track="A" />
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-3">
//                     <Badge variant="outline" className="bg-yellow-100">Track B</Badge>
//                   </div>
//                   <SessionCard session={session.trackB} track="B" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Closing Programme */}
//         <div>
//           <div className="flex items-center mb-8">
//             <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-3 mr-4">
//               <Star className="w-6 h-6 text-white" />
//             </div>
//             <h3 className="text-3xl font-bold text-slate-800">Closing Programme</h3>
//           </div>

//           <div className="grid gap-6">
//             {closingSchedule.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <Card key={idx} className="border-2 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl">
//                   <CardContent className="p-6">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between">
//                       <div className="flex items-start mb-4 md:mb-0">
//                         <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-3 mr-4 flex-shrink-0">
//                           <Icon className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <div className="flex items-center mb-2">
//                             <Clock className="w-4 h-4 text-slate-400 mr-2" />
//                             <span className="text-sm font-semibold text-slate-600">{item.time}</span>
//                           </div>
//                           <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
//                           <p className="text-slate-500">{item.description}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center text-slate-600">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         <span className="font-medium">{item.location}</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         {/* Conference Info Footer */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-green-200 border border-green-300">
//             <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
//             <span className="text-sm font-semibold text-green-800">
//               Conference ends at 4:30 PM
//             </span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConferenceSchedule;