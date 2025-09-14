import { Button } from "@components/ui/button"
// store
import { useStore } from "@/store"

const Link = ({
    to,
    children,
    text = "",
    active = false,
    asChild = false,
    withChildren = false,
    ...props
}: all.ui.LinkProps) => {
    const goto = useStore((state: all.store.GlobalStore) => state.to)

    return withChildren ? (
        <div onClick={() => goto(to)} {...props}>
            {children}
        </div>
    ) : (
        <Button
            asChild={asChild}
            onClick={() => goto(to)}
            variant={active ? "outline" : "secondary"}
            {...props}
        >
            {text ?? to}
        </Button>
    )
}

export default Link
