param(
  [string]$Message = "chore: automated commit",
  [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"

Write-Host "[1/4] Staging changes..." -ForegroundColor Cyan
& git add -A

# Check if there is anything to commit
$diff = git status --porcelain
if ([string]::IsNullOrWhiteSpace($diff)) {
  Write-Host "No changes to commit." -ForegroundColor Yellow
} else {
  Write-Host "[2/4] Committing..." -ForegroundColor Cyan
  & git commit -m $Message
}

Write-Host "[3/4] Pulling with rebase from origin/$Branch..." -ForegroundColor Cyan
& git pull --rebase origin $Branch

Write-Host "[4/4] Pushing to origin/$Branch..." -ForegroundColor Cyan
& git push origin $Branch

Write-Host "Done." -ForegroundColor Green
