import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'agent-class-progress'

interface ProgressData {
  completed: number[] // chapter ids
  lastVisited: { slug: string; scrollY: number; timestamp: number } | null
}

function getSnapshot(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { completed: [], lastVisited: null }
}

function save(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event('progress-update'))
}

// External store for cross-component reactivity
let cachedData = getSnapshot()

function subscribe(cb: () => void) {
  const handler = () => {
    cachedData = getSnapshot()
    cb()
  }
  window.addEventListener('progress-update', handler)
  window.addEventListener('storage', handler)
  return () => {
    window.removeEventListener('progress-update', handler)
    window.removeEventListener('storage', handler)
  }
}

function getStoreSnapshot() {
  return cachedData
}

export function useProgress() {
  const data = useSyncExternalStore(subscribe, getStoreSnapshot)

  const markCompleted = useCallback((chapterId: number) => {
    const current = getSnapshot()
    if (!current.completed.includes(chapterId)) {
      save({ ...current, completed: [...current.completed, chapterId] })
    }
  }, [])

  const toggleCompleted = useCallback((chapterId: number) => {
    const current = getSnapshot()
    const completed = current.completed.includes(chapterId)
      ? current.completed.filter((id) => id !== chapterId)
      : [...current.completed, chapterId]
    save({ ...current, completed })
  }, [])

  const updateLastVisited = useCallback((slug: string, scrollY: number) => {
    const current = getSnapshot()
    save({ ...current, lastVisited: { slug, scrollY, timestamp: Date.now() } })
  }, [])

  const isCompleted = useCallback(
    (chapterId: number) => data.completed.includes(chapterId),
    [data.completed],
  )

  return {
    completed: data.completed,
    lastVisited: data.lastVisited,
    completedCount: data.completed.length,
    markCompleted,
    toggleCompleted,
    updateLastVisited,
    isCompleted,
  }
}

/** Tracks scroll progress (0–1) within the current page */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
