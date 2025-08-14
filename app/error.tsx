"use client"

const ErrorLayout = (props: any) => {
  console.info("ErrorLayout props:", props)
  const { error } = props
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            An {error.environmentName ?? "unknown"} error occurred
          </h1>
          <p className="text-gray-100">
            {error.message ?? "Please try again later."}
          </p>
          <p className="text-red-400">{error.stack ?? "😢"}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorLayout
