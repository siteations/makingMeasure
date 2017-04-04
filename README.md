# makingMeasure
Data and d3 viz tools for an 1850s Dictionary of Measures (HTML, JS, d3.js)

Making Measure visualizes banal units of measure, using d3 and basic DOM selection/manipulation for an alternate lens onto the evolving structures of metrology in the 19th century. Offering animations, excavations, and an anthropology (of sorts) it literally draws out the units in J.H. Alexander's Universal Dictionary of Weights and Measures (1850).

The Dictionary visualization lets viewers browse the Dictionary's units by type (liquid, length, etc.). With weighted summations by port, it can be explored to draw out relative sizes of units used and their shared cities of deployment (as detailed in Alexander's condensed colonial histories). The dashboard display, for each unit, provides a quick, visual overview of: 
* relative conversions within the english system, 
* the common sites of usage as classified with empire, alliance, and material variation
* as well as original jpg of archival dictionary scans and, eventually, Alexander's final summary of the politics of shipping.

#### Quick Start

This was developed prior experience in node, but it can easily be run locally. 

First clone this respository and then work with Node.js's simple HTTP server package. To install:
* npm install http-server -g
To run (from your local directory):
* http-server . -p 8000

#### Prerequisites

d3.js, the data-tables included above, node.js for ease

#### Authors

This project was created by Meg Studer, as part of her on-going fascination with material abstractions.

### Acknowledgments

This project may be messy, but it was an excellent exercise in getting to know basic svg and the selections functionality (and variations) between d3, jQuery, and vanilla JS.
