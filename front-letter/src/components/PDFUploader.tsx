import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import type {FileWithPath} from 'react-dropzone'
import pdf from '../assets/pdf.svg' // Adjust the path to your PDF icon
import { Button } from '@/components/ui/button'

import axios from 'axios'

const PDFUploader= ()=>{
  const [file, setFile] = useState<FileWithPath | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      // Handle the file upload logic here
      console.log('Submitting file:', file)
      const formData = new FormData()
      formData.append('resume', file)
      const res = await axios.post('http://localhost:3000/api/cover-letter/upload', formData)
      console.log('Response from server:', res.data)
      console.log('File submitted successfully')

      // For example, you can send it to a server or process it as needed
    } else {
      console.error('No file selected.')
    }
  }

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0 && acceptedFiles[0].type === 'application/pdf') {
      setFile(acceptedFiles[0])
      console.log('File accepted:', acceptedFiles[0])
    } else {
      console.error('Only PDF files are allowed.')
      setFile(null)
    }
     
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <form onSubmit={handleSubmit}>
    <div className='p-4 border rounded-lg shadow-md bg-white'>
      <h2 className='text-xl font-semibold mb-4'>Upload your resume (PDF)</h2>
    <div {...getRootProps({className:'mt-5 h-min-30 border-2 border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-100 cursor-pointer'})}>
      <input {...getInputProps()} />
      {!file &&      <div>
        <img src={pdf} alt="PDF Icon" className="w-12 h-12 mx-auto mb-2" />
      {
        isDragActive ?
        <p>Drop your resume here...</p> :
        <p>Upload your resume</p>
      }
      
      Drag and drop your resume here, or click to select a file from your computer.
      </div>}

      {file && (
        <div className="mt-2">
          <strong>Selected file:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
      </div>
      <Button type='submit'>Send resume</Button>
      </form>
  )
}

export default PDFUploader