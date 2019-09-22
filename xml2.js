var XMLWriter = require('xml-writer');
xw = new XMLWriter;
var format = require('xml-formatter');

xw.startDocument();
xw.startElement('Items');
xw.startElement("Item");
xw.writeAttribute('ItemID', 5);

//Name
xw.startElement("Name");
xw.text(20);
xw.endElement();

//Currently
xw.startElement("Currently");
xw.text(20);
xw.endElement();

//First_Bid
xw.startElement("First_Bid");
xw.text(20);
xw.endElement();

//Number_of_Bids
xw.startElement("Number_of_Bids");
xw.text(21);
xw.endElement();

//Location
xw.startElement("Location");
xw.writeAttribute("Latitude", 22);
xw.writeAttribute("Longitude", 24);
xw.text(24);
xw.endElement();

//Country
xw.startElement("Country");
xw.text(25);
xw.endElement();

//Started
xw.startElement("Started");
xw.text(444);
xw.endElement();

//Ends
xw.startElement("Ends");
xw.text(555);
xw.endElement();

//Description
xw.startElement("Description");
xw.text(555);
xw.endElement();

//Seller
xw.startElement("Seller");
//xw.text(bid.);
xw.writeAttribute('Rating', 66);
xw.writeAttribute('UserID', 88);
xw.endElement();



xw.text('Some content');
xw.endElement("Item");
xw.endDocument();
var formattedXml = format(xw.toString());
console.log(formattedXml);

console.log(xw.toString());