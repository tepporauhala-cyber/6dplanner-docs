---
title: "Tehniline dokumentatsioon"
description: "Tehniline dokumentatsioon organisatsiooni IT-haldusele."
category: "Haldamine"
order: 9
---

## Arhitektuur

6DPlanner on rakendatud AWS (Amazon Web Services) pilvearhitektuuri ja infrastruktuuri peal. Serverid ja andmed asuvad AWS andmekeskustes kasutajate lähedal, sõltuvalt kasutaja piirkonnast.

Teenus põhineb kaasaegsel "serverless" pilvearhitektuuril, kus protsessid käivitatakse vastavalt vajadusele paralleelselt, mis teoreetiliselt võimaldab piiramatut skaleeritavust vastavalt kasutusvajadustele.

Kõrgekvaliteediline kasutajakogemus klientseadmetes on rakendatud unikaalse intelligentse mitme resolutsiooniga objektitaseme veebivootehnoloogia CesiumJS abil, mis võimaldab andmete dünaamilist laadimist vaataja asukoha põhjal.
