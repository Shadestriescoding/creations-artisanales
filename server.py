from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__, static_folder='assets')

# Configuration des dossiers statiques
STATIC_FOLDERS = {
    'assets': 'assets',
    'fonts': 'assets/fonts',
    'images': 'assets/images',
    'js': 'assets/js',
    'css': 'assets/css'
}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('assets/images', 'favicon.ico', mimetype='image/x-icon')

@app.route('/assets/<path:filename>')
def serve_static(filename):
    try:
        directory = os.path.dirname(filename)
        file = os.path.basename(filename)
        return send_from_directory(f'assets/{directory}', file)
    except Exception:
        abort(404)

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    abort(404)

@app.errorhandler(404)
def not_found(e):
    return f"Fichier non trouvé: {e}", 404

if __name__ == '__main__':
    # Vérification des dossiers nécessaires
    for folder in ['assets/images', 'assets/fonts', 'assets/css', 'assets/js']:
        os.makedirs(folder, exist_ok=True)
    
    app.run(host='0.0.0.0', port=5000, debug=True) 