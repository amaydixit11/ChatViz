'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi'
import axios from 'axios'
import ChatAnalysis from './ChatAnalysis'

export default function FileUpload() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugLogs, setDebugLogs] = useState<string[]>([])

  const logDebug = (message: string) => {
    setDebugLogs((prevLogs) => [...prevLogs, message])
    console.log(message)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) {
      logDebug('No file was selected.')
      return
    }

    logDebug(`File selected: ${file.name} (${file.size} bytes)`)
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      logDebug('Uploading file for parsing...')

      const parseResponse = await axios.post('http://localhost:8000/parse/chat', formData)
      logDebug(`Parse response received: ${JSON.stringify(parseResponse.data)}`)

      if (!parseResponse.data.messages) {
        throw new Error('No messages found in parsed response.')
      }

      const messages = parseResponse.data.messages

      logDebug('Requesting chat analysis...')

      const analysisResponse = await axios.post('http://localhost:8000/analysis/complete', messages)
      logDebug(`Analysis response received: ${JSON.stringify(analysisResponse.data)}`)

      setAnalysis(analysisResponse.data)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred.'
      setError(errorMessage)
      logDebug(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
    maxFiles: 1
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (analysis) {
    return <ChatAnalysis analysis={analysis} onReset={() => setAnalysis(null)} />
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your WhatsApp chat export file here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Only .txt files exported from WhatsApp are supported
        </p>
      </div>

      {error && (
        <div className="bg-red-50 p-4 mt-4 rounded-md">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {/* <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="font-semibold text-gray-700">Debug Logs</h3>
        <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
          {debugLogs.length > 0 ? debugLogs.join('\n') : 'No logs yet.'}
        </pre>
      </div> */}
    </div>
  )
}
