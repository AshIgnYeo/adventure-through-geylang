// WGS84 local tangent approximation. X east, Z south. One unit is one metre.
// Error over this 300 m neighbourhood is well below the precision of the source survey.
export function project([lon,lat], [lon0,lat0]) {
  const rad=Math.PI/180, phi=lat0*rad;
  const latMetres=111132.92-559.82*Math.cos(2*phi)+1.175*Math.cos(4*phi);
  const lonMetres=111412.84*Math.cos(phi)-93.5*Math.cos(3*phi);
  return [(lon-lon0)*lonMetres,-(lat-lat0)*latMetres];
}
export function nearestOnSegment(p,a,b) {
  const dx=b[0]-a[0], dz=b[1]-a[1], length2=dx*dx+dz*dz;
  const t=length2?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dz)/length2)):0;
  const point=[a[0]+t*dx,a[1]+t*dz];
  return {point,distance:Math.hypot(p[0]-point[0],p[1]-point[1]),t};
}
export function pointInPolygon(p,polygon) {
  let inside=false;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++) {
    const a=polygon[i],b=polygon[j];
    if((a[1]>p[1])!==(b[1]>p[1]) && p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0]) inside=!inside;
  }
  return inside;
}
export function roadWidth(road) { return road.name.startsWith('Lorong')?6.5:road.lanes*3.2; }
