import Settings from "@components/ux/settings"
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"

const PauseModal = ({ open }: { open: boolean }) => {
    return (
        <Dialog open={open}>
            <DialogContent className="max-w-6xl p-10">
                <DialogHeader>
                    <DialogTitle>Pause</DialogTitle>
                    <DialogDescription>
                        The game is currently paused.
                    </DialogDescription>
                </DialogHeader>
                <Settings />
            </DialogContent>
        </Dialog>
    )
}

export default PauseModal
