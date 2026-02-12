---
title: "Teknisk dokumentation"
description: "Teknisk dokumentation för organisationens IT-administration."
category: "Administration"
order: 9
---

## Arkitektur

6DPlanner är implementerad ovanpå AWS (Amazon Web Services) molnarkitektur och infrastruktur. Servrarna och data finns i AWS-datacenter nära användarna beroende på region.

Tjänsten bygger på en modern "serverlös" molnarkitektur där processer startas efter behov parallellt, vilket teoretiskt möjliggör obegränsad skalbarhet.

Högpresterande användarupplevelse på klientenheter har implementerats med unik intelligent multiresolution-objektnivå-webbstreamingteknik CesiumJS, som möjliggör dynamisk laddning av data baserat på betraktarens position.
