import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileCheck } from 'lucide-react'
import { extractPDF } from '../utils/api'
import toast from 'react-hot-toast'

export default function DropZone({ onText }) {
  const [fileName, setFileName] = useState(null)

  const onDrop = useCallback(async (files) => {
    const file = files[0]
    if (!file) return
    setFileName(file.name)

    if (file.type === 'text/plain') {
      const text = await file.text()
      onText(text)
      toast.success('Text file loaded!')
      return
    }

    if (file.type === 'application/pdf') {
      const tid = toast.loading('Extracting PDF text…')
      try {
        const fd = new FormData()
        fd.append('file', file)
        const { text } = await extractPDF(fd)
        onText(text)
        toast.dismiss(tid)
        toast.success(`PDF extracted!`)
      } catch {
        toast.dismiss(tid)
        toast.error('PDF extraction failed — paste text manually')
      }
    }
  }, [onText])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] },
    maxFiles: 1,
  })

  return (
    <div {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200
        ${isDragActive ? 'border-accent bg-accent/5' : ''}
        ${fileName ? 'border-teal-500/60 bg-teal-500/5' : 'border-border2 hover:border-accent/60 hover:bg-accent/5'}`}
    >
      <input {...getInputProps()} />
      {fileName
        ? <FileCheck size={28} className="mx-auto mb-2 text-teal-400" />
        : <Upload    size={28} className="mx-auto mb-2 text-muted" />}
      <p className="text-sm text-muted">
        {fileName ? fileName : isDragActive ? 'Drop it!' : 'Drop PDF or TXT, or click to browse'}
      </p>
    </div>
  )
}
