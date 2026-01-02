# Fix Git Merge Conflict

Als je deze fout krijgt:
```
error: Your local changes to the following files would be overwritten by merge:
        deploy.sh
```

## Oplossing: Stash lokale wijzigingen

Voer deze commando's uit in de SSH console:

```bash
# Stash lokale wijzigingen (slaat ze tijdelijk op)
git stash

# Pull de nieuwe code
git pull origin main

# Run deployment
chmod +x deploy.sh
bash deploy.sh
```

## Of alles in één keer:

```bash
git stash && git pull origin main && chmod +x deploy.sh && bash deploy.sh
```

## Als je de lokale wijzigingen wilt behouden:

```bash
# Commit de lokale wijzigingen eerst
git add deploy.sh
git commit -m "Local deploy.sh changes"

# Pull met merge
git pull origin main

# Als er conflicten zijn, los ze op en commit:
# git add deploy.sh
# git commit -m "Merge conflicts resolved"

# Run deployment
chmod +x deploy.sh
bash deploy.sh
```

## Als je de lokale wijzigingen wilt weggooien:

```bash
# Verwijder lokale wijzigingen (LET OP: dit gooit wijzigingen weg!)
git checkout -- deploy.sh

# Pull nieuwe code
git pull origin main

# Run deployment
chmod +x deploy.sh
bash deploy.sh
```

