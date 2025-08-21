import { Button } from "@/components/ui/button"
// store
import { usePersistedStore } from "@store"
// types
import type { PersistedStore } from "@lib/types"
import type { LinkProps } from "@lib/types"

const Link = ({
    to,
    children,
    text = "",
    active = false,
    asChild = false,
    withChildren = false,
    ...props
}: LinkProps) => {
    const goto = usePersistedStore((state: PersistedStore) => state.to)

    return withChildren
        ? (<div onClick={() => goto(to)} {...props}>{children}</div>)
        : (<Button
            asChild={asChild}
            onClick={() => goto(to)}
            variant={active ? "outline" : "secondary"}
            {...props}
        >
            {text ?? to}
        </Button>)
}

export default Link
