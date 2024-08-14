'use client'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [responseObject, setResponseObject] = useState<any>(null)
  const [error, setError] = useState(null)
  const [generating, setGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGenerating(true) // Set generating to true when request starts

    const response = await fetch('/api/predictions', {
      method: 'POST',
      body: new FormData(e.currentTarget),
    })

    const data = await response.json()
    setGenerating(false) // Set generating to false when request ends

    if (response.status !== 201) {
      setError(data.detail)
      return
    }
    setImage(data.output[0])
    setResponseObject(data)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-white p-10 border-solid border-2 border-gray-300 rounded-3xl">
        <Head>
          <title>Replicate + Next.js</title>
        </Head>

        <p className="mb-4 text-lg text-gray-700">
          Dream something with{' '}
          <a href="https://replicate.com/stability-ai/stable-diffusion" className="text-blue-500 hover:underline">
            SDXL
          </a>
          :
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt to display an image"
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={generating} // Disable button when generating
          >
            {generating ? 'Generating...' : 'Go!'}
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {image && (
          <div className="mt-4">
            <div className="flex flex-col items-center justify-center w-full">
              <Image src={image} alt="output" width={500} height={500} className="object-cover w-full h-full rounded-md border-gray-300" />
            </div>
            {responseObject && (
              <div className="mt-4">
                <p>Generated in: {responseObject.metrics.predict_time.toFixed(1)}s</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
