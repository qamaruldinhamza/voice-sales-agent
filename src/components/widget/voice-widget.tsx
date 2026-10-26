import { CallEndedDialog } from "@/components/widget/call-ended-dialog";
import { CallOverlay } from "@/components/widget/call-overlay";
import { FloatingButton } from "@/components/widget/floating-button";

export function VoiceWidget() {
  return (
    <>
      <FloatingButton />
      <CallOverlay />
      <CallEndedDialog />
    </>
  );
}
