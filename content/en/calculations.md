---
title: "Calculations"
description: "Sum up project or model quantities even at object level."
category: "Main Tools"
order: 25
---

The Calculation tool is a powerful spreadsheet calculation that enables calculations based on data model object metadata.

## Functionality

- **New** - Create a new calculation
- **Name** - Calculation name
- **Level** - Calculation is based on file or object attributes
- **Save** - Save the current calculation
- **Export** - Export the current calculation in Excel format

### Spreadsheet

- **Data** - Select content for the first column
  - **Folder** - Separate rows by data tree folders
  - **Attribute** - Separate rows by object attribute values
- **Column** - Select calculation content for columns
  - **Summary** - Calculates the total sum of selected attribute values
  - **Quantity** - Counts the number of objects

### Cell Rules

Spreadsheet cells can contain all kinds of formulas. Almost all the same formulas are supported as in Excel.

## Tips

Create a quick cost calculation: select Data: Attribute "Material" + Column: Attribute "Volume". Add columns "Unit Price" and "Total Price" with your own formulas.
