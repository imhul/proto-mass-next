// components
import KeyBindingEditor from "@components/key-binding-editor"
import ThemeToggle from "@components/theme-toggle"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@components/ui/slider"
import { Button } from "@components/ui/button"
import { Label } from "@components/ui/label"
import { Input } from "@components/ui/input"
import {
    Card,
    CardTitle,
    CardAction,
    CardHeader,
    CardContent,
    CardDescription
} from "@components/ui/card"
import {
    Select,
    SelectItem,
    SelectGroup,
    SelectLabel,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@components/ui/select"
// icons
import { Cog, Check, Apple, WandSparkles } from "lucide-react"
// store
import { usePersistedStore } from "@/store"
// utils
import { generateSeed } from "@lib/utils"
// config
import { seedLength, gameGameDifficulties } from "@lib/config"
// types
import type { gameTypes, storeTypes } from "@lib/types"

const InitialScene = () => {
    // store
    const seed = usePersistedStore((state: storeTypes.PersistedStore) => state.seed)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)
    const preferences = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences)

    const onSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => { setGameAction("setSeed", String(e.target.value)) }

    const generate = () => {
        const newSeed = generateSeed(seedLength)
        setGameAction("setSeed", newSeed)
    }

    return (
        <div className="initial-scene flex items-center justify-center h-full w-full">
            <div className="max-w-[80%] w-full text-2xl text-white">
                <div className="flex flex-col gap-[50px] items-center sm:items-start">
                    <div className="flex flex-row items-start justify-center gap-8 w-full">
                        <Card className="p-8 basis-1/2 w-[50%] border-primary">
                            <CardHeader>
                                <CardTitle>Game Seed</CardTitle>
                                <CardDescription>
                                    Enter or generate
                                </CardDescription>
                                <CardAction>
                                    <Apple size={40} className="text-primary" />
                                </CardAction>
                            </CardHeader>
                            <CardContent className="text-white">
                                <span className="mb-8 block">Seed: {seed}</span>
                                <ol className="list-inside">
                                    <li className="mb-12">
                                        <Input
                                            id="seed"
                                            type="text"
                                            value={seed ?? ""}
                                            onChange={onSeedChange}
                                            minLength={16}
                                            maxLength={16}
                                        />
                                    </li>
                                    <li className="mb-4">
                                        <Button
                                            size="lg"
                                            onClick={() => generate()}
                                        >
                                            <span className="text-gray-950 flex items-center gap-4 text-2xl">
                                                <WandSparkles /> Generate
                                            </span>
                                        </Button>
                                    </li>
                                </ol>
                            </CardContent>
                        </Card>
                        <Card className="p-8 basis-1/2 w-[50%] border-primary">
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>
                                    Game settings
                                </CardDescription>
                                <CardAction>
                                    <Cog size={40} className="text-primary" />
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-inside">
                                    <li className="mb-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <Label className="text-2xl">Theme: </Label>
                                            <ThemeToggle />
                                        </div>
                                    </li>
                                    <li className="mb-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <Label className="text-2xl">Difficulty: </Label>
                                            <Select
                                                onValueChange={(value) => setGameAction("setPref", { ...preferences, difficulty: value })}
                                                defaultValue={"normal"}
                                            >
                                                <SelectTrigger className="w-[180px] text-white">
                                                    <SelectValue placeholder={(
                                                        <div className="flex items-center justify-start">
                                                            <span className="sr-only">{preferences.difficulty}</span>
                                                        </div>
                                                    )} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Themes</SelectLabel>
                                                        {gameGameDifficulties.map((diff: gameTypes.GameDifficulty) => (
                                                            <SelectItem
                                                                className={preferences.difficulty === diff.id ? "bg-muted" : ""}
                                                                key={diff.id}
                                                                value={diff.id}
                                                            >
                                                                {diff.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </li>
                                    <li className="mb-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <Label className="text-2xl">Fullscreen</Label>
                                            <Checkbox
                                                style={{ borderWidth: 2, color: preferences.fullscreen ? `var(--color-gray-950)` : "transparent" }}
                                                className="flex items-center justify-center h-[20px] w-[20px]"
                                                checked={preferences.fullscreen}
                                                onCheckedChange={(e: boolean) => setGameAction(
                                                    "setPref",
                                                    { ...preferences, fullscreen: e }
                                                )}
                                            >
                                                {preferences.fullscreen && <Check />}
                                            </Checkbox>
                                        </div>
                                    </li>
                                    <li className="mb-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <Label className="text-2xl">Sound: </Label>
                                            <Slider
                                                defaultValue={[preferences.soundLevel]}
                                                className="w-[80%]"
                                                onValueCommit={(value) => setGameAction("setPref", { ...preferences, soundLevel: value[0] })}
                                            />
                                        </div>
                                    </li>
                                    <li className="mb-8">
                                        <div className="flex items-center justify-between gap-4">
                                            <Label className="text-2xl">Controls: </Label>
                                            <KeyBindingEditor />
                                        </div>
                                    </li>
                                </ol>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Button
                            size="lg"
                            disabled={!seed?.length}
                            onClick={() => setGameAction("init")}
                        >
                            <span className="text-2xl text-gray-950">Start Game</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialScene
