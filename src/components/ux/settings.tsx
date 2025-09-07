import { useState } from "react"
// components
import KeyBindingEditor from "@components/ux/key-binding-editor"
import ThemeToggle from "@components/ux/theme-toggle"
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
import { Cog, Copy, Check, Apple, CopyCheck, WandSparkles } from "lucide-react"
// store
import { usePersistedStore } from "@/store"
// utils
import { generateNames, generateSeed } from "@lib/utils"
// config
import {
    seedLength,
    gameGameDifficulties,
} from '@lib/config'
// types
import type { gameTypes, storeTypes } from "@lib/types"

const Settings = () => {
    const [copied, setCopied] = useState(false)
    // store
    const seed = usePersistedStore((state: storeTypes.PersistedStore) => state.seed)
    const worldName = usePersistedStore((state: storeTypes.PersistedStore) => state.worldName)
    const heroName = usePersistedStore((state: storeTypes.PersistedStore) => state.heroName)
    const paused = usePersistedStore((state: storeTypes.PersistedStore) => state.paused)
    const isGameInit = usePersistedStore((state: storeTypes.PersistedStore) => state.init)
    const preferences = usePersistedStore((state: storeTypes.PersistedStore) => state.preferences)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)

    const onSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => { setGameAction("setSeed", String(e.target.value)) }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setGameAction("setWorldName", String(e.target.value)) }

    const onHeroNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setGameAction("setHeroName", String(e.target.value)) }

    const generate = () => {
        if (paused && isGameInit) return
        const newSeed = generateSeed(seedLength)
        const { heroName, worldName } = generateNames()
        setGameAction("setSeed", newSeed)
        setGameAction("setHeroName", heroName)
        setGameAction("setWorldName", worldName)
    }

    const copy = () => {
        if (copied) return
        navigator.clipboard.writeText(seed!)
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
    }

    return (
        <div className="settings flex flex-col gap-[50px] items-center sm:items-start">
            <div className="flex flex-row items-start justify-center gap-8 w-full">
                <Card className="p-8 basis-1/2 w-[50%] border-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Game Seed</CardTitle>
                        <CardDescription className="text-lg">
                            Enter or generate
                        </CardDescription>
                        <CardAction>
                            <Apple size={40} className="text-primary" />
                        </CardAction>
                    </CardHeader>
                    <CardContent className="text-white">
                        <ol className="list-inside">
                            <li className="mb-12">
                                <Label className="flex items-center justify-between text-lg mb-2" htmlFor="game-seed">
                                    <span>Game Seed: {seed}</span>
                                    <Button
                                        onClick={copy}
                                        size="icon"
                                        disabled={!seed?.length}
                                        variant="ghost"
                                        className="mb-2"
                                    >
                                        {copied ? <CopyCheck className="size-6" /> : <Copy className="size-6" />}
                                    </Button>
                                </Label>
                                <Input
                                    id="game-seed"
                                    type="text"
                                    value={seed ?? ""}
                                    onChange={onSeedChange}
                                    minLength={16}
                                    maxLength={16}
                                    placeholder="Game seed..."
                                    disabled={paused && isGameInit}
                                />
                            </li>
                            <li className="mb-12">
                                <Label className="text-lg mb-2" htmlFor="game-name">World Name</Label>
                                <Input
                                    id="game-name"
                                    type="text"
                                    value={worldName ?? ""}
                                    onChange={onNameChange}
                                    minLength={3}
                                    maxLength={40}
                                    placeholder="World name..."
                                    disabled={paused && isGameInit}
                                />
                            </li>
                            <li className="mb-12">
                                <Label className="text-lg mb-2" htmlFor="hero-name">Hero Name</Label>
                                <Input
                                    id="hero-name"
                                    type="text"
                                    value={heroName ?? ""}
                                    onChange={onHeroNameChange}
                                    minLength={3}
                                    maxLength={40}
                                    placeholder="Hero name..."
                                    disabled={paused && isGameInit}
                                />
                            </li>
                            <li className="mb-4">
                                <Button
                                    size="lg"
                                    onClick={() => generate()}
                                >
                                    <span className="text-gray-950 flex items-center gap-4 text-2xl">
                                        <WandSparkles className="size-6" /> Generate
                                    </span>
                                </Button>
                            </li>
                        </ol>
                    </CardContent>
                </Card>
                <Card className="p-8 basis-1/2 w-[50%] border-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Preferences</CardTitle>
                        <CardDescription className="text-lg">
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
                                        onValueChange={(value) => {
                                            if (paused && isGameInit) return
                                            setGameAction("setPref", { ...preferences, difficulty: value })
                                        }}
                                        defaultValue={"normal"}
                                        disabled={paused && isGameInit}
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
            <div className="flex items-center justify-center w-full gap-32">
                {paused && isGameInit ? (<>
                    <Button
                        size="lg"
                        variant="secondary"
                        disabled={!seed?.length}
                        onClick={() => setGameAction("restart")}
                    >
                        <span className="text-2xl text-white">
                            Start New Game
                        </span>
                    </Button>
                    <Button
                        size="lg"
                        disabled={!seed?.length}
                        onClick={() => setGameAction("resume")}
                    >
                        <span className="text-2xl text-gray-950">
                            Resume Game
                        </span>
                    </Button>
                </>) : (
                    <Button
                        size="lg"
                        disabled={!seed?.length}
                        onClick={() => setGameAction("init")}
                    >
                        <span className="text-2xl text-gray-950">
                            Start Game
                        </span>
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Settings
