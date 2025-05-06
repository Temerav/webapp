# Webapp

Üdv!
Ezt a weboldalt festmények eladására készítettem.

## Futtatás

A következők szükségesek:
- Maven telepítése 3.9.9
- Java telepítése (21)
- Docker deskstop vagy wsl docker
- Node version manager
- Node 21
- Yarn

Futtatás:
1. Backend mappából:
   - mvn clean install
   - docker compose up
   - mvn spring-boot:run

2. Frontend mappából:
   - npm install --global yarn
   - yarn
   - yarn start
  
localhost:3000 porton lesz elérhető.

## Bejelentkezés

- Admin felhasználó:
  asd@asd.com
  admin

- Userhez regisztráció

## Funkciók

- Főoldal
- Áruház (
    Festmények információit tartalmazza,
    fiók nélkül megtekintés,
    felhasználóval kosárhoz adás,
    adminnal áru hozzáadás/módosítás/törlés
  )
- Kosár (Termék összesítő, rendelés leadása)
- Rólunk (Információk a festőnőről)
- Kapcsolat (Email küldő service)
- Regisztráció/bejelentkezés/Kijelentkezés
- Profil üdvözlő oldal (Saját megadott nevedet használva)

