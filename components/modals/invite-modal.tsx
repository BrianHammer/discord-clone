"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

// UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";

// Form validation for creating a new server

export const InviteModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type == "invite";
  const { server } = data;

  // Undefined?? 3:45:30
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const router = useRouter();

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          {/* TODO: FIX the root issue with the link. Temp fix = ml-20 in button 
          // Video point: 3:40:00
          
          */}
          <Button
            size="icon"
            variant="link"
            className="text-xs text-zinc-500 ml-20 mt-4"
          >
            Generate a new link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
