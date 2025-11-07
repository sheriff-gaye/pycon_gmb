import { Button } from "@/components/ui/button";
import { useScholarshipModal } from "@/hooks/scholarship";

export function ScholarshipTicketButton() {
  const { onOpen } = useScholarshipModal();

  return (
    <Button
      onClick={onOpen}
      size="lg"
      className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all font-bold"
    >
     
      Issue Scholarship Ticket
    </Button>
  );
}