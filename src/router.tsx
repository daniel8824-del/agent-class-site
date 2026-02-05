import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { ChaptersOverview } from '@/components/chapter/ChaptersOverview'
import { ChapterPage } from '@/components/chapter/ChapterPage'
import { AgentShowcaseGrid } from '@/components/showcase/AgentShowcaseGrid'
import { AgentShowcasePage } from '@/components/showcase/AgentShowcasePage'
import { TagFilteredView } from '@/pages/TagFilteredView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'chapters', element: <ChaptersOverview /> },
      { path: 'chapters/:slug', element: <ChapterPage /> },
      { path: 'showcase', element: <AgentShowcaseGrid /> },
      { path: 'showcase/:id', element: <AgentShowcasePage /> },
      { path: 'tags/:tag', element: <TagFilteredView /> },
    ],
  },
])
