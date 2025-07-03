import { FeatureItem } from "@/types/FeatueType";

const fieldFallbacks: { [key: string]: string } = {
  name: "No name in the data",
  address: "No address in the data",
  openingHours: "No opening hours in the data",
  website: "No website in the data",
  cuisine: "No cuisine info in the data",
  phone: "No phone in the data",
  email: "No email in the data",
  wheelchair: "No wheelchair info in the data",
  outdoorSeating: "No outdoor seating info",
  indoorSeating: "No indoor seating info",
  fee: "No fee info in the data",
  description: "No description in the data",
  wikidata: "No wikidata entry",
  altName: "No alternative name",
  artistName: "No artist name in the data",
  artworkType: "No artwork type info",
  material: "No material info",
  stars: "No stars rating",
  dietaryOptions: "No dietary options info",
  fax: "No fax info",
  roof: "No roof info",
  backrest: "No backrest info",
  creationYear: "No creation year",
  wikipediaLink: "No Wikipedia link",
  wikidataLink: "No Wikidata link",
  theatreType: "No theatre type info",
  facebookLink: "No Facebook link",
  operator: "No operator info",
  display: "No display info",
  type: "No type info",
};

const getValue = (val: any, field: string) =>
  val !== undefined && val !== null && val !== "" ? val : fieldFallbacks[field] || "Not available";

export const getFeatureProperties = (feature: FeatureItem, category: string) => {
  const { properties } = feature;
  const type = category.trim().toLowerCase();
  switch (type) {
    case 'restaurant':
      return {
        name: getValue(properties.name, 'name'),
        address: (
          properties['addr:street'] || properties['addr:housenumber'] || properties['addr:postcode'] || properties['addr:city']
        )
          ? `${getValue(properties['addr:street'], 'address')}, ${getValue(properties['addr:housenumber'], 'address')}, ${getValue(properties['addr:postcode'], 'address')}, ${getValue(properties['addr:city'], 'address')}`
          : fieldFallbacks.address,
        openingHours: getValue(properties.opening_hours, 'openingHours'),
        website: properties.website || undefined,
        websiteDisplay: getValue(properties.website, 'website'),
        cuisine: getValue(properties.cuisine, 'cuisine'),
        phone: getValue(properties.phone, 'phone'),
        wheelchair: getValue(properties.wheelchair, 'wheelchair'),
        outdoorSeating: getValue(properties.outdoor_seating, 'outdoorSeating'),
        indoorSeating: getValue(properties.indoor_seating, 'indoorSeating'),
        rate: typeof properties.rate === 'number' ? properties.rate : undefined,
      };
    case 'museum':
      return {
        name: getValue(properties.name, 'name'),
        address: (
          properties['addr:street'] || properties['addr:housenumber'] || properties['addr:postcode'] || properties['addr:city']
        )
          ? `${getValue(properties['addr:street'], 'address')}, ${getValue(properties['addr:housenumber'], 'address')}, ${getValue(properties['addr:postcode'], 'address')}, ${getValue(properties['addr:city'], 'address')}`
          : fieldFallbacks.address,
        openingHours: getValue(properties.opening_hours, 'openingHours'),
        website: properties.website || undefined,
        websiteDisplay: getValue(properties.website, 'website'),
        wheelchair: getValue(properties.wheelchair, 'wheelchair'),
        phone: getValue(properties.phone, 'phone'),
        email: getValue(properties.email, 'email'),
        fee: getValue(properties.fee, 'fee'),
        description: getValue(properties.description, 'description'),
        wikidata: getValue(properties.wikidata, 'wikidata'),
        rate: typeof properties.rate === 'number' ? properties.rate : undefined,
      };
    case 'gallery':
      return {
        name: getValue(properties.name, 'name'),
        address: (
          properties['addr:street'] || properties['addr:housenumber'] || properties['addr:postcode'] || properties['addr:city']
        )
          ? `${getValue(properties['addr:street'], 'address')}, ${getValue(properties['addr:housenumber'], 'address')}, ${getValue(properties['addr:postcode'], 'address')}, ${getValue(properties['addr:city'], 'address')}`
          : fieldFallbacks.address,
        wheelchair: getValue(properties.wheelchair, 'wheelchair'),
        openingHours: getValue(properties.opening_hours, 'openingHours'),
        fee: getValue(properties.fee, 'fee'),
        website: properties.website || undefined,
        websiteDisplay: getValue(properties.website, 'website'),
        altName: getValue(properties.alt_name, 'altName'),
        rate: typeof properties.rate === 'number' ? properties.rate : undefined,
      };
    case 'artwork':
      return {
        name: getValue(properties.name, 'name'),
        artistName: getValue(properties.artist_name, 'artistName'),
        artworkType: getValue(properties.artwork_type, 'artworkType'),
        address: (
          properties['addr:street'] || properties['addr:housenumber'] || properties['addr:postcode'] || properties['addr:city']
        )
          ? `${getValue(properties['addr:street'], 'address')}, ${getValue(properties['addr:housenumber'], 'address')}, ${getValue(properties['addr:postcode'], 'address')}, ${getValue(properties['addr:city'], 'address')}`
          : fieldFallbacks.address,
        wheelchair: getValue(properties.wheelchair, 'wheelchair'),
        website: properties.website || undefined,
        websiteDisplay: getValue(properties.website, 'website'),
        wikidata: getValue(properties.wikidata, 'wikidata'),
        description: getValue(properties.description, 'description'),
        material: getValue(properties.material, 'material'),
        fee: getValue(properties.fee, 'fee'),
        rate: typeof properties.rate === 'number' ? properties.rate : undefined,
      };
    // Add rate for any other category that can have it
    default:
      return {};
  }
};
