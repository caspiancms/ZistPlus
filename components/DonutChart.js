'use client'
export default function DonutChart({income, expense, size=140}){
  const total = income + expense || 1
  const incomePercent = Math.round((income/total)*100)
  const radius = size/2 - 10
  const circumference = 2*Math.PI*radius
  const incomeStroke = (incomePercent/100)*circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        <circle r={radius} fill="transparent" stroke="#e6eef8" strokeWidth="18" />
        <circle r={radius} fill="transparent" stroke="#178A34" strokeWidth="18"
          strokeDasharray={`${incomeStroke} ${circumference-incomeStroke}`} strokeLinecap="round" transform="rotate(-90)" />
        <text x="0" y="6" fontSize="14" textAnchor="middle" fill="#0f1724">{incomePercent}%</text>
      </g>
    </svg>
  )
}
