#!/usr/bin/env sh
# One-off: cut Katsuro's homepage video (research/video/hero-1080p.mp4) to the
# cutlet's proportions, drop the letterbox, audio, the noren shot and the final
# fade to black, lift the low light a touch, compress.
set -e
IN=research/video/hero-1080p.mp4
OUT=public/media
FILTER="[0:v]trim=0:10.1,setpts=PTS-STARTPTS[a];[0:v]trim=13.6:17.5,setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0,crop=1556:1004:182:38,scale=960:620,eq=gamma=1.16:saturation=1.1:contrast=1.04,fps=25,format=yuv420p[v]"
ffmpeg -y -v error -i "$IN" -filter_complex "$FILTER" -map "[v]" -an -c:v libx264 -profile:v main -preset slow -crf 28 -movflags +faststart "$OUT/katsu-cut.mp4"
ffmpeg -y -v error -i "$IN" -filter_complex "$FILTER" -map "[v]" -an -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 "$OUT/katsu-cut.webm"
ffmpeg -y -v error -ss 0.6 -i "$OUT/katsu-cut.mp4" -frames:v 1 -q:v 3 "$OUT/katsu-cut-poster.jpg"
ls -la "$OUT"/katsu-cut*
