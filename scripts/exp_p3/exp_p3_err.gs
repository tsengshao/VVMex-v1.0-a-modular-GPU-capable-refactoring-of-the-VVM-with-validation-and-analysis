*grads -a 1.777778
*16:6 grads -a 2.6666667
'reinit'
'set background 1'
'c'

dx=500
nx=512
ny=16
nz=33
'open ../../VVMex/bubble_shear_wk/vvm.ctl'
'open ../../VVM/bubble_shear_wk_offline/gs_ctl_files/diag.ctl'
'open ../../VVM/bubble_shear_wk_offline/gs_ctl_files/bar.ctl'

'set x 1'
'set y 1'
'set t 1'
'set z 1 'nz
'wei=dzt.3*rho.3'
*'wei=1'

'set lwid 75 2'

** -0.5 0.5 

'set x 1'
'set y 1'
'set z 1'
'set t 1 last'
'define a=sqrt(mean(amean(pow(qc_after_p3*wei-dm03.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define b=sqrt(mean(amean(pow(dm03.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define c=sum(asum(const(maskout(1,dm06.2>0),0,-u),x=1,x=512,y=1,y=1),z=1,z=33)'
'define qcerr=a/maskout(b,c>50)'

'define a=sqrt(mean(amean(pow(qi_after_p3*wei-dm04.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define b=sqrt(mean(amean(pow(dm04.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define c=sum(asum(const(maskout(1,dm07.2>0),0,-u),x=1,x=512,y=1,y=1),z=1,z=33)'
'define qierr=a/maskout(b,c>250)'

'define a=sqrt(mean(amean(pow(qr_after_p3*wei-dm05.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define b=sqrt(mean(amean(pow(dm05.2*wei,2),x=1,x=512,y=1,y=1),z=1,z=33))'
'define c=sum(asum(const(maskout(1,dm08.2>0),0,-u),x=1,x=512,y=1,y=1),z=1,z=33)'
'define qrerr=a/maskout(b,c>250)'


*scale=1e3
*scalestr='10`a-3`n'

* figure 1
*'set parea 1.5 10.5 1 7'
*'set parea 1 10.5 1 5'
'set parea 1 10.5 1 3.5'
'set grads off'
'set timelab off'
'set mpdraw off'
'set tlsupp month'
'set xlopts 1 75 0.2'
'set ylopts 1 75 0.2'
'set vrange 0 0.025'

'set xlabs 0|0.5|1|1.5|2|2.5|3'
'set ylint 0.005'

'set cthick 75'

'set rgb 81 0 0 0'
'set rgb 82 230 175 45'
'set rgb 83 130 0 220'

'set cstyle 0'
'set cmark 3'
'set digsiz 0.15'
'set ccolor 81'
'd skip(qcerr,3)'

'off'
'set cstyle 0'
'set cmark 5'
'set ccolor 82'
'set digsiz 0.15'
'd skip(qierr,3)'

'set cstyle 0'
'set cmark 8'
'set ccolor 83'
'set digsiz 0.17'
'd skip(qrerr,3)'

*'legend tr 3 10 75 qc qi qr 1 2 3'
'legend tr 3 10 75 qc qi qr 81 82 83 0 0 0 3 5 8'

* X Limits = 1 to 10.5
* Y Limits = 1 to 3.5

'set string 1 bl 75 0'
'set strsiz 0.25'
'draw string 1 3.6 Relative L`b2`n norm'

'set string 1 tc 75 0'
'draw string 5.75 0.5  simulation time [hr]'
'set string 1 bc 75 90'

*'gxprint p3_l2_err.png white x3000 y2400'
'gxprint p3_l2_err.pdf'
