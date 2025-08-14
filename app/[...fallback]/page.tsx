"use client"

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}

export default PageNotFound
