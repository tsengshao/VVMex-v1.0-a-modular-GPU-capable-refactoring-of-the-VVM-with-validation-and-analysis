'reinit'
'set background 1'
'c'

model='VVMex'
model='VVM'
'! mkdir -p ./fig'

dx=500
nx=512
ny=16
nz=33
'open ../../VVMex/bubble_shear_wk/vvm.ctl'
'open ../../VVM/bubble_shear_wk_offline/gs_ctl_files/diag.ctl'
'open ../../VVM/bubble_shear_wk_offline/gs_ctl_files/bar.ctl'

*'set lwid 75 8'
'set lwid 75 3'
'set t 7'
tlablist='00:12 00:30 01:00 01:30 02:00 02:30 03:00'
it=1
while(it<=7)
'c'
tlab=subwrd(tlablist,it)
'set time 'tlab'Z'
'q dim'
line=sublin(result, 5)
idxt=subwrd(line,9)

if (it <=2)
'set x '256-32' '256+32
'set xlabs -16|-8|0|8|16'
else
'set x 128 389'
'set xlabs -64|-32|0|32|64'
endif


'set y 1'
'set z 1 31'

'set parea 1.5 10.5 2.2 8'
'set grads off'
'set timelab off'
'set mpdraw off'
'set xlopts 1 75 0.2'
'set ylopts 1 75 0.2'
*'set ylabs 0|2|4|6|8|10|12|14|16'

if (model='VVMex')
*'define qc0=maskout(qc_after_p3,nc_after_p3>0)'
*'define qi0=maskout(qi_after_p3,ni_after_p3>0)'
*'define qr0=maskout(qr_after_p3,nr_after_p3>0)'
'define qc0=qc_after_p3'
'define qi0=qi_after_p3'
'define qr0=qr_after_p3'
'define qrim0=maskout(qr_after_p3,nr_after_p3>0)'
'define brim0=maskout(qr_after_p3,nr_after_p3>0)'
endif

if (model='VVM')
**   *'define qc0=maskout(dm03.2,dm06.2>0)'
**   *'define qi0=maskout(dm04.2,dm08.2>0)'
**   *'define qr0=maskout(dm05.2,dm07.2>0)'
'define qc0=dm03.2'
'define qi0=dm04.2'
'define qr0=dm05.2'
'define qrim0=maskout(dm09.2,dm08.2>0)'
'define brim0=maskout(dm10.2,dm08.2>0)'
endif

'on'
'color -levs 0 0.1 0.5 1 2 3 4 5 6 -gxout grfill -kind (255,255,255)-(0)->(240,240,240)->(100,100,100)'
'd qi0*1e3'
'xcbar 1.5 10.5 1. 1.3 -fw 0.15 -fh 0.15 -ft 10'

'off'
'color -levs 0 0.1 0.5 1 2 3 4 5 6  -gxout grfill -kind (255,255,255,0)-(0)->grainbow -alpha 200'
'd qc0*1e3'
*X Limits = 1.5 to 10.5
*Y Limits = 2 to 8
'xcbar 1.5 10.5 0.4 0.7 -fw 0.15 -fh 0.15 -ft 10'

'off'
'set gxout contour'
'set cthick 75'
* 'set cint 0.05'
* 'set black -0.000001 0.000001'
'set ccolor 1'
'set clevs 0.05 0.1'
'd (qc_after_p3 - dm03.2)*1e3'


** 'set lwid 78 15'
** 'set gxout contour'
** 'set cthick 78'
** 'set clab off'
** 'set ccolor 1'
** 'set clevs 0.1'
** 'd qr0*1e3'

*X Limits = 1.5 to 10.5
*Y Limits = 2.2 to 8
'set strsiz 0.25'
'set string 1 tc 75 0'
'draw string 6 1.7  [km]'
'set string 1 bc 75 90'
'draw string 0.35 5  [m]'

'set string 1 bc 75 0'
'set strsiz 0.25'
'draw string 6 8.1 'model' 'tlab
itt=math_format( '%06.0f', idxt-1)
*'gxprint ./fig/'model'_'itt'.png white x3000 y2400'
'gxprint ./fig/'model'_'itt'.pdf'


*pull c


'c'
'set grads off'
'set timelab off'

'set z 1 25'
*'set x '256-64' '256+64
*'set xlabs -32|-16|0|16|32'
'set x '256-32' '256+32
'set xlabs -16|-8|0|8|16'

'on'
'color -levs 0 0.1 0.5 1 2 3 4 5 6  -gxout grfill -kind (255,255,255,0)-(0)->grainbow -alpha 200'
'd qc_after_p3*1e3'
'xcbar 1.5 10.5 0.4 0.7 -fw 0.15 -fh 0.15 -ft 10'

'off'
'set gxout contour'
'set cthick 75'
* 'set cint 0.05'
* 'set black -0.000001 0.000001'
'set ccolor 1'
'set clevs 0.05 0.1'
'd (qc_after_p3 - dm03.2)*1e3'

'set strsiz 0.25'
'set string 1 tc 75 0'
'draw string 6 1.7  [km]'
'set string 1 bc 75 90'
'draw string 0.35 5  [m]'

'set string 1 bc 75 0'
'set strsiz 0.25'
'draw string 6 8.1 VVMex-VVM 'tlab
itt=math_format( '%06.0f', idxt-1)
*'gxprint ./fig/DIFF_'itt'.png white x3000 y2400'
'gxprint ./fig/DIFF_'itt'.pdf'


*pull c

it=it+1
endwhile

