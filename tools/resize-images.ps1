# Resize and re-encode source photography for the web using System.Drawing.
# Usage: powershell -NoProfile -File tools/resize-images.ps1
# Source photos live in tools/source-photos/, output goes to public/assets/img/.
#
# Add a line to $jobs for each photograph. Keep the source files out of git;
# tools/source-photos/ is ignored.

Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $PSScriptRoot
$srcDir = Join-Path $root 'tools\source-photos'
$outDir = Join-Path $root 'public\assets\img'

$jobs = @(
  @{ src = 'property.jpg'; out = 'property.jpg'; width = 1400; quality = 72 }
)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq 'image/jpeg' }

foreach ($job in $jobs) {
  $srcPath = Join-Path $srcDir $job.src
  if (-not (Test-Path $srcPath)) { Write-Host "skip (missing): $($job.src)"; continue }

  $img = [System.Drawing.Image]::FromFile($srcPath)
  try {
    $w = [int]$job.width
    if ($img.Width -lt $w) { $w = $img.Width }
    $h = [int][Math]::Round($img.Height * ($w / $img.Width))

    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()

    $params = New-Object System.Drawing.Imaging.EncoderParameters 1
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality, [int64]$job.quality)

    $outPath = Join-Path $outDir $job.out
    $bmp.Save($outPath, $codec, $params)
    $bmp.Dispose()

    $kb = [Math]::Round((Get-Item $outPath).Length / 1KB)
    Write-Host ("{0,-22} -> {1,5} x {2,-5} {3,6} KB" -f $job.out, $w, $h, $kb)
  }
  finally { $img.Dispose() }
}
