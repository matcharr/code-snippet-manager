'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import Editor from '@monaco-editor/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string().optional(),
  language: z.string().min(1, 'Please select a language'),
  code: z
    .string()
    .min(1, 'Code snippet is required')
    .max(50000, 'Snippet is too large'),
})

type FormValues = z.infer<typeof formSchema>

export function CreateSnippetDialog() {
  const [open, setOpen] = useState(false)
  const [editorLanguage, setEditorLanguage] = useState('javascript')
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      language: '',
      code: '',
    },
    mode: 'onChange',
  })

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create snippet')
      }

      toast({
        title: 'Success',
        description: 'Snippet created successfully',
      })

      form.reset()
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create snippet',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">New Snippet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Snippet</DialogTitle>
          <DialogDescription>
            Create a new code snippet. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My awesome snippet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your snippet..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setEditorLanguage(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Editor
                      height="300px"
                      language={editorLanguage}
                      value={field.value}
                      onChange={field.onChange}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating...' : 'Create Snippet'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
