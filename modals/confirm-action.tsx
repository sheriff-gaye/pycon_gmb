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
import { ConfirmAction, useConfirmModal } from "@/hooks/confirm";
import { Trash2, UserX, UserCheck } from "lucide-react";
import { useState } from "react";

interface ConfirmActionModalProps {
  onConfirm: (userId: string, action: ConfirmAction) => Promise<void>;
}

const ConfirmActionModal = ({ onConfirm }: ConfirmActionModalProps) => {
  const { isOpen, data, onClose } = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleConfirm = async () => {
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

  const handleClose = () => {
    setDeleteConfirmText("");
    onClose();
  };

  const getModalConfig = (action: ConfirmAction) => {
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