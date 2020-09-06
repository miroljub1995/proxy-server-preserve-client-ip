import React from 'react'

export default ({ text, className }: { text: string, className?: string }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: text }} ></div>
)