// components
import { Button } from "@components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// store
import { usePersistedStore } from "@/store"
// utils
import { generateSeed } from "@lib/utils"
// config
import { seedLength } from "@lib/config"
// types
import type { storeTypes } from "@lib/types"

const InitialScene = () => {
    // store
    const seed = usePersistedStore((state: storeTypes.PersistedStore) => state.seed)
    const setGameAction = usePersistedStore((state: storeTypes.PersistedStore) => state.setGameAction)

    const onSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => { setGameAction("setSeed", String(e.target.value)) }

    const generate = () => {
        const newSeed = generateSeed(seedLength)
        setGameAction("setSeed", newSeed)
    }

    return (
        <div className="initial-scene flex items-center justify-center h-full w-full">
            <div className="pb-20 gap-16 sm:p-20">
                <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <ol className="list-inside text-sm/6 text-center sm:text-left">
                        <li className="mb-12 tracking-[-.01em]">
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label className="text-2xl" htmlFor="seed">Seed: {seed}</Label>
                                <Input
                                    id="seed"
                                    type="text"
                                    value={seed}
                                    onChange={onSeedChange}
                                />
                            </div>

                        </li>
                        <li className="mb-4">
                            <Button
                                size="lg"
                                onClick={() => generate()}
                            >
                                <span className="text-white text-2xl">Generate</span>
                            </Button>
                        </li>
                        <li className="mb-4">
                            <Button
                                className="text-white"
                                size="lg"
                                disabled={!seed?.length}
                                onClick={() => setGameAction("init")}
                            >
                                <span className="text-white text-2xl">Start Game</span>
                            </Button>
                        </li>
                    </ol>
                </div>
            </div>

        </div>
    )
}

export default InitialScene
