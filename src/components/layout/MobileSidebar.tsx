import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="px-4 py-3 border-b border-border">
          <SheetTitle className="text-left">에이전트 클래스</SheetTitle>
        </SheetHeader>
        <div className="[&_aside]:block [&_aside]:w-full [&_aside]:border-r-0">
          <Sidebar onNavigate={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
