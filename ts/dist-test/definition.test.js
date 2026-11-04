"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "config",
        "accessor": "Config",
        "op": "load",
        "method": "GET",
        "path": "/v1/config",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "minSupportedBuild": 1,
                "flags": {
                    "mapClustering": true
                }
            },
            "meta": {
                "contractVersion": "1.0.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "facet",
        "accessor": "Facet",
        "op": "load",
        "method": "GET",
        "path": "/v1/facets",
        "args": [],
        "select": {
            "locale": "en",
            "city": "berlin",
            "country": "v1",
            "currency": "v1",
            "operator": "v1",
            "pricing_option_type": "v1",
            "zone": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale",
            "country",
            "city",
            "zone",
            "operator",
            "pricingOptionType",
            "currency"
        ],
        "queryArgs": [
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "locale",
                "wire": "locale"
            },
            {
                "name": "operator",
                "wire": "operator"
            },
            {
                "name": "pricing_option_type",
                "wire": "pricingOptionType"
            },
            {
                "name": "zone",
                "wire": "zone"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "facets": [
                    {
                        "key": "zone",
                        "label": "Neighbourhood",
                        "values": [
                            {
                                "value": "mitte",
                                "label": "Mitte",
                                "count": 14
                            },
                            {
                                "value": "kreuzberg",
                                "label": "Kreuzberg",
                                "count": 9
                            }
                        ]
                    },
                    {
                        "key": "pricingOptionType",
                        "label": "Workspace type",
                        "values": [
                            {
                                "value": "private_office",
                                "label": "Private office",
                                "count": 21
                            },
                            {
                                "value": "flex_desk",
                                "label": "Flex desk",
                                "count": 18
                            }
                        ]
                    }
                ],
                "priceRange": {
                    "min": {
                        "amount": 150,
                        "currency": "EUR"
                    },
                    "max": {
                        "amount": 2400,
                        "currency": "EUR"
                    }
                },
                "capacityRange": {
                    "min": 1,
                    "max": 60
                }
            },
            "meta": {
                "contractVersion": "1.0.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "geo",
        "accessor": "Geo",
        "op": "load",
        "method": "GET",
        "path": "/v1/geo/bootstrap",
        "action": "bootstrap",
        "args": [],
        "select": {
            "locale": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale"
        ],
        "queryArgs": [
            {
                "name": "locale",
                "wire": "locale"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "countries": [
                    {
                        "slug": "germany",
                        "name": "Germany",
                        "code": "DE",
                        "propertyCount": 40
                    }
                ],
                "cities": [
                    {
                        "slug": "berlin",
                        "name": "Berlin",
                        "countryCode": "DE",
                        "propertyCount": 32,
                        "center": {
                            "lat": 52.52,
                            "lng": 13.405
                        },
                        "zones": [
                            {
                                "slug": "mitte",
                                "name": "Mitte",
                                "propertyCount": 14
                            }
                        ]
                    }
                ],
                "currencies": {
                    "DE": "EUR"
                }
            },
            "meta": {
                "contractVersion": "1.0.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "health",
        "accessor": "Health",
        "op": "load",
        "method": "GET",
        "path": "/v1/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "status": "ok",
                "sha": "3f9c2a1"
            },
            "meta": {
                "contractVersion": "1.0.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "market",
        "accessor": "Market",
        "op": "load",
        "method": "GET",
        "path": "/v1/market/rates",
        "action": "rate",
        "args": [],
        "select": {
            "locale": "en",
            "city": "berlin",
            "country": "v1",
            "currency": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale",
            "city",
            "country",
            "currency"
        ],
        "queryArgs": [
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "locale",
                "wire": "locale"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "cities": [
                    {
                        "city": {
                            "slug": "berlin",
                            "name": "Berlin"
                        },
                        "countryCode": "DE",
                        "currency": "EUR",
                        "byType": [
                            {
                                "optionType": "flex_desk",
                                "median": {
                                    "amount": 250,
                                    "currency": "EUR"
                                },
                                "min": {
                                    "amount": 150,
                                    "currency": "EUR"
                                },
                                "max": {
                                    "amount": 420,
                                    "currency": "EUR"
                                },
                                "sampleSize": 24
                            }
                        ],
                        "dayPass": {
                            "median": {
                                "amount": 25,
                                "currency": "EUR"
                            },
                            "sampleSize": 11
                        },
                        "sampleSize": 30
                    }
                ],
                "totalProperties": 30,
                "totalPricePoints": 61,
                "asOf": "2026-10-01T06:00:00Z",
                "license": "CC-BY-4.0",
                "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
                "attribution": "Source: CoworkingView Price Index (https://www.coworkingview.com/en/tools/price-index), as of October 2026. Licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Aggregated figures only; no endorsement by CoworkingView or any operator is implied.",
                "scope": "This licence covers the CoworkingView Price Index and catalogue data in this dataset: prices and price statistics, space and operator names, and descriptions written by CoworkingView. It does not cover, and this dataset does not contain: photos, logos, reviews or ratings, data obtained from Google, or any other content of coworkingview.com, its API or MCP server, which remain subject to their own terms. Names are included for identification only; no trademark rights in CoworkingView or operator names and marks are licensed.",
                "copyright": "Source: CoworkingView Price Index (https://www.coworkingview.com/en/tools/price-index), as of October 2026. Licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Aggregated figures only; no endorsement by CoworkingView or any operator is implied."
            },
            "meta": {
                "contractVersion": "1.0.0"
            }
        },
        "idField": "id"
    },
    {
        "entity": "operator",
        "accessor": "Operator",
        "op": "load",
        "method": "GET",
        "path": "/v1/operators/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "hq"
            }
        ],
        "select": {
            "locale": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale"
        ],
        "queryArgs": [
            {
                "name": "locale",
                "wire": "locale"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "slug": "example-operator",
                "name": "Example Operator",
                "tagline": "Flexible offices in central Berlin.",
                "description": "Example Operator runs coworking buildings with private offices and flexible desks.",
                "faqs": [
                    {
                        "question": "Can I book a day pass?",
                        "answer": "Yes, at every location listed here."
                    }
                ],
                "propertyCount": 3,
                "cities": [
                    {
                        "slug": "berlin",
                        "name": "Berlin"
                    }
                ],
                "pricePosition": {
                    "verdict": "around",
                    "sampleSize": 3
                },
                "asOf": "2026-10-01T06:00:00Z"
            },
            "meta": {
                "contractVersion": "1.0.0",
                "citation": {
                    "source": "CoworkingView",
                    "title": "Example Operator coworking locations",
                    "url": "https://coworkingview.com/en/brands/example-operator",
                    "accessed": "2026-10-01",
                    "text": "Source: CoworkingView — Example Operator coworking locations, https://coworkingview.com/en/brands/example-operator."
                },
                "catalogueNotice": "Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted."
            }
        },
        "idField": "slug"
    },
    {
        "entity": "place",
        "accessor": "Place",
        "op": "load",
        "method": "GET",
        "path": "/v1/places/{kind}/{slug}",
        "args": [
            {
                "name": "kind",
                "wire": "kind",
                "value": "zone"
            },
            {
                "name": "slug",
                "wire": "slug",
                "value": "mitte"
            }
        ],
        "select": {
            "locale": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale"
        ],
        "queryArgs": [
            {
                "name": "locale",
                "wire": "locale"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "kind": "zone",
                "slug": "mitte",
                "name": "Mitte",
                "shortDescription": "Berlin's central district, with the densest choice of flexible offices in the city.",
                "faqs": [
                    {
                        "question": "Is Mitte well connected?",
                        "answer": "Yes — S-Bahn, U-Bahn and tram lines meet at several hubs."
                    }
                ],
                "propertyCount": 14,
                "priceRange": {
                    "min": {
                        "amount": 180,
                        "currency": "EUR"
                    },
                    "max": {
                        "amount": 2400,
                        "currency": "EUR"
                    }
                },
                "center": {
                    "lat": 52.52,
                    "lng": 13.4
                },
                "parent": {
                    "slug": "berlin",
                    "name": "Berlin"
                },
                "asOf": "2026-10-01T06:00:00Z"
            },
            "meta": {
                "contractVersion": "1.0.0",
                "citation": {
                    "source": "CoworkingView",
                    "title": "Coworking spaces in Mitte",
                    "url": "https://coworkingview.com/en/coworking/berlin/mitte",
                    "accessed": "2026-10-01",
                    "text": "Source: CoworkingView — Coworking spaces in Mitte, https://coworkingview.com/en/coworking/berlin/mitte."
                },
                "catalogueNotice": "Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted."
            }
        },
        "idField": "id"
    },
    {
        "entity": "property",
        "accessor": "Property",
        "op": "list",
        "method": "GET",
        "path": "/v1/properties",
        "args": [],
        "select": {
            "locale": "en",
            "address": "v1",
            "amenity": "v1",
            "bbox": "v1",
            "city": "berlin",
            "country": "v1",
            "currency": "v1",
            "lat": "v1",
            "lng": "v1",
            "max_price": "v1",
            "min_capacity": 4,
            "min_price": "v1",
            "operator": "v1",
            "page": 1,
            "page_size": 2,
            "pricing_option_type": "private_office",
            "radius_meter": "v1",
            "seed": "v1",
            "sort_by": "v1",
            "zone": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale",
            "page",
            "pageSize",
            "seed",
            "country",
            "city",
            "zone",
            "operator",
            "pricingOptionType",
            "amenities",
            "minCapacity",
            "minPrice",
            "maxPrice",
            "currency",
            "sortBy",
            "lat",
            "lng",
            "radiusMeters",
            "bbox",
            "address"
        ],
        "queryArgs": [
            {
                "name": "address",
                "wire": "address"
            },
            {
                "name": "amenity",
                "wire": "amenities"
            },
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lng",
                "wire": "lng"
            },
            {
                "name": "locale",
                "wire": "locale"
            },
            {
                "name": "max_price",
                "wire": "maxPrice"
            },
            {
                "name": "min_capacity",
                "wire": "minCapacity"
            },
            {
                "name": "min_price",
                "wire": "minPrice"
            },
            {
                "name": "operator",
                "wire": "operator"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "pricing_option_type",
                "wire": "pricingOptionType"
            },
            {
                "name": "radius_meter",
                "wire": "radiusMeters"
            },
            {
                "name": "seed",
                "wire": "seed"
            },
            {
                "name": "sort_by",
                "wire": "sortBy"
            },
            {
                "name": "zone",
                "wire": "zone"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "slug": "example-coworking-mitte",
                    "title": "Example Coworking Mitte",
                    "countryCode": "DE",
                    "city": {
                        "slug": "berlin",
                        "name": "Berlin"
                    },
                    "zone": {
                        "slug": "mitte",
                        "name": "Mitte"
                    },
                    "operator": {
                        "slug": "example-operator",
                        "name": "Example Operator"
                    },
                    "coordinates": {
                        "lat": 52.5251,
                        "lng": 13.4019
                    },
                    "fromPrice": {
                        "amount": 290,
                        "currency": "EUR"
                    },
                    "fromBillingPeriod": "month",
                    "featured": false,
                    "updatedAt": "2026-09-28T10:15:00Z",
                    "excerpt": "Bright private offices two minutes from the U-Bahn, with meeting rooms on every floor.",
                    "images": [
                        {
                            "url": "https://coworkingview.com/og-image.png",
                            "width": 1200,
                            "height": 630,
                            "alt": "Open-plan coworking floor with desks by the window"
                        }
                    ],
                    "amenities": [
                        "wifi",
                        "coffee",
                        "meeting_rooms"
                    ],
                    "capacity": 12,
                    "capacity_status": "confirmed",
                    "marketPosition": {
                        "verdict": "around",
                        "median": {
                            "amount": 310,
                            "currency": "EUR"
                        },
                        "sampleSize": 24
                    }
                }
            ],
            "meta": {
                "contractVersion": "1.0.0",
                "pagination": {
                    "page": 1,
                    "pageSize": 2,
                    "total": 1,
                    "pageCount": 1
                },
                "seed": 482913,
                "citation": {
                    "source": "CoworkingView",
                    "title": "Coworking spaces in Berlin",
                    "url": "https://coworkingview.com/en/coworking/berlin",
                    "accessed": "2026-10-01",
                    "text": "Source: CoworkingView — Coworking spaces in Berlin, https://coworkingview.com/en/coworking/berlin."
                },
                "catalogueNotice": "Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted."
            }
        },
        "idField": "slug"
    },
    {
        "entity": "property",
        "accessor": "Property",
        "op": "list",
        "method": "GET",
        "path": "/v1/properties/map",
        "action": "map",
        "args": [],
        "select": {
            "locale": "en",
            "address": "v1",
            "amenity": "v1",
            "bbox": "13.2,52.4,13.6,52.6",
            "city": "v1",
            "country": "v1",
            "currency": "v1",
            "lat": "v1",
            "lng": "v1",
            "max_price": "v1",
            "min_capacity": "v1",
            "min_price": "v1",
            "operator": "v1",
            "page": 1,
            "page_size": 20,
            "pricing_option_type": "v1",
            "radius_meter": "v1",
            "seed": "v1",
            "sort_by": "v1",
            "zone": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale",
            "page",
            "pageSize",
            "seed",
            "country",
            "city",
            "zone",
            "operator",
            "pricingOptionType",
            "amenities",
            "minCapacity",
            "minPrice",
            "maxPrice",
            "currency",
            "sortBy",
            "lat",
            "lng",
            "radiusMeters",
            "bbox",
            "address"
        ],
        "queryArgs": [
            {
                "name": "address",
                "wire": "address"
            },
            {
                "name": "amenity",
                "wire": "amenities"
            },
            {
                "name": "bbox",
                "wire": "bbox"
            },
            {
                "name": "city",
                "wire": "city"
            },
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "currency",
                "wire": "currency"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lng",
                "wire": "lng"
            },
            {
                "name": "locale",
                "wire": "locale"
            },
            {
                "name": "max_price",
                "wire": "maxPrice"
            },
            {
                "name": "min_capacity",
                "wire": "minCapacity"
            },
            {
                "name": "min_price",
                "wire": "minPrice"
            },
            {
                "name": "operator",
                "wire": "operator"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "pageSize"
            },
            {
                "name": "pricing_option_type",
                "wire": "pricingOptionType"
            },
            {
                "name": "radius_meter",
                "wire": "radiusMeters"
            },
            {
                "name": "seed",
                "wire": "seed"
            },
            {
                "name": "sort_by",
                "wire": "sortBy"
            },
            {
                "name": "zone",
                "wire": "zone"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "slug": "example-coworking-mitte",
                    "title": "Example Coworking Mitte",
                    "coordinates": {
                        "lat": 52.5251,
                        "lng": 13.4019
                    },
                    "fromPrice": {
                        "amount": 290,
                        "currency": "EUR"
                    },
                    "fromBillingPeriod": "month",
                    "featured": false,
                    "image": {
                        "url": "https://coworkingview.com/og-image.png",
                        "width": 1200,
                        "height": 630,
                        "alt": "Open-plan coworking floor with desks by the window"
                    }
                }
            ],
            "meta": {
                "contractVersion": "1.0.0",
                "pagination": {
                    "page": 1,
                    "pageSize": 1,
                    "total": 1,
                    "pageCount": 1
                },
                "truncated": false,
                "citation": {
                    "source": "CoworkingView",
                    "title": "Coworking spaces in Berlin",
                    "url": "https://coworkingview.com/en/coworking/berlin",
                    "accessed": "2026-10-01",
                    "text": "Source: CoworkingView — Coworking spaces in Berlin, https://coworkingview.com/en/coworking/berlin."
                },
                "catalogueNotice": "Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted."
            }
        },
        "idField": "slug"
    },
    {
        "entity": "property",
        "accessor": "Property",
        "op": "load",
        "method": "GET",
        "path": "/v1/properties/{slug}",
        "args": [
            {
                "name": "id",
                "wire": "slug",
                "value": "hq-kings-cross-london"
            }
        ],
        "select": {
            "locale": "en"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale"
        ],
        "queryArgs": [
            {
                "name": "locale",
                "wire": "locale"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": {
                "slug": "example-coworking-mitte",
                "title": "Example Coworking Mitte",
                "countryCode": "DE",
                "city": {
                    "slug": "berlin",
                    "name": "Berlin"
                },
                "zone": {
                    "slug": "mitte",
                    "name": "Mitte"
                },
                "operator": {
                    "slug": "example-operator",
                    "name": "Example Operator"
                },
                "coordinates": {
                    "lat": 52.5251,
                    "lng": 13.4019
                },
                "fromPrice": {
                    "amount": 290,
                    "currency": "EUR"
                },
                "fromBillingPeriod": "month",
                "featured": false,
                "updatedAt": "2026-09-28T10:15:00Z",
                "description": "A four-floor coworking building in Mitte with private offices for 2–12 people, fixed and flexible desks, and bookable meeting rooms.",
                "address": "Example Straße 1, 10115 Berlin",
                "images": [
                    {
                        "url": "https://coworkingview.com/og-image.png",
                        "width": 1200,
                        "height": 630,
                        "alt": "Open-plan coworking floor with desks by the window"
                    }
                ],
                "amenities": [
                    "wifi",
                    "coffee",
                    "meeting_rooms"
                ],
                "capacity": 12,
                "capacity_status": "confirmed",
                "pricingOptions": [
                    {
                        "optionType": "flex_desk",
                        "title": "Flex desk",
                        "price": {
                            "amount": 290,
                            "currency": "EUR"
                        },
                        "priceOnRequest": false,
                        "billingPeriod": "month"
                    },
                    {
                        "optionType": "private_office",
                        "title": "Private office (4 people)",
                        "priceOnRequest": true,
                        "billingPeriod": "month",
                        "minCapacity": 4,
                        "maxCapacity": 4
                    }
                ],
                "webUrl": "https://coworkingview.com/en/workspace/example-coworking-mitte"
            },
            "meta": {
                "contractVersion": "1.0.0",
                "citation": {
                    "source": "CoworkingView",
                    "title": "Example Coworking Mitte",
                    "url": "https://coworkingview.com/en/workspace/example-coworking-mitte",
                    "accessed": "2026-10-01",
                    "text": "Source: CoworkingView — Example Coworking Mitte, https://coworkingview.com/en/workspace/example-coworking-mitte."
                },
                "catalogueNotice": "Catalogue content (descriptions, images, logos, names and prices) belongs to the respective operators and rights holders. No licence to reuse it is granted. You may link to listing pages. Systematic extraction or re-use of the catalogue database is not permitted."
            }
        },
        "idField": "slug"
    },
    {
        "entity": "search",
        "accessor": "Search",
        "op": "list",
        "method": "GET",
        "path": "/v1/search/suggest",
        "action": "suggest",
        "args": [],
        "select": {
            "locale": "en",
            "q": "mitte",
            "limit": 5
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "locale",
            "q",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "locale",
                "wire": "locale"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "data": [
                {
                    "kind": "zone",
                    "slug": "mitte",
                    "label": "Mitte",
                    "sublabel": "Berlin",
                    "center": {
                        "lat": 52.52,
                        "lng": 13.4
                    },
                    "propertyCount": 14
                },
                {
                    "kind": "property",
                    "slug": "example-coworking-mitte",
                    "label": "Example Coworking Mitte",
                    "sublabel": "Mitte, Berlin"
                }
            ],
            "meta": {
                "contractVersion": "1.0.0",
                "pagination": {
                    "page": 1,
                    "pageSize": 5,
                    "total": 2,
                    "pageCount": 1
                }
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map