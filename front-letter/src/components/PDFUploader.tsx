import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import type { FileWithPath } from 'react-dropzone'
import pdf from '../assets/pdf.svg'
import remove from '../assets/remove.svg'

type PDFUploaderProps = {
  value: FileWithPath | null
  onFileChange: (file: FileWithPath | null) => void
}

const PDFUploader = ({ value, onFileChange }: PDFUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0]
    if (file?.type === 'application/pdf') {
      onFileChange(file)
      console.log('File accepted:', file)
    } else {
      console.error('Only PDF files are allowed.')
      onFileChange(null)
    }
  }, [onFileChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="w-full">
      <h2 className="text-base font-semibold">Upload your resume (PDF)</h2>
      <div
        {...getRootProps({
          className:
            'mt-5 h-min-30 w-full border-2 border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-100 cursor-pointer',
        })}
      >
        <input {...getInputProps()} />
        {!value && (
          <div className='text-center'>
            <img src={pdf} alt="PDF Icon" className="w-12 h-12 mx-auto mb-2" />
            <p>{isDragActive ? 'Drop your resume here...' : 'Upload your resume'}</p>
            <p>Drag and drop your resume here, or click to select a file.</p>
          </div>
        )}

        {value && (
          <div className="mt-2 flex flex-row justify-start items-center gap-3">
            <img src={pdf} alt="" className='h-6'/> {value.name} ({(value.size / 1024).toFixed(2)} KB)
                <img src={remove} alt="Remove Icon" className="inline-block w-8 h-8 ml-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();   // prevent the dropzone click
            onFileChange(null);    // clear the field
          }}
          />
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFUploader
