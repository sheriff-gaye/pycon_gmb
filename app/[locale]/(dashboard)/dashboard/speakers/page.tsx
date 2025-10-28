
import { getAllSpeakers } from "@/app/actions/speakers";
import SpeakersTable from "./table";

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
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  createdAt: Date;
  updatedAt: Date;
}




const SpeakersPage = async () => {
  const result = await getAllSpeakers();
  const speakers: Speaker[] = result.success && result.data ? result.data : [];

  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <SpeakersTable speakers={speakers} />
      </main>
    </div>
  );
};

export default SpeakersPage;