'use client'

import { createContext, useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

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

const CreateSnippetContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  onOpen: () => void
  onClose: () => void
} | null>(null)

export function useCreateSnippetContext() {
  const context = useContext(CreateSnippetContext)
  if (!context)
    throw new Error(
      'useCreateSnippetContext must be used within CreateSnippetProvider'
    )
  return context
}

export function CreateSnippetProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <CreateSnippetContext.Provider
      value={{
        open,
        setOpen,
        onOpen: () => setOpen(true),
        onClose: () => setOpen(false),
      }}
    >
      {children}
    </CreateSnippetContext.Provider>
  )
}

// Remove the interface and props
export function CreateSnippetDialog() {
  const { open, setOpen } = useCreateSnippetContext()
  const [editorLanguage, setEditorLanguage] = useState('javascript')
  const { toast } = useToast()
  const router = useRouter()

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
      router.refresh()
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
      <DialogContent className="max-w-[90vw] w-[800px] max-h-[85vh] flex flex-col gap-0">
        <DialogHeader className="flex-none px-6 pt-6">
          <DialogTitle>Create Snippet</DialogTitle>
          <DialogDescription>
            Create a new code snippet. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 flex-1 overflow-hidden"
          >
            <div className="flex flex-col gap-4 overflow-y-auto px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative">
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
                  <FormItem className="relative">
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your snippet..."
                        className="resize-none h-20"
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
                  <FormItem className="relative">
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
                        <SelectItem value="bash">Bash</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="dockerfile">Dockerfile</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="kotlin">Kotlin</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="swift">Swift</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="yaml">YAML</SelectItem>
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
                  <FormItem className="flex-1 min-h-[300px]">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <div className="relative h-[300px] border rounded-md">
                        <Editor
                          height="100%"
                          language={editorLanguage}
                          value={field.value}
                          onChange={field.onChange}
                          theme="vs-dark"
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4 border-t px-6 sticky bottom-0 bg-background pb-6">
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create Snippet'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
