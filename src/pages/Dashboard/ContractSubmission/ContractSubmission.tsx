'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '../../../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'

// Form validation schema
const contractFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  document: z.instanceof(File).optional(),
})

type ContractFormValues = z.infer<typeof contractFormSchema>

export function ContractSubmission() {
  // Initialize form with validation
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  // Form submission handler
  function onSubmit(data: ContractFormValues) {
    // TODO: Implement actual contract submission logic
    console.log('Form submitted:', data)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Submit New Contract</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to submit a new contract for review.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contract title" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a clear and concise title for the contract.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed description of the contract"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the purpose and key terms of the contract.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Upload Contract Document</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onChange(file)
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Upload the contract document in PDF or Word format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit Contract</Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 