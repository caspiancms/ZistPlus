'use client'
import { useState, useEffect } from 'react'

function jalaliToGregorian(jy, jm, jd) {
  jy = Number(jy); jm = Number(jm); jd = Number(jd);
  let gy;
  if (jy > 979) { gy = 1600; jy -= 979; } else { gy = 621; }
  let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
  const j_month_days = [0,31,31,31,31,31,31,30,30,30,30,30,29];
  for (let i = 1; i < jm; ++i) j_day_no += j_month_days[i];
  j_day_no += jd - 1;
  let g_day_no = j_day_no + 79;
  gy += 400 * Math.floor(g_day_no / 146097);
  g_day_no = g_day_no % 146097;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * Math.floor(g_day_no / 36524);
    g_day_no = g_day_no % 36524;
    if (g_day_no >= 365) g_day_no++;
  }
  gy += 4 * Math.floor(g_day_no / 1461);
  g_day_no %= 1461;
  if (g_day_no >= 366) { g_day_no -= 366; gy += Math.floor(g_day_no / 365); g_day_no = g_day_no % 365; }
  const g_month_days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
  let gm=0, gd=0;
  for (gm = 1; g_day_no >= g_month_days[gm]; gm++) { g_day_no -= g_month_days[gm]; }
  gd = g_day_no + 1;
  return { gy: gy, gm: gm, gd: gd };
}

export default function PersianDateTimePicker({value,onChange}){
  const now = new Date();

  // helper: convert gregorian date to jalali (local variables declared properly)
  function toJ(gy, gm, gd){
    const g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
    let days = 355666 + (365*gy) + Math.floor(( (gm>2?gy+1:gy) + 3)/4) - Math.floor(((gm>2?gy+1:gy)+99)/100) + Math.floor(((gm>2?gy+1:gy)+399)/400) + gd + g_d_m[gm-1];
    let jy = -1595 + (33 * Math.floor(days/12053));
    days = days % 12053;
    jy += 4 * Math.floor(days/1461);
    days = days % 1461;
    if(days > 365){
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    let jm_local, jd_local;
    if(days < 186){
      jm_local = 1 + Math.floor(days / 31);
      jd_local = 1 + (days % 31);
    } else {
      jm_local = 7 + Math.floor((days - 186) / 30);
      jd_local = 1 + ((days - 186) % 30);
    }
    return { jy, jm: jm_local, jd: jd_local };
  }

  const jNow = toJ(now.getFullYear(), now.getMonth()+1, now.getDate());
  const currentJY = jNow.jy;

  const years = Array.from({length:12}, (_,i)=>currentJY-5+i);
  const months = Array.from({length:12}, (_,i)=>i+1);
  function daysInJMonth(y,m){ if(m<=6) return 31; if(m<=11) return 30; return 29; }

  const [jy,setJy] = useState(currentJY);
  const [jm,setJm] = useState(jNow.jm);
  const [jd,setJd] = useState(jNow.jd);
  const [hh,setHh] = useState(String(now.getHours()).padStart(2,'0'));
  const [mm,setMm] = useState(String(Math.floor(now.getMinutes()/5)*5).padStart(2,'0'));

  useEffect(()=>{
    if(value){
      const d = new Date(value);
      if(!isNaN(d)){
        const g = { gy: d.getFullYear(), gm: d.getMonth()+1, gd: d.getDate() };
        const j = toJ(g.gy, g.gm, g.gd);
        setJy(j.jy); setJm(j.jm); setJd(j.jd);
        setHh(String(d.getHours()).padStart(2,'0')); setMm(String(d.getMinutes()).padStart(2,'0'));
      }
    }
  },[value]);

  useEffect(()=>{
    if(!jy || !jm || !jd){ onChange && onChange(''); return; }
    const g = jalaliToGregorian(jy,jm,jd);
    const iso = new Date(g.gy, g.gm-1, g.gd, Number(hh||0), Number(mm||0)).toISOString();
    onChange && onChange(iso);
  },[jy,jm,jd,hh,mm]);

  const dayCount = daysInJMonth(jy,jm);

  return (
    <div>
      <div style={{display:'flex',gap:8}}>
        <select className='input' value={jy} onChange={e=>setJy(Number(e.target.value))}>
          {years.map(y=> <option key={y} value={y}>{y}</option>)}
        </select>
        <select className='input' value={jm} onChange={e=>setJm(Number(e.target.value))}>
          {months.map(m=> <option key={m} value={m}>{m}</option>)}
        </select>
        <select className='input' value={jd} onChange={e=>setJd(Number(e.target.value))}>
          {Array.from({length:dayCount}, (_,i)=>i+1).map(d=> <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div style={{display:'flex',gap:8, marginTop:8}}>
        <select className='input' value={hh} onChange={e=>setHh(e.target.value)}>
          {Array.from({length:24}, (_,i)=>String(i).padStart(2,'0')).map(h=> <option key={h} value={h}>{h}</option>)}
        </select>
        <select className='input' value={mm} onChange={e=>setMm(e.target.value)}>
          {Array.from({length:12}, (_,i)=>String(i*5).padStart(2,'0')).map(m=> <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div style={{fontSize:12,opacity:0.6, marginTop:6}}>{`نمایش: ${jy}/${String(jm).padStart(2,'0')}/${String(jd).padStart(2,'0')} ${hh}:${mm}`}</div>
    </div>
  )
}
