---
title: "Tekninen dokumentaatio"
description: "Tekninen dokumentaatio organisaation IT-hallinnolle."
category: "Hallinnointi"
order: 9
---

*(English only as technical terminology is more clear in English)*

## Architecture

6DPlanner is implemented on top of AWS (Amazon Web Services) cloud architecture and infrastructure. The servers and data are located in AWS data centers close to users, depending on user's region.

The service is based on a modern "serverless" cloud architecture, where processes are started as needed in parallel, which theoretically enables unlimited scalability based on usage needs.

High performance end user experience on client devices has been implemented with unique intelligent multi-resolution object level web streaming CesiumJS technology, which enables dynamic loading of data based on the viewer's location.
