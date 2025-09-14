import { Progress } from "@components/ui/progress"

const ProgressBar = ({ min, max, current }: all.game.ProgressBarProps) => {
    const progress = ((current - min) / (max - min)) * 100
    return <Progress value={progress} className="w-full absolute top-[78px] left-0 rounded-none" />
}

export default ProgressBar
