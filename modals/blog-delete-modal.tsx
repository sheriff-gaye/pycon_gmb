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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useBlogConfirmModal } from "@/hooks/blog-confirm";

interface BlogDeleteModalProps {
  onConfirm: (postId: string) => Promise<void>;
}

const BlogDeleteModal: React.FC<BlogDeleteModalProps> = ({ onConfirm }) => {
  const { isOpen, data, onClose } = useBlogConfirmModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState<string>("");

  const handleConfirm = async (): Promise<void> => {
    if (!data) return;
    
    setIsLoading(true);
    try {
      await onConfirm(data.postId);
      onClose();
      setDeleteConfirmText("");
    } catch (error) {
      console.error('Delete action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (): void => {
    setDeleteConfirmText("");
    onClose();
  };

  if (!data) return null;

  const isDeleteConfirmValid = deleteConfirmText.toLowerCase() === 'delete';

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <Trash2 className="mr-2 h-4 w-4 text-red-600" />
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post{' '}
            <span className="font-semibold text-slate-900">"{data.postTitle}"</span> and all of its comments from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
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

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={handleClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
            disabled={isLoading || !isDeleteConfirmValid}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Deleting...
              </>
            ) : (
              'Delete Blog Post'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BlogDeleteModal;

