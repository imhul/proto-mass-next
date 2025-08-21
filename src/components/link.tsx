import { Button } from "@/components/ui/button"
// store
import { useStore } from "@store"
// types
import type { StoreType } from "@lib/types"
import type { LinkProps } from "@lib/types"

const Link = ({ to, text, active, asChild = false, ...props }: LinkProps) => {
    const goto = useStore((state: StoreType) => state.to)

    return (
        <Button
            asChild={asChild}
            onClick={() => goto(to)}
            variant={active ? "outline" : "secondary"}
            {...props}
        >
            {text}
        </Button>
    )
}

export default Link
