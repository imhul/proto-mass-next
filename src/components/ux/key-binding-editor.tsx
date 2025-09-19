import { useState } from "react"
// store
import { usePersistedStore } from "@/store"
import { initState } from "@/store/persisted/game-store"
// components
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
// icons
import { Keyboard } from "lucide-react"
// config
import { keycodes } from '@lib/config'
// utils
import { toast } from "sonner"

type Fields = "keys" | "codes" | "keyCodes"
type Store = all.store.PersistedStore

const KeyBindingEditor = () => {
    const [newBindings, setNewBindings] = useState<all.store.KeyBindings | {}>({})
    const preferences = usePersistedStore((s: Store) => s.preferences)
    const keyBindings = usePersistedStore((s: Store) => s.preferences.keyBindings)
    const setGameAction = usePersistedStore((s: Store) => s.setGameAction)

    const checkIfKeyBindingExists = (keyCode: number) => {
        const allBindings = { ...keyBindings, ...newBindings } as all.store.KeyBindings
        return Object.values(allBindings).some((binding) => binding.keyCodes.includes(keyCode))
    }

    const save = () => {
        setGameAction("setPref", {
            ...preferences,
            keyBindings: {
                ...keyBindings,
                ...newBindings
            }
        })
        toast.success("Key bindings saved successfully!")
    }

    const reset = () => {
        setNewBindings({})
        setGameAction("setPref", {
            ...preferences,
            keyBindings: initState.preferences.keyBindings
        })
    }

    const updateBindings = (
        keyObj: all.store.KeyBindingCollectionItem,
        keyIndex: number,
        action: string,
        field: Fields
    ) => {
        if (checkIfKeyBindingExists(keyObj.keyCode)) {
            toast.warning("Assignment Error", {
                description: "Sorry, but that key is already assigned to another action!",
            })
            return
        }
        const current =
            (newBindings as all.store.KeyBindings)[action as all.store.GameKeyboardActionType]?.[field] ||
            keyBindings[action as all.store.GameKeyboardActionType][field]

        return current.map((k: any, i: number) => {
            if (i === keyIndex) {
                let value: string | number | undefined
                if (field === "keys") value = keyObj.key
                else if (field === "codes") value = keyObj.code
                else if (field === "keyCodes") value = keyObj.keyCode
                return value
            }
            return k
        })
    }

    const removeAction = (action: all.store.GameKeyboardActionType) => {
        const { [action]: removed, ...rest } = newBindings as all.store.KeyBindings
        setNewBindings(rest)
    }

    const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>, action: all.store.GameKeyboardActionType, keyIndex: number) => {
        if (!e.target.value.length) {
            removeAction(action)
            return
        }
        const keyObj: all.store.KeyBindingCollectionItem | undefined = keycodes.find((key) => key["key"] === e.target.value)
        if (!keyObj) return
        setNewBindings({
            ...newBindings,
            [action]: {
                ...keyBindings[action as all.store.GameKeyboardActionType],
                keys: updateBindings(keyObj, keyIndex, action, "keys"),
                codes: updateBindings(keyObj, keyIndex, action, "codes"),
                keyCodes: updateBindings(keyObj, keyIndex, action, "keyCodes"),
            }
        })
    }

    const generateTable = () => {
        const rows = Object.keys(keyBindings).map((action: string) => {
            const binding = keyBindings[action as all.store.GameKeyboardActionType]

            return (
                <TableRow key={binding.keys[0]}>
                    <TableCell className="h-[80px] text-2xl font-bold capitalize">{action}</TableCell>
                    <TableCell className="h-[80px] text-2xl text-center uppercase">
                        {binding.keys[0] === " " ? "Space" : binding.keys[0]}
                    </TableCell>
                    <TableCell className="h-[80px] text-2xl text-center uppercase">
                        {binding.keys[1] === " " ? "Space" : binding.keys[1]}
                    </TableCell>
                    <TableCell className="h-[80px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <Input
                                type="text"
                                maxLength={10}
                                className="w-40 h-10"
                                placeholder={binding.keys[0] === " " ? "Space" : binding.keys[0]}
                                value={
                                    newBindings &&
                                    ((newBindings as all.store.KeyBindings)[action as all.store.GameKeyboardActionType]?.keys[0] ?? "")
                                }
                                onChange={(e) => onKeyChange(e, action as all.store.GameKeyboardActionType, 0)}
                            />
                        </div>
                    </TableCell>
                    <TableCell className="h-[80px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <Input
                                type="text"
                                maxLength={10}
                                className="w-40 h-10"
                                placeholder={binding.keys[1] === " " ? "Space" : binding.keys[1]}
                                value={
                                    newBindings &&
                                        (newBindings as all.store.KeyBindings)[action as all.store.GameKeyboardActionType]
                                        ? (newBindings as all.store.KeyBindings)[action as all.store.GameKeyboardActionType].keys[1]
                                        : ""
                                }
                                onChange={(e) => onKeyChange(e, action as all.store.GameKeyboardActionType, 1)}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            )
        })
        return rows
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button type="button" size="lg">
                    <span className="text-gray-950 flex items-center gap-4 text-2xl">
                        <Keyboard className="size-6" /> Key Bindings
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-5xl">
                    <DrawerHeader className="my-8">
                        <DrawerTitle className="capitalize text-2xl">
                            Key Bindings
                        </DrawerTitle>
                        <DrawerDescription className="flex justify-center">
                            <Keyboard size={40} />
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="pb-4 text-2xl">Action</TableHead>
                                        <TableHead className="pb-4 text-2xl text-center">Key 1</TableHead>
                                        <TableHead className="pb-4 text-2xl text-center">Key 2</TableHead>
                                        <TableHead className="pb-4 text-2xl text-center">Edit Key 1</TableHead>
                                        <TableHead className="pb-4 text-2xl text-center">Edit Key 2</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Boolean(keyBindings) && generateTable()}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <DrawerFooter className="mb-32">
                        <div className="flex justify-between mt-4">
                            <DrawerClose asChild>
                                <Button type="button" size="lg" variant="secondary">
                                    <span className="text-primary text-2xl">Close</span>
                                </Button>
                            </DrawerClose>
                            <Button type="button" size="lg" disabled={false} onClick={reset} variant="secondary">
                                <span className="text-primary text-2xl">Reset to Default</span>
                            </Button>
                            <Button type="button" size="lg" disabled={false} onClick={save}>
                                <span className="text-2xl">Save</span>
                            </Button>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default KeyBindingEditor
