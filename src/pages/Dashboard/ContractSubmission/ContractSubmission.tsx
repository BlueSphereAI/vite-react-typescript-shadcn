'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FileUp, Check, AlertCircle } from 'lucide-react'

interface UploadStatus {
  type: 'success' | 'error'
  message: string
}

export function ContractSubmission() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!validTypes.includes(selectedFile.type)) {
        setUploadStatus({
          type: 'error',
          message: 'Please upload a PDF or Word document'
        })
        return
      }
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setUploadStatus({
          type: 'error',
          message: 'File size should be less than 10MB'
        })
        return
      }
      setFile(selectedFile)
      setUploadStatus(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a contract document'
      })
      return
    }
    // Simulate upload success
    setUploadStatus({
      type: 'success',
      message: 'Contract submitted successfully'
    })
    // Reset form
    setTitle('')
    setDescription('')
    setFile(null)
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Contract Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter contract title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter contract description"
              required
              className="mt-1 h-32"
            />
          </div>

          <div>
            <Label htmlFor="file">Upload Contract Document</Label>
            <div className="mt-1">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF or Word (MAX. 10MB)</p>
                    {file && (
                      <p className="mt-2 text-sm text-blue-500 font-medium">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Contract
          </Button>
        </form>
      </Card>

      {/* Status Dialog */}
      <Dialog open={!!uploadStatus} onOpenChange={() => setUploadStatus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {uploadStatus?.type === 'success' ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              {uploadStatus?.type === 'success' ? 'Success' : 'Error'}
            </DialogTitle>
          </DialogHeader>
          <p className={uploadStatus?.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {uploadStatus?.message}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
} 