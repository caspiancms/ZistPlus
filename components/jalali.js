export function gregorianToJalali(gy, gm, gd){
  const g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
  let jy, jm, jd;
  let gy2 = (gm > 2) ? (gy + 1) : gy;
  let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm-1];
  jy = -1595 + (33 * Math.floor(days / 12053));
  days = days % 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if(days > 365){ jy += Math.floor((days - 1) / 365); days = (days - 1) % 365; }
  if(days < 186){ jm = 1 + Math.floor(days / 31); jd = 1 + (days % 31); }
  else { jm = 7 + Math.floor((days - 186) / 30); jd = 1 + ((days - 186) % 30); }
  return { jy, jm, jd };
}
export function formatGregorianToJalaliString(dateStr){ if(!dateStr) return ''; const d = new Date(dateStr); if (isNaN(d)) return ''; const g = { gy: d.getFullYear(), gm: d.getMonth()+1, gd: d.getDate() }; const j = gregorianToJalali(g.gy, g.gm, g.gd); const hh = String(d.getHours()).padStart(2,'0'); const mm = String(d.getMinutes()).padStart(2,'0'); return `${j.jy}/${String(j.jm).padStart(2,'0')}/${String(j.jd).padStart(2,'0')} ${hh}:${mm}` }
