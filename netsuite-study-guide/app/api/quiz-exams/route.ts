import { NextResponse } from 'next/server'
import { loadQuizExams } from '@/data/loadQuizData'

export async function GET() {
  try {
    const exams = loadQuizExams()
    return NextResponse.json(exams)
  } catch (error) {
    console.error('Error loading quiz exams:', error)
    return NextResponse.json(
      { error: 'Failed to load quiz exams' },
      { status: 500 }
    )
  }
}
