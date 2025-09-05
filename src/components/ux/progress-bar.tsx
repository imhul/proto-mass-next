import { Progress } from "@components/ui/progress"
// types
import type { gameTypes } from "@lib/types"

const ProgressBar = ({ min, max, current }: gameTypes.ProgressBarProps) => {
    const progress = ((current - min) / (max - min)) * 100
    return <Progress value={progress} className="w-full absolute top-[78px] left-0 rounded-none" />
}

export default ProgressBar
