Configuration Git 

1. Installer Git

Télécharge de https://git-scm.com/download/win et installe

2. Ouvrir PowerShell dans le dossier et exécuter :

git config --global user.name "Ton Nom"
git config --global user.email "ton.email@gmail.com"

git init
git add .
git commit -m "chore: configuration initiale du projet"

git branch develop
git checkout develop

git checkout -b feature/films
git commit -m "feat: ajouter les films tendances"

git checkout -b feature/recherche  
git commit -m "feat: ajouter la fonctionnalité de recherche"

git checkout -b feature/details
git commit -m "feat: ajouter la page détails du film"

git checkout main
git merge feature/films
git merge feature/recherche
git merge feature/details

3. Sur GitHub.com :
- Crée un repo public
- Note l'URL HTTPS

4. Dans PowerShell :

git remote add origin https://github.com/yab6969/Cinema-di-bled-fuck-blud--main.git
git branch -M main
git push -u origin main
git push -u origin develop
git push -u origin feature/films
git push -u origin feature/recherche
git push -u origin feature/details

