import { useState } from "react"
// store
import { usePersistedStore } from "@/store"
import { initState } from "@store/game-store"
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
// types
import type { storeTypes } from "@lib/types"
// config
import { keycodes } from '@lib/config'
// utils
import { toast } from "sonner"

export type Fields = "keys" | "codes" | "keyCodes"

const KeyBindingEditor = () => {
    const [newBindings, setNewBindings] = useState<storeTypes.KeyBindings | {}>({})
    const preferences = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences)
    const keyBindings = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences.keyBindings)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)

    const checkIfKeyBindingExists = (keyCode: number) => {
        const allBindings = { ...keyBindings, ...newBindings } as storeTypes.KeyBindings
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
        keyObj: storeTypes.KeyBindingCollectionItem,
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
            (newBindings as storeTypes.KeyBindings)[action as storeTypes.GameKeyboardActionType]?.[field] ||
            keyBindings[action as storeTypes.GameKeyboardActionType][field];

        return current.map((k: any, i: number) => {
            if (i === keyIndex) {
                let value: string | number | undefined;
                if (field === "keys") value = keyObj.key;
                else if (field === "codes") value = keyObj.code;
                else if (field === "keyCodes") value = keyObj.keyCode;
                return value;
            }
            return k;
        });
    }

    const removeAction = (action: storeTypes.GameKeyboardActionType) => {
        const { [action]: removed, ...rest } = newBindings as storeTypes.KeyBindings
        setNewBindings(rest)
    }

    const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>, action: storeTypes.GameKeyboardActionType, keyIndex: number) => {
        if (!e.target.value.length) {
            removeAction(action)
            return
        }
        const keyObj: storeTypes.KeyBindingCollectionItem | undefined = keycodes.find((key) => key["key"] === e.target.value)
        if (!keyObj) return
        setNewBindings({
            ...newBindings,
            [action]: {
                ...keyBindings[action as storeTypes.GameKeyboardActionType],
                keys: updateBindings(keyObj, keyIndex, action, "keys"),
                codes: updateBindings(keyObj, keyIndex, action, "codes"),
                keyCodes: updateBindings(keyObj, keyIndex, action, "keyCodes"),
            }
        })
    }

    const generateTable = () => {
        const rows = Object.keys(keyBindings).map((action: string) => {
            const binding = keyBindings[action as storeTypes.GameKeyboardActionType]

            return (
                <TableRow key={binding.keys[0]}>
                    <TableCell className="h-[80px] text-2xl font-bold capitalize">{action}</TableCell>
                    <TableCell className="h-[80px] text-2xl text-center uppercase">{binding.keys[0]}</TableCell>
                    <TableCell className="h-[80px] text-2xl text-center uppercase">{binding.keys[1]}</TableCell>
                    <TableCell className="h-[80px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <Input
                                type="text"
                                maxLength={10}
                                className="w-40 h-10"
                                placeholder={binding.keys[0]}
                                value={
                                    newBindings &&
                                    ((newBindings as storeTypes.KeyBindings)[action as storeTypes.GameKeyboardActionType]?.keys[0] ?? "")
                                }
                                onChange={(e) => onKeyChange(e, action as storeTypes.GameKeyboardActionType, 0)}
                            />
                        </div>
                    </TableCell>
                    <TableCell className="h-[80px]">
                        <div className="w-full h-full flex justify-center items-center">
                            <Input
                                type="text"
                                maxLength={10}
                                className="w-40 h-10"
                                placeholder={binding.keys[1]}
                                value={
                                    newBindings &&
                                        (newBindings as storeTypes.KeyBindings)[action as storeTypes.GameKeyboardActionType]
                                        ? (newBindings as storeTypes.KeyBindings)[action as storeTypes.GameKeyboardActionType].keys[1]
                                        : ""
                                }
                                onChange={(e) => onKeyChange(e, action as storeTypes.GameKeyboardActionType, 1)}
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
                        <Keyboard /> Key Bindings
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
                    <div className="p-4 mb-4">
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
                    <DrawerFooter>
                        <div className="flex justify-between my-12">
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
