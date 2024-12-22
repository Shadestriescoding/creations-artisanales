# Configuration du service MongoDB
$serviceName = "MongoDB"
$mongoDBPath = "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
$dbPath = "C:\data\db"

# Vérifier si le service existe déjà
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue

if ($service -eq $null) {
    # Créer le service MongoDB
    Write-Host "Création du service MongoDB..."
    & sc.exe create MongoDB binPath= "$mongoDBPath --service --dbpath=$dbPath" start= auto
} else {
    Write-Host "Le service MongoDB existe déjà."
}

# Démarrer le service
Write-Host "Démarrage du service MongoDB..."
Start-Service -Name $serviceName

Write-Host "MongoDB est maintenant démarré en tant que service!" 