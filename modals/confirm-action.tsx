"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, UserX, UserCheck } from "lucide-react";
import { useState, ReactNode } from "react";

// Define types for the confirm action modal
export type ConfirmAction = 'delete' | 'deactivate' | 'activate';

interface ModalData {
  userId: string;
  userName: string;
  action: ConfirmAction;
}

// Mock hook for demonstration - replace with your actual hook implementation
interface UseConfirmModalReturn {
  isOpen: boolean;
  data: ModalData | null;
  onClose: () => void;
}

// You'll need to implement this hook or import it from your actual location
const useConfirmModal = (): UseConfirmModalReturn => {
  // This is a placeholder - implement your actual logic here
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData | null>(null);

  const onClose = () => {
    setIsOpen(false);
    setData(null);
  };

  return {
    isOpen,
    data,
    onClose
  };
};

interface ConfirmActionModalProps {
  onConfirm: (userId: string, action: ConfirmAction) => Promise<void>;
}

interface ModalConfig {
  title: string;
  description: ReactNode;
  confirmText: string;
  confirmClass: string;
  icon: ReactNode;
  requiresInput: boolean;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({ onConfirm }) => {
  const { isOpen, data, onClose } = useConfirmModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>("");

  const handleConfirm = async (): Promise<void> => {
    if (!data) return;
    
    setIsLoading(true);
    try {
      await onConfirm(data.userId, data.action);
      onClose();
    } catch (error) {
      console.error('Confirm action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (): void => {
    setDeleteConfirmText("");
    onClose();
  };

  const getModalConfig = (action: ConfirmAction): ModalConfig => {
    switch (action) {
      case 'delete':
        return {
          title: 'Are you absolutely sure?',
          description: (
            <>
              This action cannot be undone. This will permanently delete the user{' '}
              <span className="font-semibold">{data?.userName}</span> and remove 
              all of their data from our servers.
            </>
          ),
          confirmText: 'Delete User',
          confirmClass: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed',
          icon: <Trash2 className="mr-2 h-4 w-4" />,
          requiresInput: true
        };
      
      case 'deactivate':
        return {
          title: 'Deactivate User',
          description: (
            <>
              Are you sure you want to deactivate the user{' '}
              <span className="font-semibold">{data?.userName}</span>?
              The user will not be able to access their account until reactivated.
            </>
          ),
          confirmText: 'Deactivate',
          confirmClass: 'bg-blue-600 hover:bg-blue-700',
          icon: <UserX className="mr-2 h-4 w-4" />,
          requiresInput: false
        };
      
      case 'activate':
        return {
          title: 'Activate User',
          description: (
                          <>
              Are you sure you want to activate the user{' '}
              <span className="font-semibold">{data?.userName}</span>?
              The user will regain access to their account.
            </>
          ),
          confirmText: 'Activate',
          confirmClass: 'bg-green-600 hover:bg-green-700',
          icon: <UserCheck className="mr-2 h-4 w-4" />,
          requiresInput: false
        };
      
      default:
        return {
          title: 'Confirm Action',
          description: 'Are you sure you want to perform this action?',
          confirmText: 'Confirm',
          confirmClass: 'bg-blue-600 hover:bg-blue-700',
          icon: null,
          requiresInput: false
        };
    }
  };

  if (!data) return null;

  const config = getModalConfig(data.action);
  const isDeleteConfirmValid = !config.requiresInput || deleteConfirmText.toLowerCase() === 'delete';

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            {config.icon}
            {config.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {config.requiresInput && (
          <div className="py-4">
            <Label htmlFor="delete-confirm" className="text-sm font-medium">
              Please type <span className="font-bold">delete</span> to confirm:
            </Label>
            <Input
              id="delete-confirm"
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type 'delete' here"
              className="mt-2"
              disabled={isLoading}
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={handleClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={config.confirmClass}
            disabled={isLoading || !isDeleteConfirmValid}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              config.confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmActionModal;