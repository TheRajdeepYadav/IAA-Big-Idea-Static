# 1. Build the React application
Write-Output "Building the production bundle..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Output "Build failed. Deployment aborted."
    exit 1
}

# 2. Prepare temporary directory
$tempDir = "C:\Users\rajde\.gemini\antigravity\scratch\deploy_temp"
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# 3. Copy dist contents to temp directory
Write-Output "Preparing deployment assets..."
Copy-Item -Path "dist\*" -Destination $tempDir -Recurse -Force

# 4. Push to gh-pages branch
Write-Output "Pushing build folder to gh-pages branch..."
Push-Location $tempDir
try {
    git init
    git checkout -b gh-pages
    git add .
    git commit -m "Deploy to GitHub Pages"
    git remote add origin https://github.com/TheRajdeepYadav/IAA-Big-Idea-Static.git
    $env:GIT_TERMINAL_PROMPT=0
    git push origin gh-pages --force
    Write-Output "Deployment push successful!"
} catch {
    Write-Output "Error during deployment: $($_.Exception.Message)"
} finally {
    Pop-Location
    # Clean up temp directory
    Remove-Item -Path $tempDir -Recurse -Force
}
