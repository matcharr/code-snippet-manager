export function SnippetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-2">
          <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-20 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}
