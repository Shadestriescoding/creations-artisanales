from PIL import Image
import os

def generate_favicons():
    # Utiliser la première image comme base
    source_image = "assets/images/deco_sapin_crochet.jpg"
    
    # Créer le dossier de sortie si nécessaire
    os.makedirs("assets/images", exist_ok=True)
    
    # Ouvrir l'image source
    with Image.open(source_image) as img:
        # Convertir en RGB si nécessaire
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Générer les différentes tailles de favicon
        sizes = {
            'favicon-16x16.png': (16, 16),
            'favicon-32x32.png': (32, 32),
            'icon-192x192.png': (192, 192),
            'favicon.ico': (32, 32)
        }
        
        for filename, size in sizes.items():
            resized = img.resize(size, Image.Resampling.LANCZOS)
            output_path = os.path.join("assets/images", filename)
            
            if filename.endswith('.ico'):
                resized.save(output_path, format='ICO')
            else:
                resized.save(output_path, format='PNG')
            
            print(f"Généré: {output_path}")

if __name__ == "__main__":
    generate_favicons() 