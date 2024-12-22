# Créer le dossier pour MongoDB
New-Item -ItemType Directory -Force -Path "C:\data\db"

# Télécharger MongoDB
$mongoDbVersion = "7.0.5"
$downloadUrl = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-$mongoDbVersion-signed.msi"
$installerPath = "$env:TEMP\mongodb-installer.msi"

Write-Host "Téléchargement de MongoDB..."
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

# Installer MongoDB
Write-Host "Installation de MongoDB..."
Start-Process msiexec.exe -Wait -ArgumentList "/i $installerPath /quiet /qn /norestart ADDLOCAL=ALL"

# Ajouter MongoDB au PATH
$mongoDbPath = "C:\Program Files\MongoDB\Server\7.0\bin"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
if ($currentPath -notlike "*$mongoDbPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$mongoDbPath", "Machine")
}

Write-Host "MongoDB a été installé avec succès!" 