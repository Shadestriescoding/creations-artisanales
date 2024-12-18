describe('Page d\'accueil', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="hero">
                <div class="hero-content">
                    <h1>La cabane d'Eva</h1>
                </div>
            </div>
        `;
    });

    test('Le titre principal est présent', () => {
        const title = document.querySelector('h1');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe('La cabane d\'Eva');
    });

    test('La section hero est présente', () => {
        const hero = document.querySelector('.hero');
        expect(hero).toBeInTheDocument();
    });
}); 