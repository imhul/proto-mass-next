// components
import Settings from "@components/ux/settings"

const InitialScene = () => {
    return (
        <div className="initial-scene flex items-center justify-center h-full w-full">
            <div className="max-w-[80%] w-full text-2xl text-white">
                <Settings />
            </div>
        </div>
    )
}

export default InitialScene
